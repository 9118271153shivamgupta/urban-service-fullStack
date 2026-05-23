import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ChevronLeft, CheckCircle2, Phone, Star, X } from 'lucide-react';
import ServiceBooking from './ServiceBooking'; 

const Home_Services_Page_Details = () => {
  const { serviceId } = useParams();
  const navigate = useNavigate();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  // Backend Base URL
  const BASE_URL = 'http://localhost:5000';

  useEffect(() => {
    const fetchServiceDetails = async () => {
      try {
        setLoading(true);
        // Backend से इस specific ID की सर्विस मंगवाना
        const res = await axios.get(`${BASE_URL}/api/services`);
        // चूंकि अभी हमारे पास single service fetch का route नहीं है, 
        // हम list में से filter कर रहे हैं (बाद में आप router.get('/:id') बना सकते हैं)
        const foundService = res.data.find(s => s._id === serviceId);
        setService(foundService);
      } catch (err) {
        console.error("Error fetching service details:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchServiceDetails();
  }, [serviceId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-black"></div>
      </div>
    );
  }

  if (!service) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-10 text-center font-poppins">
        <h2 className="text-2xl font-bold text-gray-800">Service Not Found</h2>
        <button onClick={() => navigate('/')} className="mt-4 text-blue-600 underline font-bold uppercase">Go back to home</button>
      </div>
    );
  }

  const openBookingModal = () => setIsBookingModalOpen(true);
  const closeBookingModal = () => setIsBookingModalOpen(false);

  // Image path format fix
  const heroImage = service.image 
    ? `${BASE_URL}/${service.image.replace(/\\/g, "/")}` 
    : '/hero.jpg';

  return (
    <>
      <div className={`min-h-screen pb-10 font-poppins transition-all duration-500 ${isBookingModalOpen ? 'blur-md scale-[0.98] pointer-events-none' : ''}`}>
        
        {/* --- HERO SECTION --- */}
        <div 
          className="relative w-full min-h-[500px] md:min-h-0 md:aspect-[21/9] flex items-center justify-center overflow-hidden"
          style={{
            backgroundImage: `linear-gradient(to right, rgba(255,255,255,0.95), rgba(255,255,255,0.4)), url(${heroImage})`, 
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10 w-full pt-12 pb-16">
            <button 
              onClick={() => navigate(-1)} 
              className="flex items-center text-white mb-6 md:mb-12 cursor-pointer hover:bg-gray-800 transition-all text-xs md:text-sm font-bold bg-black px-5 py-2.5 rounded-full shadow-xl w-fit"
            >
              <ChevronLeft size={16} /> <span>Back to Services</span>
            </button>
            
            <div className="space-y-4 md:space-y-6 max-w-4xl">
              <div className="flex items-center gap-2 bg-black text-white px-3 py-1 rounded-full w-fit text-[10px] md:text-xs font-black uppercase tracking-wider">
                <Star size={12} fill="currentColor" /> Premium Gorakhpur Service
              </div>

              <h1 className="text-3xl md:text-6xl font-black text-black leading-tight uppercase tracking-tighter">
                {service.name} <br className="hidden md:block" />
                <span className="text-black">in Gorakhpur</span>
              </h1>

              <div className="flex items-center gap-3 md:gap-4 text-xl md:text-2xl font-bold text-black">
                <span className="text-lg font-medium opacity-70">Starting at</span>
                <span className="bg-black px-4 py-1.5 md:px-6 md:py-2 rounded-xl text-white font-black shadow-lg">
                  {service.price}
                </span>
              </div>

              <p className="text-black text-sm md:text-lg leading-relaxed max-w-2xl font-medium opacity-90 uppercase tracking-tight">
                {service.tagline || service.description?.substring(0, 100) + "..."}
              </p>
              
              <div className="pt-4 md:pt-6">
                <button 
                  onClick={openBookingModal} 
                  className="w-full sm:w-fit bg-black text-white px-10 py-3.5 md:px-12 md:py-4.5 rounded-2xl font-black flex items-center justify-center gap-3 shadow-2xl hover:bg-gray-900 transition-all active:scale-95 text-base md:text-lg uppercase"
                >
                   Book Your Slot
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* --- DETAILS GRID --- */}
        <div className="max-w-7xl mx-auto px-4 md:px-6 mt-10 md:mt-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-10">
            <div className="lg:col-span-2 space-y-8 md:space-y-10">
              
              {/* Features Card */}
              <div className="bg-black rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-12 shadow-2xl">
                <h2 className="text-2xl md:text-3xl font-black text-white mb-6 md:mb-10 text-center md:text-left uppercase tracking-tighter">What's Included</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
                  {service.features && service.features.length > 0 ? (
                    service.features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-3 bg-white p-4 md:p-5 rounded-2xl md:rounded-3xl shadow-sm hover:scale-[1.02] transition-transform">
                        <div className="bg-black p-2 md:p-3 rounded-xl shrink-0">
                          <CheckCircle2 className="text-white" size={18} />
                        </div>
                        <span className="text-black font-bold text-sm md:text-lg leading-tight uppercase tracking-tighter">{feature}</span>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-400">Features information not available.</p>
                  )}
                </div>
              </div>

              {/* Description Section */}
              <div className="p-4 md:p-2">
                 <h3 className="text-xl font-black text-black mb-4 uppercase">Description</h3>
                 <p className="text-gray-600 leading-relaxed font-medium">
                    {service.description}
                 </p>
              </div>
            </div>

            {/* Sidebar */}
            <div className="bg-black rounded-[2rem] md:rounded-[2.5rem] p-8 md:p-10 h-fit space-y-6 shadow-2xl mb-10 md:mb-0">
                <div className="text-center">
                    <div className="w-14 h-14 md:w-16 md:h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 md:mb-5">
                        <Phone className="text-black" size={22} />
                    </div>
                    <h4 className="font-black text-white text-xl md:text-2xl mb-2 uppercase">Need Help?</h4>
                    <p className="text-white/70 text-sm md:text-base mb-6 md:mb-8 leading-relaxed font-medium">
                        Talk to our expert team for more details about {service.name}.
                    </p>
                    
                    <a 
                      href="tel:+919876543210" 
                      className="w-full py-4 bg-white text-black font-black rounded-2xl border-2 border-white transition-all flex items-center justify-center gap-3 active:scale-95 text-base md:text-lg uppercase hover:bg-gray-100"
                    >
                        <Phone size={18} fill="currentColor" /> Call Now
                    </a>
                </div>
            </div>
          </div>
        </div>
      </div>

      {/* --- BOOKING MODAL --- */}
      {isBookingModalOpen && (
        <div className="fixed inset-0 z-[10000] flex items-end md:items-center justify-center p-0 md:p-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={closeBookingModal}></div>
          <div className="bg-black rounded-t-[2.5rem] md:rounded-[2.5rem] p-6 md:p-8 max-w-xl w-full shadow-2xl relative z-[10001] max-h-[90vh] overflow-y-auto border border-white/10">
            <button onClick={closeBookingModal} className="absolute top-4 right-4 md:top-6 md:right-6 p-2 bg-white rounded-full text-black hover:rotate-90 transition-transform shadow-lg">
              <X size={20} />
            </button>
            <div className="mb-6">
              <h2 className="text-2xl md:text-3xl font-black text-white mb-2 uppercase tracking-tighter"> Book Now</h2>
              <div className="flex items-center gap-3">
                <span className="bg-white text-black text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest">{service.name}</span>
                <span className="text-white font-black text-lg">{service.price}</span>
              </div>
            </div>
            <ServiceBooking serviceName={service.name} servicePrice={service.price} onClose={closeBookingModal} /> 
          </div>
        </div>
      )}
    </>
  );
};

export default Home_Services_Page_Details;