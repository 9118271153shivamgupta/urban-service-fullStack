import React from 'react';
import ServiceListCard from './ServiceListCard';
import { servicesCategories } from '../../data/servicesPageData';
import { PhoneCall } from 'lucide-react';

const AllServicesPage = () => {
  const contactNumber = "9918012227";

  return (
    <div className="min-h-screen bg-gray-50 pb-20 font-sans">
      
      {/* 1. Header Section */}
      <div className="py-16 px-6 text-center">
        <h5 className="text-[#E65100] font-bold uppercase tracking-widest text-xs mb-3">
          Our Services
        </h5>
        <h1 className="text-4xl md:text-6xl font-black text-gray-900 mb-6 tracking-tight">
          All Services
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto text-sm md:text-base leading-relaxed mb-6">
          Choose from our comprehensive range of home services. All services come with verified technicians and service warranty.
        </p>
        {/* Orange Badge */}
        <div className="inline-block bg-[#ff6b0015] text-[#ff6b00] border border-[#ff6b0025] px-5 py-2 rounded-md font-bold text-sm md:text-base">
          Services Starting from ₹299/-
        </div>
      </div>

      {/* 2. Instant Call Bar (Orange) */}
      <div className="bg-[#ff6b00] text-white py-8 px-6 text-center shadow-lg relative z-10 mb-16">
        <h4 className="font-bold text-lg mb-2">Call us for instant booking:</h4>
        <a 
          href={`tel:${contactNumber}`} 
          className="text-4xl md:text-5xl font-extrabold flex items-center justify-center gap-4 hover:scale-105 transition-transform"
        >
          <PhoneCall size={36} fill="white" className="text-[#ff6b00]" />
          {contactNumber}
        </a>
      </div>

      {/* 3. Main Services Content (Groups) */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {servicesCategories.map((category) => (
          <div key={category.id} className="mb-16 last:mb-0">
            {/* Category Title with Bottom Border */}
            <h2 className="text-xl sm:text-2xl font-black text-gray-800 pb-4 mb-8 border-b-2 border-gray-100">
              {category.name}
            </h2>

            {/* Nested Services Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5">
              {category.services.map((service) => (
                <ServiceListCard 
                  key={service.id} 
                  title={service.title} 
                  slug={service.slug} // Slug pass kar rahe hain detail page ke liye
                />
              ))}
            </div>
          </div>
        ))}

      </div>
    </div>
  );
};

export default AllServicesPage;