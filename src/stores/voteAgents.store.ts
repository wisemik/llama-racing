import { create } from "zustand";
import { voteAgents, VoteAgentsProps, VoteResult } from "../api/llama-rally";

interface VoteState {
  voteResult: VoteResult | null;

  sendVote: (props: VoteAgentsProps) => Promise<string>;
  reset: () => void;
}

export const useVoteAgentsStore = create<VoteState>((set) => ({
  voteResult: null,

  sendVote: async (props: VoteAgentsProps) => {
    const voteResult = await voteAgents(props);

    set(() => ({ voteResult: props.result }));

    return voteResult.message;
  },
  reset: () => set(() => ({ voteResult: null })),
}));
