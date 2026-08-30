// ===================================================================
// LÓGICA COMPARTILHADA — Ortobom T-7
// Injeta header/footer, cuida do WhatsApp, do modal de localização
// e da busca (dropdown ao vivo + página de resultados).
// ===================================================================
const WHATSAPP_NUMBER = "556236384245"; // (62) 3638-4245

function waLink(label, isCategory){
  let base;
  if (isCategory) base = `Olá! Vim pelo site da Ortobom T-7 e quero saber mais sobre ${label}.`;
  else if (label) base = `Olá! Vim pelo site da Ortobom T-7 e quero saber mais sobre o produto ${label}.`;
  else base = `Olá! Vim pelo site da Ortobom T-7 e gostaria de falar com um consultor.`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(base)}`;
}

function formatPrice(p){
  return p.toLocaleString('pt-BR', {minimumFractionDigits:0, maximumFractionDigits:0});
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
          <a class="search-item" href="produto.html?id=${p.id}">
            <img src="${coverImage(p)}" alt="${p.name}">
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
    <a href="produto.html?id=${p.id}" class="card">
      <div class="card-img">
        <img src="${coverImage(p)}" alt="${p.name}" loading="lazy">
        <span class="card-tag">${tagLabel || p.line || ''}</span>
      </div>
      <div class="card-body">
        <h3>${p.name}</h3>
        <p>${p.desc}</p>
        <div class="card-price">
          ${p.price
            ? `<strong>R$ ${formatPrice(p.price)}</strong><span>${p.priceNote ? p.priceNote : 'Casal'} · a partir de</span>`
            : `<strong class="price-consult">Consulte o preço</strong>`}
        </div>
        <div class="card-cta"><span>Ver detalhes →</span></div>
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
    "priceRange": "R$",
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

// Rastreia cliques em qualquer link de WhatsApp (Google Analytics + Meta Pixel)
document.addEventListener('click', (e) => {
  const link = e.target.closest('a[href*="wa.me/"]');
  if (!link) return;
  if (typeof gtag === 'function') {
    gtag('event', 'click_whatsapp', {
      'page_location': window.location.href,
      'page_path': window.location.pathname,
      'link_text': link.textContent.trim().slice(0, 60)
    });
  }
  if (typeof fbq === 'function') {
    fbq('track', 'Lead', { content_name: 'Clique no WhatsApp', content_category: window.location.pathname });
  }
});
