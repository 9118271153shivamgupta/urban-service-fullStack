const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: String, required: true }, // हमने इसे String रखा है ताकि ₹299 - ₹899 सेव हो सके
    category: { type: String, required: true },
    subCategory: { type: String },
    tagline: { type: String },
    features: { type: [String] },
    isActive: { type: Boolean, default: true }, // Array of strings
    image: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Service', serviceSchema);