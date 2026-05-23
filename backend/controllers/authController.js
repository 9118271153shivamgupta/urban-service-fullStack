const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// REGISTER CONTROLLER
// REGISTER CONTROLLER - Updated for object based array layout mapping
// REGISTER CONTROLLER
exports.register = async (req, res) => {
    try {
        const { 
            name, username, email, password, phone, 
            city, pincode, address, role, joiningDate,
            experience, serviceRange
        } = req.body;

        // Check if user already exists
        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ message: "User already exists!" });

        if (username) {
            let existingUsername = await User.findOne({ username });
            if (existingUsername) return res.status(400).json({ message: "Username already taken!" });
        }

        // Password Hashing
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        let userPermissions = {
            canEditService: role === 'superadmin' || role === 'admin',
            canDeleteUser: role === 'superadmin',
            canManageBookings: true
        };

        // Parse categories safely (Frontend handles array parsing)
        let processedCategories = [];
        if (req.body.categories) {
            try {
                // Agar string format me hai to parse karega, nahi to direct use karega
                processedCategories = typeof req.body.categories === 'string' 
                    ? JSON.parse(req.body.categories) 
                    : req.body.categories;
            } catch (e) {
                console.error("Categories parsing error:", e);
                processedCategories = [];
            }
        }

        // Images paths configuration
        const shopImagePath = req.files && req.files['shopImage'] ? req.files['shopImage'][0].path : '';
        const ownerImagePath = req.files && req.files['ownerImage'] ? req.files['ownerImage'][0].path : '';

        // Naya user document object schema layout map karein
        user = new User({
            name,
            username,
            email,
            phone,
            password: hashedPassword,
            city: city || 'Gorakhpur',
            pincode,
            address,
            role: role || 'customer',
            permissions: userPermissions,
            createdAt: joiningDate || new Date(),
            
            // FIXED: Ab data direct schema ke nested block me hit karega 🎯
            providerInfo: {
                categories: processedCategories, 
                experience: experience || "",
                serviceRange: serviceRange || "Gorakhpur",
                shopImage: shopImagePath,
                ownerImage: ownerImagePath,
                isVerified: false,
                status: 'active'
            }
        });

        await user.save();
        res.status(201).json({ message: "User registered successfully!" });

    } catch (error) {
        console.error("Registration Error:", error);
        res.status(500).json({ message: "Server Error during registration" });
    }
};

// LOGIN CONTROLLER - Isko bhi fix kar diya taaki token payload me updated key mile
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) return res.status(401).json({ message: "Invalid Credentials" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ message: "Invalid Credentials" });

        // JWT Token Generation
        const token = jwt.sign(
            { id: user._id, role: user.role }, 
            "YOUR_SECRET_KEY", 
            { expiresIn: '1d' }
        );

        res.json({
            message: "Login successful",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                permissions: user.permissions,
                providerInfo: user.providerInfo // Yeh frontend pe full profile/services bhejega
            }
        });
    } catch (error) {
        res.status(500).json({ message: "Login Error" });
    }
};

// UPDATE PROFILE CONTROLLER
exports.updateProfile = async (req, res) => {
    try {
        const { userId, name, password } = req.body;

        let user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: "User not found" });

        if (name) user.name = name;

        if (password) {
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);
        }

        await user.save();

        res.json({
            message: "Profile updated successfully!",
            user: { id: user._id, name: user.name, email: user.email }
        });

    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
};

// RESET PASSWORD CONTROLLER
exports.resetPassword = async (req, res) => {
    try {
        const { email, newPassword } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: "User not found!" });

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(newPassword, salt);
        await user.save();

        res.json({ message: "Password reset successful! Please login." });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

// // LOGIN CONTROLLER
// exports.login = async (req, res) => {
//     try {
//         const { email, password } = req.body;
//         const user = await User.findOne({ email });

//         if (!user) return res.status(401).json({ message: "Invalid Credentials" });

//         const isMatch = await bcrypt.compare(password, user.password);
//         if (!isMatch) return res.status(401).json({ message: "Invalid Credentials" });

//         // JWT Token Generation
//         const token = jwt.sign(
//             { id: user._id, role: user.role }, 
//             "YOUR_SECRET_KEY", // Apni secret key dalei n
//             { expiresIn: '1d' }
//         );

//         res.json({
//             message: "Login successful",
//             token,
//             user: {
//                 id: user._id,
//                 name: user.name,
//                 email: user.email,
//                 role: user.role,
//                 permissions: user.permissions,
//                 shopImage: user.shopImage,   // Send images to frontend on login
//                 ownerImage: user.ownerImage, // Send images to frontend on login
//                 categories: user.categories
//             }
//         });
//     } catch (error) {
//         res.status(500).json({ message: "Login Error" });
//     }
// };

// // UPDATE PROFILE CONTROLLER
// exports.updateProfile = async (req, res) => {
//     try {
//         const { userId, name, password } = req.body;

//         let user = await User.findById(userId);
//         if (!user) return res.status(404).json({ message: "User not found" });

//         if (name) user.name = name;

//         if (password) {
//             const salt = await bcrypt.genSalt(10);
//             user.password = await bcrypt.hash(password, salt);
//         }

//         await user.save();

//         res.json({
//             message: "Profile updated successfully!",
//             user: { id: user._id, name: user.name, email: user.email }
//         });

//     } catch (error) {
//         res.status(500).json({ message: "Server Error", error });
//     }
// };

// // RESET PASSWORD CONTROLLER
// exports.resetPassword = async (req, res) => {
//     try {
//         const { email, newPassword } = req.body;
//         const user = await User.findOne({ email });
//         if (!user) return res.status(404).json({ message: "User not found!" });

//         const salt = await bcrypt.genSalt(10);
//         user.password = await bcrypt.hash(newPassword, salt);
//         await user.save();

//         res.json({ message: "Password reset successful! Please login." });
//     } catch (error) {
//         res.status(500).json({ message: "Server error" });
//     }
// };