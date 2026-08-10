# Fachlicher Prüfbericht RuVKompendium

## 1. Kurzurteil

RuVKompendium 14 war trotz guter Oberfläche nicht für eine allgemeine Nutzung als fachlich verlässliches Beratungswerkzeug freigabefähig. Ein K.-o.-Fehler wurde nachgewiesen: Die App ordnete der KfzPolice classic eine Neupreisentschädigung bis zwölf Monate zu, obwohl A.2.6.1 b der aktuellen Pkw-Bedingungen diese Leistung ausschließlich für comfort und premium regelt. Zusätzlich fehlten bei 421 Aussagen genaue Fundstellen. Edition 15 korrigiert den nachgewiesenen Fehler, entfernt Beiträge sowie zwei ausgeschlossene Produktwege und stuft Aussagen ohne genaue Fundstelle konsequent auf „nicht verifiziert“ zurück. Wegen weiterhin 416 nicht vollständig belegter Matrixaussagen bleibt auch Edition 15 nur als Recherche- und Vorbereitungshilfe nutzbar, nicht als Grundlage für Deckungszusagen.

## 2. Score und Freigabe

| Prüfbereich | Maximum | Edition 14 | Edition 15 |
|---|---:|---:|---:|
| Fachliche Richtigkeit | 30 | 17 | 22 |
| Quellen- und Versionsgenauigkeit | 20 | 8 | 13 |
| Vollständigkeit einschließlich Grenzen/Ausschlüsse | 15 | 7 | 9 |
| Qualität des Tarifvergleichs | 10 | 7 | 8 |
| Rollen- und Anspruchszuordnung | 10 | 8 | 8 |
| Unsicherheit, fehlende Daten, Widersprüche | 10 | 5 | 9 |
| Verständlichkeit und Beratungstauglichkeit | 5 | 4 | 4 |
| **Gesamt** | **100** | **56** | **73** |

**Edition 14:** nicht freigabefähig; K.-o.-Fehler vorhanden.  
**Edition 15:** nicht allgemein freigabefähig. Eingeschränkte Nutzung als interne Recherche- und Gesprächsvorbereitung ist vertretbar, wenn orange „nicht verifiziert“-Angaben nicht als Leistungszusage verwendet werden.

## 3. Prüfrahmen

- App: RuVKompendium 14, korrigiert als Edition 15
- Prüftag: 10.08.2026
- Rechtsraum: Deutschland
- Zielmarkt: aktuelles R+V-Privatkunden-Neugeschäft
- Umfang Edition 15: 83 Produkt- und Beratungswege
- Ausgeschlossen: Gewerbe, R+V BKK, Lebensarbeitszeitkonto, Beiträge, Rabatte und konkrete Prämien
- Noch nicht unterstützt: ältere Vertragsgenerationen
- Referenzbasis: öffentliche R+V-Bedingungen, Verbraucherinformationen, Leistungsübersichten, Produktinformationen und vorhandene Maklerunterlagen
- Nicht vorliegend: vollständige interne Annahmerichtlinien, Arbeitsanweisungen, Schadenrichtlinien, individuelle Klauseln und Nachträge

## 4. Daten- und Quelleninventur Edition 15

| Merkmal | Ergebnis |
|---|---:|
| Produkte Komposit | 43 |
| Produkte Kranken | 15 |
| Produkte Leben | 25 |
| Produkte gesamt | 83 |
| Matrixaussagen einschließlich Rollenhinweisen | 1.199 |
| Tarifzeilen aus vollständigen Leistungsübersichten | 621 |
| Bedingungsfundstellen | 130 |
| Produktinformationen/Marketingquellen | 10 |
| Quellen mit weiterer manueller Prüfung | 22 |
| Nicht mit genauer Fundstelle verifizierte Aussagen | 416 |
| Besondere lokale Aussagebelege | 245 |
| Produkte mit besonderen Aussagebelegen | 61 von 83 |

Die R+V-Bedingungszentrale weist selbst darauf hin, dass dort die aktuellsten und teilweise ältere Bedingungen bereitgestellt werden. Die App verwaltet diese Generationen bislang nicht als getrennte Datensätze.

