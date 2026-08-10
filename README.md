# RuVKompendium 15

Mobile-first PWA-Kompendium für das R+V-Privatkundenportfolio, redaktioneller Datenstand: **10.08.2026**.

## Enthalten

- 83 Produkt- und Beratungswege in **Komposit**, **Leben** und **Kranken**; ausschließlich aktuelles Privatkunden-Neugeschäft
- Tarif-/Variantenlogik einschließlich classic, comfort und premium, wo R+V diese Staffelung tatsächlich verwendet
- Zusatzbausteine und Berater-Schnellchecks zu den zentralen Produkten
- **Leistungsmatrix mit 1.199 Angaben** für 83 Produkt- und Beratungswege; einschließlich 73 zusätzlicher Rollenhinweise
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
- Edition 10: einheitliche blaue Quellenkugeln; die Zahl zeigt die Anzahl der direkt offline lesbaren Belege und ersetzt die bisherigen orange markierten Symbol-Badges
- Edition 11: größere, iPhone-taugliche Such-, Beratungs-, Matrix- und Quellentexte, korrigierte Schriftvererbung für Safari und wieder freigegebener Pinch-Zoom
- Edition 12: allgemeiner Fall-Navigator für neun häufige Konstellationen mit Klick-Auswahl, sofortiger Einordnung, offenen Fragen, nächsten Schritten, Produktwegen und offline lesbarer Quellenbasis
- Werte-/Aufbewahrungslogik für Hausrat und Bankschließfach einschließlich Tarifgrenzen, Wohnfläche, häuslichem Bestand, Schließfachwert und bewusst gekennzeichneter EMA-/Wertsachen-Unklarheit
- Edition 13: kontextabhängige Flächenabfrage im Immobilienfall – Wohnfläche für Wohngebäude, Grundstücksfläche ausschließlich für Wald und unbebaute Grundstücke
- Edition 14: Vermögensübertragung in vier eigenständige Produkte aufgeteilt; allgemeine Kombi- und Beratungsansichten verlinken ihre konkreten Einzelprodukte direkt
- Edition 15: fachliche Freigabeschicht mit Quellenqualität je Matrixaussage, regelbasierter Fragenmodus und konsequenter Kennzeichnung nicht verifizierter Angaben
- R+V BKK, Lebensarbeitszeitkonto sowie konkrete Beiträge und Rabatte sind bewusst nicht Bestandteil dieser Edition
- Semantische Ergebnisfarben: Blau für neutrale Angaben, Grün nur für bestätigte Passung, Orange für Warnungen/Grenzüberschreitungen und Rot für Stopps
- Produktspezifische Suchbegriffe und Matrixhinweise zu Versicherung für fremde Rechnung, abweichendem Halter/Eigentümer, versicherter Person und Bezugsrecht
- Aktuell 39 explizite Abschluss-/Grenzangaben und 245 lokale Quellenbelege; unbelegte Aussagen sind sichtbar als „nicht verifiziert“ gekennzeichnet
- Keine externen Libraries, kein Build-Schritt

## GitHub Pages

1. Den Inhalt dieses Ordners in ein GitHub-Repository legen.
2. Unter **Settings → Pages** die Branch-Veröffentlichung aktivieren.
3. Die veröffentlichte Seite in Safari auf dem iPhone öffnen.
4. **Teilen → Zum Home-Bildschirm** wählen.

Die App verwendet ausschließlich relative Asset-Pfade und funktioniert deshalb auch unter einem GitHub-Pages-Unterpfad.

## Pflege der Daten

Die Produktdaten stehen in `data.js`, die fachlich geprüften Quellenbelege in `evidence.js`, die Leistungsdatenbank in `coverage.js`, die Rollenlogik in `roles.js` und der allgemeine Fall-Navigator in `cases.js`. Jede Überarbeitung wird als neue fortlaufende Edition geführt; `sw.js` erhält dafür ebenfalls einen neuen Cache-Namen.

## Fachlicher Hinweis

Die App ist eine redaktionelle Schnellübersicht und ersetzt keine Beratungsdokumentation oder Vertragsprüfung. Maßgeblich sind immer Versicherungsschein, Nachträge, die konkret vereinbarten Bedingungen sowie die aktuellen R+V-Annahme- und Tarifregeln. Preise, Aktionen und Produktdetails können sich nach dem genannten Datenstand ändern.
