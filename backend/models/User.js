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
    
    // Role Hierarchy
    role: { 
        type: String, 
        enum: ['superadmin', 'admin', 'provider', 'customer'], 
        default: 'customer' 
    },

    // Permissions logic
    permissions: {
        canEditService: { type: Boolean, default: false },
        canDeleteUser: { type: Boolean, default: false },
        canManageBookings: { type: Boolean, default: true }
    },

    // Sahi Nested Provider Structure
    providerInfo: {
        categories: [{
            category: String,
            priceRange: String
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
// const mongoose = require('mongoose');

// const UserSchema = new mongoose.Schema({
//     name: { type: String, required: true },
//     email: { type: String, required: true, unique: true },
//     password: { type: String, required: true },
//     phone: { type: String, default: "" },
//     address: { type: String, default: "" },
//     city: { type: String, default: "" },
//     pincode: { type: String, default: "" },
//     profilePic: { type: String, default: "" },
//     // Update: Specific roles for hierarchy
//     role: { 
//         type: String, 
//         enum: ['superadmin', 'admin', 'provider', 'customer'], 
//         default: 'customer' 
//     },
//     // New: Role-based permissions
//     permissions: {
//         canEditService: { type: Boolean, default: false },
//         canDeleteUser: { type: Boolean, default: false },
//         canManageBookings: { type: Boolean, default: true }
//     }
// }, { timestamps: true });

// module.exports = mongoose.model('User', UserSchema);