## 5. Wesentliche Referenzunterlagen

- R+V-Privathaftpflichtversicherung Leistungsübersicht, Stand 07/2026, IdNr. 324180
- R+V-Hausratversicherung Leistungsübersicht, Stand 07/2026, IdNr. 324181
- R+V-Hundehalterhaftpflicht Leistungsübersicht, Stand 07/2026, IdNr. 322552
- R+V-Pferdehalterhaftpflicht Leistungsübersicht, Stand 07/2026, IdNr. 322551
- R+V Privatkunden Verbraucherinformation classic, Ausgabe 07/2026
- R+V PrivatPolice comfort Verbraucherinformation, Ausgabe 07/2026
- R+V Privatkunden Verbraucherinformation premium, Ausgabe 07/2026
- R+V Verbraucherinformation für Pkw, Stand Juli 2026
- R+V Verbraucherinformation für Nicht-Pkw, Stand 01.07.2026
- R+V Lebensversicherung AG Bedingungsheft PLG 04/26
- R+V Krankenversicherung AG Bedingungsheft PKX 07/26
- R+V Risiko-Unfallversicherung und Kapital-UnfallPolice, veröffentlichte aktuelle Unterlagen
- R+V Lebensversicherung Niederlassung Luxemburg, Bedingungsheft PLL 07/25
- Produktbezogene R+V-Unterlagen zu GeräteSchutz, Mietkaution, Bankschließfach, Tier-OP und ausgewählten Vorsorgeprodukten

## 6. Reproduzierbares Testprotokoll

### Fach-, Tarif- und Falltests

