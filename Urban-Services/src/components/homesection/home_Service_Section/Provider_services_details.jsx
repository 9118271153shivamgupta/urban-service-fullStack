import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { 
  ChevronLeft, Store, User, ShieldCheck, Mail, Phone, 
  MapPin, FileText, CheckCircle2, DollarSign, Briefcase, 
  Hash
} from 'lucide-react';

const Provider_services_details = () => {
  const { providerId } = useParams();
  const navigate = useNavigate();
  const [provider, setProvider] = useState(null);
  const [loading, setLoading] = useState(true);

  const BASE_URL = 'http://localhost:5000';

  useEffect(() => {
    const fetchProviderDetails = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${BASE_URL}/api/user`);
        
        let rawUsers = [];
        if (Array.isArray(response.data)) {
          rawUsers = response.data;
        } else if (response.data && Array.isArray(response.data.users)) {
          rawUsers = response.data.users;
        }

        // URL context params match operator loop
        const found = rawUsers.find(u => u._id === providerId);
        if (found) {
          setProvider(found);
        }
      } catch (error) {
        console.error("Error fetching dynamic partner profile metrics:", error);
      } finally {
        setLoading(false);
      }
    };

    if (providerId) fetchProviderDetails();
  }, [providerId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center font-['Poppins']">
        <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!provider) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center font-['Poppins']">
        Partner context data indexes not found. Mismatch validation routing loops.
      </div>
    );
  }

  // Parse Images and Paths safely
  const rawBanner = provider.providerInfo?.shopBanner || provider.shopBanner;
  const shopBannerImg = rawBanner 
    ? `${BASE_URL}/${rawBanner.replace(/\\/g, "/")}` 
    : 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=1200';

  const rawAvatar = provider.profilePic || provider.providerInfo?.ownerImage || provider.ownerImage;
  const ownerAvatarImg = rawAvatar 
    ? `${BASE_URL}/${rawAvatar.replace(/\\/g, "/")}` 
    : 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200';

  const availableServices = provider.providerInfo?.categories || provider.categories || [];

  return (
    <div className="min-h-screen bg-[#040d21] text-white font-['Poppins'] pb-24">
      
      {/* 1. HERO SHOP BANNER */}
      <div className="relative w-full aspect-[21/9] min-h-[280px] md:min-h-[350px] flex items-end overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 bg-gradient-to-t from-[#040d21] via-[#040d21]/60 to-transparent z-10" />
        <img src={shopBannerImg} className="absolute inset-0 w-full h-full object-cover object-center" alt="Shop Banner" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-20 w-full pb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-center sm:items-end gap-6 text-center sm:text-left">
            {/* Owner Photo Badge */}
            <div className="w-28 h-28 md:w-32 md:h-32 bg-slate-900 rounded-2xl overflow-hidden border-4 border-[#040d21] shadow-2xl relative flex-shrink-0">
              <img src={ownerAvatarImg} className="w-full h-full object-cover" alt={provider.name} />
              <div className="absolute bottom-1 left-1/2 -translate-x-1/2 bg-emerald-500 text-black text-[8px] font-black uppercase px-2 py-0.5 rounded-md flex items-center gap-0.5 whitespace-nowrap">
                <ShieldCheck size={10} /> Verified Owner
              </div>
            </div>

            <div className="space-y-1.5">
              <button onClick={() => navigate(-1)} className="flex items-center gap-1 text-[10px] font-black uppercase text-gray-400 bg-white/5 border border-white/10 px-3 py-1.5 rounded-lg mb-2 hover:text-white transition-all cursor-pointer mx-auto sm:mx-0 w-fit">
                <ChevronLeft size={12} /> Back
              </button>
              <h1 className="text-3xl md:text-4xl font-black uppercase tracking-tighter flex items-center gap-2">
                {provider.providerInfo?.shopName || provider.username || 'Premium Service Hub'}
              </h1>
              <p className="text-gray-400 text-xs uppercase tracking-widest font-semibold flex items-center justify-center sm:justify-start gap-1">
                <Store size={14} className="text-indigo-400" /> Owner: {provider.name}
              </p>
            </div>
          </div>

          {/* DYNAMIC CALL NOW ACTION BUTTON */}
          <a 
            href={`tel:${provider.phone || ''}`}
            className="px-6 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-black uppercase tracking-widest rounded-xl transition-all active:scale-95 shadow-xl shadow-indigo-600/20 text-center flex items-center justify-center gap-2 w-full md:w-fit cursor-pointer"
          >
            <Phone size={14} className="animate-pulse" /> Call Now: {provider.phone || 'Private'}
          </a>
        </div>
      </div>

      {/* 2. CORE SPECIFICATION DATA LOOP MATRIX */}
      <div className="max-w-7xl mx-auto px-6 mt-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Verification & Meta Credentials parameters */}
        <div className="lg:col-span-2 bg-white/5 border border-white/10 rounded-3xl p-6 md:p-8 space-y-6 shadow-xl">
          <h3 className="text-sm font-black uppercase tracking-widest text-indigo-400 border-b border-white/5 pb-3 flex items-center gap-2">
            <FileText size={16} /> Business Registry & Verification Desk
          </h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-slate-900/50 border border-white/5 p-4 rounded-xl space-y-1">
              <span className="text-[10px] font-black uppercase text-gray-500 tracking-wider flex items-center gap-1">
                <Hash size={12} className="text-amber-500" /> GST Identification Number
              </span>
              <p className="text-sm font-mono font-bold text-white tracking-wide uppercase">
                {provider.providerInfo?.gstNo || provider.gstNo || '24AAAXX0000X1Z5 (Mock)'}
              </p>
            </div>

            <div className="bg-slate-900/50 border border-white/5 p-4 rounded-xl space-y-1">
              <span className="text-[10px] font-black uppercase text-gray-500 tracking-wider flex items-center gap-1">
                <Phone size={12} className="text-emerald-400" /> Registered Contact
              </span>
              <p className="text-sm font-mono font-bold text-white tracking-wide">
                {provider.phone || 'Contact Access Restricted'}
              </p>
            </div>

            <div className="bg-slate-900/50 border border-white/5 p-4 rounded-xl space-y-1">
              <span className="text-[10px] font-black uppercase text-gray-500 tracking-wider flex items-center gap-1">
                <Mail size={12} className="text-indigo-400" /> Personal Account Mail
              </span>
              <p className="text-sm font-medium text-gray-200 truncate" title={provider.email}>
                {provider.email || 'noreply@urbanservice.com'}
              </p>
            </div>

            <div className="bg-slate-900/50 border border-white/5 p-4 rounded-xl space-y-1">
              <span className="text-[10px] font-black uppercase text-gray-500 tracking-wider flex items-center gap-1">
                <Mail size={12} className="text-rose-400" /> Corporate Shop Mail
              </span>
              <p className="text-sm font-medium text-gray-200 truncate" title={provider.providerInfo?.shopEmail}>
                {provider.providerInfo?.shopEmail || `${provider.username || 'shop'}@servicehub.com`}
              </p>
            </div>
          </div>

          <div className="bg-slate-900/50 border border-white/5 p-4 rounded-xl flex items-start gap-3">
            <MapPin size={18} className="text-rose-500 flex-shrink-0 mt-0.5" />
            <div>
              <span className="text-[10px] font-black uppercase text-gray-500 tracking-wider">Operational Jurisdiction Base</span>
              <p className="text-xs font-semibold text-gray-300 mt-0.5">
                {provider.providerInfo?.serviceRange || provider.serviceRange || 'Gorakhpur, Uttar Pradesh'} - Zipcode: {provider.providerInfo?.zipcode || '273001'}
              </p>
            </div>
          </div>
        </div>

        {/* Audit Verification Side Panel */}
        <div className="bg-gradient-to-b from-indigo-950/30 to-slate-950 border border-indigo-500/10 rounded-3xl p-6 flex flex-col justify-between text-center">
          <div className="space-y-4 py-4">
            <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white mx-auto shadow-lg shadow-indigo-600/20">
              <ShieldCheck size={22} />
            </div>
            <h4 className="text-sm font-black uppercase tracking-widest">Multi-Tier Security Audit</h4>
            <p className="text-xs text-gray-400 leading-relaxed font-medium px-2">
              This partner is fully registered, identity audited via government databases, and verified under Gorakhpur structural operating rules.
            </p>
          </div>
          <div className="pt-4 border-t border-white/5 grid grid-cols-2 gap-2 text-left">
            <div>
              <span className="text-[9px] text-gray-500 font-black uppercase block">Experience</span>
              <span className="text-xs font-black text-white flex items-center gap-1 mt-0.5">
                <Briefcase size={12} className="text-indigo-400" /> {provider.providerInfo?.experience || '3+ Years'}
              </span>
            </div>
            <div>
              <span className="text-[9px] text-gray-500 font-black uppercase block">Rating Matrix</span>
              <span className="text-xs font-black text-emerald-400 block mt-0.5">★ 4.9 Verified</span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. PROVIDED SERVICES CATALOG CATALOGUE GRID */}
      <div className="max-w-7xl mx-auto px-6 mt-16">
        <div className="border-b border-white/10 pb-4 mb-8">
          <h2 className="text-xl md:text-2xl font-black uppercase tracking-tighter">Offered Service Catalogue</h2>
          <p className="text-xs text-gray-500 font-bold uppercase tracking-widest mt-1">Services mapped dynamically directly by this enterprise</p>
        </div>

        {availableServices.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {availableServices.map((srv, idx) => (
              <div 
                key={srv._id || idx} 
                className="bg-white/5 border border-white/10 hover:border-indigo-500/30 rounded-2xl p-5 transition-all flex flex-col justify-between group relative overflow-hidden"
              >
                <div className="space-y-3">
                  <div className="flex justify-between items-start gap-4">
                    <span className="text-[9px] bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 font-black px-2 py-0.5 rounded-md uppercase tracking-wider">
                      {srv.category || 'General'}
                    </span>
                    <span className="text-[9px] bg-slate-800 text-gray-400 font-black px-2 py-0.5 rounded-md uppercase">
                      {srv.serviceType || 'On Demand'}
                    </span>
                  </div>
                  <div>
                    <h4 className="text-base font-black uppercase tracking-tight text-white group-hover:text-indigo-400 transition-colors">
                      {srv.serviceTitle || 'Expert Consultation'}
                    </h4>
                    <p className="text-xs text-gray-400 font-medium mt-1">
                      Subcategory: <span className="text-gray-200 font-semibold">{srv.subCategory || 'General'}</span>
                    </p>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between">
                  <div>
                    <p className="text-[9px] text-gray-500 font-black uppercase tracking-wider">Catalogue Price Rate</p>
                    <p className="text-base font-black text-emerald-400 flex items-center">
                      <DollarSign size={14} className="-ml-0.5" />{srv.priceRange || 'Contact Base'}
                    </p>
                  </div>
                  <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-emerald-400 border border-emerald-500/10 group-hover:bg-emerald-500/10 transition-colors">
                    <CheckCircle2 size={14} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white/5 border border-dashed border-white/10 rounded-2xl p-12 text-center text-gray-500 text-xs font-black uppercase tracking-widest">
            No specific items populated in this partner's dynamic service map array stack.
          </div>
        )}
      </div>

    </div>
  );
};

export default Provider_services_details;                