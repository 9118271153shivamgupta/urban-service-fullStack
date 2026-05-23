import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import axios from 'axios'; // Axios import karein
import { useNavigate } from 'react-router-dom';

const BookingForm = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ 
    service: '', 
    phone: '', 
    address: '' // Address bhi zaroori hai service ke liye
  });

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // 1. LocalStorage se User ki info nikaalein
    const user = JSON.parse(localStorage.getItem('user'));
    
    if (!user) {
      alert("Please login first to book a service!");
      onClose();
      return navigate('/login');
    }

    // 2. Data taiyaar karein (Backend Model ke hisaab se)
    const bookingData = {
      userId: user.id,
      userName: user.name,
      email: user.email, // Aapne email manga tha, wo login data se mil jayega
      serviceName: formData.service,
      phone: formData.phone,
      address: formData.address,
      date: new Date().toLocaleDateString() // Aaj ki date
    };

    try {
      // 3. Backend API Call
      const res = await axios.post('http://localhost:5000/api/bookings/add', bookingData);
      
      alert("✅ Booking Successful! Our team will contact you soon.");
      
      // WhatsApp wala part (Optional: Agar aap chahte hain ki DB mein bhi jaye aur WhatsApp bhi ho)
      const message = `*New Booking!*%0A*Name:* ${user.name}%0A*Service:* ${formData.service}%0A*Phone:* ${formData.phone}%0A*Address:* ${formData.address}`;
      window.open(`https://wa.me/7897222542?text=${message}`, '_blank');
      
      onClose();
    } catch (err) {
      console.error(err);
      alert("❌ Booking failed! Server check karein.");
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-md px-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }} 
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white w-full max-w-md rounded-3xl p-8 shadow-2xl relative"
      >
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-black">
          <X size={24} />
        </button>

        <h2 className="text-2xl font-bold text-black mb-2">Book Your Service</h2>
        <p className="text-gray-500 mb-6 text-sm">Fill in the details to schedule your service.</p>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Service Selection */}
          <select 
            className="w-full p-3 border border-black rounded-xl focus:outline-none bg-white"
            onChange={(e) => setFormData({...formData, service: e.target.value})}
            required
          >
            <option value="">Select Service</option>
            <option value="AC Cleaning">AC Cleaning</option>
            <option value="Home Cleaning">Home Cleaning</option>
            <option value="Pest Control">Pest Control</option>
            <option value="Office Cleaning">Office Cleaning</option>
            <option value="Room Cleaning">Room Cleaning</option>
            <option value="Bathroom Cleaning">Bathroom Cleaning</option>
            <option value="Deep Cleaning">Deep Cleaning</option>
            <option value="Sofa Cleaning">Sofa Cleaning</option>
          </select>

          {/* Phone Input */}
          <input 
            type="tel" placeholder="Phone Number" required
            className="w-full p-3 border border-black rounded-xl focus:outline-none"
            onChange={(e) => setFormData({...formData, phone: e.target.value})}
          />

          {/* Address Input (Naya Field) */}
          <textarea 
            placeholder="Your Full Address" required
            className="w-full p-3 border border-black rounded-xl focus:outline-none h-24"
            onChange={(e) => setFormData({...formData, address: e.target.value})}
          />

          <button type="submit" className="w-full bg-black text-white py-3 rounded-xl font-bold hover:opacity-90 transition-all shadow-lg">
            Confirm Booking & Send
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default BookingForm;