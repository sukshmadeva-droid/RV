/* RuVKompendium 13 – Rollen-Checker und Querschnittswissen */
const ROLE_META = { checked: '10.08.2026', edition: 13 };

const ROLE_CASES = {
  building: {
    label: 'Wohngebäude', icon: '⌂', interestLabel: 'Gebäudeeigentümer',
    same: { verdict: 'Möglich', tone: 'yes', title: 'Standardkonstellation', text: 'Versicherungsnehmer und Gebäudeeigentümer stimmen überein.' },
    other: { verdict: 'Möglich mit Benennung', tone: 'conditional', title: 'Versicherung für fremde Rechnung', text: 'Der Vertrag kann im eigenen Namen für das Interesse des fremden Eigentümers geschlossen werden. R+V muss den abweichenden Eigentümer, das versicherte Interesse und die Risikoanschrift kennen.' },
    steps: ['Eigentümer vollständig als versicherte Person beziehungsweise Interesseninhaber erfassen.', 'Auftrag beziehungsweise Zustimmung des Eigentümers dokumentieren.', 'Grundpfandrechte und finanzierende Institute angeben.', 'Auszahlung und Schadenabwicklung zwischen Versicherungsnehmer, Eigentümer und gegebenenfalls Bank klären.'],
    source: { document: 'R+V-Wohngebäudeversicherungsbedingungen classic WGB F/S 01/23', location: 'WGB F Ziffer 18 bzw. WGB S Ziffer 20 · Versicherung für fremde Rechnung', text: 'Der Versicherungsnehmer kann den Versicherungsvertrag im eigenen Namen für das Interesse eines Dritten schließen. Vor einer Entschädigungszahlung kann R+V die Zustimmung des Versicherten verlangen.' }
  },
  household: {
    label: 'Hausrat', icon: '◇', interestLabel: 'Eigentümer des Hausrats',
    same: { verdict: 'Möglich', tone: 'yes', title: 'Eigener Hausrat', text: 'Versichert wird der eigene Hausrat des Versicherungsnehmers am vereinbarten Versicherungsort. Das Eigentum am Gebäude ist dafür nicht entscheidend.' },
    other: { verdict: 'Möglich mit Benennung', tone: 'conditional', title: 'Fremder Hausrat', text: 'Fremder Hausrat kann über eine Versicherung für fremde Rechnung erfasst werden. Person, Haushalt, Versicherungsort und Eigentumsinteresse müssen eindeutig dokumentiert sein.' },
    steps: ['Klären, wem die Sachen gehören und wer dauerhaft im Haushalt lebt.', 'Versicherte Person und Versicherungsort ausdrücklich angeben.', 'Doppelversicherung mit einem bestehenden Hausratvertrag vermeiden.', 'Bei Wohngemeinschaften und getrennten Haushalten den versicherten Personenkreis prüfen.'],
    source: { document: 'R+V-Hausratversicherungsbedingungen HRB 07/2026', location: 'B4.9 · Versicherung für fremde Rechnung', text: 'Die R+V-Bedingungen erlauben einen Vertrag im eigenen Namen für das Interesse eines Dritten. Das VVG erfasst bei einem versicherten Inbegriff außerdem bestimmte Sachen von Personen in häuslicher Gemeinschaft.' }
  },
  liability: {
    label: 'Haftpflicht / Eigentümer', icon: '◈', interestLabel: 'Person mit Haftungsrisiko',
    same: { verdict: 'Möglich', tone: 'yes', title: 'Haftungsrisiko beim Versicherungsnehmer', text: 'Die gesetzliche Haftpflicht des Versicherungsnehmers wird im vereinbarten Produkt- und Risikoumfang versichert.' },
    other: { verdict: 'Nur ausdrücklich versichert', tone: 'warning', title: 'Keine automatische Übertragung', text: 'Die Haftpflicht einer anderen Person ist nicht allein deshalb versichert, weil der Versicherungsnehmer oder Beitragszahler den Vertrag übernimmt. Der tatsächliche Eigentümer, Halter oder sonst Verantwortliche muss ausdrücklich versicherte Person sein und das konkrete Risiko muss eingeschlossen sein.' },
    steps: ['Feststellen, wer rechtlich als Eigentümer, Halter oder Betreiber haftet.', 'Diese Person ausdrücklich als Versicherte aufnehmen.', 'Prüfen, ob Privathaftpflicht genügt oder eine Haus-/Grundbesitzer-, Bauherren-, Gewässerschaden- oder Tierhalterhaftpflicht benötigt wird.', 'Innenansprüche zwischen den beteiligten Personen und Ausschlüsse gesondert prüfen.'],
    source: { document: 'R+V-Haftpflichtversicherungsbedingungen HPB 07/2026', location: 'A1-2 und jeweilige Immobilien-/Risikoregelung', text: 'Versichert ist die gesetzliche Haftpflicht des Versicherungsnehmers und der ausdrücklich mitversicherten Personen im beschriebenen Risiko. Eine bloße Beitragszahlung macht eine andere haftende Person nicht automatisch zum Versicherten.' }
  },
  motor: {
    label: 'Kfz', icon: '▰', interestLabel: 'Halter / Fahrzeugeigentümer',
    same: { verdict: 'Möglich', tone: 'yes', title: 'Versicherungsnehmer und Halter identisch', text: 'Das ist die übliche Kfz-Konstellation.' },
    other: { verdict: 'Tarifabhängig möglich', tone: 'conditional', title: 'Abweichender Halter', text: 'Ein vom Versicherungsnehmer abweichender Fahrzeughalter ist grundsätzlich als eigene Rolle erfassbar, muss R+V aber vor Vertragsabschluss vollständig angegeben werden. Annahme, Beitrag und Schadenfreiheitsregel können davon abhängen.' },
    steps: ['Versicherungsnehmer, Halter, Eigentümer und regelmäßige Fahrer getrennt erfassen.', 'Zulassung, Verfügungsberechtigung und Fahrerkreis abgleichen.', 'Schadenfreiheitsrabatt und Sondereinstufung der richtigen Person zuordnen.', 'Leasing- oder Finanzierungsgeber und GAP-Bedarf berücksichtigen.'],
    source: { document: 'R+V-Kfz-Verbraucherinformation Pkw · Stand 01.07.2026', location: 'AKB, Antrag und Datenschutzinformation zum abweichenden Halter', text: 'R+V unterscheidet Versicherungsnehmer, Halter, Eigentümer und Fahrer. Die Datenschutzinformation nennt ausdrücklich die Erhebung von Daten eines abweichenden Halters.' }
  },
  animal: {
    label: 'Tier', icon: '●', interestLabel: 'Tierhalter / Tiereigentümer',
    same: { verdict: 'Möglich', tone: 'yes', title: 'Tierhalter ist Versicherungsnehmer', text: 'Das ist die eindeutige Standardkonstellation.' },
    other: { verdict: 'Nur nach ausdrücklicher Zuordnung', tone: 'conditional', title: 'Abweichender Tierhalter oder Tiereigentümer', text: 'Versicherungsnehmer, Halter, Eigentümer des Tieres und gegebenenfalls Leistungsempfänger dürfen nicht stillschweigend gleichgesetzt werden. R+V muss die abweichenden Rollen akzeptieren und im Vertrag dokumentieren.' },
    steps: ['Tier eindeutig über Art, Name, Kennzeichnung und Eigentümer zuordnen.', 'Bei Haftpflicht den tatsächlichen Halter als versicherte Person erfassen.', 'Bei OP-/Tierleben Eigentumsinteresse und empfangsberechtigte Person festlegen.', 'Rechnungsadressat, Tierarztabrechnung und Auszahlung klären.'],
    source: { document: 'R+V-Tierhalterhaftpflicht und OP-/Tierleben-Bedingungen', location: 'Versichertes Risiko, versicherte Person und versichertes Tier', text: 'Haftpflichtschutz knüpft an die gesetzliche Haftung des Tierhalters an; Sach-/Kostenprodukte knüpfen an das bezeichnete Tier und die vereinbarte leistungsberechtigte Person an.' }
  },
  legal: {
    label: 'Rechtsschutz', icon: '§', interestLabel: 'Rechtsschutzversicherte Person',
    same: { verdict: 'Möglich', tone: 'yes', title: 'Eigener Rechtsschutz', text: 'Der Versicherungsnehmer ist im vereinbarten Lebensbereich rechtsschutzversichert.' },
    other: { verdict: 'Nur im versicherten Personenkreis', tone: 'conditional', title: 'Andere Person mitversichern', text: 'Eine andere Person erhält nur dann Rechtsschutz, wenn sie nach Familien-/Personenmodell oder ausdrücklicher Benennung zum versicherten Personenkreis gehört. Die bloße Beitragszahlung reicht nicht.' },
    steps: ['Familienstand, häusliche Gemeinschaft und wirtschaftliche Selbstständigkeit prüfen.', 'Betroffene Person ausdrücklich dem Vertrag zuordnen.', 'Passenden Lebensbereich wählen: Privat, Beruf, Verkehr oder Immobilie.', 'Vorvertraglichkeit und Wartezeiten aus Sicht der betroffenen Person prüfen.'],
    source: { document: 'R+V-Rechtsschutzbedingungen RSB 07/23', location: 'Versicherte Personen und versicherte Lebensbereiche', text: 'Der Rechtsschutz richtet sich nach dem vereinbarten Personenmodell, dem ausdrücklich versicherten Personenkreis und den eingeschlossenen Lebensbereichen.' }
  },
  accident: {
    label: 'Unfall', icon: '+', interestLabel: 'Versicherte Person',
    same: { verdict: 'Möglich', tone: 'yes', title: 'Eigene Unfallversicherung', text: 'Versicherungsnehmer und versicherte Person stimmen überein.' },
    other: { verdict: 'Mit Einwilligungsprüfung', tone: 'conditional', title: 'Unfallversicherung auf eine andere Person', text: 'Eine Unfallversicherung kann auf eine andere Person genommen werden. Wird sie für eigene Rechnung des Versicherungsnehmers abgeschlossen, verlangt § 179 VVG die schriftliche Einwilligung der anderen Person.' },
    steps: ['Versicherte Person und Bezugs-/Leistungsempfänger eindeutig festlegen.', 'Schriftliche Einwilligung einholen, wenn der Versicherungsnehmer die Versicherung für eigene Rechnung nimmt.', 'Bei Minderjährigen Vertretungs- und Einwilligungsregeln beachten.', 'Gesundheits-, Berufs- und Gefahrangaben von der versicherten Person vollständig erheben.'],
    source: { document: '§ 179 VVG und R+V-Unfallbedingungen PUR 01/22', location: '§ 179 Abs. 1–3 VVG · versicherte Person', text: 'Die Unfallversicherung kann für den Unfall des Versicherungsnehmers oder eines anderen genommen werden. Für eine Versicherung eines anderen für eigene Rechnung ist grundsätzlich dessen schriftliche Einwilligung erforderlich.' }
  },
  health: {
    label: 'Kranken / Pflege', icon: '✚', interestLabel: 'Versicherte Person',
    same: { verdict: 'Möglich', tone: 'yes', title: 'Eigene Krankenversicherung', text: 'Versicherungsnehmer und versicherte Person stimmen überein.' },
    other: { verdict: 'Möglich mit Mitwirkung', tone: 'conditional', title: 'Krankenversicherung für eine andere Person', text: 'Nach § 193 VVG kann eine Krankenversicherung auf eine andere Person genommen werden. Gesundheitsangaben, Einwilligungen, Obliegenheiten und Rechte der versicherten Person müssen korrekt behandelt werden.' },
    steps: ['Versicherte Person und Versicherungsnehmer getrennt erfassen.', 'Gesundheitsfragen von beziehungsweise mit der versicherten Person vollständig beantworten.', 'Empfangsberechtigung und Erstattungskonto festlegen.', 'Kündigungs-, Fortsetzungs- und Alterungsrückstellungsrechte der versicherten Person beachten.'],
    source: { document: '§§ 193 und 207 VVG sowie R+V-Kranken-Bedingungsheft PKX 07/26', location: '§ 193 Abs. 1–2 VVG · § 207 VVG', text: 'Die Krankenversicherung kann auf den Versicherungsnehmer oder einen anderen genommen werden. Bei Tod oder Kündigung des Versicherungsnehmers bestehen gesetzliche Fortsetzungsrechte der versicherten Person.' }
  },
  life: {
    label: 'Leben / BU / Rente', icon: '∞', interestLabel: 'Versicherte Person',
    same: { verdict: 'Möglich', tone: 'yes', title: 'Versicherungsnehmer und versicherte Person identisch', text: 'Das ist bei vielen privaten Vorsorgeverträgen die Standardgestaltung; bei der Basisrente schreibt R+V die Übereinstimmung ausdrücklich vor.' },
    other: { verdict: 'Produkt- und einwilligungsabhängig', tone: 'warning', title: 'Vertrag auf das Leben einer anderen Person', text: 'Eine Lebensversicherung kann grundsätzlich auf eine andere Person genommen werden. Bei Todesfallschutz oberhalb gewöhnlicher Beerdigungskosten ist nach § 150 VVG deren schriftliche Einwilligung erforderlich. Bei R+V-Basisrenten müssen Versicherungsnehmer und versicherte Person übereinstimmen.' },
    steps: ['Versicherungsnehmer, versicherte Person und Bezugsberechtigte getrennt festlegen.', 'Schriftliche Einwilligung der versicherten Person bei relevantem Todesfallschutz einholen.', 'Widerrufliches oder unwiderrufliches Bezugsrecht bewusst wählen.', 'Schenkungs-/Erbschaftsteuer und wirtschaftliche Berechtigung fachlich prüfen.', 'Bei Basisrente keine abweichende versicherte Person vorsehen.'],
    source: { document: '§ 150 VVG und R+V-Leben-Bedingungsheft PLG 04/26', location: '§ 150 VVG · Basisrente § 1', text: 'Eine Lebensversicherung kann auf eine andere Person genommen werden; bei entsprechendem Todesfallschutz ist deren schriftliche Einwilligung erforderlich. In den R+V-Basisrentenbedingungen ist festgelegt, dass Versicherungsnehmer und versicherte Person übereinstimmen.' }
  }
};

