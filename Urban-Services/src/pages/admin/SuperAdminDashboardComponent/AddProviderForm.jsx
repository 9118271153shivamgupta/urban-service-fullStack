import React, { useState } from 'react';
import axios from 'axios';
import { X, Briefcase, User, Mail, Phone, MapPin, Lock, Settings, Award, Hash, Map, Image, CheckSquare, Square } from 'lucide-react';

const AddProviderForm = ({ onClose, refreshUsers }) => {
    const [formData, setFormData] = useState({
        username: '', password: '', confirmPassword: '', name: '', phone: '',
        email: '', city: 'Gorakhpur', pincode: '', address: '', 
        experience: '', serviceRange: '', role: 'provider'
    });

    // Multi-services State (Objects with custom pricing)
    const [selectedServices, setSelectedServices] = useState([]);
    
    // Images State
    const [shopImage, setShopImage] = useState(null);
    const [ownerImage, setOwnerImage] = useState(null);

    const availableCategories = [
        "Home Cleaning", "Office Cleaning", "Deep Cleaning", "Pest Control", 
        "AC Service", "Room Cleaning", "Sofa Cleaning", "Bathroom Deep Cleaning", 
        "Electrician", "Plumber"
    ];

    // Toggle service select/deselect
    const handleServiceToggle = (cat) => {
        const exists = selectedServices.find(item => item.category === cat);
        if (exists) {
            setSelectedServices(selectedServices.filter(item => item.category !== cat));
        } else {
            setSelectedServices([...selectedServices, { category: cat, priceRange: '' }]);
        }
    };

    // Handle single price typing mapping dynamically
    const handlePriceChange = (cat, priceValue) => {
        setSelectedServices(selectedServices.map(item => 
            item.category === cat ? { ...item, priceRange: priceValue } : item
        ));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) return alert("Passwords do not match!");
        if (selectedServices.length === 0) return alert("Please select at least one service!");

        // Price validation verification check
        const missingPrice = selectedServices.some(item => !item.priceRange.trim());
        if (missingPrice) return alert("Please specify price range for all selected services!");

        try {
            const token = localStorage.getItem('token');
            const data = new FormData();
            
            // 1. Append general text fields perfectly 
            // Inme se experience aur serviceRange ko backend controller 'providerInfo' me automatically pack karega
            Object.keys(formData).forEach(key => {
                data.append(key, formData[key]);
            });

            // 2. Append stringified structured services array
            data.append('categories', JSON.stringify(selectedServices));

            // 3. Append images files safely
            if (shopImage) data.append('shopImage', shopImage);
            if (ownerImage) data.append('ownerImage', ownerImage);

            // 4. Axios Request Call to update on MongoDB Atlas
            const response = await axios.post('http://localhost:5000/api/auth/register', data, {
                headers: { 
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            });

            if (response.status === 201 || response.data.success) {
                alert("Shop Provider Registered Successfully with Services & Prices!");
                refreshUsers();
                onClose();
            }
        } catch (err) {
            console.error("Form submit error details:", err);
            alert(err.response?.data?.message || "Error adding provider data structure");
        }
    };

    const inputStyle = "w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm text-white outline-none focus:border-orange-500/50 transition-all placeholder:text-gray-500 font-normal";
    const labelStyle = "text-[10px] font-black uppercase tracking-widest text-gray-500 mb-1.5 flex items-center gap-2";

    return (
        <div className="p-8 relative max-h-[85vh] overflow-y-auto custom-scrollbar bg-[#061437]">
            {/* Close Button */}
            <button onClick={onClose} className="absolute right-6 top-6 text-gray-500 hover:text-white z-10">
                <X size={24} />
            </button>

            {/* Header */}
            <div className="mb-8">
                <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-orange-600 text-white rounded-lg">
                        <Briefcase size={20} />
                    </div>
                    <h2 className="text-2xl font-black text-white uppercase tracking-tighter">Register Shop & Provider</h2>
                </div>
                <p className="text-gray-500 text-xs font-bold uppercase tracking-widest">Setup single/multi-service shop partner dashboard</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 text-left">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    
                    {/* LEFT PANEL: Identity & Credentials */}
                    <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className={labelStyle}><User size={12}/> Shop/Owner Name</label>
                                <input type="text" placeholder="Full Name" required className={inputStyle}
                                    onChange={(e) => setFormData({...formData, name: e.target.value})} />
                            </div>
                            <div>
                                <label className={labelStyle}><Hash size={12}/> Username</label>
                                <input type="text" placeholder="shop123" required className={inputStyle}
                                    onChange={(e) => setFormData({...formData, username: e.target.value})} />
                            </div>
                        </div>
                        <div>
                            <label className={labelStyle}><Mail size={12}/> Contact Email</label>
                            <input type="email" placeholder="shop@domain.com" required className={inputStyle}
                                onChange={(e) => setFormData({...formData, email: e.target.value})} />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className={labelStyle}><Lock size={12}/> Password</label>
                                <input type="password" placeholder="••••••••" required className={inputStyle}
                                    onChange={(e) => setFormData({...formData, password: e.target.value})} />
                            </div>
                            <div>
                                <label className={labelStyle}><Lock size={12}/> Confirm Password</label>
                                <input type="password" placeholder="••••••••" required className={inputStyle}
                                    onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})} />
                            </div>
                        </div>
                        <div>
                            <label className={labelStyle}><MapPin size={12}/> Full Shop Address</label>
                            <textarea placeholder="Shop No, Street, Landmark details..." rows="3" className={`${inputStyle} resize-none`}
                                onChange={(e) => setFormData({...formData, address: e.target.value})}></textarea>
                        </div>

                        {/* FILE UPLOADS */}
                        <div className="grid grid-cols-2 gap-4 pt-2">
                            <div>
                                <label className={labelStyle}><Image size={12}/> Shop Photo</label>
                                <div className="relative w-full bg-white/5 border border-dashed border-white/10 rounded-xl p-3 text-center hover:border-orange-500/30 transition-all cursor-pointer">
                                    <input type="file" accept="image/*" required className="absolute inset-0 opacity-0 cursor-pointer"
                                        onChange={(e) => setShopImage(e.target.files[0])} />
                                    <p className="text-xs text-gray-400 truncate">{shopImage ? shopImage.name : "Upload Shop Image"}</p>
                                </div>
                            </div>
                            <div>
                                <label className={labelStyle}><Image size={12}/> Owner Photo</label>
                                <div className="relative w-full bg-white/5 border border-dashed border-white/10 rounded-xl p-3 text-center hover:border-orange-500/30 transition-all cursor-pointer">
                                    <input type="file" accept="image/*" required className="absolute inset-0 opacity-0 cursor-pointer"
                                        onChange={(e) => setOwnerImage(e.target.files[0])} />
                                    <p className="text-xs text-gray-400 truncate">{ownerImage ? ownerImage.name : "Upload Owner Image"}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT PANEL: Two-Column Service Configuration */}
                    <div className="space-y-4">
                        <div>
                            <label className={labelStyle}><Settings size={12}/> Configure Services & Price Ranges</label>
                            
                            <div className="grid grid-cols-5 gap-2 px-4 mb-2 text-[10px] font-black uppercase text-gray-400 tracking-wider">
                                <span className="col-span-3">Service Name</span>
                                <span className="col-span-2">Price Range (e.g. 299-799)</span>
                            </div>

                            <div className="space-y-2 bg-white/5 border border-white/10 rounded-xl p-4 max-h-[310px] overflow-y-auto custom-scrollbar">
                                {availableCategories.map(cat => {
                                    const matchingService = selectedServices.find(item => item.category === cat);
                                    const isSelected = !!matchingService;

                                    return (
                                        <div key={cat} className="grid grid-cols-5 gap-3 items-center border-b border-white/5 pb-2 last:border-none last:pb-0">
                                            <button type="button" onClick={() => handleServiceToggle(cat)}
                                                className={`col-span-3 flex items-center gap-2.5 p-1.5 rounded-lg text-left text-xs font-medium transition-all ${
                                                    isSelected ? 'text-orange-400' : 'text-gray-400'
                                                }`}>
                                                {isSelected ? <CheckSquare size={14} className="text-orange-500 flex-shrink-0" /> : <Square size={14} className="flex-shrink-0" />}
                                                <span className="truncate">{cat}</span>
                                            </button>

                                            <div className="col-span-2">
                                                <input 
                                                    type="text" 
                                                    placeholder="₹ Min - Max"
                                                    disabled={!isSelected}
                                                    value={matchingService ? matchingService.priceRange : ''}
                                                    onChange={(e) => handlePriceChange(cat, e.target.value)}
                                                    className={`w-full bg-white/5 border rounded-lg px-2.5 py-1.5 text-xs text-white outline-none transition-all ${
                                                        isSelected ? 'border-white/20 focus:border-orange-500/50' : 'border-transparent opacity-20 cursor-not-allowed'
                                                    }`}
                                                />
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className={labelStyle}><Award size={12}/> Overall Experience</label>
                                <input type="text" placeholder="e.g. 5 yrs" className={inputStyle}
                                    onChange={(e) => setFormData({...formData, experience: e.target.value})} />
                            </div>
                            <div>
                                <label className={labelStyle}><Map size={12}/> Operational Range</label>
                                <input type="text" placeholder="e.g. 15km" className={inputStyle}
                                    onChange={(e) => setFormData({...formData, serviceRange: e.target.value})} />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className={labelStyle}><Phone size={12}/> Primary Mobile</label>
                                <input type="text" placeholder="Phone Number" required className={inputStyle}
                                    onChange={(e) => setFormData({...formData, phone: e.target.value})} />
                            </div>
                            <div>
                                <label className={labelStyle}><Hash size={12}/> Pincode</label>
                                <input type="text" placeholder="273001" className={inputStyle}
                                    onChange={(e) => setFormData({...formData, pincode: e.target.value})} />
                            </div>
                        </div>
                        <div>
                            <label className={labelStyle}><MapPin size={12}/> Active City</label>
                            <input type="text" value={formData.city} className={inputStyle}
                                onChange={(e) => setFormData({...formData, city: e.target.value})} />
                        </div>
                    </div>
                </div>

                {/* Footer Controls */}
                <div className="pt-6 border-t border-white/10 flex items-center justify-between">
                    <span className="text-[10px] text-gray-500 font-black uppercase flex items-center gap-2">
                        <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></span> Shop Status: Live Verification Pending
                    </span>
                    <div className="flex gap-4">
                        <button type="button" onClick={onClose} className="px-6 py-3 text-xs font-black uppercase text-gray-400">Cancel</button>
                        <button type="submit" className="px-10 py-3 bg-orange-600 text-white text-xs font-black uppercase rounded-xl shadow-xl shadow-orange-900/20">
                            Create Shop Partner
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default AddProviderForm;


















// import React, { useState } from 'react';
// import axios from 'axios';
// import { X, Briefcase, User, Mail, Phone, MapPin, Lock, Settings, Award, Hash, IndianRupee, Map, Image, CheckSquare, Square } from 'lucide-react';

// const AddProviderForm = ({ onClose, refreshUsers }) => {
//     const [formData, setFormData] = useState({
//         username: '', password: '', confirmPassword: '', name: '', phone: '',
//         email: '', city: 'Gorakhpur', pincode: '', address: '', 
//         experience: '', basePrice: '', serviceRange: '', role: 'provider'
//     });

//     // Multi-services State (Array structure)
//     const [selectedCategories, setSelectedCategories] = useState([]);
    
//     // Images State
//     const [shopImage, setShopImage] = useState(null);
//     const [ownerImage, setOwnerImage] = useState(null);

//     const availableCategories = [
//         "Home Cleaning", "Office Cleaning", "Deep Cleaning", "Pest Control", 
//         "AC Service", "Room Cleaning", "Sofa Cleaning", "Bathroom Deep Cleaning", 
//         "Electrician", "Plumber"
//     ];

//     // Toggle logic for multiple services selection
//     const handleCategoryToggle = (cat) => {
//         if (selectedCategories.includes(cat)) {
//             setSelectedCategories(selectedCategories.filter(item => item !== cat));
//         } else {
//             setSelectedCategories([...selectedCategories, cat]);
//         }
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         if (formData.password !== formData.confirmPassword) return alert("Passwords do not match!");
//         if (selectedCategories.length === 0) return alert("Please select at least one service!");

//         try {
//             const token = localStorage.getItem('token');
            
//             // Image uploads ke liye standard Multi-part Form construct karenge
//             const data = new FormData();
            
//             // Append textual data
//             Object.keys(formData).forEach(key => {
//                 data.append(key, formData[key]);
//             });

//             // Append selected dynamic multi-services array (Converted to stringified JSON array or joined string)
//             data.append('categories', JSON.stringify(selectedCategories));

//             // Append files securely
//             if (shopImage) data.append('shopImage', shopImage);
//             if (ownerImage) data.append('ownerImage', ownerImage);

//             await axios.post('http://localhost:5000/api/auth/register', data, {
//                 headers: { 
//                     Authorization: `Bearer ${token}`,
//                     'Content-Type': 'multipart/form-data' // Important flag for files transfer
//                 }
//             });

//             alert("Shop Provider Registered Successfully!");
//             refreshUsers();
//             onClose();
//         } catch (err) {
//             alert(err.response?.data?.message || "Error adding provider data structure");
//         }
//     };

//     const inputStyle = "w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm text-white outline-none focus:border-orange-500/50 transition-all placeholder:text-gray-500 font-normal";
//     const labelStyle = "text-[10px] font-black uppercase tracking-widest text-gray-500 mb-1.5 flex items-center gap-2";

//     return (
//         <div className="p-8 relative max-h-[85vh] overflow-y-auto custom-scrollbar bg-[#061437]">
//             {/* Close Button */}
//             <button onClick={onClose} className="absolute right-6 top-6 text-gray-500 hover:text-white z-10">
//                 <X size={24} />
//             </button>

//             {/* Header */}
//             <div className="mb-8">
//                 <div className="flex items-center gap-3 mb-2">
//                     <div className="p-2 bg-orange-600 text-white rounded-lg">
//                         <Briefcase size={20} />
//                     </div>
//                     <h2 className="text-2xl font-black text-white uppercase tracking-tighter">Register Shop & Provider</h2>
//                 </div>
//                 <p className="text-gray-500 text-xs font-bold uppercase tracking-widest">Setup single/multi-service shop partner dashboard</p>
//             </div>

//             <form onSubmit={handleSubmit} className="space-y-6 text-left">
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    
//                     {/* LEFT PANEL: Identity & Credentials */}
//                     <div className="space-y-4">
//                         <div className="grid grid-cols-2 gap-4">
//                             <div>
//                                 <label className={labelStyle}><User size={12}/> Shop/Owner Name</label>
//                                 <input type="text" placeholder="Full Name" required className={inputStyle}
//                                     onChange={(e) => setFormData({...formData, name: e.target.value})} />
//                             </div>
//                             <div>
//                                 <label className={labelStyle}><Hash size={12}/> Username</label>
//                                 <input type="text" placeholder="shop123" required className={inputStyle}
//                                     onChange={(e) => setFormData({...formData, username: e.target.value})} />
//                             </div>
//                         </div>
//                         <div>
//                             <label className={labelStyle}><Mail size={12}/> Contact Email</label>
//                             <input type="email" placeholder="shop@domain.com" required className={inputStyle}
//                                 onChange={(e) => setFormData({...formData, email: e.target.value})} />
//                         </div>
//                         <div className="grid grid-cols-2 gap-4">
//                             <div>
//                                 <label className={labelStyle}><Lock size={12}/> Password</label>
//                                 <input type="password" placeholder="••••••••" required className={inputStyle}
//                                     onChange={(e) => setFormData({...formData, password: e.target.value})} />
//                             </div>
//                             <div>
//                                 <label className={labelStyle}><Lock size={12}/> Confirm Password</label>
//                                 <input type="password" placeholder="••••••••" required className={inputStyle}
//                                     onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})} />
//                             </div>
//                         </div>
//                         <div>
//                             <label className={labelStyle}><MapPin size={12}/> Full Shop Address</label>
//                             <textarea placeholder="Shop No, Street, Landmark details..." rows="3" className={`${inputStyle} resize-none`}
//                                 onChange={(e) => setFormData({...formData, address: e.target.value})}></textarea>
//                         </div>

//                         {/* --- NEW SECTION: FILE UPLOADS --- */}
//                         <div className="grid grid-cols-2 gap-4 pt-2">
//                             <div>
//                                 <label className={labelStyle}><Image size={12}/> Shop Photo</label>
//                                 <div className="relative w-full bg-white/5 border border-dashed border-white/10 rounded-xl p-3 text-center hover:border-orange-500/30 transition-all cursor-pointer">
//                                     <input type="file" accept="image/*" required className="absolute inset-0 opacity-0 cursor-pointer"
//                                         onChange={(e) => setShopImage(e.target.files[0])} />
//                                     <p className="text-xs text-gray-400 truncate">{shopImage ? shopImage.name : "Upload Shop Image"}</p>
//                                 </div>
//                             </div>
//                             <div>
//                                 <label className={labelStyle}><Image size={12}/> Owner Photo</label>
//                                 <div className="relative w-full bg-white/5 border border-dashed border-white/10 rounded-xl p-3 text-center hover:border-orange-500/30 transition-all cursor-pointer">
//                                     <input type="file" accept="image/*" required className="absolute inset-0 opacity-0 cursor-pointer"
//                                         onChange={(e) => setOwnerImage(e.target.files[0])} />
//                                     <p className="text-xs text-gray-400 truncate">{ownerImage ? ownerImage.name : "Upload Owner Image"}</p>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>

//                     {/* RIGHT PANEL: Multi-Service Config & Core Data */}
//                     <div className="space-y-4">
//                         {/* MULTI SERVICES SELECTION GRID */}
//                         <div>
//                             <label className={labelStyle}><Settings size={12}/> Select Available Services (More than one allowed)</label>
//                             <div className="grid grid-cols-2 gap-2 bg-white/5 border border-white/10 rounded-xl p-4 max-h-[165px] overflow-y-auto custom-scrollbar">
//                                 {availableCategories.map(cat => {
//                                     const isSelected = selectedCategories.includes(cat);
//                                     return (
//                                         <button type="button" key={cat} onClick={() => handleCategoryToggle(cat)}
//                                             className={`flex items-center gap-2.5 p-2 rounded-lg text-left text-xs font-medium transition-all ${
//                                                 isSelected ? 'bg-orange-600/20 text-orange-400 border border-orange-500/20' : 'text-gray-400 hover:bg-white/5'
//                                             }`}>
//                                             {isSelected ? <CheckSquare size={14} className="text-orange-500" /> : <Square size={14} />}
//                                             <span className="truncate">{cat}</span>
//                                         </button>
//                                     );
//                                 })}
//                             </div>
//                         </div>

//                         <div className="grid grid-cols-2 gap-4">
//                             <div>
//                                 <label className={labelStyle}><Award size={12}/> Overall Experience</label>
//                                 <input type="text" placeholder="e.g. 5 yrs" className={inputStyle}
//                                     onChange={(e) => setFormData({...formData, experience: e.target.value})} />
//                             </div>
//                             <div>
//                                 <label className={labelStyle}><Map size={12}/> Operational Range</label>
//                                 <input type="text" placeholder="e.g. 15km" className={inputStyle}
//                                     onChange={(e) => setFormData({...formData, serviceRange: e.target.value})} />
//                             </div>
//                         </div>
//                         <div className="grid grid-cols-2 gap-4">
//                             <div>
//                                 <label className={labelStyle}><IndianRupee size={12}/> Setup Base Price (₹)</label>
//                                 <input type="number" placeholder="499" required className={inputStyle}
//                                     onChange={(e) => setFormData({...formData, basePrice: e.target.value})} />
//                             </div>
//                             <div>
//                                 <label className={labelStyle}><Phone size={12}/> Primary Mobile</label>
//                                 <input type="text" placeholder="Phone Number" required className={inputStyle}
//                                     onChange={(e) => setFormData({...formData, phone: e.target.value})} />
//                             </div>
//                         </div>
//                         <div className="grid grid-cols-2 gap-4">
//                             <div>
//                                 <label className={labelStyle}><Hash size={12}/> Pincode</label>
//                                 <input type="text" placeholder="273001" className={inputStyle}
//                                     onChange={(e) => setFormData({...formData, pincode: e.target.value})} />
//                             </div>
//                             <div>
//                                 <label className={labelStyle}><MapPin size={12}/> Active City</label>
//                                 <input type="text" value={formData.city} className={inputStyle}
//                                     onChange={(e) => setFormData({...formData, city: e.target.value})} />
//                             </div>
//                         </div>
//                     </div>
//                 </div>

//                 {/* Footer Controls */}
//                 <div className="pt-6 border-t border-white/10 flex items-center justify-between">
//                     <span className="text-[10px] text-gray-500 font-black uppercase flex items-center gap-2">
//                         <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></span> Shop Status: Live Verification Pending
//                     </span>
//                     <div className="flex gap-4">
//                         <button type="button" onClick={onClose} className="px-6 py-3 text-xs font-black uppercase text-gray-400">Cancel</button>
//                         <button type="submit" className="px-10 py-3 bg-orange-600 text-white text-xs font-black uppercase rounded-xl shadow-xl shadow-orange-900/20">
//                             Create Shop Partner
//                         </button>
//                     </div>
//                 </div>
//             </form>
//         </div>
//     );
// };

// export default AddProviderForm;







// import React, { useState } from 'react';
// import axios from 'axios';
// import { X, Briefcase, User, Mail, Phone, MapPin, Lock, Settings, Award, Hash, IndianRupee, Map } from 'lucide-react';

// const AddProviderForm = ({ onClose, refreshUsers }) => {
//     const [formData, setFormData] = useState({
//         username: '', password: '', confirmPassword: '', name: '', phone: '',
//         email: '', city: 'Gorakhpur', pincode: '', address: '', category: '',
//         experience: '', basePrice: '', serviceRange: '', role: 'provider'
//     });

//     const categories = ["Home Cleaning", "Office Cleaning", "Deep Cleaning", "Pest Control", "AC Service", "Room Cleaning", "Sofa Cleaning", "Bathroom Deep Cleaning", "Electrician", "Plumber"];

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         if (formData.password !== formData.confirmPassword) return alert("Passwords do not match!");
//         try {
//             const token = localStorage.getItem('token');
//             await axios.post('http://localhost:5000/api/auth/register', formData, {
//                 headers: { Authorization: `Bearer ${token}` }
//             });
//             alert("Service Provider Registered Successfully!");
//             refreshUsers();
//             onClose();
//         } catch (err) {
//             alert(err.response?.data?.message || "Error adding provider");
//         }
//     };

//     const inputStyle = "w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm text-white outline-none focus:border-orange-500/50 transition-all placeholder:text-gray-500 font-normal";
//     const labelStyle = "text-[10px] font-black uppercase tracking-widest text-gray-500 mb-1.5 flex items-center gap-2";

//     return (
//         <div className="p-8 relative max-h-[85vh] overflow-y-auto custom-scrollbar bg-[#061437]">
//             {/* Close Button */}
//             <button onClick={onClose} className="absolute right-6 top-6 text-gray-500 hover:text-white z-10">
//                 <X size={24} />
//             </button>

//             {/* Header */}
//             <div className="mb-8">
//                 <div className="flex items-center gap-3 mb-2">
//                     <div className="p-2 bg-orange-600 text-white rounded-lg">
//                         <Briefcase size={20} />
//                     </div>
//                     <h2 className="text-2xl font-black text-white uppercase tracking-tighter">Register Provider</h2>
//                 </div>
//                 <p className="text-gray-500 text-xs font-bold uppercase tracking-widest">New professional partner registration</p>
//             </div>

//             <form onSubmit={handleSubmit} className="space-y-6 text-left">
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    
//                     {/* Identity Section */}
//                     <div className="space-y-4">
//                         <div className="grid grid-cols-2 gap-4">
//                             <div>
//                                 <label className={labelStyle}><User size={12}/> Name</label>
//                                 <input type="text" placeholder="Full Name" required className={inputStyle}
//                                     onChange={(e) => setFormData({...formData, name: e.target.value})} />
//                             </div>
//                             <div>
//                                 <label className={labelStyle}><Hash size={12}/> Username</label>
//                                 <input type="text" placeholder="user123" required className={inputStyle}
//                                     onChange={(e) => setFormData({...formData, username: e.target.value})} />
//                             </div>
//                         </div>
//                         <div>
//                             <label className={labelStyle}><Mail size={12}/> Email</label>
//                             <input type="email" placeholder="email@domain.com" required className={inputStyle}
//                                 onChange={(e) => setFormData({...formData, email: e.target.value})} />
//                         </div>
//                         <div className="grid grid-cols-2 gap-4">
//                             <div>
//                                 <label className={labelStyle}><Lock size={12}/> Password</label>
//                                 <input type="password" placeholder="••••••••" required className={inputStyle}
//                                     onChange={(e) => setFormData({...formData, password: e.target.value})} />
//                             </div>
//                             <div>
//                                 <label className={labelStyle}><Lock size={12}/> Confirm</label>
//                                 <input type="password" placeholder="••••••••" required className={inputStyle}
//                                     onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})} />
//                             </div>
//                         </div>
//                         <div>
//                             <label className={labelStyle}><MapPin size={12}/> Address</label>
//                             <textarea placeholder="Address" rows="2" className={`${inputStyle} resize-none`}
//                                 onChange={(e) => setFormData({...formData, address: e.target.value})}></textarea>
//                         </div>
//                     </div>

//                     {/* Professional Section */}
//                     <div className="space-y-4">
//                         <div className="grid grid-cols-2 gap-4">
//                             <div>
//                                 <label className={labelStyle}><Settings size={12}/> Category</label>
//                                 <select className={inputStyle} required onChange={(e) => setFormData({...formData, category: e.target.value})}>
//                                     <option value="">Select</option>
//                                     {categories.map(cat => <option key={cat} value={cat} className="bg-[#061437]">{cat}</option>)}
//                                 </select>
//                             </div>
//                             <div>
//                                 <label className={labelStyle}><Award size={12}/> Experience</label>
//                                 <input type="text" placeholder="e.g. 3 yrs" className={inputStyle}
//                                     onChange={(e) => setFormData({...formData, experience: e.target.value})} />
//                             </div>
//                         </div>
//                         <div className="grid grid-cols-2 gap-4">
//                             <div>
//                                 <label className={labelStyle}><IndianRupee size={12}/> Price (₹)</label>
//                                 <input type="number" placeholder="499" required className={inputStyle}
//                                     onChange={(e) => setFormData({...formData, basePrice: e.target.value})} />
//                             </div>
//                             <div>
//                                 <label className={labelStyle}><Map size={12}/> Range</label>
//                                 <input type="text" placeholder="e.g. 10km" className={inputStyle}
//                                     onChange={(e) => setFormData({...formData, serviceRange: e.target.value})} />
//                             </div>
//                         </div>
//                         <div className="grid grid-cols-2 gap-4">
//                             <div>
//                                 <label className={labelStyle}><Phone size={12}/> Mobile</label>
//                                 <input type="text" placeholder="Phone" required className={inputStyle}
//                                     onChange={(e) => setFormData({...formData, phone: e.target.value})} />
//                             </div>
//                             <div>
//                                 <label className={labelStyle}><Hash size={12}/> Pincode</label>
//                                 <input type="text" placeholder="273001" className={inputStyle}
//                                     onChange={(e) => setFormData({...formData, pincode: e.target.value})} />
//                             </div>
//                         </div>
//                         <div>
//                             <label className={labelStyle}><MapPin size={12}/> City</label>
//                             <input type="text" value={formData.city} className={inputStyle}
//                                 onChange={(e) => setFormData({...formData, city: e.target.value})} />
//                         </div>
//                     </div>
//                 </div>

//                 <div className="pt-6 border-t border-white/10 flex items-center justify-between">
//                     <span className="text-[10px] text-gray-500 font-black uppercase flex items-center gap-2">
//                         <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></span> Partner Status: Pending
//                     </span>
//                     <div className="flex gap-4">
//                         <button type="button" onClick={onClose} className="px-6 py-3 text-xs font-black uppercase text-gray-400">Cancel</button>
//                         <button type="submit" className="px-10 py-3 bg-orange-600 text-white text-xs font-black uppercase rounded-xl shadow-xl shadow-orange-900/20">
//                             Create Provider
//                         </button>
//                     </div>
//                 </div>
//             </form>
//         </div>
//     );
// };

// export default AddProviderForm;