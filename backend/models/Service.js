




// models/Service.js
const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
    providerId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: false // 🔥 Perfect! Admin bina iske bhi add kar payega
    },
    name: { 
        type: String, 
        required: true,
        trim: true 
    },
    description: { 
        type: String, 
        required: true 
    },
    price: { 
        type: String, 
        required: true 
    },
    // 🔗 String ki jagah master collections ki IDs map hongi
    serviceType: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'ServiceType', 
        required: true 
    },
    category: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'MainCategory', 
        required: true 
    },
    subCategory: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'SubCategory', 
        required: true // Dropdown data flow se directly single ID bind hogi
    }, 
    tagline: { 
        type: String 
    },
    features: [{ 
        type: String 
    }],
    image: { 
        type: String 
    }
}, { timestamps: true });

module.exports = mongoose.model('Service', serviceSchema);
// const mongoose = require('mongoose');

// const serviceSchema = new mongoose.Schema({
//     name: { type: String, required: true },
//     description: { type: String, required: true },
//     price: { type: String, required: true }, // हमने इसे String रखा है ताकि ₹299 - ₹899 सेव हो सके
//     serviceType: { type: String, required: true },
//     category: { type: String, required: true },
//     subCategory: {
//         type: [String], // Array structure configuration parameter essential for batch updates
//         default: ['General']
//     },
//     tagline: { type: String },
//     features: { type: [String] },
//     isActive: { type: Boolean, default: true }, // Array of strings
//     image: { type: String }
// }, { timestamps: true });

// module.exports = mongoose.model('Service', serviceSchema);