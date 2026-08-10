# Quellen- und Abgrenzungsnotiz

Prüfstand: **10.08.2026**. Primärquellen sind die jeweils aktuellen offiziellen R+V-Vertragsunterlagen für das Privatkunden-Neugeschäft.

## Zentrale offizielle Quellen

- R+V Privatkunden-Navigation / Produktportfolio: https://www.ruv.de/privatkunden
- R+V Versicherungsbedingungen und Verbraucherinformationen: https://www.ruv.de/service/weitere-services/versicherungsbedingungen
- R+V PrivatPolice Verbraucherinformation **classic**, Ausgabe 07/2026
- R+V PrivatPolice Verbraucherinformation **comfort**, Ausgabe 07/2026
- R+V PrivatPolice Verbraucherinformation **premium**, Ausgabe 07/2026
- R+V Privathaftpflicht – vollständige Leistungsübersicht, Stand 07/2026, IdNr. 324180
- R+V Hausrat – vollständige Leistungsübersicht, Stand 07/2026, IdNr. 324181
- R+V Hundehalterhaftpflicht – vollständige Leistungsübersicht, Stand 07/2026, IdNr. 322552
- R+V Pferdehalterhaftpflicht – vollständige Leistungsübersicht, Stand 07/2026, IdNr. 322551
- R+V Kfz Verbraucherinformation Pkw, Stand 01.07.2026
- R+V Kfz Verbraucherinformation Nicht-Pkw, Stand 01.07.2026
- Bedingungsheft R+V Lebensversicherung AG, PLG 04/26
- AVB R+V-Risikoversicherung 1E37, Stand 01.07.2026
- Bedingungsheft R+V Krankenversicherung AG, PKX 07/26
- R+V-Unfallversicherung / Risiko-UnfallPolice Verbraucherinformationen und Bedingungen
- R+V-Kapital-UnfallPolice Verbraucherinformationen und Bedingungen
- Operationskostenversicherung Hund/Pferd – jeweilige AVB der angebotenen Tierversicherungsprodukte
- R+V Makler-Unterlage „Ärztliche Untersuchung – Summengrenzen“, Stand 06/2026
- R+V Makler-Sellingsheet „BU-Versicherung für Schüler“, Stand 05/2026

Jeder Eintrag in der App enthält zusätzlich seine konkrete R+V-Produktseite sowie das zugeordnete Bedingungswerk oder – wo mehrere Sonderbedingungen greifen – die offizielle Bedingungszentrale.

## Leistungsdatenbank und Evidence Layer

Edition 16 enthält 1.199 Produkt-, Tarif-, Leistungs-, Options-, Abschluss- und Rollenangaben für 83 Produkt- und Beratungswege. Für die vier Produkte mit veröffentlichter R+V-Leistungsübersicht wurden die Tabellen vollständig nach classic, comfort und premium strukturiert. Aussagen ohne genaue Fundstelle werden ausdrücklich als **„nicht verifiziert“** zurückgestuft; „Prüfen“ oder eine redaktionelle Vorinformation sind kein bestätigter Einschluss.

## Rollen-Checker – Edition 09

Der Rollen-Checker in `roles.js` unterscheidet Versicherungsnehmer, Eigentümer/Halter beziehungsweise versicherte Person, Beitragszahler und – soweit relevant – Bezugsberechtigte. 73 produktspezifische Rollenhinweise ergänzen die Leistungsdatenbank. Grundlage sind insbesondere §§ 43–47, 89, 150, 179, 193 und 207 VVG sowie die jeweils zugeordneten R+V-Bedingungen. Ein abweichender Beitragszahler wird ausdrücklich nicht mit einer versicherten oder leistungsberechtigten Person gleichgesetzt.

## Quellenbedienung – Edition 10

Runde blaue Zahlenkugeln ersetzen die bisherigen Symbol-Badges. Die Zahl entspricht der Anzahl der lokal hinterlegten Quellenbelege; ein Tipp öffnet die zugehörigen Textstellen direkt in der App.

## Lesbarkeit – Edition 11

Suchfelder, fachliche Erläuterungen, Rollenentscheidungen, Handlungsschritte, Leistungsdetails und lokale Quellenstellen verwenden größere Mindestschriftgrade und eine verlässliche iPhone-Systemtypografie. Sehr kleine Schrift bleibt auf kurze Metadaten beschränkt. Die App sperrt den Browser-Zoom nicht mehr.

## Fall-Navigator – Edition 12

`cases.js` kombiniert öffentlich belegte Produktregeln zu neun häufigen Beratungskonstellationen: Werte/Aufbewahrung, Immobilien/Grundstücke, Vertragsrollen, Fahrzeuge/Halter, Personen/Bezugsrecht, Alter/Abschluss, Energie/Technik, Gefahren/Bausteine und Tiere/Halter. Jede Antwort trennt Ergebnis, belastbare Fakten, offene Fragen, nächste Schritte, Produktwege und lokale Quellenstellen. Eine Ableitung, die sich aus öffentlichen Bedingungen nicht eindeutig treffen lässt, wird als **„bestätigen“** oder **„klären“** gekennzeichnet.

