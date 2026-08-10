/* RuVKompendium 15 – allgemeiner Fall-Navigator */
const CASE_META = { edition: 15, checked: '10.08.2026' };

const CASE_SOURCES = {
  houseValues: { document: 'R+V-Hausratversicherung – Leistungsübersicht', location: 'Stand 07/2026 · Seiten 1–2', text: 'Die Leistungsübersicht nennt Wertsachen mit 200 EUR je Quadratmeter, in comfort und premium mindestens 25.000 EUR und erhöhbar. Hausrat in Bankschließfächern ist mit 20.000 EUR in classic, 30.000 EUR in comfort und 100.000 EUR in premium ausgewiesen.' },
  houseTerms: { document: 'R+V-Hausratbedingungen premium HRB 07/2026', location: 'A12.6, A18 und Z-ORT-02', text: 'A18 regelt Wertsachen und besondere Entschädigungsgrenzen. Z-ORT-02 erfasst privat genutzte Bankschließfächer innerhalb von Wertschutzräumen und -schränken von Geldinstituten und begrenzt die Leistung auf den im Versicherungsschein vereinbarten Betrag. Das Verhältnis beider Grenzen wird nicht ausdrücklich aufgelöst.' },
  bankBox: { document: 'R+V-Bankschließfachversicherung AVB BSV 01/2024', location: 'Produktseite und AVB BSV', text: 'Die eigenständige Schließfachversicherung erfasst Schließfachinhalte und Verwahrstücke. R+V nennt Versicherungssummen von 1.000 EUR bis 2.000.000 EUR; das Angebot richtet sich an Schließfächer bei Volks- und Raiffeisenbanken. Bargeld und Gold sind nach Produktdarstellung versicherbar, der Nachweis bleibt erforderlich.' },
  phvProperty: { document: 'R+V-Privathaftpflicht – Leistungsübersicht', location: 'Stand 07/2026 · Immobilien, Seiten 2–3', text: 'Unbebaute Grundstücke im Inland sind in comfort bis 2.000 Quadratmeter und in premium bis 10.000 Quadratmeter ausgewiesen; classic enthält diese Position nicht. Eine forstwirtschaftliche oder gewerbliche Nutzung ist damit nicht automatisch bestätigt.' },
  roles: { document: 'R+V-Bedingungswerke und VVG – Vertragsrollen', location: 'Versicherungsnehmer, versicherte Person, Eigentümer/Halter und fremde Rechnung', text: 'Beitragszahler, Versicherungsnehmer, Eigentümer/Halter und versicherte Person sind getrennte Rollen. Eine andere Person wird nicht allein durch Beitragszahlung oder Eigentum automatisch mitversichert; abweichende Rollen müssen korrekt erfasst und akzeptiert werden.' },
  motor: { document: 'R+V-Kfz-Verbraucherinformation Pkw', location: 'AKB und Antragsangaben · Stand 01.07.2026', text: 'R+V unterscheidet Versicherungsnehmer, Halter, Eigentümer und Fahrer. Abweichender Halter, Fahrerkreis, Leasing beziehungsweise Finanzierung und Fahrzeugnutzung müssen im Antrag zutreffend angegeben werden.' },
  life: { document: '§ 150 VVG und R+V-Leben-Bedingungsheft', location: 'Versicherte Person und Bezugsrecht', text: 'Versicherungsnehmer, versicherte Person und Bezugsberechtigte können auseinanderfallen. Bei einer Versicherung auf das Leben eines anderen kann eine schriftliche Einwilligung erforderlich sein. Bei der Basisrente müssen Versicherungsnehmer und versicherte Person übereinstimmen.' },
  studentBu: { document: 'R+V BU-Versicherung für Schüler', location: 'Produktdarstellung · Stand 05/2026', text: 'Der Abschluss einer R+V-Schüler-BU ist ab Alter 10 beziehungsweise ab der 5. Klasse möglich. Weitere Grenzen hängen von Schulform, Risikoprüfung, Rentenhöhe und den vereinbarten Bedingungen ab.' },
  energy: { document: 'R+V-Produktdarstellungen Photovoltaik und Hausrat', location: 'PV-Baustein, Balkonkraftwerk und mobile Ladestation', text: 'R+V ordnet private Dach-Photovoltaikanlagen bis 30 kWp dem Zusatzbaustein der Wohngebäudeversicherung zu. Balkonkraftwerke und mobile Ladestationen können je nach Eigentum, Befestigung und Tarif dem Hausrat- oder Gebäudebereich zuzuordnen sein.' },
  natural: { document: 'R+V-Hausrat- und Wohngebäude-Leistungsübersichten', location: 'Zusatzbausteine Naturgefahren Plus und Glasbruch', text: 'Überschwemmung, Starkregen, Rückstau und weitere Naturgefahren erfordern den vereinbarten Baustein Naturgefahren Plus. Glasbruch, Fahrraddiebstahl und weitere Erweiterungen sind gesondert zu vereinbaren.' },
  animal: { document: 'R+V-Tierhalterhaftpflicht und Tier-OP-/Tierleben-Bedingungen', location: 'Versichertes Risiko, bezeichnetes Tier und versicherte Person', text: 'Die Haftpflicht knüpft an die gesetzliche Haftung des Tierhalters an. OP- und Tierlebenprodukte knüpfen an das bezeichnete Tier, den Versicherungsnehmer und die vereinbarte leistungsberechtigte Person an.' }
};

