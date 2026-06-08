import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ChevronLeft, CheckCircle2, ShieldCheck } from 'lucide-react';

// 🚀 न्यूली कस्टमाइज्ड ग्रिड कंपोनेंट का इंपोर्ट
import Services_Details_Provider_Card_Grid from './Services_Details_Provider_Card_Grid';

const Home_Services_Page_Details = () => {
  const { serviceId } = useParams();
  const navigate = useNavigate();
  const [service, setService] = useState(null);
  const [providers, setProviders] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState(null);

  const BASE_URL = 'http://localhost:5000';

  // 🌟 Helper extraction safely checks populated fields structure (for string comparisons)
  const getCategoryName = (catField) => {
    if (!catField) return "";
    if (typeof catField === 'object') return catField.name || "";
    return String(catField);
  };

  useEffect(() => {
    const fetchServiceAndProviders = async () => {
      try {
        setLoading(true);
        setApiError(null);

        // 1. Fetch current active service details
        const serviceRes = await axios.get(`${BASE_URL}/api/services`);
        
        // 🌟 FIXED: String fallback matching criteria logic (Mongoose Hex String aur react params safe execution)
        const foundService = (Array.isArray(serviceRes.data) ? serviceRes.data : []).find(
          s => String(s._id) === String(serviceId)
        );
        
        if (!foundService) {
          console.error("No service matched with parameters id:", serviceId);
          setLoading(false);
          return;
        }
        
        setService(foundService);

        // 2. Fetch users/providers and filter based on Category matching matrix
        try {
          const usersResponse = await axios.get(`${BASE_URL}/api/user`);
          let rawUsersData = [];

          if (Array.isArray(usersResponse.data)) {
            rawUsersData = usersResponse.data;
          } else if (usersResponse.data && Array.isArray(usersResponse.data.users)) {
            rawUsersData = usersResponse.data.users;
          }

          const matchedPartners = rawUsersData.filter(user => {
            if (user.role !== 'provider') return false;
            
            const categoriesList = user.providerInfo?.categories || user.categories || [];
            const targetServiceCategory = getCategoryName(foundService.category);

            return categoriesList.some(catItem => {
              const userCatName = getCategoryName(catItem.category);
              
              return (
                (userCatName && targetServiceCategory && userCatName.toLowerCase().trim() === targetServiceCategory.toLowerCase().trim()) ||
                (catItem.serviceTitle && foundService.name && catItem.serviceTitle.toLowerCase().trim() === foundService.name.toLowerCase().trim())
              );
            });
          });

          setProviders(matchedPartners);

        } catch (pErr) {
          console.error("Provider automatic extraction layer encountered error:", pErr);
          try {
            const fallbackRes = await axios.get(`${BASE_URL}/api/user/mapped-partners/${serviceId}`);
            if (fallbackRes.data && fallbackRes.data.success) {
              setProviders(fallbackRes.data.data);
            }
          } catch(fErr) {
            setApiError("Global live synchronization established, sorting data arrays manually.");
          }
        }

      } catch (err) {
        console.error("Pipeline failure on loading items", err);
      } finally {
        setLoading(false);
      }
    };
    
    if (serviceId) fetchServiceAndProviders();
  }, [serviceId]);

  // Safe Features Parser Function
  const getParsedFeatures = (featuresData) => {
    if (!featuresData) return [];
    if (Array.isArray(featuresData)) return featuresData; 
    
    try {
      const parsed = JSON.parse(featuresData);
      return Array.isArray(parsed) ? parsed : [];
    } catch (e) {
      return typeof featuresData === 'string' 
        ? featuresData.split(',').map(f => f.trim()).filter(Boolean)
        : [];
    }
  };

  const initiateCheckoutOrder = async (partner) => {
     const partnerCategories = partner.providerInfo?.categories || partner.categories || [];
     
     const matchedServiceBlock = partnerCategories.find(c => 
       getCategoryName(c.category).toLowerCase().trim() === getCategoryName(service?.category).toLowerCase().trim()
     );
     const assignedPriceSpec = matchedServiceBlock?.priceRange || matchedServiceBlock?.price || service.price;

     const bookingPayload = {
         serviceId: service._id,
         serviceName: service.name,
         providerId: partner._id,
         providerName: partner.name,
         finalPrice: assignedPriceSpec,
         timestamp: new Date().toISOString()
     };

     try {
         const token = localStorage.getItem('token');
         if(!token) return alert('Please login to continue scheduling slots!');

         await axios.post(`${BASE_URL}/api/bookings/create`, bookingPayload, {
             headers: { Authorization: `Bearer ${token}` }
         });
         
         alert(`Booking initiated with ${partner.name} for ₹${assignedPriceSpec}!`);
     } catch(err) {
         alert('Order registration encountered server side error.');
     }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center font-['Poppins']">
        <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }
  
  if (!service) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center font-['Poppins']">
        Service not found. ID mismatch.
      </div>
    );
  }

  const heroImage = service.image ? `${BASE_URL}/${service.image.replace(/\\/g, "/")}` : 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=1200';

  return (
    <div className="min-h-screen bg-[#040d21] text-white font-['Poppins'] pb-20">
        
        {/* BANNER LAYOUT */}
        <div className="relative w-full aspect-[21/9] min-h-[320px] flex items-center overflow-hidden border-b border-white/5">
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent z-10" />
          <img src={heroImage} className="absolute inset-0 w-full h-full object-cover object-center scale-105" alt={service.name} />
          
          <div className="max-w-7xl mx-auto px-6 relative z-20 w-full">
            <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-xs font-black uppercase text-gray-400 bg-white/5 border border-white/10 px-4 py-2 rounded-xl mb-6 hover:text-white hover:border-white/30 transition-all cursor-pointer w-fit">
              <ChevronLeft size={14} /> Back
            </button>
            
            {/* 🌟 FIXED RENDERING LAYER: Objects are no longer rendered as direct children */}
            <span className="text-[10px] bg-indigo-600 px-3 py-1 rounded-full uppercase tracking-widest font-black">
              {getCategoryName(service.serviceType) || 'Service'} / {getCategoryName(service.category) || 'General'}
            </span>
            
            <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mt-3 text-white">{service.name}</h1>
            <p className="text-gray-400 text-xs md:text-sm uppercase tracking-wide max-w-xl mt-2 font-medium">{service.tagline || 'Premium assistance framework'}</p>
          </div>
        </div>

        {/* MAIN BODY GRID */}
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-3 gap-10 mt-12">
            
            {/* LEFT: Content Module */}
            <div className="lg:col-span-2 space-y-8">
                <div className="bg-white/5 border border-white/10 rounded-3xl p-6 md:p-8">
                    <h3 className="text-sm font-black uppercase tracking-widest text-indigo-400 mb-6">Service Inclusion Parameters</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {getParsedFeatures(service.features).length > 0 ? (
                            getParsedFeatures(service.features).map((f, i) => (
                                <div key={i} className="flex items-center gap-3 bg-white/5 border border-white/5 p-4 rounded-xl">
                                    <CheckCircle2 className="text-emerald-400 flex-shrink-0" size={16} />
                                    <span className="text-xs font-bold uppercase tracking-tight text-gray-200">{f}</span>
                                </div>
                            ))
                        ) : (
                            <p className="text-xs text-gray-500 italic">No features specified for this service.</p>
                        )}
                    </div>
                </div>

                <div className="px-2">
                    <h4 className="text-xs font-black uppercase tracking-widest text-gray-500 mb-2">Description Statement</h4>
                    <p className="text-sm text-gray-400 leading-relaxed font-normal">{service.description}</p>
                </div>
            </div>

            {/* RIGHT: System Check Info */}
            <div className="bg-gradient-to-b from-indigo-950/40 to-slate-950 border border-indigo-500/10 rounded-3xl p-6 h-fit text-center">
                <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white mx-auto mb-4 shadow-lg shadow-indigo-600/20"><ShieldCheck size={22} /></div>
                <h4 className="text-base font-black uppercase tracking-tight">Gorakhpur Verified</h4>
                <p className="text-xs text-gray-500 mt-1 leading-relaxed">Every professional undergoes multi-tier skill validation auditing matrix loops before deployment.</p>
            </div>
        </div>

        {/* 🌟 PROVIDERS CARD LIST SECTION */}
        <div className="max-w-7xl mx-auto px-6 mt-20">
            <div className="border-b border-white/10 pb-4 mb-8">
                <h2 className="text-xl md:text-2xl font-black uppercase tracking-tighter">Available Mapped Service Providers</h2>
                <p className="text-xs text-gray-500 font-bold uppercase tracking-widest mt-1">Real time active vendors operating in your area</p>
            </div>

            {/* Calling Separated Card Grid Component */}
            <Services_Details_Provider_Card_Grid 
                providers={providers}
                service={service}
                BASE_URL={BASE_URL}
                onBookNow={initiateCheckoutOrder}
                onViewDetails={(provider) => navigate(`/provider-details/${provider._id}`)} 
            />
        </div>
    </div>
  );
};

export default Home_Services_Page_Details;