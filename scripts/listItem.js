let cart = JSON.parse(localStorage.getItem('cart')) || [];
if (cart.length !== 0) {
    displayCart(); 
}
function displayCart(){
    let cartTable = document.querySelector("#cart-table tbody");
    cartTable.innerHTML = "";
    cart.forEach((item, index) => {
        let row =  `
            <tr>
                <td class="image"></td>
                <td>${item.name}</td>
                <td class="price" >${item.price.toLocaleString("vi-VN")} VNĐ</td>
                <td>
                    <input type="number" value=${item.quantity} min="1" class="quantity" oninput="updateTotal(this,${index})" onblur="validateInput(this, ${index})">
                </td>
                <td class="total">10.000 VNĐ</td>
                <td><button class="delete-btn" onclick="deleteItem(${index})" >Xóa</button></td>
            </tr>
        `;
        cartTable.innerHTML += row;
    });
}
function deleteItem(index) {
    if (index >= 0 && index < cart.length) { 
        cart.splice(index, 1); 
        localStorage.setItem("cart", JSON.stringify(cart)); 
        displayCart();
    }
}
document.addEventListener("DOMContentLoaded", displayCart);