const CASE_TOPICS = {
  values: {
    label: 'Werte & Aufbewahrung', icon: '◆', subtitle: 'Hausrat · Schließfach · EMA', products: ['hausrat', 'bankschliessfach'],
    fields: [
      { id: 'tariff', label: 'Gewünschter Schutzweg', type: 'choice', options: [['premium','Hausrat premium'],['comfort','Hausrat comfort'],['classic','Hausrat classic'],['separate','Separate Schließfachversicherung']] },
      { id: 'area', label: 'Wohnfläche in m²', type: 'number', min: 1, max: 1000, step: 1 },
      { id: 'boxValue', label: 'Wert im Bankschließfach in €', type: 'number', min: 0, max: 2000000, step: 1000 },
      { id: 'homeValue', label: 'Wertsachen zu Hause in €', type: 'number', min: 0, max: 2000000, step: 1000 },
      { id: 'kind', label: 'Schwerpunkt des Bestands', type: 'choice', options: [['gold','Gold / Schmuck'],['cash','Bargeld'],['mixed','Gemischt'],['ordinary','Sonstiger Hausrat']] },
      { id: 'bank', label: 'Schließfachanbieter', type: 'choice', options: [['vr','Volks-/Raiffeisenbank'],['other','Andere Bank']] }
    ]
  },
  property: {
    label: 'Immobilien & Grundstücke', icon: '⌂', subtitle: 'Eigentum · Nutzung · Fläche', products: ['wohngebaeude','hausrat','phv','hugb'],
    fields: [
      { id: 'propertyType', label: 'Welche Konstellation?', type: 'choice', options: [['ownHome','Eigenes Wohngebäude'],['foreignHome','Fremdes Gebäude versichern'],['unbuilt','Unbebautes Grundstück'],['forest','Wald-/Forstgrundstück'],['rental','Vermietetes Gebäude']] },
      { id: 'owner', label: 'Eigentümer zugleich Versicherungsnehmer?', type: 'choice', options: [['same','Ja'],['other','Nein, andere Person']] },
      { id: 'use', label: 'Nutzung', type: 'choice', options: [['private','Privat'],['rented','Vermietet / verpachtet'],['commercial','Gewerblich / forstwirtschaftlich']] },
      { id: 'livingArea', label: 'Wohnfläche in m²', type: 'number', min: 1, max: 10000, step: 1, when: { field: 'propertyType', values: ['ownHome','foreignHome','rental'] } },
      { id: 'landArea', label: 'Grundstücksfläche in m²', type: 'number', min: 1, max: 10000000, step: 100, when: { field: 'propertyType', values: ['unbuilt','forest'] } }
    ]
  },
  roles: { label: 'Vertragsrollen', icon: '◎', subtitle: 'Wer versichert wen?', products: [], delegate: 'roles', fields: [] },
  mobility: {
    label: 'Fahrzeuge & Halter', icon: '▰', subtitle: 'Halter · Eigentümer · Fahrer', products: ['kfz-auto','kfz-eauto','kfz-motorrad','kfz-wohnmobil'],
    fields: [
      { id: 'vehicle', label: 'Fahrzeug', type: 'choice', options: [['car','Pkw'],['ev','Elektroauto'],['bike','Motorrad / Roller'],['camper','Wohnmobil / Wohnwagen']] },
      { id: 'holder', label: 'Halter zugleich Versicherungsnehmer?', type: 'choice', options: [['same','Ja'],['other','Nein']] },
      { id: 'ownership', label: 'Eigentum / Finanzierung', type: 'choice', options: [['own','Eigenes Fahrzeug'],['lease','Leasing / Finanzierung'],['other','Fremdes Fahrzeug']] },
      { id: 'drivers', label: 'Fahrerkreis', type: 'choice', options: [['fixed','Bekannte Fahrer'],['young','Junge Fahrer'],['open','Offener Fahrerkreis']] }
    ]
  },
  person: {
    label: 'Personen & Bezugsrecht', icon: '∞', subtitle: 'Leben · BU · Unfall · Kranken', products: ['risikoleben','bu','unfall','pkv'],
    fields: [
      { id: 'product', label: 'Produktart', type: 'choice', options: [['life','Leben / Todesfall'],['bu','Berufsunfähigkeit'],['basic','Basisrente'],['accident','Unfall'],['health','Kranken / Pflege']] },
      { id: 'insured', label: 'Versicherte Person zugleich Versicherungsnehmer?', type: 'choice', options: [['same','Ja'],['other','Nein']] },
      { id: 'beneficiary', label: 'Wer soll die Leistung erhalten?', type: 'choice', options: [['insured','Versicherte Person'],['holder','Versicherungsnehmer'],['other','Andere Person']] },
      { id: 'consent', label: 'Einwilligung / Auftrag vorhanden?', type: 'choice', options: [['yes','Ja'],['no','Noch nicht']] }
    ]
  },
  entry: {
    label: 'Alter & Abschluss', icon: '◷', subtitle: 'Zielgruppe · Einstieg · Grenzen', products: ['schueler-bu','unfall-kind','kind-rund','kind-index','bu'],
    fields: [
      { id: 'age', label: 'Alter der zu versichernden Person', type: 'number', min: 0, max: 100, step: 1 },
      { id: 'status', label: 'Lebensphase', type: 'choice', options: [['child','Kind'],['student','Schüler/in'],['training','Ausbildung / Studium'],['working','Berufstätig'],['civil','Beamtenlaufbahn']] },
      { id: 'goal', label: 'Absicherungsziel', type: 'choice', options: [['income','Arbeitskraft'],['accident','Unfall'],['health','Gesundheit'],['saving','Vorsorge / Sparen']] }
    ]
  },
  energy: {
    label: 'Energie & Technik', icon: '☀', subtitle: 'PV · Wallbox · Balkonkraftwerk', products: ['pv','wohngebaeude','hausrat'],
    fields: [
      { id: 'item', label: 'Was soll versichert werden?', type: 'choice', options: [['roofPv','Dach-PV-Anlage'],['balcony','Balkonkraftwerk'],['wallbox','Wallbox / mobile Ladestation'],['solar','Solarthermie']] },
      { id: 'role', label: 'Rolle am Gebäude', type: 'choice', options: [['owner','Gebäudeeigentümer'],['tenant','Mieter'],['condo','Wohnungseigentümer']] },
      { id: 'size', label: 'Leistung der Anlage in kWp', type: 'number', min: 0, max: 1000, step: 1 },
      { id: 'income', label: 'Ertragsausfall absichern?', type: 'choice', options: [['yes','Ja'],['no','Nein']] }
    ]
  },
  protection: {
    label: 'Gefahren & Bausteine', icon: '✦', subtitle: 'Elementar · Glas · Fahrrad · Digital', products: ['hausrat','wohngebaeude','recht-privat'],
    fields: [
      { id: 'target', label: 'Was soll geschützt werden?', type: 'choice', options: [['contents','Hausrat'],['building','Gebäude'],['both','Hausrat und Gebäude'],['travel','Hausrat auf Reisen']] },
      { id: 'risk', label: 'Zusätzliches Risiko', type: 'choice', options: [['natural','Starkregen / Überschwemmung'],['glass','Glasbruch'],['bike','Fahrraddiebstahl'],['cyber','Online-/Cyberrisiken'],['all','Mehrere Risiken']] },
      { id: 'existing', label: 'Baustein bereits vereinbart?', type: 'choice', options: [['yes','Ja'],['no','Nein / unklar']] }
    ]
  },
  animal: {
    label: 'Tiere & Halter', icon: '●', subtitle: 'Haftpflicht · OP · Tierleben', products: ['hund-haft','pferd-haft','hund-op','pferd-op','pferd-leben'],
    fields: [
      { id: 'animal', label: 'Tierart', type: 'choice', options: [['dog','Hund'],['horse','Pferd']] },
      { id: 'goal', label: 'Absicherungsziel', type: 'choice', options: [['liability','Haftpflicht'],['operation','Operationskosten'],['life','Tod / Unbrauchbarkeit']] },
      { id: 'holder', label: 'Tierhalter zugleich Versicherungsnehmer?', type: 'choice', options: [['same','Ja'],['other','Nein']] },
      { id: 'use', label: 'Nutzung', type: 'choice', options: [['private','Privat'],['sport','Sport / Turnier'],['commercial','Gewerblich']] }
    ]
  }
};

