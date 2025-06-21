// src/routes/productRoutes.js

const express = require('express');
const router = express.Router();
// Lấy cả hai hàm từ controller
const { getProducts, getProductsByCategory } = require('../controllers/productController');

// Route này phải được đặt TRƯỚC route '/' để nó ưu tiên khớp
// Ví dụ: /api/products/category/vot-cau-long
router.get('/category/:categorySlug', getProductsByCategory);

// Route để lấy tất cả sản phẩm
// Ví dụ: /api/products
router.get('/', getProducts);

module.exports = router;