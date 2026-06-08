import React from 'react'

const UserProfile = () => {
  return (
    <div>
       this is profiel page 
    </div>
  )
}

export default UserProfile



// import React, { useState } from 'react';
// import { Mail, Phone, Edit, Map, Briefcase, Tag, Layers, Settings } from 'lucide-react';
// import User_Data_Edit_Form from '../components/User_Data_Edit_Form';

// const UserProfile = () => {
//     // LocalStorage se latest user data safely parse karein
//     const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('user')) || null);
//     const [isEditing, setIsEditing] = useState(false);
//     const [loading, setLoading] = useState(false);
//     const [message, setMessage] = useState('');

//     if (!user) {
//         return (
//             <div className="min-h-screen flex items-center justify-center font-['Poppins'] text-gray-500">
//                 User profile data missing. Please log in again.
//             </div>
//         );
//     }

//     const providerCategories = user.providerInfo?.categories || user.categories || [];
//     const isProvider = user.role === 'provider';

//     // 🛠️ Backend par data save/update karne ka debug-tracked function
//     const handleProfileSubmit = async (updatedData) => {
//         setLoading(true);
//         setMessage('');
        
//         console.log("1. Sending payload to backend:", updatedData);

//         try {
//             const token = localStorage.getItem('token');
            
//             const response = await fetch('http://localhost:5000/api/user/update', {
//                 method: 'POST', 
//                 headers: {
//                     'Content-Type': 'application/json',
//                     'Authorization': token ? `Bearer ${token}` : ''
//                 },
//                 body: JSON.stringify({
//                     userId: user._id, // Back-end validation safety matrix fallback
//                     ...updatedData
//                 }),
//             });

//             const result = await response.json();
//             console.log("2. Live Response received from Backend:", result);

//             if (response.ok) {
//                 // Backend standard response structure parse verification:
//                 // Agar data backend direct object me de raha hai ya result.data me, handle both:
//                 const freshUserData = result.data || result.user || (result.name ? result : null);

//                 if (freshUserData) {
//                     const updatedUser = { ...user, ...freshUserData };
//                     localStorage.setItem('user', JSON.stringify(updatedUser));
//                     setUser(updatedUser);
//                     setIsEditing(false);
//                     setMessage('Profile successfully synchronized & saved in Database!');
//                 } else {
//                     setMessage('Profile updated but response format unrecognized.');
//                 }
//             } else {
//                 setMessage(result.message || result.error || 'Failed to save data on server.');
//             }
//         } catch (error) {
//             console.error("Critical Network/Server Error:", error);
//             setMessage('Server connectivity failure. Data not persisted.');
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <div className="max-w-6xl mx-auto p-6 bg-gray-50 min-h-screen font-['Poppins']">
//             {isEditing ? (
//                 <User_Data_Edit_Form 
//                     currentUserData={user} 
//                     onSave={handleProfileSubmit} 
//                     isLoading={loading}
//                     onClose={() => setIsEditing(false)} 
//                 />
//             ) : (
//                 <>
//                     {/* Welcome Header */}
//                     <div className="bg-gradient-to-r from-emerald-400 to-teal-500 text-white p-8 rounded-t-2xl shadow-md">
//                         <span className="text-xs uppercase tracking-widest bg-black/20 px-3 py-1 rounded-full font-extrabold">
//                             {user.role || 'Customer'} Account
//                         </span>
//                         <h1 className="text-3xl font-black uppercase tracking-tight mt-2">Welcome, {user.name}</h1>
//                     </div>

//                     <div className="bg-white p-8 rounded-b-2xl shadow-xl border border-gray-100 relative">
                        
//                         {/* Status Message */}
//                         {message && (
//                             <div className={`mb-4 p-3 rounded-xl text-xs font-bold ${message.includes('successfully') ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-rose-50 text-rose-600 border border-rose-100'}`}>
//                                 {message}
//                             </div>
//                         )}

//                         {/* Edit Button */}
//                         <button 
//                             onClick={() => setIsEditing(true)} 
//                             className="absolute top-6 right-6 flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-xl transition shadow-md shadow-blue-600/10 active:scale-95 cursor-pointer"
//                         >
//                             <Edit size={16} /> Edit Profile
//                         </button>

//                         {/* Profile Header (Avatar) */}
//                         <div className="flex items-center gap-6 mb-8">
//                             <img 
//                                 src={user.providerInfo?.ownerImage || user.profilePic ? `http://localhost:5000/${user.providerInfo?.ownerImage || user.profilePic}` : 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200'} 
//                                 alt="Avatar" 
//                                 className="w-24 h-24 rounded-2xl border-4 border-gray-100 object-cover shadow-inner"
//                                 onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200' }}
//                             />
//                             <div>
//                                 <h2 className="text-2xl font-black text-gray-800 uppercase tracking-tight">{user.name}</h2>
//                                 <p className="text-gray-500 text-sm font-medium">@{user.username || 'user_alias'}</p>
//                             </div>
//                         </div>

//                         {/* Core Details Grid */}
//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
//                             {[
//                                 { label: "Full Name", value: user.name },
//                                 { label: "City Location", value: user.city || "Gorakhpur" },
//                                 { label: "Pincode", value: user.pincode || "Not Configured" },
//                                 { label: "Full Address", value: user.address || "No address synchronized yet." },
//                                 { label: "PAN Card Number", value: user.panCard || "Not Provided" },
//                                 { label: "Identity Card Verification", value: user.aadhaarCard ? "[Aadhaar Redacted]" : "Not Provided" }
//                             ].map((item) => (
//                                 <div key={item.label} className="space-y-1">
//                                     <p className="text-xs font-black uppercase tracking-wider text-gray-400">{item.label}</p>
//                                     <p className="bg-gray-50 border border-gray-100 p-3 rounded-xl text-gray-700 font-bold text-sm">
//                                         {item.value}
//                                     </p>
//                                 </div>
//                             ))}
//                         </div>

