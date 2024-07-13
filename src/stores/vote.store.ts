import { create } from "zustand";
import { vote, VoteRequestProps, VoteResult } from "../api/llama-rally";

interface VoteState {
  voteResult: VoteResult | null;

  sendVote: (props: VoteRequestProps) => Promise<string>;
  reset: () => void;
}

export const useVoteStore = create<VoteState>((set) => ({
  voteResult: null,

  sendVote: async (props: VoteRequestProps) => {
    const voteResult = await vote(props);

    set(() => ({ voteResult: props.result }));

    return voteResult.message;
  },
  reset: () => set(() => ({ voteResult: null })),
}));
