const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

// Route Imports
const userRoutes = require('./routes/user');
const bookingRoutes = require('./routes/booking'); // Agar file ka naam routes/booking.js hai toh perfect hai

const app = express();

// ==========================================
// 1. MIDDLEWARES
// ==========================================
app.use(cors()); 
app.use(express.json()); 
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ==========================================
// 2. ROUTES MIDDLEWARES
// ==========================================
app.use('/api/auth', require('./routes/auth'));
app.use('/api/bookings', bookingRoutes); // Booking base path mapped here cleanly
app.use('/api/services', require('./routes/services'));
app.use('/api/user', userRoutes);
app.use('/api/admin', require('./routes/admin'));

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



// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// require('dotenv').config();
// const userRoutes = require('./routes/user');
// const path = require('path');
// const app = express();
// const bookingRoutes = require('./routes/booking');
// // 1. Middlewares

// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// app.use(cors()); 
// app.use(express.json()); // JSON data handle karne ke liye
// app.use('/api/bookings', bookingRoutes); 
// // 2. Database Connection (Updated: No deprecated options)
// mongoose.connect(process.env.MONGO_URI)
//     .then(() => console.log('✅ MongoDB Connect Ho Gaya!'))
//     .catch((err) => console.log('❌ Database Error:', err));

// // 3. Routes
// // Jab hum routes/auth.js file banayenge, tab ye line kaam aayegi
// app.use('/api/auth', require('./routes/auth'));
// app.use('/api/bookings', require('./routes/booking'));
// app.use('/api/services', require('./routes/services'));
// app.use('/api/user', userRoutes);
// app.use('/api/admin', require('./routes/admin'));





// app.get('/', (req, res) => {
//     res.send('Urban Service Backend is Running!');
// });

// // 4. Server Listen
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//     console.log(`🚀 Server running on port ${PORT}`);
// });