import React, { useState } from 'react';
import axios from 'axios';
import { X, ImageUp, IdCard } from 'lucide-react';

const User_Data_Edit_Form = ({ currentUserData, onSave, isLoading, onClose }) => {
    const user = currentUserData || JSON.parse(localStorage.getItem('user')) || {};
    const isProvider = user.role === 'provider';

    const [formData, setFormData] = useState({
        userId: user.id || user._id || "",
        name: user.name || "",
        phone: user.phone || "",
        address: user.address || "",
        city: user.city || "",
        pincode: user.pincode || "",
        panCard: user.panCard || "",
        aadhaarCard: user.aadhaarCard || "",
        experience: user.providerInfo?.experience || user.experience || "",
        serviceRange: user.providerInfo?.serviceRange || user.serviceRange || "Gorakhpur",
    });

    const [profilePic, setProfilePic] = useState(null);
    const [localLoading, setLocalLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        
        if (name === "aadhaarCard") {
            const numericValue = value.replace(/\D/g, '');
            setFormData(prev => ({ ...prev, [name]: numericValue }));
            return;
        }
        
        if (name === "panCard") {
            const sanitizedPan = value.toUpperCase().replace(/[^A-Z0-9]/g, '');
            setFormData(prev => ({ ...prev, [name]: sanitizedPan }));
            return;
        }

        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        setLocalLoading(true);
        const data = new FormData();

        Object.keys(formData).forEach(key => data.append(key, formData[key]));
        
        if (profilePic) {
            const uploadKeyName = isProvider ? 'ownerImage' : 'profilePic';
            data.append(uploadKeyName, profilePic);
        }

        try {
            const res = await axios.put('http://localhost:5000/api/user/update', data, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            
            const updatedUser = res.data?.data || res.data?.user;
            
            if (updatedUser) {
                localStorage.setItem('user', JSON.stringify(updatedUser));
                if (typeof onSave === 'function') {
                    onSave(updatedUser);
                }
            }
            
            alert("Complete Profile Package Synchronized Successfully!");
            onClose();
            window.location.reload();
        } catch (err) {
            console.error(err);
            alert(err.response?.data?.message || "Update Execution encountered an error code failure layout.");
        } finally {
            setLocalLoading(false);
        }
    };

    const isSystemLoading = isLoading || localLoading;

    return (
        <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 relative max-w-4xl mx-auto font-['Poppins']">
            <button type="button" onClick={onClose} className="absolute top-6 right-6 text-gray-400 hover:text-red-500 transition cursor-pointer">
                <X size={22} />
            </button>
            
            <h2 className="text-2xl font-black mb-1 text-blue-600 uppercase tracking-tight">Edit Complete Profile</h2>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-8">Update core settings data fields matrix</p>

            <form onSubmit={handleUpdate} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Profile Pic Section */}
                <div className="md:col-span-2 flex items-center gap-5 bg-gray-50 border border-gray-100 p-4 rounded-xl">
                    <img 
                        src={user.providerInfo?.ownerImage || user.profilePic ? `http://localhost:5000/${user.providerInfo?.ownerImage || user.profilePic}` : 'https://via.placeholder.com/150'} 
                        className="w-20 h-20 rounded-xl object-cover border-2 border-blue-500 shadow-sm"
                        onError={(e) => { e.currentTarget.src = 'https://via.placeholder.com/150' }}
                        alt="Avatar Preview"
                    />
                    <div>
                        <p className="text-xs font-black uppercase text-gray-400 tracking-wider mb-2">Display Profile Image Avatar</p>
                        <label className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 text-xs rounded-xl cursor-pointer hover:bg-blue-700 font-extrabold tracking-wider uppercase transition shadow-md shadow-blue-600/10 w-fit">
                            <ImageUp size={14} /> Upload Image
                            <input type="file" onChange={(e) => setProfilePic(e.target.files[0])} className="hidden" />
                        </label>
                    </div>
                </div>

                {/* Core Basic Input Fields */}
                <div className="space-y-1">
                    <label className="text-xs font-black uppercase tracking-wider text-gray-500">Full Name</label>
                    <input name="name" value={formData.name} onChange={handleChange} className="w-full p-3 border border-gray-200 rounded-xl text-sm font-bold text-gray-700 focus:border-blue-500 focus:outline-none" required />
                </div>

                <div className="space-y-1">
                    <label className="text-xs font-black uppercase tracking-wider text-gray-400">Email (Read Only)</label>
                    <input value={user.email || ""} disabled className="w-full p-3 bg-gray-100 border border-gray-200 rounded-xl text-sm font-bold text-gray-400 cursor-not-allowed" />
                </div>

                <div className="space-y-1">
                    <label className="text-xs font-black uppercase tracking-wider text-gray-500">Phone Number</label>
                    <input name="phone" value={formData.phone} onChange={handleChange} className="w-full p-3 border border-gray-200 rounded-xl text-sm font-bold text-gray-700 focus:border-blue-500 focus:outline-none" placeholder="+91..." />
                </div>

                <div className="space-y-1">
                    <label className="text-xs font-black uppercase tracking-wider text-gray-500">City</label>
                    <input name="city" value={formData.city} onChange={handleChange} className="w-full p-3 border border-gray-200 rounded-xl text-sm font-bold text-gray-700 focus:border-blue-500 focus:outline-none" />
                </div>

                <div className="space-y-1">
                    <label className="text-xs font-black uppercase tracking-wider text-gray-500">Pincode</label>
                    <input name="pincode" value={formData.pincode} onChange={handleChange} className="w-full p-3 border border-gray-200 rounded-xl text-sm font-bold text-gray-700 focus:border-blue-500 focus:outline-none" />
                </div>

                {/* --- 🌟 GOVERNMENT KYC IDENTITY SECTIONS --- */}
                <div className="space-y-1">
                    <label className="text-xs font-black uppercase tracking-wider text-gray-500 flex items-center gap-1">
                        <IdCard size={13} className="text-gray-400" /> PAN Card Number
                    </label>
                    <input name="panCard" value={formData.panCard} onChange={handleChange} className="w-full p-3 border border-gray-200 rounded-xl text-sm font-bold text-gray-700 focus:border-blue-500 focus:outline-none uppercase" maxLength={10} placeholder="ABCDE1234F" />
                </div>

                <div className="space-y-1">
                    <label className="text-xs font-black uppercase tracking-wider text-gray-500 flex items-center gap-1">
                        <IdCard size={13} className="text-gray-400" /> Aadhaar Card Number
                    </label>
                    <input name="aadhaarCard" value={formData.aadhaarCard} onChange={handleChange} className="w-full p-3 border border-gray-200 rounded-xl text-sm font-bold text-gray-700 focus:border-blue-500 focus:outline-none" maxLength={12} placeholder="123456789012" />
                </div>

                <div className="md:col-span-2 space-y-1">
                    <label className="text-xs font-black uppercase tracking-wider text-gray-500">Full Address Statement</label>
                    <textarea name="address" value={formData.address} onChange={handleChange} className="w-full p-3 border border-gray-200 rounded-xl text-sm font-bold text-gray-700 focus:border-blue-500 focus:outline-none h-20 resize-none" />
                </div>

                {/* Action Submit Control Button */}
                <button 
                    type="submit" 
                    disabled={isSystemLoading} 
                    className="md:col-span-2 bg-blue-600 text-white font-extrabold uppercase tracking-wider text-xs py-3.5 rounded-xl hover:bg-blue-700 transition shadow-lg shadow-blue-600/10 active:scale-95 disabled:bg-gray-400 cursor-pointer"
                >
                    {isSystemLoading ? "Synchronizing Payload Bundle..." : "Save Complete Profile Package"}
                </button>
            </form>
        </div>
    );
};

