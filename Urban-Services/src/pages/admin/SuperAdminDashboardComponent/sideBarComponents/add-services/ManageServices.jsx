import React, { useState } from 'react';
import axios from 'axios';
import { ImagePlus, Layers, Plus } from 'lucide-react';
import { useServiceDropdowns } from './useServiceDropdowns';

// Importing Custom Component Modals
import ServiceTypeModal from './ServiceTypeModal';
import MainCategoryModal from './MainCategoryModal';
import SubCategoryModal from './SubCategoryModal';

const ManageServices = () => {
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const BASE_URL = 'http://localhost:5000';

    // Modals structural open/close parameters
    const [showTypeModal, setShowTypeModal] = useState(false);
    const [showCatModal, setShowCatModal] = useState(false);
    const [showSubModal, setShowSubModal] = useState(false);

    const {
        formData,
        serviceTypesList,
        currentCategoriesList,
        currentSubCategoriesList,
        handleTypeChange,
        handleCategoryChange,
        handleInputChange,
        resetForm
    } = useServiceDropdowns();

    // Triggered synchronization upon master table mutation
    const handleModalCloseRefresh = () => {
        setShowTypeModal(false);
        setShowCatModal(false);
        setShowSubModal(false);
        // Force refresh configuration state vector safely
        window.location.reload();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.serviceType || !formData.category || !formData.subCategory) {
            return alert("Please select all master configuration fields!");
        }

        setLoading(true);
        const data = new FormData();
        data.append('serviceType', formData.serviceType);
        data.append('category', formData.category);
        data.append('subCategory', formData.subCategory);
        data.append('name', formData.name.trim());
        data.append('price', formData.price.trim());
        data.append('tagline', formData.tagline.trim());
        data.append('description', formData.description.trim());
        
        // 🌟 UPDATED LOGIC: Ab commas ke badle new-line character (\n) par array split hoga
        if (formData.features) {
            const featuresArray = formData.features.split('\n').map(f => f.trim()).filter(Boolean);
            featuresArray.forEach(f => data.append('features[]', f));
        }
        if (image) data.append('image', image);

        try {
            await axios.post(`${BASE_URL}/api/services/add`, data, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            alert("Dynamic Master Service Published Successfully!");
            resetForm();
            setImage(null);
        } catch (err) {
            console.error(err);
            alert(err.response?.data?.message || "Deployment error encountered.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-6 bg-gray-900 text-white min-h-screen font-['Poppins'] relative">
            <h2 className="text-2xl font-black uppercase mb-6 tracking-tight flex items-center gap-2">
                <Layers className="text-indigo-500" size={24} /> Relational Master Service Form
            </h2> 

            <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded-2xl border border-gray-700 grid grid-cols-1 md:grid-cols-3 gap-5 shadow-2xl">
                
                {/* 1. Service Type Selector */}
                <div className="flex flex-col gap-1">
                    <div className="flex justify-between items-center mb-1">
                        <label className="text-xs font-bold uppercase text-gray-400">Service Type Base</label>
                        <button type="button" onClick={() => setShowTypeModal(true)} className="flex items-center gap-0.5 text-[10px] bg-indigo-600 text-white px-2 py-0.5 rounded hover:bg-indigo-700 transition font-black uppercase">
                            <Plus size={10} /> Configuration Panel
                        </button>
                    </div>
                    <select 
                        className="p-3 bg-gray-900 border border-gray-700 rounded-xl outline-none text-white text-sm focus:border-indigo-500 cursor-pointer"
                        value={formData.serviceType}
                        onChange={(e) => handleTypeChange(e.target.value)}
                        required
                    >
                        <option value="">-- Select Master Type --</option>
                        {serviceTypesList.map(t => <option key={t._id} value={t._id}>{t.name}</option>)}
                    </select>
                </div>

                {/* 2. Main Category Selector */}
                <div className="flex flex-col gap-1">
                    <div className="flex justify-between items-center mb-1">
                        <label className="text-xs font-bold uppercase text-gray-400">Main Category Reference</label>
                        <button type="button" onClick={() => setShowCatModal(true)} disabled={!formData.serviceType} className="flex items-center gap-0.5 text-[10px] bg-indigo-600 text-white px-2 py-0.5 rounded hover:bg-indigo-700 transition font-black uppercase disabled:bg-gray-750 disabled:text-gray-500 disabled:cursor-not-allowed">
                            <Plus size={10} /> Configuration Panel
                        </button>
                    </div>
                    <select 
                        className="p-3 bg-gray-900 border border-gray-700 rounded-xl outline-none text-white text-sm focus:border-indigo-500 cursor-pointer disabled:bg-gray-950 disabled:cursor-not-allowed"
                        value={formData.category}
                        onChange={(e) => handleCategoryChange(e.target.value)}
                        disabled={!formData.serviceType}
                        required
                    >
                        <option value="">-- Select Main Category --</option>
                        {currentCategoriesList.map(c => <option key={c._id} value={c._id}>{c.name}</option>)}
                    </select>
                </div>

                {/* 3. Sub Category Selector */}
                <div className="flex flex-col gap-1">
                    <div className="flex justify-between items-center mb-1">
                        <label className="text-xs font-bold uppercase text-emerald-400">Sub Category Mapping</label>
                        <button type="button" onClick={() => setShowSubModal(true)} disabled={!formData.category} className="flex items-center gap-0.5 text-[10px] bg-emerald-600 text-white px-2 py-0.5 rounded hover:bg-emerald-700 transition font-black uppercase disabled:bg-gray-750 disabled:text-gray-500 disabled:cursor-not-allowed">
                            <Plus size={10} /> Configuration Panel
                        </button>
                    </div>
                    <select 
                        className="p-3 bg-gray-900 border border-emerald-500/30 rounded-xl outline-none text-white text-sm focus:border-emerald-500 cursor-pointer disabled:bg-gray-950 disabled:cursor-not-allowed"
                        value={formData.subCategory}
                        onChange={(e) => handleInputChange('subCategory', e.target.value)}
                        disabled={!formData.category}
                        required
                    >
                        <option value="">-- Select Sub Category --</option>
                        {currentSubCategoriesList.map(s => <option key={s._id} value={s._id}>{s.name}</option>)}
                    </select>
                </div>

                {/* Operational spec inputs */}
                <div className="flex flex-col gap-1">
                    <label className="text-xs font-bold uppercase text-gray-400">Service Name</label>
                    <input type="text" placeholder="Enter specific unit service..." className="p-3 bg-gray-900 border border-gray-700 rounded-xl text-sm outline-none text-white focus:border-indigo-500" value={formData.name} onChange={(e) => handleInputChange('name', e.target.value)} required />
                </div>

                <div className="flex flex-col gap-1">
                    <label className="text-xs font-bold uppercase text-gray-400">Price Reference</label>
                    <input type="text" placeholder="₹599 fixed" className="p-3 bg-gray-900 border border-gray-700 rounded-xl text-sm outline-none text-white focus:border-indigo-500" value={formData.price} onChange={(e) => handleInputChange('price', e.target.value)} required />
                </div>

                <div className="flex flex-col gap-1">
                    <label className="text-xs font-bold uppercase text-gray-400">Tagline</label>
                    <input type="text" placeholder="Catchy brand statement..." className="p-3 bg-gray-900 border border-gray-700 rounded-xl text-sm outline-none text-white focus:border-indigo-500" value={formData.tagline} onChange={(e) => handleInputChange('tagline', e.target.value)} />
                </div>

                {/* 🌟 FIXED: Convert to multi-line textarea with Line-break support */}
                <div className="flex flex-col gap-1 md:col-span-3">
                    <label className="text-xs font-bold uppercase text-gray-400">Features List (Press Enter for Next Line)</label>
                    <textarea 
                        placeholder={"Certified Experts\n30 Days Warranty\nNo Hidden Charges"} 
                        className="p-3 bg-gray-900 border border-gray-700 rounded-xl text-sm outline-none text-white focus:border-indigo-500 h-24 custom-scrollbar resize-none" 
                        value={formData.features} 
                        onChange={(e) => handleInputChange('features', e.target.value)} 
                    />
                </div>

                <div className="flex flex-col gap-1 md:col-span-3">
                    <label className="text-xs font-bold uppercase text-gray-400">Banner Image Upload</label>
                    <div className="flex items-center gap-3 border border-gray-700 p-2.5 rounded-xl bg-gray-900">
                        <ImagePlus className="text-gray-500" size={18} />
                        <input type="file" className="text-xs text-gray-400" onChange={(e) => setImage(e.target.files[0])} />
                    </div>
                </div>

                <div className="flex flex-col gap-1 md:col-span-3">
                    <label className="text-xs font-bold uppercase text-gray-400">Full Operational Description Documentation</label>
                    <textarea placeholder="Specify core terms..." className="p-3 bg-gray-900 border border-gray-700 rounded-xl text-sm outline-none h-20 text-white resize-none focus:border-indigo-500" value={formData.description} onChange={(e) => handleInputChange('description', e.target.value)} required />
                </div>

                <button type="submit" disabled={loading} className="md:col-span-3 bg-indigo-600 hover:bg-indigo-700 text-white font-black py-3.5 rounded-xl uppercase tracking-wider transition disabled:bg-gray-700 cursor-pointer">
                    {loading ? "Publishing to Cluster..." : "Publish Unified Service Bundle"}
                </button>
            </form>

            {/* --- Render Floating Panel Modals Component Trees --- */}
            <ServiceTypeModal isOpen={showTypeModal} onClose={handleModalCloseRefresh} baseUrl={BASE_URL} />
            <MainCategoryModal isOpen={showCatModal} onClose={handleModalCloseRefresh} baseUrl={BASE_URL} activeServiceTypeId={formData.serviceType} />
            <SubCategoryModal isOpen={showSubModal} onClose={handleModalCloseRefresh} baseUrl={BASE_URL} activeCategoryId={formData.category} />
        </div>
    );
};

export default ManageServices;



// import React, { useState } from 'react';
// import axios from 'axios';
// import { ImagePlus, Layers, Plus, X } from 'lucide-react';
// import { useServiceDropdowns } from './useServiceDropdowns';

// const ManageServices = () => {
//     const [image, setImage] = useState(null);
//     const [loading, setLoading] = useState(false);
//     const BASE_URL = 'http://localhost:5000';

//     // Modals visibility states
//     const [showTypeModal, setShowTypeModal] = useState(false);
//     const [showCatModal, setShowCatModal] = useState(false);
//     const [showSubModal, setShowSubModal] = useState(false);

//     // Master Add Input States
//     const [newTypeName, setNewTypeName] = useState('');
//     const [newCatName, setNewCatName] = useState('');
//     const [newSubName, setNewSubName] = useState('');

//     // 🔥 Binding all dynamic master states directly from the hook
//     const {
//         formData,
//         serviceTypesList,
//         currentCategoriesList,
//         currentSubCategoriesList,
//         handleTypeChange,
//         handleCategoryChange,
//         handleInputChange,
//         resetForm
//     } = useServiceDropdowns();

//     // --- 1. Add Service Type Handler ---
//     const handleAddServiceType = async (e) => {
//         e.preventDefault();
//         if (!newTypeName.trim()) return;
//         try {
//             await axios.post(`${BASE_URL}/api/master/service-types`, { name: newTypeName.trim() });
//             alert("New Service Type Added Successfully!");
//             setNewTypeName('');
//             setShowTypeModal(false);
//             window.location.reload(); // Refresh to update hook cache matrices
//         } catch (err) {
//             alert(err.response?.data?.message || "Error adding type");
//         }
//     };

//     // --- 2. Add Main Category Handler ---
//     const handleAddMainCategory = async (e) => {
//         e.preventDefault();
//         if (!newCatName.trim() || !formData.serviceType) {
//             return alert("Please select a Service Type Base first!");
//         }
//         try {
//             await axios.post(`${BASE_URL}/api/master/main-categories`, {
//                 name: newCatName.trim(),
//                 serviceTypeId: formData.serviceType
//             });
//             alert("New Category Added!");
//             setNewCatName('');
//             setShowCatModal(false);
//             window.location.reload();
//         } catch (err) {
//             alert(err.response?.data?.message || "Error adding category");
//         }
//     };

//     // --- 3. Add Sub Category Handler ---
//     const handleAddSubCategory = async (e) => {
//         e.preventDefault();
//         if (!newSubName.trim() || !formData.category) {
//             return alert("Please select a Main Category first!");
//         }
//         try {
//             await axios.post(`${BASE_URL}/api/master/sub-categories`, {
//                 name: newSubName.trim(),
//                 mainCategoryId: formData.category
//             });
//             alert("New Sub Category Added!");
//             setNewSubName('');
//             setShowSubModal(false);
//             window.location.reload();
//         } catch (err) {
//             alert(err.response?.data?.message || "Error adding sub category");
//         }
//     };

//     // Main Service Submission
//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         if (!formData.serviceType || !formData.category || !formData.subCategory) {
//             return alert("Please select all master configuration fields!");
//         }

//         setLoading(true);
//         const data = new FormData();
//         data.append('serviceType', formData.serviceType);
//         data.append('category', formData.category);
//         data.append('subCategory', formData.subCategory);
//         data.append('name', formData.name.trim());
//         data.append('price', formData.price.trim());
//         data.append('tagline', formData.tagline.trim());
//         data.append('description', formData.description.trim());
        
//         if (formData.features) {
//             const featuresArray = formData.features.split(',').map(f => f.trim()).filter(Boolean);
//             featuresArray.forEach(f => data.append('features[]', f));
//         }
//         if (image) data.append('image', image);

//         try {
//             await axios.post(`${BASE_URL}/api/services/add`, data, {
//                 headers: { 'Content-Type': 'multipart/form-data' }
//             });
//             alert("Dynamic Master Service Published Successfully!");
//             resetForm();
//             setImage(null);
//         } catch (err) {
//             console.error(err);
//             alert(err.response?.data?.message || "Deployment error encountered.");
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <div className="p-6 bg-gray-900 text-white min-h-screen font-['Poppins'] relative">
//             <h2 className="text-2xl font-black uppercase mb-6 tracking-tight flex items-center gap-2">
//                 <Layers className="text-indigo-500" size={24} /> Relational Master Service Form
//             </h2> 

//             <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded-2xl border border-gray-700 grid grid-cols-1 md:grid-cols-3 gap-5 shadow-2xl">
                
//                 {/* 1. Dynamic Service Type Dropdown with Add Button */}
//                 <div className="flex flex-col gap-1">
//                     <div className="flex justify-between items-center mb-1">
//                         <label className="text-xs font-bold uppercase text-gray-400">Service Type Base</label>
//                         <button type="button" onClick={() => setShowTypeModal(true)} className="flex items-center gap-0.5 text-[10px] bg-indigo-600 text-white px-2 py-0.5 rounded hover:bg-indigo-700 transition font-black uppercase">
//                             <Plus size={10} /> Add Type
//                         </button>
//                     </div>
//                     <select 
//                         className="p-3 bg-gray-900 border border-gray-700 rounded-xl outline-none text-white text-sm focus:border-indigo-500 cursor-pointer"
//                         value={formData.serviceType}
//                         onChange={(e) => handleTypeChange(e.target.value)}
//                         required
//                     >
//                         <option value="">-- Select Master Type --</option>
//                         {serviceTypesList.map(t => <option key={t._id} value={t._id}>{t.name}</option>)}
//                     </select>
//                 </div>

//                 {/* 2. Cascading Main Category Dropdown with Add Button */}
//                 <div className="flex flex-col gap-1">
//                     <div className="flex justify-between items-center mb-1">
//                         <label className="text-xs font-bold uppercase text-gray-400">Main Category Reference</label>
//                         <button type="button" onClick={() => setShowCatModal(true)} disabled={!formData.serviceType} className="flex items-center gap-0.5 text-[10px] bg-indigo-600 text-white px-2 py-0.5 rounded hover:bg-indigo-700 transition font-black uppercase disabled:bg-gray-750 disabled:text-gray-500 disabled:cursor-not-allowed">
//                             <Plus size={10} /> Add Cat
//                         </button>
//                     </div>
//                     <select 
//                         className="p-3 bg-gray-900 border border-gray-700 rounded-xl outline-none text-white text-sm focus:border-indigo-500 cursor-pointer disabled:bg-gray-950 disabled:cursor-not-allowed"
//                         value={formData.category}
//                         onChange={(e) => handleCategoryChange(e.target.value)}
//                         disabled={!formData.serviceType}
//                         required
//                     >
//                         <option value="">-- Select Main Category --</option>
//                         {currentCategoriesList.map(c => <option key={c._id} value={c._id}>{c.name}</option>)}
//                     </select>
//                 </div>

//                 {/* 3. Cascading Sub Category Dropdown with Add Button */}
//                 <div className="flex flex-col gap-1">
//                     <div className="flex justify-between items-center mb-1">
//                         <label className="text-xs font-bold uppercase text-emerald-400">Sub Category Mapping</label>
//                         <button type="button" onClick={() => setShowSubModal(true)} disabled={!formData.category} className="flex items-center gap-0.5 text-[10px] bg-emerald-600 text-white px-2 py-0.5 rounded hover:bg-emerald-700 transition font-black uppercase disabled:bg-gray-750 disabled:text-gray-500 disabled:cursor-not-allowed">
//                             <Plus size={10} /> Add Sub
//                         </button>
//                     </div>
//                     <select 
//                         className="p-3 bg-gray-900 border border-emerald-500/30 rounded-xl outline-none text-white text-sm focus:border-emerald-500 cursor-pointer disabled:bg-gray-950 disabled:cursor-not-allowed"
//                         value={formData.subCategory}
//                         onChange={(e) => handleInputChange('subCategory', e.target.value)}
//                         disabled={!formData.category}
//                         required
//                     >
//                         <option value="">-- Select Sub Category --</option>
//                         {currentSubCategoriesList.map(s => <option key={s._id} value={s._id}>{s.name}</option>)}
//                     </select>
//                 </div>

//                 {/* Core Service Operational Specs */}
//                 <div className="flex flex-col gap-1">
//                     <label className="text-xs font-bold uppercase text-gray-400">Service Name</label>
//                     <input type="text" placeholder="Enter specific unit service..." className="p-3 bg-gray-900 border border-gray-700 rounded-xl text-sm outline-none text-white focus:border-indigo-500" value={formData.name} onChange={(e) => handleInputChange('name', e.target.value)} required />
//                 </div>

//                 <div className="flex flex-col gap-1">
//                     <label className="text-xs font-bold uppercase text-gray-400">Price Reference</label>
//                     <input type="text" placeholder="₹599 fixed" className="p-3 bg-gray-900 border border-gray-700 rounded-xl text-sm outline-none text-white focus:border-indigo-500" value={formData.price} onChange={(e) => handleInputChange('price', e.target.value)} required />
//                 </div>

//                 <div className="flex flex-col gap-1">
//                     <label className="text-xs font-bold uppercase text-gray-400">Tagline</label>
//                     <input type="text" placeholder="Catchy brand statement..." className="p-3 bg-gray-900 border border-gray-700 rounded-xl text-sm outline-none text-white focus:border-indigo-500" value={formData.tagline} onChange={(e) => handleInputChange('tagline', e.target.value)} />
//                 </div>

//                 <div className="flex flex-col gap-1 md:col-span-3">
//                     <label className="text-xs font-bold uppercase text-gray-400">Features Array (split with ',')</label>
//                     <input type="text" placeholder="Certified Experts, 30 Days Warranty" className="p-3 bg-gray-900 border border-gray-700 rounded-xl text-sm outline-none text-white focus:border-indigo-500" value={formData.features} onChange={(e) => handleInputChange('features', e.target.value)} />
//                 </div>

//                 <div className="flex flex-col gap-1 md:col-span-3">
//                     <label className="text-xs font-bold uppercase text-gray-400">Banner Image Upload</label>
//                     <div className="flex items-center gap-3 border border-gray-700 p-2.5 rounded-xl bg-gray-900">
//                         <ImagePlus className="text-gray-500" size={18} />
//                         <input type="file" className="text-xs text-gray-400" onChange={(e) => setImage(e.target.files[0])} />
//                     </div>
//                 </div>

//                 <div className="flex flex-col gap-1 md:col-span-3">
//                     <label className="text-xs font-bold uppercase text-gray-400">Full Operational Description Documentation</label>
//                     <textarea placeholder="Specify core terms..." className="p-3 bg-gray-900 border border-gray-700 rounded-xl text-sm outline-none h-20 text-white resize-none focus:border-indigo-500" value={formData.description} onChange={(e) => handleInputChange('description', e.target.value)} required />
//                 </div>

//                 <button type="submit" disabled={loading} className="md:col-span-3 bg-indigo-600 hover:bg-indigo-700 text-white font-black py-3.5 rounded-xl uppercase tracking-wider transition disabled:bg-gray-700 cursor-pointer">
//                     {loading ? "Publishing to Cluster..." : "Publish Unified Service Bundle"}
//                 </button>
//             </form>

//             {/* --- 🌟 POPUP MODAL 1: ADD SERVICE TYPE --- */}
//             {showTypeModal && (
//                 <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-50 p-4 animate-fadeIn">
//                     <div className="bg-gray-800 border border-gray-700 p-6 rounded-2xl max-w-sm w-full relative">
//                         <button onClick={() => setShowTypeModal(false)} className="absolute top-4 right-4 text-gray-400 hover:text-white"><X size={18} /></button>
//                         <h4 className="text-md font-black uppercase text-indigo-400 mb-4 tracking-wider">Add Service Type Master</h4>
//                         <form onSubmit={handleAddServiceType} className="space-y-4">
//                             <input type="text" placeholder="e.g., Cleaning, Repairing" className="w-full p-3 bg-gray-900 border border-gray-700 rounded-xl text-sm outline-none text-white focus:border-indigo-500" value={newTypeName} onChange={(e) => setNewTypeName(e.target.value)} required />
//                             <button type="submit" className="w-full bg-indigo-600 py-2.5 rounded-xl font-bold uppercase text-xs hover:bg-indigo-700 transition">Save Service Type</button>
//                         </form>
//                     </div>
//                 </div>
//             )}

//             {/* --- 🌟 POPUP MODAL 2: ADD MAIN CATEGORY --- */}
//             {showCatModal && (
//                 <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-50 p-4 animate-fadeIn">
//                     <div className="bg-gray-800 border border-gray-700 p-6 rounded-2xl max-w-sm w-full relative">
//                         <button onClick={() => setShowCatModal(false)} className="absolute top-4 right-4 text-gray-400 hover:text-white"><X size={18} /></button>
//                         <h4 className="text-md font-black uppercase text-indigo-400 mb-4 tracking-wider">Add Main Category</h4>
//                         <p className="text-[10px] text-gray-450 uppercase mb-2">Linking to selected Service Type</p>
//                         <form onSubmit={handleAddMainCategory} className="space-y-4">
//                             <input type="text" placeholder="e.g., Appliance Repair, Salon" className="w-full p-3 bg-gray-900 border border-gray-700 rounded-xl text-sm outline-none text-white focus:border-indigo-500" value={newCatName} onChange={(e) => setNewCatName(e.target.value)} required />
//                             <button type="submit" className="w-full bg-indigo-600 py-2.5 rounded-xl font-bold uppercase text-xs hover:bg-indigo-700 transition">Save Main Category</button>
//                         </form>
//                     </div>
//                 </div>
//             )}

//             {/* --- 🌟 POPUP MODAL 3: ADD SUB CATEGORY --- */}
//             {showSubModal && (
//                 <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-50 p-4 animate-fadeIn">
//                     <div className="bg-gray-800 border border-gray-700 p-6 rounded-2xl max-w-sm w-full relative">
//                         <button onClick={() => setShowSubModal(false)} className="absolute top-4 right-4 text-gray-400 hover:text-white"><X size={18} /></button>
//                         <h4 className="text-md font-black uppercase text-emerald-400 mb-4 tracking-wider">Add Sub Category</h4>
//                         <p className="text-[10px] text-gray-450 uppercase mb-2">Linking to selected Main Category</p>
//                         <form onSubmit={handleAddSubCategory} className="space-y-4">
//                             <input type="text" placeholder="e.g., AC Repair, Men's Haircut" className="w-full p-3 bg-gray-900 border border-gray-700 rounded-xl text-sm outline-none text-white focus:border-emerald-500" value={newSubName} onChange={(e) => setNewSubName(e.target.value)} required />
//                             <button type="submit" className="w-full bg-emerald-600 py-2.5 rounded-xl font-bold uppercase text-xs hover:bg-emerald-700 transition">Save Sub Category</button>
//                         </form>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default ManageServices;