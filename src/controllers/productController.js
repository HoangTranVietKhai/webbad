const { sql, poolPromise } = require('../config/db');

// ✅ Sửa: Hàm lấy TỐI ĐA 10 sản phẩm cho trang chủ hoặc trang nổi bật
const getProducts = async (req, res) => {
    try {
        const pool = await poolPromise;

        const result = await pool.request().query(`
            SELECT TOP 8 * FROM Products ORDER BY Created_at DESC
        `);

        res.json(result.recordset);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

// ✅ Không cần sửa hàm này nếu bạn vẫn muốn trả toàn bộ theo danh mục
const getProductsByCategory = async (req, res) => {
    try {
        const categorySlug = req.params.categorySlug;
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
    getProductsByCategory
};
