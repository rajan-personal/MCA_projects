# AssessHub – Assessment Platform

A full-stack assessment platform built with Next.js 16, Better Auth, Drizzle ORM, and PostgreSQL. Candidates can take timed verbal and numerical tests, while the platform tracks attempts and surfaces detailed results instantly.

## Feature Highlights

- Email and password authentication powered by Better Auth with server protected routes
- Pre-seeded verbal and numerical assessments with 10 questions each and per-question ordering
- Timed test runner with countdown, answer navigator, autosubmit on timeout, and client-side progress indicators
- Instant scoring that persists attempts, answers, and exposes a detailed results review UI
- Dashboard summarising available assessments plus recent attempt history with percentages and retake links
- Dark-mode friendly Tailwind CSS v4 UI with responsive layouts for landing, dashboard, assessment, and results pages

## Stack

| Layer | Technology |
| --- | --- |
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Auth | Better Auth with Drizzle adapter |
| Database | PostgreSQL + Drizzle ORM |
| Styling | Tailwind CSS v4, Lucide Icons |
| Testing | Jest + Testing Library |

## Quick Start

1. **Install dependencies**
	```bash
	npm install
	```
2. **Start PostgreSQL (Docker)**
	```bash
	docker compose up -d
	```
3. **Apply schema**
	```bash
	npm run db:push
	```
4. **Seed demo assessments**
	```bash
	npm run db:seed
	```
5. **Launch the dev server**
	```bash
	npm run dev
	```
6. Visit http://localhost:3000 and create an account to start testing.

## Environment

All variables live in `.env.local`.

| Variable | Description | Example |
| --- | --- | --- |
| `DATABASE_URL` | PostgreSQL connection string | `postgresql://postgres:postgres@localhost:5432/prismberry` |
| `BETTER_AUTH_SECRET` | 32+ char secret for Better Auth | `dev-super-secret-change-me` |
| `BETTER_AUTH_URL` | Base URL for auth callbacks | `http://localhost:3000` |
| `NEXT_PUBLIC_BETTER_AUTH_URL` | Client-side auth base URL | `http://localhost:3000` |

> Generate a long random value for `BETTER_AUTH_SECRET` before deploying.

## Useful Scripts

- `npm run lint` – ESLint over the repo
- `npm test` – Jest unit/integration suite (`__tests__/*`)
- `npm run test:watch` – Watch failing tests
- `npm run test:coverage` – Coverage summary
- `npm run db:generate` – Emit Drizzle migrations after schema changes
- `npm run db:push` – Apply schema to the target database
- `npm run db:seed` – Populate sample assessments and questions
- `npm run db:studio` – Launch Drizzle Studio

## Project Structure

```
app/
  api/
	 auth/[...all]/     Better Auth routes
	 submit-test/       Assessment submission API
  assessment/[id]/     Test runner (client + server wrapper)
  dashboard/           Authenticated dashboard
  results/[id]/        Attempt summary + review
  login, signup/       Auth pages
lib/
  auth.ts              Better Auth server config
  auth-client.ts       Client helpers (signIn/signUp hooks)
  db/
	 schema.ts          Drizzle schema (auth + assessment tables)
	 index.ts           PG connection + drizzle client
	 seed.ts            Seeder creating two assessments
```

## Data Model

- `assessments` – Test metadata (title, duration, question count)
- `questions` – Multiple-choice questions with ordered options
- `user_attempts` – One record per submitted attempt with score snapshot
- `user_answers` – Per-question responses for review screens
- Better Auth tables (`user`, `session`, `account`, `verification`) mirror the shared auth schema used across apps

## Testing

Tests live under `__tests__/` and exercise auth flows, API handlers, and UI components. Run `npm test` before pushing to ensure submissions, dashboards, and auth flows remain green.

## Troubleshooting

- Database errors? Check Docker is running (`docker compose ps`) and confirm `DATABASE_URL`
- Auth failures? Ensure `BETTER_AUTH_SECRET` is set and matches the base URL
- Stale seed data? Re-run `npm run db:seed` after resetting the database

## License

MIT
