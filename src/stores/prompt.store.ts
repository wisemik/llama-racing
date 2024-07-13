import { create } from "zustand";

interface PromptState {
  prompt: string;

  setPrompt: (text: string) => void;
}

export const usePromptStore = create<PromptState>((set) => ({
  prompt: "",
  setPrompt: (text) => set(() => ({ prompt: text })),
}));
