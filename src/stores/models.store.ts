import { create } from "zustand";
import { createCompletions } from "../api/open-ai";

type Model = { name: null | string; response: null | string };

interface ModelState {
  modelA: Model;
  modelB: Model;

  fetchModelAResponse: (responseChunk: string) => void;
  fetchModelBResponse: (responseChunk: string) => void;
}

export const useModelsStore = create<ModelState>((set) => ({
  modelA: {
    name: "Model A (GPT-4o)",
    response: "",
  },
  modelB: {
    name: "Model B (GPT-4)",
    response: "",
  },
  fetchModelAResponse: async (prompt: string) => {
    const stream = await createCompletions("gpt-4o", prompt);

    for await (const chunk of stream) {
      const content = chunk.choices[0]?.delta?.content || "";

      set((state) => ({
        modelA: {
          name: state.modelA.name,
          response: state.modelA.response + content,
        },
      }));
    }
  },
  fetchModelBResponse: async (prompt: string) => {
    const stream = await createCompletions("gpt-4", prompt);

    for await (const chunk of stream) {
      const content = chunk.choices[0]?.delta?.content || "";

      set((state) => ({
        modelB: {
          name: state.modelB.name,
          response: state.modelB.response + content,
        },
      }));
    }
  },
}));
