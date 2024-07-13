import { create } from "zustand";
import { getLeaderboard } from "../api/llama-rally";

export type Leaderboard = {
  id: number;
  name: string;
  price: number;
  price_per_score: number;
  rank: number;
  score: number;
};

type LeaderboardModelsState = {
  list: Leaderboard[];

  loadLeaderboardModels: () => void;
};

export const useLeaderboardStore = create<LeaderboardModelsState>((set) => ({
  list: [],
  loadLeaderboardModels: async () => {
    const modelList = (await getLeaderboard()) as Leaderboard[];

    set((state) => ({
      ...state,
      list: modelList.map((item, index) => ({ ...item, id: index })),
    }));
  },
}));
