import { create } from "zustand";

type Leaderboard = {
  name: string;
  price: number;
  price_per_score: number;
  rank: number;
  score: number;
};

export const usePromptStore = create<{ list: Leaderboard }>((set) => ({
  list: [],
}));
