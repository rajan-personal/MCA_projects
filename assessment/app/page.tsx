import Link from "next/link";
import { CheckCircle, BookOpen, TrendingUp, Award } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-linear-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm dark:bg-gray-900/80">
        <div className="container mx-auto flex items-center justify-between px-4 py-4">
          <div className="flex items-center gap-2">
            <Award className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold text-gray-900 dark:text-white">
              AssessHub
            </span>
          </div>
          <nav className="flex gap-4">
            <Link
              href="/login"
              className="rounded-lg px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800"
            >
              Login
            </Link>
            <Link
              href="/signup"
              className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
            >
              Sign Up
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <h1 className="mb-6 text-5xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl">
          Test Your Skills,
          <span className="text-blue-600"> Unlock Your Potential</span>
        </h1>
        <p className="mx-auto mb-8 max-w-2xl text-xl text-gray-600 dark:text-gray-300">
          Take professional assessments in verbal and numerical abilities. Track
          your progress, improve your skills, and achieve your goals.
        </p>
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/signup"
            className="inline-flex h-12 items-center justify-center rounded-lg bg-blue-600 px-8 text-base font-medium text-white hover:bg-blue-700"
          >
            Get Started Free
          </Link>
          <Link
            href="/login"
            className="inline-flex h-12 items-center justify-center rounded-lg border border-gray-300 bg-white px-8 text-base font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
          >
            Sign In
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-lg border bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
            <BookOpen className="mb-4 h-12 w-12 text-blue-600" />
            <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
              Multiple Tests
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Access verbal and numerical ability tests with 10 questions each
            </p>
          </div>
          <div className="rounded-lg border bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
            <TrendingUp className="mb-4 h-12 w-12 text-green-600" />
            <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
              Track Progress
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Monitor your performance with detailed results and history
            </p>
          </div>
          <div className="rounded-lg border bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
            <CheckCircle className="mb-4 h-12 w-12 text-purple-600" />
            <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
              Instant Results
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Get immediate feedback with correct answers and explanations
            </p>
          </div>
          <div className="rounded-lg border bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
            <Award className="mb-4 h-12 w-12 text-orange-600" />
            <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
              Unlimited Attempts
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Practice as many times as you want to improve your score
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <div className="rounded-2xl bg-blue-600 px-8 py-16 text-white">
          <h2 className="mb-4 text-3xl font-bold">Ready to Begin?</h2>
          <p className="mb-8 text-xl">
            Create your free account and start testing your abilities today
          </p>
          <Link
            href="/signup"
            className="inline-flex h-12 items-center justify-center rounded-lg bg-white px-8 text-base font-medium text-blue-600 hover:bg-gray-100"
          >
            Sign Up Now
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 py-8 text-center text-gray-600 dark:text-gray-400">
          <p>© 2025 AssessHub. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
