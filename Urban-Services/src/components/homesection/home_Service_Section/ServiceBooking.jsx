import React, { useState } from 'react';
import { User, Phone, MapPin, Calendar, MessageSquare, Send } from 'lucide-react';

const ServiceBooking = ({ serviceName, servicePrice, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    date: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    // WhatsApp Configuration
    const myWhatsAppNumber = "919118271153"; // Aapka number
    
    // Message Formatting
    const message = `*New Service Booking* 🚀%0A%0A` +
      `*Service:* ${serviceName || 'General Cleaning'}%0A` +
      `*Price:* ${servicePrice || 'N/A'}%0A%0A` +
      `*Customer Details:*%0A` +
      `• Name: ${formData.name}%0A` +
      `• Phone: ${formData.phone}%0A` +
      `• Address: ${formData.address}%0A` +
      `• Date: ${formData.date}%0A` +
      `• Note: ${formData.message || 'No special instructions'}`;

    const whatsappUrl = `https://api.whatsapp.com/send?phone=${myWhatsAppNumber}&text=${message}`;

    // Redirect to WhatsApp
    window.open(whatsappUrl, "_blank");
    
    if (onClose) onClose();
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 font-poppins">
      {/* Name & Phone Row */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="text-[10px] font-bold text-white uppercase ml-1 block opacity-70">Name</label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 text-black" size={16} />
            <input
              required
              name="name"
              type="text"
              placeholder="Your Name"
              className="w-full pl-10 pr-3 py-3 bg-white border-none rounded-xl text-black outline-none text-sm shadow-inner"
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-[10px] font-bold text-gray-300 uppercase ml-1 block opacity-70">Phone</label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-black" size={16} />
            <input
              required
              name="phone"
              type="tel"
              placeholder="Number"
              className="w-full pl-10 pr-3 py-3 bg-white border-none rounded-xl text-gray-800 outline-none text-sm shadow-inner"
              onChange={handleChange}
            />
          </div>
        </div>
      </div>

      {/* Address */}
      <div className="space-y-1">
        <label className="text-[10px] font-bold text-gray-300 uppercase ml-1 block opacity-70">Address (Gorakhpur)</label>
        <div className="relative">
          <MapPin className="absolute left-3 top-4 text-black" size={16} />
          <textarea
            required
            name="address"
            rows="1"
            placeholder="Area, Landmark..."
            className="w-full pl-10 pr-3 py-3 bg-white border-none rounded-xl text-gray-800 outline-none text-sm shadow-inner resize-none"
            onChange={handleChange}
          ></textarea>
        </div>
      </div>

      {/* Date Picker */}
      <div className="space-y-1">
        <label className="text-[10px] font-bold text-gray-300 uppercase ml-1 block opacity-70">Preferred Date</label>
        <div className="relative">
          <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-black" size={16} />
          <input
            required
            name="date"
            type="text"
            placeholder="Select Date"
            onFocus={(e) => (e.target.type = "date")}
            onBlur={(e) => !e.target.value && (e.target.type = "text")}
            className="w-full pl-10 pr-3 py-3 bg-white border-none rounded-xl text-gray-800 outline-none text-sm shadow-inner"
            onChange={handleChange}
          />
        </div>
      </div>

      {/* Special Note */}
      <div className="space-y-1">
        <label className="text-[10px] font-bold text-gray-300 uppercase ml-1 block opacity-70">Special Note (Optional)</label>
        <div className="relative">
          <MessageSquare className="absolute left-3 top-4 text-black" size={16} />
          <textarea
            name="message"
            rows="1"
            placeholder="Any specific requirements..."
            className="w-full pl-10 pr-3 py-3 bg-white border-none rounded-xl text-gray-800 outline-none text-sm shadow-inner resize-none"
            onChange={handleChange}
          ></textarea>
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full py-4 mt-2 bg-white hover:cursor-pointer text-sm font-black rounded-xl flex items-center justify-center gap-2 transition-all active:scale-95 shadow-xl border border-white/10"
      >
        <Send size={18} /> Book Now 
      </button>
    </form>
  );
};

export default ServiceBooking;




// import React from 'react';
// import { X, User, Phone, MapPin, Calendar, MessageSquare, Send } from 'lucide-react';

// const ServicesBooking = ({ onClose, serviceName }) => {
//   return (
//     <div className="bg-[#0B5C3F] text-white rounded-[2.5rem] p-8 md:p-10 relative shadow-2xl max-w-lg w-full font-poppins animate-in fade-in zoom-in duration-300">
      
//       {/* Close Button */}
//       <button 
//         onClick={onClose}
//         className="absolute top-6 right-6 bg-white/10 hover:bg-white/20 p-2 rounded-full transition-all"
//       >
//         <X size={20} className="text-white" />
//       </button>

//       {/* Header */}
//       <div className="mb-8">
//         <h2 className="text-3xl md:text-4xl font-black mb-4">Book Now</h2>
//         <div className="flex items-center gap-3">
//           <span className="bg-white text-[#0B5C3F] px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">
//             {serviceName || "Home Cleaning"}
//           </span>
//           <span className="text-sm font-medium opacity-90">₹499 – ₹4,999</span>
//         </div>
//       </div>

//       {/* Form */}
//       <form className="space-y-4">
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           {/* Name */}
//           <div className="space-y-1.5">
//             <label className="text-[10px] font-bold uppercase tracking-widest opacity-70 ml-1">Name</label>
//             <div className="relative">
//               <User className="absolute left-4 top-1/2 -translate-y-1/2 text-[#0B5C3F] w-4 h-4" />
//               <input type="text" placeholder="Your Name" className="w-full bg-white border-none rounded-xl p-3.5 pl-11 text-sm text-gray-800 outline-none placeholder:text-gray-400" />
//             </div>
//           </div>
//           {/* Phone */}
//           <div className="space-y-1.5">
//             <label className="text-[10px] font-bold uppercase tracking-widest opacity-70 ml-1">Phone</label>
//             <div className="relative">
//               <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-[#0B5C3F] w-4 h-4" />
//               <input type="tel" placeholder="Number" className="w-full bg-white border-none rounded-xl p-3.5 pl-11 text-sm text-gray-800 outline-none placeholder:text-gray-400" />
//             </div>
//           </div>
//         </div>

//         {/* Address */}
//         <div className="space-y-1.5">
//           <label className="text-[10px] font-bold uppercase tracking-widest opacity-70 ml-1">Address (Gorakhpur)</label>
//           <div className="relative">
//             <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-[#0B5C3F] w-4 h-4" />
//             <input type="text" placeholder="Area, Landmark..." className="w-full bg-white border-none rounded-xl p-3.5 pl-11 text-sm text-gray-800 outline-none placeholder:text-gray-400" />
//           </div>
//         </div>

//         {/* Date */}
//         <div className="space-y-1.5">
//           <label className="text-[10px] font-bold uppercase tracking-widest opacity-70 ml-1">Preferred Date</label>
//           <div className="relative">
//             <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-[#0B5C3F] w-4 h-4" />
//             <input type="text" placeholder="Select Date and Time" className="w-full bg-white border-none rounded-xl p-3.5 pl-11 text-sm text-gray-800 outline-none placeholder:text-gray-400" />
//           </div>
//         </div>

//         {/* Note */}
//         <div className="space-y-1.5">
//           <label className="text-[10px] font-bold uppercase tracking-widest opacity-70 ml-1">Special Note (Optional)</label>
//           <div className="relative">
//             <MessageSquare className="absolute left-4 top-4 text-[#0B5C3F] w-4 h-4" />
//             <textarea placeholder="Any specific requirements..." rows="2" className="w-full bg-white border-none rounded-xl p-3.5 pl-11 text-sm text-gray-800 outline-none placeholder:text-gray-400 resize-none"></textarea>
//           </div>
//         </div>

//         {/* Submit Button */}
//         <button className="w-full bg-green-800 hover:bg-green-900 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all active:scale-95 shadow-lg border border-white/10 mt-2">
//           <Send size={18} />
//           Book Now
//         </button>
//       </form>
//     </div>
//   );
// };

// export default ServicesBooking;