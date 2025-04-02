document.addEventListener("DOMContentLoaded", function () {
    // **Giả lập dữ liệu sản phẩm trực tiếp trong file JavaScript**
    const productData = {
        name: "Bánh tráng phơi sương",
        price: 20000,
        weights: [
            { value: "100g", display: "Bịch 100g" },
            { value: "200g", display: "Bịch 200g" },
            { value: "500g", display: "Hộp 500g" }
        ],
        image: "./assets/img/banh-trang-phoi-suong.png", // Đường dẫn ảnh sản phẩm
        description: "Bánh tráng phơi sương mềm dẻo với bơ béo ngậy và hành phi thơm lừng.", // Mô tả sản phẩm
        details: {
            "Loại": "Bánh tráng phơi sương",
            "Năng lượng": "250 kcal/100g",
            "Lưu ý": "Không bảo quản nơi ẩm ướt",
            "Phù hợp": "Mọi lứa tuổi",
            "Hạn sử dụng": "6 tháng",
            "Thương hiệu": "Ăn Vặt 3 Miền",
            "Nơi sản xuất": "Việt Nam",
            "Bảo quản": "Nơi khô ráo, thoáng mát",
            "Thành phần": "Bánh tráng, bơ, hành phi, muối, ớt"
        }
    };

    // Các phần tử HTML cần cập nhật
    const quantityInput = document.getElementById("quantity");
    const cartButton = document.getElementById("add-to-cart");
    const increaseButton = document.getElementById("increase");
    const decreaseButton = document.getElementById("decrease");
    const productDetailsTableBody = document.querySelector(".details-table tbody");
    const weightOptionsList = document.getElementById("weight-options");
    const selectedWeightDisplay = document.getElementById("selected-weight-display");
    const productNameElement = document.getElementById("product-name");
    const productPriceElement = document.getElementById("product-price");
    const productImageElement = document.getElementById("product-image");
    const productDescriptionElement = document.getElementById("product-description");

    // Hiển thị thông tin sản phẩm ban đầu
    productNameElement.textContent = productData.name;
    productPriceElement.textContent = productData.price.toLocaleString() + "₫";
    productImageElement.src = productData.image;
    productDescriptionElement.textContent = productData.description; // Hiển thị mô tả sản phẩm từ dữ liệu JS
    quantityInput.textContent = 0; // Khởi tạo số lượng mặc định là 0
    selectedWeightDisplay.textContent = productData.weights[0].display;

    // Thêm các tùy chọn weight vào danh sách
    productData.weights.forEach(weightOption => {
        const li = document.createElement("li");
        li.textContent = weightOption.display;
        li.dataset.value = weightOption.value;
        weightOptionsList.appendChild(li);

        li.addEventListener('click', function() {
            selectedWeightDisplay.textContent = this.textContent;
            selectedWeight = this.dataset.value;
            weightOptionsList.style.display = 'none';
        });
    });

    // Ẩn danh sách weight theo mặc định
    weightOptionsList.style.display = 'none';

    // Hiển thị/ẩn danh sách weight khi nhấp vào phần hiển thị weight
    selectedWeightDisplay.addEventListener('click', function() {
        weightOptionsList.style.display = weightOptionsList.style.display === 'block' ? 'none' : 'block';
    });

    // Hiển thị chi tiết sản phẩm trong bảng
    for (const key in productData.details) {
        if (productData.details.hasOwnProperty(key)) {
            const row = productDetailsTableBody.insertRow();
            const cellKey = row.insertCell();
            const cellValue = row.insertCell();
            cellKey.textContent = key;
            cellValue.textContent = productData.details[key];
        }
    }

    // Cập nhật số lượng sản phẩm
    let quantity = 0;
    function updateQuantity(newQuantity) {
        quantity = Math.max(0, Math.min(100, parseInt(newQuantity)));
        quantityInput.textContent = quantity;
    }

    // Xử lý tăng số lượng sản phẩm
    increaseButton.addEventListener("click", function () {
        updateQuantity(quantity + 1);
    });

    // Xử lý giảm số lượng sản phẩm
    decreaseButton.addEventListener("click", function () {
        updateQuantity(quantity - 1);
    });

    // Xử lý nhập số lượng từ bàn phím
    quantityInput.addEventListener("input", function () {
        updateQuantity(this.textContent);
    });

    // Ngăn chặn việc nhập ký tự không phải số
    quantityInput.addEventListener("keydown", function (event) {
        const allowedKeys = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight'];
        if (allowedKeys.includes(event.key) ||
            (event.key >= '0' && event.key <= '9')) {
            return;
        }
        event.preventDefault();
    });

    // Xử lý thêm sản phẩm vào giỏ hàng
    cartButton.addEventListener("click", function () {
        if (quantity > 0) {
            let cart = JSON.parse(localStorage.getItem("cart")) || [];
            cart.push({
                name: productData.name,
                price: productData.price,
                weight: productData.weights.find(w => w.value === selectedWeight).display,
                quantity: quantity,
                image: productData.image
            });
            localStorage.setItem("cart", JSON.stringify(cart));
            alert("Đã thêm vào giỏ hàng!");
        } else {
            alert("Vui lòng chọn số lượng sản phẩm!");
        }
    });
});
