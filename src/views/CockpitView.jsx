import React from "react";
import AskFinWingAI from "../components/AskFinWingAI.jsx";

function CockpitView() {
  return (
    <div className="space-y-4">
      <header>
        <p className="text-xs uppercase text-slate-400">FinWing • Gastro Control</p>
        <h1 className="text-xl font-semibold">Cockpit</h1>
      </header>

      <section className="rounded-2xl bg-slate-900 border border-slate-800 p-4 space-y-1">
        <p className="text-sm font-medium">Demo-Kennzahlen (Mock)</p>
        <p className="text-xs text-slate-400">
          Diese Karte ist nur ein Platzhalter. Hier kann der Entwickler deine echten Widgets aus der bisherigen HTML-App integrieren.
        </p>
      </section>

      <AskFinWingAI />
    </div>
  );
}

export default CockpitView;
