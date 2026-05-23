const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    userName: String,
    serviceName: { type: String, required: true },
    serviceId: { type: mongoose.Schema.Types.ObjectId, ref: 'Service' }, // Yeh add karein taaki hum check kar sakein active service konsi hai
    address: String,
    phone: String,
    date: { type: String, required: true },
    // Status ko enum rakhein taaki dashboard counts sahi aayein
    status: { 
        type: String, 
        enum: ['Pending', 'Accepted', 'Completed', 'Cancelled'], 
        default: 'Pending' 
    }
}, { timestamps: true });

module.exports = mongoose.model('Booking', BookingSchema);