const CASE_DEFAULTS = {
  values:{tariff:'premium',area:100,boxValue:50000,homeValue:10000,kind:'gold',bank:'vr'},
  property:{propertyType:'foreignHome',owner:'other',use:'private',livingArea:150,landArea:8000},
  mobility:{vehicle:'car',holder:'other',ownership:'own',drivers:'fixed'},
  person:{product:'life',insured:'other',beneficiary:'other',consent:'yes'},
  entry:{age:10,status:'student',goal:'income'},
  energy:{item:'roofPv',role:'owner',size:10,income:'no'},
  protection:{target:'both',risk:'natural',existing:'no'},
  animal:{animal:'dog',goal:'liability',holder:'same',use:'private'}
};

const money = value => `${Math.max(0, Number(value) || 0).toLocaleString('de-DE')} €`;
const result = (tone, verdict, title, text, extras={}) => ({ tone, verdict, title, text, facts:[], questions:[], actions:[], products:[], sources:[], ...extras });

function valueCase(s) {
  const area = Number(s.area)||0, box = Number(s.boxValue)||0, home = Number(s.homeValue)||0;
  if (s.tariff === 'separate') {
    const eligible = s.bank === 'vr', enough = box <= 2000000;
    return result(eligible && enough ? 'yes' : 'warning', eligible && enough ? 'Passender Schutzweg' : 'Annahme klären', 'Eigenständige Bankschließfachversicherung', `Der Schließfachwert von ${money(box)} wird über eine eigene Versicherungssumme abgebildet und verändert die häusliche Wertsachengrenze nicht.`, {
      facts:[{text:'Öffentliche R+V-Spanne: 1.000 € bis 2.000.000 €.',tone:enough?'yes':'warning'},{text:`Wertsachen zu Hause: ${money(home)} bleiben separat über die Hausratversicherung zu bewerten.`,tone:'info'}],
      questions:[eligible?'Ist die gewählte Versicherungssumme mindestens so hoch wie der nachweisbare Schließfachinhalt?':'Die öffentliche R+V-Lösung ist für Schließfächer bei Volks- und Raiffeisenbanken beschrieben.',...(s.kind==='cash'?['Wie werden Betrag und Einlagerungszeitpunkt des Bargelds nachgewiesen?']:[])],
      actions:[enough?'Versicherungssumme regelmäßig an Wertänderungen anpassen.':'Schließfachwert über 2 Mio. € individuell anfragen.','Inventar, Fotos, Rechnungen und Einlagerungsnachweise getrennt vom Schließfach aufbewahren.'],products:['bankschliessfach','hausrat'],sources:['bankBox']
    });
  }
  const bankLimit = {classic:20000,comfort:30000,premium:100000}[s.tariff]||0;
  const valueLimit = Math.max(area*200, s.tariff==='classic'?0:25000);
  const boxEnough = box <= bankLimit, homeEnough = home <= valueLimit;
  const bankAboveGeneral = box > valueLimit && boxEnough;
  const tone = !boxEnough || !homeEnough ? 'warning' : bankAboveGeneral ? 'conditional' : 'yes';
  const verdict = !boxEnough ? 'Schließfachgrenze reicht nicht' : !homeEnough ? 'Häusliche Grenze erhöhen' : bankAboveGeneral ? 'Nominal passend · bestätigen' : 'Grenzen nominal ausreichend';
  return result(tone, verdict, 'Hausrat und Bankschließfach getrennt betrachten', `Im Tarif ${s.tariff} beträgt die besondere Schließfachgrenze ${money(bankLimit)}. Die rechnerische allgemeine Wertsachengrenze liegt bei ${money(valueLimit)}.`, {
    facts:[{text:`Schließfach: ${money(box)} von ${money(bankLimit)}.`,tone:boxEnough?'yes':'warning'},{text:`Zu Hause: ${money(home)} von rechnerisch ${money(valueLimit)}.`,tone:homeEnough?'yes':'warning'},{text:'Die öffentlichen Bedingungen lösen nicht eindeutig auf, ob ein ausschließlich im Bankschließfach liegender Mehrwert die häusliche Wertsachengrenze oder EMA-Anforderungen beeinflusst.',tone:bankAboveGeneral?'warning':'info'}],
    questions:[...(bankAboveGeneral?['Gilt die Schließfachgrenze für Wertsachen eigenständig neben A18?','Löst der ausschließlich im Schließfach liegende Mehrwert keine EMA-Anforderung am Wohnort aus?']:[]),...(s.kind==='cash'||s.kind==='mixed'?['Gilt das Bankschließfach als verschlossener Wertschutzschrank für die Bargeldgrenze?']:[]),...(s.kind==='gold'||s.kind==='mixed'?['Welche Nachweise werden für Gold, Schmuck oder Münzen verlangt?']:[])],
    actions:[...(!boxEnough?['Separate Bankschließfachversicherung oder individuelle höhere Schließfachlösung prüfen.']:[]),...(!homeEnough?['Häusliche Wertsachengrenze erhöhen und Sicherungsanforderungen einschließlich EMA prüfen.']:[]),...(bankAboveGeneral?['Vor Leistungszusage schriftliche R+V-Bestätigung zur Abgrenzung Z-ORT-02/A18 dokumentieren.']:['Grenzen und Aufbewahrungsnachweise im Beratungsprotokoll dokumentieren.'])],products:['hausrat','bankschliessfach'],sources:['houseValues','houseTerms','bankBox']
  });
}

