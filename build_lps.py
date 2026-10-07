#!/usr/bin/env python3
"""Gera as páginas de busca local (landing pages) a partir do catálogo.
Rode sempre que mudar o catálogo: python3 build_lps.py"""
import re, json, html, subprocess
SITE = "https://www.ortobomt7.com.br"
DATE = "2026-10-07"
E = html.escape
src = open('colchoes.html', encoding='utf-8').read()
head = src[:src.index('<title>')]
V = re.search(r'style\.css\?v=(\d+)', src).group(1)

cat = json.loads(subprocess.run(['node','-e',
 "const fs=require('fs');eval(fs.readFileSync('products-data.js','utf8')+';global.P=PRODUCTS');eval(fs.readFileSync('product-specs.js','utf8')+';global.S=SPECS');"
 "console.log(JSON.stringify(P.map(p=>({id:p.id,name:p.name,category:p.category,line:p.line||'',medidas:(S[p.id]||{}).medidas||[]}))))"],
 capture_output=True, text=True).stdout)
col = [p for p in cat if p['category']=='colchoes']
def by_size(m): return [p['id'] for p in col if m in p['medidas']]

LPS = [
 dict(slug='loja-de-colchoes-goiania', title='Loja de colchões em Goiânia, no Setor Bueno',
  meta='Ortobom T-7: loja de colchões na Av. T-7, 554, Setor Bueno, Goiânia. Linhas Ouro, Pró Saúde e Fashion, bases e acessórios. Fale com um consultor.',
  h1='Loja de colchões em Goiânia, no Setor Bueno',
  lead='A Ortobom T-7 fica na Av. T-7, 554, no Setor Bueno. Você conhece as linhas Ouro, Pró Saúde e Fashion, tira dúvidas com um consultor e escolhe o colchão pelo seu jeito de dormir.',
  ids=['orion','bellona','ortopedico-premium','pro-saude-superpocket','pro-saude-nanolastic','fashion-superpocket','fashion-nanolastic','orthopur'],
  grid='Alguns modelos da loja', wa='Olá! Vi a página da loja de colchões em Goiânia no site da Ortobom T-7 e gostaria de falar com um consultor.',
  faq=[('Onde fica a Ortobom T-7?','Na Av. T-7, 554, Setor Bueno, Goiânia (CEP 74210-260).'),
       ('Qual o horário de atendimento?','De segunda a sexta, das 8h às 19h30, e aos sábados, das 8h às 14h.'),
       ('Como escolho o colchão certo?','Você pode fazer o teste de perfil de sono no site ou conversar com um consultor. O melhor colchão é o que você testa deitando.')]),
 dict(slug='colchao-casal-goiania', title='Colchão casal em Goiânia',
  meta='Colchões casal (138 x 188 cm) Ortobom na loja T-7, Setor Bueno, Goiânia. Veja os modelos e fale com um consultor.',
  h1='Colchão casal em Goiânia', lead='O colchão casal do catálogo Ortobom tem 138 x 188 cm. Na T-7 você compara os modelos disponíveis nessa medida e conversa com um consultor para escolher o mais adequado ao casal.',
  ids=by_size('138 x 188'), grid='Modelos disponíveis na medida casal (138 x 188 cm)', wa='Olá! Vi a página de colchão casal no site da Ortobom T-7 e gostaria de falar com um consultor.',
  faq=[('Qual a medida do colchão casal?','No catálogo Ortobom, o colchão casal tem 138 x 188 cm (largura x comprimento).'),
       ('Qual colchão é indicado para casal?','Depende da preferência de cada um. Depende da preferência, do peso e da posição de dormir de cada pessoa. Um consultor ajuda a comparar os modelos na loja.'),
       ('Onde ver os colchões casal?','Na Ortobom T-7, Av. T-7, 554, Setor Bueno, Goiânia.')]),
 dict(slug='colchao-queen-goiania', title='Colchão queen size em Goiânia',
  meta='Colchões queen (158 x 198 cm) Ortobom na loja T-7, Setor Bueno, Goiânia. Veja os modelos e fale com um consultor.',
  h1='Colchão queen em Goiânia', lead='O colchão queen do catálogo Ortobom tem 158 x 198 cm. Veja os modelos nessa medida e fale com um consultor da T-7.',
  ids=by_size('158 x 198'), grid='Modelos disponíveis na medida queen (158 x 198 cm)', wa='Olá! Vi a página de colchão queen no site da Ortobom T-7 e gostaria de falar com um consultor.',
  faq=[('Qual a medida do colchão queen?','No catálogo Ortobom, o colchão queen tem 158 x 198 cm (largura x comprimento).'),
       ('Como saber se cabe no quarto?','Meça o espaço da cama e deixe área livre para circular. O consultor ajuda a conferir as medidas.'),
       ('Onde ver os colchões queen?','Na Ortobom T-7, Av. T-7, 554, Setor Bueno, Goiânia.')]),
 dict(slug='colchao-king-goiania', title='Colchão king size em Goiânia',
  meta='Colchões king (193 x 203 cm) Ortobom na loja T-7, Setor Bueno, Goiânia. Veja os modelos e fale com um consultor.',
  h1='Colchão king em Goiânia', lead='O colchão king do catálogo Ortobom tem 193 x 203 cm. Veja os modelos nessa medida e fale com um consultor da T-7.',
  ids=by_size('193 x 203'), grid='Modelos disponíveis na medida king (193 x 203 cm)', wa='Olá! Vi a página de colchão king no site da Ortobom T-7 e gostaria de falar com um consultor.',
  faq=[('Qual a medida do colchão king?','No catálogo Ortobom, o colchão king tem 193 x 203 cm (largura x comprimento).'),
       ('Todos os modelos têm king?','Não. Apenas parte do catálogo tem essa medida; os modelos abaixo são os que têm.'),
       ('Onde ver os colchões king?','Na Ortobom T-7, Av. T-7, 554, Setor Bueno, Goiânia.')]),
 dict(slug='colchao-solteiro-goiania', title='Colchão solteiro em Goiânia',
  meta='Colchões solteiro (88 x 188 cm) Ortobom na loja T-7, Setor Bueno, Goiânia. Veja os modelos e fale com um consultor.',
  h1='Colchão solteiro em Goiânia', lead='O colchão solteiro do catálogo Ortobom tem 88 x 188 cm. Veja os modelos nessa medida e fale com um consultor da T-7.',
  ids=by_size('88 x 188'), grid='Modelos disponíveis na medida solteiro (88 x 188 cm)', wa='Olá! Vi a página de colchão solteiro no site da Ortobom T-7 e gostaria de falar com um consultor.',
  faq=[('Qual a medida do colchão solteiro?','No catálogo Ortobom, o colchão solteiro tem 88 x 188 cm (largura x comprimento).'),
       ('Existe medida maior que o solteiro?','Alguns modelos têm também 108 x 198 cm. Confira a ficha de cada produto.'),
       ('Onde ver os colchões solteiro?','Na Ortobom T-7, Av. T-7, 554, Setor Bueno, Goiânia.')]),
 dict(slug='colchao-ortopedico-goiania', title='Colchão ortopédico em Goiânia',
  meta='Colchões ortopédicos Ortobom na loja T-7, Setor Bueno, Goiânia. Conheça os modelos e fale com um consultor.',
  h1='Colchão ortopédico em Goiânia', lead='Na Ortobom T-7 você conhece os colchões ortopédicos do catálogo e conversa com um consultor para escolher o mais adequado ao seu jeito de dormir.',
  ids=[p['id'] for p in col if 'ortop' in p['id']], grid='Colchões ortopédicos do catálogo', wa='Olá! Vi a página de colchão ortopédico no site da Ortobom T-7 e gostaria de falar com um consultor.',
  faq=[('Qual a diferença de um colchão ortopédico?','No catálogo Ortobom, os modelos ortopédicos têm estrutura em madeira. Veja a descrição oficial de cada um.'),
       ('Colchão firme serve para todo mundo?','Não. A firmeza ideal depende de preferência, peso e posição de dormir. Por isso vale testar deitando.'),
       ('Onde ver os colchões ortopédicos?','Na Ortobom T-7, Av. T-7, 554, Setor Bueno, Goiânia.')]),
 dict(slug='cama-box-bau-goiania', title='Cama box baú em Goiânia',
  meta='Bases sommier baú Ortobom na loja T-7, Setor Bueno, Goiânia. Veja os modelos e fale com um consultor.',
  h1='Cama box baú em Goiânia', lead='A Ortobom T-7 tem bases sommier com baú no catálogo, para quem quer guardar roupa de cama dentro da própria cama. Veja os modelos e fale com um consultor.',
  ids=[p['id'] for p in cat if p['category']=='bases' and 'bau' in p['id']], grid='Bases sommier baú do catálogo', wa='Olá! Vi a página de cama box baú no site da Ortobom T-7 e gostaria de falar com um consultor.',
  faq=[('O que é uma base sommier baú?','É uma base de cama com compartimento para guardar itens, como roupa de cama.'),
       ('Preciso comprar o colchão junto?','A base e o colchão são produtos separados. O consultor ajuda a combinar as medidas.'),
       ('Onde ver as bases baú?','Na Ortobom T-7, Av. T-7, 554, Setor Bueno, Goiânia.')]),
]
for lp in LPS: assert lp['ids'], lp['slug']