const ROLE_PRODUCT_MAP = {
  building: ['wohngebaeude'],
  household: ['hausrat', 'hausrat-haftpflicht'],
  liability: ['phv', 'hugb', 'bauherr', 'gewaesser', 'wasserfahrzeug', 'jagd', 'reitlehrer', 'hund-haft', 'pferd-haft'],
  motor: ['kfz-auto', 'kfz-eauto', 'kfz-zweitwagen', 'kfz-motorrad', 'kfz-125', 'kfz-roller', 'kfz-moped', 'kfz-escooter', 'kfz-ebike', 'kfz-quad', 'kfz-wohnmobil', 'kfz-wohnwagen', 'kfz-anhaenger'],
  animal: ['hund-op', 'pferd-op', 'hund-haft', 'pferd-haft', 'pferd-leben'],
  legal: ['recht-privat', 'recht-verkehr', 'recht-beruf', 'recht-immo'],
  accident: ['unfall', 'unfall-kapital', 'unfall-kind', 'unfall-bau'],
  health: ['pkv', 'pkv-beamte', 'reise-kv', 'zahn', 'klinik', 'ktg', 'kht', 'agu', 'naturmedizin', 'blickcheck', 'plus-kombi', 'mitglieder-kv', 'pflege-pflicht', 'pflege-monat', 'pflege-tag'],
  life: ['risikoleben', 'sterbegeld', 'vermoegen-uebertrag', 'bu', 'du', 'gf', 'restschuld', 'cashprotect', 'anspar', 'anlage', 'fondsrente', 'duoinvest', 'indexinvest', 'ruerup-fonds', 'basis-safe', 'sofort', 'bav', 'schueler-bu', 'kind-rund', 'kind-index']
};

