// script.js

document.addEventListener('DOMContentLoaded', function () {

    // --- PHẦN LOGIC HIỂN THỊ SẢN PHẨM ĐỘNG ---
    const mainElement = document.querySelector('main');
    const productGrid = document.querySelector('.product-grid');

    // Chỉ chạy hàm fetch nếu tìm thấy thẻ main và .product-grid
    if (mainElement && productGrid) {
        const apiEndpoint = mainElement.getAttribute('data-api-endpoint');
        if (apiEndpoint) {
            fetchAndDisplayProducts(apiEndpoint, productGrid);
        }
    }

    // --- CÁC CHỨC NĂNG KHÁC ---

    // Xử lý khi nhấn nút tìm kiếm
    const searchButton = document.querySelector('.search-bar button');
    if (searchButton) {
        searchButton.addEventListener('click', function () {
            const searchTerm = document.querySelector('.search-bar input').value;
            if (searchTerm) {
                alert('Bạn đang tìm kiếm: ' + searchTerm);
                // Nâng cao: window.location.href = '/search?q=' + searchTerm;
            }
        });
    }

    // Xử lý form đăng ký nhận tin
    const subscribeForm = document.querySelector('.subscribe-form');
    if (subscribeForm) {
        subscribeForm.addEventListener('submit', function (event) {
            event.preventDefault();
            const emailInput = document.querySelector('.subscribe-form input');
            const email = emailInput.value;
            if (email) {
                alert('Cảm ơn bạn đã đăng ký với email: ' + email);
                emailInput.value = '';
            } else {
                alert('Vui lòng nhập email của bạn.');
            }
        });
    }

    console.log("Trang web Khải Hoàng đã được tải xong!");
});


/**
 * Hàm gọi API và hiển thị sản phẩm ra màn hình
 * @param {string} apiEndpoint - Đường dẫn API cần gọi (ví dụ: '/api/products')
 * @param {HTMLElement} productGridElement - Phần tử div.product-grid để chèn sản phẩm vào
 */
async function fetchAndDisplayProducts(apiEndpoint, productGridElement) {
    try {
        const response = await fetch(apiEndpoint);
        if (!response.ok) {
            throw new Error(`Network response was not ok. Status: ${response.status}`);
        }
        const products = await response.json();

        // Xóa nội dung cũ (ví dụ: chữ "Loading...")
        productGridElement.innerHTML = '';

        if (products.length === 0) {
            productGridElement.innerHTML = '<p>Không có sản phẩm nào trong danh mục này.</p>';
            return;
        }

        products.forEach(product => {
            const productCard = document.createElement('div');
            productCard.className = 'product-card';

            // Format giá tiền cho đẹp
            const formattedPrice = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.Price);

            // Chú ý: đường dẫn ảnh cần được cấu hình đúng
            // Nếu bạn lưu ảnh trong public/images, thì đường dẫn sẽ là 'images/ten-anh.png'
            const imageUrl = product.ImageUrl || '/img/placeholder.png'; // Dùng ảnh mặc định nếu không có ảnh

            productCard.innerHTML = `
                <img src="${imageUrl}" alt="${product.ProductName}">
                <h3>${product.ProductName}</h3>
                <p class="price">${formattedPrice}</p>
            `;
            productGridElement.appendChild(productCard);
        });

    } catch (error) {
        console.error('Lỗi khi lấy dữ liệu sản phẩm:', error);
        productGridElement.innerHTML = '<p>Không thể tải danh sách sản phẩm. Vui lòng kiểm tra lại kết nối hoặc liên hệ quản trị viên.</p>';
    }
}