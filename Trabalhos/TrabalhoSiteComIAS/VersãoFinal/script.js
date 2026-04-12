// script.js - Funcionalidades do SpotBall

document.addEventListener('DOMContentLoaded', function() {
  
  // 1. Duplicar conteúdo da barra animada para rolagem infinita
  const textoRolante = document.querySelector('.texto-rolante');
  if (textoRolante) {
    textoRolante.innerHTML += textoRolante.innerHTML;
  }

  // 2. Funcionalidade da barra de pesquisa
  const btnBuscar = document.querySelector('.barra-pesquisa button');
  const inputPesquisa = document.querySelector('.barra-pesquisa input');
  
  btnBuscar.addEventListener('click', function() {
    const termo = inputPesquisa.value.trim();
    if (termo) {
      alert(`🔍 Pesquisando por: "${termo}"\n\nResultados filtrados apareceriam aqui.`);
    } else {
      alert('Por favor, digite algo para pesquisar.');
    }
  });

  inputPesquisa.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
      btnBuscar.click();
    }
  });

  // 3. Filtros da sidebar (simulação)
  const filtroEsporte = document.getElementById('filtroEsporte');
  const filtroPreco = document.getElementById('filtroPreco');
  const filtroMarca = document.getElementById('filtroMarca');
  
  function aplicarFiltros() {
    const esporte = filtroEsporte.value;
    const preco = filtroPreco.value;
    const marca = filtroMarca.value;
    
    if (esporte !== 'Todos' || preco !== 'Todos' || marca !== 'Todas') {
      console.log(`Filtros aplicados: ${esporte}, ${preco}, ${marca}`);
      // Aqui você pode implementar a lógica real de filtragem
    }
  }
  
  if (filtroEsporte) filtroEsporte.addEventListener('change', aplicarFiltros);
  if (filtroPreco) filtroPreco.addEventListener('change', aplicarFiltros);
  if (filtroMarca) filtroMarca.addEventListener('change', aplicarFiltros);

  // 4. Interatividade dos botões "Ver Detalhes"
  const botoesDetalhes = document.querySelectorAll('.btn-comprar');
  botoesDetalhes.forEach(btn => {
    btn.addEventListener('click', function() {
      const card = this.closest('.card-bola');
      const nomeBola = card.querySelector('h3').textContent;
      alert(`📦 ${nomeBola}\n\nRedirecionando para página de detalhes...`);
    });
  });

  // 5. Botão de promoção
  const btnPromo = document.querySelector('.btn-promo');
  if (btnPromo) {
    btnPromo.addEventListener('click', function() {
      alert('🎉 Oferta especial ativada! Use o cupom SPOTBALL30 para 30% OFF.');
    });
  }

  // 6. Menu lateral - destacar item ativo
  const menuLinks = document.querySelectorAll('.menu-lateral a');
  menuLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      menuLinks.forEach(l => l.parentElement.classList.remove('ativo'));
      this.parentElement.classList.add('ativo');
    });
  });

  // 7. Animação suave ao scroll (para links internos)
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href !== '#') {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  });

  // 8. Contador de visitas (simulação para o rodapé)
  console.log('✅ SpotBall - Site carregado com sucesso!');
  console.log('📊 Wireframe implementado fielmente conforme especificação.');
  
});