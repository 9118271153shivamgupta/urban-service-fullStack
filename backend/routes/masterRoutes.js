const express = require('express');
const router = express.Router();
const masterController = require('../controllers/masterController');

// --- 1. Service Type Routes ---
router.post('/service-types', masterController.addServiceType);
router.get('/service-types', masterController.getServiceTypes);
router.delete('/service-types/:id', masterController.deleteServiceType); // 🔥 Added Delete Pipeline

// --- 2. Main Category Routes ---
router.post('/main-categories', masterController.addMainCategory);
router.get('/main-categories', masterController.getMainCategories);
router.delete('/main-categories/:id', masterController.deleteMainCategory); // 🔥 Added Delete Pipeline

// --- 3. Sub Category Routes ---
router.post('/sub-categories', masterController.addSubCategory);
router.get('/sub-categories', masterController.getSubCategories);
router.delete('/sub-categories/:id', masterController.deleteSubCategory); // 🔥 Added Delete Pipeline

module.exports = router;