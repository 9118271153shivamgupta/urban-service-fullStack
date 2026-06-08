import React from 'react'
import ServiceTypeModal from '../../pages/admin/SuperAdminDashboardComponent/sideBarComponents/add-services/ServiceTypeModal'

const add_services_ByProvider = () => {
  return (
    <div>
 <ServiceTypeModal/>
    </div>
  )
}

export default add_services_ByProvider




// import React, { useState } from 'react';
// import axios from 'axios'; // 🌟 Sahi package se axios import karo!
// import axiosInstance from 'axios'; // standard fallback variable as axios
// import { useNavigate } from 'react-router-dom';
// import { ArrowLeft, Layers, Loader2, ChevronDown } from 'lucide-react';
// import { useServiceDropdowns } from '../../pages/admin/SuperAdminDashboardComponent/sideBarComponents/add-services/useServiceDropdowns';

// const Add_Services_ByProvider = () => {
//     const [user] = useState(() => JSON.parse(localStorage.getItem('user')) || null);
//     const providerId = user?.id || user?._id;

//     const [submitting, setSubmitting] = useState(false);
//     const [showSuggestions, setShowSuggestions] = useState(false);

//     const BASE_URL = 'http://localhost:5000';
//     const navigate = useNavigate();

//     const {
//         formData,
//         serviceTypesList,
//         currentCategoriesList,
//         currentSubCategoriesList,
//         handleTypeChange,
//         handleCategoryChange,
//         handleInputChange,
//     } = useServiceDropdowns();

//     const [serviceName, setServiceName] = useState('');
//     const [servicePrice, setServicePrice] = useState('');

//     const defaultSuggestions = [
//         "Standard Setup Service",
//         "Premium Deep Care",
//         "Express Inspection Repair",
//         "General Fix & Maintenance"
//     ];

//     const handleSubmit = async (e) => {
//         e.preventDefault();
        
//         if (!formData.serviceType || !formData.category || !serviceName || !servicePrice) {
//             alert("Please fill up all required setup fields!");
//             return;
//         }

//         if (!providerId) {
//             alert("Unauthorized! Please login again.");
//             navigate('/login');
//             return;
//         }

//         setSubmitting(true);

//         const selectedTypeObj = serviceTypesList.find(t => t._id === formData.serviceType);
//         const selectedMainObj = currentCategoriesList.find(m => m._id === formData.category);
//         const selectedSubObj = currentSubCategoriesList.find(s => s._id === formData.subCategory);

//         // 🌟 Payload schema structured perfectly for backend single model configuration
//         const payload = {
//             providerId: providerId,
//             serviceType: selectedTypeObj ? selectedTypeObj.name : formData.serviceType,
//             category: selectedMainObj ? selectedMainObj.name : formData.category,
//             subCategory: selectedSubObj ? [selectedSubObj.name] : ['General'],
//             name: serviceName,
//             price: Number(servicePrice), // Parse safely to number
//             description: `Exclusive premium ${serviceName} managed by ${user?.name || 'verified partner'}.`,
//             tagline: "Instant Support Architecture",
//             features: [selectedSubObj ? selectedSubObj.name : 'Standard Setup']
//         };

//         try {
//             // 🌟 FIX: Endpoint mapped to '/api/services/add' to match backend routes structure!
//             await axiosInstance.post(`${BASE_URL}/api/services/add`, payload, {
//                 headers: { 'Content-Type': 'application/json' }
//             });
//             alert('Service successfully customized and deployed to your live active profile!');
//             navigate(-1);
//         } catch (err) {
//             console.error("Single add configuration failed, hitting fallback container...", err);
            
