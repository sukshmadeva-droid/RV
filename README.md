# RuVKompendium 5

Mobile-first PWA-Kompendium für das R+V-Privatkundenportfolio, redaktioneller Datenstand: **08.08.2026**.

## Enthalten

- 81 Produkt- und Beratungswege in **Komposit**, **Leben** und **Kranken**
- Tarif-/Variantenlogik einschließlich classic, comfort und premium, wo R+V diese Staffelung tatsächlich verwendet
- Zusatzbausteine und Berater-Schnellchecks zu den zentralen Produkten
- **Evidence Layer**: Quellen-Icons öffnen relevante, redaktionell verdichtete Bedingungsstellen direkt in der App – mit Dokument, Versionsstand und Fundstelle, ohne Web-Wechsel
- Quellenbelege werden offline mit der PWA gespeichert und ebenfalls von der Live-Suche indexiert
- Direkte Links zu R+V-Produktseiten und aktuellen Bedingungswerken/Bedingungszentrale
- „OrbitSearch 2“: sofortige, fehlertolerante Suche über Produktnamen, Kürzel, Synonyme, Bedarfssituationen, Leistungsmerkmale, Tarife und Bausteine
- Suchoperatoren wie `tarif:premium`, `doc:avb`, `baustein:naturgefahren`
- Offline-Cache per Service Worker; PWA-Manifest und iPhone Home-Screen-Icon
- Eigenständiges Karten-K-App-Icon mit R+V-Kennung in der rechten unteren Ecke
- Edition 05: kompakter Beratungskompass-Header, heller High-Contrast-Look und lokale Quellen-Sheets für den Beratungsmodus
- Keine externen Libraries, kein Build-Schritt

## GitHub Pages

1. Den Inhalt dieses Ordners in ein GitHub-Repository legen.
2. Unter **Settings → Pages** die Branch-Veröffentlichung aktivieren.
3. Die veröffentlichte Seite in Safari auf dem iPhone öffnen.
4. **Teilen → Zum Home-Bildschirm** wählen.

Die App verwendet ausschließlich relative Asset-Pfade und funktioniert deshalb auch unter einem GitHub-Pages-Unterpfad.

## Pflege der Daten

Die Produktdaten stehen zentral in `data.js`, die fachlich geprüften Quellenbelege in `evidence.js`. Jede Überarbeitung wird als neue fortlaufende Edition geführt; `sw.js` erhält dafür ebenfalls einen neuen Cache-Namen.

## Fachlicher Hinweis

Die App ist eine redaktionelle Schnellübersicht und ersetzt keine Beratungsdokumentation oder Vertragsprüfung. Maßgeblich sind immer Versicherungsschein, Nachträge, die konkret vereinbarten Bedingungen sowie die aktuellen R+V-Annahme- und Tarifregeln. Preise, Aktionen und Produktdetails können sich nach dem genannten Datenstand ändern.