def page(lp):
    url = f"{SITE}/{lp['slug']}.html"
    faq = ''.join(f"<details class='lp-faq'><summary>{E(q)}</summary><p>{E(a)}</p></details>" for q,a in lp['faq'])
    others = ''.join(f"<li><a href='{o['slug']}.html'>{E(o['title'])}</a></li>" for o in LPS if o is not lp)
    body = f'''<section class="page-hero">
  <div class="wrap">
    <div class="breadcrumb"><a href="index.html">Início</a> / {E(lp['title'])}</div>
    <h1>{E(lp['h1'])}</h1>
    <p>{E(lp['lead'])}</p>
    <div class="home-intro-cta" style="justify-content:flex-start;margin-top:18px">
      <a href="#" id="lp-wa" class="btn-primary" target="_blank" rel="noopener">Falar com um consultor</a>
      <a href="quiz.html" class="btn-ghost" style="color:#fff;border-color:#fff;">Descobrir meu colchão</a>
    </div>
  </div>
</section>
<section class="section" style="padding-top:36px;">
  <div class="wrap">
    <h2 style="margin-bottom:18px">{E(lp['grid'])}</h2>
    <div class="grid" id="lp-grid"></div>
    <p class="guide-note" style="margin-top:14px">Consulte condições especiais com nosso consultor. Características dos modelos conforme o catálogo oficial Ortobom.</p>
    <a href="{E(GOOGLE)}" target="_blank" rel="noopener" class="proof-line"><span class="testimonials-stars">★★★★★</span><span><b>5,0</b> · 11 avaliações no Google</span></a>
    <h2 style="margin:34px 0 12px">Como chegar</h2>
    <p><b>Ortobom T-7</b> · Av. T-7, 554, Setor Bueno, Goiânia (CEP 74210-260)<br>Seg. a sex.: 8h às 19h30 · Sáb.: 8h às 14h<br>WhatsApp: (62) 3638-4245</p>
    <h2 style="margin:34px 0 12px">Perguntas frequentes</h2>
    {faq}
    <h2 style="margin:34px 0 12px">Veja também</h2>
    <ul class="guide-others">{others}<li><a href="guias.html">Guias de compra</a></li></ul>
  </div>
</section>'''
    scripts = f'''<script>
(function(){{
  var ids={json.dumps(lp['ids'])};
  renderProductGrid('lp-grid', ids.map(function(id){{return PRODUCTS.find(function(p){{return p.id===id;}});}}).filter(Boolean));
  var wa=document.getElementById('lp-wa'); wa.href=waLink('');
  wa.addEventListener('click',function(e){{e.preventDefault();trackWhatsApp('lp');
    window.open('https://wa.me/'+WHATSAPP_NUMBER+'?text='+encodeURIComponent(withOrigem({json.dumps(lp['wa'],ensure_ascii=False)})),'_blank');}});
}})();
</script>'''
    ld = [{"@context":"https://schema.org","@type":"WebPage","name":lp['title'],"url":url,"about":{"@id":SITE+"/#loja"}},
          {"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[
            {"@type":"ListItem","position":1,"name":"Início","item":SITE+"/"},
            {"@type":"ListItem","position":2,"name":lp['title'],"item":url}]},
          {"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":q,"acceptedAnswer":{"@type":"Answer","text":a}} for q,a in lp['faq']]}]
    t = f"{lp['title']} | Ortobom T-7"
    return (head.replace('<head>','<head>\n<base href="/">',1) + f'''<title>{E(t)}</title>
<meta name="description" content="{E(lp['meta'])}">
<meta property="og:type" content="website">
<meta property="og:site_name" content="Ortobom T-7">
<meta property="og:title" content="{E(t)}">
<meta property="og:description" content="{E(lp['meta'])}">
<meta property="og:image" content="{SITE}/fachada.jpg">
<meta property="og:url" content="{url}">
<link rel="canonical" href="{url}">
<link rel="preload" href="fonts/montserrat-latin-wght-normal.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="style.css?v={V}">
<script type="application/ld+json">{json.dumps(ld,ensure_ascii=False)}</script>
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

GOOGLE = "https://maps.google.com/?cid=6307448776089531956"
for lp in LPS:
    open(f"{lp['slug']}.html",'w',encoding='utf-8').write(page(lp)); print(lp['slug'], len(lp['ids']))

sm = open('sitemap.xml',encoding='utf-8').read()
for lp in LPS:
    u=f"{SITE}/{lp['slug']}.html"
    sm = re.sub(r'\s*<url>\s*<loc>'+re.escape(u)+r'</loc>.*?</url>','',sm,flags=re.S)
add=''.join(f"  <url>\n    <loc>{SITE}/{lp['slug']}.html</loc>\n    <lastmod>{DATE}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.8</priority>\n  </url>\n" for lp in LPS)
open('sitemap.xml','w',encoding='utf-8').write(sm.replace('</urlset>',add+'</urlset>'))
