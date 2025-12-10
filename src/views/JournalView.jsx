import React, { useEffect, useState } from "react";
import { fetchMissions, updateMissionStatus } from "../services/missionsClient";

function JournalView() {
  const [missions, setMissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const { missions } = await fetchMissions();
        setMissions(missions || []);
      } catch (err) {
        setError(err.message || "Fehler beim Laden");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  async function handleDone(id) {
    try {
      const { mission } = await updateMissionStatus(id, "done");
      setMissions((prev) => prev.map((m) => (m.id === id ? mission : m)));
    } catch (err) {
      console.error(err);
      alert("Konnte Mission nicht aktualisieren.");
    }
  }

  if (loading) {
    return <p className="text-sm text-slate-400">Missionen werden geladen…</p>;
  }

  if (error) {
    return <p className="text-sm text-red-400">{error}</p>;
  }

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">Missionen / Journal</h1>
      {missions.length === 0 ? (
        <p className="text-sm text-slate-400">Noch keine Missionen in der Datenbank.</p>
      ) : (
        <div className="space-y-2">
          {missions.map((m) => (
            <div
              key={m.id}
              className="rounded-2xl bg-slate-900 border border-slate-800 p-3 text-sm flex justify-between items-center"
            >
              <div>
                <p className="font-medium">{m.title}</p>
                {m.description && (
                  <p className="text-xs text-slate-400">{m.description}</p>
                )}
                <p className="text-[11px] text-slate-500 mt-1">
                  Kategorie: {m.category || "–"} · Status: {m.status}
                  {m.impact_per_month && ` · Potenzial: ${m.impact_per_month} €/Monat`}
                </p>
              </div>
              {m.status !== "done" && (
                <button
                  onClick={() => handleDone(m.id)}
                  className="text-xs px-3 py-1 rounded-full bg-emerald-500 text-slate-950"
                >
                  Erledigt
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default JournalView;
