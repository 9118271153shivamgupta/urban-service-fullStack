import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { X, Briefcase, User, Mail, Phone, MapPin, Lock, Award, Hash, Map, Image } from 'lucide-react';

const AddProviderForm = ({ onClose, refreshUsers, initialData = null }) => {
    const [formData, setFormData] = useState({
        username: '', password: '', confirmPassword: '', name: '', phone: '',
        email: '', city: 'Gorakhpur', pincode: '', address: '', 
        experience: '', serviceRange: '', role: 'provider', shopName: ''
    });

    const [shopImage, setShopImage] = useState(null);
    const [ownerImage, setOwnerImage] = useState(null);
    const [loading, setLoading] = useState(false);

    const BASE_URL = 'http://localhost:5000';

    // 🛠️ Effect: Preload profile data in Edit Mode
    useEffect(() => {
        if (initialData) {
            setFormData({
                username: initialData.username || '',
                name: initialData.name || '',
                shopName: initialData.shopName || initialData.name || '',
                phone: initialData.phone || '',
                email: initialData.email || '',
                city: initialData.city || 'Gorakhpur',
                pincode: initialData.pincode || '',
                address: initialData.address || '',
                experience: initialData.experience || '',
                serviceRange: initialData.serviceRange || '',
                role: initialData.role || 'provider',
                password: '', 
                confirmPassword: ''
            });
        }
    }, [initialData]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (formData.password && formData.password !== formData.confirmPassword) {
            return alert("Passwords do not match!");
        }

        setLoading(true);
        try {
            const token = localStorage.getItem('token');
            const data = new FormData();
            
            // Append form keys safely
            Object.keys(formData).forEach(key => {
                if (initialData && (key === 'password' || key === 'confirmPassword') && !formData[key]) {
                    return;
                }
                data.append(key, formData[key]);
            });

            if (shopImage) data.append('shopImage', shopImage);
            if (ownerImage) data.append('ownerImage', ownerImage);

            let response;
            if (initialData && initialData._id) {
                response = await axios.put(`${BASE_URL}/api/auth/update-provider/${initialData._id}`, data, {
                    headers: { 
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data'
                    }
                });
            } else {
                response = await axios.post(`${BASE_URL}/api/auth/register`, data, {
                    headers: { 
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data'
                    }
                });
            }

            if (response.status === 200 || response.status === 201 || response.data.success) {
                alert(initialData ? "Provider Profile Updated Successfully!" : "Shop Provider Registered Successfully!");
                refreshUsers();
                onClose();
            }
        } catch (err) {
            alert(err.response?.data?.message || "Error deploying provider data");
        } finally {
            setLoading(false);
        }
    };

    const inputStyle = "w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm text-white outline-none focus:border-orange-500/50 transition-all placeholder:text-gray-500 font-normal";
    const labelStyle = "text-[10px] font-black uppercase tracking-widest text-gray-500 mb-1.5 flex items-center gap-2";

    return (
        // Max-w-2xl kar diya hai kyunki ab right column hat chuka hai, form neat dikhega
        <div className="p-8 relative max-h-[85vh] overflow-y-auto custom-scrollbar bg-[#061437] font-['Poppins'] max-w-2xl mx-auto rounded-2xl border border-white/5 shadow-2xl">
            <button type="button" onClick={onClose} className="absolute right-6 top-6 text-gray-500 hover:text-white z-10"><X size={24} /></button>

            <div className="mb-8 text-left">
                <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-orange-600 text-white rounded-lg"><Briefcase size={20} /></div>
                    <h2 className="text-2xl font-black text-white uppercase tracking-tighter">
                        {initialData ? "Update Shop & Partner" : "Register Shop & Partner"}
                    </h2>
                </div>
                <p className="text-gray-500 text-xs font-bold uppercase tracking-widest">Setup identity protocols and structural business profile</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5 text-left">
                
                {/* --- Row 1: Names --- */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label className={labelStyle}><User size={12}/> Provider Name</label>
                        <input type="text" placeholder="Full Name" value={formData.name} required className={inputStyle} onChange={(e) => setFormData({...formData, name: e.target.value, shopName: formData.shopName || e.target.value})} />
                    </div>
                    <div>
                        <label className={labelStyle}><Briefcase size={12}/> Shop / Brand Name</label>
                        <input type="text" placeholder="e.g. VS Trading Co." value={formData.shopName} required className={inputStyle} onChange={(e) => setFormData({...formData, shopName: e.target.value})} />
                    </div>
                </div>

                {/* --- Row 2: Credentials --- */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label className={labelStyle}><Hash size={12}/> Username</label>
                        <input type="text" placeholder="shop_gk" value={formData.username} disabled={!!initialData} className={`${inputStyle} ${initialData ? 'opacity-50 cursor-not-allowed' : ''}`} onChange={(e) => setFormData({...formData, username: e.target.value})} />
                    </div>
                    <div>
                        <label className={labelStyle}><Mail size={12}/> Email Address</label>
                        <input type="email" placeholder="partner@gmail.com" value={formData.email} required className={inputStyle} onChange={(e) => setFormData({...formData, email: e.target.value})} />
                    </div>
                </div>

                {/* --- Row 3: Passwords --- */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label className={labelStyle}><Lock size={12}/> {initialData ? "New Password (Optional)" : "Password"}</label>
                        <input type="password" placeholder="••••••••" required={!initialData} className={inputStyle} onChange={(e) => setFormData({...formData, password: e.target.value})} />
                    </div>
                    <div>
                        <label className={labelStyle}><Lock size={12}/> Confirm Password</label>
                        <input type="password" placeholder="••••••••" required={!initialData} className={inputStyle} onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})} />
                    </div>
                </div>

                {/* --- Row 4: Phone & Experience Metrics --- */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                        <label className={labelStyle}><Phone size={12}/> Mobile No</label>
                        <input type="text" placeholder="Active line" value={formData.phone} required className={inputStyle} onChange={(e) => setFormData({...formData, phone: e.target.value})} />
                    </div>
                    <div>
                        <label className={labelStyle}><Award size={12}/> Experience</label>
                        <input type="text" placeholder="e.g. 4 Years" value={formData.experience} className={inputStyle} onChange={(e) => setFormData({...formData, experience: e.target.value})} />
                    </div>
                    <div>
                        <label className={labelStyle}><Map size={12}/> Range (KM)</label>
                        <input type="text" placeholder="e.g. 10 km" value={formData.serviceRange} className={inputStyle} onChange={(e) => setFormData({...formData, serviceRange: e.target.value})} />
                    </div>
                </div>

                {/* --- Row 5: Location Parameters --- */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label className={labelStyle}><MapPin size={12}/> City Base</label>
                        <input type="text" value={formData.city} className={inputStyle} onChange={(e) => setFormData({...formData, city: e.target.value})} />
                    </div>
                    <div>
                        <label className={labelStyle}><Hash size={12}/> Pincode</label>
                        <input type="text" placeholder="273001" value={formData.pincode} className={inputStyle} onChange={(e) => setFormData({...formData, pincode: e.target.value})} />
                    </div>
                </div>

                {/* --- Row 6: Address Textarea --- */}
                <div>
                    <label className={labelStyle}><MapPin size={12}/> Shop Full Address</label>
                    <textarea placeholder="Gorakhpur area, street layout details..." value={formData.address} rows="2" className={`${inputStyle} resize-none`} onChange={(e) => setFormData({...formData, address: e.target.value})}></textarea>
                </div>

                {/* --- Row 7: Binary Media Uploads --- */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                    <div>
                        <label className={labelStyle}><Image size={12}/> Shop Layout Banner</label>
                        <div className="relative w-full bg-white/5 border border-dashed border-white/10 rounded-xl p-2.5 text-center truncate text-xs text-gray-400">
                            <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={(e) => setShopImage(e.target.files[0])} />
                            {shopImage ? shopImage.name : (initialData?.shopImage ? "☑ Change Current Banner" : "Choose File")}
                        </div>
                    </div>
                    <div>
                        <label className={labelStyle}><Image size={12}/> Passport Owner Photo</label>
                        <div className="relative w-full bg-white/5 border border-dashed border-white/10 rounded-xl p-2.5 text-center truncate text-xs text-gray-400">
                            <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={(e) => setOwnerImage(e.target.files[0])} />
                            {ownerImage ? ownerImage.name : (initialData?.ownerImage ? "☑ Change Current Photo" : "Choose File")}
                        </div>
                    </div>
                </div>

                {/* --- Action Bar Footer --- */}
                <div className="pt-6 border-t border-white/10 flex items-center justify-between mt-6">
                    <span className="text-[10px] text-gray-500 font-black uppercase tracking-wider">Database Lock Active</span>
                    <div className="flex gap-4">
                        <button type="button" onClick={onClose} className="px-5 text-xs text-gray-400 font-bold uppercase transition-colors hover:text-white">Cancel</button>
                        <button type="submit" disabled={loading} className="px-8 py-3 bg-orange-600 hover:bg-orange-700 text-white text-xs font-black uppercase rounded-xl shadow-lg transition-transform active:scale-95 disabled:opacity-50">
                            {loading ? "Processing..." : initialData ? "Save Changes" : "Register Partner Profile"}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default AddProviderForm;






// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { X, Briefcase, User, Mail, Phone, MapPin, Lock, Settings, Award, Hash, Map, Image, CheckSquare, Square, Layers, ChevronRight } from 'lucide-react';

// const AddProviderForm = ({ onClose, refreshUsers, initialData = null }) => {
//     const [formData, setFormData] = useState({
//         username: '', password: '', confirmPassword: '', name: '', phone: '',
//         email: '', city: 'Gorakhpur', pincode: '', address: '', 
//         experience: '', serviceRange: '', role: 'provider', shopName: ''
//     });

//     const [dbServices, setDbServices] = useState([]);
//     const [selectedServices, setSelectedServices] = useState([]);
//     const [shopImage, setShopImage] = useState(null);
//     const [ownerImage, setOwnerImage] = useState(null);

//     // 🎛️ Cascading Filter States
//     const [activeType, setActiveType] = useState('');
//     const [activeCategory, setActiveCategory] = useState('');
//     const [activeSubCategory, setActiveSubCategory] = useState('');

//     const BASE_URL = 'http://localhost:5000';

//     // 🛠️ 1. Effect: Preload profile data
//     useEffect(() => {
//         if (initialData) {
//             setFormData({
//                 username: initialData.username || '',
//                 name: initialData.name || '',
//                 shopName: initialData.shopName || initialData.name || '',
//                 phone: initialData.phone || '',
//                 email: initialData.email || '',
//                 city: initialData.city || 'Gorakhpur',
//                 pincode: initialData.pincode || '',
//                 address: initialData.address || '',
//                 experience: initialData.experience || '',
//                 serviceRange: initialData.serviceRange || '',
//                 role: initialData.role || 'provider',
//                 password: '', 
//                 confirmPassword: ''
//             });

//             if (initialData.categories) {
//                 setSelectedServices(initialData.categories);
//             }
//         }
//     }, [initialData]);

//     // 🎯 2. Effect: Load live structural services
//     useEffect(() => {
//         const fetchDbServices = async () => {
//             try {
//                 const res = await axios.get(`${BASE_URL}/api/services`);
//                 setDbServices(res.data);
//             } catch (err) {
//                 console.error("Failed loading mapped relational services", err);
//             }
//         };
//         fetchDbServices();
//     }, []);

//     // 🪄 3. Auto-trigger Dropdowns in Edit Mode
//     useEffect(() => {
//         if (initialData && initialData.categories && initialData.categories.length > 0 && dbServices.length > 0) {
//             const firstSelectedId = initialData.categories[0].serviceId;
//             const mappedService = dbServices.find(s => s._id === firstSelectedId);
            
//             if (mappedService) {
//                 setActiveType(mappedService.serviceType || "General Services");
//                 setActiveCategory(mappedService.category || '');
//                 setActiveSubCategory(mappedService.subCategory || '');
//             }
//         }
//     }, [initialData, dbServices]);

//     // 🧩 Unique categories dynamic extractors
//     const serviceTypes = [...new Set(dbServices.map(s => s.serviceType || "General Services"))];

//     const filteredCategories = activeType 
//         ? [...new Set(dbServices.filter(s => (s.serviceType || "General Services") === activeType).map(s => s.category).filter(Boolean))]
//         : [];

//     const filteredSubCategories = (activeType && activeCategory)
//         ? [...new Set(dbServices.filter(s => (s.serviceType || "General Services") === activeType && s.category === activeCategory).map(s => s.subCategory))]
//         : [];

//     const displayGridServices = dbServices.filter(s => 
//         (s.serviceType || "General Services") === activeType &&
//         s.category === activeCategory &&
//         s.subCategory === activeSubCategory
//     );

//     const handleTypeSelectChange = (typeVal) => {
//         setActiveType(typeVal);
//         setActiveCategory('');
//         setActiveSubCategory('');
//     };

//     const handleCategorySelectChange = (catVal) => {
//         setActiveCategory(catVal);
//         setActiveSubCategory('');
//     };

//     const handleServiceToggle = (serviceObj) => {
//         const exists = selectedServices.find(item => item.serviceId === serviceObj._id);
//         if (exists) {
//             setSelectedServices(selectedServices.filter(item => item.serviceId !== serviceObj._id));
//         } else {
//             setSelectedServices([...selectedServices, { 
//                 serviceId: serviceObj._id, 
//                 serviceName: serviceObj.name,
//                 priceRange: '' 
//             }]);
//         }
//     };

//     const handlePriceChange = (id, priceValue) => {
//         setSelectedServices(selectedServices.map(item => 
//             item.serviceId === id ? { ...item, priceRange: priceValue } : item
//         ));
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
        
//         if (formData.password && formData.password !== formData.confirmPassword) {
//             return alert("Passwords do not match!");
//         }
//         if (selectedServices.length === 0) return alert("Please map at least one unique live service!");

//         const missingPrice = selectedServices.some(item => !item.priceRange || !item.priceRange.toString().trim());
//         if (missingPrice) return alert("Please assign structural rate value for your choices!");

//         try {
//             const token = localStorage.getItem('token');
//             const data = new FormData();
            
//             // Append form keys safely
//             Object.keys(formData).forEach(key => {
//                 if (initialData && (key === 'password' || key === 'confirmPassword') && !formData[key]) {
//                     return;
//                 }
//                 data.append(key, formData[key]);
//             });

//             // 🎯 NEW standard naming schemas parsing to match backend expectations perfectly
//             data.append('categories', JSON.stringify(selectedServices));

//             if (shopImage) data.append('shopImage', shopImage);
//             if (ownerImage) data.append('ownerImage', ownerImage);

//             let response;
//             if (initialData && initialData._id) {
//                 response = await axios.put(`${BASE_URL}/api/auth/update-provider/${initialData._id}`, data, {
//                     headers: { 
//                         Authorization: `Bearer ${token}`,
//                         'Content-Type': 'multipart/form-data'
//                     }
//                 });
//             } else {
//                 response = await axios.post(`${BASE_URL}/api/auth/register`, data, {
//                     headers: { 
//                         Authorization: `Bearer ${token}`,
//                         'Content-Type': 'multipart/form-data'
//                     }
//                 });
//             }

//             if (response.status === 200 || response.status === 201 || response.data.success) {
//                 alert(initialData ? "Provider Profile Updated Successfully!" : "Shop Provider Registered Successfully!");
//                 refreshUsers();
//                 onClose();
//             }
//         } catch (err) {
//             alert(err.response?.data?.message || "Error deploying dynamic model data");
//         }
//     };

//     const inputStyle = "w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm text-white outline-none focus:border-orange-500/50 transition-all placeholder:text-gray-500 font-normal";
//     const selectStyle = "w-full bg-[#0d1e4d] border border-white/10 rounded-xl p-3 text-sm text-white outline-none focus:border-orange-500/50 transition-all cursor-pointer";
//     const labelStyle = "text-[10px] font-black uppercase tracking-widest text-gray-500 mb-1.5 flex items-center gap-2";

//     return (
//         <div className="p-8 relative max-h-[85vh] overflow-y-auto custom-scrollbar bg-[#061437] font-['Poppins']">
//             <button type="button" onClick={onClose} className="absolute right-6 top-6 text-gray-500 hover:text-white z-10"><X size={24} /></button>

//             <div className="mb-8 text-left">
//                 <div className="flex items-center gap-3 mb-2">
//                     <div className="p-2 bg-orange-600 text-white rounded-lg"><Briefcase size={20} /></div>
//                     <h2 className="text-2xl font-black text-white uppercase tracking-tighter">
//                         {initialData ? "Update Shop & Partner" : "Register Shop & Partner"}
//                     </h2>
//                 </div>
//                 <p className="text-gray-500 text-xs font-bold uppercase tracking-widest">Select system auto-loaded items & custom quote your price</p>
//             </div>

//             <form onSubmit={handleSubmit} className="space-y-6 text-left">
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    
//                     {/* --- LEFT LAYER: Identity Matrix Inputs --- */}
//                     <div className="space-y-4">
//                         <div className="grid grid-cols-2 gap-4">
//                             <div>
//                                 <label className={labelStyle}><User size={12}/> Provider Name</label>
//                                 <input type="text" placeholder="Full Name" value={formData.name} required className={inputStyle} onChange={(e) => setFormData({...formData, name: e.target.value, shopName: formData.shopName || e.target.value})} />
//                             </div>
//                             <div>
//                                 <label className={labelStyle}><Hash size={12}/> Username</label>
//                                 <input type="text" placeholder="shop_gk" value={formData.username} disabled={!!initialData} className={`${inputStyle} ${initialData ? 'opacity-50 cursor-not-allowed' : ''}`} onChange={(e) => setFormData({...formData, username: e.target.value})} />
//                             </div>
//                         </div>
//                         <div>
//                             <label className={labelStyle}><Mail size={12}/> Email Address</label>
//                             <input type="email" placeholder="partner@gmail.com" value={formData.email} required className={inputStyle} onChange={(e) => setFormData({...formData, email: e.target.value})} />
//                         </div>
//                         <div className="grid grid-cols-2 gap-4">
//                             <div>
//                                 <label className={labelStyle}><Lock size={12}/> {initialData ? "New Password (Optional)" : "Password"}</label>
//                                 <input type="password" placeholder="••••••••" required={!initialData} className={inputStyle} onChange={(e) => setFormData({...formData, password: e.target.value})} />
//                             </div>
//                             <div>
//                                 <label className={labelStyle}><Lock size={12}/> Confirm Password</label>
//                                 <input type="password" placeholder="••••••••" required={!initialData} className={inputStyle} onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})} />
//                             </div>
//                         </div>
//                         <div>
//                             <label className={labelStyle}><MapPin size={12}/> Shop Full Address</label>
//                             <textarea placeholder="Gorakhpur area, street layout details..." value={formData.address} rows="2" className={`${inputStyle} resize-none`} onChange={(e) => setFormData({...formData, address: e.target.value})}></textarea>
//                         </div>

//                         <div className="grid grid-cols-2 gap-4 pt-1">
//                             <div>
//                                 <label className={labelStyle}><Image size={12}/> Shop Layout Banner</label>
//                                 <div className="relative w-full bg-white/5 border border-dashed border-white/10 rounded-xl p-2.5 text-center truncate text-xs text-gray-400">
//                                     <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={(e) => setShopImage(e.target.files[0])} />
//                                     {shopImage ? shopImage.name : (initialData?.shopImage ? "☑ Change Current Banner" : "Choose File")}
//                                 </div>
//                             </div>
//                             <div>
//                                 <label className={labelStyle}><Image size={12}/> Passport Owner Photo</label>
//                                 <div className="relative w-full bg-white/5 border border-dashed border-white/10 rounded-xl p-2.5 text-center truncate text-xs text-gray-400">
//                                     <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={(e) => setOwnerImage(e.target.files[0])} />
//                                     {ownerImage ? ownerImage.name : (initialData?.ownerImage ? "☑ Change Current Photo" : "Choose File")}
//                                 </div>
//                             </div>
//                         </div>
//                     </div>

//                     {/* --- RIGHT LAYER: DYNAMIC HIERARCHICAL ENGINE SELECTOR --- */}
//                     <div className="space-y-4">
//                         <div>
//                             <label className={labelStyle}><Layers size={12}/> 1. Select Service Type</label>
//                             <select value={activeType} onChange={(e) => handleTypeSelectChange(e.target.value)} className={selectStyle}>
//                                 <option value="">-- Choose Type (e.g. Cleaning / Repair) --</option>
//                                 {serviceTypes.map(type => (
//                                     <option key={type} value={type}>{type}</option>
//                                 ))}
//                             </select>
//                         </div>

//                         <div>
//                             <label className={labelStyle}><Settings size={12}/> 2. Select Main Category</label>
//                             <select value={activeCategory} disabled={!activeType} onChange={(e) => handleCategorySelectChange(e.target.value)} className={`${selectStyle} ${!activeType ? 'opacity-40 cursor-not-allowed' : ''}`}>
//                                 <option value="">-- Choose Category --</option>
//                                 {filteredCategories.map(cat => (
//                                     <option key={cat} value={cat}>{cat}</option>
//                                 ))}
//                             </select>
//                         </div>

//                         <div>
//                             <label className={labelStyle}><ChevronRight size={12}/> 3. Select Sub-Category</label>
//                             <select value={activeSubCategory} disabled={!activeCategory} onChange={(e) => setActiveSubCategory(e.target.value)} className={`${selectStyle} ${!activeCategory ? 'opacity-40 cursor-not-allowed' : ''}`}>
//                                 <option value="">-- Choose Sub-Category --</option>
//                                 {filteredSubCategories.map(sub => (
//                                     <option key={sub || 'general'} value={sub}>{sub || "General Framework"}</option>
//                                 ))}
//                             </select>
//                         </div>

//                         <div>
//                             <label className={labelStyle}><Briefcase size={12}/> 4. Targeted Service Cards & Price Calibration</label>
//                             <div className="grid grid-cols-5 gap-2 px-4 mb-2 text-[10px] font-black uppercase text-gray-400 tracking-wider">
//                                 <span className="col-span-3">Live Map Item</span>
//                                 <span className="col-span-2">Your Rate Setup</span>
//                             </div>

//                             <div className="space-y-2 bg-white/5 border border-white/10 rounded-xl p-4 max-h-[180px] overflow-y-auto custom-scrollbar">
//                                 {!activeSubCategory ? (
//                                     <p className="text-xs text-gray-500 italic text-center py-4">Complete top 3 dropdown steps to populate target cards.</p>
//                                 ) : displayGridServices.length === 0 ? (
//                                     <p className="text-xs text-gray-500 italic text-center py-4">No services mapped under this combination.</p>
//                                 ) : displayGridServices.map(serviceItem => {
//                                     const matchingMap = selectedServices.find(item => item.serviceId === serviceItem._id);
//                                     const isSelected = !!matchingMap;

//                                     return (
//                                         <div key={serviceItem._id} className="grid grid-cols-5 gap-3 items-center border-b border-white/5 pb-2 last:border-none last:pb-0">
//                                             <button type="button" onClick={() => handleServiceToggle(serviceItem)}
//                                                 className={`col-span-3 flex items-center gap-2 p-1 rounded-lg text-left text-xs font-bold transition-all ${
//                                                     isSelected ? 'text-orange-400' : 'text-gray-400'
//                                                 }`}>
//                                                 {isSelected ? <CheckSquare size={14} className="text-orange-500" /> : <Square size={14} />}
//                                                 <span className="truncate">{serviceItem.name}</span>
//                                             </button>

//                                             <div className="col-span-2">
//                                                 <input 
//                                                     type="text" 
//                                                     placeholder={`Base: ${serviceItem.price || '0'}`}
//                                                     disabled={!isSelected}
//                                                     value={matchingMap ? matchingMap.priceRange : ''}
//                                                     onChange={(e) => handlePriceChange(serviceItem._id, e.target.value)}
//                                                     className={`w-full bg-white/5 border rounded-lg px-2 py-1 text-xs text-white outline-none transition-all ${
//                                                         isSelected ? 'border-white/20 focus:border-orange-500/50' : 'border-transparent opacity-10 cursor-not-allowed'
//                                                     }`}
//                                                 />
//                                             </div>
//                                         </div>
//                                     );
//                                 })}
//                             </div>
//                         </div>

//                         <div className="grid grid-cols-2 gap-4">
//                             <div>
//                                 <label className={labelStyle}><Award size={12}/> Experience</label>
//                                 <input type="text" placeholder="e.g. 4 Years" value={formData.experience} className={inputStyle} onChange={(e) => setFormData({...formData, experience: e.target.value})} />
//                             </div>
//                             <div>
//                                 <label className={labelStyle}><Map size={12}/> Range</label>
//                                 <input type="text" placeholder="e.g. 10 km" value={formData.serviceRange} className={inputStyle} onChange={(e) => setFormData({...formData, serviceRange: e.target.value})} />
//                             </div>
//                         </div>
//                         <div className="grid grid-cols-2 gap-4">
//                             <div>
//                                 <label className={labelStyle}><Phone size={12}/> Mobile No</label>
//                                 <input type="text" placeholder="Active line" value={formData.phone} required className={inputStyle} onChange={(e) => setFormData({...formData, phone: e.target.value})} />
//                             </div>
//                             <div>
//                                 <label className={labelStyle}><Hash size={12}/> Pincode</label>
//                                 <input type="text" placeholder="273001" value={formData.pincode} className={inputStyle} onChange={(e) => setFormData({...formData, pincode: e.target.value})} />
//                             </div>
//                         </div>
//                     </div>
//                 </div>

//                 <div className="pt-6 border-t border-white/10 flex items-center justify-between">
//                     <span className="text-[10px] text-gray-500 font-black uppercase tracking-wider">Database Link Active</span>
//                     <div className="flex gap-4">
//                         <button type="button" onClick={onClose} className="px-5 text-xs text-gray-400 font-bold uppercase transition-colors hover:text-white">Cancel</button>
//                         <button type="submit" className="px-8 py-3 bg-orange-600 hover:bg-orange-700 text-white text-xs font-black uppercase rounded-xl shadow-lg transition-transform active:scale-95">
//                             {initialData ? "Save Changes" : "Register Partner Profile"}
//                         </button>
//                     </div>
//                 </div>
//             </form>
//         </div>
//     );
// };

// export default AddProviderForm;