function propertyCase(s) {
  const livingArea=Number(s.livingArea)||0, landArea=Number(s.landArea)||0, different=s.owner==='other';
  if (s.propertyType==='unbuilt'||s.propertyType==='forest') {
    const forest=s.propertyType==='forest', commercial=s.use==='commercial', premium=landArea<=10000, comfort=landArea<=2000;
    const areaFact=comfort
      ? {text:'Die Fläche liegt innerhalb der veröffentlichten comfort-Grenze.',tone:forest?'info':'yes'}
      : premium
        ? {text:'Die Fläche liegt über der comfort-Grenze und nur innerhalb der veröffentlichten premium-Grenze.',tone:'info'}
        : {text:'Die Fläche überschreitet auch die veröffentlichte premium-Grenze von 10.000 m².',tone:'warning'};
    const useFact=forest
      ? {text:'Wald-/Forstfläche ist nicht automatisch einem privat unbebauten Grundstück gleichzusetzen.',tone:'warning'}
      : commercial
        ? {text:'Eine gewerbliche oder forstwirtschaftliche Nutzung ist nicht als private Grundstücksinhaberschaft zu unterstellen.',tone:'warning'}
        : {text:'Private Nutzung angegeben.',tone:'info'};
    return result(forest||commercial?'warning':premium?'conditional':'warning', forest||commercial?'Risikoeinordnung erforderlich':comfort?'comfort oder premium prüfen':premium?'premium prüfen':'Spezialschutz erforderlich', forest?'Wald ist nicht automatisch nur ein unbebautes Grundstück':'Unbebautes Grundstück nach Fläche und Nutzung einordnen', `Die PHV-Leistungsübersicht nennt unbebaute Grundstücke in comfort bis 2.000 m² und in premium bis 10.000 m². Angegeben sind ${landArea.toLocaleString('de-DE')} m².`, {
      facts:[areaFact,useFact],
      questions:[forest?'Bestätigt R+V ausdrücklich, dass Wald-/Forstfläche unter „unbebautes Grundstück“ fällt?':'Ist das Grundstück tatsächlich unbebaut?',s.use==='rented'?'Ist Vermietung/Verpachtung im gewählten Tarif eingeschlossen?':'Entstehen Einnahmen oder findet eine wirtschaftliche Nutzung statt?',different?'Ist der tatsächliche Eigentümer als versicherte Person erfasst?':'Wer haftet rechtlich als Eigentümer?'],
      actions:['Fläche, Lage, Nutzung und Eigentümer im Antrag dokumentieren.',forest||commercial?'Vor Zusage schriftliche Risikobestätigung oder Haus- und Grundbesitzer-/Betriebslösung einholen.':'Tarifgrenze mit dem konkreten Versicherungsschein abgleichen.'],products:['phv','hugb'],sources:['phvProperty','roles']
    });
  }
  const areaFact={text:`Erfasste Wohnfläche: ${livingArea.toLocaleString('de-DE')} m².`,tone:'info'};
  if (s.propertyType==='foreignHome'||different) return result('conditional','Möglich · Rollen sauber trennen','Fremdes Gebäude kann nicht über den Beitragszahler erklärt werden','Gebäude-, Hausrat- und Haftpflichtschutz können unterschiedliche Versicherungsnehmer, Eigentümer und versicherte Interessen haben. Entscheidend ist, wer Eigentümer ist, wessen Interesse versichert wird und wer haftet.',{facts:[areaFact,{text:'Beitragszahlung allein erzeugt kein Eigentum und keinen Haftpflichtschutz.',tone:'warning'},{text:'Wohngebäude/Hausrat können als Versicherung für fremde Rechnung gestaltet werden; Annahme und Dokumentation müssen passen.',tone:'info'}],questions:['Wer ist Eigentümer des Gebäudes?','Wer ist Versicherungsnehmer und Beitragszahler?','Wessen Hausrat befindet sich dort?','Wer haftet als Haus- und Grundbesitzer?'],actions:['Vertragsrollen-Checker öffnen.','Eigentümer beziehungsweise versichertes Interesse im Antrag und Versicherungsschein eindeutig benennen.','Haftpflicht des tatsächlichen Eigentümers separat sicherstellen.'],products:['wohngebaeude','hausrat','hugb'],sources:['roles']});
  if (s.propertyType==='rental'||s.use==='rented') return result('conditional','Vermietung gezielt prüfen','Vermietetes Gebäude braucht eine eigene Risikoeinordnung','Wohngebäude, Haus- und Grundbesitzerhaftpflicht, Mietverlust und gegebenenfalls Vermieter-Rechtsschutz sind entlang der tatsächlichen Vermietung zu prüfen.',{facts:[areaFact,{text:'Die Nutzung ist als vermietet beziehungsweise verpachtet angegeben.',tone:'info'}],questions:['Wie viele Wohneinheiten werden vermietet?','Ist das Gebäude vollständig oder teilweise selbst genutzt?','Welche Mietausfall- und Haftpflichtrisiken sollen eingeschlossen werden?'],actions:['Vermietungsumfang und Wohnfläche vollständig erfassen.','Wohngebäude- und Haus-/Grundbesitzer-Schutz gemeinsam prüfen.'],products:['wohngebaeude','hugb','recht-immo'],sources:['roles','natural']});
  if (s.use==='commercial') return result('warning','Nutzung widerspricht Standardfall','Gewerbliche Nutzung separat einordnen','Ein eigenes Wohngebäude mit gewerblicher Nutzung darf nicht ungeprüft als rein privates Wohnrisiko behandelt werden.',{facts:[areaFact,{text:'Gewerbliche Nutzung wurde ausgewählt.',tone:'warning'}],questions:['Welcher Anteil der Fläche wird gewerblich genutzt?','Welche Tätigkeit findet dort statt?'],actions:['Nutzung und Flächenanteile dokumentieren.','Annahme und gegebenenfalls Gewerbelösung prüfen.'],products:['wohngebaeude','hugb'],sources:['roles']});
  return result('yes','Standardkonstellation','Eigentümer und Versicherungsnehmer stimmen überein','Gebäude-, Hausrat- und Haftpflichtrisiken können entlang der tatsächlichen Nutzung strukturiert werden.',{facts:[areaFact],questions:['Ist die angegebene Wohnfläche vollständig und korrekt?','Sind Naturgefahren, Glas, PV und Mietverlust relevant?'],actions:['Gebäudewert und Wohnfläche korrekt erfassen.','Zusatzbausteine anhand Lage und Nutzung prüfen.'],products:['wohngebaeude','hausrat','hugb'],sources:['roles','natural']});
}

