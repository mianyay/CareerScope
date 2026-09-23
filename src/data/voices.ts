import type { Field } from "./careers";

export type Voice = {
  id: string;
  name: string;
  age: number;
  role: string;
  field: Field;
  path: string;
  quote: string;
  story: string;
  advice: string;
};

export const voices: Voice[] = [
  {
    id: "v-mia",
    name: "Mia T.",
    age: 24,
    role: "Veterinarian (mixed practice, regional NSW)",
    field: "Animals & Veterinary",
    path: "Year 12 → Bachelor of Veterinary Science (5 yrs)",
    quote: "I thought loving animals was enough. It's actually 50% talking to worried humans.",
    story:
      "I volunteered at a wildlife shelter from Year 10 and that's what got me through the hard chemistry units. Vet school was competitive, and I missed out on my first preference — I did a science degree for a year and transferred in.",
    advice: "Get real experience early. One week in a clinic tells you more than a hundred TikToks.",
  },
  {
    id: "v-jack",
    name: "Jack R.",
    age: 22,
    role: "Plumber, second year running his own business",
    field: "Trades & Construction",
    path: "Year 11 → school-based apprenticeship → Cert III Plumbing",
    quote: "Everyone told me uni or nothing. I was earning while my mates were paying fees.",
    story:
      "I left school after Year 11 for a school-based apprenticeship. Four years later I was fully licensed with no debt, and at 22 I've got a ute, an ABN and an apprentice of my own.",
    advice: "A trade is a business degree in disguise — learn quoting and bookkeeping early.",
  },
  {
    id: "v-aisha",
    name: "Aisha K.",
    age: 27,
    role: "Software Developer at a health-tech company",
    field: "Technology",
    path: "Year 12 → Bachelor of Computer Science → graduate program",
    quote: "I wasn't a 'computer kid'. I liked puzzles, and code is just a very stubborn puzzle.",
    story:
      "I picked Software Engineering because I liked maths, not because I'd built anything. First year was rough — half the class had coded since they were twelve. By second year the gap closed completely.",
    advice: "You don't need to start ahead. You need to not quit in the first six months.",
  },
  {
    id: "v-daniel",
    name: "Daniel O.",
    age: 31,
    role: "Registered Nurse, emergency department",
    field: "Health & Medicine",
    path: "Aged care Cert III → Bachelor of Nursing as a mature-age student",
    quote: "I failed Year 12 chemistry and I still became a nurse. The path just took a detour.",
    story:
      "I worked in aged care for three years, which got me into nursing through an alternative entry pathway. That experience made my placements far easier than the students who came straight from school.",
    advice: "A bad ATAR closes one door, not the building. Ask about pathway and bridging courses.",
  },
  {
    id: "v-sofia",
    name: "Sofia M.",
    age: 29,
    role: "Real Estate Agent, inner-city agency",
    field: "Retail, Sales & Property",
    path: "Retail job → Certificate IV in Real Estate Practice",
    quote: "My first year I earned almost nothing. My third year I out-earned my friends with degrees.",
    story:
      "I started answering phones at an agency at 19. The Cert IV took a few months part-time. Commission means the bad months are genuinely bad — you need savings and thick skin.",
    advice: "If you can handle rejection on a Saturday morning, sales will pay you very well.",
  },
  {
    id: "v-tom",
    name: "Tom H.",
    age: 26,
    role: "Chef, head of a 40-seat restaurant",
    field: "Hospitality & Food",
    path: "Cookery apprenticeship at 17",
    quote: "The hours are brutal and I'd still pick it again. Nothing beats a full room on a Friday.",
    story:
      "I started as a kitchenhand washing dishes, got offered an apprenticeship and never looked back. I burnt out at 23, took six months off, and came back with better boundaries.",
    advice: "Work one full service before you commit. If the chaos excites you, you'll be fine.",
  },
  {
    id: "v-priya",
    name: "Priya S.",
    age: 33,
    role: "Lawyer, community legal centre",
    field: "Legal",
    path: "Year 12 → Bachelor of Laws + Arts → practical legal training",
    quote: "I chose law for the courtroom drama. I stayed for the client who finally got housing.",
    story:
      "Five years of study, then a year of low-paid graduate work. Corporate law paid triple but I moved to community law and I'm much happier on less money.",
    advice: "Law is reading and writing, not speeches. Test that you enjoy it before you enrol.",
  },
  {
    id: "v-lachlan",
    name: "Lachlan B.",
    age: 21,
    role: "Electrician, third-year apprentice on solar installs",
    field: "Science & Environment",
    path: "Year 12 → pre-apprenticeship course → electrical apprenticeship",
    quote: "Renewables means my trade won't run out of work in my lifetime.",
    story:
      "I did a pre-apprenticeship at TAFE which got me hired ahead of people who applied cold. Most of my work now is rooftop solar and batteries.",
    advice: "Do a short pre-apprenticeship. It proves you'll turn up, which is what bosses want.",
  },
  {
    id: "v-hannah",
    name: "Hannah W.",
    age: 25,
    role: "Primary School Teacher, Year 3",
    field: "Education",
    path: "Year 12 → Bachelor of Education (Primary)",
    quote: "People warned me about the pay. Nobody warned me how much I'd love the weird jokes.",
    story:
      "Placements from first year meant I knew quickly this was right. The paperwork and parent emails are the hard part, not the kids.",
    advice: "Volunteer at a holiday program. Thirty kids at once is the real test.",
  },
  {
    id: "v-noah",
    name: "Noah C.",
    age: 28,
    role: "Data Analyst, retail company",
    field: "Business & Finance",
    path: "Commerce degree → self-taught SQL → analyst role",
    quote: "My degree got the interview. A weekend spent learning SQL got the job.",
    story:
      "I studied Commerce with no clear plan. In my last year I taught myself spreadsheets properly, then SQL, and built two small projects. That portfolio mattered more than my marks.",
    advice: "Build one small real thing. It beats a transcript in every interview I've had.",
  },
  {
    id: "v-grace",
    name: "Grace L.",
    age: 23,
    role: "Paramedic, metro ambulance",
    field: "Public Service & Emergency",
    path: "Year 12 → Bachelor of Paramedicine",
    quote: "You can't un-see some shifts. The team debrief is what keeps you standing.",
    story:
      "I loved the adrenaline idea. The reality is a lot of elderly falls and mental health calls — and that turned out to be the part I find most meaningful.",
    advice: "Ask paramedics what their last ten jobs actually were. It's not what TV shows.",
  },
  {
    id: "v-ben",
    name: "Ben A.",
    age: 30,
    role: "Barber, owns two shops",
    field: "Beauty & Personal Care",
    path: "Apprenticeship at 18 → own shop at 26",
    quote: "I'm half barber, half therapist, and fully a small business owner.",
    story:
      "I did my apprenticeship on low pay for three years. Owning shops means I now spend more time on rosters and rent than on cutting hair.",
    advice: "If you want your own place, learn the business side from day one, not at 26 like me.",
  },
];