Für Hausrat im Bankschließfach werden die tariflichen Schließfachgrenzen und die rechnerische Wertsachengrenze getrennt angezeigt. Das öffentlich nicht eindeutig aufgelöste Verhältnis zwischen HRB A18, Z-ORT-02 und möglichen Sicherungs-/EMA-Anforderungen wird nicht als Deckungszusage behandelt. Die App fordert in dieser Konstellation eine schriftliche R+V-Bestätigung. Die eigenständige Bankschließfachversicherung wird als separater Schutzweg mit eigener Versicherungssumme dargestellt.

## Kontextfelder und Ergebnisfarben – Edition 13

Die Immobilienabfrage zeigt abhängig von der Konstellation entweder **Wohnfläche** oder **Grundstücksfläche**. Grundstücksgrenzen aus der PHV-Leistungsübersicht werden ausschließlich für unbebaute Grundstücke und Wald-/Forstkonstellationen ausgewertet. Wohngebäudefälle verwenden die Wohnfläche und aktualisieren sie im Ergebnistext. Ergebnisfakten sind semantisch eingefärbt: neutral blau, belastbar passend grün, klärungs- oder grenzwertig orange und stoppend rot. Eine Überschreitung der premium-Grenze von 10.000 m² erscheint deshalb nicht mehr als grüner Bestätigungsbaustein.

Für besonders beratungsrelevante Aussagen wurden Fundstellen aus den aktuellen offiziellen R+V-Unterlagen separat ausgewertet. Diese Belege stehen in `evidence.js` und werden über das kleine Quellen-Icon direkt in der App angezeigt. Enthalten sind insbesondere Tarifabgrenzungen und zentrale Leistungsmerkmale aus:

- PrivatPolice premium Haftpflicht/Haushalt (HPB 07/26, HRB 07/2026)
- Pkw-AKB, Stand Juli 2026
- Bedingungsheft Krankenversicherung PKX 07/26, unter anderem AGIL, Zahn, Klinik, NaturMedizin, Blick + Check und PflegeVorsorge
- R+V-UnfallPolice, unter anderem PremiumPlus, HilfePlus und RisikoPlus
- Hunde-OP Grundbedingungen
- R+V-Risikoversicherung 1E37, Stand 01.07.2026
- Berufsunfähigkeitsversicherung: offizielle R+V-Produktdarstellung mit ausdrücklichem Verweis auf BV29/BV30/BV31, AVB-Stand 01.04.2026
- R+V-Pflege FörderBahr: aktuelle Produktdarstellung zu Förderung, Annahme, Pflegegradstaffel und Wartezeit
- RatenschutzPolice / Restschuldversicherung: aktuelle Produktdarstellung zu versicherten Risiken, Wartezeit und Leistungsgrenzen
- Photovoltaikversicherung: aktuelle Privatkunden-Produktdarstellung zum Wohngebäude-Baustein und optionalem Ertragsausfall
- E-Auto- und Motorradversicherung: aktuelle Produktdarstellungen plus Pkw-/Nicht-Pkw-AKB 07/2026
- MietkautionsBürgschaft: Young-Tarif, Alters-/Kautionsgrenzen und aktuelle Bedingungen
- SicherVermieten: aktuelle R+V-Produktdarstellung und PrivatPolice-Kundeninformation
- GeräteSchutz / Laptop / Hardware: Gerätealter, Laufzeit, Grundgefahren und Zusatzbausteine der aktuellen R+V-Produktdarstellung
- Verkehrs-, Berufs- und Immobilien-Rechtsschutz: aktuelle R+V-Produktdarstellungen und zugeordnete Rechtsschutzbedingungen
- Kinderunfall: aktuelle Produktseite sowie Risiko-/Kapital-Unfallbedingungen
- R+V-Kranken PKX 07/26: zusätzlich Mitglieder-Tarife M1U/M2U/M3U und private Pflegepflicht PP/PPN/PPB
- CashProtect: aktuelle Bausteine Gesundheit/Einkommen/Leben, Absicherungshöhen sowie Warte- und Karenzzeiten
- Vermögensübertragung: Übertragungszeitpunkt, Bezugsrecht, Anlageausrichtung, Entnahmen/Zuzahlungen sowie Angaben zu Gesundheitsfragen und Wartezeit
- Direktversicherung durch Entgeltumwandlung: Renten-/Kapitaloption, möglicher Leistungsbeginn, Arbeitgeberwechsel sowie BUZ-/Hinterbliebenenoption
- KinderVorsorge IndexInvest: Mindestbeitrag/Zuzahlung, maximale Termfix-Laufzeit, Beitragsgarantie, SOMAS-Varianten und Liquiditätsoption
- Sparen für Kinder: aktuelle R+V-Produktwege AnsparKombi, AnlageKombi, KinderVorsorge IndexInvest, InvestmentKonzept Duo Invest und R+V-VorsorgeKonzept

