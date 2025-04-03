let cart = JSON.parse(localStorage.getItem('cart')) || [];
if (cart.length === 0) {
    console.log("Giỏ hàng rỗng!");
} else {
    console.log("Giỏ hàng hiện tại:", cart);
    displayCart(); 
}
function displayCart(){
    let cartTable = document.querySelector("#cart-table tbody");
    cartTable.innerHTML = "";
    cart.forEach((item, index) => {
        let row =  `
            <tr>
                <td class="text-center"><input type="checkbox" class="item-checkbox"></td>
                        <div class="checkbox"></div></td>
                <td class="image"></td>
                <td>${item.name}</td>
                <td class="price" >${item.price.toLocaleString("vi-VN")} VNĐ</td>
                <td>
                    <input type="number" value=${item.quantity} min="1" class="quantity" oninput="updateTotal(this)">
                </td>
                <td class="total">10.000 VNĐ</td>
                <td><button class="delete-btn" onclick="deleteRow(this)" >Xóa</button></td>
            </tr>
        `;
        cartTable.innerHTML += row;
    });
}
function deleteItem(button) {
    removeFromCart(index); 
    deleteRow(this); 
}
document.addEventListener("DOMContentLoaded", displayCart);