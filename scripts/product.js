const productCounts = [5, 10, 7, 20];
const k = 4; // Số sản phẩm hiển thị cùng một lúc

document.querySelectorAll('.section').forEach((section, index) => {
    const productList = section.querySelector('.product-list');
    const prevBtn = section.querySelector('.prev-btn');
    const nextBtn = section.querySelector('.next-btn');

    let headIndex = 0; // Chỉ số sản phẩm đầu tiên
    let tailIndex = k - 1; // Chỉ số sản phẩm cuối cùng
    let products = []; // Mảng chứa sản phẩm

    function createProducts(n) {
        for (let i = 0; i < n; i++) {
            products.push({
                name: `Bánh tráng phơi sương ${i}`,
                // name: `Bánh tráng phơi sương`,
                price: '10.000đ',
            });
        }
        renderProducts();
    }

    function renderProducts() {
        productList.innerHTML = ''; // Xóa nội dung hiện tại
        products.forEach((product) => {
            const productDiv = document.createElement('div');
            productDiv.classList.add('product');
            productDiv.innerHTML = `
                <div class="product-img"></div>
                <div class="product-info">
                    <p class="name">${product.name}</p>
                    <p class="price">${product.price}</p>
                </div>
            `;
            productList.appendChild(productDiv);
        });

        
        updateProductDisplay();
    }

    function updateProductDisplay() {
        const offset = headIndex * (100 / k); // Tính toán offset để chuyển đổi
        for (let i = 0; i < products.length; i++) {
            const productDiv = productList.children[i];
            if (headIndex <= i && i <= tailIndex) {
                productDiv.classList.remove('hid');
            } else {
                productDiv.classList.add('hid');
            }
        }
        // productList.style.transform = `translateX(-${offset}%)`;
    }

    prevBtn.addEventListener('click', () => {
        if (headIndex > 0) {
            headIndex--;
        } else {
            headIndex = products.length - k;
        }
        tailIndex = headIndex + k - 1;
        updateProductDisplay();
    });

    nextBtn.addEventListener('click', () => {
        if (tailIndex < products.length - 1) {
            headIndex++;
        } else {
            headIndex = 0;
        }
        tailIndex = headIndex + k - 1;
        updateProductDisplay();
    });

    // Gọi hàm để tạo sản phẩm
    createProducts(productCounts[index]); // Thay đổi số lượng sản phẩm ở đây
    // console.log("product count = ", productCounts[index]);
});