const Service = require('../models/Service');

// --- 1. GET ALL SERVICES ---
// backend/controllers/serviceController.js me check karo:

exports.getAllServices = async (req, res) => {
    try {
        // .populate() lagane se MongoDB strict ObjectIds ko real collections se replace karke uska 'name' nikalega
        const services = await Service.find()
            .populate('serviceType', 'name')
            .populate('category', 'name')
            .populate('subCategory', 'name');

        res.json(services);
    } catch (err) {
        res.status(500).json({ message: "Error fetching services", error: err.message });
    }
};

// --- 2. GET ISOLATED SERVICES FOR A SPECIFIC PROVIDER ---
exports.getProviderServices = async (req, res) => {
    try {
        const { providerId } = req.params;
        if (!providerId) {
            return res.status(400).json({ success: false, message: "Provider ID required." });
        }
        // 🌟 Ensuring matching parameter queries
        const services = await Service.find({ providerId });
        res.json(services);
    } catch (err) {
        res.status(500).json({ message: "Error fetching provider services", error: err.message });
    }
};

// --- 3. SINGLE ADD SERVICE METHOD ---
exports.addService = async (req, res) => {
    try {
        const { providerId, name, description, price, serviceType, category, subCategory, tagline, features } = req.body;

        let parsedSubCategories = [];
        if (subCategory) {
            if (Array.isArray(subCategory)) parsedSubCategories = subCategory;
            else if (typeof subCategory === 'string') {
                if (subCategory.startsWith('[')) {
                    try { parsedSubCategories = JSON.parse(subCategory); } catch (e) { parsedSubCategories = subCategory.split(','); }
                } else { parsedSubCategories = subCategory.split(','); }
            }
        }

        const newService = new Service({
            providerId, // 🌟 Fixed field name from 'provider' to 'providerId' to match schemas
            name, 
            description: description ? description.trim() : "No description provided.", 
            price: price ? Number(price) : 0, 
            serviceType, 
            category,
            subCategory: parsedSubCategories, 
            tagline: tagline ? tagline.trim() : "",
            features: typeof features === 'string' ? features.split(',') : features,
            image: req.file ? req.file.path.replace(/\\/g, "/") : ""
        });

        await newService.save();
        res.status(201).json({ success: true, service: newService });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

// --- 4. BATCH SERVICES METHOD ---
exports.addServiceBatch = async (req, res) => {
    try {
        const { providerId, serviceType, category, description, tagline, subServicesBatch } = req.body;

        if (!providerId) {
            return res.status(400).json({ success: false, message: "providerId token missing." });
        }

        const subServicesList = typeof subServicesBatch === 'string' ? JSON.parse(subServicesBatch) : subServicesBatch;
        const commonImage = req.file ? req.file.path.replace(/\\/g, "/") : "";

        if (!subServicesList || subServicesList.length === 0) {
            return res.status(400).json({ success: false, message: "Empty batch array." });
        }

        const documentsToInsert = subServicesList.map(item => {
            let featuresArray = [];
            if (item.features) {
                featuresArray = Array.isArray(item.features) 
                    ? item.features 
                    : String(item.features).split(',').map(f => f.trim()).filter(Boolean);
            }

            return {
                providerId,
                name: item.customTitle || item.name,
                description: description ? description.trim() : "No description provided.", 
                price: item.price ? Number(item.price) : 0,
                serviceType,
                category,
                subCategory: item.name ? [item.name] : ["General Support Core"],
                // 🌟 FIX: Safety wrap added to prevent crash if tagline is undefined
                tagline: tagline ? tagline.trim() : "", 
                features: featuresArray,
                image: commonImage
            };
        });

        const savedServices = await Service.insertMany(documentsToInsert);
        res.status(201).json({ success: true, data: savedServices });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

// --- 5. DELETE SERVICE ---
exports.deleteService = async (req, res) => {
    try {
        await Service.findByIdAndDelete(req.params.id);
        res.json({ success: true, message: "Service Deleted!" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};