import React from "react";
import AskFinWingAI from "../components/AskFinWingAI.jsx";

function SandboxView() {
  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">Sandbox</h1>
      <p className="text-xs text-slate-400">
        Hier kann dein Entwickler die Preis-/Mengen-/Effizienz-Slider aus der bisherigen FinWing-Sandbox einbauen.
      </p>
      <AskFinWingAI />
    </div>
  );
}

export default SandboxView;
