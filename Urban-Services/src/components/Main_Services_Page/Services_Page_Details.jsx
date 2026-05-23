import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { servicesCategories } from '../../data/servicesPageData';
import { CheckCircle, Phone, ArrowLeft, Clock, ShieldCheck, BadgeIndianRupee, MessageCircle } from 'lucide-react';

const Services_Page_Details = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  // Data finding logic
  let service = null;
  servicesCategories.forEach(cat => {
    const found = cat.services.find(s => s.slug === slug);
    if (found) service = found;
  });

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <button onClick={() => navigate(-1)} className="text-emerald-600 underline">Back</button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fcf9f6] font-poppins pb-20">
      {/* 1. HERO SECTION (image_a34f26.png jaisa light background) */}
      <div className="bg-[#f3ede7] pt-12 pb-16 px-6">
        <div className="max-w-6xl mx-auto">
          <button 
            onClick={() => navigate(-1)} 
            className="flex items-center gap-2 text-gray-600 hover:text-orange-600 mb-8 transition-all"
          >
            <ArrowLeft size={20} /> <span className="font-medium">Back to Services</span>
          </button>

          <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
            {service.title} Service in Gorakhpur
          </h1>
          <p className="text-gray-700 max-w-3xl text-lg leading-relaxed mb-8">
            {service.about || `Looking for a reliable ${service.title} in Gorakhpur? LB Services provides expert technicians for all your needs.`}
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4">
            <a 
              href="tel:9918012227" 
              className="bg-[#e65100] text-white px-8 py-4 rounded-xl font-bold flex items-center gap-3 shadow-lg hover:bg-orange-700 transition-all"
            >
              <Phone size={20} /> Call Now - +91 9918012227
            </a>
            <a 
              href="https://wa.me/919918012227" 
              className="bg-white border border-gray-200 text-gray-800 px-8 py-4 rounded-xl font-bold flex items-center gap-3 hover:bg-gray-50 transition-all"
            >
              <MessageCircle size={20} className="text-green-600" /> WhatsApp
            </a>
          </div>
        </div>
      </div>

      {/* 2. CONTENT GRID */}
      <div className="max-w-6xl mx-auto px-6 -mt-10">
        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* LEFT COLUMN: Services Provided */}
          <div className="lg:col-span-2 bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
            <h3 className="text-2xl font-black text-gray-900 mb-8 flex items-center gap-2">
              Services We Provide
            </h3>
            <div className="grid sm:grid-cols-2 gap-y-6 gap-x-4">
              {service.included.map((item, index) => (
                <div key={index} className="flex items-center gap-3 group">
                  <div className="bg-orange-50 p-1.5 rounded-full group-hover:bg-orange-100 transition-colors">
                    <CheckCircle className="text-orange-600 w-5 h-5" />
                  </div>
                  <span className="text-gray-700 font-medium text-lg">{item}</span>
                </div>
              ))}
            </div>
            
            {/* Additional Brand Section (Static reference from image) */}
            <div className="mt-12 pt-10 border-t border-gray-100">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Why Choose LB Services?</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <div className="p-4 bg-gray-50 rounded-xl text-center">
                        <ShieldCheck className="mx-auto text-orange-600 mb-2" />
                        <span className="text-sm font-bold">Verified Pros</span>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-xl text-center">
                        <Clock className="mx-auto text-orange-600 mb-2" />
                        <span className="text-sm font-bold">Same Day Service</span>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-xl text-center">
                        <BadgeIndianRupee className="mx-auto text-orange-600 mb-2" />
                        <span className="text-sm font-bold">Best Pricing</span>
                    </div>
                </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Service Details Sidebar */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <h3 className="text-xl font-black text-gray-900 mb-6">Service Details</h3>
              <div className="space-y-6">
                <div className="flex justify-between items-center pb-4 border-b border-gray-50">
                  <span className="text-gray-500 font-medium">Price Range</span>
                  <span className="text-orange-600 font-black text-xl">₹{service.price} - ₹2,999</span>
                </div>
                <div className="flex justify-between items-center pb-4 border-b border-gray-50">
                  <span className="text-gray-500 font-medium">Warranty</span>
                  <span className="text-gray-900 font-black">30-90 Days</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-500 font-medium">Service Time</span>
                  <span className="text-gray-900 font-black">Same Day</span>
                </div>
              </div>
            </div>

            {/* Support Card */}
            <div className="bg-[#e65100] rounded-2xl p-8 text-white shadow-lg">
                <h4 className="text-xl font-bold mb-2">Need Help?</h4>
                <p className="text-orange-100 mb-6 text-sm">Talk to our expert if you have any questions regarding {service.title}.</p>
                <a href="tel:9918012227" className="block text-center bg-white text-orange-600 py-3 rounded-xl font-bold hover:bg-orange-50 transition-all">
                    Contact Support
                </a>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Services_Page_Details;