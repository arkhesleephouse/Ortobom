# Site Ortobom T-7 (versão multi-página)

## O que mudou nessa versão
- Agora são várias páginas em vez de uma só: index.html (home), colchoes.html,
  bases.html, cabeceiras.html, roupas-de-cama.html, travesseiros.html,
  acessorios.html, moveis.html, produto.html (detalhe de produto) e busca.html.
- Todos os produtos ficam num arquivo central: products-data.js. Editar um
  produto ali atualiza ele em toda parte (categoria, busca, destaques).
- header.html e footer.html são "pedaços" reaproveitados em toda página
  (menu, busca, WhatsApp, modal de localização, rodapé) — editar um desses
  dois arquivos muda em TODAS as páginas de uma vez.
- Barra de busca no topo com sugestão ao vivo + página de resultados (busca.html).
- Bases, Cabeceiras, Roupas de Cama, Travesseiros e Móveis ainda estão como
  "catálogo chegando em breve" — sem produtos reais cadastrados ainda.

## Como subir no GitHub (mesmo processo de sempre)
1. Vá em "Add file" → "Upload files" no repositório
2. Arraste TODOS os arquivos desta pasta pra raiz do repositório (index.html,
   as outras páginas .html, style.css, site.js, products-data.js, header.html,
   footer.html, e todas as fotos .jpg) — tudo direto na raiz, sem pasta
3. Se já existir algum arquivo com o mesmo nome (como o index.html antigo),
   o GitHub substitui automaticamente
4. Escreve a mensagem de commit e confirma

## Como adicionar um produto novo
Abre o `products-data.js`, copia um bloco de produto existente (entre `{` e `}`),
cola no final da lista da categoria certa, e ajusta os campos:
- `id`: nome único, sem espaço, tudo minúsculo (ex: "novo-produto")
- `name`: nome que aparece no site
- `category`: "colchoes" ou "acessorios" (as outras categorias ainda não têm produto)
- `line`: linha do produto (ex: "Linha Ouro", "Pró Saúde", "Fashion", "Pillow Top")
- `desc`: descrição curta
- `price`: número sem R$ nem ponto de milhar (ex: 3499), ou `null` se quiser "Consulte o preço"
- `priceNote`: "Casal", "Solteiro", etc.
- `image`: nome do arquivo da foto (que precisa estar subida junto, na raiz)

## Como adicionar produtos numa categoria vazia (ex: Bases)
1. Adiciona os produtos no `products-data.js` com `category:"bases"`
2. Troca o conteúdo de `bases.html` pra ter um `<div class="grid" id="grid-bases"></div>`
   e um script chamando `renderProductGrid('grid-bases', getProductsByCategory('bases'));`
   (posso fazer isso pra você quando tiver as fotos prontas)
