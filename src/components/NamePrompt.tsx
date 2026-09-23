import { useState } from "react";
import { useAppStore } from "@/store/useAppStore";

export function NamePrompt({ purpose }: { purpose: string }) {
  const displayName = useAppStore((s) => s.displayName);
  const setDisplayName = useAppStore((s) => s.setDisplayName);
  const [value, setValue] = useState("");

  if (displayName) {
    return (
      <p className="text-sm text-muted-foreground">
        Posting as <span className="font-semibold text-foreground">{displayName}</span>{" "}
        <button onClick={() => setDisplayName("")} className="text-primary hover:underline">
          change
        </button>
      </p>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (value.trim()) setDisplayName(value.trim());
      }}
      className="surface flex flex-wrap items-center gap-3 p-4"
    >
      <label className="text-sm font-medium text-foreground">
        Pick a display name {purpose}
      </label>
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="e.g. Sam (Yr 11)"
        className="min-w-48 flex-1 rounded-xl border border-input bg-card px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
      />
      <button className="rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:opacity-90">
        Save
      </button>
    </form>
  );
}
