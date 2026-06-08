import React from 'react';
import { Store, UserCheck, Phone, MapPin, Hash, ShieldCheck, Eye } from 'lucide-react';

const Services_Details_Provider_Card_Grid = ({ providers, service, BASE_URL, onBookNow, onViewDetails }) => {
    if (!providers || providers.length === 0) {
        return (
            <div className="bg-white/5 border border-dashed border-white/10 rounded-2xl p-12 text-center text-gray-500 text-xs font-black uppercase tracking-widest">
                No active verified partners found matching this dynamic category criteria.
            </div>
        );
    }

    // 🌟 Helper extraction safely checks populated fields structure for safe case matching
    const getCategoryName = (catField) => {
        if (!catField) return "";
        if (typeof catField === 'object') return catField.name || "";
        return String(catField);
    };

    return (
        // 🚀 full-width rows के लिए स्टैक्ड लेआउट (Vertical stack of horizontal cards)
        <div className="flex flex-col gap-4 w-full">
            {providers.map((p) => {
                const partnerCategories = p.providerInfo?.categories || p.categories || [];
                
                // 🌟 FIXED: Typo handled (targetServiceCategory changed to targetServiceCatName)
                const matchedBlock = partnerCategories.find(item => {
                    const providerCatName = getCategoryName(item.category).toLowerCase().trim();
                    const targetServiceCatName = getCategoryName(service?.category).toLowerCase().trim();
                    return providerCatName === targetServiceCatName;
                });

                // 🎯 CRITICAL CHANGE: Only pick Provider's specific price, eliminated admin fallback (service.price)
                const providerPrice = matchedBlock?.priceRange || matchedBlock?.price;
                const finalDisplayPrice = providerPrice ? `₹${providerPrice}` : 'Price on Request';
                
                const targetImage = p.providerInfo?.ownerImage || p.ownerImage || p.profilePic;
                const ownerAvatar = targetImage ? `${BASE_URL}/${targetImage.replace(/\\/g, "/")}` : 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200';

                return (
                    <div 
                        key={p._id} 
                        className="bg-white/5 border border-white/10 hover:border-indigo-500/40 rounded-2xl p-5 transition-all flex flex-col md:flex-row items-center justify-between gap-6 group shadow-xl text-left w-full relative overflow-hidden"
                    >
                        {/* LEFT & CENTER SIDE: Profile Avatar + Core Information Data */}
                        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 w-full md:w-[75%]">
                            
                            {/* 1. Provider Photo Section */}
                            <div className="w-24 h-24 sm:w-28 sm:h-28 bg-slate-900 rounded-xl overflow-hidden relative border border-white/5 flex-shrink-0 shadow-inner">
                                <img 
                                    src={ownerAvatar} 
                                    className="w-full h-full object-cover group-hover:scale-105 transition-all duration-300" 
                                    alt={p.name} 
                                    onError={(e) => { 
                                        e.currentTarget.src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200'; 
                                    }} 
                                />
                                <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 bg-black/80 backdrop-blur-md text-emerald-400 text-[8px] font-black uppercase px-2 py-0.5 rounded-md flex items-center gap-0.5 border border-emerald-500/20 whitespace-nowrap">
                                    <UserCheck size={8} /> Verified
                                </div>
                            </div>

                            {/* 2. Provider Meta Details Matrix */}
                            <div className="space-y-2 w-full text-center sm:text-left">
                                <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                                    <h4 className="text-base font-black uppercase tracking-tight text-white">{p.name}</h4>
                                    <span className="w-fit mx-auto sm:mx-0 text-[9px] bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 font-black px-2 py-0.5 rounded-md uppercase">
                                        Exp: {p.providerInfo?.experience || p.experience || 'N/A'}
                                    </span>
                                </div>

                                {/* Row Details Grid split layout */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1.5 text-xs text-gray-400 font-medium">
                                    <p className="flex items-center justify-center sm:justify-start gap-1.5 text-gray-300">
                                        <Store size={14} className="text-indigo-400 flex-shrink-0" /> 
                                        <span>Shop: <b className="text-white font-semibold">{p.username || 'partner_service'}</b></span>
                                    </p>
                                    
                                    {/* 📍 Location Address */}
                                    <p className="flex items-center justify-center sm:justify-start gap-1.5 truncate">
                                        <MapPin size={14} className="text-rose-400 flex-shrink-0" /> 
                                        <span className="truncate">Location: {p.providerInfo?.serviceRange || p.serviceRange || p.city || 'Gorakhpur'}</span>
                                    </p>
                                    
                                    {/* 📞 Mobile No */}
                                    <p className="flex items-center justify-center sm:justify-start gap-1.5 text-gray-300">
                                        <Phone size={14} className="text-emerald-400 flex-shrink-0" /> 
                                        <span>Mobile: <b className="text-white font-mono font-semibold">{p.phone || 'Contact Private'}</b></span>
                                    </p>

                                    {/* 📮 Zipcode Parameter */}
                                    <p className="flex items-center justify-center sm:justify-start gap-1.5">
                                        <Hash size={14} className="text-amber-400 flex-shrink-0" /> 
                                        <span>Zipcode: <b className="text-white font-mono font-semibold">{p.providerInfo?.zipcode || p.zipcode || '273001'}</b></span>
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* RIGHT SIDE: Dynamic Pricing Matrix & Two Call-to-Actions */}
                        <div className="flex flex-row md:flex-col justify-between items-center md:items-end gap-4 w-full md:w-[22%] pt-4 md:pt-0 border-t md:border-t-0 md:border-l border-white/5 md:pl-6 flex-shrink-0">
                            
                            {/* Price Presentation */}
                            <div className="text-left md:text-right">
                                <p className="text-[9px] text-gray-500 font-black uppercase tracking-wider">Quote Price</p>
                                {/* 🌟 Provider specific custom price display */}
                                <p className="text-xl font-black text-emerald-400">{finalDisplayPrice}</p>
                            </div>

                            {/* 双 Action Buttons Module Container */}
                            <div className="flex items-center md:flex-col gap-2 w-fit md:w-full">
                                {/* 1. View Details Button */}
                                <button 
                                    onClick={() => onViewDetails && onViewDetails(p)}
                                    className="flex items-center justify-center gap-1.5 px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-gray-300 hover:text-white text-[11px] font-bold uppercase tracking-wider rounded-xl transition-all border border-white/5 active:scale-95 cursor-pointer w-full"
                                >
                                    <Eye size={12} /> View Details
                                </button>

                                {/* 2. Book Now Button */}
                                <button 
                                    onClick={() => onBookNow(p)}
                                    className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-[11px] font-black uppercase tracking-wider rounded-xl transition-all active:scale-95 shadow-lg shadow-indigo-600/10 cursor-pointer w-full text-center"
                                >
                                    Book Now
                                </button>
                            </div>
                        </div>

                    </div>
                );
            })}
        </div>
    );
};

