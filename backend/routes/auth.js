const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const authController = require('../controllers/authController'); // Controller link kiya

// --- MULTER STORAGE CONFIGURATION ---
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Is naam ka folder backend me auto ya manually banana padega
    },
    filename: function (req, file, cb) {
        // Unique filename banana taaki same name ki files overwrite na hon
        cb(null, Date.now() + '-' + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

// Multi-upload configuration (Dono single fields ko name assign kiya)
const uploadFields = upload.fields([
    { name: 'shopImage', maxCount: 1 },
    { name: 'ownerImage', maxCount: 1 }
]);

// --- ROUTES ---

// Register Route (Isme uploadFields middleware lagaya hai images capture karne ke liye)
router.post('/register', uploadFields, authController.register);

// Login Route
router.post('/login', authController.login);

// Update Profile Route
router.put('/update-profile', authController.updateProfile);

// Reset Password Route
router.post('/reset-password', authController.resetPassword);

module.exports = router;