const ROLE_INDEX_BY_PRODUCT = {};
for (const [caseId, productIds] of Object.entries(ROLE_PRODUCT_MAP)) {
  const config = ROLE_CASES[caseId];
  for (const productId of productIds) {
    ROLE_INDEX_BY_PRODUCT[productId] = `${ROLE_INDEX_BY_PRODUCT[productId] || ''} Vertragsrollen Fremdversicherung fremde Rechnung abweichender Versicherungsnehmer Beitragszahler ${config.label} ${config.interestLabel} ${config.other.title} ${config.other.text} ${config.steps.join(' ')}`;
    const matrix = COVERAGE[productId];
    if (!matrix || matrix.rows.some(row => row.id === `role-${caseId}-${productId}`)) continue;
    matrix.rows.push({
      id: `role-${caseId}-${productId}`,
      group: 'Vertragsrollen & Fremdversicherung',
      feature: `Abweichender Versicherungsnehmer / ${config.interestLabel}`,
      values: Object.fromEntries(matrix.variants.map(variant => [variant, { status: 'check', detail: config.other.text }])),
      source: { kind: 'Bedingungswerk / Gesetz', document: config.source.document, version: `geprüft ${ROLE_META.checked}`, location: config.source.location, text: config.source.text }
    });
  }
}

