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
            });
        }
        renderProducts();
    }

    function renderProducts() {
        productList.innerHTML = ''; // Xóa nội dung hiện tại
        products.forEach((product, index) => {
            const productDiv = document.createElement('div');
            productDiv.classList.add('product');
            productDiv.innerHTML = `
                <div class="product-img">
                    <img class="hover-scale" src="${product.image}" alt="${product.name}">
                    <div class="info-icon">i</div>
                </div>
                <div class="product-info">
                    <p class="name">${product.name}</p>
                    <p class="price">${product.price}</p>
                    <button class="btn-hover-black-transparent">
                        <i class="ti-shopping-cart"></i>
                    </button>
                </div>
            `;
            productList.appendChild(productDiv);

            // Gắn sự kiện click cho chữ "i"
            const infoIcon = productDiv.querySelector('.info-icon');
            infoIcon.addEventListener('click', () => {
                setProductDetails(index + headIndex); // Cập nhật chỉ số khi gọi setProductDetails
            });
        });

        updateProductDisplay();
    }

    // Hàm lưu thông tin sản phẩm và chuyển trang
    function setProductDetails(index) {
        const product = products[index];
        
        const productData = {
            name: product.name,
            price: product.price,
            weights: product.weights || [],
            image: product.image,
            description: product.description,
            details: product.details || {}
        };
        
        // Lưu thông tin sản phẩm vào localStorage
            localStorage.setItem('product', JSON.stringify(productData));
        // Chuyển trang đến productinfo.html
        window.location.href = 'productinfo.html'; // Đây là dòng chuyển trang
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