function mobilityCase(s) {
  const different=s.holder==='other', lease=s.ownership==='lease';
  const map={car:'kfz-auto',ev:'kfz-eauto',bike:'kfz-motorrad',camper:'kfz-wohnmobil'};
  return result(different?'conditional':'yes',different?'Abweichenden Halter angeben':'Rollen plausibel','Versicherungsnehmer, Halter, Eigentümer und Fahrer getrennt prüfen',different?'Ein abweichender Halter ist grundsätzlich erfassbar, kann aber Annahme, Beitrag und Schadenfreiheitsrabatt beeinflussen.':'Versicherungsnehmer und Halter stimmen überein.',{facts:[{text:lease?'Leasing/Finanzierung: Eigentümer und möglicher GAP-Bedarf gesondert erfassen.':'Eigentum wurde nicht als Leasing/Finanzierung angegeben.',tone:lease?'info':'yes'},{text:s.drivers==='young'?'Junge Fahrer verändern regelmäßig Beitrag und Annahme.':s.drivers==='open'?'Ein offener Fahrerkreis muss tarifiert werden.':'Bekannter Fahrerkreis angegeben.',tone:s.drivers==='fixed'?'yes':'warning'}],questions:['Wer ist in der Zulassungsbescheinigung als Halter eingetragen?','Wer trägt das wirtschaftliche Eigentumsinteresse?','Wer fährt regelmäßig oder gelegentlich?'],actions:['Rollen und Fahrerkreis vollständig im Antrag angeben.',lease?'GAP-/Differenzkaskoschutz und Vorgaben des Finanzierers prüfen.':'Kasko nach Fahrzeugwert und Nutzung wählen.'],products:[map[s.vehicle]||'kfz-auto'],sources:['motor']});
}

