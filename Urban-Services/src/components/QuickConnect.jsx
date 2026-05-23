import React from 'react';
import { FaPhoneAlt, FaWhatsapp } from 'react-icons/fa';

const QuickConnect = () => {
  return (
    <section className="py-10 px-6 font-['Poppins']">
      <div className="max-w-4xl mx-auto text-center text-black">
        
        {/* Main Heading */}
        <h2 className="text-3xl md:text-5xl font-bold mb-6">
         Quick Connect
        </h2>

        {/* Sub-text */}
        <p className="text-sm md:text-lg mb-10 opacity-90 leading-relaxed max-w-2xl mx-auto">
          Get professional home services at your doorstep within 60 minutes. 
          Call us now or send a WhatsApp message for instant booking.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
          
          {/* Call Button */}
          <a 
            href="tel:+91 7897222542" 
            className="flex items-center gap-3 text-white bg-black hover:cursor-pointer px-8 py-4 rounded-xl font-bold transition-all w-full sm:w-auto justify-center shadow-lg"
          >
            <FaPhoneAlt className="text-sm text-white" /> Call Now : 7897222542
          </a>

          {/* WhatsApp Button */}
          <a 
            href="https://wa.me/7897222542" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-3  text-white bg-black border-2 border-white/40 hover:cursor-pointer px-8 py-4 rounded-xl font-bold transition-all w-full sm:w-auto justify-center"
          >
            <FaWhatsapp className="text-lg text-white" /> WhatsApp Us
          </a>

        </div>

        {/* Working Hours */}
        <div className="text-xs md:text-sm font-medium opacity-80 uppercase tracking-widest">
          Working Hours: 24 hr
        </div>

      </div>
    </section>
  );
};

export default QuickConnect;