//             // Fallback to batch endpoint if needed
//             try {
//                 const batchPayload = {
//                     providerId,
//                     serviceType: selectedTypeObj ? selectedTypeObj.name : formData.serviceType,
//                     category: selectedMainObj ? selectedMainObj.name : formData.category,
//                     description: `Exclusive premium catalog services by ${user?.name || 'verified partner'}.`,
//                     tagline: "Professional Solutions",
//                     subServicesBatch: [{
//                         name: serviceName,
//                         price: Number(servicePrice),
//                         features: [selectedSubObj ? selectedSubObj.name : 'Standard Setup']
//                     }]
//                 };
//                 await axiosInstance.post(`${BASE_URL}/api/services/add-batch`, batchPayload, {
//                     headers: { 'Content-Type': 'application/json' }
//                 });
//                 alert('Service successfully mapped onto active dataset matrix via fallback channel!');
//                 navigate(-1);
//             } catch (batchErr) {
//                 console.error("Batch deployment path also collapsed:", batchErr);
//                 alert(batchErr.response?.data?.message || "Error deploying dataset matrix to provider profile.");
//             }
//         } finally {
//             setSubmitting(false);
//         }
//     };

//     return (
//         <div className="min-h-screen w-full bg-[#000b21] p-6 font-['Poppins'] text-white flex justify-center items-start">
//             <div className="bg-[#061437] rounded-2xl max-w-xl w-full border border-white/10 shadow-2xl p-6 relative text-left my-8">
                
//                 <button type="button" onClick={() => navigate(-1)} className="absolute top-6 right-6 flex items-center gap-1 text-xs font-bold text-gray-400 hover:text-white transition bg-white/5 px-3 py-1.5 rounded-xl cursor-pointer border border-white/5">
//                     <ArrowLeft size={14} /> Back
//                 </button>

//                 <div className="mb-6">
//                     <h3 className="text-lg font-black text-white uppercase tracking-tight flex items-center gap-2">
//                         <Layers size={18} className="text-indigo-400" /> Deploy Active Service
//                     </h3>
//                     <p className="text-[10px] text-orange-400 font-bold uppercase tracking-wider mt-0.5">Configure operational metrics to live partner workspace</p>
//                 </div>

//                 <form onSubmit={handleSubmit} className="space-y-4">
//                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        
//                         <div className="flex flex-col gap-1">
//                             <label className="text-[10px] font-bold uppercase text-gray-400">Service Type</label>
//                             <select 
//                                 className="p-3 bg-[#000b21] border border-blue-900/40 rounded-xl outline-none text-white text-xs cursor-pointer focus:border-indigo-500"
//                                 value={formData.serviceType || ''}
//                                 onChange={(e) => handleTypeChange(e.target.value)}
//                                 required
//                             >
//                                 <option value="">-- Select Type --</option>
//                                 {serviceTypesList.map(t => (
//                                     <option key={t._id} value={t._id}>{t.name}</option>
//                                 ))}
//                             </select>
//                         </div>

//                         <div className="flex flex-col gap-1">
//                             <label className="text-[10px] font-bold uppercase text-gray-400">Main Category</label>
//                             <select 
//                                 className="p-3 bg-[#000b21] border border-blue-900/40 rounded-xl outline-none text-white text-xs cursor-pointer focus:border-indigo-500 disabled:bg-slate-950 disabled:cursor-not-allowed"
//                                 value={formData.category || ''}
//                                 disabled={!formData.serviceType}
//                                 onChange={(e) => handleCategoryChange(e.target.value)}
//                                 required
//                             >
//                                 <option value="">-- Select Main Category --</option>
//                                 {currentCategoriesList.map(cat => (
//                                     <option key={cat._id} value={cat._id}>{cat.name}</option>
//                                 ))}
//                             </select>
//                         </div>
//                     </div>