function personCase(s) {
  const different=s.insured==='other', noConsent=s.consent==='no';
  if (s.product==='basic'&&different) return result('stop','So nicht abschließen','Basisrente verlangt Rollenidentität','Bei der R+V-Basisrente müssen Versicherungsnehmer und versicherte Person übereinstimmen.',{questions:['Soll tatsächlich eine Basisrente abgeschlossen werden?','Wer soll Beitrag und steuerliche Förderung wirtschaftlich tragen?'],actions:['Versicherungsnehmer und versicherte Person identisch gestalten oder anderes Produkt prüfen.'],products:['ruerup-fonds','basis-safe'],sources:['life']});
  return result(noConsent?'stop':different?'warning':'yes',noConsent?'Einwilligung fehlt':different?'Einwilligung und Produkt prüfen':'Standardgestaltung','Leistungsempfänger bewusst festlegen',different?'Der Vertrag betrifft eine andere versicherte Person. Produkt, Einwilligung, Gesundheitsangaben und Bezugsrecht müssen zusammenpassen.':'Versicherungsnehmer und versicherte Person stimmen überein.',{facts:[s.beneficiary==='other'?'Eine dritte Person soll die Leistung erhalten und muss ausdrücklich benannt werden.':s.beneficiary==='holder'?'Der Versicherungsnehmer soll die Leistung erhalten.':'Die versicherte Person soll die Leistung erhalten.'],questions:['Ist das Bezugsrecht widerruflich oder unwiderruflich?','Sind Schenkungs-/Erbschaftsteuer oder wirtschaftliche Berechtigung relevant?',different?'Liegt die erforderliche schriftliche Einwilligung vor?':'Sind Versicherungsnehmer und versicherte Person im Antrag identisch erfasst?'],actions:[noConsent?'Nicht abschließen, bevor Auftrag und Einwilligung geklärt sind.':'Rollen im Versicherungsschein kontrollieren.','Gesundheits- und Risikofragen mit der versicherten Person vollständig beantworten.'],products:[s.product==='life'?'risikoleben':s.product==='bu'?'bu':s.product==='accident'?'unfall':s.product==='health'?'pkv':'basis-safe'],sources:['life','roles']});
}

