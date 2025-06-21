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
        productGridElement.innerHTML = '';

        if (products.length === 0) {
            productGridElement.innerHTML = '<p>Không có sản phẩm nào trong danh mục này.</p>';
            return;
        }

        products.forEach(product => {
            const productCard = document.createElement('div');
            productCard.className = 'product-card';

            // Format giá tiền
            const formattedPrice = new Intl.NumberFormat('vi-VN', {
                style: 'currency',
                currency: 'VND'
            }).format(product.price);

            // Lấy đường dẫn ảnh hoặc ảnh mặc định
            const imageUrl = product.image_url ? `/${product.image_url}` : '/img/placeholder.png';

            // Tạo HTML sản phẩm
            productCard.innerHTML = `
                <img src="${imageUrl}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p class="price">${formattedPrice}</p>
            `;

            productGridElement.appendChild(productCard);
        });

    } catch (error) {
        console.error('Lỗi khi lấy dữ liệu sản phẩm:', error);
        productGridElement.innerHTML = '<p>Không thể tải danh sách sản phẩm. Vui lòng kiểm tra lại kết nối hoặc liên hệ quản trị viên.</p>';
    }
}
