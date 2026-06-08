const mongoose = require('mongoose');

const ProviderSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  name: { type: String, required: true },
  shopImage: { type: String }, // Shop Layout Banner
  ownerImage: { type: String }, // Passport Owner Photo
  experience: { type: String },
  serviceRange: { type: String },
  // 🎯 Strictly stores IDs of offered services
  services: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Service' 
  }], 
  // 🎯 Stores custom price calibration mapping for each serviceId
  priceMapping: [{
    serviceId: { type: mongoose.Schema.Types.ObjectId, ref: 'Service' },
    price: { type: String, required: true }
  }]
}, { timestamps: true });

module.exports = mongoose.model('Provider', ProviderSchema);