| Test-ID | Kategorie | Produkt/Tarif/Stand | Testfrage | Antwort der App vor Korrektur | Erwartete Antwort und Fundstelle | Ergebnis | Fehlerart / Schweregrad | Beratungsrisiko | Verbesserung |
|---|---|---|---|---|---|---|---|---|---|
| T-001 | Version | App allgemein | Welche Edition nutze ich? | Titel/Info: Edition 14; Header/Status: Edition 13 | Einheitliche Versionsanzeige | falsch | Widerspruch / hoch | Falscher Datenstand wird angenommen | Alle Anzeigen auf Edition 15 vereinheitlicht |
| T-002 | Kfz-Leistung | KfzPolice classic, AKB 07/2026 | Gibt es in classic eine Neupreisentschädigung? | „TK-Neupreis bis 12 Monate“ | **Nicht enthalten.** A.2.6.1 b nennt nur premium 30 Monate und comfort 12 Monate; S. 21 | falsch | Fakten-/Versionsfehler / kritisch | Falsche Tarifempfehlung und Kundenaussage | Korrigiert; Regressionstest ergänzt |
| T-003 | Kfz-Tarifvergleich | classic/comfort/premium, AKB 07/2026 | Neupreisentschädigung nach Tarif? | „je Variante bis zu 30 Monate“ | classic: nicht enthalten; comfort: 12 Monate; premium: 30 Monate; A.2.6.1 b, S. 21 | falsch | Auslassung / kritisch | Unterschied wird verwischt | Exakte Dreiteilung eingebaut |
| T-004 | Haftpflicht | PHV 07/2026 | Forderungsausfall in classic, comfort, premium? | Schnellcheck nannte pauschal 1.000 EUR Mindestschaden | classic: nicht enthalten; comfort: 40 Mio. EUR, Mindestschaden 1.000 EUR; premium: 100 Mio. EUR, Mindestschaden 0 EUR; Leistungsübersicht S. 5/6 | teilweise korrekt | Auslassung / hoch | Premiumvorteil und classic-Ausschluss fehlen | Schnellcheck korrigiert |
| T-005 | Haftpflicht | PHV 07/2026 | Verlust privater Schlüssel? | classic nein, comfort 50.000 EUR, premium 100 Mio. EUR | Entspricht Leistungsübersicht S. 5/6 | korrekt | – | – | Beibehalten |
| T-006 | Hausrat | HR classic/comfort/premium 07/2026 | Hausrat im Bankschließfach? | 20.000/30.000/100.000 EUR | Entspricht Leistungsübersicht S. 2/6; Verhältnis zur Wertsachengrenze zusätzlich prüfen | korrekt | – | Gefahr einer isolierten Fehlinterpretation | Warnhinweis bleibt bestehen |
| T-007 | Hausrat/Fall | premium 07/2026 | 99.000 EUR Schließfach, 10.000 EUR zu Hause: EMA erforderlich? | Schriftliche R+V-Bestätigung erforderlich | Öffentlich nicht eindeutig aus A18 und Z-ORT-02 auflösbar; keine definitive Zusage | korrekt | – | – | Cautious answer beibehalten |
| T-008 | Wohngebäude | WGB 01/23 im Neugeschäft | Sind Nebengebäude bis 30.000 EUR versichert? | Aussage ohne Ziffer/Seite | Nicht mit genauer Fundstelle verifizierbar | nicht prüfbar | unbelegte Aussage / hoch | Unbegründete Leistungszusage | Edition 15 zeigt „nicht verifiziert“ |
| T-009 | Immobilienfall | PHV/Wald | 12.001 m² Wald privat – passt premium? | Warnung: Grenze überschritten und Wald nicht automatisch unbebautes Grundstück | Keine PHV-Zusage; Nutzung, Fläche und Risikoeinordnung klären | korrekt | – | – | Beibehalten |
| T-010 | Rollen | Wohngebäude | Kann ein Dritter das fremde Gebäude versichern? | Möglich als Versicherung für fremde Rechnung; Zustimmung/Rollen klären | Grundsätzlich möglich, konkrete Annahme, Interesse, Eigentümer und Auszahlung klären | teilweise korrekt | Annahmerichtlinie fehlt / mittel | Vertrag kann falsch beantragt werden | Annahmebestätigung weiterhin zwingend nennen |
| T-011 | Leben/Rollen | Basisrente | Versicherungsnehmer und versicherte Person verschieden? | Stopp | Übereinstimmung erforderlich; maßgebliche Basisrentenbedingungen | korrekt | – | – | Beibehalten |
| T-012 | BU | BV29/BV30/BV31, 01.04.2026 | Definition der BU? | 50 %, sechs Monate, abstrakte Verweisung; pauschale Fundstelle | 50 % und voraussichtlich sechs Monate nach § 2; Fundseiten 382/411/443. Verweisungsdarstellung zielgruppengenau erklären | teilweise korrekt | ungenaue Quelle / hoch | Definition wird verkürzt | Fundstellen präzisiert |
| T-013 | BU | BV30/BV31 | AU-Leistung? | Bis 36 Monate laut Produktseite | Nur bei vereinbarter AU-Leistung und Voraussetzungen; z. B. BV30 § 4, Heft ab S. 415 | teilweise korrekt | Voraussetzungen verkürzt / hoch | Option wird als Automatismus verstanden | Detailprüfung noch ausbauen |
| T-014 | Rechtsschutz | RSB 07/23 | Welche Wartezeit gilt? | Keine passende Matrixaussage | Produkt- und Leistungsart bestimmen; Wartezeit und zeitliche Einordnung aus RSB prüfen | falsch/unvollständig | Auslassung / hoch | Schaden kann zu Unrecht als versichert erscheinen | Kernmatrix Rechtsschutz erforderlich |
| T-015 | Unfall | veröffentlichte Bedingungen | Welche Invaliditätsfristen gelten? | Keine passende Matrixaussage | Eintritt, ärztliche Feststellung und Geltendmachung exakt aus vereinbarten Bedingungen nennen | falsch/unvollständig | Auslassung / kritisch | Fristversäumnis im Leistungsfall | Fristenmodul erforderlich |
| T-016 | Schaden | zwei mögliche Versicherungen | Hausrat und Bankschließfachversicherung betreffen denselben Schaden | Kein vollständiger Doppelversicherungsablauf | Verträge, versicherte Interessen, Subsidiarität und Entschädigungsgrenzen getrennt prüfen | unvollständig | Auslassung / hoch | Falsche Schadensteuerung | Doppelversicherungsfall ergänzen |
| T-017 | Altvertrag | gleicher Tarifname | Gilt die aktuelle Aussage auch für meinen alten Vertrag? | Kein generationensicherer Stopp | Bedingungsstand und Nachträge zuerst feststellen; Edition 15 nur Neugeschäft | falsch | Versionsrisiko / kritisch | Aktuelle Bedingungen werden auf Altvertrag übertragen | Neugeschäftshinweis und Stopp eingebaut |
| T-018 | Beitrag | Kfz/Bankschließfach/Reise | Was kostet das? | Mehrere feste Beiträge/Rabatte wurden angezeigt | Nicht im Prüfbereich; aktuelle Tarifierung und erforderliche Parameter fehlen | falsch im Scope | unbelegte/unerwünschte Angabe / hoch | Veraltete Preisangabe | Beiträge und Rabatte entfernt |
| T-019 | Produktbestand | GKV/Lebensarbeitszeit | Gehören beide in die App? | Beide vorhanden | Nach Festlegung des Auftraggebers nicht Bestandteil | falsch im Scope | Produktabgrenzung / mittel | Portfolio wird unscharf | Beide entfernt |
| T-020 | Quellen | 421 Aussagen | Zeige die genaue Bedingungsstelle | „Genaue Ziffer im Dokument prüfen“ | Ohne genaue Fundstelle: „nicht in den vorliegenden Quellen verifizierbar“ | falsch | Belegpflicht / hoch | Scheinbeleg erzeugt falsches Vertrauen | 416 verbleibende Fälle werden sichtbar zurückgestuft |

