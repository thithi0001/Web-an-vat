document.addEventListener("DOMContentLoaded", function () {
    updateGrandTotal(); // Cập nhật tổng tiền khi trang load

    // Hàm cập nhật tổng tiền của từng hàng
    function updateTotal(input) {
        let row = input.closest("tr"); 
        let price = parseInt(row.querySelector(".price").innerText.replace(/\D/g, '')) || 0; 
        let quantity = parseInt(input.value); 
        let totalCell = row.querySelector(".total"); 

        let totalPrice = price * quantity;
        totalCell.textContent = totalPrice.toLocaleString("vi-VN") + " VNĐ";

        updateGrandTotal(); // Cập nhật tổng tiền của giỏ hàng
    }

    // Hàm cập nhật tổng giá trị giỏ hàng
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


    window.updateTotal = updateTotal;
    window.updateGrandTotal = updateGrandTotal;
    window.deleteRow = deleteRow;
});