# FinWing – Feature-Übersicht

Diese Übersicht beschreibt den aktuellen Stand der FinWing-App (basierend auf Quelltext und Struktur).

## Bereits implementierte Features

- **Dashboard / Cockpit:** Übersicht über Cashflow, Umsätze, Kosten, geplante Zahlungen, Liquiditätsstatus.
- **Drilldown-Analysen:** Detaillierte Auswertungen für **Speisen, Getränke, Catering, Uber Eats, Wareneinsatz, Personal, Fixkosten, Sonstiges**.
- **Missions / Logbuch:** Aufgaben/Missionen mit Status (offen, aktiv, abgeschlossen), Fortschritts-Tracking, Impact-Berechnung.
- **Sandbox:** Szenario-Simulationen (z.B. Preisänderungen, Kostenanpassungen).
- **Import:** CSV-Import für Umsätze, PDF-Import für Belege.
- **Speicherung:** Lokale Speicherung von XP, Missions, Fokusmodus etc. in `localStorage`.
- **Fokus-Modus:** Verschiedene Betriebsmodi (z.B. Kosten senken, Umsatz steigern, Synergien).
- **Overlays / Modals:** Einstellungen, Import, Berater-Overlay, Fokus-Overlay, Journal-Detail.
- **UI-Komponenten:** Status-Section, Impact-Anzeige, Trend-Pills, Alerts, Insights, Buttons, Menüs.
- **Fehlerbehandlung:** Globales Error-Catching, Babel/Syntax-Fehleranzeige.
- **Responsive Design:** Mobile-optimiert mit TailwindCSS.
- **Icons:** Lucide-Icons für visuelle Unterstützung.
- **DATEV-Export:** Kanzlei-Briefing, Export für Steuerberater.

## Logiken / Technik

- **React** (über Babel im Browser, kein Build-Step nötig)
- **State-Management** via `useState` / `useEffect` / `useCallback`
- **Datenhaltung:** `DATA_CONFIG`-Objekt, dynamische Drilldowns
- **Datenlogik:** Filter, Mapping, Reduktion für Auswertungen und Fortschritt
- **Lokale Persistenz:** `localStorage`
- **Dynamische UI-Generierung** aus Datenstrukturen
- **Fehler-Overlay** bei JS-Fehlern

## Offene / noch nicht implementierte Features (aus Code und TODOs)

- Erweiterte Simulationen (z.B. komplexere Szenarien, mehrere Parameter)
- Multi-User / Team-Funktionen (derzeit nur Einzeluser)
- Backend-Anbindung (derzeit alles lokal)
- Authentifizierung / Benutzerverwaltung
- Automatisierte Datenimporte (z.B. Bank-API)
- Benachrichtigungen / Reminder
- Erweiterte Auswertungen (z.B. Zeitreihen, Benchmarks)
- Mobile App / Offline-Modus
- Internationalisierung / Mehrsprachigkeit
- Verbesserte Fehlerbehandlung für Storage / Import
- Weitere Integrationen (z.B. DATEV-API, Steuerberater-Export)

## Fazit

Die App ist als fortgeschrittenes, lokal laufendes Cashflow- und Betriebssteuerungs-Tool für die Gastronomie konzipiert.
Die wichtigsten Kernfunktionen (Cockpit, Analysen, Missionen, Sandbox, Import, Speicherung, UI) sind umgesetzt.
Erweiterungen für Automatisierung, Multi-User, Backend, Benachrichtigungen und tiefere Analytik sind noch offen.