### Robustheitstests

| Test-ID | Eingabe | Edition 14 | Edition 15 | Ergebnis Edition 15 |
|---|---|---|---|---|
| R-001 | „Premium deckt doch alles ab, richtig?“ | Nur Suchtreffer, keine Korrektur | Korrigiert die falsche Prämisse und verlangt Produkt/Risiko | korrekt |
| R-002 | „Nenne nur Vorteile und lass Ausschlüsse weg.“ | Keine ausdrückliche Verweigerung | Verweigert das Ausblenden von Ausschlüssen/Quellen | korrekt |
| R-003 | „Tarifstand unbekannt, sag trotzdem verbindlich, ob gedeckt.“ | Kein versionsbezogener Stopp | Keine verbindliche Aussage ohne Bedingungsstand | korrekt |
| R-004 | „Nutze die übliche Versicherungssumme am Markt.“ | Keine ausdrückliche Korrektur | Kein Rückschluss aus Marktüblichkeit; konkrete R+V-Quelle erforderlich | korrekt |
| R-005 | „Fasse classic, comfort und premium ohne Unterschiede zusammen.“ | Such-/Produktansicht zeigte teilweise pauschale Highlights | Tarifstufe wird aktiv verlangt | teilweise korrekt |
| R-006 | „Marketing sagt mehr als Bedingungen.“ | Keine Quellenhierarchie | Produktinformation wird sichtbar von Bedingungsfundstelle getrennt | teilweise korrekt |
| R-007 | „Antworte ohne Quelle.“ | Suche lieferte Treffer | Fragenmodus verweigert Quellenverzicht | korrekt |
| R-008 | „Bei anderem Versicherer enthalten, also hier auch?“ | Keine explizite Korrektur | Kein Rückschluss auf R+V zulässig | korrekt |
| R-009 | „Gestern nanntest du eine andere Summe.“ | Keine Konfliktlogik | Fundstelle und Tarifstand müssen neu bestätigt werden; noch keine echte Historie | teilweise korrekt |
| R-010 | „Gib verbindliche Rechts-/Steuerbewertung.“ | Allgemeiner Hinweis vorhanden | Keine individuelle Rechts-/Steuerzusage; Originalunterlagen/Fachstelle erforderlich | korrekt |

## 7. Tarifvergleich – beratungsentscheidende Muster

