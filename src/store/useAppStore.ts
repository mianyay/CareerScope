import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Answers } from "@/lib/match";

export type Pin = {
  id: string;
  title: string;
  body: string;
  colour: "sky" | "mint" | "sun" | "rose" | "lilac";
  createdAt: number;
};

export type Reply = {
  id: string;
  author: string;
  body: string;
  createdAt: number;
};

export type Post = {
  id: string;
  room: string;
  author: string;
  body: string;
  createdAt: number;
  likes: number;
  replies: Reply[];
};

export type ChatMessage = {
  id: string;
  role: "student" | "guide";
  text: string;
  suggestions?: string[];
};

type AppState = {
  displayName: string;
  setDisplayName: (name: string) => void;

  answers: Answers;
  setAnswer: (questionId: string, optionIndex: number) => void;
  resetQuiz: () => void;
  quizCompletedAt: number | null;
  completeQuiz: () => void;

  saved: string[];
  toggleSaved: (careerId: string) => void;

  pins: Pin[];
  addPin: (pin: Omit<Pin, "id" | "createdAt">) => void;
  removePin: (id: string) => void;

  posts: Post[];
  addPost: (room: string, author: string, body: string) => void;
  addReply: (postId: string, author: string, body: string) => void;
  likePost: (postId: string) => void;

  chat: ChatMessage[];
  pushChat: (message: ChatMessage) => void;
  clearChat: () => void;
};

const id = () => Math.random().toString(36).slice(2, 10);

const seedPosts: Post[] = [
  {
    id: "seed1",
    room: "Health & Medicine",
    author: "Ella (Yr 12)",
    body: "Anyone else doing UCAT this year? I'm doing 30 mins of practice a day and my abstract reasoning is still terrible. What's working for you?",
    createdAt: Date.now() - 1000 * 60 * 60 * 26,
    likes: 7,
    replies: [
      {
        id: "seedr1",
        author: "Tariq (Yr 12)",
        body: "Timed sections only, no untimed practice. My score jumped once I stopped letting myself linger on questions.",
        createdAt: Date.now() - 1000 * 60 * 60 * 20,
      },
    ],
  },
  {
    id: "seed2",
    room: "Trades & Construction",
    author: "Cooper (Yr 11)",
    body: "Starting a school-based plumbing apprenticeship next term. Nervous but pretty keen to be earning. Anyone already doing one?",
    createdAt: Date.now() - 1000 * 60 * 60 * 9,
    likes: 12,
    replies: [
      {
        id: "seedr2",
        author: "Jem (Yr 12)",
        body: "Second year carpentry here. First month is all tool names and getting yelled at for standing still. After that it's the best decision I made.",
        createdAt: Date.now() - 1000 * 60 * 60 * 6,
      },
    ],
  },
  {
    id: "seed3",
    room: "Animals & Veterinary",
    author: "Priyanka (Yr 11)",
    body: "I want to be a vet but I'm scared of the ATAR. Has anyone found unis with pathway options?",
    createdAt: Date.now() - 1000 * 60 * 60 * 3,
    likes: 9,
    replies: [],
  },
  {
    id: "seed4",
    room: "Technology",
    author: "Marco (Yr 12)",
    body: "Built my first little app this holidays. Honestly it was mostly Googling errors, but it works. Highly recommend just starting something.",
    createdAt: Date.now() - 1000 * 60 * 50,
    likes: 15,
    replies: [],
  },
];

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      displayName: "",
      setDisplayName: (name) => set({ displayName: name }),

      answers: {},
      setAnswer: (questionId, optionIndex) =>
        set((s) => ({ answers: { ...s.answers, [questionId]: optionIndex } })),
      resetQuiz: () => set({ answers: {}, quizCompletedAt: null }),
      quizCompletedAt: null,
      completeQuiz: () => set({ quizCompletedAt: Date.now() }),

      saved: [],
      toggleSaved: (careerId) =>
        set((s) => ({
          saved: s.saved.includes(careerId)
            ? s.saved.filter((c) => c !== careerId)
            : [...s.saved, careerId],
        })),

      pins: [
        {
          id: "pin-seed",
          title: "My plan so far",
          body: "Finish Year 12 → apply for nursing and paramedicine → keep my casual job for savings.",
          colour: "mint",
          createdAt: Date.now() - 1000 * 60 * 60 * 40,
        },
      ],
      addPin: (pin) => set((s) => ({ pins: [{ ...pin, id: id(), createdAt: Date.now() }, ...s.pins] })),
      removePin: (pinId) => set((s) => ({ pins: s.pins.filter((p) => p.id !== pinId) })),

      posts: seedPosts,
      addPost: (room, author, body) =>
        set((s) => ({
          posts: [
            { id: id(), room, author, body, createdAt: Date.now(), likes: 0, replies: [] },
            ...s.posts,
          ],
        })),
      addReply: (postId, author, body) =>
        set((s) => ({
          posts: s.posts.map((p) =>
            p.id === postId
              ? { ...p, replies: [...p.replies, { id: id(), author, body, createdAt: Date.now() }] }
              : p,
          ),
        })),
      likePost: (postId) =>
        set((s) => ({
          posts: s.posts.map((p) => (p.id === postId ? { ...p, likes: p.likes + 1 } : p)),
        })),

      chat: [],
      pushChat: (message) => set((s) => ({ chat: [...s.chat, message] })),
      clearChat: () => set({ chat: [] }),
    }),
    { name: "career-compass" },
  ),
);
