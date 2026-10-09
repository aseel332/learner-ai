# Learner AI

An AI study companion for students. Learner AI sets up a personalized workspace for each course you're taking, so it can track progress, deadlines and study time, and plan your week around your target grades.

## Status

Early development. Implemented so far:

- **Authentication:** email sign-up and login with Supabase Auth, OAuth callback route, protected routes and middleware.
- **Onboarding flow:** a guided, multi-step setup that captures who you are (school, research, work or personal), your plan, and your courses.
- **Course setup:** name, subject, instructor, term, weekly schedule and target grade for each course.
- **Data model:** user profiles with study preferences (weekly study hours, timezone, target grade), subscription plans, and courses that track progress, pending tasks, materials and upcoming deadlines.

Next up: the course dashboard, material uploads and the AI study planner.

## Tech stack

Next.js (App Router), React, TypeScript, Tailwind CSS, Supabase (Postgres, Auth)

## Getting started

```bash
git clone https://github.com/aseel332/learner-ai.git
cd learner-ai
npm install
```

Create `.env.local`:

```
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=...
```

Apply the schema in `supabase/migrations`, then run `npm run dev` and open http://localhost:3000.

## Project structure

```
src/
  app/          (auth) login & signup, (onboarding) role/plan/course steps, auth callback
  components/   auth forms, onboarding steps, protected route
  services/     auth, user, course and onboarding data access
  context/      auth context
  lib/supabase/ browser, server and proxy clients
supabase/       migrations and local config
```
