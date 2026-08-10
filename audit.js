/* RuVKompendium 16 – fachliche Freigabeschicht für aktuelles Privatkunden-Neugeschäft */
const AUDIT_META = {
  edition: 16,
  checked: '10.08.2026',
  market: 'Deutschland',
  scope: 'R+V Privatkunden · aktuelles Neugeschäft',
  excluded: ['R+V BKK', 'Lebensarbeitszeitkonto', 'Beiträge und Rabatte'],
  historicalContracts: false
};

const AUDIT_EXCLUDED_PRODUCTS = ['gkv', 'lebensarbeitszeit'];
const PRICE_ROW_IDS = new Set(['kfz-auto-feature-3', 'kfz-eauto-feature-1', 'bankschliessfach-feature-1']);
const GENERIC_LOCATION_PATTERN = /produktbezogene Regelung; genaue Ziffer im Dokument prüfen/i;

for (const productId of AUDIT_EXCLUDED_PRODUCTS) delete COVERAGE[productId];

function replaceRowText(row, text) {
  if (!row) return;
  row.feature = text;
  if (row.source) row.source.text = text;
  for (const value of Object.values(row.values || {})) value.detail = text;
}

replaceRowText(COVERAGE['reise-kv']?.rows.find(row => row.id === 'reise-kv-eligibility-1'), 'FernWeh unterscheidet Personen bis 64 Jahre und Personen ab 65 Jahren. Das Eintrittsalter wird als Kalenderjahr minus Geburtsjahr bestimmt.');
replaceRowText(COVERAGE['reise-kv']?.rows.find(row => row.id === 'reise-kv-eligibility-2'), 'FernWeh Familie ist für versicherte Personen ab 65 Jahren nicht abschließbar.');
replaceRowText(COVERAGE['reise-kv']?.rows.find(row => row.id === 'reise-kv-feature-2'), 'Eine Verlängerung ab Tag 46 bis maximal 730 Tage ist unter den tariflichen Voraussetzungen möglich.');

const kfzProduct = PRODUCTS.find(product => product.id === 'kfz-auto');
for (const [index, tariff] of (kfzProduct?.tariffs || []).entries()) {
  const row = COVERAGE['kfz-auto']?.rows.find(item => item.id === `kfz-auto-tariff-${index + 1}`);
  if (row?.values?.[tariff.name]) row.values[tariff.name].detail = tariff.note;
  if (row?.source) row.source.text = tariff.note;
}
const kfzNewPrice = COVERAGE['kfz-auto']?.rows.find(row => row.id === 'kfz-auto-feature-2');
if (kfzNewPrice) {
  kfzNewPrice.feature = 'Neupreisentschädigung bei Totalschaden, Zerstörung oder Verlust';
  kfzNewPrice.values = {
    classic: { status: 'no', detail: 'Nicht in A.2.6.1 b vorgesehen' },
    comfort: { status: 'limited', detail: 'innerhalb von 12 Monaten nach Erstzulassung; weitere Voraussetzungen beachten' },
    premium: { status: 'limited', detail: 'innerhalb von 30 Monaten nach Erstzulassung; weitere Voraussetzungen beachten' }
  };
  kfzNewPrice.source = { kind: 'Bedingungswerk', document: 'R+V Verbraucherinformation für Pkw', version: 'AKB · Stand Juli 2026', location: 'A.2.6.1 b · Seite 21', text: 'Die Neupreisentschädigung ist ausschließlich für premium innerhalb von 30 Monaten und comfort innerhalb von 12 Monaten geregelt.' };
}
const buDefinition = COVERAGE.bu?.rows.find(row => row.id === 'bu-feature-2');
if (buDefinition) buDefinition.source = { kind: 'Bedingungswerk', document: 'Bedingungsheft R+V Lebensversicherung AG', version: 'BV29 / BV30 / BV31 · Stand 01.04.2026', location: 'jeweils § 2 · Seiten 382, 411 und 443', text: 'Berufsunfähigkeit setzt voraussichtlich sechs Monate ununterbrochene Beeinträchtigung von mindestens 50 % im zuletzt ausgeübten Beruf voraus. Für Schüler verzichten die Bedingungen auf konkrete und abstrakte Verweisung auf eine andere Schulform.' };

function sourceAudit(row) {
  const source = row?.source || {};
  if (GENERIC_LOCATION_PATTERN.test(source.location || '')) return {
    level: 'unverified', label: 'NICHT VERIFIZIERT',
    note: 'Für diese redaktionelle Aussage fehlt noch eine genaue Fundstelle im maßgeblichen Bedingungswerk.'
  };
  if (/Offizielle Leistungsübersicht/i.test(source.kind || '')) return {
    level: 'table', label: 'LEISTUNGSÜBERSICHT',
    note: 'Tarifzuordnung und Fundseite sind dokumentiert. Ausschlüsse und Voraussetzungen im Bedingungswerk bleiben zusätzlich zu prüfen.'
  };
  if (/Bedingungswerk|Gesetz/i.test(source.kind || '') && /§|Ziffer|\b[A-Z]\d+(?:\.\d+)*|Seite|S\.\s*\d/i.test(source.location || '')) return {
    level: 'contract', label: 'BEDINGUNGSFUNDSTELLE',
    note: 'Dokument und Fundstelle sind bezeichnet; der vollständige Wortlaut und der konkrete Vertrag bleiben maßgeblich.'
  };
  if (/Produktseite|Produktinformation/i.test(`${source.kind || ''} ${source.document || ''}`)) return {
    level: 'marketing', label: 'PRODUKTINFORMATION',
    note: 'Öffentliche Produktinformation, keine abschließende vertragliche Leistungsgrundlage.'
  };
  return {
    level: 'review', label: 'FUNDSTELLE PRÜFEN',
    note: 'Die Quelle ist bezeichnet, aber noch nicht als vollständige Vertragsgrundlage klassifiziert.'
  };
}

for (const matrix of Object.values(COVERAGE)) {
  matrix.rows = matrix.rows.filter(row => !PRICE_ROW_IDS.has(row.id));
  for (const row of matrix.rows) {
    row.audit = sourceAudit(row);
    if (row.audit.level !== 'unverified') continue;
    for (const value of Object.values(row.values || {})) {
      const previous = value.detail || '';
      value.originalStatus = value.status;
      value.status = 'check';
      value.detail = `Nicht in den vorliegenden Quellen mit genauer Fundstelle verifizierbar. Redaktionelle Vorinformation: ${previous}`;
    }
  }
}

COVERAGE_META.products = 83;
