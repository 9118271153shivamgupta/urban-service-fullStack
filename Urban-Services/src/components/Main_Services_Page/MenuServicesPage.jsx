import React, { useState } from 'react';
import { menuServicesData } from '../../data/menuServicesData';
import MenuServicesCard from './MenuServicesCard';
import ServiceBooking from '../homesection/home_Service_Section/ServiceBooking';
import { X } from 'lucide-react'; // X import karna zaroori hai

const MenuServicesPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);

  const handleBookClick = (service) => {
    setSelectedService(service);
    setIsModalOpen(true);
  };

  // Modal band karne ka function
  const closeBookingModal = () => {
    setIsModalOpen(false);
    setSelectedService(null);
  };

  return (
    <div className="min-h-screen bg-[#f0f9f4] font-poppins py-16 px-4">
      <div className="max-w-7xl mx-auto">
        
        {/* Banner Section */}
        <div className="text-center mb-16">
          <span className="bg-black text-white text-[10px] font-bold px-4 py-1.5 rounded-full uppercase tracking-widest">
            Premium Care
          </span>
          <h1 className="text-4xl md:text-6xl font-black text-black mt-4 mb-6">
            Our Cleaning <span className="text-black">Services</span>
          </h1>
          <p className="text-black max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
            "Premium cleaning services designed for modern living. Now serving homes and corporate spaces in Delhi, Lucknow, Varanasi, and Gorakhpur."
          </p>
        </div>

        {/* Dynamic Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {menuServicesData.map((service) => (
            <MenuServicesCard 
              key={service.id} 
              service={service} 
              onBook={handleBookClick} 
            />
          ))}
        </div>

        {/* Booking Modal */}
        {isModalOpen && selectedService && (
          <div className="fixed inset-0 z-[10000] flex items-end md:items-center justify-center p-0 md:p-4">
            {/* Background Overlay */}
            <div 
              className="absolute inset-0 bg-black/60 backdrop-blur-md transition-opacity" 
              onClick={closeBookingModal}
            ></div>

            {/* Modal Content */}
            <div className="bg-black rounded-t-[2.5rem] md:rounded-[2.5rem] p-6 md:p-8 max-w-xl w-full shadow-2xl relative z-[10001] max-h-[90vh] overflow-y-auto animate-in slide-in-from-bottom md:zoom-in duration-300">
              
              <button onClick={closeBookingModal} 
                className="absolute top-4 right-4 md:top-6 md:right-6 p-2 bg-white rounded-full text-black hover:cursor-pointer"><X size={20} />
              </button>

              <div className="mb-6">
                <h2 className="text-2xl md:text-3xl font-black text-white mb-2">Book Now</h2>
                <div className="flex items-center gap-3">
                  {/* Yahan 'selectedService' use hoga */}
                  <span className="bg-white text-black text-[10px] font-black px-3 py-1 rounded-full uppercase">
                    {selectedService.title || selectedService.name}
                  </span>
                  <span className="text-white font-bold">
                    ₹{selectedService.price}
                  </span>
                </div>
              </div>

              {/* Form Component */}
              <ServiceBooking 
                serviceName={selectedService.title || selectedService.name} 
                servicePrice={selectedService.price} 
                onClose={closeBookingModal} 
              /> 
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MenuServicesPage;