// ===== server/seeder.js (PHIÊN BẢN CẢI TIẾN) =====

const mongoose = require('mongoose');
const dotenv = require('dotenv');
const products = require('./data/products.js');
const Product = require('./models/productModel.js'); // SỬA Ở ĐÂY: Import model trực tiếp
const User = require('./models/userModel.js'); // Gợi ý: Import cả user và order để xóa dữ liệu cũ
const Order = require('./models/orderModel.js');

// --- BỎ ĐOẠN ĐỊNH NGHĨA LẠI SCHEMA ---
// const productSchema = new mongoose.Schema({ ... });
// const Product = mongoose.model('Product', productSchema);

dotenv.config();

const importData = async () => {
    try {
        await mongoose.connect(process.env.ATLAS_URI);
        console.log('Database connected for seeding...');

        // Xóa hết dữ liệu cũ từ các collection
        await Order.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();

        // Thêm dữ liệu sản phẩm mới
        await Product.insertMany(products);

        // Bạn cũng có thể tạo user mẫu ở đây nếu muốn
        // const createdUsers = await User.insertMany(users);
        // const adminUser = createdUsers[0]._id;
        // const sampleProducts = products.map(p => ({ ...p, user: adminUser }));
        // await Product.insertMany(sampleProducts);

        console.log('Data Imported Successfully!');
        process.exit();
    } catch (error) {
        console.error(`Error with data import: ${error}`);
        process.exit(1);
    }
};

const destroyData = async () => {
    // Thêm một hàm để xóa dữ liệu nếu cần
    try {
        await mongoose.connect(process.env.ATLAS_URI);
        await Order.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();
        console.log('Data Destroyed!');
        process.exit();
    } catch (error) {
        console.error(`Error with data destruction: ${error}`);
        process.exit(1);
    }
};

// Thêm logic để chạy hàm destroy từ command line
if (process.argv[2] === '-d') {
    destroyData();
} else {
    importData();
}