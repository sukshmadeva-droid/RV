/* RuVKompendium 16 – offline-first, dependency-free, GitHub Pages friendly */
const $ = selector => document.querySelector(selector);
const $$ = selector => [...document.querySelectorAll(selector)];
const state = { category: 'Alle', query: '', limit: 18, detailProduct: null, matrixQuery: '', matrixVariant: 'Alle' };
const roleState = { product: 'building', interest: 'other', payer: 'self', consent: 'yes', relation: 'family', beneficiary: 'insured' };
const caseState = { topic: 'values', productId: null, selections: Object.fromEntries(Object.entries(CASE_DEFAULTS).map(([key, value]) => [key, { ...value }])) };
const norm = value => (value || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/ß/g, 'ss').replace(/[+&/–—-]/g, ' ').replace(/[^a-z0-9äöü ]/g, ' ').replace(/\s+/g, ' ').trim();
const esc = value => String(value ?? '').replace(/[&<>"]/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[char]));
const synonyms = {
  phv: ['privathaftpflicht'], haftpflicht: ['privathaftpflicht'], bu: ['berufsunfahigkeit'], sbu: ['berufsunfahigkeit'], du: ['dienstunfahigkeit'], gf: ['grundfahigkeit'],
  kfz: ['auto', 'autoversicherung', 'kfzpolice', 'fahrzeug'], pkw: ['auto', 'kfz'], pkv: ['private krankenversicherung', 'vollversicherung'], kv: ['krankenversicherung'],
  zahn: ['zahnersatz', 'zahnzusatz'], wg: ['wohngebaeude', 'gebaeude'], hr: ['hausrat'], rs: ['rechtsschutz'], avb: ['bedingungen', 'bedingungswerk', 'verbraucherinformation'],
  elementar: ['naturgefahren', 'hochwasser', 'starkregen', 'ueberschwemmung'], fahrrad: ['bike', 'pedelec', 'fahrraddiebstahl'], schluessel: ['schluesselverlust', 'privathaftpflicht'], solar: ['photovoltaik', 'pv'],
  schliessfach: ['bankschliessfach', 'bankschließfach'], ema: ['einbruchmeldeanlage', 'sicherungsanforderung'], wald: ['forst', 'waldgrundstueck', 'grundstueck']
};
const alternatives = token => [token, ...(synonyms[token] || [])].map(norm).filter(Boolean);

function editDistance(a, b) {
  if (Math.abs(a.length - b.length) > 1) return 99;
  const row = [...Array(b.length + 1).keys()];
  for (let i = 1; i <= a.length; i += 1) {
    let previous = row[0]; row[0] = i;
    for (let j = 1; j <= b.length; j += 1) {
      const old = row[j]; row[j] = Math.min(row[j] + 1, row[j - 1] + 1, previous + (a[i - 1] === b[j - 1] ? 0 : 1)); previous = old;
    }
  }
  return row[b.length];
}
function textHit(haystack, alternative) {
  if (!alternative) return 0;
  const words = haystack.split(' '), need = alternative.split(' ');
  if (need.length === 1 && alternative.length <= 3) return words.includes(alternative) ? 10 : 0;
  if (haystack.includes(alternative)) return 8;
  if (need.length > 1) return need.every(n => words.some(word => word.startsWith(n))) ? 6 : 0;
  return words.some(word => word.startsWith(alternative)) ? 6 : alternative.length >= 5 && words.some(word => Math.abs(word.length - alternative.length) <= 1 && editDistance(word, alternative) <= 1) ? 4 : 0;
}
function evidenceFor(product, anchor) { return (EVIDENCE[product.id] || []).filter(item => !anchor || item.anchor === anchor); }
function evidenceButton(product, anchor) {
  const count = evidenceFor(product, anchor).length;
  const label = `${count} Quellenbeleg${count === 1 ? '' : 'e'} anzeigen`;
  return count ? `<button class="evidence-btn" type="button" data-product="${product.id}" data-anchor="${esc(anchor)}" aria-label="${label}" title="${label}"><span>${count}</span></button>` : '<span class="unverified-badge" title="Keine genaue Aussagefundstelle hinterlegt">UNBELEGT</span>';
}
function matrixText(product) {
  const matrix = COVERAGE[product.id];
  return matrix ? matrix.rows.map(row => `${row.group} ${row.feature} ${Object.values(row.values).map(item => item.detail).join(' ')} ${row.source?.document || ''} ${row.source?.text || ''}`).join(' ') : '';
}
function searchable(product) {
  const evidence = (EVIDENCE[product.id] || []).map(item => `${item.label} ${item.kind} ${item.source} ${item.code} ${item.location} ${item.text}`).join(' ');
  return norm([product.name, product.category, product.subcategory, product.summary, product.aliases?.join(' '), product.highlights?.join(' '), product.eligibility?.join(' '), product.addons?.join(' '), product.tariffs?.map(t => `${t.name} ${t.code || ''} ${t.note || ''}`).join(' '), product.docs?.map(d => d.label).join(' '), matrixText(product), ROLE_INDEX_BY_PRODUCT[product.id], CASE_INDEX_BY_PRODUCT[product.id], evidence].join(' '));
}
function parseQuery(raw) {
  const filters = {}, text = [];
  const clean = (raw || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/ß/g, 'ss').replace(/[+&/–—-]/g, ' ').replace(/[^a-z0-9äöü :]/g, ' ').replace(/\s+/g, ' ').trim();
  clean.split(' ').filter(Boolean).forEach(token => { const match = token.match(/^(tarif|doc|baustein|kategorie|kat):(.+)$/); if (match) filters[match[1]] = norm(match[2]); else text.push(norm(token)); });
  return { filters, text };
}
function score(product, raw) {
  if (!raw) return product.featured ? 80 : 20;
  const haystack = searchable(product), name = norm(product.name), nameWords = name.split(' '), subcategory = norm(product.subcategory), category = norm(product.category), query = parseQuery(raw);
  let total = 0, matched = 0;
  for (const token of query.text) {
    let best = 0;
    for (const alternative of alternatives(token)) {
      let hit = textHit(haystack, alternative);
      if (alternative.length > 3 && name.startsWith(alternative)) hit = Math.max(hit, 36);
      else if (alternative.length > 3 && name.includes(alternative)) hit = Math.max(hit, 24);
      else if (alternative.length <= 3 && nameWords.includes(alternative)) hit = Math.max(hit, 24);
      if (alternative.length > 3 && subcategory.includes(alternative)) hit = Math.max(hit, 14);
      if (alternative.length > 3 && category.includes(alternative)) hit = Math.max(hit, 12);
      best = Math.max(best, hit);
    }
    if (best) { matched += 1; total += best; }
  }
  if (query.text.length && !matched) return -1;
  if (query.text.length > 1 && matched / query.text.length < .5) return -1;
  if (query.filters.tarif && !norm(product.tariffs?.map(t => t.name).join(' ')).includes(query.filters.tarif)) return -1;
  if (query.filters.baustein && !norm(product.addons?.join(' ')).includes(query.filters.baustein)) return -1;
  if (query.filters.doc && !(product.docs?.length && (query.filters.doc === 'avb' || norm(product.docs.map(d => d.label).join(' ')).includes(query.filters.doc)))) return -1;
  if ((query.filters.kategorie || query.filters.kat) && !norm(product.category).includes(query.filters.kategorie || query.filters.kat)) return -1;
  return total + (product.featured ? 8 : 0);
}
function filtered() {
  return PRODUCTS.filter(product => state.category === 'Alle' || product.category === state.category).map(product => ({ product, score: score(product, state.query) })).filter(item => item.score >= 0).sort((a, b) => b.score - a.score || a.product.subcategory.localeCompare(b.product.subcategory) || a.product.name.localeCompare(b.product.name)).slice(0, state.limit).map(item => item.product);
}

const QUESTION_WORDS = /\?|\b(?:bin|ist|sind|gilt|geht|deckt|zahlt|leistet|versichert|mitversichert|enthalten|kann|darf|muss|welche|welcher|welches|was|wer|wann|wie|warum)\b/i;
const QUESTION_STOP = new Set(['bin','ich','ist','sind','das','damit','darin','dabei','der','die','den','dem','ein','eine','einer','es','und','oder','im','in','mit','von','fur','für','was','wer','wann','wie','welche','welcher','welches','bitte','mir','meine','mein','kunde','kundin','versichert','mitversichert','enthalten','deckt','zahlt','leistet','gilt','geht']);
function questionProducts(raw) {
  const normalized = norm(raw);
  return PRODUCTS.map(product => {
    const names = [product.name, ...(product.aliases || [])].map(norm).filter(name => name.length > 3);
    const explicit = Math.max(0, ...names.filter(name => normalized.includes(name)).map(name => name.length));
    return { product, score: score(product, raw) + explicit * 5 };
  }).filter(item => item.score >= 0).sort((a,b) => b.score-a.score).slice(0,4);
}
function questionRows(product, raw) {
  const matrix = COVERAGE[product.id]; if (!matrix) return [];
  const productWords = new Set(norm(`${product.name} ${(product.aliases||[]).join(' ')}`).split(' '));
  const terms = parseQuery(raw).text.filter(term => term.length > 2 && !QUESTION_STOP.has(term) && !productWords.has(term));
  if (!terms.length) return [];
  return matrix.rows.map(row => {
    const haystack = norm(`${row.group} ${row.feature} ${Object.values(row.values).map(value=>value.detail).join(' ')}`);
    return { row, hits: terms.filter(term => textHit(haystack, term) > 0).length };
  })
    .filter(item => item.hits).sort((a,b)=>b.hits-a.hits).slice(0,6).map(item=>item.row);
}
function answerSourceBadge(row) {
  const audit = row.audit || sourceAudit(row);
  return `<span class="answer-source quality-${audit.level}">${esc(audit.label)}</span>`;
}
function renderQuestionAnswer() {
  const panel = $('#answerPanel'), raw = state.query.trim();
  if (!raw || !QUESTION_WORDS.test(raw)) { panel.hidden = true; panel.innerHTML = ''; return; }
  panel.hidden = false;
  const unsafeRequest = /ohne quelle|lass(?:e)? .*ausschl|nur (?:die )?vorteile/i.test(raw);
  const unknownVersion = /(tarif|bedingungs)stand.*(?:nicht|unbekannt)|wei(?:ß|ss).*stand.*nicht/i.test(raw);
  const universalPremium = /premium.*(?:alles|immer)|(?:alles|immer).*(?:premium|gedeckt|versichert)/i.test(raw);
  const otherInsurer = /ander(?:en|er|em) versicherer/i.test(raw);
  const candidates = questionProducts(raw);
  if (!candidates.length) {
    const correction = universalPremium ? '<div class="answer-warning">! Die Annahme „Premium deckt alles“ ist falsch. Auch premium enthält Voraussetzungen, Limits und Ausschlüsse.</div>' : unsafeRequest ? '<div class="answer-warning">! Quellen und Ausschlüsse werden nicht ausgeblendet.</div>' : unknownVersion ? '<div class="answer-warning">! Ohne bekannten Bedingungsstand ist keine verbindliche Aussage möglich.</div>' : otherInsurer ? '<div class="answer-warning">! Leistungen anderer Versicherer lassen keinen Schluss auf den R+V-Schutz zu.</div>' : '';
    panel.innerHTML = `<div class="answer-head"><span>?</span><div><strong>Produkt und Risiko fehlen</strong><p>Bitte Produkt, Tarif und konkretes Leistungsmerkmal nennen. Ohne diese Angaben ist keine belastbare Einordnung möglich.</p></div></div>${correction}`;
    return;
  }
  const product = candidates[0].product, matrix = COVERAGE[product.id], rows = questionRows(product, raw);
  const warnings = [];
  if (unsafeRequest) warnings.push('Ausschlüsse und Quellen werden nicht ausgeblendet. Eine einseitig positive Antwort wäre fachlich unbrauchbar.');
  if (unknownVersion) warnings.push('Ohne bekannten Bedingungsstand ist keine verbindliche Aussage möglich. Edition 16 prüft ausschließlich aktuelles Neugeschäft.');
  if (universalPremium) warnings.push('Die Annahme „Premium deckt alles“ ist falsch. Auch premium enthält Definitionen, Voraussetzungen, Limits und Ausschlüsse.');
  if (otherInsurer) warnings.push('Leistungen eines anderen Versicherers beweisen keinen Einschluss bei R+V. Maßgeblich sind ausschließlich die passenden R+V-Unterlagen.');
  const variant = matrix?.variants.find(name => norm(raw).includes(norm(name)));
  if (matrix?.variants.length > 1 && !variant) warnings.push(`Tarifstufe fehlt. Bitte ${matrix.variants.join(', ')} auswählen.`);
  const rowHtml = rows.length ? rows.map(row => {
    const visible = variant ? [[variant,row.values[variant]]] : Object.entries(row.values).slice(0,3);
    return `<article class="answer-fact ${row.audit?.level==='unverified'?'unverified':''}"><div><strong>${esc(row.feature)}</strong>${answerSourceBadge(row)}</div>${visible.map(([name,value])=>`<p><b>${esc(name)}:</b> ${esc(statusLabel[value?.status]||statusLabel.unknown)}${value?.detail?` – ${esc(value.detail)}`:''}</p>`).join('')}<small>${esc(row.source?.document||'Quelle nicht hinterlegt')} · ${esc(row.source?.location||'Fundstelle fehlt')}</small></article>`;
  }).join('') : '<div class="answer-empty">Zum genannten Detail gibt es keine ausreichend passende Aussage. Nicht in den vorliegenden Quellen verifizierbar.</div>';
  const productChoices = candidates.length > 1 ? `<div class="answer-candidates"><small>Erkanntes Produkt – bei Bedarf wechseln:</small>${candidates.map(item=>`<button type="button" data-answer-product="${item.product.id}">${esc(item.product.name)}</button>`).join('')}</div>` : '';
  panel.innerHTML = `<div class="answer-head"><span>◇</span><div><small>REGELBASIERTER PRÜFMODUS</small><strong>${esc(product.name)}</strong><p>Produktinformation, keine Deckungszusage. Vertrag, Bedingungsstand, Risiko und Schadenhergang bleiben zu prüfen.</p></div></div>${warnings.map(text=>`<div class="answer-warning">! ${esc(text)}</div>`).join('')}${productChoices}<div class="answer-facts">${rowHtml}</div><button type="button" class="answer-open" data-answer-product="${product.id}">Produktansicht mit Quellen öffnen ›</button>`;
  $$('[data-answer-product]').forEach(button => { button.onclick = () => openDetail(button.dataset.answerProduct); });
}
function chip(label, count) { return `<button class="chip ${state.category === label ? 'active' : ''}" data-cat="${label}">${label}<span> · ${count}</span></button>`; }
function renderFilters() {
  const categories = ['Alle', 'Komposit', 'Leben', 'Kranken'];
  $('#categoryFilters').innerHTML = categories.map(category => chip(category, category === 'Alle' ? PRODUCTS.length : PRODUCTS.filter(product => product.category === category).length)).join('');
  $$('.chip').forEach(button => { button.onclick = () => setCategory(button.dataset.cat); });
}
function card(product) {
  const evidenceCount = (EVIDENCE[product.id] || []).length, matrix = COVERAGE[product.id], rows = matrix?.rows.length || 0;
  const tags = [...(product.tariffs || []).map(t => t.name), ...(product.addons?.length ? ['Bausteine'] : []), ...(product.docs?.length ? ['AVB'] : [])].slice(0, 5);
  return `<button class="card" data-id="${product.id}" style="--accent:${product.category === 'Leben' ? '#2386bd' : product.category === 'Kranken' ? '#008c68' : '#0074b8'}"><div class="card-top"><div><span class="mini-label">${product.category} · ${product.subcategory}</span><h3>${product.name}</h3><p>${product.summary}</p></div><span class="arrow">›</span></div><div class="tags">${tags.map(tag => `<span class="tag ${/premium/i.test(tag) ? 'premium' : /AVB/.test(tag) ? 'doc' : ''}">${tag}</span>`).join('')}<span class="tag matrix-tag">▦ ${rows} Leistungsangaben</span>${evidenceCount ? `<span class="tag evidence-tag"><b>${evidenceCount}</b> Quellen</span>` : ''}</div></button>`;
}
function render() {
  const items = filtered();
  $('#resultTitle').textContent = state.query ? `Treffer für „${state.query}”` : state.category === 'Alle' ? 'Empfohlene Einstiege' : state.category;
  $('#resultCount').textContent = `${items.length}${items.length === state.limit ? '+' : ''} TREFFER`;
  $('#results').innerHTML = items.length ? items.map(card).join('') : '<div class="empty"><strong>Noch kein Treffer.</strong>Versuche einen Oberbegriff, ein Kürzel wie BU/PKV/PHV oder tippe nur den Anfang.</div>';
  $('#caseNavigatorBtn').classList.toggle('query-match', /fremd|rolle|eigentümer|eigentumer|beitragszahler|versicherungsnehmer|versicherte person|halter|bezugsberechtigt|schließfach|schliessfach|wertsache|ema|wald|grundstück|grundstuck|wallbox|photovoltaik|abschlussalter|wer versichert/i.test(state.query));
  renderQuestionAnswer();
  $$('.card').forEach(item => { item.onclick = () => openDetail(item.dataset.id); });
}
function setCategory(category) {
  state.category = category; state.limit = 18; renderFilters();
  $$('.dock-btn').forEach(button => button.classList.toggle('active', button.dataset.cat === category || (category === 'Alle' && button.dataset.cat === 'Alle')));
  render(); if (category !== 'Alle') window.scrollTo({ top: 260, behavior: 'smooth' });
}

const statusLabel = { yes: 'Enthalten', no: 'Nicht enthalten', limited: 'Begrenzt', optional: 'Optional', check: 'Prüfen', info: 'Info', unknown: 'Nicht ausgewiesen' };
function matrixSourceButton(row) { return `<button class="evidence-btn matrix-source" type="button" data-matrix-source="${row.id}" aria-label="1 Quellenbeleg anzeigen" title="1 Quellenbeleg anzeigen"><span>1</span></button>`; }
function matrixCell(item) {
  const safe = item || { status: 'unknown', detail: '' }, label = statusLabel[safe.status] || statusLabel.unknown;
  return `<div class="matrix-cell status-${safe.status}"><span class="status-pill">${label}</span>${safe.detail && safe.detail !== label ? `<small>${esc(safe.detail)}</small>` : ''}</div>`;
}
function matrixRow(row, variants) {
  const visible = state.matrixVariant === 'Alle' ? variants : variants.filter(variant => variant === state.matrixVariant);
  return `<article class="matrix-row"><div class="matrix-feature"><strong>${esc(row.feature)}</strong>${row.optionalGroup ? '<span class="component-badge">ZUSATZBAUSTEIN</span>' : ''}${matrixSourceButton(row)}</div><div class="matrix-values" style="--variant-count:${visible.length}">${visible.map(variant => `<div><b>${esc(variant)}</b>${matrixCell(row.values[variant])}</div>`).join('')}</div></article>`;
}
function renderMatrix(product) {
  const matrix = COVERAGE[product.id]; if (!matrix) return '';
  const query = norm(state.matrixQuery);
  const visibleRows = matrix.rows.filter(row => !query || norm(`${row.group} ${row.feature} ${Object.values(row.values).map(item => item.detail).join(' ')}`).includes(query));
  const groups = [...new Set(visibleRows.map(row => row.group))];
  return `<section class="matrix-section"><div class="matrix-title"><div><h3 class="section-title">Leistungsmatrix</h3><p>${esc(matrix.level)} · ${visibleRows.length} von ${matrix.rows.length} Angaben</p></div><span class="matrix-count">▦ ${matrix.rows.length}</span></div><div class="matrix-toolbar"><label><span>⌕</span><input id="matrixSearch" type="search" value="${esc(state.matrixQuery)}" placeholder="Leistung suchen, z. B. Gewässerschaden …"></label><div class="variant-filter">${['Alle', ...matrix.variants].map(variant => `<button type="button" class="${state.matrixVariant === variant ? 'active' : ''}" data-variant="${esc(variant)}">${esc(variant)}</button>`).join('')}</div></div><div class="legend"><span class="status-yes">● enthalten</span><span class="status-limited">● begrenzt</span><span class="status-optional">● optional</span><span class="status-no">● nein</span><span class="status-check">● prüfen</span></div>${groups.length ? groups.map((group, index) => `<details class="matrix-group" ${query || index < 2 ? 'open' : ''}><summary><span>${esc(group)}</span><b>${visibleRows.filter(row => row.group === group).length}</b></summary><div>${visibleRows.filter(row => row.group === group).map(row => matrixRow(row, matrix.variants)).join('')}</div></details>`).join('') : '<div class="matrix-empty">Keine Leistungsangabe passt zu diesem Begriff.</div>'}</section>`;
}
function openDetail(id) {
  const product = PRODUCTS.find(item => item.id === id); if (!product) return;
  state.detailProduct = id; state.matrixQuery = ''; state.matrixVariant = 'Alle';
  renderDetail(product); $('#detailDialog').showModal();
}
function renderDetail(product) {
  const evidenceCount = (EVIDENCE[product.id] || []).length;
  const eligibility = product.eligibility?.length ? `<h3 class="section-title">Abschluss & Grenzen</h3><div class="fact-grid eligibility-grid">${product.eligibility.map((text, index) => `<div class="fact evidence-row"><span>${text}</span>${evidenceButton(product, `eligibility:${index}`)}</div>`).join('')}</div>` : '';
  const facts = product.highlights?.length ? `<h3 class="section-title">Berater-Schnellcheck</h3><div class="fact-grid">${product.highlights.map((text, index) => `<div class="fact evidence-row"><span>${text}</span>${evidenceButton(product, `highlight:${index}`)}</div>`).join('')}</div>` : '';
  const tariffs = product.tariffs?.length ? `<h3 class="section-title">Tarife / Varianten</h3><div class="tariff-grid">${product.tariffs.map(tariff => `<div class="tariff"><div class="evidence-row"><strong>${tariff.name}<span>${tariff.code || ''}</span></strong>${evidenceButton(product, `tariff:${norm(tariff.name)}`)}</div><p>${tariff.note || 'Siehe vereinbarte Bedingungen.'}</p></div>`).join('')}</div>` : '';
  const addons = product.addons?.length ? `<h3 class="section-title">Zusatzbausteine / Optionen</h3><div class="addon-list">${product.addons.map(addon => `<span class="addon"><span>${addon}</span>${evidenceButton(product, `addon:${norm(addon)}`)}</span>`).join('')}</div>` : '';
  const docs = product.docs?.length ? `<h3 class="section-title">Bedingungswerke</h3>${product.docs.map(doc => `<a class="source-button secondary" href="${doc.url}" target="_blank" rel="noopener"><span>${doc.label}</span><b>↗</b></a>`).join('')}` : '';
  const relatedProducts = (product.related || []).map(id => PRODUCTS.find(item => item.id === id)).filter(Boolean);
  const related = relatedProducts.length ? `<section class="related-section"><div class="related-title"><span>↳</span><div><h3>Einzelprodukte dieser Übersicht</h3><p>${relatedProducts.length} getrennte Produktansichten</p></div></div><div class="related-products">${relatedProducts.map(item => `<button type="button" data-related-product="${item.id}"><span><small>${esc(item.subcategory)}</small><strong>${esc(item.name)}</strong></span><b>›</b></button>`).join('')}</div></section>` : '';
  const roleCase = Object.entries(ROLE_PRODUCT_MAP).find(([, ids]) => ids.includes(product.id))?.[0];
  const roleInline = roleCase ? `<button type="button" class="role-inline" data-role-case="${roleCase}"><span>◎</span><span><strong>Vertragsrollen prüfen</strong><small>Versicherungsnehmer · ${ROLE_CASES[roleCase].interestLabel} · Beitragszahler</small></span><b>›</b></button>` : '';
  const caseTopic = Object.entries(CASE_TOPICS).find(([, item]) => item.products?.includes(product.id))?.[0];
  const caseInline = caseTopic ? `<button type="button" class="role-inline case-inline" data-case-topic-inline="${caseTopic}"><span>◇</span><span><strong>Konkreten Fall prüfen</strong><small>${CASE_TOPICS[caseTopic].label} · Ergebnis mit Rückfragen und Quellen</small></span><b>›</b></button>` : '';
  $('#detailContent').innerHTML = `<div class="detail-hero"><p class="eyebrow">${product.category} · ${product.subcategory}</p><h2>${product.name}</h2><p>${product.summary}</p>${evidenceCount ? `<div class="evidence-summary"><span>${evidenceCount}</span><strong>Quellenbelege</strong><small>direkt offline lesbar</small></div>` : ''}</div>${related}${caseInline}${roleInline}${eligibility}${facts}${tariffs}${addons}${renderMatrix(product)}${docs}<h3 class="section-title">R+V Quelle</h3><a class="source-button" href="${product.url}" target="_blank" rel="noopener"><span>Aktuelle Produktseite öffnen</span><b>↗</b></a><div class="notice">Schnellübersicht, Stand 10.08.2026. „Prüfen“ bedeutet: öffentlich nicht eindeutig dieser Tarifstufe zugeordnet. Maßgeblich sind konkreter Vertrag, Nachträge und vereinbarte Bedingungen.</div>`;
  $$('[data-related-product]').forEach(button => { button.onclick = () => { $('#detailDialog').close(); openDetail(button.dataset.relatedProduct); }; });
  $('[data-case-topic-inline]')?.addEventListener('click', event => { $('#detailDialog').close(); openCaseNavigator(event.currentTarget.dataset.caseTopicInline, product.id); });
  $('[data-role-case]')?.addEventListener('click', event => { roleState.product = event.currentTarget.dataset.roleCase; $('#detailDialog').close(); openRoleChecker(); });
  bindDetail(product);
}
function bindDetail(product) {
  $('#matrixSearch')?.addEventListener('input', event => { const start = event.target.selectionStart; state.matrixQuery = event.target.value; refreshMatrix(product); const input = $('#matrixSearch'); input.focus(); if (input.setSelectionRange && start != null) input.setSelectionRange(start, start); });
  $$('.variant-filter button').forEach(button => { button.onclick = () => { state.matrixVariant = button.dataset.variant; refreshMatrix(product); }; });
}
function refreshMatrix(product) {
  const section = $('.matrix-section');
  if (!section) return;
  section.outerHTML = renderMatrix(product);
  bindDetail(product);
}
function openMatrixSource(product, rowId) {
  const row = COVERAGE[product.id]?.rows.find(item => item.id === rowId); if (!row?.source) return;
  const source = row.source;
  $('#evidenceTitle').textContent = row.feature;
  const audit = row.audit || sourceAudit(row), doc = product.docs?.[0];
  $('#evidenceContent').innerHTML = `<article class="evidence-card"><div class="evidence-card-head"><span class="evidence-kind avb">${esc(source.kind)}</span><span class="source-quality quality-${audit.level}">${esc(audit.label)}</span></div><h3>${esc(source.document)}</h3><div class="evidence-meta"><strong>${esc(source.version)}</strong><span>${esc(source.location)}</span></div><p class="source-audit-note">${esc(audit.note)}</p><p class="evidence-text">${esc(source.text)}</p><div class="matrix-source-values">${Object.entries(row.values).map(([variant, item]) => `<div><strong>${esc(variant)}</strong>${matrixCell(item)}</div>`).join('')}</div>${doc?`<a class="source-button secondary" href="${doc.url}" target="_blank" rel="noopener">Originaldokument öffnen ↗</a>`:''}</article>`;
  $('#evidenceDialog').showModal();
}
function openEvidence(productId, anchor) {
  const product = PRODUCTS.find(item => item.id === productId), list = product ? evidenceFor(product, anchor) : [];
  if (!product || !list.length) return;
  $('#evidenceTitle').textContent = list.length === 1 ? list[0].label : `${product.name} · Quellen`;
  $('#evidenceContent').innerHTML = list.map(item => `<article class="evidence-card"><div class="evidence-card-head"><span class="evidence-kind ${item.kind.startsWith('Bedingungswerk') ? 'avb' : 'web'}">${item.kind}</span><span class="evidence-check">GEPRÜFT ${EVIDENCE_META.checked}</span></div><h3>${item.source}</h3><div class="evidence-meta"><strong>${item.code}</strong><span>${item.location}</span></div>${item.quote ? `<blockquote>„${item.quote}“</blockquote>` : ''}<p class="evidence-text">${item.text}</p></article>`).join('');
  $('#evidenceDialog').showModal();
}
function caseField(field, selection) {
  if (field.type === 'number') return `<label class="case-number"><span>${esc(field.label)}</span><input type="number" inputmode="numeric" data-case-number="${field.id}" min="${field.min}" max="${field.max}" step="${field.step}" value="${esc(selection[field.id])}"></label>`;
  return `<section class="case-field"><h3>${esc(field.label)}</h3><div class="case-choices">${field.options.map(([value, label]) => `<button type="button" class="case-choice ${selection[field.id]===value?'active':''}" data-case-field="${field.id}" data-case-value="${value}">${esc(label)}</button>`).join('')}</div></section>`;
}
function caseFieldVisible(field, selection) { return !field.when || field.when.values.includes(selection[field.when.field]); }
function caseAnswerHtml(answer) {
  const products = answer.products.map(id => PRODUCTS.find(product => product.id === id)).filter(Boolean);
  const sources = answer.sources.map(key => CASE_SOURCES[key]).filter(Boolean);
  const factHtml = answer.facts.map(item => {
    const fact = typeof item === 'string' ? { text: item, tone: 'info' } : item;
    const tone = ['yes','info','warning','stop'].includes(fact.tone) ? fact.tone : 'info';
    const icon = { yes:'✓', info:'i', warning:'!', stop:'×' }[tone];
    return `<div class="fact-${tone}"><span>${icon}</span><p>${esc(fact.text)}</p></div>`;
  }).join('');
  return `<section class="case-answer tone-${answer.tone}"><div class="case-verdict"><span>${esc(answer.verdict)}</span><small>${answer.tone==='yes'?'ABLEITBAR':answer.tone==='conditional'?'BEDINGT':answer.tone==='stop'?'STOPP':'KLÄREN'}</small></div><h2>${esc(answer.title)}</h2><p>${esc(answer.text)}</p>${answer.facts.length?`<div class="case-facts">${factHtml}</div>`:''}${answer.questions.length?`<h3>Offene Fragen</h3><ul class="case-questions">${answer.questions.map(question=>`<li>${esc(question)}</li>`).join('')}</ul>`:''}${answer.actions.length?`<h3>Nächste Schritte</h3><ol class="case-actions">${answer.actions.map(action=>`<li>${esc(action)}</li>`).join('')}</ol>`:''}${products.length?`<h3>Passende Produktwege</h3><div class="case-products">${products.map(product=>`<button type="button" data-case-product="${product.id}"><span>${esc(product.name)}</span><b>›</b></button>`).join('')}</div>`:''}${sources.length?`<h3>Quellenbasis</h3><div class="case-sources">${sources.map((source,index)=>`<details><summary><span><i>${index+1}</i>${esc(source.document)}</span><b>›</b></summary><div><strong>${esc(source.location)}</strong><p>${esc(source.text)}</p></div></details>`).join('')}</div>`:''}</section>`;
}
function renderCaseResult() {
  const target=$('#caseResult'); if(!target)return;
  target.innerHTML=caseAnswerHtml(caseAnswer(caseState.topic,caseState.selections[caseState.topic]||{}));
  $$('[data-case-product]').forEach(button=>{button.onclick=()=>{$('#caseDialog').close();openDetail(button.dataset.caseProduct);};});
}
function renderCaseNavigator() {
  const topic=CASE_TOPICS[caseState.topic], selection=caseState.selections[caseState.topic]||{};
  const product=PRODUCTS.find(item=>item.id===caseState.productId);
  const topics=product?'':`<div class="case-topics">${Object.entries(CASE_TOPICS).map(([id,item])=>`<button type="button" class="case-topic ${id===caseState.topic?'active':''}" data-case-topic="${id}"><span>${item.icon}</span><strong>${esc(item.label)}</strong><small>${esc(item.subtitle)}</small></button>`).join('')}</div>`;
  const head=product
    ? `<div class="case-head product-context"><p class="eyebrow">KONKRETER FALL</p><h2>${esc(product.name)}</h2><p>Angaben auswählen – Einordnung, Rückfragen und Quellen erscheinen sofort.</p></div>`
    : `<div class="case-head"><p class="eyebrow">INTELLIGENTER FALL-NAVIGATOR</p><h2>Konstellation statt Stichwort</h2><p>Thema auswählen, Angaben anklicken – Antwort, Rückfragen und Quellen erscheinen sofort.</p></div>`;
  const delegate=topic.delegate==='roles'?`<section class="case-delegate"><span>◎</span><div><strong>Vertragsrollen im Detail prüfen</strong><p>Eigentümer, Halter, versicherte Person, Beitragszahler und Bezugsrecht auswählen.</p></div><button type="button" id="caseOpenRoles">Öffnen ›</button></section>`:'';
  $('#caseContent').innerHTML=`${head}${topics}<div class="case-work"><div class="case-work-title"><span>${topic.icon}</span><div><strong>${esc(topic.label)}</strong><small>${esc(topic.subtitle)}</small></div></div>${topic.fields.filter(field=>caseFieldVisible(field,selection)).map(field=>caseField(field,selection)).join('')}${delegate}<div id="caseResult"></div></div><div class="notice">Der Navigator kombiniert öffentlich belegte Regeln. „Klären“ bedeutet bewusst: Ohne Annahmerichtlinie, konkrete Vertragsdaten oder schriftliche R+V-Bestätigung ist keine belastbare Zusage möglich.</div>`;
  $$('[data-case-topic]').forEach(button=>{button.onclick=()=>{caseState.topic=button.dataset.caseTopic;renderCaseNavigator();};});
  $$('[data-case-field]').forEach(button=>{button.onclick=()=>{caseState.selections[caseState.topic][button.dataset.caseField]=button.dataset.caseValue;renderCaseNavigator();};});
  $$('[data-case-number]').forEach(input=>{input.oninput=()=>{caseState.selections[caseState.topic][input.dataset.caseNumber]=Number(input.value)||0;renderCaseResult();};});
  $('#caseOpenRoles')?.addEventListener('click',()=>{$('#caseDialog').close();openRoleChecker();});
  renderCaseResult();
}
function openCaseNavigator(topic, productId=null) { if(topic&&CASE_TOPICS[topic])caseState.topic=topic;caseState.productId=productId&&PRODUCTS.some(item=>item.id===productId)?productId:null;renderCaseNavigator();$('#caseDialog').showModal(); }
function roleChoice(field, value, label, active) {
  return `<button type="button" class="role-choice ${active ? 'active' : ''}" data-role-field="${field}" data-role-value="${value}">${label}</button>`;
}
function renderRoleChecker() {
  const answer = roleAnswer(roleState), config = answer.config;
  const productButtons = Object.entries(ROLE_CASES).map(([id, item]) => `<button type="button" class="role-product ${roleState.product === id ? 'active' : ''}" data-role-field="product" data-role-value="${id}"><span>${item.icon}</span><b>${item.label}</b></button>`).join('');
  const beneficiaryStep = ['life', 'accident'].includes(roleState.product) ? `<section class="role-step"><span class="role-step-no">5</span><h3>Wer soll die Leistung erhalten?</h3><div class="role-choices three">${roleChoice('beneficiary', 'insured', 'Versicherte Person', roleState.beneficiary === 'insured')}${roleChoice('beneficiary', 'holder', 'Versicherungsnehmer', roleState.beneficiary === 'holder')}${roleChoice('beneficiary', 'other', 'Andere Person', roleState.beneficiary === 'other')}</div></section>` : '';
  $('#roleContent').innerHTML = `<div class="role-head"><p class="eyebrow">INTERAKTIVER BERATUNGSCHECK</p><h2>Wer versichert wen?</h2><p>Konstellation anklicken – die fachliche Einordnung erscheint sofort.</p></div><section class="role-step"><span class="role-step-no">1</span><h3>Produkt auswählen</h3><div class="role-products">${productButtons}</div></section><section class="role-step"><span class="role-step-no">2</span><h3>Ist der ${config.interestLabel} zugleich Versicherungsnehmer?</h3><div class="role-choices">${roleChoice('interest', 'same', 'Ja, gleiche Person', roleState.interest === 'same')}${roleChoice('interest', 'other', 'Nein, andere Person', roleState.interest === 'other')}</div></section><section class="role-step"><span class="role-step-no">3</span><h3>Wer bezahlt den Beitrag?</h3><div class="role-choices">${roleChoice('payer', 'self', 'Versicherungsnehmer', roleState.payer === 'self')}${roleChoice('payer', 'other', 'Andere Person', roleState.payer === 'other')}</div></section><section class="role-step"><span class="role-step-no">4</span><h3>Verhältnis und Zustimmung</h3><div class="role-subgrid"><div><small>Beziehung</small><div class="role-choices">${roleChoice('relation', 'family', 'Familie / Haushalt', roleState.relation === 'family')}${roleChoice('relation', 'unrelated', 'Dritte Person', roleState.relation === 'unrelated')}</div></div><div><small>Auftrag / Einwilligung</small><div class="role-choices">${roleChoice('consent', 'yes', 'Vorhanden', roleState.consent === 'yes')}${roleChoice('consent', 'no', 'Noch offen', roleState.consent === 'no')}</div></div></div></section>${beneficiaryStep}<section class="role-answer tone-${answer.tone}"><div class="role-verdict"><span>${answer.verdict}</span><small>${config.label}</small></div><h3>${answer.title}</h3><p>${answer.text}</p>${answer.notes.length ? `<div class="role-notes">${answer.notes.map(note => `<p>${note}</p>`).join('')}</div>` : ''}<h4>So sauber gestalten</h4><ol>${config.steps.map(step => `<li>${step}</li>`).join('')}</ol><details class="role-source"><summary><span><i class="role-source-orb">1</i> Quellenstelle anzeigen</span><b>›</b></summary><div><strong>${config.source.document}</strong><small>${config.source.location}</small><p>${config.source.text}</p></div></details></section><div class="notice">Der Checker bewertet die Rollenlogik. Annahmerichtlinien, Tarifberechtigung, Steuerfolgen und der konkrete Versicherungsschein bleiben zusätzlich zu prüfen.</div>`;
  $$('[data-role-field]').forEach(button => { button.onclick = () => { roleState[button.dataset.roleField] = button.dataset.roleValue; renderRoleChecker(); }; });
}
function openRoleChecker() { renderRoleChecker(); $('#roleDialog').showModal(); }
function init() {
  renderFilters();
  $('#searchInput').addEventListener('input', event => { state.query = event.target.value; state.limit = 30; $('#clearBtn').style.display = state.query ? 'block' : 'none'; render(); });
  $('#clearBtn').onclick = () => { $('#searchInput').value = ''; state.query = ''; $('#clearBtn').style.display = 'none'; render(); $('#searchInput').focus(); };
  $$('.search-hints button').forEach(button => { button.onclick = () => { $('#searchInput').value = button.dataset.query; state.query = button.dataset.query; render(); }; });
  $$('.dock-btn').forEach(button => { button.onclick = () => button.dataset.cat === 'Alle' ? ($('#searchInput').focus(), setCategory('Alle')) : setCategory(button.dataset.cat); });
  $('#homeBtn').onclick = () => { state.query = ''; $('#searchInput').value = ''; setCategory('Alle'); scrollTo({ top: 0, behavior: 'smooth' }); };
  $('#detailClose').onclick = () => $('#detailDialog').close();
  $('#detailDialog').onclick = event => {
    const evidence = event.target.closest('.evidence-btn[data-product]'); if (evidence) { event.preventDefault(); event.stopPropagation(); openEvidence(evidence.dataset.product, evidence.dataset.anchor); return; }
    const matrix = event.target.closest('[data-matrix-source]'); if (matrix) { event.preventDefault(); openMatrixSource(PRODUCTS.find(item => item.id === state.detailProduct), matrix.dataset.matrixSource); return; }
    if (event.target === $('#detailDialog')) $('#detailDialog').close();
  };
  $('#evidenceClose').onclick = () => $('#evidenceDialog').close(); $('#evidenceDialog').onclick = event => { if (event.target === $('#evidenceDialog')) $('#evidenceDialog').close(); };
  $('#infoBtn').onclick = () => $('#infoDialog').showModal(); $('#infoClose').onclick = () => $('#infoDialog').close();
  $('#caseNavigatorBtn').onclick = () => openCaseNavigator(); $('#caseClose').onclick = () => $('#caseDialog').close(); $('#caseDialog').onclick = event => { if (event.target === $('#caseDialog')) $('#caseDialog').close(); };
  $('#roleClose').onclick = () => $('#roleDialog').close(); $('#roleDialog').onclick = event => { if (event.target === $('#roleDialog')) $('#roleDialog').close(); };
  if ('serviceWorker' in navigator) navigator.serviceWorker.register('./sw.js', { updateViaCache: 'none' }).then(registration => registration.update()).catch(() => {}); render();
}
init();
