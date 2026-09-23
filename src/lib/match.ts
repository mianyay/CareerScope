import { careers, type Career } from "@/data/careers";
import { quizQuestions } from "@/data/quiz";

export type Answers = Record<string, number>;

export function scoreTags(answers: Answers): Record<string, number> {
  const scores: Record<string, number> = {};
  for (const q of quizQuestions) {
    const choice = answers[q.id];
    if (choice === undefined) continue;
    const option = q.options[choice];
    if (!option) continue;
    for (const tag of option.tags) {
      scores[tag] = (scores[tag] ?? 0) + 1;
    }
  }
  return scores;
}

export function topTags(scores: Record<string, number>, count = 5): string[] {
  return Object.entries(scores)
    .sort((a, b) => b[1] - a[1])
    .slice(0, count)
    .map(([tag]) => tag);
}

export type Match = { career: Career; score: number; reasons: string[] };

export function matchCareers(scores: Record<string, number>, limit = 12): Match[] {
  const total = Object.values(scores).reduce((a, b) => a + b, 0) || 1;
  return careers
    .map((career) => {
      const reasons = career.tags.filter((t) => (scores[t] ?? 0) > 0);
      const raw = career.tags.reduce((sum, t) => sum + (scores[t] ?? 0), 0);
      return { career, score: Math.round((raw / total) * 160), reasons };
    })
    .filter((m) => m.score > 0)
    .sort((a, b) => b.score - a.score || a.career.title.localeCompare(b.career.title))
    .slice(0, limit);
}
