document.addEventListener("DOMContentLoaded", function () {
let cart = JSON.parse(localStorage.getItem('cart')) || [];
updateGrandTotal();
    function updateTotal(input, index) {
        let row = input.closest("tr"); 
        let price = parseInt(row.querySelector(".price").innerText.replace(/\D/g, '')) || 0; 
        let quantity = parseInt(input.value); 
        let totalCell = row.querySelector(".total"); 

        let totalPrice = price * quantity;
        totalCell.textContent = totalPrice.toLocaleString("vi-VN") + " VNĐ";

        cart[index].quantity = quantity;
        cart[index].total = cart[index].price * quantity;
        localStorage.setItem("cart", JSON.stringify(cart));
        updateGrandTotal(); 
    }

    function updateGrandTotal() {
        let grandTotal = 0;
        document.querySelectorAll(".total").forEach(totalCell => {
            grandTotal += parseInt(totalCell.textContent.replace(/\D/g, '')); 
        });
        document.getElementById("grand-total").textContent = grandTotal.toLocaleString("vi-VN") + " VNĐ";
        updateBill();
    }

    function updateBill(){
        let voucher = parseInt(document.getElementById("voucher").innerText.replace(/\D/g, '')) || 0;
        let transFee =parseInt(document.getElementById("transFee").innerText.replace(/\D/g, '')) || 0;
        let grandTotal = parseInt(document.getElementById("grand-total").innerText.replace(/\D/g, '')) || 0;
        let bill =grandTotal - voucher + transFee; 
        document.getElementById("bill").textContent = bill.toLocaleString("vi-VN") + " VNĐ";
    }
    function deleteRow(button) {
        let row = button.closest("tr"); 
        row.remove(); 
        updateGrandTotal(); 
    }
    function validateInput(input, index) {
        let quantity = parseInt(input.value);
    
        if (isNaN(quantity) || quantity < 1) {
            quantity = 1; 
            input.value = 1;
        }
        else{
            updateTotal();
        }
        cart[index].quantity = quantity;
        cart[index].total = cart[index].price * quantity;
        
        localStorage.setItem("cart", JSON.stringify(cart));
        displayCart();
    }

    window.updateTotal = updateTotal;
    window.updateGrandTotal = updateGrandTotal;
    window.deleteRow = deleteRow;
    window.validateInput = validateInput; 

    displayCart();
});

