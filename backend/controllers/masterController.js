const { ServiceType, MainCategory, SubCategory } = require('../models/ServiceType');

// ==========================================
// 1. SERVICE TYPE CONTROLLERS
// ==========================================
exports.addServiceType = async (req, res) => {
    try {
        const { name } = req.body;
        
        // Check duplicate name to prevent generic catch crash
        const exists = await ServiceType.findOne({ name: { $regex: new RegExp(`^${name.trim()}$`, 'i') } });
        if (exists) {
            return res.status(400).json({ message: "This Service Type already exists!" });
        }

        const newType = new ServiceType({ name: name.trim() });
        await newType.save();
        res.status(201).json({ success: true, data: newType });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getServiceTypes = async (req, res) => {
    try {
        const types = await ServiceType.find().sort({ createdAt: -1 });
        res.status(200).json(types);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// 🔥 NEW: Delete Service Type
exports.deleteServiceType = async (req, res) => {
    try {
        const { id } = req.params;
        await ServiceType.findByIdAndDelete(id);
        
        // Optional: Related categories cleanup code can be placed here if required
        res.status(200).json({ success: true, message: "Service Type deleted successfully!" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


// ==========================================
// 2. MAIN CATEGORY CONTROLLERS
// ==========================================
exports.addMainCategory = async (req, res) => {
    try {
        const { name, serviceTypeId } = req.body;
        const newCat = new MainCategory({ name: name.trim(), serviceType: serviceTypeId });
        await newCat.save();
        res.status(201).json({ success: true, data: newCat });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getMainCategories = async (req, res) => {
    try {
        const categories = await MainCategory.find().populate('serviceType').sort({ createdAt: -1 });
        res.status(200).json(categories);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// 🔥 NEW: Delete Main Category
exports.deleteMainCategory = async (req, res) => {
    try {
        const { id } = req.params;
        await MainCategory.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: "Main Category deleted successfully!" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


// ==========================================
// 3. SUB CATEGORY CONTROLLERS
// ==========================================
exports.addSubCategory = async (req, res) => {
    try {
        const { name, mainCategoryId } = req.body;
        const newSub = new SubCategory({ name: name.trim(), mainCategory: mainCategoryId });
        await newSub.save();
        res.status(201).json({ success: true, data: newSub });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getSubCategories = async (req, res) => {
    try {
        const subCategories = await SubCategory.find().populate('mainCategory').sort({ createdAt: -1 });
        res.status(200).json(subCategories);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// 🔥 NEW: Delete Sub Category
exports.deleteSubCategory = async (req, res) => {
    try {
        const { id } = req.params;
        await SubCategory.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: "Sub Category deleted successfully!" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};