export default User_Data_Edit_Form;



// import React, { useState } from 'react';
// import axios from 'axios';
// import { Save, X, ImageUp, Plus, Trash2, Layers, Settings, IdCard } from 'lucide-react';

// const User_Data_Edit_Form = ({ onClose }) => {
//     const user = JSON.parse(localStorage.getItem('user')) || {};
//     const isProvider = user.role === 'provider';

//     // Safely extract categories array configuration setup path
//     const initialCategories = user.providerInfo?.categories || user.categories || [];

//     const [formData, setFormData] = useState({
//         userId: user.id || user._id || "",
//         name: user.name || "",
//         phone: user.phone || "",
//         address: user.address || "",
//         city: user.city || "",
//         pincode: user.pincode || "",
//         // Government ID fields linked to schema
//         panCard: user.panCard || "",
//         aadhaarCard: user.aadhaarCard || "",
        
//         // Provider fields default setting synchronization mapping layers
//         experience: user.providerInfo?.experience || user.experience || "",
//         serviceRange: user.providerInfo?.serviceRange || user.serviceRange || "Gorakhpur",
//     });

//     // Handle nested array state manipulation cleanly
//     const [categories, setCategories] = useState(initialCategories);

//     // Dynamic state management trackers for multi-field catalog inputs
//     const [categoryName, setCategoryName] = useState('');
//     const [subCategoryName, setSubCategoryName] = useState('');
//     const [serviceType, setServiceType] = useState('Standard');
//     const [newPriceRange, setNewPriceRange] = useState('');

