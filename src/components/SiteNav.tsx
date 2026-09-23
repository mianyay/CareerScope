import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import careerScopeLogo from "../assets/careerscope-logo.png";
import { ThemeToggle } from "./ThemeToggle";

const links = [
  { to: "/", label: "Home" },
  { to: "/careers", label: "Explore careers" },
  { to: "/quiz", label: "Quiz" },
  { to: "/guide", label: "Ask the guide" },
  { to: "/voices", label: "Real voices" },
  { to: "/pinboard", label: "Pin board" },
  { to: "/community", label: "Community" },
  { to: "/courses", label: "University courses" },
] as const;

export function SiteNav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-card/70 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3">
        <Link to="/" className="flex items-center gap-2" onClick={() => setOpen(false)}>
          <span className="flex size-9 shrink-0 items-center justify-center overflow-hidden rounded-xl">
            <img className="size-9 object-contain" src={careerScopeLogo} alt="" />
          </span>
          <span className="font-display text-lg font-semibold text-foreground">CareerScope</span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              activeOptions={{ exact: l.to === "/" }}
              className="rounded-full px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-secondary-foreground"
              activeProps={{ className: "bg-primary text-primary-foreground hover:bg-primary" }}
            >
              {l.label}
            </Link>
          ))}
          <ThemeToggle />
        </nav>

        <div className="flex items-center gap-2 lg:hidden">
          <ThemeToggle />
          <button
            className="rounded-xl border border-border p-2 text-foreground"
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="grid gap-1 border-t border-border/60 px-4 pb-4 pt-2 lg:hidden">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              activeOptions={{ exact: l.to === "/" }}
              onClick={() => setOpen(false)}
              className="rounded-xl px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-secondary"
              activeProps={{ className: "bg-primary text-primary-foreground" }}
            >
              {l.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
