import { useState } from "react";
import { sendChatToLLM } from "../services/llmClient";

export function useLLMChat({ systemPrompt, provider } = {}) {
  const [messages, setMessages] = useState(
    systemPrompt ? [{ role: "system", content: systemPrompt }] : []
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  async function askLLM(userContent) {
    setError(null);
    setIsLoading(true);

    const newMessages = [
      ...messages,
      { role: "user", content: userContent }
    ];

    try {
      const result = await sendChatToLLM({
        messages: newMessages,
        provider
      });

      const reply = result.reply;
      const updated = [
        ...newMessages,
        { role: "assistant", content: reply }
      ];
      setMessages(updated);
      return reply;
    } catch (err) {
      console.error(err);
      setError(err.message || "Fehler bei der KI-Anfrage");
      throw err;
    } finally {
      setIsLoading(false);
    }
  }

  return { messages, isLoading, error, askLLM };
}
