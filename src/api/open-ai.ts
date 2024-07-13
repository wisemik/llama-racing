import OpenAI from "openai";

export const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY, // Replace with your actual API key
  dangerouslyAllowBrowser: true, // This is needed for client-side usage
});

export const createCompletions = (model: "gpt-4o" | "gpt-4", prompt: string) =>
  openai.chat.completions.create({
    model,
    messages: [{ role: "user", content: prompt }],
    stream: true,
  });
