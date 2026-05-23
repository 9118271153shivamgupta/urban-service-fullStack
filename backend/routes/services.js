const express = require('express');
const router = express.Router();
const Service = require('../models/Service');
const multer = require('multer');

// --- GET ALL SERVICES ---
// यह URL http://localhost:5000/api/services के लिए है
router.get('/', async (req, res) => {
    try {
        const services = await Service.find();
        res.json(services);
    } catch (err) {
        res.status(500).json({ message: "Error fetching services", error: err.message });
    }
});

// Multer Setup for Service Images
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/'),
    filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage: storage });

// --- ADD NEW SERVICE ---
// POST http://localhost:5000/api/services/add
router.post('/add', upload.single('image'), async (req, res) => {
    try {
        const { name, description, price, category, subCategory, tagline, features } = req.body;
        
        const newService = new Service({
            name,
            description,
            price,
            category,
            subCategory,
            tagline,
            // JSON.parse यहाँ बहुत जरूरी है क्योंकि FormData string भेजता है
            features: features ? JSON.parse(features) : [],
            image: req.file ? req.file.path.replace(/\\/g, "/") : "" // Windows path fixing
        });

        await newService.save();
        res.json({ message: "Service Added Successfully!", service: newService });
    } catch (err) {
        res.status(500).json({ message: "Error adding service", error: err.message });
    }
});

// --- DELETE SERVICE ---
// DELETE http://localhost:5000/api/services/:id
router.delete('/:id', async (req, res) => {
    try {
        await Service.findByIdAndDelete(req.params.id);
        res.json({ message: "Service Deleted!" });
    } catch (err) {
        res.status(500).json({ message: "Delete failed" });
    }
});

module.exports = router;