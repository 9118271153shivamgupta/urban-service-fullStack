import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, MapPin, Navigation, RefreshCw } from 'lucide-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// Category aur Services ka data mapping
const categoryData = {
  "Cleaning Services": ["Home Cleaning", "Office Cleaning", "Deep Cleaning", "Room Cleaning", "Sofa Cleaning", "Bathroom Cleaning"],
  "Maintenance & Repair": ["AC Service", "Electrician", "Plumber", "Carpenter"],
  "Pest Control": ["General Pest Control", "Termite Control", "Bed Bugs Treatment"]
};

const BookingForm = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  
  // Initial Empty State
  const initialFormState = {
    category: '',
    service: '',
    phone: '',
    address: '',
    pincode: '',
    remark: ''
  };

  const [formData, setFormData] = useState(initialFormState);
  const [locLoading, setLocLoading] = useState(false);

  if (!isOpen) return null;

  // Reset Form Handler
  const handleReset = () => {
    setFormData(initialFormState);
  };

  // Browser Geolocation API se Current Location fetch karna
  const handleGetCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      return;
    }

    setLocLoading(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          // OpenStreetMap Geocoding API (Free & No Key Required)
          const res = await axios.get(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
          if (res.data) {
            const displayAddress = res.data.display_name;
            const detectedPincode = res.data.address?.postcode || '';
            
            setFormData(prev => ({
              ...prev,
              address: displayAddress,
              pincode: detectedPincode
            }));
          }
        } catch (err) {
          console.error("Error fetching address from coordinates:", err);
          alert("Could not fetch address details, please type manually.");
        } finally {
          setLocLoading(false);
        }
      },
      (error) => {
        console.error(error);
        alert("Location access denied. Please enable GPS permissions.");
        setLocLoading(false);
      }
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
      alert("Please login first to book a service!");
      onClose();
      return navigate('/login');
    }

    // Backend payload design
    const bookingData = {
      userId: user.id,
      userName: user.name,
      email: user.email,
      category: formData.category,
      serviceName: formData.service,
      phone: formData.phone,
      address: formData.address,
      pincode: formData.pincode,
      remark: formData.remark,
      date: new Date().toLocaleDateString()
    };

    try {
      // 1. Database Lead Generation
      await axios.post('http://localhost:5000/api/bookings/add', bookingData);
      alert("✅ Booking Successful! Lead saved in dashboard.");

      // 2. WhatsApp Notification Engine (Formatted Output)
      const whatsappMsg = `*🚨 NEW LEAD GENERATED *%0A%0A` +
                          `*👤 Customer Name:* ${user.name}%0A` +
                          `*📞 Contact No:* ${formData.phone}%0A` +
                          `*📁 Category:* ${formData.category}%0A` +
                          `*🛠️ Service:* ${formData.service}%0A` +
                          `*📍 Address:* ${formData.address}%0A` +
                          `*📮 Pincode:* ${formData.pincode || 'N/A'}%0A` +
                          `*📝 Remark/Msg:* ${formData.remark || 'None'}`;

      window.open(`https://wa.me/7897222542?text=${whatsappMsg}`, '_blank');
      
      handleReset();
      onClose();
    } catch (err) {
      console.error(err);
      alert("❌ Booking failed! Please check console backend log.");
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-md px-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }} 
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white w-full max-w-lg rounded-3xl p-6 md:p-8 shadow-2xl relative text-left font-['Poppins']"
      >
        <button onClick={onClose} className="absolute top-5 right-5 text-gray-400 hover:text-black transition-colors">
          <X size={22} />
        </button>

        <h2 className="text-2xl font-black text-black tracking-tight mb-1">Book Your Service</h2>
        <p className="text-gray-500 mb-6 text-xs font-medium uppercase tracking-wider">Fill info to route request directly to verification unit</p>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Category Dropdown */}
            <div>
              <label className="block text-[11px] font-black uppercase text-gray-500 mb-1 tracking-wider">Service Category</label>
              <select 
                value={formData.category}
                className="w-full p-3 border border-gray-300 rounded-xl focus:border-black outline-none bg-white text-xs font-bold"
                onChange={(e) => setFormData({...formData, category: e.target.value, service: ''})}
                required
              >
                <option value="">Select Category</option>
                {Object.keys(categoryData).map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            {/* Dynamic Service Dropdown */}
            <div>
              <label className="block text-[11px] font-black uppercase text-gray-500 mb-1 tracking-wider">Specific Service</label>
              <select 
                value={formData.service}
                className="w-full p-3 border border-gray-300 rounded-xl focus:border-black outline-none bg-white text-xs font-bold disabled:bg-gray-100 disabled:text-gray-400"
                onChange={(e) => setFormData({...formData, service: e.target.value})}
                disabled={!formData.category}
                required
              >
                <option value="">Select Service</option>
                {formData.category && categoryData[formData.category].map((srv) => (
                  <option key={srv} value={srv}>{srv}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Contact Field */}
          <div>
            <label className="block text-[11px] font-black uppercase text-gray-500 mb-1 tracking-wider">Contact Number</label>
            <input 
              type="tel" 
              placeholder="Enter 10-digit mobile number" 
              value={formData.phone}
              pattern="[0-9]{10}"
              required
              className="w-full p-3 border border-gray-300 rounded-xl focus:border-black outline-none text-xs font-mono font-bold"
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
            />
          </div>

          {/* Address & GPS Row */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="block text-[11px] font-black uppercase text-gray-500 tracking-wider">Location Address</label>
              <button
                type="button"
                onClick={handleGetCurrentLocation}
                className="text-[10px] bg-orange-500/10 hover:bg-orange-500/20 text-orange-600 px-2.5 py-1 rounded-lg font-black uppercase flex items-center gap-1 transition-all"
              >
                <Navigation size={10} className={locLoading ? "animate-spin" : ""} />
                {locLoading ? "Fetching..." : "Use Current GPS"}
              </button>
            </div>
            <textarea 
              placeholder="House No, Street, Landmark details..." 
              value={formData.address}
              required
              className="w-full p-3 border border-gray-300 rounded-xl focus:border-black outline-none h-20 text-xs font-medium resize-none"
              onChange={(e) => setFormData({...formData, address: e.target.value})}
            />
          </div>

          {/* Pincode & Remark Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-1">
              <label className="block text-[11px] font-black uppercase text-gray-500 mb-1 tracking-wider">Area Pincode</label>
              <input 
                type="text" 
                placeholder="Pincode" 
                value={formData.pincode}
                required
                className="w-full p-3 border border-gray-300 rounded-xl focus:border-black outline-none text-xs font-mono font-bold"
                onChange={(e) => setFormData({...formData, pincode: e.target.value})}
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-[11px] font-black uppercase text-gray-500 mb-1 tracking-wider">Remark / Message (Optional)</label>
              <input 
                type="text" 
                placeholder="Any specific note or preferred timing..." 
                value={formData.remark}
                className="w-full p-3 border border-gray-300 rounded-xl focus:border-black outline-none text-xs font-medium"
                onChange={(e) => setFormData({...formData, remark: e.target.value})}
              />
            </div>
          </div>

          {/* Dual Action Control Buttons */}
          <div className="flex gap-3 pt-2">
            <button 
              type="button" 
              onClick={handleReset}
              className="w-1/3 border border-gray-300 hover:bg-gray-50 text-gray-600 py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-1"
            >
              <RefreshCw size={12} /> Reset
            </button>
            <button 
              type="submit" 
              className="w-2/3 bg-black text-white py-3 rounded-xl font-bold text-xs uppercase tracking-wider hover:bg-gray-900 transition-all shadow-lg flex items-center justify-center gap-1"
            >
              Confirm & Book Lead
            </button>
          </div>

        </form>
      </motion.div>
    </div>
  );
};

export default BookingForm;




// import React, { useState, useEffect } from 'react';
// import { motion } from 'framer-motion';
// import { X } from 'lucide-react';
// import axios from 'axios'; // Axios import karein
// import { useNavigate } from 'react-router-dom';

// const BookingForm = ({ isOpen, onClose }) => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({ 
//     service: '', 
//     phone: '', 
//     address: '' // Address bhi zaroori hai service ke liye
//   });

//   if (!isOpen) return null;

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     // 1. LocalStorage se User ki info nikaalein
//     const user = JSON.parse(localStorage.getItem('user'));
    
//     if (!user) {
//       alert("Please login first to book a service!");
//       onClose();
//       return navigate('/login');
//     }

//     // 2. Data taiyaar karein (Backend Model ke hisaab se)
//     const bookingData = {
//       userId: user.id,
//       userName: user.name,
//       email: user.email, // Aapne email manga tha, wo login data se mil jayega
//       serviceName: formData.service,
//       phone: formData.phone,
//       address: formData.address,
//       date: new Date().toLocaleDateString() // Aaj ki date
//     };

//     try {
//       // 3. Backend API Call
//       const res = await axios.post('http://localhost:5000/api/bookings/add', bookingData);
      
//       alert("✅ Booking Successful! Our team will contact you soon.");
      
//       // WhatsApp wala part (Optional: Agar aap chahte hain ki DB mein bhi jaye aur WhatsApp bhi ho)
//       const message = `*New Booking!*%0A*Name:* ${user.name}%0A*Service:* ${formData.service}%0A*Phone:* ${formData.phone}%0A*Address:* ${formData.address}`;
//       window.open(`https://wa.me/7897222542?text=${message}`, '_blank');
      
//       onClose();
//     } catch (err) {
//       console.error(err);
//       alert("❌ Booking failed! Server check karein.");
//     }
//   };

//   return (
//     <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-md px-4">
//       <motion.div 
//         initial={{ opacity: 0, scale: 0.9 }} 
//         animate={{ opacity: 1, scale: 1 }}
//         className="bg-white w-full max-w-md rounded-3xl p-8 shadow-2xl relative"
//       >
//         <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-black">
//           <X size={24} />
//         </button>

//         <h2 className="text-2xl font-bold text-black mb-2">Book Your Service</h2>
//         <p className="text-gray-500 mb-6 text-sm">Fill in the details to schedule your service.</p>
        
//         <form onSubmit={handleSubmit} className="space-y-4">
//           {/* Service Selection */}
//           <select 
//             className="w-full p-3 border border-black rounded-xl focus:outline-none bg-white"
//             onChange={(e) => setFormData({...formData, service: e.target.value})}
//             required
//           >
//             <option value="">Select Service</option>
//             <option value="AC Cleaning">AC Cleaning</option>
//             <option value="Home Cleaning">Home Cleaning</option>
//             <option value="Pest Control">Pest Control</option>
//             <option value="Office Cleaning">Office Cleaning</option>
//             <option value="Room Cleaning">Room Cleaning</option>
//             <option value="Bathroom Cleaning">Bathroom Cleaning</option>
//             <option value="Deep Cleaning">Deep Cleaning</option>
//             <option value="Sofa Cleaning">Sofa Cleaning</option>
//           </select>

//           {/* Phone Input */}
//           <input 
//             type="tel" placeholder="Phone Number" required
//             className="w-full p-3 border border-black rounded-xl focus:outline-none"
//             onChange={(e) => setFormData({...formData, phone: e.target.value})}
//           />

//           {/* Address Input (Naya Field) */}
//           <textarea 
//             placeholder="Your Full Address" required
//             className="w-full p-3 border border-black rounded-xl focus:outline-none h-24"
//             onChange={(e) => setFormData({...formData, address: e.target.value})}
//           />

//           <button type="submit" className="w-full bg-black text-white py-3 rounded-xl font-bold hover:opacity-90 transition-all shadow-lg">
//             Confirm Booking & Send
//           </button>
//         </form>
//       </motion.div>
//     </div>
//   );
// };

// export default BookingForm;