const serverUrl = "http://164.92.123.157:5001";

export function criticizeUserRequest(prompt: string) {
  return fetch(`${serverUrl}/criticize_user_request`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ prompt }),
  });
}