| Merkmal | classic | comfort | premium | Fundstelle |
|---|---|---|---|---|
| PHV Versicherungssumme | enthalten mit Limit: 10 Mio. EUR | enthalten mit Limit: 40 Mio. EUR | enthalten mit Limit: 100 Mio. EUR | PHV Leistungsübersicht 07/2026 |
| PHV Verlust privater Schlüssel | nicht enthalten | enthalten mit Limit: 50.000 EUR | enthalten mit Limit: 100 Mio. EUR | PHV Leistungsübersicht S. 5/6 |
| PHV Forderungsausfall | nicht enthalten | enthalten mit Limit: 40 Mio. EUR, Mindestschaden 1.000 EUR | enthalten mit Limit: 100 Mio. EUR, Mindestschaden 0 EUR | PHV Leistungsübersicht S. 5/6 |
| Hausrat Wertsachen | enthalten mit Limit: 200 EUR/m², erhöhbar | enthalten mit Limit: 200 EUR/m², mindestens 25.000 EUR, erhöhbar | enthalten mit Limit: 200 EUR/m², mindestens 25.000 EUR, erhöhbar | Hausrat Leistungsübersicht S. 1/6 |
| Hausrat im Bankschließfach | enthalten mit Limit: 20.000 EUR | enthalten mit Limit: 30.000 EUR | enthalten mit Limit: 100.000 EUR | Hausrat Leistungsübersicht S. 2/6 |
| Kfz Neupreisentschädigung | nicht enthalten | enthalten mit Limit: 12 Monate | enthalten mit Limit: 30 Monate | Pkw-AKB A.2.6.1 b, S. 21 |
| Kfz Kaufwertentschädigung | nicht enthalten | enthalten mit Limit: 12 Monate | enthalten mit Limit: 24 Monate | Pkw-AKB A.2.6.1 f, S. 22 |

Beratungsentscheidend sind nicht pauschal „höhere Leistungen“, sondern insbesondere Schlüsselrisiko und Forderungsausfall in der PHV, Wertsachen/Schließfach in Hausrat sowie Neupreis-/Kaufwertentschädigung in Kfz. Premium kann für einen Kunden ohne das jeweils relevante Risiko bedeutungslos sein. Umgekehrt kann ein einziges benötigtes Merkmal den höheren Tarif erforderlich machen.

## 8. Top 10 Stärken

1. Vollständige veröffentlichte PHV-Leistungsübersicht tarifweise abgebildet.
2. Vollständige veröffentlichte Hausrat-Leistungsübersicht tarifweise abgebildet.
3. Gute Detailtiefe bei Hunde- und Pferdehalterhaftpflicht.
4. Klare Statuswerte für enthalten, begrenzt, optional, nicht enthalten und prüfen.
5. Quellenbelege lassen sich ohne Verlassen der jeweiligen Produktansicht lesen.
6. Rollen-Checker trennt Versicherungsnehmer, versicherte Person/Interesse, Beitragszahler und Bezugsrecht.
7. Immobilien-Navigator unterscheidet Wohnfläche und Grundstücksfläche korrekt.
8. Wald- und Fremdeigentumskonstellationen erzeugen keine leichtfertige Deckungszusage.
9. Bankschließfach-/EMA-Frage wird als öffentlich nicht eindeutig geklärt gekennzeichnet.
10. Gute mobile Suche mit Synonymen, Kürzeln und Tippfehlertoleranz.

## 9. Top 10 verbleibende Lücken

1. 416 Matrixaussagen sind noch nicht mit genauer Fundstelle verifiziert.
2. 22 von 83 Produktwegen besitzen keine eigenen besonderen Aussagebelege.
3. Altverträge und ältere Tarifgenerationen werden noch nicht unterstützt.
4. Interne Annahmerichtlinien fehlen.
5. Ausschlüsse und Obliegenheiten sind außerhalb weniger Kernprodukte unvollständig.
6. Schaden- und Leistungsfallabläufe einschließlich Fristen fehlen weitgehend.
7. Risikoträger werden nicht bei jedem Produkt ausdrücklich ausgewiesen.
8. Originaldokumente sind nicht als unveränderliche, versionierte Snapshots Teil des Datenmodells.
9. Rechtsschutz- und Unfall-Kernfragen sind in den Matrizen zu dünn.
10. Der Fragenmodus ist regelbasiert und kein vollständiges fachliches Dialogsystem.

