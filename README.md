# StudyBuddy Web

The website for **StudyBuddy** (Play · Learn · Level up). It's the web version of the StudyBuddy app for Sri Lankan O/L students, starting with **Islam (Tamil medium), Grade 10 & 11**.

- **62 chapters**, each with four "doors": **Read** (notes) → **Recall** (flashcards) → **Quiz** → **Exam vault** (past papers 2016–2025)
- **Constellation sky map**: every chapter is a star that turns gold when you finish all four doors
- **Exam radar**: shows how often each chapter came up in O/L papers, so students know what to revise first
- Coins, streaks, ranks (Bronze → Champion) and badges, using the same rules as the app
- **AI Panda** tutor that answers from the notes (Claude API, or a notes-search fallback when no key is set)
- **Focus lantern** pomodoro timer, a focus reader for notes, and keyboard shortcuts in quizzes and flashcards
- Leaderboard with province and grade filters, public profiles, study-friend connections
- **Admin panel**: students, search, unlock/lock subjects, unlock requests, stats, settings, admins
- Chapter 1 of each grade is free. Everything else unlocks when an admin unlocks the subject for the student

Built with Next.js 15 (App Router), Tailwind CSS 4 and Supabase (Postgres, Auth and RLS).

---

## 1. Set up the database (Supabase)

The schema lives in [`supabase/migrations/20261025000001_studybuddy_web_init.sql`](supabase/migrations/20261025000001_studybuddy_web_init.sql).

**Option A: SQL editor.** Open the Supabase dashboard → project `aczdsffdgvitgoqsqnih` → **SQL Editor**, paste the whole file and run it.

**Option B: Claude Code + Supabase MCP.** This repo already has a project-scoped Supabase MCP server in `.mcp.json`. Open a terminal `claude` session in this folder, run `/mcp`, authenticate **supabase**, and ask Claude to apply the migration.

### Make yourself an admin

Sign in to the website once, so your account exists. Then run this in the SQL editor:

```sql
insert into public.admin_users (user_id)
select id from auth.users where email = 'YOUR_EMAIL@gmail.com';
```

After that you can add more admins from **Admin → Settings**.

## 2. Turn on sign-in

In Supabase → **Authentication**:

1. **Providers → Google**: enable it and paste your Google OAuth client ID and secret. You can reuse the Web client from the app.
2. **Providers → Email**: enabled by default (email + password).
3. **URL Configuration**:
   - Site URL: your live domain, e.g. `https://studybuddy.lk`
   - Redirect URLs: `http://localhost:3000/auth/callback` and `https://YOUR_DOMAIN/auth/callback`

## 3. Environment variables

Copy `.env.example` to `.env.local` and fill it in:

| Variable | Where to find it |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase → Project Settings → API |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Same page (the anon / publishable key) |
| `NEXT_PUBLIC_SITE_URL` | `http://localhost:3000` locally, your domain in production |
| `ANTHROPIC_API_KEY` | Optional. Turns on smart AI Panda answers (server-side only) |

## 4. Run it

```bash
npm install
npm run dev
```

Open http://localhost:3000. `npm run dev` and `npm run build` rebuild the content automatically.

## 5. Deploy (Vercel recommended)

Import the GitHub repo into Vercel, add the environment variables above, and deploy. The build command is `npm run build`.

---

## Updating content

All study content is markdown in [`content/`](content/), in the same format as the files you prepared:

```
content/islam-ol/
  grade-10/chapter-01/Notes.md
                      Flashcards.md
                      Quiz.md
                      PastPaper_Questions.md
  grade-11/chapter-01/...
  PastPapers_Index.md
  Questions_To_Verify.md        ← shown to admins under Admin → Content
```

1. Edit or replace the files, keeping the same `Front:/Back:`, `Q1.` / `A.`–`D.` / `Correct Answer:` layout.
2. Run `npm run content` to check the counts (it prints chapters, questions and cards).
3. Commit and push. The next deploy publishes it.

Locked chapters are never sent to the browser. The server checks access before it loads any chapter content.

**Adding a subject:** add `content/<subject-id>/grade-XX/chapter-YY/...`, add an entry to `SUBJECTS` in [`scripts/build-content.mjs`](scripts/build-content.mjs), and insert a row into the `subjects` table with its chapter counts.

## How unlocking works

1. A student signs up and gets a **student code** (e.g. `SB-7KQ2MX`), shown on their profile and on the Unlock page.
2. They contact you on WhatsApp (set the number in **Admin → Settings**) or send an unlock request from the site.
3. You confirm payment, open **Admin → Students** (or **Unlock requests**), search the name, email, phone or code, and press **Unlock**. You can add a payment note.
4. The subject opens for them straight away. Every unlock and lock is logged on the student's admin page.

## Security model (Supabase RLS)

- Students can edit only safe profile fields. Coins, rank, streak and badges change only through the `award_activity()` function, which also checks chapter access.
- `subject_unlocks` can only be written by admins, through `admin_set_unlock()`.
- Emails and phone numbers live in `student_private`, readable only by the student themselves and by admins.
- Admin functions check `is_admin()` on the server.

## Project layout

```
src/app/            routes: landing, (app) student area, admin/, api/panda
src/components/     Constellation, QuizRunner, FlashcardDeck, ExamVault, NoteReader, …
src/lib/            catalog, content loader, session, progress, gamification, panda retrieval
scripts/            build-content.mjs (markdown → JSON)
supabase/           SQL migrations
content/            study material (markdown)
```