function entryCase(s) {
  const age=Number(s.age)||0;
  if (s.goal==='income'&&s.status==='student') {
    const eligible=age>=10;
    return result(eligible?'yes':'warning',eligible?'Schüler-BU grundsätzlich möglich':'Noch zu jung','Arbeitskraftschutz frühzeitig einordnen',eligible?`Mit ${age} Jahren ist die öffentlich genannte Mindesteinstiegsgrenze von 10 Jahren erreicht.`:`Mit ${age} Jahren ist die öffentlich genannte Grenze von 10 Jahren noch nicht erreicht.`,{questions:['Ist mindestens die 5. Klasse erreicht?','Welche Schulform, Rentenhöhe und Laufzeit sind vorgesehen?','Welche Gesundheits- und Freizeitrisiken bestehen?'],actions:[eligible?'Schüler-BU tariflich und gesundheitlich prüfen.':'Kinder-Unfall- und Vorsorgelösungen überbrückend prüfen.','Späteren Berufswechsel und Nachversicherungsmöglichkeiten dokumentieren.'],products:eligible?['schueler-bu','bu']:['unfall-kind','kind-rund'],sources:['studentBu']});
  }
  const product=s.goal==='accident'?(age<18?'unfall-kind':'unfall'):s.goal==='health'?(age<18?'plus-kombi':'pkv'):s.goal==='saving'?(age<18?'kind-index':'anspar'):(s.status==='civil'?'du':'bu');
  return result('conditional','Produktweg gefunden · Grenzen prüfen','Alter ist nur der erste Filter',`Der passende Einstieg führt aktuell zu „${(typeof PRODUCTS!=='undefined'&&PRODUCTS.find(p=>p.id===product)?.name)||product}“. Abschlussalter, Gesundheitsprüfung, Berufs-/Schulstatus und Laufzeit bleiben gemeinsam zu prüfen.`,{questions:['Welche konkrete Laufzeit und Leistungshöhe wird benötigt?','Gibt es Gesundheits-, Berufs- oder Freizeitrisiken?','Welche produktspezifische Höchst- beziehungsweise Mindesteinstiegsgrenze gilt?'],actions:['Produktdetail „Abschluss & Grenzen“ öffnen.','Keine Annahme nur aus dem Alter ableiten.'],products:[product],sources:s.goal==='income'?['studentBu']:['roles']});
}

function energyCase(s) {
  const size=Number(s.size)||0;
  if (s.item==='roofPv') return result(size<=30&&s.role==='owner'?'yes':'conditional',size<=30?'PV-Baustein prüfen':'Individuelle Lösung prüfen','Dach-PV gehört regelmäßig zum Gebäudeschutz',`Die private R+V-PV-Lösung ist als Zusatzbaustein der Wohngebäudeversicherung für Anlagen bis 30 kWp beschrieben. Angegeben sind ${size} kWp.`,{questions:[s.role!=='owner'?'Wer ist Eigentümer und Betreiber der Anlage?':'Ist die Anlage im Gebäudeeigentum?',s.income==='yes'?'Welche Dauer und Höhe des Ertragsausfalls wird benötigt?':'Besteht dennoch ein relevantes Einspeiserisiko?'],actions:[size<=30?'Wohngebäudebaustein PV und optionalen Ertragsausfall prüfen.':'Gewerbliche/individuelle PV-Lösung anfragen.'],products:['pv','wohngebaeude'],sources:['energy']});
  if (s.item==='balcony') return result('conditional','Eigentum und Befestigung prüfen','Balkonkraftwerk kann Hausrat oder Gebäude sein',s.role==='tenant'?'Bei Mietern spricht eine selbst beschaffte, nicht dauerhaft gebäudebestimmende Anlage eher für Hausrat. Zustimmung und Befestigung bleiben zu prüfen.':'Bei Eigentümern ist die Zuordnung zum Gebäude- oder Hausratvertrag anhand Befestigung und Vertragsdefinition zu klären.',{questions:['Wem gehört die Anlage?','Ist sie dauerhaft mit dem Gebäude verbunden?','Besteht Diebstahlschutz am Aufstellort?'],actions:['Hausrat- und Wohngebäudevertrag auf konkrete Zuordnung prüfen.'],products:['hausrat','wohngebaeude'],sources:['energy']});
  return result('conditional','Zuordnung prüfen',s.item==='wallbox'?'Wallbox nach Eigentum und Einbau zuordnen':'Solarthermie gehört regelmäßig zum Gebäude',s.role==='tenant'?'Mieter- beziehungsweise Sondereigentum und Einbauzustand müssen getrennt erfasst werden.':'Als Gebäudeeigentümer ist der Wohngebäudevertrag der erste Prüfweg.',{questions:['Wer trägt die Gefahr und Reparaturkosten?','Ist die Anlage fest installiert oder mobil?','Sind Überspannung, Diebstahl und Ertragsausfall relevant?'],actions:['Versichertes Eigentum im Versicherungsschein kontrollieren.'],products:['wohngebaeude','hausrat'],sources:['energy']});
}