export default Services_Details_Provider_Card_Grid;


// import React from 'react';
// import { Store, UserCheck } from 'lucide-react';

// const Services_Details_Provider_Card_Grid = ({ providers, service, BASE_URL, onBookNow }) => {
//     if (!providers || providers.length === 0) {
//         return (
//             <div className="bg-white/5 border border-dashed border-white/10 rounded-2xl p-12 text-center text-gray-500 text-xs font-black uppercase tracking-widest">
//                 No active verified partners found matching this dynamic category criteria.
//             </div>
//         );
//     }

//     return (
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//             {providers.map((p) => {
//                 const partnerCategories = p.providerInfo?.categories || p.categories || [];
                
//                 // Finding dynamic matching object quote rate array loop
//                 const matchedBlock = partnerCategories.find(item => 
//                     item.category?.toLowerCase().trim() === service.category?.toLowerCase().trim()
//                 );
//                 const dynamicCustomRate = matchedBlock?.priceRange || matchedBlock?.price || service.price;
                
//                 const targetImage = p.providerInfo?.ownerImage || p.ownerImage || p.profilePic;
//                 const ownerAvatar = targetImage ? `${BASE_URL}/${targetImage.replace(/\\/g, "/")}` : 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200';

//                 return (
//                     <div key={p._id} className="bg-white/5 border border-white/10 hover:border-indigo-500/50 rounded-2xl p-5 transition-all flex flex-col justify-between group shadow-xl text-left">
//                         <div>
//                             {/* Avatar Section */}
//                             <div className="w-full aspect-square bg-slate-900 rounded-xl overflow-hidden relative border border-white/5 mb-4">
//                                 <img 
//                                     src={ownerAvatar} 
//                                     className="w-full h-full object-cover group-hover:scale-105 transition-all duration-300" 
//                                     alt={p.name} 
//                                     onError={(e) => { 
//                                         e.currentTarget.src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200'; 
//                                     }} 
//                                 />
//                                 <div className="absolute top-2 left-2 bg-black/80 backdrop-blur-md text-emerald-400 text-[9px] font-black uppercase px-2.5 py-1 rounded-full flex items-center gap-1 border border-emerald-500/20">
//                                     <UserCheck size={10} /> Active Profile
//                                 </div>
//                             </div>

//                             {/* Details Section */}
//                             <div className="space-y-1">
//                                 <h4 className="text-sm font-black uppercase tracking-tight text-white line-clamp-1">{p.name}</h4>
//                                 <p className="text-[11px] text-gray-400 font-bold uppercase tracking-wider flex items-center gap-1">
//                                     <Store size={12} className="text-indigo-400" /> Shop: {p.username || 'partner_service'}
//                                 </p>
//                                 <div className="pt-2 flex flex-wrap gap-1">
//                                     <span className="text-[9px] bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 font-black px-2 py-0.5 rounded-md uppercase">
//                                         Exp: {p.providerInfo?.experience || p.experience || 'N/A'}
//                                     </span>
//                                     <span className="text-[9px] bg-slate-800 text-gray-400 font-black px-2 py-0.5 rounded-md uppercase">
//                                         Range: {p.providerInfo?.serviceRange || p.serviceRange || 'Gorakhpur'}
//                                     </span>
//                                 </div>
//                             </div>
//                         </div>

//                         {/* Pricing & CTA Section */}
//                         <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between gap-2">
//                             <div>
//                                 <p className="text-[9px] text-gray-500 font-black uppercase tracking-wider">Quote Price</p>
//                                 <p className="text-base font-black text-emerald-400">₹{dynamicCustomRate}</p>
//                             </div>
//                             <button 
//                                 onClick={() => onBookNow(p)}
//                                 className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-[11px] font-black uppercase tracking-wider rounded-xl transition-all active:scale-95 shadow-lg shadow-indigo-600/10 cursor-pointer"
//                             >
//                                 Book Now
//                             </button>
//                         </div>
//                     </div>
//                 );
//             })}
//         </div>
//     );
// };

// export default Services_Details_Provider_Card_Grid;