// path: models/ServiceType.js
const mongoose = require('mongoose');

// 1. Service Type Schema
const serviceTypeSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true, trim: true }
}, { timestamps: true });
const ServiceType = mongoose.model('ServiceType', serviceTypeSchema);

// 2. Main Category Schema
const mainCategorySchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    serviceType: { type: mongoose.Schema.Types.ObjectId, ref: 'ServiceType', required: true }
}, { timestamps: true });
const MainCategory = mongoose.model('MainCategory', mainCategorySchema);

// 3. Sub Category Schema
const subCategorySchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    mainCategory: { type: mongoose.Schema.Types.ObjectId, ref: 'MainCategory', required: true }
}, { timestamps: true });
const SubCategory = mongoose.model('SubCategory', subCategorySchema);

// 🔥 CRITICAL FIX: Teeno models ko ek sath export karein
module.exports = {
    ServiceType,
    MainCategory,
    SubCategory
};