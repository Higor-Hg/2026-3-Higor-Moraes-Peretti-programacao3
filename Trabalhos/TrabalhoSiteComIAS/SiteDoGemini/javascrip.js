/* =========================================
   1. SIMULAÇÃO DE BANCO DE DADOS (DATA)
   ========================================= */

const data = {
    marcas: [
        { id: 1, name: 'Adidas', logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/2/20/Adidas_Logo.svg' },
        { id: 2, name: 'Nike', logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/a/a6/Logo_NIKE.svg' },
        { id: 3, name: 'Penalty', logoUrl: 'https://rederemix.com.br/wp-content/uploads/2019/12/logo-penalty.svg' },
        { id: 4, name: 'Puma', logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/8/88/Puma-Logo.png' },
        { id: 5, name: 'Dalebol', logoUrl: 'https://dalebol.com.br/arquivos/dalebol-header-preta.png?v=1680523035' }
    ],
    produtos: [
        {
            id: 1,
            category: 'campo',
            name: 'Dalebol Chromo FIFA Quality Pro',
            brandId: 5,
            price: 599.90,
            discountPrice: 650.00,
            badge: 'LANÇAMENTO',
            imgUrl: 'https://dalebol.com.br/arquivos/ids/156172/Bola-Futebol-de-Campo-Pro-FIFA-Quality---DALEBOL---Laranja--1-.jpg?v=638332152862370000'
        },
        {
            id: 2,
            category: 'futsal',
            name: 'Bola Futsal Max Penalty 1000',
            brandId: 3,
            price: 189.90,
            discountPrice: null,
            badge: 'FIFA BASIC',
            imgUrl: 'https://penalty.vtexassets.com/arquivos/ids/282363-800-800?v=637841961223930000&width=800&height=800&aspect=true'
        },
        {
            id: 3,
            category: 'campo',
            name: 'Adidas Al Rihla (Copa do Mundo)',
            brandId: 1,
            price: 749.90,
            discountPrice: 900.00,
            badge: 'ICÔNICA',
            imgUrl: 'https://adidas.vtexassets.com/arquivos/ids/560824-800-800?v=637843794348630000'
        },
        {
            id: 4,
            category: 'society',
            name: 'Bola Society Nike Elite',
            brandId: 2,
            price: 299.90,
            discountPrice: null,
            badge: null,
            imgUrl: 'https://nike.vtexassets.com/arquivos/ids/636830-800-800'
        },
        {
            id: 5,
            category: 'futsal',
            name: 'Dalebol Chromo Futsal Pró',
            brandId: 5,
            price: 199.90,
            discountPrice: 230.00,
            badge: 'MELHOR CUSTO',
            imgUrl: 'https://dalebol.com.br/arquivos/ids/156162/Bola-Futsal-Pro---DALEBOL---Azul-Claro--1-.jpg?v=638332130311230000'
        }
    ]
};

/* =========================================
   2. DOM ELEMENTS
   ========================================= */
const brandsGrid = document.getElementById('brandsGrid');
const productsGrid = document.getElementById('productsGrid');
const mainSearch = document.getElementById('mainSearch');
const filterPills = document.querySelectorAll('.filter-pill');
const toastContainer = document.getElementById('toastContainer');
const cartCountElement = document.querySelector('.cart-count');

/* =========================================
   3. RENDER FUNCTIONS
   ========================================= */

// Função para formatar moeda
const formatCurrency = (value) => value.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });

// Render Marcas
const renderBrands = () => {
    brandsGrid.innerHTML = data.marcas.map(marca => `
        <div class="brand-card" title="${marca.name}">
            <img src="${marca.logoUrl}" alt="${marca.name} Logo" class="brand-logo-img">
        </div>
    `).join('');
}

// Render Produtos (Card Professional UI)
const renderProducts = (productsList) => {
    productsGrid.innerHTML = productsList.map(p => `
        <article class="product-card" data-category="${p.category}">
            ${p.badge ? `<span class="product-badge">${p.badge}</span>` : ''}
            <div class="product-img-wrap">
                <img src="${p.imgUrl}" alt="${p.name}" class="p-img">
            </div>
            <div class="p-details">
                <span class="p-type">${p.category}</span>
                <h4 class="p-name">${p.name}</h4>
                <div class="p-meta">
                    <div class="p-prices-wrap">
                        ${p.discountPrice ? `<span class="p-price discount">${formatCurrency(p.discountPrice)}</span>` : ''}
                        <span class="p-price">${formatCurrency(p.price)}</span>
                    </div>
                    <button class="btn-compare" data-id="${p.id}" onclick="addToComparison(${p.id})">
                        <i class="ri-scales-3-line"></i> Comparar
                    </button>
                </div>
            </div>
        </article>
    `).join('');
}

/* =========================================
   4. LOGIC & INTERACTION FUNCTIONS
   ========================================= */

// Sistema de Notificação (Toast)
const showToast = (message) => {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<i class="ri-checkbox-circle-line"></i> ${message}`;
    toastContainer.appendChild(toast);
    
    setTimeout(() => {
        toast.style.animation = 'toast-out 0.4s forwards cubic-bezier(0.18, 0.89, 0.32, 1.28)';
        setTimeout(() => toast.remove(), 400); // Remove do DOM após a animação
    }, 2500);
}

// Função simulada de comparação
let comparisonList = [];
window.addToComparison = (productId) => {
    const product = data.produtos.find(p => p.id === productId);
    if(product && !comparisonList.includes(productId)) {
        comparisonList.push(productId);
        showToast(`${product.name} adicionada para comparação.`);
    } else {
        showToast(`Você já está comparando esta bola.`);
    }
}

// Sistema de Filtros (Pills)
filterPills.forEach(pill => {
    pill.addEventListener('click', () => {
        // Altera UI ativa
        document.querySelector('.filter-pill.active').classList.remove('active');
        pill.classList.add('active');

        // Lógica de Filtragem
        const category = pill.getAttribute('data-category');
        if (category === 'all') {
            renderProducts(data.produtos);
        } else {
            const filteredProducts = data.produtos.filter(p => p.category === category);
            renderProducts(filteredProducts);
        }
    });
});

// Busca no Input Principal (Simples)
mainSearch.addEventListener('keyup', (e) => {
    const term = e.target.value.toLowerCase();
    const searchedProducts = data.produtos.filter(p => p.name.toLowerCase().includes(term));
    renderProducts(searchedProducts);
});

/* =========================================
   5. INITIALIZE
   ========================================= */
renderBrands();
renderProducts(data.produtos); // Renderiza todos inicialmente