//     const [profilePic, setProfilePic] = useState(null);
//     const [loading, setLoading] = useState(false);

//     const handleChange = (e) => {
//         const { name, value } = e.target;
        
//         // Strict input sanitization matrices for KYC fields
//         if (name === "aadhaarCard") {
//             const numericValue = value.replace(/\D/g, '');
//             setFormData(prev => ({ ...prev, [name]: numericValue }));
//             return;
//         }
        
//         if (name === "panCard") {
//             const sanitizedPan = value.toUpperCase().replace(/[^A-Z0-9]/g, '');
//             setFormData(prev => ({ ...prev, [name]: sanitizedPan }));
//             return;
//         }

//         setFormData(prev => ({ ...prev, [name]: value }));
//     };

//     // Add Detailed Service Item to Catalog Array
//     const addCategoryItem = () => {
//         if (!categoryName.trim() || !subCategoryName.trim() || !newPriceRange.trim()) {
//             return alert("Please fill Category, Sub-Category, and Price Range fields.");
//         }
        
//         const newServiceBlock = {
//             categoryName: categoryName.trim(),
//             category: categoryName.trim().toLowerCase(), // DB Reference mapping code
//             subCategoryName: subCategoryName.trim(),
//             subCategory: subCategoryName.trim().toLowerCase(),
//             serviceType: serviceType,
//             priceRange: newPriceRange.trim(),
//             serviceId: "SRV-" + Date.now().toString().slice(-6) // Temporary uniquely generated Ref Code
//         };

//         setCategories([...categories, newServiceBlock]);
        
//         // Form states clear out
//         setCategoryName('');
//         setSubCategoryName('');
//         setServiceType('Standard');
//         setNewPriceRange('');
//     };

//     // Remove Category tag function track layout
//     const removeCategoryItem = (indexToRemove) => {
//         setCategories(categories.filter((_, idx) => idx !== indexToRemove));
//     };

//     const handleUpdate = async (e) => {
//         e.preventDefault();
//         setLoading(true);
//         const data = new FormData();

//         // Standard profiles parameters append tracking setup
//         Object.keys(formData).forEach(key => data.append(key, formData[key]));
        
//         // Push stringified comprehensive category array with dynamic metadata headings
//         data.append('categories', JSON.stringify(categories));
        
//         if (profilePic) {
//             // Check provider specifications to use target server key file mapping
//             const uploadKeyName = isProvider ? 'ownerImage' : 'profilePic';
//             data.append(uploadKeyName, profilePic);
//         }

//         try {
//             // Hitting backend endpoint with axios
//             const res = await axios.put('http://localhost:5000/api/user/update', data, {
//                 headers: {
//                     'Content-Type': 'multipart/form-data'
//                 }
//             });
            
//             if (res.data && res.data.data) {
//                 // Backend controller response sync pattern standardizes logic 
//                 localStorage.setItem('user', JSON.stringify(res.data.data));
//             } else if (res.data && res.data.user) {
//                 localStorage.setItem('user', JSON.stringify(res.data.user));
//             }
            
