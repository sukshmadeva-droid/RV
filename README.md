# RuVKompendium 1

Mobile-first PWA-Kompendium für das R+V-Privatkundenportfolio, redaktioneller Datenstand: **08.08.2026**.

## Enthalten

- 80 Produkt- und Beratungswege in **Komposit**, **Leben** und **Kranken**
- Tarif-/Variantenlogik einschließlich classic, comfort und premium, wo R+V diese Staffelung tatsächlich verwendet
- Zusatzbausteine und Berater-Schnellchecks zu den zentralen Produkten
- Direkte Links zu R+V-Produktseiten und aktuellen Bedingungswerken/Bedingungszentrale
- „OrbitSearch“: sofortige Suche über Produktnamen, Kürzel, Synonyme, Leistungsmerkmale, Tarife und Bausteine
- Suchoperatoren wie `tarif:premium`, `doc:avb`, `baustein:naturgefahren`
- Offline-Cache per Service Worker; PWA-Manifest und iPhone Home-Screen-Icon
- Keine externen Libraries, kein Build-Schritt

## GitHub Pages

1. Den Inhalt dieses Ordners in ein GitHub-Repository legen.
2. Unter **Settings → Pages** die Branch-Veröffentlichung aktivieren.
3. Die veröffentlichte Seite in Safari auf dem iPhone öffnen.
4. **Teilen → Zum Home-Bildschirm** wählen.

Die App verwendet ausschließlich relative Asset-Pfade und funktioniert deshalb auch unter einem GitHub-Pages-Unterpfad.

## Pflege der Daten

Die Produktdaten stehen zentral in `data.js`. Jede Überarbeitung sollte als neue Edition `RuVKompendium2`, `RuVKompendium3` usw. geführt werden. `sw.js` erhält dafür ebenfalls einen neuen Cache-Namen.

## Fachlicher Hinweis

Die App ist eine redaktionelle Schnellübersicht und ersetzt keine Beratungsdokumentation oder Vertragsprüfung. Maßgeblich sind immer Versicherungsschein, Nachträge, die konkret vereinbarten Bedingungen sowie die aktuellen R+V-Annahme- und Tarifregeln. Preise, Aktionen und Produktdetails können sich nach dem genannten Datenstand ändern.
