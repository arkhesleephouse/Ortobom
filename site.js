// ===================================================================
// LÓGICA COMPARTILHADA — Ortobom T-7
// Injeta header/footer, cuida do WhatsApp, do modal de localização
// e da busca (dropdown ao vivo + página de resultados).
// ===================================================================
const WHATSAPP_NUMBER = "556236384245"; // (62) 3638-4245
const GOOGLE_REVIEWS_URL = "https://maps.google.com/?cid=6307448776089531956"; // ficha da loja no Google


// Origem do visitante (UTM / anúncio / Google / Instagram), guardada na sessão.
// O WhatsApp não carrega UTM, então a origem vai como uma linha curta no fim da mensagem.
function getOrigem(){
  try{
    let o = sessionStorage.getItem('t7_origem');
    if (o !== null) return o;
    const p = new URLSearchParams(location.search);
    let v = p.get('utm_source') || '';
    const camp = p.get('utm_campaign');
    if (v && camp) v += '/' + camp;
    if (!v && p.get('fbclid')) v = 'meta';
    if (!v && p.get('gclid')) v = 'google';
    if (!v && document.referrer){
      try{ const h = new URL(document.referrer).hostname.replace(/^www\./,'');
        if (h && h !== location.hostname.replace(/^www\./,'')) v = h; }catch(e){}
    }
    v = v.slice(0,40);
    sessionStorage.setItem('t7_origem', v);
    return v;
  }catch(e){ return ''; }
}
function withOrigem(text){
  const o = getOrigem();
  return o ? `${text}\n(Origem: ${o})` : text;
}

