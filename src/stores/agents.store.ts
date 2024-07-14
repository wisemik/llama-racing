import { create } from "zustand";
// import { createCompletions } from "../api/open-ai";
import { agentsRequest, getRandomAgents } from "../api/llama-rally";

type Agent = {
  name: null | string;
  type: null | string;
  response: null | string;
};



interface AgentState {
  agentA: Agent;
  agentB: Agent;
  fetchAgentAResponse: (responseChunk: string) => void;
  fetchAgentBResponse: (responseChunk: string) => void;
  initRandomAgents: () => void;
  reset: () => void;
}

export const useAgentsStore = create<AgentState>((set, state) => ({
    agentA: { name: "Agent A", type: null, response: null },
    agentB: { name: "Agent B", type: null, response: null },

    fetchAgentAResponse: async (prompt: string) => {
      const type = state()?.agentA?.type as string;
      const response = await agentsRequest(prompt, type);
  
        set((state) => ({
          agentA: {
            name: state.agentA.name,
            type: state.agentA.type,
            response:  response.response,
          },
        }));
    },

  fetchAgentBResponse: async (prompt: string) => {
    const type = state()?.agentB?.type as string;
    const response = await agentsRequest(prompt, type);

      set((state) => ({
        agentB: {
          name: state.agentB.name,
          type: state.agentB.type,
          response: response.response,
        },
      }));
  },

  // getAgentARequest: async (agent: string, message: string) => {
  //   const response = await agentsRequest(agent, message); 
  //   set((state) => ({
  //     agentA: {
  //       name: state.agentA.name,
  //       type: state.agentA.type,
  //       response: (state.agentA.response || "") + response,
  //     },
  //   }));
  // },

  // getAgentBRequest: async (agent: string, message: string) => {
  //   const response = await agentsRequest(agent, message); 
  //   set((state) => ({
  //     agentB: {
  //       name: state.agentB.name,
  //       type: state.agentB.type,
  //       response: (state.agentB.response || "") + response,
  //     },
  //   }));
  // },

  initRandomAgents: async () => {
    const agents = await getRandomAgents(); // {"agentA":"gpt-4","agentB":"gpt-4-turbo"}
    set((state) => ({
      agentA: { ...state.agentA, type: agents.agentA },
      agentB: { ...state.agentB, type: agents.agentB },
    }));
  },

  reset: () => {
    set((state) => ({
        agentA: { ...state.agentA, response: null },
        agentB: { ...state.agentB, response: null },
    }));
  },
}));
