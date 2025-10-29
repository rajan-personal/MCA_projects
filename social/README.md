# Prismberry Social

A photo-forward social network built on Next.js 16 with Better Auth, Drizzle ORM, and PostgreSQL. Users can share square images, like and comment on posts, and manage public profiles with friendly usernames.

## Core Features

- Email/password sign up and session management via Better Auth shared schema
- Image uploads (JPG, PNG, WebP, max 5 MB) stored in `public/uploads` with server-side validation
- Feed with captioned photo cards, like toggles, and rolling comment previews
- Profile pages with vanity usernames, aggregate stats, and responsive gallery grid
- Profile editor to update username, display name, bio, and avatar
- Protected routes and automatic profile provisioning for new accounts

## Tech Stack

| Layer | Technology |
| --- | --- |
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Auth | Better Auth + Drizzle adapter |
| Database | PostgreSQL, Drizzle ORM |
| UI | Tailwind CSS v4, Lucide icons |
| Testing | Vitest + Testing Library |

## Quick Start

1. **Install dependencies**
	```bash
	npm install
	```
2. **Start PostgreSQL**
	```bash
	docker compose up -d
	```
3. **Apply schema**
	```bash
	npm run db:push
	```
4. **Create uploads folder (first run only)**
	```bash
	mkdir -p public/uploads
	```
5. **Launch the dev server**
	```bash
	npm run dev
	```
6. Visit http://localhost:3000, sign up, and share a post from the feed.

## Environment

See `.env.local` for defaults.

| Variable | Description | Example |
| --- | --- | --- |
| `DATABASE_URL` | PostgreSQL connection string | `postgresql://postgres:postgres@localhost:5432/prismberry` |
| `BETTER_AUTH_SECRET` | 32+ char auth secret | `dev-super-secret-change-me` |
| `NEXT_PUBLIC_BETTER_AUTH_URL` | Base URL for Better Auth client | `http://localhost:3000` |

> Add `BETTER_AUTH_URL` when deploying behind a custom domain so webhook callbacks resolve correctly.

## Scripts

- `npm run dev` – Start Next.js in development mode
- `npm run build` / `npm start` – Production build and serve
- `npm run lint` – ESLint (Next.js config)
- `npm run db:generate` – Emit Drizzle SQL migration from schema changes
- `npm run db:push` – Push schema to the connected database
- `npm run db:studio` – Explore data with Drizzle Studio
- `npm test` – Vitest unit/component suite under `components/__tests__`

## Application Map

```
app/
  api/
	 auth/[...all]/        Better Auth handler
	 posts/                Create post, upload image
	 posts/[postId]/like/  Like toggle API
	 posts/[postId]/comments/  Comment creation API
	 profile/              Profile update endpoint
  login/, signup/         Public auth screens
  profile/                Settings form
  users/[username]/       Public profile with gallery
  page.tsx                Authenticated feed
components/
  create-post-form.tsx    Client post uploader with image preview
  post-card.tsx           Feed card (likes, comments)
  profile-edit-form.tsx   Profile settings form
lib/
  db/schema.ts            Drizzle models (auth + social domain)
  db/queries.ts           Feed, profile, like/comment helpers
  auth.ts                 Better Auth server config
```

## Data Model Highlights

- `profiles` – User profile metadata and vanity usernames
- `posts` – Photo posts referencing `user` and storing captions + visibility
- `post_likes` – Many-to-many join with composite primary key
- `post_comments` – Comment stream tied to posts and authors
- Shared Better Auth tables (`user`, `session`, `account`, `verification`) kept in sync with the assessment app

## Testing

Run `npm test` to execute the Vitest suite. Tests cover component rendering (`CreatePostForm`, `PostCard`) and ensure form validation and UI state behave correctly.

## Deployment Notes

- Provision a persistent object store or CDN for `public/uploads` when deploying; update the write path if you move to cloud storage
- Set `BETTER_AUTH_SECRET` to a secure random string and configure `BETTER_AUTH_URL`/`NEXT_PUBLIC_BETTER_AUTH_URL` with your production domain
- Use `npm run db:push` (or migrations) against your managed PostgreSQL instance before rolling out

## License

MIT