//                         {/* Contact Info Row */}
//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
//                             <div className="bg-white p-5 rounded-2xl border border-gray-100 flex items-center gap-4 shadow-sm">
//                                 <Mail className="text-blue-500 w-12 h-12 bg-blue-50 p-3 rounded-xl" />
//                                 <div>
//                                     <p className="text-xs font-black text-gray-400 uppercase tracking-wider">Registered Email</p>
//                                     <p className="font-bold text-gray-800 text-sm break-all">{user.email}</p>
//                                 </div>
//                             </div>
//                             <div className="bg-white p-5 rounded-2xl border border-gray-100 flex items-center gap-4 shadow-sm">
//                                 <Phone className="text-emerald-500 w-12 h-12 bg-emerald-50 p-3 rounded-xl" />
//                                 <div>
//                                     <p className="text-xs font-black text-gray-400 uppercase tracking-wider">Mobile Number</p>
//                                     <p className="font-bold text-gray-800 text-sm">{user.phone || 'N/A'}</p>
//                                 </div>
//                             </div>
//                         </div>

//                         {/* Provider Section */}
//                         {isProvider && (
//                             <div className="mt-10 pt-8 border-t border-gray-100 space-y-8">
//                                 <div className="border-l-4 border-indigo-500 pl-4">
//                                     <h3 className="text-lg font-black uppercase tracking-tight text-gray-800">Operational Matrix & Verified Services</h3>
//                                     <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Live workspace configurations managed by you</p>
//                                 </div>

//                                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
//                                     <div className="bg-slate-50 border border-slate-100 p-4 rounded-xl flex items-center gap-3">
//                                         <Briefcase className="text-indigo-500" size={20} />
//                                         <div>
//                                             <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Experience</p>
//                                             <p className="text-sm font-extrabold text-gray-800">{user.providerInfo?.experience || user.experience || 'Not Mentioned'}</p>
//                                         </div>
//                                     </div>
//                                     <div className="bg-slate-50 border border-slate-100 p-4 rounded-xl flex items-center gap-3">
//                                         <Map className="text-indigo-500" size={20} />
//                                         <div>
//                                             <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Service Range Radius</p>
//                                             <p className="text-sm font-extrabold text-gray-800">{user.providerInfo?.serviceRange || user.serviceRange || 'Gorakhpur Zone'}</p>
//                                         </div>
//                                     </div>
//                                 </div>

//                                 <div className="space-y-4">
//                                     <h4 className="text-xs font-black uppercase tracking-widest text-gray-500 flex items-center gap-1">
//                                         <Tag size={14} className="text-indigo-500" /> Catalogued Services Price Spec
//                                     </h4>
                                    
//                                     {providerCategories.length > 0 ? (
//                                         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                                             {providerCategories.map((cat, idx) => (
//                                                 <div key={idx} className="bg-gradient-to-br from-indigo-50/30 to-white border border-indigo-100 p-5 rounded-2xl shadow-sm flex flex-col justify-between gap-4">
//                                                     <div className="space-y-3">
//                                                         <div className="flex items-start justify-between gap-2">
//                                                             <div>
//                                                                 <p className="text-[10px] font-black text-indigo-500 uppercase tracking-widest">Category</p>
//                                                                 <p className="text-base font-black text-gray-800 uppercase tracking-tight mt-0.5">
//                                                                     {cat.categoryName || cat.category || 'N/A'}
//                                                                 </p>
//                                                             </div>
//                                                             <div className="text-right">
//                                                                 <p className="text-[9px] font-black text-gray-400 uppercase tracking-wider">Price Range</p>
//                                                                 <p className="text-base font-black text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md mt-0.5 inline-block">
//                                                                     ₹{cat.priceRange}
//                                                                 </p>
//                                                             </div>
//                                                         </div>

//                                                         <div className="grid grid-cols-2 gap-2 pt-2 border-t border-dashed border-gray-100">
//                                                             <div>
//                                                                 <p className="text-[9px] font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1">
//                                                                     <Layers size={10} /> Sub-Category
//                                                                 </p>
//                                                                 <p className="text-xs font-bold text-gray-700 mt-0.5">
//                                                                     {cat.subCategoryName || cat.subCategory || 'N/A'}
//                                                                 </p>
//                                                             </div>
//                                                             <div>
//                                                                 <p className="text-[9px] font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1">
//                                                                     <Settings size={10} /> Service Type
//                                                                 </p>
//                                                                 <p className="text-xs font-bold text-gray-700 mt-0.5">
//                                                                     {cat.serviceType || 'Standard'}
//                                                                 </p>
//                                                             </div>
//                                                         </div>
//                                                     </div>
//                                                     <div className="text-[9px] text-gray-400 bg-gray-50 px-2 py-1 rounded-md mt-1 italic flex justify-between">
//                                                         <span>Ref Code: {cat.serviceId || 'N/A'}</span>
//                                                     </div>
//                                                 </div>
//                                             ))}
//                                         </div>
//                                     ) : (
//                                         <p className="text-xs text-gray-400 italic bg-gray-50 border border-dashed p-4 rounded-xl text-center">
//                                             No active service catalogs mapped to your partner account. Use Edit to add tags.
//                                         </p>
//                                     )}
//                                 </div>
//                             </div>
//                         )}
//                     </div>
//                 </>
//             )}
//         </div>
//     );
// };

// export default UserProfile;