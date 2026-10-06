#!/usr/bin/env python3
"""Gera uma página estática por produto em p/<id>.html a partir de produto.html + products-data.js.
Rode sempre que mudar o catálogo:  python3 build_produtos.py
Cada página já nasce com título, descrição, Open Graph, canonical e JSON-LD no HTML
(WhatsApp, Facebook e Google leem sem executar JavaScript)."""
import re, json, os, html, subprocess

SITE = "https://www.ortobomt7.com.br"
NOUN = {"colchoes":"Colchão","bases":"Base","cabeceiras":"Cabeceira","travesseiros":"Travesseiro",
        "moveis":None,"acessorios":"Acessório","roupas-de-cama":"Roupa de cama"}
CATLABEL = {"colchoes":"Colchões","acessorios":"Acessórios","bases":"Bases","cabeceiras":"Cabeceiras",
            "roupas-de-cama":"Roupas de Cama","travesseiros":"Travesseiros","moveis":"Móveis"}

def load_products():
    js = open('products-data.js', encoding='utf8').read()
    out = subprocess.run(['node','-e',
        "const fs=require('fs');eval(fs.readFileSync('products-data.js','utf8').replace(/const PRODUCTS/,'global.PRODUCTS'));"
        "console.log(JSON.stringify(PRODUCTS))"], capture_output=True, text=True, check=True).stdout
    return json.loads(out)

def title_for(p):
    noun = NOUN.get(p['category'])
    name = p['name']
    if noun is None or noun.split()[0].lower() in name.lower().split()[:2]:
        return f"{name} | Ortobom T-7 Goiânia"
    return f"{name} – {noun} Ortobom | T-7 Goiânia"

def desc_for(p):
    d = p['desc'].strip()
    tail = " Consulte condições na Ortobom T-7, Goiânia."
    if len(d) + len(tail) <= 158: d += tail
    return d

def main():
    tpl = open('produto.html', encoding='utf8').read()
    os.makedirs('p', exist_ok=True)
    for f in os.listdir('p'):
        if f.endswith('.html'): os.remove(os.path.join('p', f))
    prods = load_products()
    for p in prods:
        pid = p['id']; url = f"{SITE}/p/{pid}.html"
        cover = p['images'][0]['url'] if p.get('images') else 'fachada.jpg'
        title = title_for(p); desc = desc_for(p)
        e = lambda s: html.escape(s, quote=True)
        page = tpl
        page = page.replace('<meta charset="UTF-8">', '<meta charset="UTF-8">\n<base href="/">', 1)
        page = re.sub(r'<title id="page-title">.*?</title>', f'<title id="page-title">{e(title)}</title>', page, count=1)
        page = re.sub(r'(<meta name="description" id="page-desc" content=")[^"]*', r'\g<1>'+e(desc), page, count=1)
        page = re.sub(r'(<meta property="og:title" id="og-title" content=")[^"]*', r'\g<1>'+e(title), page, count=1)
        page = re.sub(r'(<meta property="og:description" id="og-desc" content=")[^"]*', r'\g<1>'+e(desc), page, count=1)
        page = re.sub(r'(<meta property="og:image" id="og-image" content=")[^"]*', r'\g<1>'+f"{SITE}/{cover}", page, count=1)
        page = re.sub(r'(<meta property="og:url" id="og-url" content=")[^"]*', r'\g<1>'+url, page, count=1)
        page = re.sub(r'(<link rel="canonical" id="canonical-link" href=")[^"]*', r'\g<1>'+url, page, count=1)
        schema = [{"@context":"https://schema.org","@type":"Product","@id":url+"#produto","name":p['name'],
                   "sku":pid,"category":CATLABEL.get(p['category'],''),
                   "image":f"{SITE}/{cover}","description":p['desc'],
                   "brand":{"@type":"Brand","name":"Ortobom"},"url":url},
                  {"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[
                   {"@type":"ListItem","position":1,"name":"Início","item":SITE+"/"},
                   {"@type":"ListItem","position":2,"name":CATLABEL.get(p['category'],''),"item":f"{SITE}/{p['category']}.html"},
                   {"@type":"ListItem","position":3,"name":p['name'],"item":url}]}]
        ld = f'<script type="application/ld+json" id="schema-product">{json.dumps(schema[0],ensure_ascii=False)}</script>\n' \
             f'<script type="application/ld+json" id="schema-breadcrumb">{json.dumps(schema[1],ensure_ascii=False)}</script>\n'
        page = page.replace('</head>', ld + '</head>', 1)
        page = page.replace('<script src="products-data.js', f'<script>window.__PID={json.dumps(pid)};</script>\n<script src="products-data.js', 1)
        # conteúdo mínimo para quem lê sem JavaScript
        page = re.sub(r'(<[^>]*id="product-root"[^>]*>)', r'\g<1>'+f'<h1>{e(p["name"])}</h1><p>{e(p["desc"])}</p>', page, count=1)
        open(f'p/{pid}.html','w',encoding='utf8').write(page)
    # sitemap
    sm = open('sitemap.xml', encoding='utf8').read()
    sm = re.sub(r'\?id=([a-z0-9-]+)</loc>', r'?id=\1</loc>', sm)
    for p in prods:
        sm = sm.replace(f"{SITE}/produto.html?id={p['id']}</loc>", f"{SITE}/p/{p['id']}.html</loc>")
    open('sitemap.xml','w',encoding='utf8').write(sm)
    print(len(prods), 'páginas geradas em p/')

if __name__ == '__main__':
    main()
