// src/controllers/productController.js

const { sql, poolPromise } = require('../config/db');

// Hàm này để lấy TẤT CẢ sản phẩm (dùng cho trang san-pham.html)
const getProducts = async (req, res) => {
    try {
        const pool = await poolPromise;
        const result = await pool.request().query('SELECT * FROM Products');
        res.json(result.recordset);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

// MỚI: Hàm này để lấy sản phẩm THEO DANH MỤC
const getProductsByCategory = async (req, res) => {
    try {
        const categorySlug = req.params.categorySlug; // Lấy slug từ URL
        const pool = await poolPromise;

        const result = await pool.request()
            .input('categorySlug', sql.NVarChar, categorySlug)
            .query(`
                SELECT p.* FROM Products p
                INNER JOIN Categories c ON p.CategoryID = c.CategoryID
                WHERE c.CategorySlug = @categorySlug
            `);
            
        res.json(result.recordset);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

module.exports = {
    getProducts,
    getProductsByCategory // Xuất hàm mới
};