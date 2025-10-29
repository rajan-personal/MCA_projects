import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { db } from "@/lib/db";
import { assessments, questions } from "@/lib/db/schema";
import { eq, asc } from "drizzle-orm";
import TestTaker from "./test-taker";

export default async function AssessmentPage({
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
  const assessmentId = parseInt(id);

  // Fetch assessment
  const [assessment] = await db
    .select()
    .from(assessments)
    .where(eq(assessments.id, assessmentId));

  if (!assessment) {
    redirect("/dashboard");
  }

  // Fetch questions
  const assessmentQuestions = await db
    .select()
    .from(questions)
    .where(eq(questions.assessmentId, assessmentId))
    .orderBy(asc(questions.order));

  return <TestTaker assessment={assessment} questions={assessmentQuestions} />;
}
