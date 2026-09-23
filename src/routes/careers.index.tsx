import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { CareerCard } from "@/components/CareerCard";
import { careers, FIELDS, PATHWAYS, TAGS, type Field, type Pathway } from "@/data/careers";

export const Route = createFileRoute("/careers/")({
  head: () => ({
    meta: [
      { title: "Explore careers — CareerScope" },
      {
        name: "description",
        content:
          "Browse over 80 careers across technology, health, veterinary, trades, business, legal, hospitality and more.",
      },
      { property: "og:title", content: "Explore careers — CareerScope" },
      {
        property: "og:description",
        content: "Filter careers by field, study path and what you enjoy doing.",
      },
    ],
  }),
  component: CareersPage,
});

function CareersPage() {
  const [query, setQuery] = useState("");
  const [field, setField] = useState<Field | "All">("All");
  const [pathway, setPathway] = useState<Pathway | "All">("All");
  const [tag, setTag] = useState<string | "All">("All");

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return careers.filter((c) => {
      if (field !== "All" && c.field !== field) return false;
      if (pathway !== "All" && c.pathway !== pathway) return false;
      if (tag !== "All" && !c.tags.includes(tag)) return false;
      if (!q) return true;
      return (
        c.title.toLowerCase().includes(q) ||
        c.summary.toLowerCase().includes(q) ||
        c.field.toLowerCase().includes(q) ||
        c.tags.some((t) => t.includes(q))
      );
    });
  }, [query, field, pathway, tag]);

  return (
    <div className="mx-auto max-w-7xl space-y-10">
      <PageHeader
        eyebrow="Explore"
        title="Every pathway in one place"
        description="Degrees, diplomas, apprenticeships and jobs you can start straight after school. Filter by what you actually like doing."
      />

      <div className="surface space-y-4 p-5">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search a job, e.g. vet, plumber, nurse, coding..."
            className="w-full rounded-2xl border border-input bg-card py-3 pl-10 pr-4 text-sm outline-none focus:ring-2 focus:ring-ring"
          />
        </div>

        <FilterRow label="Field" value={field} options={FIELDS} onChange={(v) => setField(v as Field | "All")} />
        <FilterRow label="Study path" value={pathway} options={PATHWAYS} onChange={(v) => setPathway(v as Pathway | "All")} />
        <FilterRow label="I enjoy" value={tag} options={TAGS} onChange={setTag} />
      </div>

      <p className="text-sm text-muted-foreground">
        Showing <span className="font-semibold text-foreground">{results.length}</span> careers
      </p>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {results.map((c) => (
          <CareerCard key={c.id} career={c} />
        ))}
      </div>

      {results.length === 0 && (
        <p className="surface p-8 text-center text-muted-foreground">
          No matches. Try clearing a filter or searching something broader like "health" or "outdoors".
        </p>
      )}
    </div>
  );
}

function FilterRow({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: readonly string[];
  onChange: (value: string) => void;
}) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="w-20 shrink-0 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        {label}
      </span>
      {["All", ...options].map((option) => (
        <button
          key={option}
          onClick={() => onChange(option)}
          className={`rounded-full border px-3 py-1.5 text-xs font-medium transition ${
            value === option
              ? "border-primary bg-primary text-primary-foreground"
              : "border-border bg-card text-muted-foreground hover:border-primary/40"
          }`}
        >
          {option}
        </button>
      ))}
    </div>
  );
}