## Produktgliederung – Edition 14

Die bisherige Sammelansicht **Vermögensübertragung** ist in vier eigenständige Produktansichten aufgeteilt: GenerationenPlan Safe+Smart (7F03), GenerationenPlan Invest-Plus (XL07), GenerationenKonzept Safe+Smart (8F03) und GenerationenKonzept Invest-Plus beziehungsweise GenerationenKonzept-Plus (XZ08). Dafür wurden zusätzlich das Invest-Bedingungsheft der R+V-Lebensversicherung Niederlassung Luxemburg und die Fondspalette Stand 06/2026 ausgewertet.

Auch weitere echte Übersichts- und Kombiseiten führen nun direkt zu ihren bereits vorhandenen Einzelprodukten: Hausrat & Haftpflicht Kombi, GeräteSchutz, Privat-Rechtsschutz, Kinderunfall, KinderRundumschutz und Sparen für Kinder. Reine Tarifstufen, Deckungsvarianten und Zusatzbausteine bleiben innerhalb des jeweiligen Produkts, damit die Produktliste fachlich sauber und übersichtlich bleibt.

Die angezeigten Quellentexte sind bewusst **redaktionell verdichtete Bedingungsstellen** und keine vollständige Wiedergabe der Bedingungshefte. Kurze Originalfragmente dienen nur der schnellen Wiedererkennung der Fundstelle. Wo Höchstbeträge oder Selbstbehalte laut AVB erst durch Versicherungsschein/Nachtrag bestimmt werden, weist der Beleg darauf hin und erfindet keine pauschale Zahl.

## Fachliche Freigabeschicht – Edition 16

Die Quellenhierarchie wird sichtbar unterschieden: konkrete Bedingungsfundstelle, offizielle Leistungsübersicht, Produktinformation und nicht verifizierte redaktionelle Aussage. Widersprechen sich Marketing und Vertragsbedingungen, ist die konkrete Vertragsgrundlage maßgeblich. Der Fragenmodus korrigiert suggestive Annahmen, verlangt bei Mehrtarifprodukten die Tarifstufe und verweigert verbindliche Aussagen ohne bekannten Bedingungsstand. Der vollständige Prüfbericht liegt als `PRUEFBERICHT_EDITION15.md` bei.

Der Scope umfasst ausschließlich aktuelles R+V-Privatkunden-Neugeschäft. Nicht enthalten sind Gewerbe, R+V BKK, Lebensarbeitszeitkonto sowie konkrete Beiträge und Rabatte. Ältere Vertragsgenerationen werden erst in einer späteren Edition getrennt modelliert.

## Redaktionelle Abgrenzung

- Enthalten sind die auf der R+V-Privatkunden-Website angebotenen Versicherungs- und versicherungsnahen Absicherungswege; Varianten wie E-Auto, Wohnmobil oder Berufs-/Verkehrsrechtsschutz sind für schnelles Auffinden als eigene Beratungseinträge indexiert.
- **MietkautionsBürgschaft** ist als Bürgschaftslösung enthalten, aber bewusst nicht als klassische Schadenversicherung bezeichnet.
- **EnergiePolice** gehört zum gewerblichen Photovoltaik-Kontext; im Privatkundenbereich ist die Photovoltaikabsicherung als Wohngebäude-Baustein erfasst.
- **Baufinanzierung/Darlehen**, Fahrzeugbewertung/-verkauf, Zulassungsservices und THG-Services sind keine Versicherungen und deshalb nicht als Versicherungsprodukte aufgenommen.
- Auf der Navigation ausdrücklich als **„in Planung“** bezeichnete Angebote (z. B. Altersvorsorgedepot, Frühstart-Rente am Prüfdatum) werden nicht als aktuell abschließbare Versicherungsprodukte geführt.
- Bei Tarifen ohne classic/comfort/premium wird keine künstliche Dreiteilung vorgenommen. Beispiel: Wohngebäude und Privat-Rechtsschutz werden aktuell mit classic/comfort dargestellt; Hunde-/Pferde-OP mit Basis/Premium/Exzellent.

## Verwendung

Die Inhalte sind als Beratungs-Schnellübersicht formuliert. Für Leistung, Deckung, Ausschlüsse, Wartezeiten, Annahme und Beitrag sind ausschließlich Versicherungsschein, Nachträge und die im konkreten Vertrag vereinbarten Bedingungen maßgeblich.
