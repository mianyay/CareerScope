import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { RotateCcw } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { CareerCard } from "@/components/CareerCard";
import { quizQuestions, type QuizSection } from "@/data/quiz";
import { matchCareers, scoreTags, topTags } from "@/lib/match";
import { useAppStore } from "@/store/useAppStore";

export const Route = createFileRoute("/quiz")({
  head: () => ({
    meta: [
      { title: "Career quiz — personality, habits and interests | CareerScope" },
      {
        name: "description",
        content:
          "Three short surveys about your personality, habits and interests that suggest careers matching how you like to work.",
      },
      { property: "og:title", content: "Career quiz — CareerScope" },
      { property: "og:description", content: "Answer 14 quick questions and get your career shortlist." },
    ],
  }),
  component: QuizPage,
});

const sections: QuizSection[] = ["Personality", "Habits & lifestyle", "Interests"];

const sectionBlurb: Record<QuizSection, string> = {
  Personality: "How you naturally behave around other people and problems.",
  "Habits & lifestyle": "The kind of days, hours and lifestyle that suit you.",
  Interests: "What you actually enjoy when nobody is making you do it.",
};

function QuizPage() {
  const answers = useAppStore((s) => s.answers);
  const setAnswer = useAppStore((s) => s.setAnswer);
  const resetQuiz = useAppStore((s) => s.resetQuiz);
  const completeQuiz = useAppStore((s) => s.completeQuiz);
  const [showResults, setShowResults] = useState(false);

  const answered = Object.keys(answers).length;
  const progress = Math.round((answered / quizQuestions.length) * 100);

  const scores = useMemo(() => scoreTags(answers), [answers]);
  const matches = useMemo(() => matchCareers(scores, 9), [scores]);
  const strengths = topTags(scores, 5);

  return (
    <div className="mx-auto max-w-4xl space-y-10">
      <PageHeader
        eyebrow="Surveys"
        title="Find out what actually suits you"
        description="Fourteen quick questions across three surveys. There are no wrong answers — answer how you really are, not how you think you should be."
      />

      <div className="surface sticky top-20 z-30 flex items-center gap-4 p-4">
        <div className="h-2 flex-1 overflow-hidden rounded-full bg-muted">
          <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${progress}%` }} />
        </div>
        <span className="text-sm font-semibold text-foreground">
          {answered}/{quizQuestions.length}
        </span>
        <button
          onClick={() => {
            resetQuiz();
            setShowResults(false);
          }}
          className="inline-flex items-center gap-1 rounded-xl border border-border px-3 py-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground"
        >
          <RotateCcw className="size-3.5" /> Reset
        </button>
      </div>

      {sections.map((section) => (
        <section key={section} className="space-y-4">
          <div>
            <h2 className="text-2xl font-semibold text-foreground">{section}</h2>
            <p className="text-sm text-muted-foreground">{sectionBlurb[section]}</p>
          </div>
          {quizQuestions
            .filter((q) => q.section === section)
            .map((q) => (
              <div key={q.id} className="surface p-5">
                <p className="font-semibold text-foreground">{q.question}</p>
                <div className="mt-3 grid gap-2 sm:grid-cols-2">
                  {q.options.map((option, index) => {
                    const selected = answers[q.id] === index;
                    return (
                      <button
                        key={option.label}
                        onClick={() => setAnswer(q.id, index)}
                        className={`rounded-2xl border px-4 py-3 text-left text-sm transition ${
                          selected
                            ? "border-primary bg-primary text-primary-foreground"
                            : "border-border bg-card text-foreground hover:border-primary/50"
                        }`}
                      >
                        {option.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
        </section>
      ))}

      <div className="flex flex-wrap items-center gap-3">
        <button
          onClick={() => {
            completeQuiz();
            setShowResults(true);
          }}
          disabled={answered === 0}
          className="rounded-2xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground disabled:opacity-40"
        >
          Show my career matches
        </button>
        {answered < quizQuestions.length && (
          <p className="text-sm text-muted-foreground">
            You can see results any time, but answering all {quizQuestions.length} gives a sharper match.
          </p>
        )}
      </div>

      {showResults && matches.length > 0 && (
        <section id="results" className="space-y-5">
          <div className="surface p-6">
            <h2 className="text-2xl font-semibold text-foreground">Your results</h2>
            <p className="mt-2 text-muted-foreground">
              Your answers lean towards <strong className="text-foreground">{strengths.join(", ")}</strong>.
              Here are the careers that fit that best.
            </p>
            <Link to="/guide" className="mt-3 inline-block text-sm font-semibold text-primary hover:underline">
              Ask the guide about these results →
            </Link>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {matches.map((m) => (
              <CareerCard key={m.career.id} career={m.career} badge={`${Math.min(m.score, 99)}% match`} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
