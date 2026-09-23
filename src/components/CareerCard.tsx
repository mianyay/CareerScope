import { Link } from "@tanstack/react-router";
import { Bookmark, BookmarkCheck, ArrowRight } from "lucide-react";
import type { Career } from "@/data/careers";
import { useAppStore } from "@/store/useAppStore";

const demandTone: Record<Career["demand"], string> = {
  "Growing fast": "bg-mint text-mint-foreground",
  Steady: "bg-sky text-sky-foreground",
  Competitive: "bg-sun text-sun-foreground",
};

export function CareerCard({ career, badge }: { career: Career; badge?: string }) {
  const saved = useAppStore((s) => s.saved.includes(career.id));
  const toggleSaved = useAppStore((s) => s.toggleSaved);

  return (
    <article className="surface surface-hover flex flex-col p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-primary">{career.field}</p>
          <h3 className="mt-1 text-lg font-semibold text-foreground">{career.title}</h3>
        </div>
        <button
          onClick={() => toggleSaved(career.id)}
          aria-label={saved ? "Remove from saved" : "Save career"}
          className="rounded-full border border-border bg-card p-2 text-muted-foreground transition-colors hover:text-primary"
        >
          {saved ? <BookmarkCheck className="size-4 text-primary" /> : <Bookmark className="size-4" />}
        </button>
      </div>

      <p className="mt-3 text-sm text-muted-foreground">{career.summary}</p>

      <div className="mt-4 flex flex-wrap gap-2">
        <span className="pill">{career.pathway}</span>
        <span className={`pill ${demandTone[career.demand]}`}>{career.demand}</span>
        <span className="pill">{career.pay}</span>
        {badge && <span className="pill bg-lilac text-lilac-foreground">{badge}</span>}
      </div>

      <Link
        to="/careers/$careerId"
        params={{ careerId: career.id }}
        className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline"
      >
        See the full pathway <ArrowRight className="size-4" />
      </Link>
    </article>
  );
}
