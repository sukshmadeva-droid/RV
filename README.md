# RuVKompendium 9

Mobile-first PWA-Kompendium für das R+V-Privatkundenportfolio, redaktioneller Datenstand: **10.08.2026**.

## Enthalten

- 81 Produkt- und Beratungswege in **Komposit**, **Leben** und **Kranken**
- Tarif-/Variantenlogik einschließlich classic, comfort und premium, wo R+V diese Staffelung tatsächlich verwendet
- Zusatzbausteine und Berater-Schnellchecks zu den zentralen Produkten
- **Leistungsmatrix mit 1.176 Angaben** für alle 81 Produkt- und Beratungswege; darin 1.103 Produkt-/Leistungsangaben und 73 zusätzliche Rollenhinweise
- Vollständige öffentliche R+V-Leistungstabellen für Privathaftpflicht, Hausrat, Hundehalter- und Pferdehalterhaftpflicht mit zusammen 374 Einzelzeilen; die Hausrat-Haftpflicht-Kombi führt beide Tabellen zusammen
- **Evidence Layer**: Quellen-Icons öffnen relevante, redaktionell verdichtete Bedingungsstellen direkt in der App – mit Dokument, Versionsstand und Fundstelle, ohne Web-Wechsel
- Quellenbelege werden offline mit der PWA gespeichert und ebenfalls von der Live-Suche indexiert
- Direkte Links zu R+V-Produktseiten und aktuellen Bedingungswerken/Bedingungszentrale
- „OrbitSearch 2“: sofortige, fehlertolerante Suche über Produktnamen, Kürzel, Synonyme, Bedarfssituationen, Leistungsmerkmale, Tarife und Bausteine
- Suchoperatoren wie `tarif:premium`, `doc:avb`, `baustein:naturgefahren`
- Offline-Cache per Service Worker; PWA-Manifest und iPhone Home-Screen-Icon
- Eigenständiges Karten-K-App-Icon mit R+V-Kennung in der rechten unteren Ecke
- Edition 08: klare Statuslogik „Enthalten / Begrenzt / Optional / Nicht enthalten / Prüfen“, tarifweiser Fokus und Quellenunterlegung je Matrixzeile
- Edition 09: interaktiver Rollen-Checker für neun Spartenkonstellationen mit Klick-Auswahl von Eigentümer/versicherter Person, Versicherungsnehmer, Beitragszahler, Beziehung und Einwilligung
- Produktspezifische Suchbegriffe und Matrixhinweise zu Versicherung für fremde Rechnung, abweichendem Halter/Eigentümer, versicherter Person und Bezugsrecht
- Aktuell 39 explizite Abschluss-/Grenzangaben und über 200 lokale Quellenbelege; kein Produktweg bleibt nur als unbefülltes Kurzprofil stehen
- Keine externen Libraries, kein Build-Schritt

## GitHub Pages

1. Den Inhalt dieses Ordners in ein GitHub-Repository legen.
2. Unter **Settings → Pages** die Branch-Veröffentlichung aktivieren.
3. Die veröffentlichte Seite in Safari auf dem iPhone öffnen.
4. **Teilen → Zum Home-Bildschirm** wählen.

Die App verwendet ausschließlich relative Asset-Pfade und funktioniert deshalb auch unter einem GitHub-Pages-Unterpfad.

## Pflege der Daten

Die Produktdaten stehen in `data.js`, die fachlich geprüften Quellenbelege in `evidence.js`, die Leistungsdatenbank in `coverage.js` und die Rollenlogik in `roles.js`. Jede Überarbeitung wird als neue fortlaufende Edition geführt; `sw.js` erhält dafür ebenfalls einen neuen Cache-Namen.

## Fachlicher Hinweis

Die App ist eine redaktionelle Schnellübersicht und ersetzt keine Beratungsdokumentation oder Vertragsprüfung. Maßgeblich sind immer Versicherungsschein, Nachträge, die konkret vereinbarten Bedingungen sowie die aktuellen R+V-Annahme- und Tarifregeln. Preise, Aktionen und Produktdetails können sich nach dem genannten Datenstand ändern.
