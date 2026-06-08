 import React, { useState } from 'react';
import { X, Loader2, User, Phone, Mail, Hash, MapPin, ChevronDown } from 'lucide-react';

const AddServiceModal = ({ 
    user, 
    onClose, 
    formData, 
    setFormData, 
    masterServiceTypes, 
    masterMainCategories, 
    masterSubCategories, 
    handleTypeChange,
    handleMainCategoryChange, 
    handleSubmit, 
    submitting 
}) => {
    const [showSuggestions, setShowSuggestions] = useState(false);

    if (!user) return null;

    // 🌟 Filter arrays securely based on parent relation IDs
    const currentFilteredMains = masterMainCategories.filter(
        m => m.serviceType?._id === formData.serviceType || m.serviceType === formData.serviceType
    );
    
    const currentFilteredSubs = masterSubCategories.filter(
        s => s.mainCategory?._id === formData.category || s.mainCategory === formData.category
    );

    // 🌟 Auto Suggestion List generation using selected master records
    const selectedSubRecord = masterSubCategories.find(s => s._id === formData.subCategory);
    const selectedMainRecord = masterMainCategories.find(m => m._id === formData.category);
    
    let defaultSuggestions = [];
    if (selectedSubRecord) {
        defaultSuggestions.push(`${selectedSubRecord.name} Standard Setup`);
        defaultSuggestions.push(`Premium ${selectedSubRecord.name} Care`);
        defaultSuggestions.push(`Express ${selectedSubRecord.name}`);
    } else if (selectedMainRecord) {
        defaultSuggestions.push(`${selectedMainRecord.name} General Repair`);
        defaultSuggestions.push(`Deep ${selectedMainRecord.name} Plan`);
    }

    return (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-200 font-['Poppins']">
            <div className="w-full max-w-xl bg-[#061437] border border-white/10 rounded-2xl shadow-2xl p-6 relative text-left max-h-[90vh] overflow-y-auto custom-scrollbar">
                
                {/* Close Button */}
                <button onClick={onClose} className="absolute right-4 top-4 text-gray-400 hover:text-white cursor-pointer transition-colors">
                    <X size={20} />
                </button>

                {/* Header */}
                <div className="mb-5">
                    <h3 className="text-lg font-black text-white uppercase tracking-tight">Assign Service to Partner</h3>
                    <p className="text-[10px] text-orange-400 font-bold uppercase tracking-wider">Map specific operations directly to live profiles</p>
                </div>

                {/* 🔒 PROVIDER PROFILE DETAILS (NON-EDITABLE) */}
                <div className="bg-[#000b21] p-4 rounded-xl border border-blue-900/30 space-y-3 mb-5">
                    <p className="text-[10px] font-black uppercase text-orange-500/80 tracking-widest border-b border-blue-900/20 pb-1.5">
                        Partner Profile Information (Read-Only)
                    </p>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                        <div>
                            <label className="text-[9px] font-black uppercase text-gray-500 tracking-wider flex items-center gap-1">
                                <User size={10} /> Partner Name
                            </label>
                            <input 
                                type="text" 
                                value={user.name || 'N/A'} 
                                disabled 
                                className="w-full mt-1 p-2 bg-white/5 border border-white/5 rounded-lg text-xs font-bold text-gray-300 cursor-not-allowed outline-none select-none"
                            />
                        </div>

                        <div>
                            <label className="text-[9px] font-black uppercase text-gray-500 tracking-wider flex items-center gap-1">
                                <Phone size={10} /> Contact Phone
                            </label>
                            <input 
                                type="text" 
                                value={user.phone || 'N/A'} 
                                disabled 
                                className="w-full mt-1 p-2 bg-white/5 border border-white/5 rounded-lg text-xs font-mono text-gray-300 cursor-not-allowed outline-none select-none"
                            />
                        </div>

                        <div>
                            <label className="text-[9px] font-black uppercase text-gray-500 tracking-wider flex items-center gap-1">
                                <Hash size={10} /> Provider Account ID
                            </label>
                            <input 
                                type="text" 
                                value={user._id || 'N/A'} 
                                disabled 
                                className="w-full mt-1 p-2 bg-white/5 border border-white/5 rounded-lg text-xs font-mono text-gray-400 cursor-not-allowed outline-none select-none truncate"
                            />
                        </div>

                        <div>
                            <label className="text-[9px] font-black uppercase text-gray-500 tracking-wider flex items-center gap-1">
                                <Mail size={10} /> Email Address
                            </label>
                            <input 
                                type="text" 
                                value={user.email || 'N/A'} 
                                disabled 
                                className="w-full mt-1 p-2 bg-white/5 border border-white/5 rounded-lg text-xs text-gray-300 cursor-not-allowed outline-none select-none truncate"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="text-[9px] font-black uppercase text-gray-500 tracking-wider flex items-center gap-1">
                            <MapPin size={10} /> Operation Address / Range
                        </label>
                        <input 
                            type="text" 
                            value={user.providerInfo?.serviceRange || user.city || 'Gorakhpur, Uttar Pradesh'} 
                            disabled 
                            className="w-full mt-1 p-2 bg-white/5 border border-white/5 rounded-lg text-xs text-gray-300 cursor-not-allowed outline-none select-none"
                        />
                    </div>
                </div>

                {/* 🛠️ DYNAMICALLY RECONFIGURED SERVICE FORM */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {/* 1. Dynamic Service Type Dropdown */}
                        <div className="flex flex-col gap-1">
                            <label className="text-[10px] font-bold uppercase text-gray-400">Service Type</label>
                            <select 
                                className="p-3 bg-[#000b21] border border-blue-900/40 rounded-xl outline-none text-white text-xs cursor-pointer focus:border-orange-500/40"
                                value={formData.serviceType}
                                onChange={(e) => handleTypeChange(e.target.value)}
                            >
                                <option value="" disabled>-- Select Type --</option>
                                {masterServiceTypes.map(t => (
                                    <option key={t._id} value={t._id}>{t.name}</option>
                                ))}
                            </select>
                        </div>

                        {/* 2. Dynamic Main Category Dropdown */}
                        <div className="flex flex-col gap-1">
                            <label className="text-[10px] font-bold uppercase text-gray-400">Main Category</label>
                            <select 
                                className="p-3 bg-[#000b21] border border-blue-900/40 rounded-xl outline-none text-white text-xs cursor-pointer focus:border-orange-500/40"
                                value={formData.category}
                                onChange={(e) => handleMainCategoryChange(e.target.value)}
                            >
                                <option value="" disabled>-- Select Main Category --</option>
                                {currentFilteredMains.map(cat => (
                                    <option key={cat._id} value={cat._id}>{cat.name}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* 3. Dynamic Sub Category Dropdown */}
                    <div className="flex flex-col gap-1">
                        <label className="text-[10px] font-bold uppercase text-gray-400">Sub Category Spec</label>
                        <select 
                            className="p-3 bg-[#000b21] border border-blue-900/40 rounded-xl outline-none text-white text-xs cursor-pointer focus:border-orange-500/40"
                            value={formData.subCategory}
                            onChange={(e) => setFormData({...formData, subCategory: e.target.value})}
                        >
                            <option value="">-- General / No Subcategory --</option>
                            {currentFilteredSubs.map(sub => (
                                <option key={sub._id} value={sub._id}>{sub.name}</option>
                            ))}
                        </select>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {/* 4. Combobox: Select Dropdown + Live Text Writing Option */}
                        <div className="flex flex-col gap-1 relative">
                            <label className="text-[10px] font-bold uppercase text-gray-400">Service Title / Name</label>
                            <div className="relative flex items-center">
                                <input 
                                    type="text" 
                                    placeholder="Type or click arrow to choose name..." 
                                    className="w-full p-3 bg-[#000b21] border border-blue-900/40 rounded-xl text-xs text-white outline-none focus:border-orange-500/40 pr-10"
                                    value={formData.name}
                                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                                    onFocus={() => setShowSuggestions(true)}
                                    onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                                    required
                                />
                                <ChevronDown 
                                    size={16} 
                                    className="absolute right-3 text-gray-400 cursor-pointer" 
                                    onClick={() => setShowSuggestions(!showSuggestions)}
                                />
                            </div>
                            
                            {/* Suggestions Dropdown Window Overlay */}
                            {showSuggestions && defaultSuggestions.length > 0 && (
                                <div className="absolute top-[100%] left-0 w-full bg-[#000b21] border border-blue-900/60 rounded-xl mt-1 max-h-40 overflow-y-auto z-50 shadow-2xl divide-y divide-white/5">
                                    {defaultSuggestions.map((suggestion, index) => (
                                        <div 
                                            key={index}
                                            className="p-2.5 text-xs text-gray-300 hover:bg-indigo-600 hover:text-white cursor-pointer transition-colors"
                                            onMouseDown={() => setFormData({...formData, name: suggestion})}
                                        >
                                            {suggestion}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* 5. Rate Matrix */}
                        <div className="flex flex-col gap-1">
                            <label className="text-[10px] font-bold uppercase text-gray-400">Rate/Price Matrix (₹)</label>
                            <input 
                                type="text" 
                                placeholder="e.g. 399 - 999" 
                                className="p-3 bg-[#000b21] border border-blue-900/40 rounded-xl text-xs text-white outline-none font-mono focus:border-orange-500/40"
                                value={formData.price}
                                onChange={(e) => setFormData({...formData, price: e.target.value})}
                                required
                            />
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="pt-4 flex items-center justify-end gap-3 border-t border-white/5">
                        <button 
                            type="button" 
                            onClick={onClose} 
                            className="px-4 py-2.5 bg-white/5 hover:bg-white/10 text-white rounded-xl text-xs font-bold uppercase cursor-pointer transition-colors"
                        >
                            Cancel
                        </button>
                        <button 
                            type="submit" 
                            disabled={submitting} 
                            className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-700 text-white rounded-xl text-xs font-black uppercase tracking-wider flex items-center gap-1.5 cursor-pointer transition-all active:scale-95"
                        >
                            {submitting ? <Loader2 size={14} className="animate-spin" /> : "Deploy Service"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddServiceModal;