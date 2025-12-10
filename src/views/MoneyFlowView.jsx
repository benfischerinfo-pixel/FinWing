import React, { useState, useMemo } from "react";
import {
  ArrowLeftRight,
  CircleDot,
  TrendingUp,
  TrendingDown,
  Sparkles,
  AlertTriangle
} from "lucide-react";

const DATA_CONFIG = {
  revenues: [
    { id: "food", label: "Speisen", value: 22000, trendYoY: 0.05 },
    { id: "drinks", label: "Getränke", value: 18500, trendYoY: 0.12 },
    { id: "catering", label: "Catering", value: 8000, trendYoY: -0.4, hasAlert: true },
    { id: "uber", label: "Uber Eats", value: 4500, trendYoY: 0.02 }
  ],
  costs: [
    { id: "cogs", label: "WES", value: 14500, trendYoY: 0.06 },
    { id: "pers", label: "Personal", value: 16800, trendYoY: 0.09 },
    { id: "fix", label: "Fixkosten", value: 8800, trendYoY: 0.03 },
    { id: "other", label: "Sonstiges", value: 2500, trendYoY: 0.01 }
  ],
  drillDowns: {
    food: {
      title: "Analyse: Speisen",
      side: "in",
      items: [
        { name: "Pizza Margherita", unit: "Stück", amount: 950, total: 9500, ly: 8800, trend: 0.08 },
        { name: "Bowl-Kreationen", unit: "Portionen", amount: 420, total: 6300, ly: 5200, trend: 0.21 },
        { name: "Mittagsmenüs", unit: "Portionen", amount: 310, total: 5200, ly: 5700, trend: -0.09 }
      ],
      insight: {
        type: "warning",
        title: "Mittagsgeschäft verliert Dynamik",
        text: "Menü-Umsatz -9 % zum Vorjahr. Karte straffen & 1 Signature-Dish testen."
      }
    },
    drinks: {
      title: "Analyse: Getränke",
      side: "in",
      items: [
        { name: "Hauslimonade", unit: "Gläser", amount: 780, total: 5100, ly: 4200, trend: 0.21 },
        { name: "Spritz & Aperitifs", unit: "Gläser", amount: 430, total: 6100, ly: 5900, trend: 0.03 },
        { name: "Wein & Schaumwein", unit: "Gläser", amount: 260, total: 5300, ly: 5400, trend: -0.02 }
      ],
      insight: {
        type: "info",
        title: "Limo ist dein Star",
        text: "Deckungsbeitrag stark, Preiserhöhung um 0,50 € ist realistisch."
      }
    },
    catering: {
      title: "Analyse: Catering",
      side: "in",
      items: [
        { name: "Firmen-Lunches", unit: "Events", amount: 6, total: 4200, ly: 6400, trend: -0.34 },
        { name: "Private Feiern", unit: "Events", amount: 3, total: 2600, ly: 3800, trend: -0.32 }
      ],
      insight: { type: "danger", title: "Catering kritisch", text: "Akquise erforderlich." }
    },
    uber: {
      title: "Analyse: Uber Eats",
      side: "in",
      items: [{ name: "Spätabend (21–23h)", unit: "Bestellungen", amount: 60, total: 1000, ly: 900, trend: 0.11 }],
      insight: { type: "info", title: "Lieferungen", text: "Provisionen beachten." }
    },
    cogs: {
      title: "Detail: Wareneinsatz",
      side: "out",
      items: [{ name: "Getränke-EK", unit: "Anteil Umsatz", amount: 0.09, total: 2500, ly: 2200, trend: 0.14 }],
      insight: { type: "warning", title: "Wareneinsatz", text: "EK steigt, Lieferanten prüfen." }
    },
    pers: {
      title: "Detail: Personal",
      side: "out",
      items: [{ name: "Küche", unit: "Stunden / Woche", amount: 210, total: 8400, ly: 8100, trend: 0.04 }],
      insight: { type: "warning", title: "Personal", text: "Dienstplan optimieren." }
    },
    fix: {
      title: "Detail: Fixkosten",
      side: "out",
      items: [{ name: "Versicherungen & Gebühren", unit: "Monat", amount: 1, total: 950, ly: 900, trend: 0.06 }],
      insight: { type: "info", title: "Fixkosten", text: "Langfristig verhandeln." }
    },
    other: {
      title: "Detail: Sonstiges",
      side: "out",
      items: [{ name: "Sonstiges", unit: "Monat", amount: 1, total: 1600, ly: 1500, trend: 0.07 }],
      insight: { type: "info", title: "Sonstiges", text: "Überprüfen." }
    }
  }
};

const formatEuro = (val) =>
  new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(Math.round(val || 0));

const formatPercent = (val) => {
  if (val === null || val === undefined || isNaN(val)) return "0 %";
  const sign = val > 0 ? "+" : "";
  return sign + (val * 100).toFixed(1) + " %";
};

export default function MoneyFlowView() {
  const [period, setPeriod] = useState("month");
  const [mode, setMode] = useState("bowtie");
  const [activeId, setActiveId] = useState("food");

  const calcAggregates = useMemo(() => {
    const scaleFactor = period === "year" ? 12 : 1;
    const revenues = DATA_CONFIG.revenues.map((r) => {
      const current = r.value * scaleFactor;
      const lastYear = current / (1 + (r.trendYoY || 0));
      return { ...r, current, lastYear };
    });
    const costs = DATA_CONFIG.costs.map((c) => {
      const current = c.value * scaleFactor;
      const lastYear = current / (1 + (c.trendYoY || 0));
      return { ...c, current, lastYear };
    });

    const totalIn = revenues.reduce((s, r) => s + r.current, 0);
    const totalOut = costs.reduce((s, c) => s + c.current, 0);
    const totalInLy = revenues.reduce((s, r) => s + r.lastYear, 0);
    const totalOutLy = costs.reduce((s, c) => s + c.lastYear, 0);

    const net = totalIn - totalOut;
    const netLy = totalInLy - totalOutLy;
    const netDelta = net - netLy;
    const netTrend = netLy !== 0 ? netDelta / Math.abs(netLy) : 0;

    return { revenues, costs, totalIn, totalOut, totalInLy, totalOutLy, net, netLy, netTrend };
  }, [period]);

  const { revenues, costs, totalIn, totalOut, net, netLy } = calcAggregates;
  const activeConfig = DATA_CONFIG.drillDowns[activeId];

  const renderPill = (item, side) => {
    const isActive = item.id === activeId;
    const isIn = side === "in";
    const activeClass = isIn ? "border-emerald-400 text-emerald-300 bg-emerald-500/10" : "border-red-400 text-red-300 bg-red-500/10";
    const idleClass = isIn ? "border-emerald-500/15 text-emerald-400/80 bg-emerald-500/5" : "border-red-500/15 text-red-400/80 bg-red-500/5";

    return (
      <button
        key={item.id}
        onClick={() => setActiveId(item.id)}
        className={`w-full flex items-center justify-between px-3 py-2 rounded-xl border text-[11px] font-bold mb-2 ${isActive ? activeClass : idleClass}`}
      >
        <span className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-current opacity-75" />
          {item.label}
        </span>
        <span className="font-mono">{formatEuro(item.value || item.current || 0)}</span>
      </button>
    );
  };

  return (
    <div className="space-y-4 animate-in pb-24">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2"><ArrowLeftRight className="text-indigo-400" /> Money Flow</h3>
          <p className="text-[11px] text-slate-500 mt-1">Geldflüsse als Bow-Tie – von Umsatz zu Kosten.</p>
        </div>
        <div className="text-right">
          <div className="text-[10px] text-slate-500 font-bold uppercase mb-1">Netto-Cashflow</div>
          <div className={`text-lg font-black font-mono ${net>=0? 'text-emerald-400':'text-red-400'}`}>{net>=0?'+':''}{formatEuro(Math.abs(net))}</div>
          <div className="text-[10px] text-slate-500 mt-1">In: {formatEuro(totalIn)} · Out: {formatEuro(totalOut)}</div>
        </div>
      </div>

      <div className="grid grid-cols-[1.2fr,auto,1.2fr] gap-3 items-center mb-5">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span className="text-[10px] font-bold uppercase text-emerald-400">Einnahmen</span>
          </div>
          {revenues.map((r) => renderPill(r, 'in'))}
          <div className="text-[10px] text-slate-500 mt-1">Summe: <span className="font-mono text-slate-300">{formatEuro(totalIn)}</span></div>
        </div>

        <div className="flex flex-col items-center gap-2">
          <div className="w-20 h-20 rounded-full border border-slate-700 bg-[#05060b] flex flex-col items-center justify-center shadow-inner">
            <CircleDot className="text-slate-400 mb-1" />
            <span className="text-[9px] font-bold text-slate-400 uppercase">Cash Hub</span>
            <span className="text-[11px] font-mono text-slate-100">{formatEuro(0)}</span>
          </div>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-2 justify-end">
            <span className="text-[10px] font-bold uppercase text-red-400">Ausgaben</span>
            <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
          </div>
          {costs.map((c) => renderPill(c, 'out'))}
          <div className="text-[10px] text-slate-500 mt-1 text-right">Summe: <span className="font-mono text-slate-300">{formatEuro(totalOut)}</span></div>
        </div>
      </div>

      {activeConfig && (
        <div className="mt-4 pt-4 border-t border-slate-800">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              {(activeConfig.side === 'out') ? <TrendingDown className="text-red-400" /> : activeConfig.isProfit ? <Sparkles className="text-indigo-400" /> : <TrendingUp className="text-emerald-400" />}
              <div>
                <div className="text-[11px] font-bold text-slate-400 uppercase">Drill-Down</div>
                <div className="text-sm font-bold text-white">{activeConfig.title}</div>
              </div>
            </div>
            <span className={`px-2 py-1 rounded-full text-[10px] font-bold border ${activeConfig.side==='in'? 'border-emerald-500/40 text-emerald-300 bg-emerald-500/5':'border-red-500/40 text-red-300 bg-red-500/5'}`}>{activeConfig.side==='in' ? 'Einnahme-Quelle' : 'Kostenblock'}</span>
          </div>

          <div className="max-h-40 overflow-y-auto pr-1">
            {(activeConfig.items || []).map((item, idx) => (
              <div key={idx} className="flex justify-between items-center py-1.5 text-[11px] border-b border-slate-800/70 last:border-0">
                <div>
                  <div className="font-medium text-slate-100">{item.name}</div>
                  <div className="text-[10px] text-slate-500">{item.amount} {item.unit}</div>
                </div>
                <div className="text-right">
                  <div className="font-mono text-slate-100">{formatEuro(item.total || 0)}</div>
                  <div className="text-[10px] text-slate-500">VJ: {formatEuro(item.ly || 0)} · {formatPercent(item.trend || 0)}</div>
                </div>
              </div>
            ))}
          </div>

          {activeConfig.insight && (
            <div className="mt-3 p-3 rounded-xl border flex items-start gap-3 text-xs bg-slate-900/60 border-slate-700">
              {activeConfig.insight.type === 'danger' ? <AlertTriangle className="text-red-400" /> : <Sparkles className="text-emerald-400" />}
              <div>
                <div className="font-bold text-slate-100">{activeConfig.insight.title}</div>
                <div className="text-slate-400 text-xs">{activeConfig.insight.text}</div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
