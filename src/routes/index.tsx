import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Compass,
  MessageCircleQuestion,
  Users,
  Pin,
  Quote,
  ClipboardList,
  GraduationCap,
  ArrowRight,
} from "lucide-react";
import { careers } from "@/data/careers";
import { voices } from "@/data/voices";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "CareerScope — find the career pathway that fits you" },
      {
        name: "description",
        content:
          "A friendly place for students aged 15-18 to explore careers, take a quiz, ask a career guide and talk with other students.",
      },
      { property: "og:title", content: "CareerScope — find the career pathway that fits you" },
      {
        property: "og:description",
        content: "Explore 80+ careers, take the quiz, and plan your next step after school.",
      },
    ],
  }),
  component: Home,
});

const sections = [
  {
    to: "/careers",
    icon: Compass,
    title: "Explore careers",
    text: "Over 80 jobs across tech, health, vets, trades, business, law and more — with pay, study paths and a real typical day.",
  },
  {
    to: "/quiz",
    icon: ClipboardList,
    title: "Take the quiz",
    text: "Three short surveys on your personality, habits and interests. Get a ranked shortlist in about three minutes.",
  },
  {
    to: "/guide",
    icon: MessageCircleQuestion,
    title: "Ask the guide",
    text: "Type any question — 'how do I become a vet?', 'what if I don't want uni?' — and get a clear answer.",
  },
  {
    to: "/voices",
    icon: Quote,
    title: "Real voices",
    text: "Honest quotes and stories from people who picked a path — including the bits they'd do differently.",
  },
  {
    to: "/pinboard",
    icon: Pin,
    title: "Pin board",
    text: "Keep your favourite careers, quotes and plans on one colourful board.",
  },
  {
    to: "/community",
    icon: Users,
    title: "Community",
    text: "Talk with other students thinking about the same pathway as you.",
  },
  {
    to: "/courses",
    icon: GraduationCap,
    title: "University courses",
    text: "Find the course that leads to your career, and every university or TAFE that offers it.",
  },
] as const;

function Home() {
  const featured = voices[0]!;

  return (
    <div className="mx-auto max-w-7xl space-y-14">
      <section className="hero-panel relative overflow-hidden px-6 py-14 sm:px-12 sm:py-20">
        <div className="relative max-w-2xl">
          <p className="pill bg-primary-foreground/20 text-primary-foreground">For students aged 15–18</p>
          <h1 className="mt-5 text-4xl font-semibold leading-tight sm:text-5xl">
            Not sure what you want to be yet? That's exactly who this is for.
          </h1>
          <p className="mt-5 text-lg opacity-95">
            Explore {careers.length}+ real careers — from software and nursing to vets, plumbing, real
            estate and hospitality — find out what they actually involve, and work out which one fits
            the way you like to spend your time.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/quiz"
              className="inline-flex items-center gap-2 rounded-2xl bg-card px-5 py-3 text-sm font-semibold text-primary shadow-sm transition hover:-translate-y-0.5"
            >
              Start the quiz <ArrowRight className="size-4" />
            </Link>
            <Link
              to="/careers"
              className="inline-flex items-center gap-2 rounded-2xl border border-primary-foreground/40 px-5 py-3 text-sm font-semibold transition hover:bg-primary-foreground/10"
            >
              Browse careers
            </Link>
          </div>
        </div>
        <div className="pointer-events-none absolute -right-16 -top-16 size-72 rounded-full bg-primary-foreground/10 blur-2xl" />
        <div className="pointer-events-none absolute -bottom-24 right-24 size-64 rounded-full bg-primary-foreground/10 blur-2xl" />
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-foreground">Where do you want to start?</h2>
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {sections.map(({ to, icon: Icon, title, text }) => (
            <Link key={to} to={to} className="surface surface-hover flex flex-col gap-3 p-6">
              <span className="flex size-11 items-center justify-center rounded-2xl bg-secondary text-secondary-foreground">
                <Icon className="size-5" />
              </span>
              <h3 className="text-lg font-semibold text-foreground">{title}</h3>
              <p className="text-sm text-muted-foreground">{text}</p>
              <span className="mt-auto inline-flex items-center gap-1 pt-2 text-sm font-semibold text-primary">
                Open <ArrowRight className="size-4" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="surface grid gap-6 p-8 md:grid-cols-[2fr_1fr] md:items-center">
        <div>
          <p className="pill">Real voice</p>
          <blockquote className="mt-4 font-display text-2xl leading-snug text-foreground">
            "{featured.quote}"
          </blockquote>
          <p className="mt-4 text-sm text-muted-foreground">
            {featured.name}, {featured.age} — {featured.role}
          </p>
          <Link to="/voices" className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline">
            Read more stories <ArrowRight className="size-4" />
          </Link>
        </div>
        <div className="rounded-2xl bg-secondary p-6 text-secondary-foreground">
          <p className="text-sm font-semibold">Remember</p>
          <p className="mt-2 text-sm">
            You're picking your <em>next step</em>, not your whole life. Most Australians change career
            direction several times — the goal right now is to find something worth trying.
          </p>
        </div>
      </section>
    </div>
  );
}
