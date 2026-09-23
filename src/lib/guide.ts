import { careers, type Career } from "@/data/careers";
import { institutions } from "@/data/universities";
import { voices } from "@/data/voices";
import { matchCareers } from "@/lib/match";

export type GuideReply = { text: string; suggestions: string[] };

const normalise = (s: string) => s.toLowerCase().replace(/[^a-z0-9\s]/g, " ");

const EXTRA_KEYWORDS: Record<string, string[]> = {
  veterinarian: ["vet", "vets", "animal doctor"],
  nurse: ["nursing"],
  doctor: ["medicine", "gp", "surgeon", "med school"],
  plumber: ["plumbing"],
  electrician: ["sparky", "electrical"],
  lawyer: ["law", "solicitor", "barrister"],
  "software-developer": ["coding", "programmer", "programming", "coder", "software"],
  "real-estate-agent": ["real estate", "realtor", "property sales"],
  chef: ["cooking", "cook", "restaurant", "kitchen"],
  "personal-trainer": ["pt", "gym", "fitness"],
  psychologist: ["psychology", "therapist"],
  "primary-teacher": ["teaching", "teacher"],
  "police-officer": ["police", "cop"],
  hairdresser: ["hair", "barber"],
  pilot: ["flying", "aviation"],
  carpenter: ["chippy", "carpentry"],
};

function findCareers(question: string): Career[] {
  const q = ` ${normalise(question)} `;
  const hits = careers.filter((c) => {
    const words = [
      ...normalise(c.title).split(/\s+/).filter((w) => w.length > 3),
      ...(EXTRA_KEYWORDS[c.id] ?? []),
    ];
    return words.some((w) => q.includes(` ${w}`) || q.includes(`${w} `) || q.includes(w));
  });
  return hits.slice(0, 3);
}

function careerBrief(c: Career) {
  return `**${c.title}** (${c.field})
${c.summary}

- Pathway: ${c.pathway} — ${c.study}
- Typical pay: ${c.pay} · Demand: ${c.demand}
- Helpful subjects: ${c.subjects.join(", ")}
- A typical day: ${c.day}`;
}

const DEFAULT_SUGGESTIONS = [
  "What careers suit me?",
  "What can I do without going to uni?",
  "How do I become a vet?",
  "Which jobs pay well straight away?",
];

