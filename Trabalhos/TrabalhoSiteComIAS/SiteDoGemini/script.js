/**
 * Projeto: SpotBall - TDS Programação III (IFSC)
 * Descrição: Script para animações de fundo, letreiro dinâmico e interatividade.
 * Requisitos: HTML5 semântico e arquivos separados[cite: 12, 24].
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. CONFIGURAÇÃO DO LETREIRO DINÂMICO (Marquee)
    // Define as frases que vão passar na barra superior [cite: 18]
    const configurarLetreiro = () => {
        const marqueeContainer = document.querySelector('.marquee');
        const frases = [
            "⚽ Promoção exclusiva: 15% de desconto em bolas de Futsal Nike!",
            "🏀 Novidade: Spalding TF-1000 oficial da liga disponível.",
            "🏐 Frete grátis para todo o estado em compras acima de R$ 250,00.",
            "🎾 Qualidade e precisão: Conheça as novas bolas Wilson Roland Garros.",
            "🏆 SpotBall - A ciência por trás do seu melhor jogo."
        ];
        
        // Injeta o texto no container
        if (marqueeContainer) {
            marqueeContainer.innerText = frases.join(' | ');
        }
    };

    // 2. ANIMAÇÃO DE BOLAS A CAIR (Hero Section)
    // Cria um efeito visual dinâmico sobre a imagem de fundo 'fundo site.jpg'
    const iniciarAnimacaoBolas = () => {
        const animationArea = document.getElementById('animation-container');
        if (!animationArea) return;

        function criarBola() {
            const bola = document.createElement('div');
            
            // Estilização via JS para garantir independência
            bola.style.position = 'absolute';
            bola.style.width = '25px';
            bola.style.height = '25px';
            bola.style.backgroundColor = '#ffffff';
            bola.style.borderRadius = '50%';
            bola.style.opacity = '0.6';
            bola.style.boxShadow = 'inset -3px -3px 6px rgba(0,0,0,0.4)';
            bola.style.pointerEvents = 'none'; // Não interfere nos cliques

            // Posição horizontal aleatória baseada na largura da tela
            const posX = Math.random() * window.innerWidth;
            bola.style.left = `${posX}px`;
            bola.style.top = '-30px';

            animationArea.appendChild(bola);

            // Lógica de queda
            let posicaoY = -30;
            const velocidade = 2 + Math.random() * 3; // Velocidades variadas
            const gravidade = 0.05;
            let movimentoY = velocidade;

            const intervaloQueda = setInterval(() => {
                posicaoY += movimentoY;
                movimentoY += gravidade;
                bola.style.top = `${posicaoY}px`;

                // Remove a bola quando sai da seção hero (aprox. 450px)
                if (posicaoY > 450) {
                    clearInterval(intervaloQueda);
                    bola.remove();
                }
            }, 20);
        }

        // Gera uma nova bola a cada 800ms
        setInterval(criarBola, 800);
    };

    // 3. INTERATIVIDADE DA BARRA DE BUSCA
    const configurarBusca = () => {
        const btnBusca = document.querySelector('.search-box button');
        const inputBusca = document.querySelector('.search-box input');

        if (btnBusca && inputBusca) {
            btnBusca.addEventListener('click', () => {
                const termo = inputBusca.value.trim();
                if (termo !== "") {
                    alert(`A procurar por: ${termo}... (Funcionalidade de backend em breve)`);
                } else {
                    inputBusca.focus();
                }
            });

            // Permite carregar a busca ao pressionar 'Enter'
            inputBusca.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    btnBusca.click();
                }
            });
        }
    };

    // 4. FEEDBACK DOS BOTÕES DE CATEGORIA (Cards)
    const configurarCards = () => {
        const cards = document.querySelectorAll('.card');
        cards.forEach(card => {
            card.addEventListener('click', () => {
                const categoria = card.querySelector('p').innerText;
                console.log(`Categoria selecionada: ${categoria}`);
                // Aqui poderia ser feito um filtro real de produtos
            });
        });
    };

    // INICIALIZAÇÃO DE TODAS AS FUNÇÕES
    configurarLetreiro();
    iniciarAnimacaoBolas();
    configurarBusca();
    configurarCards();
});