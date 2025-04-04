const cartList = document.querySelector('.cart-list');
let cart = JSON.parse(localStorage.getItem('cart')) || [];
updateCartList();

document.querySelectorAll('.add-to-cart').forEach((btn) => {
    btn.addEventListener('click', (event) => {
        const productDiv = event.target.closest('.product');
        const productName = productDiv.querySelector('.name').innerText;
        const productPrice = currencyToNumber(productDiv.querySelector('.price').innerText);
        let item = {
            name: productName,
            price: productPrice,
            quantity: 1,
            total: productPrice
        };

        // Kiểm tra sản phẩm đã có trong giỏ hàng hay chưa
        // Chưa thì thêm vào
        // Đã có thì tăng số lượng
        let index = cart.findIndex(e => e.name === productName);
        if (index != -1) {
            cart[index].quantity++;
            cart[index].total += item.total;
            updateCartList();
        } else {
            cart.push(item);

            const itemDiv = renderItem(item);

            cartList.appendChild(itemDiv);
        }
        
        alert(`${productName} đã được thêm vào giỏ hàng!`);
        localStorage.setItem('cart', JSON.stringify(cart));
        console.log("after push: ", cart);
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

function updateCartList() {
    cartList.innerHTML = '';
    cart.forEach((item) => {
        cartList.appendChild(renderItem(item));
    });
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
                <span class="quantity2">${item.quantity}</span>
            </div>
            <p class="total-price">${formattedTotal}</p>
        </div>
        <button class="remove-btn btn-hover-black-transparent">x</button>
    `;

    const plusBtn = itemDiv.querySelector('.plus-btn');
    const minusBtn = itemDiv.querySelector('.minus-btn');
    const removeBtn = itemDiv.querySelector('.remove-btn');
    const index = cart.findIndex(e => e.name === item.name);

    plusBtn.addEventListener('click', () => {
        const q1 = itemDiv.querySelector('.item-quantity').querySelector('.quantity1');
        let quantity = parseInt(q1.innerText) + 1;
        q1.innerText = quantity;
        updateItemValue(itemDiv, quantity);

        cart[index].quantity = quantity;
        cart[index].total = quantity * cart[index].price;
        localStorage.setItem('cart', JSON.stringify(cart));
        console.log("after plus: ", cart);
    });
    
    minusBtn.addEventListener('click', () => {
        const q1 = itemDiv.querySelector('.item-quantity').querySelector('.quantity1');
        let quantity = parseInt(q1.innerText);
        if (quantity > 1) {
            quantity--;
            q1.innerText = quantity;
            updateItemValue(itemDiv, quantity);

            cart[index].quantity = quantity;
            cart[index].total = quantity * cart[index].price;
            localStorage.setItem('cart', JSON.stringify(cart));
            console.log("after minus: ", cart);
        }
    });
    
    removeBtn.addEventListener('click', () => {
        cartList.removeChild(itemDiv);
        if (index != -1) {
            cart.splice(index, 1);
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        console.log("after remove: ", cart);
    });
    return itemDiv;
};


