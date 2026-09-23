import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { Send, Sparkle, Trash2 } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { askGuide } from "@/lib/guide";
import { scoreTags } from "@/lib/match";
import { useAppStore } from "@/store/useAppStore";

export const Route = createFileRoute("/guide")({
  head: () => ({
    meta: [
      { title: "Ask the career guide — CareerScope" },
      {
        name: "description",
        content:
          "Ask questions about any career pathway and get clear answers and suggestions based on your quiz results.",
      },
      { property: "og:title", content: "Ask the career guide — CareerScope" },
      { property: "og:description", content: "Type a question about any job and get a straight answer." },
    ],
  }),
  component: GuidePage,
});

const STARTERS = [
  "What careers suit me?",
  "How do I become a vet?",
  "What can I do without going to uni?",
  "Which jobs are growing fastest?",
  "I don't know what I want to do",
  "Which jobs pay the most?",
];

function GuidePage() {
  const chat = useAppStore((s) => s.chat);
  const pushChat = useAppStore((s) => s.pushChat);
  const clearChat = useAppStore((s) => s.clearChat);
  const answers = useAppStore((s) => s.answers);
  const scores = useMemo(() => scoreTags(answers), [answers]);

  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat.length, thinking]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const send = (text: string) => {
    const question = text.trim();
    if (!question || thinking) return;
    pushChat({ id: Math.random().toString(36).slice(2), role: "student", text: question });
    setInput("");
    setThinking(true);
    window.setTimeout(() => {
      const reply = askGuide(question, scores);
      pushChat({
        id: Math.random().toString(36).slice(2),
        role: "guide",
        text: reply.text,
        suggestions: reply.suggestions,
      });
      setThinking(false);
      inputRef.current?.focus();
    }, 450);
  };

  const lastSuggestions = [...chat].reverse().find((m) => m.role === "guide")?.suggestions ?? STARTERS;

  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <PageHeader
        eyebrow="Interactive guide"
        title="Ask anything about careers"
        description="Type a question in your own words. The guide knows every career, pathway and university in this app — and it uses your quiz answers if you've done them."
      />

      <div className="surface flex min-h-[26rem] flex-col p-5">
        <div className="flex-1 space-y-4">
          {chat.length === 0 && (
            <div className="rounded-2xl bg-secondary p-5 text-secondary-foreground">
              <p className="flex items-center gap-2 font-semibold">
                <Sparkle className="size-4" /> Hi! I'm your career guide.
              </p>
              <p className="mt-2 text-sm">
                Ask me what a job actually involves, what it pays, what you'd study, or what might suit
                you. Try one of the questions below to start.
              </p>
            </div>
          )}

          {chat.map((m) =>
            m.role === "student" ? (
              <div key={m.id} className="flex justify-end">
                <p className="max-w-[85%] rounded-2xl bg-primary px-4 py-3 text-sm text-primary-foreground">
                  {m.text}
                </p>
              </div>
            ) : (
              <div key={m.id} className="max-w-[92%] space-y-1 text-sm text-foreground">
                {m.text.split("\n").map((line, i) => (
                  <p key={i} className={line.startsWith("-") ? "pl-3" : ""}>
                    <RichLine line={line} />
                  </p>
                ))}
              </div>
            ),
          )}

          {thinking && <p className="animate-pulse text-sm text-muted-foreground">Thinking...</p>}
          <div ref={endRef} />
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          {lastSuggestions.slice(0, 4).map((s) => (
            <button
              key={s}
              onClick={() => send(s)}
              className="rounded-full border border-border bg-card px-3 py-1.5 text-xs font-medium text-muted-foreground transition hover:border-primary/50 hover:text-foreground"
            >
              {s}
            </button>
          ))}
        </div>

        <form
          className="mt-4 flex items-end gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            send(input);
          }}
        >
          <textarea
            ref={inputRef}
            value={input}
            rows={2}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                send(input);
              }
            }}
            placeholder="e.g. What do I need to become a paramedic?"
            className="flex-1 resize-none rounded-2xl border border-input bg-card px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-ring"
          />
          <button
            type="submit"
            aria-label="Send"
            className="rounded-2xl bg-primary p-3 text-primary-foreground transition hover:opacity-90"
          >
            <Send className="size-4" />
          </button>
        </form>

        {chat.length > 0 && (
          <button
            onClick={clearChat}
            className="mt-3 inline-flex items-center gap-1 self-start text-xs font-semibold text-muted-foreground hover:text-foreground"
          >
            <Trash2 className="size-3.5" /> Clear conversation
          </button>
        )}
      </div>
    </div>
  );
}

function RichLine({ line }: { line: string }) {
  const parts = line.split(/(\*\*[^*]+\*\*)/g);
  return (
    <>
      {parts.map((part, i) =>
        part.startsWith("**") && part.endsWith("**") ? (
          <strong key={i} className="font-semibold text-foreground">
            {part.slice(2, -2)}
          </strong>
        ) : (
          <span key={i}>{part}</span>
        ),
      )}
    </>
  );
}
