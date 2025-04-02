const cartList = document.querySelector('.cart-list');
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let cartLength = 0;

document.querySelectorAll('.add-to-cart').forEach((btn) => {
    btn.addEventListener('click', (event) => {
        const productDiv = event.target.closest('.product');
        console.log(productDiv);
        const productName = productDiv.querySelector('.name').innerText;
        const productPrice = currencyToNumber(productDiv.querySelector('.price').innerText);
        let item = {
            name: productName,
            price: productPrice,
            quantity: 1,
            total: 0
        };
        
        item.total = item.price * item.quantity;

        cart.push(item);
        localStorage.setItem('cart', JSON.stringify(cart));
        const itemDiv = renderItem(item);

        const plusBtn = itemDiv.querySelector('.plus-btn');
        const minusBtn = itemDiv.querySelector('.minus-btn');

        plusBtn.addEventListener('click', () => {
            const q1 = itemDiv.querySelector('.item-quantity').querySelector('.quantity1');
            let quantity = parseInt(q1.innerText) + 1;
            q1.innerText = quantity;
            updateItemValue(itemDiv, quantity);
        });
        
        minusBtn.addEventListener('click', () => {
            const q1 = itemDiv.querySelector('.item-quantity').querySelector('.quantity1');
            let quantity = parseInt(q1.innerText);
            if (quantity > 1) {
                quantity--;
                q1.innerText = quantity;
                updateItemValue(itemDiv, quantity);
            }
        });
        
        cartList.appendChild(itemDiv);
        alert(`${productName} đã được thêm vào giỏ hàng!`);
    });
})

function updateItemValue(itemDiv, quantity) {
    const cartItemInfo = itemDiv.querySelector('.cart-item-info');
    const q2 = cartItemInfo.querySelector('.quantity2');
    q2.innerText = quantity;
    
    const unitPrice = currencyToNumber(cartItemInfo.querySelector('.unit-price').innerText);
    const total = cartItemInfo.querySelector('.total-price');
    total.innerText = formatCurrency(quantity * unitPrice);
}

function formatCurrency(value) {
    return (new Intl.NumberFormat().format(value)).replaceAll(",",".") + " VNĐ";
}

function currencyToNumber(value) {
    return parseInt(value.replaceAll(".",""));
}

function renderItem(item) {
    const itemDiv = document.createElement('div');
    const formattedPrice = formatCurrency(item.price);
    const formattedTotal = formatCurrency(item.total);
    itemDiv.classList.add('cart-item');
    // itemDiv.setAttribute('data-index', cartLength);
    cartLength++;
    itemDiv.innerHTML = `
        <div class="item-quantity">
            <button class="plus-btn">+</button>
            <p class="quantity1">${item.quantity}</p>
            <button class="minus-btn">-</button>
        </div>
        <img src="" alt="">
        <div class="cart-item-info">
            <p class="item-name">${item.name}</p>
            <div class="calculate">
                <span class="unit-price">${formattedPrice}</span>
                x 
                <span class="quantity2">${item.quantity}</span>
            </div>
            <p class="total-price">${formattedTotal}</p>
        </div>
        <button class="remove-btn btn-hover-black-transparent">x</button>
    `;
    // cartList.appendChild(itemDiv);
    return itemDiv;
};


