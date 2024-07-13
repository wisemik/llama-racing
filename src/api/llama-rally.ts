import { ISuccessResult } from "@worldcoin/idkit";

const serverUrl = "http://164.92.123.157:5001";

type CriticizeUserResponse = {
  score: number;
  description: string;
};
type CriticizeUserResponseError = {
  error: string;
};

export async function criticizeUserRequest(prompt: string) {
  const response = await fetch(`${serverUrl}/criticize_user_request`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ prompt }),
  });
  const jsonData = (await response.json()) as
    | CriticizeUserResponse
    | CriticizeUserResponseError;

  return jsonData;
}

export async function getRandomModels() {
  const response = await fetch(`${serverUrl}/random_models`, {
    headers: { "Content-Type": "application/json" },
  });
  const jsonData = (await response.json()) as {
    modelA: string;
    modelB: string;
  };

  return jsonData;
}

// export async function llmRequestStreaming(model: string, message: string) {
//   const response = await fetch(`${serverUrl}/llm_request_streaming`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ model, message }),
//   });

//   if (!response.body) {
//     return
//   }

//   console.log()

//   for await (const chunk of response.body.getReader()) {

//   }
// }

export async function getLeaderboard() {
  const response = await fetch(`${serverUrl}/leaderboard`, {
    headers: { "Content-Type": "application/json" },
  });
  const jsonData = await response.json();

  return jsonData;
}

export type VerifyResponse = { code: string; detail: string };

export const verify = async (result: ISuccessResult) => {
  const reqBody = {
    merkle_root: result.merkle_root,
    nullifier_hash: result.nullifier_hash,
    proof: result.proof,
    verification_level: result.verification_level,
    action: import.meta.env.VITE_NEXT_PUBLIC_WLD_ACTION,
    signal: "",
  };

  const res = await fetch(`${serverUrl}/verify`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(reqBody),
  });

  return (await res.json()) as VerifyResponse;
};
