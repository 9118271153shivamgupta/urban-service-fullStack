const express = require('express');
const router = express.Router();
const User = require('../models/User');
const multer = require('multer');
const path = require('path');

// --- MULTER STORAGE SETUP ---
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

// Multi-field middleware configuration profiles profile matrix map
const updateUploadFields = upload.fields([
    { name: 'profilePic', maxCount: 1 },
    { name: 'ownerImage', maxCount: 1 }
]);

// --- FETCH ALL PROVIDERS ---
router.get('/', async (req, res) => {
    try {
        const providers = await User.find({ role: 'provider' });
        res.status(200).json(providers);
    } catch (error) {
        console.error("Error fetching providers:", error);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
});

// --- 🔥 UPGRADED COMPREHENSIVE PROFILE UPDATE ---
router.put('/update', updateUploadFields, async (req, res) => {
    try {
        const { 
            userId, name, phone, panCard, aadhaarCard, city, address, 
            experience, serviceRange, categories 
        } = req.body;

        if (!userId) {
            return res.status(400).json({ message: "User ID is required tracking parameters." });
        }

        // Existing user fetch karo checking details implementation architecture layers
        const targetUser = await User.findById(userId);
        if (!targetUser) {
            return res.status(404).json({ message: "User not found to update." });
        }

        // Base structural configuration setting parameters matrix mappings setup
        let updateData = {
            name: name || targetUser.name,
            phone: phone || targetUser.phone,
            panCard: panCard || targetUser.panCard,
            aadhaarCard: aadhaarCard || targetUser.aadhaarCard,
            city: city || targetUser.city,
            address: address || targetUser.address,
        };

        // Profile pic mapping according to target role
        if (req.files) {
            if (req.files['profilePic']) {
                updateData.profilePic = req.files['profilePic'][0].path.replace(/\\/g, "/");
            }
            if (req.files['ownerImage']) {
                if (!updateData.providerInfo) updateData.providerInfo = { ...targetUser.providerInfo };
                updateData.providerInfo.ownerImage = req.files['ownerImage'][0].path.replace(/\\/g, "/");
            }
        }

        // Handle structural stringified arrays safely
        if (categories) {
            try {
                const parsedCategories = typeof categories === 'string' ? JSON.parse(categories) : categories;
                if (!updateData.providerInfo) updateData.providerInfo = { ...targetUser.providerInfo };
                updateData.providerInfo.categories = parsedCategories;
            } catch (err) {
                console.error("Categories update array parsing failure structural error:", err);
            }
        }

        // Experience and Range mappings injection
        if (targetUser.role === 'provider' || req.body.role === 'provider') {
            if (!updateData.providerInfo) updateData.providerInfo = { ...targetUser.providerInfo };
            updateData.providerInfo.experience = experience !== undefined ? experience : (targetUser.providerInfo?.experience || "");
            updateData.providerInfo.serviceRange = serviceRange !== undefined ? serviceRange : (targetUser.providerInfo?.serviceRange || "Gorakhpur");
        }

        // 🎯 FIXED: Mongoose warning fix kiya `{ returnDocument: 'after' }` use karke
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { $set: updateData },
            { returnDocument: 'after' }
        );

        res.json({
            message: "Success",
            data: updatedUser
        });
        
    } catch (error) {
        console.error("Profile Update Error:", error);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
});

// --- ADD SERVICE TO PROVIDER ---
router.put('/add-service/:id', async (req, res) => {
    try {
        const providerId = req.params.id;
        const { category, priceRange, serviceType, subCategory, serviceTitle } = req.body;

        const newServiceBlock = {
            category,
            priceRange,
            serviceType,
            subCategory: subCategory || 'General',
            serviceTitle
        };

        // 🎯 FIXED: Mongoose warning fix kiya `{ returnDocument: 'after' }` use karke
        const updatedProvider = await User.findByIdAndUpdate(
            providerId,
            { $push: { "providerInfo.categories": newServiceBlock } },
            { returnDocument: 'after' }
        );

        if (!updatedProvider) {
            return res.status(404).json({ message: "User/Provider not found." });
        }

        res.status(200).json({ success: true, message: "Success", provider: updatedProvider });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
});

// --- DELETE SPECIFIC SERVICE FROM PROVIDER ---
router.delete('/delete-service/:providerId/:serviceId', async (req, res) => {
    try {
        const { providerId, serviceId } = req.params;

        // 🎯 FIXED: Mongoose warning fix kiya `{ returnDocument: 'after' }` use karke
        const updatedProvider = await User.findByIdAndUpdate(
            providerId,
            { 
                $pull: { "providerInfo.categories": { _id: serviceId } } 
            },
            { returnDocument: 'after' }
        );

        if (!updatedProvider) {
            return res.status(404).json({ message: "Provider not found in system indexes." });
        }

        res.status(200).json({ 
            success: true, 
            message: "Service deleted successfully", 
            updatedServices: updatedProvider.providerInfo?.categories || [] 
        });

    } catch (error) {
        console.error("Delete Service API Error:", error);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
});

// --- DELETE USER / PROVIDER ---
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const userExists = await User.findById(id);
        if (!userExists) {
            return res.status(404).json({ message: "User/Provider not found." });
        }
        await User.findByIdAndDelete(id);
        res.json({ message: "Success", deletedId: id });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
});

module.exports = router;