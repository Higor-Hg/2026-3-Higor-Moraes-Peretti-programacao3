// script.js - SpotBall (versão unificada e otimizada)

document.addEventListener('DOMContentLoaded', () => {

  /* =========================================
     1. LETREIRO / BARRA ANIMADA
  ========================================= */
  const textoRolante = document.querySelector('.texto-rolante');

  if (textoRolante) {
    // duplica conteúdo para efeito infinito
    textoRolante.innerHTML += textoRolante.innerHTML;
  }


  /* =========================================
     2. ANIMAÇÃO DE BOLAS (HERO)
  ========================================= */
  const areaAnimacao = document.getElementById('animation-container');

  if (areaAnimacao) {

    function criarBola() {
      const bola = document.createElement('div');

      bola.style.position = 'absolute';
      bola.style.width = '20px';
      bola.style.height = '20px';
      bola.style.background = '#fff';
      bola.style.borderRadius = '50%';
      bola.style.opacity = '0.6';

      bola.style.left = Math.random() * window.innerWidth + 'px';
      bola.style.top = '-30px';

      areaAnimacao.appendChild(bola);

      let y = -30;
      let velocidade = 2 + Math.random() * 3;

      const queda = setInterval(() => {
        y += velocidade;
        bola.style.top = y + 'px';

        if (y > 400) {
          clearInterval(queda);
          bola.remove();
        }
      }, 20);
    }

    setInterval(criarBola, 800);
  }


  /* =========================================
     3. BARRA DE PESQUISA
  ========================================= */
  const inputBusca = document.querySelector('.search-box input');
  const btnBusca = document.querySelector('.search-box button');

  function realizarBusca() {
    const termo = inputBusca.value.trim();

    if (termo) {
      alert(`🔍 Pesquisando por: "${termo}"`);
    } else {
      inputBusca.focus();
    }
  }

  if (btnBusca && inputBusca) {
    btnBusca.addEventListener('click', realizarBusca);

    inputBusca.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') realizarBusca();
    });
  }


  /* =========================================
     4. FILTROS (SIDEBAR)
  ========================================= */
  const filtros = document.querySelectorAll('.filtros-laterais select');

  filtros.forEach(filtro => {
    filtro.addEventListener('change', () => {
      const valores = [...filtros].map(f => f.value);
      console.log('Filtros:', valores);
    });
  });


  /* =========================================
     5. CARDS DE PRODUTO
  ========================================= */
  const botoesDetalhes = document.querySelectorAll('.card-bola button');

  botoesDetalhes.forEach(btn => {
    btn.addEventListener('click', () => {
      const card = btn.closest('.card-bola');
      const nome = card.querySelector('h3').innerText;

      alert(`📦 ${nome}\nAbrindo detalhes...`);
    });
  });


  /* =========================================
     6. PROMOÇÃO
  ========================================= */
  const btnPromo = document.querySelector('.promo-card button');

  if (btnPromo) {
    btnPromo.addEventListener('click', () => {
      alert('🔥 Promoção ativada! Cupom: SPOTBALL30');
    });
  }


  /* =========================================
     7. MENU LATERAL ATIVO
  ========================================= */
  const menuLinks = document.querySelectorAll('.sidebar-esquerda a');

  menuLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();

      menuLinks.forEach(l => l.classList.remove('ativo'));
      this.classList.add('ativo');
    });
  });


  /* =========================================
     8. SCROLL SUAVE
  ========================================= */
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', function(e) {
      const target = document.querySelector(this.getAttribute('href'));

      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });


  /* =========================================
     FINAL
  ========================================= */
  console.log('✅ SpotBall carregado com sucesso!');
});