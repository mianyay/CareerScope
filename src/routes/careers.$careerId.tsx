import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Bookmark, BookmarkCheck, ExternalLink, Pin } from "lucide-react";
import { toast } from "sonner";
import { careers, careerById } from "@/data/careers";
import { voices } from "@/data/voices";
import { coursesForCareer } from "@/data/courses";
import { useAppStore } from "@/store/useAppStore";

export const Route = createFileRoute("/careers/$careerId")({
  loader: ({ params }) => {
    const career = careerById(params.careerId);
    if (!career) throw notFound();
    return { career };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Career not found — CareerScope" }, { name: "robots", content: "noindex" }] };
    }
    const { career } = loaderData;
    return {
      meta: [
        { title: `${career.title} — pathway, pay and study | CareerScope` },
        { name: "description", content: `${career.summary} Study path: ${career.pathway}. Typical pay ${career.pay}.` },
        { property: "og:title", content: `${career.title} — CareerScope` },
        { property: "og:description", content: career.summary },
      ],
    };
  },
  component: CareerDetail,
});

function CareerDetail() {
  const { career } = Route.useLoaderData();
  const saved = useAppStore((s) => s.saved.includes(career.id));
  const toggleSaved = useAppStore((s) => s.toggleSaved);
  const addPin = useAppStore((s) => s.addPin);

  const related = careers
    .filter((c) => c.id !== career.id && (c.field === career.field || c.tags.some((t) => career.tags.includes(t))))
    .slice(0, 3);

  const voice = voices.find((v) => v.field === career.field);
  const relatedCourses = coursesForCareer(career.id);

  return (
    <div className="mx-auto max-w-5xl space-y-8">
      <Link to="/careers" className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline">
        <ArrowLeft className="size-4" /> Back to all careers
      </Link>

      <header className="hero-panel px-6 py-10 sm:px-10">
        <p className="pill bg-primary-foreground/20 text-primary-foreground">{career.field}</p>
        <h1 className="mt-4 text-3xl font-semibold sm:text-4xl">{career.title}</h1>
        <p className="mt-3 max-w-2xl text-lg opacity-95">{career.summary}</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <button
            onClick={() => toggleSaved(career.id)}
            className="inline-flex items-center gap-2 rounded-2xl bg-card px-4 py-2 text-sm font-semibold text-primary"
          >
            {saved ? <BookmarkCheck className="size-4" /> : <Bookmark className="size-4" />}
            {saved ? "Saved" : "Save this career"}
          </button>
          <button
            onClick={() => {
              addPin({
                title: career.title,
                body: `${career.summary}\nPath: ${career.pathway} — ${career.study}`,
                colour: "sky",
              });
              toast.success("Pinned to your board", { description: `${career.title} is now on your pin board.` });
            }}
            className="inline-flex items-center gap-2 rounded-2xl border border-primary-foreground/40 px-4 py-2 text-sm font-semibold"
          >
            <Pin className="size-4" /> Pin to my board
          </button>
        </div>
      </header>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <Fact label="Study path" value={career.pathway} />
        <Fact label="Typical pay" value={career.pay} />
        <Fact label="Demand" value={career.demand} />
        <Fact label="Helpful VCE subjects" value={career.vceSubjects.join(", ")} />
      </div>

      <section className="surface space-y-4 p-6">
        <h2 className="text-xl font-semibold text-foreground">A typical day</h2>
        <p className="text-muted-foreground">{career.day}</p>
        <ul className="space-y-2">
          {career.dayDetail.map((d) => (
            <li key={d} className="flex gap-2 text-sm text-muted-foreground">
              <span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" />
              <span>{d}</span>
            </li>
          ))}
        </ul>
        <div className="flex flex-wrap gap-2 pt-2">
          {career.tags.map((t) => (
            <span key={t} className="pill">
              {t}
            </span>
          ))}
        </div>
      </section>

      <section className="surface space-y-4 p-6">
        <h2 className="text-xl font-semibold text-foreground">How you get there, step by step</h2>
        <p className="text-muted-foreground">{career.study}</p>
        <ol className="space-y-3">
          {career.steps.map((s, i) => (
            <li key={s} className="flex gap-3">
              <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
                {i + 1}
              </span>
              <span className="pt-0.5 text-sm text-muted-foreground">{s}</span>
            </li>
          ))}
        </ol>
      </section>

      <section className="surface p-6">
        <h2 className="text-xl font-semibold text-foreground">Study path — courses that lead here</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Tap a course to see every university or TAFE that offers it.
        </p>
        <ul className="mt-4 space-y-3">
          {relatedCourses.map((c) => (
            <li key={c.id} className="rounded-2xl border border-border bg-card p-4">
              <Link
                to="/courses/$courseId"
                params={{ courseId: c.id }}
                className="font-semibold text-primary hover:underline"
              >
                {c.name}
              </Link>
              <p className="mt-1 text-sm text-muted-foreground">
                {c.level} · {c.duration} · {c.providers.length} providers
              </p>
              <p className="mt-2 text-sm text-muted-foreground">{c.entry}</p>
            </li>
          ))}
        </ul>
        <div className="mt-4 rounded-2xl bg-secondary p-4 text-sm text-secondary-foreground">
          <strong>Helpful VCE subjects:</strong> {career.vceSubjects.join(", ")}
        </div>
        <Link to="/courses" className="mt-4 inline-block text-sm font-semibold text-primary hover:underline">
          Browse all courses →
        </Link>
      </section>

      <section className="surface p-6">
        <h2 className="text-xl font-semibold text-foreground">Resources</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Trusted places to read more about this career. These open in a new tab.
        </p>
        <ul className="mt-4 space-y-2">
          {career.resources.map((r) => (
            <li key={r.url}>
              <a
                href={r.url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-start gap-1.5 text-sm font-semibold text-primary hover:underline"
              >
                {r.label} <ExternalLink className="mt-0.5 size-3.5 shrink-0" />
              </a>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-foreground">You might also like</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          {related.map((c) => (
            <Link
              key={c.id}
              to="/careers/$careerId"
              params={{ careerId: c.id }}
              className="surface surface-hover p-5"
            >
              <p className="text-xs font-semibold uppercase tracking-wide text-primary">{c.field}</p>
              <p className="mt-1 font-semibold text-foreground">{c.title}</p>
              <p className="mt-2 text-sm text-muted-foreground">{c.summary}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div className="surface p-5">
      <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{label}</p>
      <p className="mt-2 font-semibold text-foreground">{value}</p>
    </div>
  );
}