//             alert("Complete Profile Package Synchronized Successfully!");
//             window.location.reload();
//         } catch (err) {
//             console.error(err);
//             alert(err.response?.data?.message || "Update Execution encountered an error code failure layout.");
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 relative max-w-4xl mx-auto font-['Poppins']">
//             <button type="button" onClick={onClose} className="absolute top-6 right-6 text-gray-400 hover:text-red-500 transition cursor-pointer">
//                 <X size={22} />
//             </button>
            
//             <h2 className="text-2xl font-black mb-1 text-blue-600 uppercase tracking-tight">Edit Complete Profile</h2>
//             <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-8">Update core settings data fields matrix</p>

//             <form onSubmit={handleUpdate} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
//                 {/* Profile Pic Section */}
//                 <div className="md:col-span-2 flex items-center gap-5 bg-gray-50 border border-gray-100 p-4 rounded-xl">
//                     <img 
//                         src={user.providerInfo?.ownerImage || user.profilePic ? `http://localhost:5000/${user.providerInfo?.ownerImage || user.profilePic}` : 'https://via.placeholder.com/150'} 
//                         className="w-20 h-20 rounded-xl object-cover border-2 border-blue-500 shadow-sm"
//                         onError={(e) => { e.currentTarget.src = 'https://via.placeholder.com/150' }}
//                         alt="Avatar Preview"
//                     />
//                     <div>
//                         <p className="text-xs font-black uppercase text-gray-400 tracking-wider mb-2">Display Profile Image Avatar</p>
//                         <label className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 text-xs rounded-xl cursor-pointer hover:bg-blue-700 font-extrabold tracking-wider uppercase transition shadow-md shadow-blue-600/10 w-fit">
//                             <ImageUp size={14} /> Upload Image
//                             <input type="file" onChange={(e) => setProfilePic(e.target.files[0])} className="hidden" />
//                         </label>
//                     </div>
//                 </div>

//                 {/* Core Basic Input Fields */}
//                 <div className="space-y-1">
//                     <label className="text-xs font-black uppercase tracking-wider text-gray-500">Full Name</label>
//                     <input name="name" value={formData.name} onChange={handleChange} className="w-full p-3 border border-gray-200 rounded-xl text-sm font-bold text-gray-700 focus:border-blue-500 focus:outline-none" required />
//                 </div>

//                 <div className="space-y-1">
//                     <label className="text-xs font-black uppercase tracking-wider text-gray-400">Email (Read Only)</label>
//                     <input value={user.email || ""} disabled className="w-full p-3 bg-gray-100 border border-gray-200 rounded-xl text-sm font-bold text-gray-400 cursor-not-allowed" />
//                 </div>

//                 <div className="space-y-1">
//                     <label className="text-xs font-black uppercase tracking-wider text-gray-500">Phone Number</label>
//                     <input name="phone" value={formData.phone} onChange={handleChange} className="w-full p-3 border border-gray-200 rounded-xl text-sm font-bold text-gray-700 focus:border-blue-500 focus:outline-none" placeholder="+91..." />
//                 </div>

//                 <div className="space-y-1">
//                     <label className="text-xs font-black uppercase tracking-wider text-gray-500">City</label>
//                     <input name="city" value={formData.city} onChange={handleChange} className="w-full p-3 border border-gray-200 rounded-xl text-sm font-bold text-gray-700 focus:border-blue-500 focus:outline-none" />
//                 </div>

//                 <div className="space-y-1">
//                     <label className="text-xs font-black uppercase tracking-wider text-gray-500">Pincode</label>
//                     <input name="pincode" value={formData.pincode} onChange={handleChange} className="w-full p-3 border border-gray-200 rounded-xl text-sm font-bold text-gray-700 focus:border-blue-500 focus:outline-none" />
//                 </div>