function waLink(label, isCategory){
  let base;
  if (isCategory) base = `Olá! Vim pelo site da Ortobom T-7 e quero saber mais sobre ${label}.`;
  else if (label) base = `Olá! Vim pelo site da Ortobom T-7 e quero saber mais sobre o produto ${label}.`;
  else base = `Olá! Vim pelo site da Ortobom T-7 e gostaria de falar com um consultor.`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(withOrigem(base))}`;
}


function normalize(str){
  return (str||'').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'');
}

// ---------- Injeta header e footer via fetch (funciona em produção/GitHub Pages) ----------
async function injectPartials(){
  const headerSlot = document.getElementById('site-header');
  const footerSlot = document.getElementById('site-footer');
  if (headerSlot){
    const html = await fetch('header.html').then(r => r.text());
    headerSlot.outerHTML = html;
  }
  if (footerSlot){
    const html = await fetch('footer.html').then(r => r.text());
    footerSlot.outerHTML = html;
  }
  wireHeaderFooter();
}

function wireHeaderFooter(){
  // WhatsApp genéricos
  document.querySelectorAll('[data-wa-generic]').forEach(el => el.href = waLink());

  // Modal de localização
  const locModal = document.getElementById('loc-modal');
  const openBtn = document.getElementById('btn-loc-modal');
  if (locModal && openBtn){
    openBtn.addEventListener('click', ()=>{
      locModal.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
    function closeLocModal(){
      locModal.classList.remove('open');
      document.body.style.overflow = '';
    }
    const closeBtn = document.getElementById('loc-modal-close');
    if (closeBtn) closeBtn.addEventListener('click', closeLocModal);
    locModal.addEventListener('click', (e)=>{ if(e.target === locModal) closeLocModal(); });
    document.addEventListener('keydown', (e)=>{ if(e.key === 'Escape') closeLocModal(); });
    const wppModal = document.getElementById('wpp-modal');
    if (wppModal) wppModal.href = waLink();
  }

  // Busca com sugestões ao vivo
  const searchInput = document.getElementById('site-search');
  const searchResults = document.getElementById('site-search-dropdown');
  if (searchInput && searchResults){
    searchInput.addEventListener('input', ()=>{
      const q = normalize(searchInput.value.trim());
      if (!q){ searchResults.innerHTML=''; searchResults.classList.remove('open'); return; }
      const matches = PRODUCTS.filter(p =>
        normalize(p.name).includes(q) ||
        normalize(p.line).includes(q) ||
        normalize(p.category).includes(q) ||
        normalize(p.desc).includes(q)
      ).slice(0, 6);
      if (!matches.length){
        searchResults.innerHTML = `<div class="search-empty">Nenhum produto encontrado. <a href="${waLink()}" target="_blank" rel="noopener">Falar no WhatsApp</a></div>`;
      } else {
        searchResults.innerHTML = matches.map(p => `
          <a class="search-item" href="p/${p.id}.html">
            <img src="${coverImage(p)}" alt="${p.name}" loading="lazy" decoding="async">
            <div>
              <strong>${p.name}</strong>
              <span>${p.line || ''}</span>
            </div>
          </a>
        `).join('') + `<a class="search-seeall" href="busca.html?q=${encodeURIComponent(searchInput.value.trim())}">Ver todos os resultados para "${searchInput.value.trim()}" →</a>`;
      }
      searchResults.classList.add('open');
    });
    searchInput.addEventListener('keydown', (e)=>{
      if (e.key === 'Enter'){
        window.location.href = `busca.html?q=${encodeURIComponent(searchInput.value.trim())}`;
      }
    });
    document.addEventListener('click', (e)=>{
      if (!searchInput.contains(e.target) && !searchResults.contains(e.target)){
        searchResults.classList.remove('open');
      }
    });
  }
}

// ---------- Render de um grid de cards de produto ----------
function renderProductGrid(containerId, items, tagLabel){
  const el = document.getElementById(containerId);
  if (!el) return;
  if (!items.length){
    el.innerHTML = `<p class="empty-msg">Nenhum produto encontrado.</p>`;
    return;
  }
  el.innerHTML = items.map(p => `
    <a href="p/${p.id}.html" class="card${p.category==='colchoes' ? '' : ' contain'}">
      <div class="card-img"><img src="${coverImage(p)}" alt="${p.name}" loading="lazy" decoding="async"></div>
      <div class="card-body">
        <span class="card-line">${tagLabel || p.line || ''}</span>
        <h3>${p.name}</h3>
        <div class="card-price"><strong class="price-consult">Consulte condições especiais</strong></div>
        <span class="card-cta">Ver produto</span>
      </div>
    </a>
  `).join('');
}

// ---------- SEO: dados estruturados (schema.org) ----------
function injectLocalBusinessSchema(){
  if (document.getElementById('schema-localbusiness')) return;
  const schema = {
    "@context": "https://schema.org",
    "@type": "Store",
    "name": "Ortobom T-7",
    "image": "https://www.ortobomt7.com.br/fachada.jpg",
    "url": "https://www.ortobomt7.com.br/",
    "telephone": "+5562363884245",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Av. T-7, 554",
      "addressLocality": "Goiânia",
      "addressRegion": "GO",
      "addressCountry": "BR"
    },
    "openingHoursSpecification": [
      { "@type": "OpeningHoursSpecification", "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday"], "opens": "08:00", "closes": "19:30" },
      { "@type": "OpeningHoursSpecification", "dayOfWeek": ["Saturday"], "opens": "08:00", "closes": "14:00" }
    ],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "5.0",
      "reviewCount": "11"
    }
  };
  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.id = 'schema-localbusiness';
  script.textContent = JSON.stringify(schema);
  document.head.appendChild(script);
}

document.addEventListener('DOMContentLoaded', injectPartials);
document.addEventListener('DOMContentLoaded', injectLocalBusinessSchema);

// Contexto do clique no WhatsApp: produto, categoria e onde na página foi o clique
function currentProduct(){
  try{
    if (!/(produto\.html|\/p\/[^/]+\.html)$/.test(location.pathname) || typeof PRODUCTS === 'undefined') return null;
    const id = window.__PID || new URLSearchParams(location.search).get('id');
    return PRODUCTS.find(p => p.id === id) || null;
  }catch(e){ return null; }
}
function trackWhatsApp(secao){
  const p = currentProduct();
  const info = {
    secao: secao || 'pagina',
    page_path: location.pathname,
    product_id: p ? p.id : undefined,
    product_name: p ? p.name : undefined,
    product_category: p ? p.category : undefined,
    origem: getOrigem() || 'direto'
  };
  if (typeof gtag === 'function'){
    gtag('event', 'click_whatsapp', Object.assign({ page_location: location.href }, info));
  }
  if (typeof fbq === 'function'){
    fbq('track', 'Lead', {
      content_name: p ? p.name : 'Clique no WhatsApp',
      content_category: p ? p.category : location.pathname,
      content_ids: p ? [p.id] : undefined,
      secao: info.secao, origem: info.origem
    });
  }
}
document.addEventListener('click', (e) => {
  const link = e.target.closest('a[href*="wa.me/"]');
  if (!link) return;
  let secao = 'pagina';
  if (link.closest('.fab-wpp')) secao = 'botao_flutuante';
  else if (link.id === 'pd-cta' || link.closest('.pd-cta')) secao = 'produto';
  else if (link.closest('header')) secao = 'cabecalho';
  else if (link.closest('footer')) secao = 'rodape';
  else if (link.closest('.search-empty')) secao = 'busca_sem_resultado';
  trackWhatsApp(secao);
});

// Visualização de produto (para públicos de remarketing e relatórios; sem valores)
document.addEventListener('DOMContentLoaded', () => {
  const p = currentProduct();
  if (!p) return;
  if (typeof fbq === 'function'){
    fbq('track', 'ViewContent', { content_ids: [p.id], content_name: p.name, content_category: p.category, content_type: 'product' });
  }
  if (typeof gtag === 'function'){
    gtag('event', 'view_item', { items: [{ item_id: p.id, item_name: p.name, item_category: p.category }] });
  }
});

// Botão flutuante: no celular, esconde ao rolar para baixo e volta ao rolar para cima
(function(){
  let last = window.scrollY, ticking = false;
  window.addEventListener('scroll', function(){
    if (ticking) return; ticking = true;
    requestAnimationFrame(function(){
      const fab = document.querySelector('.fab-wpp');
      const y = window.scrollY;
      if (fab){
        if (y > last + 8 && y > 200) fab.classList.add('fab-hide');
        else if (y < last - 8 || y < 200) fab.classList.remove('fab-hide');
      }
      last = y; ticking = false;
    });
  }, {passive:true});
})();
