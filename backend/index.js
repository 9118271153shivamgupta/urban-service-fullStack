const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();
const authRoutes = require('./routes/auth');

// Route Imports
const userRoutes = require('./routes/user');
const bookingRoutes = require('./routes/booking'); 

const app = express();

// ==========================================
// 1. MIDDLEWARES
// ==========================================
app.use(cors()); 
app.use(express.json()); 
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/api/auth', authRoutes);

// ==========================================
// 2. ROUTES MIDDLEWARES
// ==========================================
app.use('/api/auth', require('./routes/auth'));
app.use('/api/bookings', bookingRoutes); 
app.use('/api/services', require('./routes/services'));
app.use('/api/user', userRoutes);
app.use('/api/admin', require('./routes/admin'));

// 🔥 FIX: Yeh line add kijiye master routes ko bind karne ke liye!
app.use('/api/master', require('./routes/masterRoutes'));

// Base Route
app.get('/', (req, res) => {
    res.send('Urban Service Backend is Running!');
});

// ==========================================
// 3. DATABASE CONNECTION
// ==========================================
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('✅ MongoDB Connect Ho Gaya!'))
    .catch((err) => console.log('❌ Database Error:', err));

// ==========================================
// 4. SERVER LISTEN
// ==========================================
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});