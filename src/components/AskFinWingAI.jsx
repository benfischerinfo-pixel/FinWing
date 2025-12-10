import React, { useState } from "react";
import { Send, Sparkles, Loader2 } from "lucide-react";
import { useLLMChat } from "../hooks/useLLMChat";

const SYSTEM_PROMPT =
  "Du bist FinWing, ein pragmatischer Finanz-Co-Pilot für Gastronomie-Betriebe. " +
  "Du antwortest kurz, klar und mit Fokus auf Cashflow, Wareneinsatz, Personalkosten und Runway. " +
  "Du machst KEINE rechtliche oder steuerliche Beratung, sondern gibst nur betriebswirtschaftliche Einschätzungen.";

function AskFinWingAI() {
  const [input, setInput] = useState("");
  const { messages, isLoading, error, askLLM } = useLLMChat({
    systemPrompt: SYSTEM_PROMPT,
    provider: "openai"
  });

  const lastAssistantMsg = [...messages].reverse().find((m) => m.role === "assistant");

  async function handleSubmit(e) {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    await askLLM(input.trim());
    setInput("");
  }

  return (
    <section className="rounded-2xl bg-slate-900 border border-slate-800 p-4 space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-indigo-500/20 flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-indigo-300" />
          </div>
          <div>
            <p className="text-sm font-medium">Frag FinWing</p>
            <p className="text-xs text-slate-400">
              Z.B. “Wie kritisch ist mein aktueller Runway?” oder “Wie viel Puffer brauche ich für Januar?”.
            </p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="flex items-center gap-2">
        <input
          className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm outline-none focus:border-indigo-500"
          placeholder="Frage an die KI eingeben…"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          type="submit"
          disabled={isLoading || !input.trim()}
          className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-indigo-500 disabled:bg-slate-700 text-white"
        >
          {isLoading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Send className="w-4 h-4" />
          )}
        </button>
      </form>

      {error && (
        <p className="text-xs text-red-400">
          {error}
        </p>
      )}

      {lastAssistantMsg && (
        <div className="mt-2 rounded-xl bg-slate-950 border border-slate-800 p-3 text-sm text-slate-100">
          {lastAssistantMsg.content}
        </div>
      )}
    </section>
  );
}

export default AskFinWingAI;
