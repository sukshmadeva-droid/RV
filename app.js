/* RuVKompendium 9 – offline-first, dependency-free, GitHub Pages friendly */
const $ = selector => document.querySelector(selector);
const $$ = selector => [...document.querySelectorAll(selector)];
const state = { category: 'Alle', query: '', limit: 18, detailProduct: null, matrixQuery: '', matrixVariant: 'Alle' };
const roleState = { product: 'building', interest: 'other', payer: 'self', consent: 'yes', relation: 'family', beneficiary: 'insured' };
const norm = value => (value || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/ß/g, 'ss').replace(/[+&/–—-]/g, ' ').replace(/[^a-z0-9äöü ]/g, ' ').replace(/\s+/g, ' ').trim();
const esc = value => String(value ?? '').replace(/[&<>"]/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[char]));
const synonyms = {
  phv: ['privathaftpflicht'], haftpflicht: ['privathaftpflicht'], bu: ['berufsunfahigkeit'], sbu: ['berufsunfahigkeit'], du: ['dienstunfahigkeit'], gf: ['grundfahigkeit'],
  kfz: ['auto', 'autoversicherung', 'kfzpolice', 'fahrzeug'], pkw: ['auto', 'kfz'], pkv: ['private krankenversicherung', 'vollversicherung'], kv: ['krankenversicherung'],
  zahn: ['zahnersatz', 'zahnzusatz'], wg: ['wohngebaeude', 'gebaeude'], hr: ['hausrat'], rs: ['rechtsschutz'], avb: ['bedingungen', 'bedingungswerk', 'verbraucherinformation'],
  elementar: ['naturgefahren', 'hochwasser', 'starkregen', 'ueberschwemmung'], fahrrad: ['bike', 'pedelec', 'fahrraddiebstahl'], schluessel: ['schluesselverlust', 'privathaftpflicht'], solar: ['photovoltaik', 'pv']
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
  return count ? `<button class="evidence-btn" type="button" data-product="${product.id}" data-anchor="${esc(anchor)}" aria-label="Quellenbeleg anzeigen" title="Quellenbeleg anzeigen"><span>⌑</span><b>${count > 1 ? count : ''}</b></button>` : '';
}
function matrixText(product) {
  const matrix = COVERAGE[product.id];
  return matrix ? matrix.rows.map(row => `${row.group} ${row.feature} ${Object.values(row.values).map(item => item.detail).join(' ')} ${row.source?.document || ''} ${row.source?.text || ''}`).join(' ') : '';
}
function searchable(product) {
  const evidence = (EVIDENCE[product.id] || []).map(item => `${item.label} ${item.kind} ${item.source} ${item.code} ${item.location} ${item.text}`).join(' ');
  return norm([product.name, product.category, product.subcategory, product.summary, product.aliases?.join(' '), product.highlights?.join(' '), product.eligibility?.join(' '), product.addons?.join(' '), product.tariffs?.map(t => `${t.name} ${t.code || ''} ${t.note || ''}`).join(' '), product.docs?.map(d => d.label).join(' '), matrixText(product), ROLE_INDEX_BY_PRODUCT[product.id], evidence].join(' '));
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
function chip(label, count) { return `<button class="chip ${state.category === label ? 'active' : ''}" data-cat="${label}">${label}<span> · ${count}</span></button>`; }
function renderFilters() {
  const categories = ['Alle', 'Komposit', 'Leben', 'Kranken'];
  $('#categoryFilters').innerHTML = categories.map(category => chip(category, category === 'Alle' ? PRODUCTS.length : PRODUCTS.filter(product => product.category === category).length)).join('');
  $$('.chip').forEach(button => { button.onclick = () => setCategory(button.dataset.cat); });
}
function card(product) {
  const evidenceCount = (EVIDENCE[product.id] || []).length, matrix = COVERAGE[product.id], rows = matrix?.rows.length || 0;
  const tags = [...(product.tariffs || []).map(t => t.name), ...(product.addons?.length ? ['Bausteine'] : []), ...(product.docs?.length ? ['AVB'] : [])].slice(0, 5);
  return `<button class="card" data-id="${product.id}" style="--accent:${product.category === 'Leben' ? '#2386bd' : product.category === 'Kranken' ? '#008c68' : '#0074b8'}"><div class="card-top"><div><span class="mini-label">${product.category} · ${product.subcategory}</span><h3>${product.name}</h3><p>${product.summary}</p></div><span class="arrow">›</span></div><div class="tags">${tags.map(tag => `<span class="tag ${/premium/i.test(tag) ? 'premium' : /AVB/.test(tag) ? 'doc' : ''}">${tag}</span>`).join('')}<span class="tag matrix-tag">▦ ${rows} Leistungsangaben</span>${evidenceCount ? `<span class="tag evidence-tag">⌑ ${evidenceCount} Quellenbelege</span>` : ''}</div></button>`;
}
function render() {
  const items = filtered();
  $('#resultTitle').textContent = state.query ? `Treffer für „${state.query}”` : state.category === 'Alle' ? 'Empfohlene Einstiege' : state.category;
  $('#resultCount').textContent = `${items.length}${items.length === state.limit ? '+' : ''} TREFFER`;
  $('#results').innerHTML = items.length ? items.map(card).join('') : '<div class="empty"><strong>Noch kein Treffer.</strong>Versuche einen Oberbegriff, ein Kürzel wie BU/PKV/PHV oder tippe nur den Anfang.</div>';
  $('#roleCheckerBtn').classList.toggle('query-match', /fremd|rolle|eigentümer|eigentumer|beitragszahler|versicherungsnehmer|versicherte person|halter|bezugsberechtigt/i.test(state.query));
  $$('.card').forEach(item => { item.onclick = () => openDetail(item.dataset.id); });
}
function setCategory(category) {
  state.category = category; state.limit = 18; renderFilters();
  $$('.dock-btn').forEach(button => button.classList.toggle('active', button.dataset.cat === category || (category === 'Alle' && button.dataset.cat === 'Alle')));
  render(); if (category !== 'Alle') window.scrollTo({ top: 260, behavior: 'smooth' });
}

const statusLabel = { yes: 'Enthalten', no: 'Nicht enthalten', limited: 'Begrenzt', optional: 'Optional', check: 'Prüfen', info: 'Info', unknown: 'Nicht ausgewiesen' };
function matrixSourceButton(row) { return `<button class="evidence-btn matrix-source" type="button" data-matrix-source="${row.id}" aria-label="Textbeleg anzeigen" title="Textbeleg anzeigen"><span>⌑</span></button>`; }
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
  const roleCase = Object.entries(ROLE_PRODUCT_MAP).find(([, ids]) => ids.includes(product.id))?.[0];
  const roleInline = roleCase ? `<button type="button" class="role-inline" data-role-case="${roleCase}"><span>◎</span><span><strong>Vertragsrollen prüfen</strong><small>Versicherungsnehmer · ${ROLE_CASES[roleCase].interestLabel} · Beitragszahler</small></span><b>›</b></button>` : '';
  $('#detailContent').innerHTML = `<div class="detail-hero"><p class="eyebrow">${product.category} · ${product.subcategory}</p><h2>${product.name}</h2><p>${product.summary}</p>${evidenceCount ? `<div class="evidence-summary"><span>⌑</span><strong>${evidenceCount} Quellenbelege</strong><small>direkt offline lesbar</small></div>` : ''}</div>${roleInline}${eligibility}${facts}${tariffs}${addons}${renderMatrix(product)}${docs}<h3 class="section-title">R+V Quelle</h3><a class="source-button" href="${product.url}" target="_blank" rel="noopener"><span>Aktuelle Produktseite öffnen</span><b>↗</b></a><div class="notice">Schnellübersicht, Stand 10.08.2026. „Prüfen“ bedeutet: öffentlich nicht eindeutig dieser Tarifstufe zugeordnet. Maßgeblich sind konkreter Vertrag, Nachträge und vereinbarte Bedingungen.</div>`;
  $('.role-inline')?.addEventListener('click', event => { roleState.product = event.currentTarget.dataset.roleCase; $('#detailDialog').close(); openRoleChecker(); });
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
  $('#evidenceContent').innerHTML = `<article class="evidence-card"><div class="evidence-card-head"><span class="evidence-kind avb">${esc(source.kind)}</span><span class="evidence-check">GEPRÜFT ${COVERAGE_META.checked}</span></div><h3>${esc(source.document)}</h3><div class="evidence-meta"><strong>${esc(source.version)}</strong><span>${esc(source.location)}</span></div><p class="evidence-text">${esc(source.text)}</p><div class="matrix-source-values">${Object.entries(row.values).map(([variant, item]) => `<div><strong>${esc(variant)}</strong>${matrixCell(item)}</div>`).join('')}</div></article>`;
  $('#evidenceDialog').showModal();
}
function openEvidence(productId, anchor) {
  const product = PRODUCTS.find(item => item.id === productId), list = product ? evidenceFor(product, anchor) : [];
  if (!product || !list.length) return;
  $('#evidenceTitle').textContent = list.length === 1 ? list[0].label : `${product.name} · Quellen`;
  $('#evidenceContent').innerHTML = list.map(item => `<article class="evidence-card"><div class="evidence-card-head"><span class="evidence-kind ${item.kind.startsWith('Bedingungswerk') ? 'avb' : 'web'}">${item.kind}</span><span class="evidence-check">GEPRÜFT ${EVIDENCE_META.checked}</span></div><h3>${item.source}</h3><div class="evidence-meta"><strong>${item.code}</strong><span>${item.location}</span></div>${item.quote ? `<blockquote>„${item.quote}“</blockquote>` : ''}<p class="evidence-text">${item.text}</p></article>`).join('');
  $('#evidenceDialog').showModal();
}
function roleChoice(field, value, label, active) {
  return `<button type="button" class="role-choice ${active ? 'active' : ''}" data-role-field="${field}" data-role-value="${value}">${label}</button>`;
}
function renderRoleChecker() {
  const answer = roleAnswer(roleState), config = answer.config;
  const productButtons = Object.entries(ROLE_CASES).map(([id, item]) => `<button type="button" class="role-product ${roleState.product === id ? 'active' : ''}" data-role-field="product" data-role-value="${id}"><span>${item.icon}</span><b>${item.label}</b></button>`).join('');
  const beneficiaryStep = ['life', 'accident'].includes(roleState.product) ? `<section class="role-step"><span class="role-step-no">5</span><h3>Wer soll die Leistung erhalten?</h3><div class="role-choices three">${roleChoice('beneficiary', 'insured', 'Versicherte Person', roleState.beneficiary === 'insured')}${roleChoice('beneficiary', 'holder', 'Versicherungsnehmer', roleState.beneficiary === 'holder')}${roleChoice('beneficiary', 'other', 'Andere Person', roleState.beneficiary === 'other')}</div></section>` : '';
  $('#roleContent').innerHTML = `<div class="role-head"><p class="eyebrow">INTERAKTIVER BERATUNGSCHECK</p><h2>Wer versichert wen?</h2><p>Konstellation anklicken – die fachliche Einordnung erscheint sofort.</p></div><section class="role-step"><span class="role-step-no">1</span><h3>Produkt auswählen</h3><div class="role-products">${productButtons}</div></section><section class="role-step"><span class="role-step-no">2</span><h3>Ist der ${config.interestLabel} zugleich Versicherungsnehmer?</h3><div class="role-choices">${roleChoice('interest', 'same', 'Ja, gleiche Person', roleState.interest === 'same')}${roleChoice('interest', 'other', 'Nein, andere Person', roleState.interest === 'other')}</div></section><section class="role-step"><span class="role-step-no">3</span><h3>Wer bezahlt den Beitrag?</h3><div class="role-choices">${roleChoice('payer', 'self', 'Versicherungsnehmer', roleState.payer === 'self')}${roleChoice('payer', 'other', 'Andere Person', roleState.payer === 'other')}</div></section><section class="role-step"><span class="role-step-no">4</span><h3>Verhältnis und Zustimmung</h3><div class="role-subgrid"><div><small>Beziehung</small><div class="role-choices">${roleChoice('relation', 'family', 'Familie / Haushalt', roleState.relation === 'family')}${roleChoice('relation', 'unrelated', 'Dritte Person', roleState.relation === 'unrelated')}</div></div><div><small>Auftrag / Einwilligung</small><div class="role-choices">${roleChoice('consent', 'yes', 'Vorhanden', roleState.consent === 'yes')}${roleChoice('consent', 'no', 'Noch offen', roleState.consent === 'no')}</div></div></div></section>${beneficiaryStep}<section class="role-answer tone-${answer.tone}"><div class="role-verdict"><span>${answer.verdict}</span><small>${config.label}</small></div><h3>${answer.title}</h3><p>${answer.text}</p>${answer.notes.length ? `<div class="role-notes">${answer.notes.map(note => `<p>${note}</p>`).join('')}</div>` : ''}<h4>So sauber gestalten</h4><ol>${config.steps.map(step => `<li>${step}</li>`).join('')}</ol><details class="role-source"><summary><span>⌑ Quellenstelle anzeigen</span><b>›</b></summary><div><strong>${config.source.document}</strong><small>${config.source.location}</small><p>${config.source.text}</p></div></details></section><div class="notice">Der Checker bewertet die Rollenlogik. Annahmerichtlinien, Tarifberechtigung, Steuerfolgen und der konkrete Versicherungsschein bleiben zusätzlich zu prüfen.</div>`;
  $$('[data-role-field]').forEach(button => { button.onclick = () => { roleState[button.dataset.roleField] = button.dataset.roleValue; renderRoleChecker(); }; });
}
function openRoleChecker() { renderRoleChecker(); $('#roleDialog').showModal(); }
function init() {
  renderFilters();
  const evidenceTotal = Object.values(EVIDENCE).reduce((sum, items) => sum + items.length, 0), coverageTotal = Object.values(COVERAGE).reduce((sum, matrix) => sum + matrix.rows.length, 0);
  $('#stats').innerHTML = `<div class="stat"><strong>${PRODUCTS.length}</strong><span>Produktwege</span></div><div class="stat"><strong>${coverageTotal}</strong><span>Leistungsangaben</span></div><div class="stat"><strong>${evidenceTotal}</strong><span>Quellenbelege</span></div>`;
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
  $('#roleCheckerBtn').onclick = openRoleChecker; $('#roleClose').onclick = () => $('#roleDialog').close(); $('#roleDialog').onclick = event => { if (event.target === $('#roleDialog')) $('#roleDialog').close(); };
  if ('serviceWorker' in navigator) navigator.serviceWorker.register('./sw.js').catch(() => {}); render();
}
init();