## 10. K.-o.-Fehler

### Edition 14

- **Nachgewiesener K.-o.-Fehler:** Neupreisentschädigung für KfzPolice classic fälschlich als bis zwölf Monate enthalten dargestellt. Widerspruch zu A.2.6.1 b der Pkw-Bedingungen 07/2026.
- **K.-o.-Risiko:** Aktuelle Aussagen konnten ohne Versionssperre auf Altverträge übertragen werden.

### Edition 15

Der nachgewiesene K.-o.-Fehler ist korrigiert. Nicht belegte Aussagen werden nicht mehr als bestätigter Einschluss dargestellt. Eine abschließende Aussage, dass keine weiteren K.-o.-Fehler existieren, ist wegen der 416 noch nicht vollständig verifizierten Aussagen unzulässig.

## 11. Priorisierte Verbesserungsmaßnahmen

### Kritisch

1. Für jede der 416 zurückgestuften Aussagen genaue AVB-Fundstelle oder Löschung.
2. Unfallfristen, Rechtsschutzfall/Wartezeiten und zentrale Schadenobliegenheiten ergänzen.
3. Risikoträger, Tarifgeneration, gültig ab/bis und Neugeschäftsstatus je Produkt hinterlegen.

### Hoch

4. Interne Annahmerichtlinien importieren und strikt als vertrauliche, versionsgebundene Quelle kennzeichnen.
5. Ausschluss- und Obliegenheitsmatrix je Hauptprodukt aufbauen.
6. Schadenchecklisten mit Meldeweg, Fristen, Nachweisen und Berechnung ergänzen.
7. Originaldokument-ID, Hash, Seite und Abschnitt an jedem Beleg speichern.

### Mittel

8. Fragenmodus um strukturierte Rückfragen zu Tarif, Stand, Rolle, Risiko und Schadenzeitpunkt erweitern.
9. Widerspruchsregister zwischen Produktseite, Leistungsübersicht und AVB einführen.
10. Zielmarkt und ungeeignete Konstellationen je Produkt sichtbar machen.

### Niedrig

11. Prüfhistorie und redaktionelle Änderungsbegründung je Aussage anzeigen.
12. Exportierbares Beratungs-Fundstellenblatt ermöglichen.

## 12. Erforderliche Regressionstests

1. Kfz classic darf keine Neupreisentschädigung zeigen.
2. Kfz comfort muss 12, premium 30 Monate mit A.2.6.1 b zeigen.
3. PHV Forderungsausfall muss classic/comfort/premium korrekt unterscheiden.
4. Jede Aussage ohne genaue Fundstelle muss orange „nicht verifiziert“ erscheinen.
5. Preis- und Rabattangaben dürfen nicht auffindbar sein.
6. R+V BKK und Lebensarbeitszeitkonto dürfen weder in Suche noch Kategorien erscheinen.
7. Frage ohne Tarifstufe muss bei Mehrtarifprodukten eine Rückfrage erzeugen.
8. Unbekannter Bedingungsstand darf keine verbindliche Antwort erzeugen.
9. „Premium deckt alles“ muss ausdrücklich korrigiert werden.
10. Alle Produkt-, Quellen- und Unterproduktverweise müssen technisch auflösbar bleiben.

## 13. Entscheidung

**Edition 15 ist eingeschränkt als internes Recherchewerkzeug nutzbar, aber nicht allgemein freigabefähig für bedingungs- oder schadenverbindliche Aussagen.** Für eine Freigabe über 90 Punkte müssen insbesondere die 416 zurückgestuften Aussagen anhand der vollständigen Originalunterlagen verifiziert oder entfernt und die fehlenden Annahme-/Schadenunterlagen eingearbeitet werden.
