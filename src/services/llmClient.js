import { apiUrl } from "./httpClient";

export async function sendChatToLLM({ messages, maxTokens = 400, provider }) {
  const resp = await fetch(apiUrl("/api/llm/chat"), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ messages, maxTokens, provider })
  });

  if (!resp.ok) {
    const text = await resp.text();
    throw new Error(`LLM request failed: ${text}`);
  }
  return resp.json();
}
