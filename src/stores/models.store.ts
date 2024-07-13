import { create } from "zustand";
import { createCompletions } from "../api/open-ai";
import { getRandomModels } from "../api/llama-rally";

type Model = {
  name: null | string;
  type: null | string;
  response: null | string;
};

interface ModelState {
  modelA: Model;
  modelB: Model;

  fetchModelAResponse: (responseChunk: string) => void;
  fetchModelBResponse: (responseChunk: string) => void;
  initRandomModels: () => void;
}

export const useModelsStore = create<ModelState>((set, state) => ({
  modelA: { name: "Model A", type: null, response: "" },
  modelB: { name: "Model B", type: null, response: "" },

  fetchModelAResponse: async (prompt: string) => {
    const type = state()?.modelA?.type as string;
    const stream = await createCompletions(type, prompt);

    for await (const chunk of stream) {
      const content = chunk.choices[0]?.delta?.content || "";

      set((state) => ({
        modelA: {
          name: state.modelA.name,
          type: state.modelA.type,
          response: state.modelA.response + content,
        },
      }));
    }
  },

  fetchModelBResponse: async (prompt: string) => {
    const type = state()?.modelB?.type as string;
    const stream = await createCompletions(type, prompt);

    for await (const chunk of stream) {
      const content = chunk.choices[0]?.delta?.content || "";

      set((state) => ({
        modelB: {
          name: state.modelB.name,
          type: state.modelB.type,
          response: state.modelB.response + content,
        },
      }));
    }
  },

  initRandomModels: async () => {
    const models = await getRandomModels(); // {"modelA":"gpt-4","modelB":"gpt-4-turbo"}

    set((state) => ({
      modelA: { ...state.modelA, type: models.modelA },
      modelB: { ...state.modelB, type: models.modelB },
    }));
  },
}));
