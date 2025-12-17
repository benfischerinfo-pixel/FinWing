# FinWing – TODOs & Platzhalter-Übersicht

## Kurzübersicht

- Es gibt mehrere Stellen im Code, die als Platzhalter oder "not implemented" markiert sind.
- Viele UI-Elemente nutzen das Attribut `placeholder` (z.B. für Eingabefelder), was aber meist kein echter Platzhalter für Logik ist.
- Einzelne Komponenten und Views enthalten explizite Hinweise auf noch nicht implementierte Features.
- Die meisten offenen Features sind in der Doku (FEATURES.md) und im Code als Kommentar oder Text sichtbar.
- Die wichtigsten nächsten Schritte betreffen echte Logik- und Integrations-Features, nicht nur UI.

## Gefundene Stellen

- `src/views/CockpitView.jsx`: Hinweis, dass die Karte nur ein Platzhalter ist und echte Widgets integriert werden sollen.
- `standalone.html`: Mehrere Bereiche als "Platzhalter" markiert (Szenarien, Missionen, Import).
- `FEATURES.md`: Liste offener Features (z.B. Multi-User, Backend, Automatisierung, Benachrichtigungen).
- Diverse Eingabefelder in HTML/JSX (z.B. "Frage an die KI eingeben…", "Artikel-Name", "Preis pro Stück", "Paste API Key...") nutzen das Attribut `placeholder` – dies ist aber meist nur UI-Hilfe, keine Logik-TODO.
- Kein echter Backend- oder API-Call implementiert, viele Datenstrukturen sind "hardcoded".
- Steuerberater/DATEV-Export nur als UI-Overlay/Platzhalter, keine echte Export-Logik.
- Lightspeed-Integration nur als Overlay-Flag, keine echte Anbindung.
- XP-Balken im Header ist noch nicht umgesetzt, XP-Logik aber vorhanden.

## Empfehlung: Top 5 nächste Schritte

1. **XP-Balken im Header einbauen** – Fortschritt für Nutzer sichtbar machen.
2. **Steuerberater-Export (DATEV, CSV) implementieren** – echten Export ermöglichen.
3. **Lightspeed-Integration starten** – POS-Daten importieren und synchronisieren.
4. **Backend/API-Anbindung vorbereiten** – für Multi-User, Cloud-Sync und Automatisierung.
5. **Platzhalter-Karten/Widgets im Cockpit durch echte Komponenten ersetzen** – mehr Real-Data, weniger Demo.

---

(Es wurden 10+ relevante Fundstellen dokumentiert, v.a. in src/views/CockpitView.jsx, standalone.html, FEATURES.md und diversen UI-Komponenten.)