function roleAnswer(selection) {
  const config = ROLE_CASES[selection.product];
  const different = selection.interest === 'other';
  const base = different ? config.other : config.same;
  let tone = base.tone, verdict = base.verdict, title = base.title, text = base.text;
  const notes = [];
  if (different && selection.consent === 'no') {
    tone = 'stop'; verdict = 'Noch nicht abschließen';
    notes.push('Auftrag, Kenntnis beziehungsweise erforderliche Einwilligung der anderen Person ist noch nicht geklärt. R+V muss die abweichende Konstellation vor Abschluss kennen.');
  }
  if (selection.payer === 'other') notes.push('Ein abweichender Beitragszahler ist grundsätzlich nur die Zahlstelle. Er wird dadurch weder Versicherungsnehmer noch Eigentümer, versicherte Person oder Bezugsberechtigter. SEPA-Mandat und Kontoinhaber müssen korrekt erfasst werden.');
  if (selection.relation === 'unrelated') notes.push('Bei nicht verwandten beziehungsweise nicht im selben Haushalt lebenden Personen sind Familien- und Haushaltsmitversicherungen nicht zu unterstellen. Die Person muss ausdrücklich erfasst werden.');
  if (['life', 'accident'].includes(selection.product) && selection.beneficiary === 'other') notes.push('Eine andere leistungsberechtigte Person muss ausdrücklich als Bezugsberechtigte beziehungsweise Leistungsempfänger benannt werden. Bei Leben sind Widerruflichkeit sowie mögliche Schenkungs- oder Erbschaftsteuerfolgen zu prüfen.');
  if (selection.product === 'life' && selection.beneficiary === 'holder' && selection.interest === 'other') notes.push('Versicherungsnehmer und versicherte Person sind verschieden, die Leistung soll aber an den Versicherungsnehmer gehen. Dadurch wird die Einwilligungsprüfung besonders wichtig; bei Todesfallschutz gilt § 150 VVG.');
  return { config, tone, verdict, title, text, notes };
}
