const express = require('express');
require('dotenv').config();

const productRoutes = require('./src/routes/productRoutes');

const app = express();
const path = require('path');
const PORT = process.env.PORT || 3001;

// Middleware để phục vụ các file tĩnh từ thư mục 'public'
app.use(express.static(path.join(__dirname, 'public')));
// Middleware để parse JSON body
app.use(express.json());

// Routes
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

// API Routes
app.use('/api/products', productRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});