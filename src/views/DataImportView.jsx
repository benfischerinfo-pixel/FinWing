import React, { useState } from "react";
import Papa from "papaparse";
import { bulkUploadTransactions } from "../services/transactionsClient";

function DataImportView() {
  const [localTx, setLocalTx] = useState([]);
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");

  function handleFileChange(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    setStatus("parsing");
    setMessage("CSV wird analysiert…");

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (result) => {
        const rows = result.data;
        const transactions = rows.map((r) => ({
          date: r["Datum"] || r["date"],
          description: r["Buchungstext"] || r["description"],
          amount: parseFloat(String(r["Betrag"] || r["amount"]).replace(",", ".")),
          category: r["Kategorie"] || r["category"] || null
        }));
        setLocalTx(transactions);
        setStatus("parsed");
        setMessage(`${transactions.length} Buchungen analysiert. Jetzt hochladen.`);
      },
      error: (err) => {
        console.error(err);
        setStatus("error");
        setMessage("Fehler beim Einlesen der CSV.");
      }
    });
  }

  async function handleUpload() {
    try {
      setStatus("uploading");
      setMessage("Buchungen werden zum Backend übertragen…");
      const res = await bulkUploadTransactions(localTx);
      setStatus("done");
      setMessage(`Upload fertig: ${res.inserted} Buchungen gespeichert.`);
    } catch (err) {
      console.error(err);
      setStatus("error");
      setMessage(err.message || "Fehler beim Upload.");
    }
  }

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">Daten-Import</h1>
      <p className="text-xs text-slate-400">
        CSV aus Kasse/Bank hochladen. Spalten: Datum, Buchungstext, Betrag, Kategorie (optional).
      </p>

      <label className="flex flex-col items-center justify-center border border-dashed border-slate-700 rounded-xl py-6 cursor-pointer hover:border-indigo-400 transition">
        <input type="file" accept=".csv" className="hidden" onChange={handleFileChange} />
        <p className="text-sm text-slate-200">CSV-Datei auswählen</p>
        <p className="text-xs text-slate-500">Max. 10 MB</p>
      </label>

      {status !== "idle" && (
        <p
          className={`text-xs ${
            status === "error" ? "text-red-400" : "text-slate-300"
          }`}
        >
          {message}
        </p>
      )}

      {localTx.length > 0 && status !== "done" && (
        <>
          <div className="rounded-2xl bg-slate-900 border border-slate-800 p-3">
            <p className="text-xs text-slate-400 mb-2">Vorschau (erste 5 Buchungen):</p>
            <div className="space-y-1 text-xs">
              {localTx.slice(0, 5).map((t, idx) => (
                <div
                  key={idx}
                  className="flex justify-between gap-2 border-b border-slate-800/60 py-1.5 last:border-b-0"
                >
                  <span className="w-16 text-slate-400">{t.date}</span>
                  <span className="flex-1 truncate">{t.description}</span>
                  <span
                    className={
                      t.amount < 0
                        ? "text-red-300 text-right w-20"
                        : "text-emerald-300 text-right w-20"
                    }
                  >
                    {t.amount.toFixed(2)} €
                  </span>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={handleUpload}
            className="text-xs px-4 py-2 rounded-full bg-indigo-500 text-slate-50"
          >
            Buchungen speichern
          </button>
        </>
      )}
    </div>
  );
}

export default DataImportView;
