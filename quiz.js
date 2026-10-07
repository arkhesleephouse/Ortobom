// Teste de perfil de sono — Ortobom T-7
// As indicações usam só o que o catálogo oficial diz de cada colchão (products-data.js).
(function(){
  const root = document.getElementById('qz');
  if (!root) return;

  const Q = [
    { id:'sensacao', t:'Que sensação você quer ao deitar?', h:'Não existe certo ou errado: é uma questão de preferência.',
      o:[ ['firme','Firme, com bastante sustentação'],
          ['macio','Macio, que acomoda o corpo'],
          ['equilibrado','Equilibrado, nem firme nem macio'],
          ['duplo','Ainda não sei','Quero poder escolher depois de testar'] ] },
    { id:'posicao', t:'Em que posição você mais dorme?', h:'Essa resposta vai junto na mensagem, para o consultor te atender melhor.',
      o:[ ['de lado','De lado'],
          ['de barriga para cima','De barriga para cima'],
          ['de barriga para baixo','De barriga para baixo'],
          ['mudo de posição a noite toda','Mudo de posição a noite toda'] ] },
    { id:'calor', t:'Você costuma sentir calor para dormir?', h:'',
      o:[ ['sim','Sim, acordo com calor'], ['nao','Não, isso não me incomoda'] ] },
    { id:'quem', t:'Quem vai dormir nesse colchão?', h:'',
      o:[ ['sozinho','Só eu'],
          ['casal','Eu e mais uma pessoa'],
          ['bebe','Um bebê ou criança pequena'] ] },
    { id:'linha', t:'Que tipo de colchão você procura?', h:'Cada linha tem um perfil. Você pode ver as três na loja.',
      o:[ ['ouro','Linha Ouro','A linha topo de linha da Ortobom'],
          ['saude','Linha Pró Saúde','Tecnologias como molas ensacadas e viscoelástico'],
          ['fashion','Linha Fashion','Para quem quer entrar na Ortobom com qualidade'],
          ['nsei','Não sei, me indique'] ] }
  ];

  // [sensação][linha] -> id do produto
  const MAP = {
    firme:      { ouro:'ortopedico-premium', saude:'pro-saude-extra-firme', fashion:'fashion-firm' },
    macio:      { ouro:'bellona',            saude:'pro-saude-visco-adapt', fashion:'fashion-confortavel' },
    equilibrado:{ ouro:'orion',              saude:'pro-saude-nanolastic',  fashion:'fashion-nanolastic' }
  };
  const FAIXA = { ouro:'Linha Ouro', saude:'Linha Pró Saúde', fashion:'Linha Fashion', nsei:'sem preferência de linha' };

  const byId = id => PRODUCTS.find(p => p.id === id);
  let step = 0, ans = {};

  function progress(){
    return '<div class="qz-progress">' + Q.map((_,i)=>`<i class="${i<=step?'on':''}"></i>`).join('') + '</div>';
  }

  function renderQ(){
    const q = Q[step];
    root.innerHTML = progress() +
      `<div class="qz-step">Pergunta ${step+1} de ${Q.length}</div>
       <h2>${q.t}</h2>${q.h?`<p class="qz-hint">${q.h}</p>`:'<p class="qz-hint"></p>'}
       <div class="qz-opts">` +
      q.o.map(o=>`<button class="qz-o" data-v="${o[0]}">${o[1]}${o[2]?`<small>${o[2]}</small>`:''}</button>`).join('') +
      `</div>` + (step>0?'<button class="qz-back" id="qz-back">← Voltar</button>':'');
    root.querySelectorAll('.qz-o').forEach(b=>b.addEventListener('click',()=>{
      ans[q.id] = b.dataset.v;
      if (step < Q.length-1){ step++; renderQ(); window.scrollTo({top:root.offsetTop-120,behavior:'smooth'}); }
      else renderResult();
    }));
    const back = document.getElementById('qz-back');
    if (back) back.addEventListener('click',()=>{ step--; renderQ(); });
  }

  function pick(){
    const picks = []; // {p, tag}
    const add = (id, tag) => { const p = byId(id); if (p && !picks.some(x=>x.p.id===id)) picks.push({p, tag}); };

    if (ans.quem === 'bebe'){
      add('baby-pro-saude','Para o bebê');
      return picks;
    }
    const linha = (ans.linha === 'nsei') ? 'saude' : ans.linha;
    let sens = ans.sensacao;

    if (sens === 'duplo'){
      if (linha === 'ouro') add('absolut-hybrid','Para quem quer escolher: dupla face');
      sens = 'equilibrado';
    }
    // Casal fora da Linha Ouro e sem preferência por firme: molas ensacadas
    if (ans.quem === 'casal' && linha !== 'ouro' && sens !== 'firme'){
      add(linha === 'fashion' ? 'fashion-superpocket' : 'pro-saude-superpocket','Conforto sem transferir movimento');
    }
    add(MAP[sens][linha], 'Combina com o que você descreveu');
    if (ans.quem === 'casal' && linha === 'ouro') add('pro-saude-superpocket','Opção de molas ensacadas, boa para casal');
    if (ans.calor === 'sim') add('orthopur','Para quem sente calor');
    // Sempre oferece uma segunda opção: a mesma sensação em outra linha
    if (picks.length < 2){
      const outra = linha === 'ouro' ? 'saude' : (linha === 'saude' ? 'ouro' : 'saude');
      const nome = {ouro:'Linha Ouro', saude:'Linha Pró Saúde'}[outra];
      add(MAP[sens][outra], 'Mesma sensação na ' + nome);
    }
    return picks.slice(0,3);
  }

  function renderResult(){
    const picks = pick();
    const nomes = picks.map(x=>x.p.name);
    const resumo = `Sensação: ${ans.sensacao === 'duplo' ? 'ainda não sei' : ans.sensacao}; posição: ${ans.posicao}; calor: ${ans.calor === 'sim' ? 'sim' : 'não'}; quem dorme: ${ans.quem === 'bebe' ? 'bebê/criança' : ans.quem}; linha: ${FAIXA[ans.linha]}.`;
    const msg = `Olá! Fiz o teste de perfil de sono no site da Ortobom T-7.\n${resumo}\nIndicados: ${nomes.join(', ')}.\nPode me ajudar a escolher?`;

    try{
      if (window.gtag) gtag('event','quiz_complete',{ sensacao:ans.sensacao, linha:ans.linha, quem:ans.quem, indicados:nomes.join(', ') });
      if (window.fbq) fbq('trackCustom','QuizComplete');
    }catch(e){}

    root.innerHTML = progress().replace(/<i class="[^"]*">/g,'<i class="on">') +
      `<div class="qz-result">
        <div class="qz-step">Seu resultado</div>
        <h2>${picks.length>1?'Estes colchões combinam com você':'Este colchão combina com você'}</h2>
        <p class="qz-why">Escolhemos pelo que você respondeu. Veja cada modelo e, se quiser, converse com um consultor para testar na loja.</p>
        <div class="qz-cards" id="qz-cards"></div>
        <div class="qz-cta">
          <button class="qz-wa" id="qz-wa"><svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.5 3.5A11.8 11.8 0 0 0 12 0C5.4 0 .1 5.3.1 11.9c0 2.1.5 4.1 1.6 5.9L0 24l6.3-1.6a11.9 11.9 0 0 0 5.7 1.5c6.6 0 11.9-5.3 11.9-11.9 0-3.2-1.2-6.2-3.4-8.5zM12 21.8a9.9 9.9 0 0 1-5-1.4l-.4-.2-3.7 1 1-3.6-.2-.4a9.9 9.9 0 0 1-1.5-5.3C2.2 6.4 6.6 2 12 2c2.6 0 5.1 1 7 2.9a9.8 9.8 0 0 1 2.9 7c0 5.4-4.4 9.9-9.9 9.9zm5.4-7.4c-.3-.1-1.8-.9-2-1s-.5-.1-.7.1-.8 1-1 1.2-.4.2-.7.1a8 8 0 0 1-4-3.5c-.3-.5.3-.5.9-1.6.1-.2 0-.4 0-.5l-.9-2.2c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4s-1 1-1 2.5 1.1 2.9 1.2 3.1c.1.2 2.1 3.2 5.1 4.5 1.9.8 2.6.9 3.5.7.6-.1 1.8-.7 2-1.4s.3-1.3.2-1.4-.3-.2-.6-.3z"/></svg>Falar com um consultor</button>
          <button class="qz-back" id="qz-redo" style="margin:0">Refazer o teste</button>
        </div>
        <p class="qz-note">Consulte condições especiais com nosso consultor. O teste é uma orientação inicial: o melhor colchão é o que você testa deitando.</p>
      </div>`;

    renderProductGrid('qz-cards', picks.map(x=>x.p));
    // etiqueta de motivo em cada card
    document.querySelectorAll('#qz-cards .card').forEach((c,i)=>{
      const tag = document.createElement('span'); tag.className='qz-tag'; tag.textContent = picks[i].tag;
      c.querySelector('.card-body').prepend(tag);
    });
    document.getElementById('qz-wa').addEventListener('click',()=>{
      trackWhatsApp('quiz_resultado');
      window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(withOrigem(msg))}`,'_blank');
    });
    document.getElementById('qz-redo').addEventListener('click',()=>{ step=0; ans={}; renderQ(); });
    window.scrollTo({top:root.offsetTop-120,behavior:'smooth'});
  }

  const pre = new URLSearchParams(location.search).get('s');
  if (['firme','macio','duplo','equilibrado'].includes(pre)){ ans.sensacao = pre; step = 1; }
  renderQ();
})();
