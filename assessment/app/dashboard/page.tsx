import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { db } from "@/lib/db";
import { assessments, userAttempts } from "@/lib/db/schema";
import { eq, desc } from "drizzle-orm";
import Link from "next/link";
import { Award, BookOpen, Clock, TrendingUp } from "lucide-react";
import { SignOutButton } from "./sign-out-button";

export default async function DashboardPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/login");
  }

  // Fetch all assessments
  const allAssessments = await db.select().from(assessments);

  // Fetch user's recent attempts
  const recentAttempts = await db
    .select({
      id: userAttempts.id,
      score: userAttempts.score,
      totalQuestions: userAttempts.totalQuestions,
      completedAt: userAttempts.completedAt,
      assessmentTitle: assessments.title,
      assessmentId: assessments.id,
    })
    .from(userAttempts)
    .leftJoin(assessments, eq(userAttempts.assessmentId, assessments.id))
    .where(eq(userAttempts.userId, session.user.id))
    .orderBy(desc(userAttempts.completedAt))
    .limit(5);

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
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600 dark:text-gray-300">
              {session.user.name}
            </span>
            <SignOutButton />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Welcome back, {session.user.name}!
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Choose an assessment to test your skills
          </p>
        </div>

        {/* Available Assessments */}
        <section className="mb-12">
          <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">
            Available Assessments
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            {allAssessments.map((assessment) => (
              <div
                key={assessment.id}
                className="rounded-lg border bg-white p-6 shadow-sm transition-shadow hover:shadow-md dark:border-gray-700 dark:bg-gray-800"
              >
                <div className="mb-4 flex items-start justify-between">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                      {assessment.title}
                    </h3>
                    <p className="mt-2 text-gray-600 dark:text-gray-400">
                      {assessment.description}
                    </p>
                  </div>
                  <BookOpen className="h-8 w-8 text-blue-600" />
                </div>
                <div className="mb-4 flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                  <span className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {assessment.duration} min
                  </span>
                  <span>{assessment.totalQuestions} questions</span>
                </div>
                <Link
                  href={`/assessment/${assessment.id}`}
                  className="inline-flex w-full items-center justify-center rounded-lg bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700"
                >
                  Start Test
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* Recent Attempts */}
        {recentAttempts.length > 0 && (
          <section>
            <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">
              Recent Test Results
            </h2>
            <div className="rounded-lg border bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="border-b bg-gray-50 dark:border-gray-700 dark:bg-gray-900">
                    <tr>
                      <th className="px-6 py-3 text-left text-sm font-medium text-gray-900 dark:text-white">
                        Assessment
                      </th>
                      <th className="px-6 py-3 text-left text-sm font-medium text-gray-900 dark:text-white">
                        Score
                      </th>
                      <th className="px-6 py-3 text-left text-sm font-medium text-gray-900 dark:text-white">
                        Date
                      </th>
                      <th className="px-6 py-3 text-left text-sm font-medium text-gray-900 dark:text-white">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y dark:divide-gray-700">
                    {recentAttempts.map((attempt) => (
                      <tr key={attempt.id}>
                        <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">
                          {attempt.assessmentTitle}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <TrendingUp className="h-4 w-4 text-green-600" />
                            <span className="text-sm font-medium text-gray-900 dark:text-white">
                              {attempt.score}/{attempt.totalQuestions}
                            </span>
                            <span className="text-sm text-gray-500">
                              (
                              {Math.round(
                                (attempt.score / attempt.totalQuestions) * 100
                              )}
                              %)
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                          {new Date(attempt.completedAt).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4">
                          <Link
                            href={`/results/${attempt.id}`}
                            className="text-sm font-medium text-blue-600 hover:text-blue-700"
                          >
                            View Details
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
