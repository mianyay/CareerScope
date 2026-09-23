import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { GraduationCap, Search } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { COURSE_LEVELS, courses } from "@/data/courses";
import { FIELDS } from "@/data/careers";

export const Route = createFileRoute("/courses/")({
  head: () => ({
    meta: [
      { title: "University courses and TAFE qualifications — CareerScope" },
      {
        name: "description",
        content:
          "Browse Australian university courses, diplomas and apprenticeships, see which universities offer each one and go straight to the course page.",
      },
      { property: "og:title", content: "University courses — CareerScope" },
      {
        property: "og:description",
        content: "Find the course that leads to your career, and the universities and TAFEs that offer it.",
      },
    ],
  }),
  component: CoursesPage,
});

function CoursesPage() {
  const [query, setQuery] = useState("");
  const [level, setLevel] = useState<string>("All");
  const [field, setField] = useState<string>("All");

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return courses.filter((c) => {
      if (level !== "All" && c.level !== level) return false;
      if (field !== "All" && c.field !== field) return false;
      if (!q) return true;
      return (
        c.name.toLowerCase().includes(q) ||
        c.about.toLowerCase().includes(q) ||
        c.providers.some((p) => p.institution.toLowerCase().includes(q)) ||
        c.vceSubjects.some((s) => s.toLowerCase().includes(q))
      );
    });
  }, [query, level, field]);

  return (
    <div className="mx-auto max-w-6xl space-y-10">
      <PageHeader
        eyebrow="Study in Australia"
        title="University courses and TAFE qualifications"
        description="Pick a course to see what you study, the VCE subjects that help, and every university or TAFE that offers it. Tap a provider to open their course page."
      />

      <div className="surface space-y-4 p-5">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search a course e.g. nursing, veterinary, plumbing, computer science"
            className="w-full rounded-2xl border border-input bg-card py-3 pl-10 pr-4 text-sm outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
        <Row label="Level" value={level} options={[...COURSE_LEVELS]} onChange={setLevel} />
        <Row label="Area" value={field} options={[...FIELDS]} onChange={setField} />
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        {results.map((c) => (
          <Link
            key={c.id}
            to="/courses/$courseId"
            params={{ courseId: c.id }}
            className="surface surface-hover flex flex-col p-6"
          >
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-primary">
              <GraduationCap className="size-3.5" /> {c.level}
            </div>
            <h3 className="mt-2 text-lg font-semibold text-foreground">{c.name}</h3>
            <span className="pill mt-2 self-start">{c.field}</span>
            <p className="mt-3 text-sm text-muted-foreground">{c.about}</p>
            <p className="mt-4 text-sm font-semibold text-primary">
              {c.providers.length} {c.providers.length === 1 ? "provider" : "providers"} · {c.duration} →
            </p>
          </Link>
        ))}
      </div>

      {results.length === 0 && (
        <p className="surface p-8 text-center text-muted-foreground">
          No matches — try a different word or clear the filters.
        </p>
      )}
    </div>
  );
}

function Row({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="w-14 shrink-0 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        {label}
      </span>
      {["All", ...options].map((o) => (
        <button
          key={o}
          onClick={() => onChange(o)}
          className={`rounded-full border px-3 py-1.5 text-xs font-medium transition ${
            value === o
              ? "border-primary bg-primary text-primary-foreground"
              : "border-border bg-card text-muted-foreground hover:border-primary/40"
          }`}
        >
          {o}
        </button>
      ))}
    </div>
  );
}
