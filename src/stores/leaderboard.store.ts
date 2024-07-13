import { create } from "zustand";
import {
  getLeaderboard,
  getLeaderboardAgents,
  LeaderboardModel,
  LeaderboardAgent,
} from "../api/llama-rally";

type LeaderboardModelsState = {
  list: LeaderboardModel[];
  loadLeaderboardModels: () => void;
};

export const useLeaderboardModelsStore = create<LeaderboardModelsState>(
  (set) => ({
    list: [],
    loadLeaderboardModels: async () => {
      const modelList = await getLeaderboard();

      set((state) => ({
        ...state,
        list: modelList.map((item, index) => ({ ...item, id: index })),
      }));
    },
  })
);

type LeaderboardAgentsState = {
  list: LeaderboardAgent[];
  loadLeaderboardAgents: () => void;
};

export const useLeaderboardAgentsStore = create<LeaderboardAgentsState>(
  (set) => ({
    list: [],
    loadLeaderboardAgents: async () => {
      const modelList = await getLeaderboardAgents();

      set((state) => ({
        ...state,
        list: modelList.map((item, index) => ({ ...item, id: index })),
      }));
    },
  })
);