function protectionCase(s) {
  const map={natural:'Naturgefahren Plus',glass:'Glasbruch',bike:'Fahrraddiebstahl/Fahrrad Plus',cyber:'SicherOnline',all:'mehrere Zusatzbausteine'};
  const related=s.target==='building'?['wohngebaeude']:s.target==='contents'||s.target==='travel'?['hausrat']:['hausrat','wohngebaeude'];
  return result(s.existing==='yes'?'conditional':'warning',s.existing==='yes'?'Umfang kontrollieren':'Baustein fehlt oder ist unklar',`${map[s.risk]} gezielt prüfen`,s.existing==='yes'?'Der Baustein ist nach Angabe vorhanden; Selbstbeteiligung, Grenze, versicherte Sachen und Versicherungsort müssen noch passen.':'Der Grundschutz enthält das ausgewählte Zusatzrisiko nicht automatisch in jedem Umfang.',{questions:['Welche konkrete Gefahr soll abgesichert werden?','Für Gebäude, Hausrat oder beide Verträge?','Welche Selbstbeteiligung und Entschädigungsgrenze ist vereinbart?'],actions:[s.existing==='yes'?'Versicherungsschein und Nachträge gegen aktuelle Bedingungen prüfen.':`${map[s.risk]} im passenden Vertrag anbieten.`,'Doppelungen und Deckungslücken zwischen Hausrat und Gebäude vermeiden.'],products:related,sources:['natural']});
}

function animalCase(s) {
  const product=s.animal==='dog'?(s.goal==='liability'?'hund-haft':'hund-op'):(s.goal==='liability'?'pferd-haft':s.goal==='operation'?'pferd-op':'pferd-leben');
  const different=s.holder==='other', commercial=s.use==='commercial';
  return result(commercial?'warning':different?'conditional':'yes',commercial?'Privattarif nicht unterstellen':different?'Halter ausdrücklich erfassen':'Produktweg passt',s.goal==='liability'?'Tierhalterhaftung absichern':'Bezeichnetes Tier und Leistungsempfänger festlegen',commercial?'Gewerbliche Nutzung muss ausdrücklich angenommen werden und kann einen anderen Produktweg erfordern.':different?'Tierhalter, Tiereigentümer und Versicherungsnehmer fallen auseinander und müssen dokumentiert werden.':'Standardkonstellation mit identischem Halter und Versicherungsnehmer.',{questions:['Wer haftet tatsächlich als Tierhalter?','Wem gehört das Tier?',s.use==='sport'?'Sind Turnier-, Reitbeteiligungs- oder Fremdreiterrisiken eingeschlossen?':'Gibt es eine entgeltliche oder gewerbliche Nutzung?'],actions:['Tierdaten und Kennzeichnung vollständig erfassen.',different?'Abweichenden Halter/Eigentümer von R+V bestätigen lassen.':'Tarifumfang und Selbstbeteiligung wählen.'],products:[product],sources:['animal','roles']});
}

function caseAnswer(topic, selection) {
  if (topic==='values') return valueCase(selection);
  if (topic==='property') return propertyCase(selection);
  if (topic==='mobility') return mobilityCase(selection);
  if (topic==='person') return personCase(selection);
  if (topic==='entry') return entryCase(selection);
  if (topic==='energy') return energyCase(selection);
  if (topic==='protection') return protectionCase(selection);
  if (topic==='animal') return animalCase(selection);
  return result('conditional','Rollen-Checker öffnen','Wer versichert wen?','Versicherungsnehmer, Eigentümer/Halter, versicherte Person, Beitragszahler und Bezugsberechtigte getrennt auswählen.',{actions:['Vertragsrollen im spezialisierten Checker festlegen.'],sources:['roles']});
}

const CASE_INDEX_BY_PRODUCT = {};
for (const [topicId, topic] of Object.entries(CASE_TOPICS)) for (const productId of topic.products||[]) CASE_INDEX_BY_PRODUCT[productId]=`${CASE_INDEX_BY_PRODUCT[productId]||''} Fall Navigator ${topic.label} ${topic.subtitle}`;
