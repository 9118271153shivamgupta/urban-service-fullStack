const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    username: { 
        type: String, 
        unique: true, 
        sparse: true, 
        trim: true 
    },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    phone: { type: String, default: "" },
    address: { type: String, default: "" },
    city: { type: String, default: "Gorakhpur" },
    pincode: { type: String, default: "" },
    profilePic: { type: String, default: "" },
    
    panCard: { type: String, default: "" },
    aadhaarCard: { type: String, default: "" },
    
    role: { 
        type: String, 
        enum: ['superadmin', 'admin', 'provider', 'customer'], 
        default: 'customer' 
    },

    permissions: {
        canEditService: { type: Boolean, default: false },
        canDeleteUser: { type: Boolean, default: false },
        canManageBookings: { type: Boolean, default: true }
    },

    providerInfo: {
        categories: [{
            category: String,
            categoryName: String,      
            subCategory: String,
            subCategoryName: String,   
            serviceType: { type: String, default: "Standard" },
            serviceTitle: String,
            priceRange: String,
            serviceId: String          
        }], 
        experience: { type: String, default: "" },
        serviceRange: { type: String, default: "Gorakhpur" },
        shopImage: { type: String, default: "" },
        ownerImage: { type: String, default: "" },
        isVerified: { type: Boolean, default: false },
        status: { type: String, enum: ['active', 'inactive'], default: 'active' }
    }
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);