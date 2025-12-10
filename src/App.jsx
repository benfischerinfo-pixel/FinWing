import React, { useState } from "react";
import CockpitView from "./views/CockpitView.jsx";
import SandboxView from "./views/SandboxView.jsx";
import JournalView from "./views/JournalView.jsx";
import DataImportView from "./views/DataImportView.jsx";
import MoneyFlowView from "./views/MoneyFlowView.jsx";
import { ArrowLeftRight, SlidersHorizontal, BookOpen, Upload } from "lucide-react";

const VIEW = {
  COCKPIT: "cockpit",
  SANDBOX: "sandbox",
  JOURNAL: "journal",
  IMPORT: "import"
};

function App() {
  const [activeView, setActiveView] = useState("moneyflow");

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-50">
      <main className="flex-1 max-w-xl mx-auto w-full px-4 pb-20 pt-4 space-y-4">
        {activeView === "moneyflow" && <MoneyFlowView />}
        {activeView === VIEW.COCKPIT && <CockpitView />}
        {activeView === VIEW.SANDBOX && <SandboxView />}
        {activeView === VIEW.JOURNAL && <JournalView />}
        {activeView === VIEW.IMPORT && <DataImportView />}
      </main>

      <nav className="fixed bottom-0 left-0 right-0 border-t border-slate-800 bg-slate-950/95 backdrop-blur">
        <div className="max-w-xl mx-auto flex justify-between px-6 py-2">
          <button
            className={`flex flex-col items-center gap-0.5 text-xs ${
              activeView === "moneyflow" ? "text-indigo-400" : "text-slate-400"
            }`}
            onClick={() => setActiveView("moneyflow")}
          >
            <ArrowLeftRight className="w-5 h-5" />
            <span>Money</span>
          </button>

          <button
            className={`flex flex-col items-center gap-0.5 text-xs ${
              activeView === VIEW.SANDBOX ? "text-indigo-400" : "text-slate-400"
            }`}
            onClick={() => setActiveView(VIEW.SANDBOX)}
          >
            <SlidersHorizontal className="w-5 h-5" />
            <span>Sandbox</span>
          </button>

          <button
            className={`flex flex-col items-center gap-0.5 text-xs ${
              activeView === VIEW.JOURNAL ? "text-indigo-400" : "text-slate-400"
            }`}
            onClick={() => setActiveView(VIEW.JOURNAL)}
          >
            <BookOpen className="w-5 h-5" />
            <span>Journal</span>
          </button>

          <button
            className={`flex flex-col items-center gap-0.5 text-xs ${
              activeView === VIEW.IMPORT ? "text-indigo-400" : "text-slate-400"
            }`}
            onClick={() => setActiveView(VIEW.IMPORT)}
          >
            <Upload className="w-5 h-5" />
            <span>Import</span>
          </button>
        </div>
      </nav>
    </div>
  );
}

export default App;
