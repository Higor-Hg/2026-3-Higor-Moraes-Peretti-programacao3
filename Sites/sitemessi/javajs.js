// 1. ROLAGEM SUAVE (SMOOTH SCROLL)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        // Apenas aplica se for um link interno (como #inicio ou #sobre) na página inicial
        if(this.getAttribute('href').startsWith('#')) {
            e.preventDefault();
            const targetID = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetID);

            if(targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, 
                    behavior: 'smooth'
                });
            }
        }
    });
});

// 2. AÇÃO DO FORMULÁRIO DE CONTATO
const contactForm = document.getElementById('contactForm');

if(contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const nome = document.getElementById('nome').value;
        alert(`Sensacional, ${nome}! Sua mensagem foi enviada com sucesso. A história do futebol agradece a sua paixão pelo maior camisa 10! 🐐⚽`);
        contactForm.reset();
    });
}

// 3. EFEITO DE ANIMAÇÃO (FADE-IN)
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('mostrar');
        }
    });
}, {
    threshold: 0.15
});

const elementosAnimados = document.querySelectorAll('.feature-box, .service-box, .testimonial-box, .about-img, .hero-content, .hero-image');

elementosAnimados.forEach((el) => {
    el.classList.add('escondido');
    observer.observe(el);
});