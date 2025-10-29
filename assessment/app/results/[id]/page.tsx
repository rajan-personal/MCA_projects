import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { db } from "@/lib/db";
import {
  userAttempts,
  assessments,
  userAnswers,
  questions,
} from "@/lib/db/schema";
import { eq, asc } from "drizzle-orm";
import Link from "next/link";
import {
  Award,
  CheckCircle,
  XCircle,
  ArrowLeft,
} from "lucide-react";

export default async function ResultsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/login");
  }

  const { id } = await params;
  const attemptId = parseInt(id);

  // Fetch attempt with assessment
  const [attempt] = await db
    .select({
      id: userAttempts.id,
      score: userAttempts.score,
      totalQuestions: userAttempts.totalQuestions,
      completedAt: userAttempts.completedAt,
      userId: userAttempts.userId,
      assessmentId: assessments.id,
      assessmentTitle: assessments.title,
      assessmentDescription: assessments.description,
    })
    .from(userAttempts)
    .leftJoin(assessments, eq(userAttempts.assessmentId, assessments.id))
    .where(eq(userAttempts.id, attemptId));

  if (!attempt || attempt.userId !== session.user.id) {
    redirect("/dashboard");
  }

  // Fetch user answers with questions
  const answers = await db
    .select({
      answerId: userAnswers.id,
      selectedAnswer: userAnswers.selectedAnswer,
      isCorrect: userAnswers.isCorrect,
      questionId: questions.id,
      questionText: questions.questionText,
      option1: questions.option1,
      option2: questions.option2,
      option3: questions.option3,
      option4: questions.option4,
      correctAnswer: questions.correctAnswer,
      order: questions.order,
    })
    .from(userAnswers)
    .leftJoin(questions, eq(userAnswers.questionId, questions.id))
    .where(eq(userAnswers.attemptId, attemptId))
    .orderBy(asc(questions.order));

  const percentage = Math.round(
    (attempt.score / attempt.totalQuestions) * 100
  );

  const getGrade = (percent: number) => {
    if (percent >= 90) return { grade: "A+", color: "text-green-600" };
    if (percent >= 80) return { grade: "A", color: "text-green-600" };
    if (percent >= 70) return { grade: "B", color: "text-blue-600" };
    if (percent >= 60) return { grade: "C", color: "text-yellow-600" };
    return { grade: "D", color: "text-red-600" };
  };

  const { grade, color } = getGrade(percentage);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="border-b bg-white dark:bg-gray-800">
        <div className="container mx-auto flex items-center justify-between px-4 py-4">
          <div className="flex items-center gap-2">
            <Award className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold text-gray-900 dark:text-white">
              AssessHub
            </span>
          </div>
          <Link
            href="/dashboard"
            className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Link>
        </div>
      </header>

      <main className="container mx-auto max-w-4xl px-4 py-8">
        {/* Results Summary */}
        <div className="mb-8 rounded-lg border bg-white p-8 text-center shadow-sm dark:border-gray-700 dark:bg-gray-800">
          <h1 className="mb-2 text-3xl font-bold text-gray-900 dark:text-white">
            Test Completed!
          </h1>
          <p className="mb-6 text-gray-600 dark:text-gray-400">
            {attempt.assessmentTitle}
          </p>

          <div className="mb-6 flex items-center justify-center gap-8">
            <div>
              <div className={`text-6xl font-bold ${color}`}>{grade}</div>
              <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                Grade
              </div>
            </div>
            <div className="h-24 w-px bg-gray-300 dark:bg-gray-600" />
            <div>
              <div className="text-6xl font-bold text-gray-900 dark:text-white">
                {percentage}%
              </div>
              <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                Score
              </div>
            </div>
            <div className="h-24 w-px bg-gray-300 dark:bg-gray-600" />
            <div>
              <div className="text-6xl font-bold text-gray-900 dark:text-white">
                {attempt.score}/{attempt.totalQuestions}
              </div>
              <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                Correct
              </div>
            </div>
          </div>

          <div className="flex justify-center gap-4">
            <Link
              href={`/assessment/${attempt.assessmentId}`}
              className="rounded-lg bg-blue-600 px-6 py-3 font-medium text-white hover:bg-blue-700"
            >
              Retake Test
            </Link>
            <Link
              href="/dashboard"
              className="rounded-lg border border-gray-300 bg-white px-6 py-3 font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
            >
              View All Tests
            </Link>
          </div>
        </div>

        {/* Detailed Results */}
        <div className="rounded-lg border bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
          <div className="border-b p-6 dark:border-gray-700">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Answer Review
            </h2>
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
              Review your answers and see the correct solutions
            </p>
          </div>

          <div className="divide-y dark:divide-gray-700">
            {answers.map((answer, index) => (
              <div key={answer.answerId} className="p-6">
                <div className="mb-4 flex items-start justify-between">
                  <div className="flex-1">
                    <div className="mb-2 flex items-center gap-2">
                      <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                        Question {index + 1}
                      </span>
                      {answer.isCorrect ? (
                        <span className="flex items-center gap-1 rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-700 dark:bg-green-900/20 dark:text-green-400">
                          <CheckCircle className="h-3 w-3" />
                          Correct
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 rounded-full bg-red-100 px-2 py-1 text-xs font-medium text-red-700 dark:bg-red-900/20 dark:text-red-400">
                          <XCircle className="h-3 w-3" />
                          Incorrect
                        </span>
                      )}
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                      {answer.questionText}
                    </h3>
                  </div>
                </div>

                <div className="space-y-2">
                  {[1, 2, 3, 4].map((optionNum) => {
                    const optionText = answer[
                      `option${optionNum}` as keyof typeof answer
                    ] as string;
                    const isCorrect = optionNum === answer.correctAnswer;
                    const isSelected = optionNum === answer.selectedAnswer;

                    return (
                      <div
                        key={optionNum}
                        className={`rounded-lg border-2 p-3 ${
                          isCorrect
                            ? "border-green-500 bg-green-50 dark:bg-green-900/20"
                            : isSelected
                              ? "border-red-500 bg-red-50 dark:bg-red-900/20"
                              : "border-gray-200 dark:border-gray-700"
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          {isCorrect && (
                            <CheckCircle className="h-5 w-5 text-green-600" />
                          )}
                          {isSelected && !isCorrect && (
                            <XCircle className="h-5 w-5 text-red-600" />
                          )}
                          <span
                            className={
                              isCorrect || isSelected
                                ? "font-medium text-gray-900 dark:text-white"
                                : "text-gray-700 dark:text-gray-300"
                            }
                          >
                            {optionText}
                          </span>
                          {isCorrect && (
                            <span className="ml-auto text-xs font-medium text-green-600">
                              Correct Answer
                            </span>
                          )}
                          {isSelected && !isCorrect && (
                            <span className="ml-auto text-xs font-medium text-red-600">
                              Your Answer
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
