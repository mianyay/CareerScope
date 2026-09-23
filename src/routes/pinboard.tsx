import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Trash2, Plus } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { useAppStore, type Pin } from "@/store/useAppStore";
import { careerById } from "@/data/careers";

export const Route = createFileRoute("/pinboard")({
  head: () => ({
    meta: [
      { title: "My pin board — CareerScope" },
      {
        name: "description",
        content: "Keep your favourite careers, quotes, notes and next steps together on one board.",
      },
      { property: "og:title", content: "My pin board — CareerScope" },
      { property: "og:description", content: "Your saved careers, ideas and plans in one place." },
    ],
  }),
  component: PinBoard,
});

const colours: Pin["colour"][] = ["sky", "mint", "sun", "rose", "lilac"];

const colourClass: Record<Pin["colour"], string> = {
  sky: "bg-sky text-sky-foreground",
  mint: "bg-mint text-mint-foreground",
  sun: "bg-sun text-sun-foreground",
  rose: "bg-rose text-rose-foreground",
  lilac: "bg-lilac text-lilac-foreground",
};

function PinBoard() {
  const pins = useAppStore((s) => s.pins);
  const addPin = useAppStore((s) => s.addPin);
  const removePin = useAppStore((s) => s.removePin);
  const saved = useAppStore((s) => s.saved);
  const toggleSaved = useAppStore((s) => s.toggleSaved);

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [colour, setColour] = useState<Pin["colour"]>("sky");

  return (
    <div className="mx-auto max-w-6xl space-y-10">
      <PageHeader
        eyebrow="Your board"
        title="Pin the ideas worth keeping"
        description="Careers you like, quotes that stuck, questions to ask at an open day, or your plan for next year."
      />

      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (!title.trim()) return;
          addPin({ title: title.trim(), body: body.trim(), colour });
          setTitle("");
          setBody("");
        }}
        className="surface grid gap-3 p-5"
      >
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Pin title — e.g. Ask Mum's friend about nursing"
          className="rounded-xl border border-input bg-card px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
        />
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          rows={3}
          placeholder="Notes, links or why it matters to you"
          className="resize-none rounded-xl border border-input bg-card px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
        />
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Colour</span>
          {colours.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setColour(c)}
              aria-label={c}
              className={`size-7 rounded-full border-2 ${colourClass[c]} ${
                colour === c ? "border-primary" : "border-transparent"
              }`}
            />
          ))}
          <button className="ml-auto inline-flex items-center gap-1 rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground">
            <Plus className="size-4" /> Add pin
          </button>
        </div>
      </form>

      {saved.length > 0 && (
        <section>
          <h2 className="text-xl font-semibold text-foreground">Saved careers</h2>
          <div className="mt-3 flex flex-wrap gap-2">
            {saved.map((id) => {
              const career = careerById(id);
              if (!career) return null;
              return (
                <span key={id} className="pill gap-2">
                  <Link to="/careers/$careerId" params={{ careerId: id }} className="hover:underline">
                    {career.title}
                  </Link>
                  <button onClick={() => toggleSaved(id)} aria-label={`Remove ${career.title}`}>
                    ×
                  </button>
                </span>
              );
            })}
          </div>
        </section>
      )}

      <section className="columns-1 gap-5 sm:columns-2 lg:columns-3">
        {pins.map((pin) => (
          <article
            key={pin.id}
            className={`mb-5 break-inside-avoid rounded-2xl p-5 shadow-sm ${colourClass[pin.colour]}`}
          >
            <div className="flex items-start justify-between gap-3">
              <h3 className="font-display text-lg font-semibold">{pin.title}</h3>
              <button onClick={() => removePin(pin.id)} aria-label="Remove pin" className="opacity-60 hover:opacity-100">
                <Trash2 className="size-4" />
              </button>
            </div>
            {pin.body && <p className="mt-2 whitespace-pre-line text-sm">{pin.body}</p>}
            <p className="mt-3 text-xs opacity-70">{new Date(pin.createdAt).toLocaleDateString()}</p>
          </article>
        ))}
      </section>

      {pins.length === 0 && (
        <p className="surface p-8 text-center text-muted-foreground">
          Your board is empty. Add a pin above, or hit "Pin to my board" on any career or quote.
        </p>
      )}
    </div>
  );
}