//                 {/* --- 🌟 GOVERNMENT KYC IDENTITY SECTIONS --- */}
//                 <div className="space-y-1">
//                     <label className="text-xs font-black uppercase tracking-wider text-gray-500 flex items-center gap-1">
//                         <IdCard size={13} className="text-gray-400" /> PAN Card Number
//                     </label>
//                     <input name="panCard" value={formData.panCard} onChange={handleChange} className="w-full p-3 border border-gray-200 rounded-xl text-sm font-bold text-gray-700 focus:border-blue-500 focus:outline-none uppercase" maxLength={10} placeholder="ABCDE1234F" />
//                 </div>

//                 <div className="space-y-1">
//                     <label className="text-xs font-black uppercase tracking-wider text-gray-500 flex items-center gap-1">
//                         <IdCard size={13} className="text-gray-400" /> Aadhaar Card Number
//                     </label>
//                     <input name="aadhaarCard" value={formData.aadhaarCard} onChange={handleChange} className="w-full p-3 border border-gray-200 rounded-xl text-sm font-bold text-gray-700 focus:border-blue-500 focus:outline-none" maxLength={12} placeholder="123456789012" />
//                 </div>

//                 <div className="md:col-span-2 space-y-1">
//                     <label className="text-xs font-black uppercase tracking-wider text-gray-500">Full Address Statement</label>
//                     <textarea name="address" value={formData.address} onChange={handleChange} className="w-full p-3 border border-gray-200 rounded-xl text-sm font-bold text-gray-700 focus:border-blue-500 focus:outline-none h-20 resize-none" />
//                 </div>

//                 {/* 🎯 PROVIDER SPECIFIC SERVICES EDIT SUBSECTION CONTAINER */}
//                 {isProvider && (
//                     <div className="md:col-span-2 mt-4 pt-6 border-t border-dashed border-gray-200 space-y-6">
//                         <div className="flex items-center gap-2 text-indigo-600">
//                             <Layers size={18} />
//                             <h3 className="text-sm font-black uppercase tracking-wider">Provider Operational Matrix Details</h3>
//                         </div>

//                         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                             <div className="space-y-1">
//                                 <label className="text-xs font-black uppercase tracking-wider text-gray-500">Professional Experience (e.g. 5 Years)</label>
//                                 <input name="experience" value={formData.experience} onChange={handleChange} className="w-full p-3 border border-gray-200 rounded-xl text-sm font-bold text-gray-700 focus:border-blue-500 focus:outline-none" placeholder="Experience details" />
//                             </div>
//                             <div className="space-y-1">
//                                 <label className="text-xs font-black uppercase tracking-wider text-gray-500">Service Range Radius Area</label>
//                                 <input name="serviceRange" value={formData.serviceRange} onChange={handleChange} className="w-full p-3 border border-gray-200 rounded-xl text-sm font-bold text-gray-700 focus:border-blue-500 focus:outline-none" placeholder="Gorakhpur Region" />
//                             </div>
//                         </div>

//                         {/* Interactive Categories Matrix Array Complex Block */}
//                         <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 space-y-4">
//                             <label className="text-xs font-black uppercase tracking-wider text-slate-500 block">Manage Service Catalog System (With Complete Sub-Headings)</label>
                            
