import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ExternalLink, MapPin } from "lucide-react";
import { courseById } from "@/data/courses";
import { careerById } from "@/data/careers";

export const Route = createFileRoute("/courses/$courseId")({
  loader: ({ params }) => {
    const course = courseById(params.courseId);
    if (!course) throw notFound();
    return { course };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Course not found — CareerScope" }, { name: "robots", content: "noindex" }] };
    }
    const { course } = loaderData;
    return {
      meta: [
        { title: `${course.name} — who offers it | CareerScope` },
        { name: "description", content: course.about },
        { property: "og:title", content: `${course.name} — CareerScope` },
        { property: "og:description", content: course.about },
      ],
    };
  },
  component: CourseDetail,
});

function CourseDetail() {
  const { course } = Route.useLoaderData();
  const careers = course.careerIds.map((id) => careerById(id)).filter((c) => c !== undefined);

  return (
    <div className="mx-auto max-w-5xl space-y-8">
      <Link to="/courses" className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline">
        <ArrowLeft className="size-4" /> Back to all courses
      </Link>

      <header className="hero-panel px-6 py-10 sm:px-10">
        <p className="pill bg-primary-foreground/20 text-primary-foreground">{course.level}</p>
        <h1 className="mt-4 text-3xl font-semibold sm:text-4xl">{course.name}</h1>
        <p className="mt-3 max-w-2xl text-lg opacity-95">{course.about}</p>
      </header>

      <div className="grid gap-5 sm:grid-cols-3">
        <Fact label="How long" value={course.duration} />
        <Fact label="Study area" value={course.field} />
        <Fact label="Getting in" value={course.entry} />
      </div>

      <section className="surface p-6">
        <h2 className="text-xl font-semibold text-foreground">Helpful VCE subjects</h2>
        <div className="mt-3 flex flex-wrap gap-2">
          {course.vceSubjects.map((s) => (
            <span key={s} className="pill bg-mint text-mint-foreground">
              {s}
            </span>
          ))}
        </div>
      </section>

      <section className="surface p-6">
        <h2 className="text-xl font-semibold text-foreground">Where you can study it</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Tap a university or TAFE name to open their course page in a new tab.
        </p>
        <ul className="mt-4 space-y-3">
          {course.providers.map((p) => (
            <li key={`${p.institution}-${p.courseName}`} className="rounded-2xl border border-border bg-card p-4">
              <a
                href={p.url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 font-semibold text-primary hover:underline"
              >
                {p.institution} <ExternalLink className="size-3.5" />
              </a>
              <p className="mt-1 text-sm text-muted-foreground">{p.courseName}</p>
              <p className="mt-2 inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                <MapPin className="size-3.5" /> {p.state}
              </p>
            </li>
          ))}
        </ul>
      </section>

      {careers.length > 0 && (
        <section>
          <h2 className="text-xl font-semibold text-foreground">Careers this course leads to</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            {careers.map((c) => (
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
      )}
    </div>
  );
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div className="surface p-5">
      <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{label}</p>
      <p className="mt-2 text-sm font-semibold text-foreground">{value}</p>
    </div>
  );
}
