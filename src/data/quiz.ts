export type QuizSection = "Personality" | "Habits & lifestyle" | "Interests";

export type QuizOption = {
  label: string;
  tags: string[];
};

export type QuizQuestion = {
  id: string;
  section: QuizSection;
  question: string;
  options: QuizOption[];
};

export const quizQuestions: QuizQuestion[] = [
  // Personality
  {
    id: "p1",
    section: "Personality",
    question: "A big group project lands on you. What role do you naturally take?",
    options: [
      { label: "Organise everyone and set the deadlines", tags: ["leading", "organising"] },
      { label: "Solve the hardest part on my own", tags: ["problem solving", "detail"] },
      { label: "Make it look amazing", tags: ["creative"] },
      { label: "Keep everyone happy and included", tags: ["helping people", "talking to people"] },
    ],
  },
  {
    id: "p2",
    section: "Personality",
    question: "How do you feel about talking to strangers?",
    options: [
      { label: "Love it — I'll chat with anyone", tags: ["talking to people", "leading"] },
      { label: "Fine if there's a reason for it", tags: ["helping people"] },
      { label: "I'd rather focus on the task", tags: ["detail", "problem solving"] },
      { label: "Depends on my mood", tags: ["creative"] },
    ],
  },
  {
    id: "p3",
    section: "Personality",
    question: "Something goes wrong at the last minute. You...",
    options: [
      { label: "Stay calm and start fixing it", tags: ["problem solving", "hands-on"] },
      { label: "Take charge and delegate", tags: ["leading"] },
      { label: "Check exactly what went wrong first", tags: ["detail", "science"] },
      { label: "Find a creative workaround", tags: ["creative"] },
    ],
  },
  {
    id: "p4",
    section: "Personality",
    question: "Which compliment would mean the most to you?",
    options: [
      { label: "'You really helped me.'", tags: ["helping people"] },
      { label: "'Nobody else could have figured that out.'", tags: ["problem solving", "numbers"] },
      { label: "'That is so original.'", tags: ["creative"] },
      { label: "'You built that with your own hands?'", tags: ["hands-on", "physical"] },
    ],
  },
  // Habits & lifestyle
  {
    id: "h1",
    section: "Habits & lifestyle",
    question: "Your ideal working day starts...",
    options: [
      { label: "Before sunrise — I'm an early bird", tags: ["hands-on", "physical"] },
      { label: "Normal 9am hours", tags: ["organising", "numbers"] },
      { label: "Late, and finishing late", tags: ["creative", "talking to people"] },
      { label: "Different every day", tags: ["travel", "physical"] },
    ],
  },
  {
    id: "h2",
    section: "Habits & lifestyle",
    question: "Where do you want to spend most of your time?",
    options: [
      { label: "Outside, in all weather", tags: ["outdoors", "physical"] },
      { label: "At a desk with good coffee", tags: ["technology", "numbers"] },
      { label: "Moving between people and places", tags: ["talking to people", "travel"] },
      { label: "In a workshop, kitchen or site", tags: ["hands-on", "creative"] },
    ],
  },
  {
    id: "h3",
    section: "Habits & lifestyle",
    question: "How long do you want to study before earning real money?",
    options: [
      { label: "I want to earn while I learn", tags: ["hands-on", "physical"] },
      { label: "One or two years is fine", tags: ["organising", "helping people"] },
      { label: "Three to four years at uni", tags: ["science", "numbers"] },
      { label: "As long as it takes — five years plus", tags: ["science", "detail"] },
    ],
  },
  {
    id: "h4",
    section: "Habits & lifestyle",
    question: "How do you feel about physical work?",
    options: [
      { label: "Bring it on, I hate sitting still", tags: ["physical", "hands-on", "outdoors"] },
      { label: "Some movement, not all day", tags: ["helping people", "talking to people"] },
      { label: "I'd rather use my brain than my back", tags: ["numbers", "technology", "detail"] },
      { label: "Only if it's sport-related", tags: ["physical"] },
    ],
  },
  {
    id: "h5",
    section: "Habits & lifestyle",
    question: "What matters most in your first job?",
    options: [
      { label: "Good money as early as possible", tags: ["hands-on", "numbers"] },
      { label: "Helping people who need it", tags: ["helping people"] },
      { label: "Freedom and variety", tags: ["creative", "travel"] },
      { label: "Learning from experts", tags: ["science", "detail"] },
    ],
  },
  // Interests
  {
    id: "i1",
    section: "Interests",
    question: "Which school subject do you actually look forward to?",
    options: [
      { label: "Science or Biology", tags: ["science", "animals"] },
      { label: "Maths or Economics", tags: ["numbers", "technology"] },
      { label: "Art, Music or Media", tags: ["creative"] },
      { label: "PE, Design or Woodwork", tags: ["physical", "hands-on"] },
    ],
  },
  {
    id: "i2",
    section: "Interests",
    question: "Pick the documentary you'd actually watch.",
    options: [
      { label: "Inside a hospital emergency ward", tags: ["helping people", "science"] },
      { label: "Wildlife rescue and vets", tags: ["animals", "outdoors"] },
      { label: "How a skyscraper gets built", tags: ["hands-on", "problem solving"] },
      { label: "A courtroom trial or true crime", tags: ["detail", "talking to people"] },
    ],
  },
  {
    id: "i3",
    section: "Interests",
    question: "A free Saturday. What are you doing?",
    options: [
      { label: "Fixing, building or making something", tags: ["hands-on", "creative"] },
      { label: "Sport, gym or bushwalking", tags: ["physical", "outdoors"] },
      { label: "Gaming, coding or on my laptop", tags: ["technology", "problem solving"] },
      { label: "Out with friends or working my casual job", tags: ["talking to people", "organising"] },
    ],
  },
  {
    id: "i4",
    section: "Interests",
    question: "Which problem would you most like to help solve?",
    options: [
      { label: "People not getting the healthcare they need", tags: ["helping people", "science"] },
      { label: "Climate change and protecting nature", tags: ["outdoors", "science"] },
      { label: "Online scams and data theft", tags: ["technology", "detail"] },
      { label: "Not enough housing being built", tags: ["hands-on", "organising"] },
    ],
  },
  {
    id: "i5",
    section: "Interests",
    question: "Which of these sounds most satisfying?",
    options: [
      { label: "Finishing something you can see and touch", tags: ["hands-on", "physical"] },
      { label: "Cracking a problem nobody else could", tags: ["problem solving", "numbers"] },
      { label: "Someone thanking you for changing their day", tags: ["helping people", "animals"] },
      { label: "Seeing your work published or on display", tags: ["creative", "talking to people"] },
    ],
  },
];
