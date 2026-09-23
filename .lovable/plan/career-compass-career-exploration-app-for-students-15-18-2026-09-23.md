# Career Compass — career exploration app for students (15–18)

A light-blue, friendly web app where high school students explore careers, take quizzes, hear from real people, chat with a career guide, and share ideas with peers.

## Pages

1. **Home** — welcoming hero on a soft blue gradient, quick links to every section, and a "Start the quiz" call to action.
2. **Explore Careers** — a large searchable, filterable library of careers grouped by field:
   - Technology, Health & Medicine (incl. vets and animal care), Business & Finance, Education, Legal, Creative & Media, Science & Environment, Public Service & Emergency, Sport & Fitness, Hospitality & Food, Trades & Construction (plumbing, electrical, carpentry), Retail, Sales & Real Estate, Transport & Logistics, Beauty & Personal Care.
   - Each career card opens a detail view: what the job is, a typical day, pay range, demand, subjects that help, the study path (university, TAFE, apprenticeship or on-the-job), and related careers.
   - Filters for field, study path (degree vs non-degree), and interest tags.
3. **Career Quiz** — three short surveys: personality style, habits & lifestyle, and interests. Results give a ranked list of matching careers with a short "why this suits you" explanation, plus a saved result the rest of the app can use.
4. **Ask the Guide** — an interactive chat where students ask questions ("what do I need to become a vet?", "is uni required for real estate?") and get clear answers plus career suggestions, with starter question chips.
5. **Real Voices** — quotes and stories from people in different jobs about how they chose their path, what surprised them, and advice — filterable by field.
6. **Pin Board** — a colourful board where students pin careers, quotes, notes and links they want to remember; drag-free simple grid with add, edit and remove.
7. **Community** — topic rooms per career field where students post ideas and reply to each other, so people considering the same pathway can connect. Includes a friendly posting guideline note.
8. **Australian Universities** — explorable list of Australian universities and TAFE options with state, notable study areas, and which careers they lead to; searchable and filterable by state and field.

## Look and feel

- Light blue background with soft gradients, rounded cards, gentle shadows, and a clear, large, readable type scale suited to teens.
- All colours and effects defined once as design tokens, applied consistently across pages.
- Simple top navigation that works on phones and laptops.

## Technical notes

- React + TypeScript + Tailwind, TanStack Router pages under `src/routes`.
- Zustand stores for quiz results, pins, community posts and chat history, persisted to browser storage — no database, matching the workspace conventions (no backend, no external logins).
- The "Ask the Guide" chat is an in-app knowledge engine: it matches the student's question against the career dataset, quiz results and a curated Q&A set, then replies with tailored suggestions. This keeps the app fully offline and avoids external services, per the workspace rules. If you would rather it be powered by a live AI model, say so and I will wire that in instead.
- Career, quote and university data lives in typed data files so it is easy to extend.
- Test-user style profile only (pick a display name) for community posts — no real accounts.
