const express = require('express');
const router = express.Router();
const multer = require('multer');

const serviceController = require('../controllers/serviceController');

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/'),
    filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage: storage });

// --- ROUTE CONFIGURATIONS ---
router.get('/', serviceController.getAllServices);
router.post('/add', upload.single('image'), serviceController.addService);
router.post('/add-batch', serviceController.addServiceBatch); 
router.delete('/:id', serviceController.deleteService);
router.get('/provider/:providerId', serviceController.getProviderServices);

module.exports = router;