export function askGuide(question: string, tagScores: Record<string, number>): GuideReply {
  const q = normalise(question);
  const has = (...words: string[]) => words.some((w) => q.includes(w));
  const hits = findCareers(question);

  // Greeting
  if (q.trim().length < 3 || has("hello", "hey there", "hi ")) {
    return {
      text: "Hi! I'm your career guide. Ask me about any job — what it involves, what you'd study, what it pays — or tell me what you enjoy and I'll suggest some paths.",
      suggestions: DEFAULT_SUGGESTIONS,
    };
  }

  // Specific career question
  const first = hits[0];
  if (first) {
    const c = first;
    let text = careerBrief(c);

    if (has("pay", "money", "salary", "earn", "rich")) {
      text = `**${c.title}** typically pays ${c.pay}, and demand is described as "${c.demand}".\n\nPay usually starts near the bottom of that range and climbs with experience, licences and (for trades and sales) running your own business.`;
    } else if (has("subject", "atar", "year 11", "year 12", "hsc", "vce", "qce")) {
      text = `For **${c.title}**, the subjects that help most are ${c.subjects.join(", ")}.\n\nStudy path: ${c.study}\n\nIf your marks don't get you straight in, most universities have pathway, bridging or diploma-to-degree options — that detour is normal, not a failure.`;
    } else if (has("uni", "university", "degree", "study", "tafe", "apprentice")) {
      text = `**${c.title}** normally goes through: ${c.pathway}.\n\n${c.study}`;
    }

    const voice = voices.find((v) => v.field === c.field);
    if (voice) {
      text += `\n\n💬 ${voice.name}, ${voice.role}: "${voice.quote}"`;
    }

    const related = careers
      .filter((o) => o.id !== c.id && o.tags.some((t) => c.tags.includes(t)))
      .slice(0, 3)
      .map((o) => o.title);

    return {
      text,
      suggestions: [
        `What does a ${c.title.toLowerCase()} earn?`,
        `What subjects help for ${c.title.toLowerCase()}?`,
        ...related.map((r) => `Tell me about ${r}`),
      ].slice(0, 4),
    };
  }

  // No degree
  if (has("without uni", "no uni", "not go to uni", "no degree", "without a degree", "non degree", "tafe", "apprentice", "trade")) {
    const list = careers
      .filter((c) => c.pathway !== "University")
      .slice(0, 8)
      .map((c) => `- **${c.title}** — ${c.study}`)
      .join("\n");
    return {
      text: `Plenty of strong careers skip university completely. A few worth a look:\n\n${list}\n\nApprenticeships pay you while you train, and TAFE certificates usually take 6 months to 2 years. Many people later add a diploma or start their own business.`,
      suggestions: ["How do I become a plumber?", "Tell me about real estate", "Which trades pay best?", "What careers suit me?"],
    };
  }

  // Money
  if (has("pay", "money", "salary", "earn", "highest paid", "rich")) {
    return {
      text: `Some of the best-paying paths for people your age to aim at:\n\n- **Electrician / Plumber** — $70k–$150k, and you earn from day one of the apprenticeship.\n- **Software or AI Engineer** — $100k–$200k after a degree.\n- **Doctor, Dentist, Pilot** — high pay, but long training.\n- **Sales & Real Estate** — commission means your income depends on you.\n\nA warning worth hearing: pay is the thing people most often over-weight at 17 and least often mention when they're 30. Interest and energy keep you going far longer than a salary figure.`,
      suggestions: ["What can I do without going to uni?", "Tell me about electrician", "What careers suit me?", "Which jobs are growing fastest?"],
    };
  }

  // Growing / job security
  if (has("growing", "future", "demand", "secure", "ai take", "replaced")) {
    const growing = careers.filter((c) => c.demand === "Growing fast").slice(0, 8).map((c) => `- ${c.title}`).join("\n");
    return {
      text: `These are all in the "growing fast" group right now:\n\n${growing}\n\nHealth, care, trades and clean energy are growing because Australia's population is ageing and we're building and electrifying a lot. Hands-on and people-facing jobs are also the hardest for technology to replace.`,
      suggestions: ["Tell me about nursing", "Tell me about renewable energy technician", "What careers suit me?", "What can I do without going to uni?"],
    };
  }

  // Universities
  if (has("university option", "which uni", "best uni", "universities", "uni in", "campus", "atar")) {
    const list = institutions.filter((i) => i.type === "University").slice(0, 6).map((i) => `- **${i.name}** (${i.city}) — ${i.strengths.slice(0, 3).join(", ")}`).join("\n");
    return {
      text: `Here are a few Australian universities to start with:\n\n${list}\n\nOpen the Universities page to filter by state and see TAFE options too. Tip: go to open days in Year 11 — the campus you can actually picture yourself at matters more than a ranking.`,
      suggestions: ["What can I do without going to uni?", "How do I become a vet?", "What careers suit me?", "Which jobs are growing fastest?"],
    };
  }

  // Stress / unsure
  if (has("dont know", "don t know", "no idea", "confused", "stressed", "scared", "worried", "pressure", "unsure", "help me decide")) {
    return {
      text: `That's completely normal — most adults changed direction at least once, and almost nobody had it figured out at 16.\n\nThree things that genuinely help:\n1. Take the quiz here; it turns vague feelings into a shortlist.\n2. Talk to one real person doing a job you're curious about — read Real Voices for a start.\n3. Try before you commit: work experience, a casual job, a volunteer shift.\n\nYou're choosing a next step, not signing a life contract.`,
      suggestions: ["What careers suit me?", "What can I do without going to uni?", "Which jobs are growing fastest?", "How do I become a nurse?"],
    };
  }

  // Personalised match
  const matches = matchCareers(tagScores, 5);
  if (has("suit me", "for me", "what should i", "recommend", "suggest", "good at", "i like", "i enjoy", "interested")) {
    if (matches.length === 0) {
      return {
        text: `I can give much better suggestions once I know you a bit. Take the three short surveys on the Quiz page (about 3 minutes) and then ask me again — I'll use your results.\n\nIn the meantime, tell me a subject or activity you actually enjoy and I'll name some careers around it.`,
        suggestions: DEFAULT_SUGGESTIONS,
      };
    }
    const list = matches.map((m) => `- **${m.career.title}** (${m.career.pathway}) — matches your ${m.reasons.slice(0, 2).join(" and ")} answers`).join("\n");
    return {
      text: `Based on your quiz answers, these fit you best:\n\n${list}\n\nOpen any of them in Explore Careers for the full picture, then pin your favourites to your board.`,
      suggestions: matches.slice(0, 3).map((m) => `Tell me about ${m.career.title}`).concat("What can I do without going to uni?"),
    };
  }

  // Fallback
  return {
    text: `I'm not sure I caught that one. I can help with:\n\n- What a specific job involves, pays and requires — try "how do I become a vet?"\n- Paths that don't need university\n- Which careers suit your quiz results\n- Australian university and TAFE options\n\nAsk me in your own words and I'll do my best.`,
    suggestions: DEFAULT_SUGGESTIONS,
  };
}
