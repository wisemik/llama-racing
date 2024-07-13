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
