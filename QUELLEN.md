# Quellen- und Abgrenzungsnotiz

Prüfstand: **10.08.2026**. Primärquelle ist durchgängig R+V bzw. bei der R+V BKK deren eigene Website.

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
- R+V Beitragstabelle FernWeh / FernWeh Familie, Stand 01/2026

Jeder Eintrag in der App enthält zusätzlich seine konkrete R+V-Produktseite sowie das zugeordnete Bedingungswerk oder – wo mehrere Sonderbedingungen greifen – die offizielle Bedingungszentrale.

## Leistungsdatenbank und Evidence Layer – Edition 08

`coverage.js` enthält 1.103 einzelne Produkt-, Tarif-, Leistungs-, Options- und Abschlussangaben. Jede Matrixzeile trägt eine lokale Quellenunterlegung. Für die vier Produkte mit veröffentlichter R+V-Leistungsübersicht wurden die Tabellen vollständig nach Classic, Comfort und Premium strukturiert. Wo eine öffentliche Quelle keine eindeutige Tarifzuordnung zulässt, zeigt die App bewusst **„Prüfen“** statt einen Einschluss zu unterstellen.

## Rollen-Checker – Edition 09

Der Rollen-Checker in `roles.js` unterscheidet Versicherungsnehmer, Eigentümer/Halter beziehungsweise versicherte Person, Beitragszahler und – soweit relevant – Bezugsberechtigte. 73 produktspezifische Rollenhinweise ergänzen die Leistungsdatenbank. Grundlage sind insbesondere §§ 43–47, 89, 150, 179, 193 und 207 VVG sowie die jeweils zugeordneten R+V-Bedingungen. Ein abweichender Beitragszahler wird ausdrücklich nicht mit einer versicherten oder leistungsberechtigten Person gleichgesetzt.

## Quellenbedienung – Edition 10

Runde blaue Zahlenkugeln ersetzen die bisherigen Symbol-Badges. Die Zahl entspricht der Anzahl der lokal hinterlegten Quellenbelege; ein Tipp öffnet die zugehörigen Textstellen direkt in der App.

## Lesbarkeit – Edition 11

Suchfelder, fachliche Erläuterungen, Rollenentscheidungen, Handlungsschritte, Leistungsdetails und lokale Quellenstellen verwenden größere Mindestschriftgrade und eine verlässliche iPhone-Systemtypografie. Sehr kleine Schrift bleibt auf kurze Metadaten beschränkt. Die App sperrt den Browser-Zoom nicht mehr.

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

Die angezeigten Quellentexte sind bewusst **redaktionell verdichtete Bedingungsstellen** und keine vollständige Wiedergabe der Bedingungshefte. Kurze Originalfragmente dienen nur der schnellen Wiedererkennung der Fundstelle. Wo Höchstbeträge oder Selbstbehalte laut AVB erst durch Versicherungsschein/Nachtrag bestimmt werden, weist der Beleg darauf hin und erfindet keine pauschale Zahl.

## Redaktionelle Abgrenzung

- Enthalten sind die auf der R+V-Privatkunden-Website angebotenen Versicherungs- und versicherungsnahen Absicherungswege; Varianten wie E-Auto, Wohnmobil oder Berufs-/Verkehrsrechtsschutz sind für schnelles Auffinden als eigene Beratungseinträge indexiert.
- **R+V BKK** ist als GKV-/Partnerangebot gekennzeichnet und nicht als Produkt der R+V Krankenversicherung AG dargestellt.
- **MietkautionsBürgschaft** ist als Bürgschaftslösung enthalten, aber bewusst nicht als klassische Schadenversicherung bezeichnet.
- **Lebensarbeitszeitkonto** ist zur Vollständigkeit der aktuellen Privatkunden-Navigation als Wertguthaben-/Vorsorgelösung indexiert und ausdrücklich nicht als klassische Einzelversicherung gekennzeichnet.
- **EnergiePolice** gehört zum gewerblichen Photovoltaik-Kontext; im Privatkundenbereich ist die Photovoltaikabsicherung als Wohngebäude-Baustein erfasst.
- **Baufinanzierung/Darlehen**, Fahrzeugbewertung/-verkauf, Zulassungsservices und THG-Services sind keine Versicherungen und deshalb nicht als Versicherungsprodukte aufgenommen.
- Auf der Navigation ausdrücklich als **„in Planung“** bezeichnete Angebote (z. B. Altersvorsorgedepot, Frühstart-Rente am Prüfdatum) werden nicht als aktuell abschließbare Versicherungsprodukte geführt.
- Bei Tarifen ohne classic/comfort/premium wird keine künstliche Dreiteilung vorgenommen. Beispiel: Wohngebäude und Privat-Rechtsschutz werden aktuell mit classic/comfort dargestellt; Hunde-/Pferde-OP mit Basis/Premium/Exzellent.

## Verwendung

Die Inhalte sind als Beratungs-Schnellübersicht formuliert. Für Leistung, Deckung, Ausschlüsse, Wartezeiten, Annahme und Beitrag sind ausschließlich Versicherungsschein, Nachträge und die im konkreten Vertrag vereinbarten Bedingungen maßgeblich.
