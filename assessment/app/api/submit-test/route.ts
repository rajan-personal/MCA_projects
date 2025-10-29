import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { questions, userAttempts, userAnswers } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export async function POST(request: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: request.headers,
    });

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { assessmentId, answers } = body;

    // Fetch all questions for this assessment
    const assessmentQuestions = await db
      .select()
      .from(questions)
      .where(eq(questions.assessmentId, assessmentId));

    // Calculate score
    let score = 0;
    const userAnswerRecords = [];

    for (const question of assessmentQuestions) {
      const userAnswer = answers[question.id];
      if (userAnswer !== undefined) {
        const isCorrect = userAnswer === question.correctAnswer;
        if (isCorrect) score++;

        userAnswerRecords.push({
          questionId: question.id,
          selectedAnswer: userAnswer,
          isCorrect,
        });
      }
    }

    // Create user attempt
    const [attempt] = await db
      .insert(userAttempts)
      .values({
        userId: session.user.id,
        assessmentId,
        score,
        totalQuestions: assessmentQuestions.length,
        startedAt: new Date(),
        completedAt: new Date(),
      })
      .returning();

    // Save user answers
    if (userAnswerRecords.length > 0) {
      await db.insert(userAnswers).values(
        userAnswerRecords.map((record) => ({
          attemptId: attempt.id,
          ...record,
        }))
      );
    }

    return NextResponse.json({ attemptId: attempt.id, score });
  } catch (error) {
    console.error("Error submitting test:", error);
    return NextResponse.json(
      { error: "Failed to submit test" },
      { status: 500 }
    );
  }
}
