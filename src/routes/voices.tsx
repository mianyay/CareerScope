import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Pin, Quote } from "lucide-react";
import { toast } from "sonner";
import { PageHeader } from "@/components/PageHeader";
import { voices } from "@/data/voices";
import { useAppStore } from "@/store/useAppStore";

export const Route = createFileRoute("/voices")({
  head: () => ({
    meta: [
      { title: "Real voices — how people chose their career | CareerScope" },
      {
        name: "description",
        content:
          "Honest quotes and stories from a vet, plumber, nurse, developer, chef, lawyer and more about how they chose their pathway.",
      },
      { property: "og:title", content: "Real voices — CareerScope" },
      { property: "og:description", content: "What people wish they'd known before choosing a career." },
    ],
  }),
  component: VoicesPage,
});

function VoicesPage() {
  const fields = Array.from(new Set(voices.map((v) => v.field)));
  const [field, setField] = useState<string>("All");
  const addPin = useAppStore((s) => s.addPin);
  const list = field === "All" ? voices : voices.filter((v) => v.field === field);

  return (
    <div className="mx-auto max-w-6xl space-y-10">
      <PageHeader
        eyebrow="Real experience"
        title="People who have already chosen"
        description="Twelve Australians talk honestly about the path they took, what surprised them, and what they'd tell a 16-year-old."
      />

      <div className="flex flex-wrap justify-center gap-2">
        {["All", ...fields].map((f) => (
          <button
            key={f}
            onClick={() => setField(f)}
            className={`rounded-full border px-3 py-1.5 text-xs font-medium transition ${
              field === f
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-card text-muted-foreground hover:border-primary/40"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        {list.map((v) => (
          <article key={v.id} className="surface flex flex-col p-6">
            <Quote className="size-6 text-primary" />
            <blockquote className="mt-3 font-display text-xl leading-snug text-foreground">
              "{v.quote}"
            </blockquote>
            <p className="mt-3 text-sm font-semibold text-foreground">
              {v.name}, {v.age} — {v.role}
            </p>
            <p className="mt-1 text-xs text-muted-foreground">Path: {v.path}</p>
            <p className="mt-4 text-sm text-muted-foreground">{v.story}</p>
            <p className="mt-4 rounded-2xl bg-secondary p-4 text-sm text-secondary-foreground">
              <strong>Their advice:</strong> {v.advice}
            </p>
            <button
              onClick={() => {
                addPin({ title: `${v.name} — ${v.role}`, body: `"${v.quote}"\n${v.advice}`, colour: "sun" });
                toast.success("Quote pinned to your board", {
                  description: `${v.name}'s quote is now on your pin board.`,
                });
              }}
              className="mt-4 inline-flex items-center gap-1 self-start text-sm font-semibold text-primary hover:underline"
            >
              <Pin className="size-4" /> Pin this quote
            </button>
          </article>
        ))}
      </div>
    </div>
  );
}
