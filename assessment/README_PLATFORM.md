# Assessment Platform

A modern assessment platform built with Next.js 16, Better Auth, Drizzle ORM, and PostgreSQL.

## Features

- 🔐 **Authentication** - Secure email/password authentication with Better Auth
- 📝 **Multiple Assessments** - Verbal and Numerical ability tests with 10 questions each
- ⏱️ **Timed Tests** - Countdown timer during test taking
- 📊 **Instant Results** - Immediate feedback with detailed answer review
- 🔄 **Unlimited Attempts** - Take tests multiple times to improve your score
- 📈 **Progress Tracking** - View test history and track performance over time
- 🎨 **Modern UI** - Clean, responsive design with dark mode support

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Authentication:** Better Auth
- **Database:** PostgreSQL with Drizzle ORM
- **Styling:** Tailwind CSS v4
- **Icons:** Lucide React
- **Language:** TypeScript

## Getting Started

### Prerequisites

- Node.js 20+ 
- Docker (for PostgreSQL database)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   cd assessment
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   The `.env.local` file is already created with default values:
   ```env
   DATABASE_URL=postgresql://postgres:postgres@localhost:5432/prismberry
   BETTER_AUTH_SECRET=your-secret-key-here-min-32-characters-change-this-in-production
   BETTER_AUTH_URL=http://localhost:3000
   NEXT_PUBLIC_BETTER_AUTH_URL=http://localhost:3000
   ```
   
   ⚠️ **Important:** Update `BETTER_AUTH_SECRET` with a secure random string (minimum 32 characters) before deploying to production.

4. **Start the database**
   ```bash
   docker compose up -d
   ```

5. **Push database schema**
   ```bash
   npm run db:push
   ```

6. **Seed the database with sample assessments**
   ```bash
   npm run db:seed
   ```
   
   This will create:
   - Verbal Ability Test (10 questions)
   - Numerical Ability Test (10 questions)

7. **Start the development server**
   ```bash
   npm run dev
   ```

8. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
assessment/
├── app/
│   ├── api/
│   │   ├── auth/[...all]/      # Better Auth API routes
│   │   └── submit-test/        # Test submission endpoint
│   ├── assessment/[id]/        # Test taking interface
│   ├── dashboard/              # User dashboard
│   ├── login/                  # Login page
│   ├── results/[id]/           # Results page
│   ├── signup/                 # Sign up page
│   ├── page.tsx                # Landing page
│   └── layout.tsx              # Root layout
├── lib/
│   ├── db/
│   │   ├── index.ts            # Database connection
│   │   ├── schema.ts           # Database schema
│   │   └── seed.ts             # Seed script
│   ├── auth.ts                 # Better Auth server config
│   ├── auth-client.ts          # Better Auth client hooks
│   └── utils.ts                # Utility functions
└── public/                     # Static assets
```

## Database Schema

### Authentication Tables
- `user` - User accounts
- `session` - Active sessions
- `account` - OAuth accounts
- `verification` - Email verification tokens

### Assessment Tables
- `assessments` - Test definitions
- `questions` - Test questions with options
- `user_attempts` - User test attempts
- `user_answers` - Individual answers for each attempt

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run db:generate` - Generate Drizzle migrations
- `npm run db:push` - Push schema to database
- `npm run db:migrate` - Run migrations
- `npm run db:studio` - Open Drizzle Studio
- `npm run db:seed` - Seed database with sample data

## Usage

### For Users

1. **Sign Up** - Create a new account on the landing page
2. **Login** - Sign in with your credentials
3. **Dashboard** - View available assessments and your test history
4. **Take Test** - Select an assessment and start the test
5. **Submit** - Complete all questions and submit
6. **View Results** - See your score and review answers
7. **Retake** - Take tests multiple times to improve

### For Developers

#### Adding New Assessments

1. Update `lib/db/seed.ts` with new assessment data
2. Run `npm run db:seed` to add to database

#### Modifying Schema

1. Edit `lib/db/schema.ts`
2. Generate migration: `npm run db:generate`
3. Apply changes: `npm run db:push`

## Features in Detail

### Landing Page
- Hero section with call-to-action
- Feature highlights
- Responsive design

### Authentication
- Email/password sign up and login
- Session management with Better Auth
- Protected routes

### Dashboard
- List of available assessments
- Recent test history
- Score tracking

### Test Taking
- Question navigation
- Progress indicator
- Countdown timer
- Auto-submit on time expiry
- Question status indicators

### Results Page
- Score summary with grade
- Percentage calculation
- Detailed answer review
- Correct/incorrect indicators
- Option to retake test

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `DATABASE_URL` | PostgreSQL connection string | Yes |
| `BETTER_AUTH_SECRET` | Secret key for Better Auth (min 32 chars) | Yes |
| `BETTER_AUTH_URL` | Base URL for Better Auth | Yes |
| `NEXT_PUBLIC_BETTER_AUTH_URL` | Public URL for client-side auth | Yes |

## Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

### Other Platforms

1. Build the project: `npm run build`
2. Set environment variables
3. Start: `npm run start`

## Database Hosting

You can use any PostgreSQL hosting service:
- [Neon](https://neon.tech) - Serverless PostgreSQL
- [Supabase](https://supabase.com) - Open source Firebase alternative
- [Railway](https://railway.app) - Simple infrastructure
- [Render](https://render.com) - Cloud application hosting

Update the `DATABASE_URL` in your environment variables with your hosted database connection string.

## Troubleshooting

### Database Connection Issues
- Ensure Docker is running: `docker compose ps`
- Check DATABASE_URL is correct in `.env.local`
- Try restarting containers: `docker compose restart`

### Authentication Issues
- Verify BETTER_AUTH_SECRET is at least 32 characters
- Check that URLs match your deployment environment
- Clear browser cookies and try again

### Build Errors
- Delete `.next` folder and rebuild
- Clear node_modules and reinstall: `rm -rf node_modules && npm install`
- Check for TypeScript errors: `npm run build`

## License

MIT

## Support

For issues and questions, please open an issue on GitHub.
