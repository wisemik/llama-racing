import { create } from "zustand";
import { persist } from "zustand/middleware";
import { verify, VerifyResponse } from "../api/llama-rally";
import { ISuccessResult } from "@worldcoin/idkit";

type AuthState = {
  nullifier_hash: null | string;

  verify: (result: ISuccessResult) => Promise<VerifyResponse>;
};

export const useAuthStore = create(
  persist<AuthState>(
    (set) => ({
      nullifier_hash: null,

      verify: async (result: ISuccessResult) => {
        const data = await verify(result);

        set(() => ({ nullifier_hash: result.nullifier_hash }));

        return data;
      },
    }),
    {
      name: "auth-storage",
    }
  )
);