//                     <div className="flex flex-col gap-1">
//                         <label className="text-[10px] font-bold uppercase text-gray-400">Sub Category Spec</label>
//                         <select 
//                             className="p-3 bg-[#000b21] border border-blue-900/40 rounded-xl outline-none text-white text-xs cursor-pointer focus:border-indigo-500 disabled:bg-slate-950 disabled:cursor-not-allowed"
//                             value={formData.subCategory || ''}
//                             disabled={!formData.category}
//                             onChange={(e) => handleInputChange('subCategory', e.target.value)}
//                         >
//                             <option value="">-- General / No Subcategory --</option>
//                             {currentSubCategoriesList.map(sub => (
//                                 <option key={sub._id} value={sub._id}>{sub.name}</option>
//                             ))}
//                         </select>
//                     </div>

//                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                         <div className="flex flex-col gap-1 relative">
//                             <label className="text-[10px] font-bold uppercase text-gray-400">Service Title / Name</label>
//                             <div className="relative flex items-center">
//                                 <input 
//                                     type="text" 
//                                     placeholder="Type service name..." 
//                                     className="w-full p-3 bg-[#000b21] border border-blue-900/40 rounded-xl text-xs text-white outline-none focus:border-indigo-500 pr-10 disabled:bg-slate-950 disabled:cursor-not-allowed"
//                                     value={serviceName}
//                                     disabled={!formData.category}
//                                     onChange={(e) => setServiceName(e.target.value)}
//                                     onFocus={() => setShowSuggestions(true)}
//                                     onBlur={() => setTimeout(() => setShowSuggestions(false), 250)}
//                                     required
//                                 />
//                                 <ChevronDown 
//                                     size={16} 
//                                     className="absolute right-3 text-gray-400 cursor-pointer hover:text-white" 
//                                     onClick={() => formData.category && setShowSuggestions(!showSuggestions)}
//                                 />
//                             </div>
                            
//                             {showSuggestions && (
//                                 <div className="absolute top-[100%] left-0 w-full bg-[#000b21] border border-blue-900/60 rounded-xl mt-1 max-h-40 overflow-y-auto z-50 shadow-2xl divide-y divide-white/5">
//                                     {defaultSuggestions.map((suggestion, index) => (
//                                         <div 
//                                             key={index}
//                                             className="p-2.5 text-xs text-gray-300 hover:bg-indigo-600 hover:text-white cursor-pointer transition-colors"
//                                             onMouseDown={() => {
//                                                 setServiceName(suggestion);
//                                                 setShowSuggestions(false);
//                                             }}
//                                         >
//                                             {suggestion}
//                                         </div>
//                                     ))}
//                                 </div>
//                             )}
//                         </div>

//                         <div className="flex flex-col gap-1">
//                             <label className="text-[10px] font-bold uppercase text-gray-400">Rate Matrix (₹)</label>
//                             <input 
//                                 type="number" 
//                                 placeholder="e.g. 499" 
//                                 className="p-3 bg-[#000b21] border border-blue-900/40 rounded-xl text-xs text-white outline-none font-mono focus:border-indigo-500 disabled:bg-slate-950 disabled:cursor-not-allowed"
//                                 value={servicePrice}
//                                 disabled={!formData.category}
//                                 onChange={(e) => setServicePrice(e.target.value)}
//                                 required
//                             />
//                         </div>
//                     </div>

//                     <div className="pt-4 flex items-center justify-end gap-3 border-t border-white/5">
//                         <button 
//                             type="button" 
//                             onClick={() => navigate(-1)} 
//                             className="px-4 py-2.5 bg-white/5 hover:bg-white/10 text-white rounded-xl text-xs font-bold uppercase cursor-pointer transition-colors"
//                         >
//                             Cancel
//                         </button>
//                         <button 
//                             type="submit" 
//                             disabled={submitting || !formData.category} 
//                             className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-700 text-white rounded-xl text-xs font-black uppercase tracking-wider flex items-center gap-1.5 cursor-pointer transition-all active:scale-95 shadow-lg"
//                         >
//                             {submitting ? <Loader2 size={14} className="animate-spin" /> : "Publish to My Profile"}
//                         </button>
//                     </div>
//                 </form>
//             </div>
//         </div>
//     );
// };

// export default Add_Services_ByProvider;