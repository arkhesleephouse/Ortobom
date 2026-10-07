#!/usr/bin/env python3
"""Gera guias/<slug>.html e guias.html (índice) a partir de guias_content.py.
Rode sempre que editar o conteúdo ou o catálogo: python3 build_guias.py"""
import re, json, html, subprocess, os
from guias_content import GUIAS

SITE = "https://www.ortobomt7.com.br"
DATE = "2026-10-07"
src = open('colchoes.html', encoding='utf-8').read()
head = src[:src.index('<title>')]
V = re.search(r'style\.css\?v=(\d+)', src).group(1)

ids = set(json.loads(subprocess.run(['node','-e',
  "const fs=require('fs');eval(fs.readFileSync('products-data.js','utf8')+';global.P=PRODUCTS');console.log(JSON.stringify(P.map(p=>p.id)))"],
  capture_output=True, text=True).stdout))
for g in GUIAS:
    for r in g['related']: assert r in ids, (g['slug'], r)

E = html.escape
def page(title, meta, canon, body, scripts, jsonld, base="/"):
    return (head.replace('<head>', '<head>\n<base href="/">', 1) +
f'''<title>{E(title)} | Ortobom T-7 Goiânia</title>
<meta name="description" content="{E(meta)}">
<meta property="og:type" content="article">
<meta property="og:site_name" content="Ortobom T-7">
<meta property="og:title" content="{E(title)}">
<meta property="og:description" content="{E(meta)}">
<meta property="og:image" content="{SITE}/quiz-desktop.jpg">
<meta property="og:url" content="{canon}">
<link rel="canonical" href="{canon}">
<link rel="preload" href="fonts/montserrat-latin-wght-normal.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="style.css?v={V}">
<script type="application/ld+json">{json.dumps(jsonld, ensure_ascii=False)}</script>
</head>
<body>

<div id="site-header"></div>
<main id="conteudo">

{body}

</main>
<div id="site-footer"></div>

<script src="products-data.js?v={V}"></script>
<script src="site.js?v={V}"></script>
{scripts}
</body>
</html>
''')

os.makedirs('guias', exist_ok=True)
for g in GUIAS:
    url = f"{SITE}/guias/{g['slug']}.html"
    secs = ''.join(f'<h2>{E(h)}</h2>\n{b}\n' for h, b in g['sections'])
    srcs = ''.join(f'<li><a href="{u}" target="_blank" rel="noopener">{E(t)}</a></li>' for t, u in g['sources'])
    others = ''.join(f'<li><a href="guias/{o["slug"]}.html">{E(o["title"])}</a></li>' for o in GUIAS if o['slug'] != g['slug'])
    body = f'''<section class="page-hero">
  <div class="wrap">
    <div class="breadcrumb"><a href="index.html">Início</a> / <a href="guias.html">Guias</a> / {E(g['title'])}</div>
    <h1>{E(g['h1'])}</h1>
  </div>
</section>

<article class="section guide" style="padding-top:36px;">
  <div class="wrap">
    <div class="guide-body">
      <p class="guide-lead">{g['intro']}</p>
      {secs}
      <div class="guide-cta">
        <h3>Quer ajuda para escolher?</h3>
        <p>Faça o teste de perfil de sono ou fale com um consultor da Ortobom T-7.</p>
        <div class="guide-cta-btns">
          <a href="quiz.html" class="guide-btn">Fazer o teste</a>
          <a href="#" id="guia-wa" class="guide-btn wa" target="_blank" rel="noopener">Falar com um consultor</a>
        </div>
      </div>
      <h2>Modelos relacionados</h2>
    </div>
    <div class="grid" id="guia-rel" style="margin-top:8px;"></div>
    <div class="guide-body">
      <p class="guide-note">Condições, prazos e garantia variam por modelo: consulte o consultor. As características dos modelos Ortobom citados vêm do site oficial da Ortobom. As informações gerais deste guia vêm das fontes abaixo e não substituem a orientação de um profissional de saúde.</p>
      <h2>Fontes</h2>
      <ul class="guide-sources">{srcs}</ul>
      <h2>Outros guias</h2>
      <ul class="guide-others">{others}</ul>
      <p class="guide-note">Atualizado em outubro de 2026.</p>
    </div>
  </div>
</article>'''
    scripts = f'''<script>
(function(){{
  var rel={json.dumps(g['related'])};
  renderProductGrid('guia-rel', rel.map(function(id){{return PRODUCTS.find(function(p){{return p.id===id;}});}}).filter(Boolean));
  var wa=document.getElementById('guia-wa');
  wa.href=waLink('');
  wa.addEventListener('click',function(e){{e.preventDefault();trackWhatsApp('guia');
    window.open('https://wa.me/'+WHATSAPP_NUMBER+'?text='+encodeURIComponent(withOrigem('Olá! Li o guia "{g['title'].replace(chr(34),'')}" no site da Ortobom T-7 e gostaria de falar com um consultor.')),'_blank');}});
}})();
</script>'''
    ld = [{
      "@context":"https://schema.org","@type":"Article","headline":g['title'],"description":g['meta'],
      "datePublished":DATE,"dateModified":DATE,"mainEntityOfPage":url,
      "author":{"@type":"Organization","name":"Ortobom T-7"},
      "publisher":{"@type":"Organization","name":"Ortobom T-7","url":SITE}},
      {"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[
        {"@type":"ListItem","position":1,"name":"Início","item":SITE+"/"},
        {"@type":"ListItem","position":2,"name":"Guias","item":SITE+"/guias.html"},
        {"@type":"ListItem","position":3,"name":g['title'],"item":url}]}]
    open(f"guias/{g['slug']}.html", 'w', encoding='utf-8').write(page(g['title'], g['meta'], url, body, scripts, ld))

# índice
cards = ''.join(f'<a class="guide-card" href="guias/{g["slug"]}.html"><h3>{E(g["title"])}</h3><p>{E(g["meta"])}</p><span>Ler o guia →</span></a>' for g in GUIAS)
body = f'''<section class="page-hero">
  <div class="wrap">
    <div class="breadcrumb"><a href="index.html">Início</a> / Guias</div>
    <h1>Guias para dormir melhor</h1>
    <p>Como escolher colchão, base e travesseiro, e como cuidar deles. Conteúdo com fontes, sem enrolação.</p>
  </div>
</section>
<section class="section" style="padding-top:36px;">
  <div class="wrap"><div class="guide-grid">{cards}</div></div>
</section>'''
ld = {"@context":"https://schema.org","@type":"CollectionPage","name":"Guias para dormir melhor","url":SITE+"/guias.html"}
open('guias.html','w',encoding='utf-8').write(page("Guias para dormir melhor","Guias da Ortobom T-7 para escolher colchão, base e travesseiro e cuidar deles, com fontes.",SITE+"/guias.html",body,"",ld).replace('og:type" content="article"','og:type" content="website"'))

# sitemap
sm = open('sitemap.xml', encoding='utf-8').read()
sm = re.sub(r'\s*<url>\s*<loc>[^<]*/guias[^<]*</loc>.*?</url>', '', sm, flags=re.S)
urls = [SITE+"/guias.html"] + [f"{SITE}/guias/{g['slug']}.html" for g in GUIAS]
add = ''.join(f'  <url>\n    <loc>{u}</loc>\n    <lastmod>{DATE}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>{"0.7" if u.endswith("guias.html") else "0.6"}</priority>\n  </url>\n' for u in urls)
sm = sm.replace('</urlset>', add + '</urlset>')
open('sitemap.xml','w',encoding='utf-8').write(sm)
print(len(GUIAS), 'guias + índice gerados')
