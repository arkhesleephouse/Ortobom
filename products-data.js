// ===================================================================
// BANCO DE PRODUTOS ORTOBOM T-7
// Cada produto: id, name, category, line (quando aplicável), price,
// priceNote, image, desc, keywords (termos extras pra busca)
// Categorias vazias (bases, cabeceiras, roupas-de-cama, travesseiros,
// moveis) ainda não têm produtos reais cadastrados — telas "em breve".
// ===================================================================

const PRODUCTS = [
  // ---------- COLCHÕES · LINHA OURO ----------
  {id:"orion", name:"Orion", category:"colchoes", line:"Linha Ouro",
   desc:"Espuma HR de alta resiliência com tecido antiviral V-Protect.",
   price:4499, priceNote:"Casal", image:"orion.jpg"},
  {id:"bellona", name:"Bellona", category:"colchoes", line:"Linha Ouro",
   desc:"Malha Belga com Pillow Top viscoelástico. Nobreza e sofisticação.",
   price:3599, priceNote:"Casal", image:"bellona.jpg"},
  {id:"orthopur", name:"Orthopur", category:"colchoes", line:"Linha Ouro",
   desc:"Tecnologia Fresh Touch — frescor imediato em qualquer noite.",
   price:4899, priceNote:"Casal", image:"orthopur.jpg"},
  {id:"liberty", name:"Liberty", category:"colchoes", line:"Linha Ouro",
   desc:"Fibra sustentável feita de garrafas PET recicladas.",
   price:3199, priceNote:"Casal", image:"liberty.jpg"},
  {id:"pro-forca", name:"Pró Força", category:"colchoes", line:"Linha Ouro",
   desc:"Estrutura resistente com espuma sustentável certificada.",
   price:null, image:"pro-forca.jpg"},
  {id:"absolut-hybrid", name:"Absolut Hybrid", category:"colchoes", line:"Linha Ouro",
   desc:"Dupla face — um lado firme, outro macio. Você escolhe.",
   price:3299, priceNote:"Casal", image:"absolut-hybrid.jpg"},
  {id:"ouro-spring", name:"Ouro Spring", category:"colchoes", line:"Linha Ouro",
   desc:"Molas de fio contínuo com resistência progressiva.",
   price:2719, priceNote:"Casal", image:"ouro-spring.jpg"},
  {id:"ortopedico-premium", name:"Ortopédico Premium", category:"colchoes", line:"Linha Ouro",
   desc:"Estrutura em madeira de reflorestamento, firmeza máxima.",
   price:2749, priceNote:"Casal", image:"ortopedico-premium.jpg"},

  // ---------- COLCHÕES · PRÓ SAÚDE ----------
  {id:"only", name:"Only", category:"colchoes", line:"Pró Saúde",
   desc:"Embalado a vácuo — cabe em elevador, sem precisar de caminhão.",
   price:3749, priceNote:"Casal", image:"only.jpg"},
  {id:"pic-go", name:"PIC-GO", category:"colchoes", line:"Pró Saúde",
   desc:"Compactado, leve e prático — ideal pra mudança e apartamento.",
   price:null, image:"pic-go.jpg"},
  {id:"pro-saude-visco-adapt", name:"Pró Saúde Visco Adapt", category:"colchoes", line:"Pró Saúde",
   desc:"Camada viscoelástica que molda o formato do corpo.",
   price:3119, priceNote:"Casal", image:"pro-saude-visco-adapt.jpg"},
  {id:"pro-saude-superpocket", name:"Pró Saúde Superpocket", category:"colchoes", line:"Pró Saúde",
   desc:"Molas ensacadas individualmente — conforto sem transferir movimento.",
   price:1169, priceNote:"Solteiro", image:"pro-saude-superpocket.jpg"},
  {id:"pro-saude-nanolastic", name:"Pró Saúde Nanolastic", category:"colchoes", line:"Pró Saúde",
   desc:"Molas bicônicas com resistência progressiva ao peso.",
   price:1499, priceNote:"Casal", image:"pro-saude-nanolastic.jpg"},
  {id:"pro-saude-extra-firme", name:"Pró Saúde Extra Firme", category:"colchoes", line:"Pró Saúde",
   desc:"Sustentação extra pra quem prefere firmeza.",
   price:2199, priceNote:"Casal", image:"pro-saude-extra-firme.jpg"},
  {id:"pro-saude-ortopedico", name:"Pró Saúde Ortopédico", category:"colchoes", line:"Pró Saúde",
   desc:"Estrutura em madeira tratada, ecologicamente correta.",
   price:1619, priceNote:"Casal", image:"pro-saude-ortopedico.jpg"},
  {id:"baby-pro-saude", name:"Baby Pró Saúde", category:"colchoes", line:"Pró Saúde",
   desc:"Tratamento Actguard contra ácaros e bactérias — feito pro bebê.",
   price:409, priceNote:"Infantil", image:"baby-pro-saude.jpg"},

  // ---------- COLCHÕES · FASHION ----------
  {id:"fashion-superpocket", name:"Fashion Superpocket", category:"colchoes", line:"Fashion",
   desc:"Mini-molas ensacadas com lâmina 100% EPS.",
   price:1339, priceNote:"Casal", image:"fashion-superpocket.jpg"},
  {id:"fashion-nanolastic", name:"Fashion Nanolastic", category:"colchoes", line:"Fashion",
   desc:"Molas bicônicas resistentes, ótimo custo-benefício.",
   price:1119, priceNote:"Casal", image:"fashion-nanolastic.jpg"},
  {id:"fashion-firm", name:"Fashion Firm", category:"colchoes", line:"Fashion",
   desc:"Firmeza equilibrada com reforço lateral em PU.",
   price:749, priceNote:"Casal", image:"fashion-firm.jpg"},
  {id:"fashion-confortavel", name:"Fashion Confortável", category:"colchoes", line:"Fashion",
   desc:"Conforto acessível pra quem está montando a casa.",
   price:969, priceNote:"Casal", image:"fashion-confortavel.jpg"},
  {id:"fashion-standard", name:"Fashion Standard", category:"colchoes", line:"Fashion",
   desc:"Entrada Ortobom com a qualidade que a marca garante.",
   price:579, priceNote:"Casal", image:"fashion-standard.jpg"},
  {id:"colchonete-all-day", name:"Colchonete All Day", category:"colchoes", line:"Fashion",
   desc:"Solução prática pra quarto extra ou uso ocasional.",
   price:429, priceNote:"Casal", image:"colchonete-all-day.jpg"},

  // ---------- ACESSÓRIOS · PILLOW TOP ----------
  {id:"pillow-top-hr-gel", name:"Pillow Top HR Gel", category:"acessorios", line:"Pillow Top",
   desc:"Espuma com gel azul — regula a temperatura durante o sono.",
   price:719, priceNote:"Casal", image:"pillow-top-hr-gel.jpg"},
  {id:"pillow-top-ultra", name:"Pillow Top Ultra", category:"acessorios", line:"Pillow Top",
   desc:"Algodão 200 fios com espuma Comfort Cel de alta resiliência.",
   price:null, image:"pillow-top-ultra.jpg"},
  {id:"pillow-top-percal", name:"Pillow Top Percal", category:"acessorios", line:"Pillow Top",
   desc:"Fibra siliconada, dupla face — dois níveis de conforto num só.",
   price:null, image:"pillow-top-percal.jpg"},
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
