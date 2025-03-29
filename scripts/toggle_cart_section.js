const cartBtn = document.querySelector('.cart-btn');
const cartSection = document.querySelector('.cart-side-section');
const closeBtn = document.querySelector('.close-cart-btn');
const overlay = document.querySelector('.overlay');
const body = document.body;

function showCartSection() {
    cartSection.style.transform = 'translateX(0)';
    overlay.style.display = 'block';
    body.classList.add('no-scroll');
}

function closeCartSection() {
    cartSection.style.transform = 'translateX(100%)';
    overlay.style.display = 'none';
    body.classList.remove('no-scroll');
}

cartBtn.addEventListener('click', showCartSection);

closeBtn.addEventListener('click', closeCartSection);

overlay.addEventListener('click', closeCartSection);