//                             {/* Multiline Modular Input Fields Setup for Catalogues */}
//                             <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-3">
//                                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
//                                     <input 
//                                         type="text" 
//                                         value={categoryName} 
//                                         onChange={(e) => setCategoryName(e.target.value)} 
//                                         placeholder="Category (e.g., Electrician, Cleaning)" 
//                                         className="p-2.5 border border-gray-200 rounded-lg text-xs font-bold text-gray-700 focus:outline-none focus:border-indigo-500"
//                                     />
//                                     <input 
//                                         type="text" 
//                                         value={subCategoryName} 
//                                         onChange={(e) => setSubCategoryName(e.target.value)} 
//                                         placeholder="Sub-Category (e.g., Fan Repair, Sofa Wash)" 
//                                         className="p-2.5 border border-gray-200 rounded-lg text-xs font-bold text-gray-700 focus:outline-none focus:border-indigo-500"
//                                     />
//                                 </div>
//                                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
//                                     <select 
//                                         value={serviceType} 
//                                         onChange={(e) => setServiceType(e.target.value)} 
//                                         className="p-2.5 border border-gray-200 rounded-lg text-xs font-bold text-gray-600 focus:outline-none focus:border-indigo-500 bg-white"
//                                     >
//                                         <option value="Standard">Standard Service</option>
//                                         <option value="Premium">Premium Package</option>
//                                         <option value="Hourly">Hourly Rate Basis</option>
//                                         <option value="Inspection">Inspection Fee Only</option>
//                                     </select>
//                                     <div className="flex gap-2">
//                                         <input 
//                                             type="text" 
//                                             value={newPriceRange} 
//                                             onChange={(e) => setNewPriceRange(e.target.value)} 
//                                             placeholder="Quote Price (e.g. 299, 500-1000)" 
//                                             className="p-2.5 border border-gray-200 rounded-lg text-xs font-bold text-gray-700 focus:outline-none focus:border-indigo-500 w-full"
//                                         />
//                                         <button 
//                                             type="button" 
//                                             onClick={addCategoryItem} 
//                                             className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 rounded-lg font-bold flex items-center justify-center cursor-pointer transition flex-shrink-0 shadow-md shadow-indigo-600/10"
//                                         >
//                                             <Plus size={16} />
//                                         </button>
//                                     </div>
//                                 </div>
//                             </div>

//                             {/* Render Detailed Categories List Loop queue */}
//                             <div className="space-y-2.5">
//                                 {categories.length > 0 ? (
//                                     categories.map((item, index) => (
//                                         <div key={index} className="flex justify-between items-center bg-white p-4 border rounded-xl shadow-xs text-xs">
//                                             <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-1 w-full mr-4">
//                                                 <div>
//                                                     <span className="text-[9px] text-gray-400 font-black uppercase block">Category</span>
//                                                     <span className="text-gray-800 font-extrabold uppercase tracking-tight">{item.categoryName || item.category}</span>
//                                                 </div>
//                                                 <div>
//                                                     <span className="text-[9px] text-gray-400 font-black uppercase block">Sub-Category</span>
//                                                     <span className="text-gray-700 font-bold">{item.subCategoryName || item.subCategory}</span>
//                                                 </div>
//                                                 <div className="col-span-2 sm:col-span-1">
//                                                     <span className="text-[9px] text-gray-400 font-black uppercase block">Type Basis</span>
//                                                     <span className="bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded text-[10px] font-extrabold inline-block mt-0.5">{item.serviceType || 'Standard'}</span>
//                                                 </div>
//                                             </div>
//                                             <div className="flex items-center gap-4 flex-shrink-0">
//                                                 <div className="text-right">
//                                                     <span className="text-[9px] text-gray-400 font-black block uppercase">Price Spec</span>
//                                                     <span className="text-emerald-600 font-black text-sm">₹{item.priceRange}</span>
//                                                 </div>
//                                                 <button 
//                                                     type="button" 
//                                                     onClick={() => removeCategoryItem(index)}
//                                                     className="text-red-400 hover:text-red-600 transition cursor-pointer p-1.5 hover:bg-red-50 rounded-lg"
//                                                 >
//                                                     <Trash2 size={15} />
//                                                 </button>
//                                             </div>
//                                         </div>
//                                     ))
//                                 ) : (
//                                     <p className="text-[11px] text-gray-400 italic font-medium text-center py-2">No category links mapped yet. Fill information layers above.</p>
//                                 )}
//                             </div>
//                         </div>
//                     </div>
//                 )}

//                 {/* Action Submit Control Button */}
//                 <button 
//                     type="submit" 
//                     disabled={loading} 
//                     className="md:col-span-2 bg-blue-600 text-white font-extrabold uppercase tracking-wider text-xs py-3.5 rounded-xl hover:bg-blue-700 transition shadow-lg shadow-blue-600/10 active:scale-95 disabled:bg-gray-400 cursor-pointer"
//                 >
//                     {loading ? "Synchronizing Payload Bundle..." : "Save Complete Profile Package"}
//                 </button>
//             </form>
//         </div>
//     );
// };

// export default User_Data_Edit_Form;