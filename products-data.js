// ===================================================================
// BANCO DE PRODUTOS ORTOBOM T-7
// Cada produto: id, name, category, line (quando aplicável), price,
// priceNote, image, desc, keywords (termos extras pra busca)
// Categorias vazias (bases, cabeceiras, roupas-de-cama, travesseiros,
// moveis) ainda não têm produtos reais cadastrados — telas "em breve".
// ===================================================================

// ===================================================================
// BANCO DE PRODUTOS ORTOBOM T-7
// Cada produto: id, name, category, line (quando aplicável), price,
// priceNote, images (array — 1 ou mais fotos/cores/ângulos), desc.
// Categorias vazias (bases, cabeceiras, roupas-de-cama, travesseiros,
// moveis) ainda não têm produtos reais cadastrados — telas "em breve".
//
// COMO ADICIONAR FOTOS EXTRAS (cor/ângulo) A UM PRODUTO:
// troque `images:[{url:"arquivo.jpg", label:"Padrão"}]` por várias entradas, ex:
// images:[
//   {url:"orion-preto.jpg", label:"Preto"},
//   {url:"orion-cinza.jpg", label:"Cinza"},
// ]
// A primeira imagem do array é sempre a foto de capa (usada nos cards/busca).
// ===================================================================

const PRODUCTS = [
  // ---------- COLCHÕES · LINHA OURO ----------
  {id:"orion", name:"Orion", category:"colchoes", line:"Linha Ouro",
   desc:"Espuma HR de alta resiliência com tecido antiviral V-Protect.",
   price:4499, priceNote:"Casal", images:[{url:"orion.jpg", label:"Padrão"}]},
  {id:"bellona", name:"Bellona", category:"colchoes", line:"Linha Ouro",
   desc:"Malha Belga com Pillow Top viscoelástico. Nobreza e sofisticação.",
   price:3599, priceNote:"Casal", images:[{url:"bellona.jpg", label:"Padrão"}]},
  {id:"orthopur", name:"Orthopur", category:"colchoes", line:"Linha Ouro",
   desc:"Tecnologia Fresh Touch — frescor imediato em qualquer noite.",
   price:4899, priceNote:"Casal", images:[{url:"orthopur.jpg", label:"Padrão"}]},
  {id:"liberty", name:"Liberty", category:"colchoes", line:"Linha Ouro",
   desc:"Fibra sustentável feita de garrafas PET recicladas.",
   price:3199, priceNote:"Casal", images:[{url:"liberty.jpg", label:"Padrão"}]},
  {id:"pro-forca", name:"Pró Força", category:"colchoes", line:"Linha Ouro",
   desc:"Estrutura resistente com espuma sustentável certificada.",
   price:null, images:[{url:"pro-forca.jpg", label:"Padrão"}]},
  {id:"absolut-hybrid", name:"Absolut Hybrid", category:"colchoes", line:"Linha Ouro",
   desc:"Dupla face — um lado firme, outro macio. Você escolhe.",
   price:3299, priceNote:"Casal", images:[{url:"absolut-hybrid.jpg", label:"Padrão"}]},
  {id:"ouro-spring", name:"Ouro Spring", category:"colchoes", line:"Linha Ouro",
   desc:"Molas de fio contínuo com resistência progressiva.",
   price:2719, priceNote:"Casal", images:[{url:"ouro-spring.jpg", label:"Padrão"}]},
  {id:"ortopedico-premium", name:"Ortopédico Premium", category:"colchoes", line:"Linha Ouro",
   desc:"Estrutura em madeira de reflorestamento, firmeza máxima.",
   price:2749, priceNote:"Casal", images:[{url:"ortopedico-premium.jpg", label:"Padrão"}]},

  // ---------- COLCHÕES · PRÓ SAÚDE ----------
  {id:"only", name:"Only", category:"colchoes", line:"Pró Saúde",
   desc:"Embalado a vácuo — cabe em elevador, sem precisar de caminhão.",
   price:3749, priceNote:"Casal", images:[{url:"only.jpg", label:"Padrão"}]},
  {id:"pic-go", name:"PIC-GO", category:"colchoes", line:"Pró Saúde",
   desc:"Compactado, leve e prático — ideal pra mudança e apartamento.",
   price:null, images:[{url:"pic-go.jpg", label:"Padrão"}]},
  {id:"pro-saude-visco-adapt", name:"Pró Saúde Visco Adapt", category:"colchoes", line:"Pró Saúde",
   desc:"Camada viscoelástica que molda o formato do corpo.",
   price:3119, priceNote:"Casal", images:[{url:"pro-saude-visco-adapt.jpg", label:"Padrão"}]},
  {id:"pro-saude-superpocket", name:"Pró Saúde Superpocket", category:"colchoes", line:"Pró Saúde",
   desc:"Molas ensacadas individualmente — conforto sem transferir movimento.",
   price:1169, priceNote:"Solteiro", images:[{url:"pro-saude-superpocket.jpg", label:"Padrão"}]},
  {id:"pro-saude-nanolastic", name:"Pró Saúde Nanolastic", category:"colchoes", line:"Pró Saúde",
   desc:"Molas bicônicas com resistência progressiva ao peso.",
   price:1499, priceNote:"Casal", images:[{url:"pro-saude-nanolastic.jpg", label:"Padrão"}]},
  {id:"pro-saude-extra-firme", name:"Pró Saúde Extra Firme", category:"colchoes", line:"Pró Saúde",
   desc:"Sustentação extra pra quem prefere firmeza.",
   price:2199, priceNote:"Casal", images:[{url:"pro-saude-extra-firme.jpg", label:"Padrão"}]},
  {id:"pro-saude-ortopedico", name:"Pró Saúde Ortopédico", category:"colchoes", line:"Pró Saúde",
   desc:"Estrutura em madeira tratada, ecologicamente correta.",
   price:1619, priceNote:"Casal", images:[{url:"pro-saude-ortopedico.jpg", label:"Padrão"}]},
  {id:"baby-pro-saude", name:"Baby Pró Saúde", category:"colchoes", line:"Pró Saúde",
   desc:"Tratamento Actguard contra ácaros e bactérias — feito pro bebê.",
   price:409, priceNote:"Infantil", images:[{url:"baby-pro-saude.jpg", label:"Padrão"}]},

  // ---------- COLCHÕES · FASHION ----------
  {id:"fashion-superpocket", name:"Fashion Superpocket", category:"colchoes", line:"Fashion",
   desc:"Mini-molas ensacadas com lâmina 100% EPS.",
   price:1339, priceNote:"Casal", images:[{url:"fashion-superpocket.jpg", label:"Padrão"}]},
  {id:"fashion-nanolastic", name:"Fashion Nanolastic", category:"colchoes", line:"Fashion",
   desc:"Molas bicônicas resistentes, ótimo custo-benefício.",
   price:1119, priceNote:"Casal", images:[{url:"fashion-nanolastic.jpg", label:"Padrão"}]},
  {id:"fashion-firm", name:"Fashion Firm", category:"colchoes", line:"Fashion",
   desc:"Firmeza equilibrada com reforço lateral em PU.",
   price:749, priceNote:"Casal", images:[{url:"fashion-firm.jpg", label:"Padrão"}]},
  {id:"fashion-confortavel", name:"Fashion Confortável", category:"colchoes", line:"Fashion",
   desc:"Conforto acessível pra quem está montando a casa.",
   price:969, priceNote:"Casal", images:[{url:"fashion-confortavel.jpg", label:"Padrão"}]},
  {id:"fashion-standard", name:"Fashion Standard", category:"colchoes", line:"Fashion",
   desc:"Entrada Ortobom com a qualidade que a marca garante.",
   price:579, priceNote:"Casal", images:[{url:"fashion-standard.jpg", label:"Padrão"}]},
  {id:"colchonete-all-day", name:"Colchonete All Day", category:"colchoes", line:"Fashion",
   desc:"Solução prática pra quarto extra ou uso ocasional.",
   price:429, priceNote:"Casal", images:[{url:"colchonete-all-day.jpg", label:"Padrão"}]},

  // ---------- ACESSÓRIOS · PILLOW TOP ----------
  {id:"pillow-top-hr-gel", name:"Pillow Top HR Gel", category:"acessorios", line:"Pillow Top",
   desc:"Espuma com gel azul — regula a temperatura durante o sono.",
   price:719, priceNote:"Casal", images:[{url:"pillow-top-hr-gel.jpg", label:"Padrão"}]},
  {id:"pillow-top-ultra", name:"Pillow Top Ultra", category:"acessorios", line:"Pillow Top",
   desc:"Algodão 200 fios com espuma Comfort Cel de alta resiliência.",
   price:null, images:[{url:"pillow-top-ultra.jpg", label:"Padrão"}]},
  {id:"pillow-top-percal", name:"Pillow Top Percal", category:"acessorios", line:"Pillow Top",
   desc:"Fibra siliconada, dupla face — dois níveis de conforto num só.",
   price:null, images:[{url:"pillow-top-percal.jpg", label:"Padrão"}]},
  {id:"colchonete-all-day-acessorio", name:"Colchonete All Day", category:"acessorios", line:"Uso Avulso",
   desc:"Solução prática pra visita, viagem ou quarto extra.",
   price:429, priceNote:"Casal", images:[{url:"colchonete-all-day.jpg", label:"Padrão"}]},
  {id:"almofada-rolete-camurca", name:"Almofada Rolete Camurça", category:"acessorios", line:"Uso Avulso",
   desc:"Rolete de apoio para leitura ou descanso, em camurça macia.",
   price:null, images:[{url:"almofada-rolete-camurca-black.jpg", label:"Preto"}, {url:"almofada-rolete-camurca-brown.jpg", label:"Marrom"}, {url:"almofada-rolete-camurca-cream.jpg", label:"Creme"}, {url:"almofada-rolete-camurca-gray.jpg", label:"Cinza"}]},
  {id:"encosto-dino-veludo", name:"Encosto Dino Veludo", category:"acessorios", line:"Uso Avulso",
   desc:"Encosto com apoio de braços, ideal pra ler ou assistir TV na cama.",
   price:null, images:[{url:"encosto-dino-veludo.jpg", label:"Padrão"}]},
  {id:"massageador-alveolado", name:"Massageador Alveolado", category:"acessorios", line:"Uso Avulso",
   desc:"Massageador elétrico com múltiplos modos e intensidades.",
   price:null, images:[{url:"massageador-alveolado.jpg", label:"Padrão"}]},
  {id:"tapete-de-yoga", name:"Tapete de Yoga", category:"acessorios", line:"Uso Avulso",
   desc:"Tapete antiderrapante Ortobom para yoga e exercícios em casa.",
   price:null, images:[{url:"tapete-de-yoga.jpg", label:"Padrão"}]},

  // ---------- BASES ----------
  {id:"base-sommier-bau-fashion-cori", name:"Base Sommier Baú Fashion Cori", category:"bases",
   desc:"Base com baú para guardar roupa de cama, revestimento Cori.",
   price:2299, priceNote:"Queen", images:[{url:"base-sommier-bau-fashion-cori-black.jpg", label:"Preto"}, {url:"base-sommier-bau-fashion-cori-brown.jpg", label:"Marrom"}, {url:"base-sommier-bau-fashion-cori-white.jpg", label:"Branco"}, {url:"base-sommier-bau-fashion-cori-cream.jpg", label:"Creme"}, {url:"base-sommier-bau-fashion-cori-gray.jpg", label:"Cinza"}]},
  {id:"base-sommier-pro-forca", name:"Base Sommier Pró Força", category:"bases",
   desc:"Base resistente e firme, parceira ideal dos colchões Pró Força.",
   price:729, priceNote:"Casal", images:[{url:"base-sommier-pro-forca.jpg", label:"Padrão"}]},
  {id:"base-sommier-liberty", name:"Base Sommier Liberty", category:"bases",
   desc:"Base com tecido sustentável, mesma linha do colchão Liberty.",
   price:829, priceNote:"Casal", images:[{url:"base-sommier-liberty.jpg", label:"Padrão"}]},
  {id:"base-sommier-bellona", name:"Base Sommier Bellona", category:"bases",
   desc:"Base sofisticada, combina com o colchão Bellona.",
   price:1119, priceNote:"Casal", images:[{url:"base-sommier-bellona.jpg", label:"Padrão"}]},
  {id:"base-sommier-bau-fashion-nobuck", name:"Base Sommier Baú Fashion Nobuck", category:"bases",
   desc:"Base com baú, acabamento em nobuck.",
   price:2799, priceNote:"Casal", images:[{url:"base-sommier-bau-fashion-nobuck-brown.jpg", label:"Marrom"}, {url:"base-sommier-bau-fashion-nobuck-gray.jpg", label:"Cinza"}, {url:"base-sommier-bau-fashion-nobuck-black.jpg", label:"Preto"}, {url:"base-sommier-bau-fashion-nobuck-cream.jpg", label:"Creme"}]},
  {id:"base-sommier-orthopur", name:"Base Sommier Orthopur", category:"bases",
   desc:"Base parceira do colchão Orthopur, mesmo padrão de qualidade.",
   price:829, priceNote:"Casal", images:[{url:"base-sommier-orthopur.jpg", label:"Padrão"}]},
  {id:"base-sommier-bau", name:"Base Sommier Baú", category:"bases",
   desc:"Base com baú para guardar roupa de cama, acabamento em linho.",
   price:null, images:[{url:"base-sommier-bau-black.jpg", label:"Preto"}, {url:"base-sommier-bau-gray.jpg", label:"Cinza"}, {url:"base-sommier-bau-brown.jpg", label:"Marrom"}, {url:"base-sommier-bau-cream.jpg", label:"Creme"}]},
  {id:"base-sommier-bau-bi-cori", name:"Base Sommier Baú Bipartido Cori", category:"bases",
   desc:"Base com baú bipartido (2 partes independentes), revestimento Cori.",
   price:null, images:[{url:"base-sommier-bau-bi-cori-black.jpg", label:"Preto"}, {url:"base-sommier-bau-bi-cori-gray.jpg", label:"Cinza"}, {url:"base-sommier-bau-bi-cori-white.jpg", label:"Branco"}, {url:"base-sommier-bau-bi-cori-cream.jpg", label:"Creme"}, {url:"base-sommier-bau-bi-cori-brown.jpg", label:"Marrom"}]},
  {id:"base-sommier-bau-bi-nobuck", name:"Base Sommier Baú Bipartido Nobuck", category:"bases",
   desc:"Base com baú bipartido, acabamento em nobuck.",
   price:null, images:[{url:"base-sommier-bau-bi-nobuck-gray.jpg", label:"Cinza"}, {url:"base-sommier-bau-bi-nobuck-black.jpg", label:"Preto"}, {url:"base-sommier-bau-bi-nobuck-cream.jpg", label:"Creme"}]},
  {id:"base-sommier-cori", name:"Base Sommier Cori", category:"bases",
   desc:"Base com acabamento Cori, disponível em várias cores.",
   price:null, images:[{url:"base-sommier-cori-white.jpg", label:"Branco"}, {url:"base-sommier-cori-brown.jpg", label:"Marrom"}, {url:"base-sommier-cori-black.jpg", label:"Preto"}]},
  {id:"base-sommier-ortopedico-premium", name:"Base Sommier Ortopédico Premium", category:"bases",
   desc:"Base reforçada, parceira do colchão Ortopédico Premium.",
   price:null, images:[{url:"base-sommier-ortopedico-premium.jpg", label:"Padrão"}]},
  {id:"base-bau-bipartido", name:"Base Baú Bipartido", category:"bases",
   desc:"Base com baú bipartido, acabamento em corino.",
   price:null, images:[{url:"base-bau-bipartido.jpg", label:"Padrão"}]},

  // ---------- CABECEIRAS ----------
  {id:"cabeceira-cherie", name:"Cabeceira Cherie", category:"cabeceiras",
   desc:"Cabeceira estofada em linho, design clássico acolchoado.",
   price:null, images:[{url:"cabeceira-cherie.jpg", label:"Padrão"}]},
  {id:"cabeceira-glamour", name:"Cabeceira Glamour", category:"cabeceiras",
   desc:"Cabeceira estofada em linho, acabamento sofisticado.",
   price:null, images:[{url:"cabeceira-glamour.jpg", label:"Padrão"}]},

  // ---------- MÓVEIS ----------
  {id:"sofa-cama-malu", name:"Sofá Cama Malu", category:"moveis",
   desc:"Sofá que vira cama de casal — ideal pra apartamentos e quartos de visita.",
   price:null, images:[{url:"sofa-cama-malu.jpg", label:"Padrão"}]},
  {id:"poltrona-massageadora-relax", name:"Poltrona Massageadora Relax", category:"moveis",
   desc:"Poltrona reclinável com massagem, controle multi-funções.",
   price:null, images:[{url:"poltrona-massageadora-relax.jpg", label:"Padrão"}]},
  {id:"poltrona-do-papai", name:"Poltrona do Papai Relaxmedic", category:"moveis",
   desc:"Poltrona reclinável com inclinação de até 135°, design anatômico.",
   price:null, images:[{url:"poltrona-do-papai.jpg", label:"Padrão"}]},

  // ---------- TRAVESSEIROS ----------
  {id:"travesseiro-anatomic-visco", name:"Travesseiro Anatomic Visco", category:"travesseiros",
   desc:"Travesseiro viscoelástico que se molda ao formato da cabeça e pescoço.",
   price:null, images:[{url:"travesseiro-anatomic-visco.jpg", label:"Padrão"}]},
  {id:"travesseiro-corpo-hug", name:"Travesseiro de Corpo Hug", category:"travesseiros",
   desc:"Travesseiro longo de corpo inteiro, ótimo pra gestantes ou lateral.",
   price:null, images:[{url:"travesseiro-corpo-hug.jpg", label:"Padrão"}]},
  {id:"travesseiro-hospitalar", name:"Travesseiro Hospitalar", category:"travesseiros",
   desc:"Travesseiro impermeável, fácil higienização.",
   price:null, images:[{url:"travesseiro-hospitalar.jpg", label:"Padrão"}]},
  {id:"travesseiro-king-premium", name:"Travesseiro King Premium", category:"travesseiros",
   desc:"Travesseiro tamanho king, maior área de apoio.",
   price:null, images:[{url:"travesseiro-king-premium.jpg", label:"Padrão"}]},
  {id:"travesseiro-pluma-ganso", name:"Travesseiro Pluma de Ganso", category:"travesseiros",
   desc:"Travesseiro macio com pluma de ganso, sensação de nuvem.",
   price:null, images:[{url:"travesseiro-pluma-ganso.jpg", label:"Padrão"}]},
  {id:"travesseiro-pro-latex-gel", name:"Travesseiro Pró Látex Gel", category:"travesseiros",
   desc:"Travesseiro em látex com gel, regula a temperatura durante o sono.",
   price:null, images:[{url:"travesseiro-pro-latex-gel.jpg", label:"Padrão"}]},
  {id:"travesseiro-sonho", name:"Travesseiro Sonho", category:"travesseiros",
   desc:"Travesseiro com maior maciez e conforto, entrada da linha Ortobom.",
   price:null, images:[{url:"travesseiro-sonho.jpg", label:"Padrão"}]},
  {id:"travesseiro-royal-pillow", name:"Travesseiro Royal Pillow", category:"travesseiros",
   desc:"Travesseiro premium da linha Royal.",
   price:null, images:[{url:"travesseiro-royal-pillow.jpg", label:"Padrão"}]},
  {id:"travesseiro-viscopur", name:"Travesseiro Viscopur", category:"travesseiros",
   desc:"Travesseiro viscoelástico com certificação de qualidade.",
   price:null, images:[{url:"travesseiro-viscopur.jpg", label:"Padrão"}]},
  {id:"travesseiro-essence-plus", name:"Travesseiro Essence Plus", category:"travesseiros",
   desc:"Travesseiro com toque macio e suporte equilibrado.",
   price:null, images:[{url:"travesseiro-essence-plus.jpg", label:"Padrão"}]},
];

// Categorias do menu, na ordem de exibição, com metadados de cada página
const CATEGORIES = [
  {id:"colchoes", label:"Colchões", page:"colchoes.html"},
  {id:"bases", label:"Bases", page:"bases.html"},
  {id:"cabeceiras", label:"Cabeceiras", page:"cabeceiras.html"},
  {id:"roupas-de-cama", label:"Roupas de Cama", page:"roupas-de-cama.html"},
  {id:"travesseiros", label:"Travesseiros", page:"travesseiros.html"},
  {id:"acessorios", label:"Acessórios", page:"acessorios.html"},
  {id:"moveis", label:"Móveis", page:"moveis.html"},
];

function getProductsByCategory(cat){
  return PRODUCTS.filter(p => p.category === cat);
}

// Primeira imagem do array = foto de capa (usada em cards, busca, relacionados)
function coverImage(p){
  return (p.images && p.images[0]) ? p.images[0].url : 'placeholder.jpg';
}
