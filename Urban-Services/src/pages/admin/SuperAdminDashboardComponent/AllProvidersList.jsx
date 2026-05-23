import React, { useState } from 'react';
import { Loader2, Briefcase, IndianRupee, Award, X, CheckCircle, Search, Download } from 'lucide-react';
import { useUsers } from './useUsers'; // Same existing hook

const AllProvidersList = () => {
    const { loading, filteredUsers } = useUsers();
    
    // Search Filter State
    const [searchQuery, setSearchQuery] = useState("");
    
    // Popup Modal control state
    const [selectedProviderServices, setSelectedProviderServices] = useState(null);
    const [activeProviderName, setActiveProviderName] = useState("");

    if (loading) return (
        <div className="h-full flex flex-col items-center justify-center p-12 bg-[#000b21]">
            <Loader2 className="animate-spin text-orange-500 mb-2" size={40} />
            <p className="text-orange-300 text-xs font-bold uppercase tracking-widest">Loading Service Partners...</p>
        </div>
    );

    // 1. Filter only provider roles
    const providers = filteredUsers?.filter(user => user.role === 'provider') || [];

    // Helper to extract nested categories safely
    const getProviderCategories = (provider) => {
        return provider.categories || provider.providerInfo?.categories || [];
    };

    // 2. Global Multi-Field Search Logic (Name, Username, Phone, Email, City)
    const filteredProviders = providers.filter(provider => {
        const query = searchQuery.toLowerCase().trim();
        if (!query) return true;

        const name = provider.name?.toLowerCase() || "";
        const username = provider.username?.toLowerCase() || "";
        const phone = provider.phone || "";
        const email = provider.email?.toLowerCase() || "";
        const city = provider.city?.toLowerCase() || provider.providerInfo?.serviceRange?.toLowerCase() || "gorakhpur";

        return name.includes(query) || 
               username.includes(query) || 
               phone.includes(query) || 
               email.includes(query) || 
               city.includes(query);
    });

    // 3. Excel/CSV Export Function
    const handleExportToExcel = () => {
        if (filteredProviders.length === 0) return alert("No data available to export!");

        // Excel Headers
        const headers = ["Owner/Shop Name", "Username", "Email", "Phone", "City/Range", "Experience", "Services Registered"];
        
        // Map data rows
        const rows = filteredProviders.map(p => {
            const servicesList = getProviderCategories(p).map(s => `${s.category}(${s.priceRange})`).join(' | ');
            return [
                `"${p.name}"`,
                `"${p.username || 'N/A'}"`,
                `"${p.email}"`,
                `"${p.phone}"`,
                `"${p.city || p.providerInfo?.serviceRange || 'Gorakhpur'}"`,
                `"${p.experience || p.providerInfo?.experience || 'N/A'}"`,
                `"${servicesList || 'No services'}"`
            ];
        });

        // Combine Header and Rows with BOM for Excel UTF-8 support (Hindi/Special characters fix)
        const csvContent = "\uFEFF" + [headers.join(","), ...rows.map(e => e.join(","))].join("\n");
        
        // Create download link
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.setAttribute("href", url);
        link.setAttribute("download", `Service_Providers_List_${new Date().toISOString().slice(0,10)}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="space-y-6 animate-in fade-in duration-300 text-left relative">
            {/* Top Bar with Title and Search Input */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-black text-white uppercase tracking-tighter">Service Providers</h2>
                    <p className="text-gray-400/60 text-[10px] font-bold uppercase tracking-widest">Network of skilled field professionals and technicians</p>
                </div>

                {/* SEARCH FILTER INPUT */}
                <div className="relative w-full md:w-80">
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                    <input 
                        type="text"
                        placeholder="Search by name, phone, city, email..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-[#061437] border border-blue-900/40 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white outline-none focus:border-orange-500/50 transition-all placeholder:text-gray-500 font-medium shadow-inner"
                    />
                    {searchQuery && (
                        <button onClick={() => setSearchQuery("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white">
                            <X size={14} />
                        </button>
                    )}
                </div>
            </div>

            {/* TABLE CONTAINER: Max 10 rows height setup with pure custom scrollable layout */}
            <div className="w-full overflow-hidden bg-[#061437] rounded-2xl border border-blue-900/20 shadow-2xl">
                <div className="max-h-[510px] overflow-y-auto custom-scrollbar"> {/* Height fixed for ~10 rows, turns scrollable automatically */}
                    <table className="w-full text-left border-collapse relative">
                        <thead>
                            <tr className="border-b border-blue-900/30 text-[10px] font-black uppercase tracking-widest text-gray-400 bg-[#000b21] sticky top-0 z-10 shadow-sm">
                                <th className="p-4 bg-[#000b21]">Provider Partner</th>
                                <th className="p-4 text-center bg-[#000b21]">Services Offered</th>
                                <th className="p-4 bg-[#000b21]">Experience</th>
                                <th className="p-4 bg-[#000b21]">Service Range</th>
                                <th className="p-4 bg-[#000b21]">Contact</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-blue-900/10 text-sm">
                            {filteredProviders.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="p-8 text-center text-gray-500 font-bold uppercase text-xs">
                                        No matching providers found
                                    </td>
                                </tr>
                            ) : (
                                filteredProviders.map((provider) => {
                                    const providerServices = getProviderCategories(provider);
                                    
                                    return (
                                        <tr key={provider._id} className="hover:bg-white/5 transition-colors">
                                            {/* Name / Identity */}
                                            <td className="p-4 flex items-center gap-3 font-bold text-white">
                                                <div className="p-2 bg-orange-600/10 text-orange-400 rounded-lg"><Briefcase size={16}/></div>
                                                <div>
                                                    <p className="text-sm font-bold text-white leading-tight">{provider.name}</p>
                                                    <p className="text-[10px] text-gray-500 font-mono mt-0.5">{provider.username || 'user'}</p>
                                                </div>
                                            </td>

                                            {/* Dynamic Services Modal Button Column */}
                                            <td className="p-4 text-center">
                                                {providerServices.length > 0 ? (
                                                    <button 
                                                        onClick={() => {
                                                            setSelectedProviderServices(providerServices);
                                                            setActiveProviderName(provider.name);
                                                        }}
                                                        className="px-3 py-1.5 bg-orange-600/10 hover:bg-orange-600/20 text-orange-400 border border-orange-500/20 rounded-xl text-xs font-black uppercase tracking-wider transition-all"
                                                    >
                                                        View Services ({providerServices.length})
                                                    </button>
                                                ) : (
                                                    <span className="text-gray-600 text-xs italic">No services linked</span>
                                                )}
                                            </td>

                                            {/* Experience */}
                                            <td className="p-4 text-gray-300 text-xs">
                                                <div className="flex items-center gap-1.5">
                                                    <Award size={14} className="text-gray-500"/>
                                                    {provider.experience || provider.providerInfo?.experience || 'N/A'}
                                                </div>
                                            </td>

                                            {/* Service Range */}
                                            <td className="p-4 text-gray-400 text-xs">
                                                {provider.serviceRange || provider.providerInfo?.serviceRange || provider.city || 'Gorakhpur'}
                                            </td>

                                            {/* Contact */}
                                            <td className="p-4 text-gray-300 text-xs font-mono">
                                                <p>{provider.phone}</p>
                                                <p className="text-[10px] text-gray-500 font-sans truncate max-w-[150px]">{provider.email}</p>
                                            </td>
                                        </tr>
                                    );
                                })
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* FOOTER ACTIONS: Excel Download Control Row */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                <span className="text-[10px] text-gray-500 font-black uppercase tracking-wider">
                    Showing {filteredProviders.length} of {providers.length} Total Registered Partners
                </span>
                
                <button 
                    onClick={handleExportToExcel}
                    className="flex items-center gap-2 px-5 py-2.5 bg-emerald-600/10 hover:bg-emerald-600/20 text-emerald-400 border border-emerald-500/20 rounded-xl text-xs font-black uppercase tracking-wider transition-all shadow-lg"
                >
                    <Download size={14} />
                    Download Excel Sheet
                </button>
            </div>

            {/* --- DYNAMIC RATE CARD POPUP MODAL --- */}
            {selectedProviderServices && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
                    <div className="w-full max-w-md bg-[#061437] border border-white/10 rounded-2xl shadow-2xl p-6 relative transform scale-100 transition-all text-left">
                        
                        <button 
                            onClick={() => setSelectedProviderServices(null)}
                            className="absolute right-4 top-4 text-gray-500 hover:text-white transition-colors"
                        >
                            <X size={20} />
                        </button>

                        <div className="mb-4">
                            <h3 className="text-lg font-black text-white uppercase tracking-tight">{activeProviderName}</h3>
                            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Verified Live Rate Cards & Offerings</p>
                        </div>

                        <div className="grid grid-cols-2 text-[10px] text-gray-400 font-black uppercase tracking-widest mb-2 px-2">
                            <span>Service Category</span>
                            <span className="text-right">Price Range</span>
                        </div>

                        <div className="space-y-2 max-h-[280px] overflow-y-auto custom-scrollbar pr-1">
                            {selectedProviderServices.map((item, index) => (
                                <div 
                                    key={index} 
                                    className="grid grid-cols-2 items-center bg-white/5 border border-white/5 rounded-xl p-3 text-xs text-white"
                                >
                                    <div className="flex items-center gap-2 font-medium">
                                        <CheckCircle size={14} className="text-orange-500 flex-shrink-0" />
                                        <span className="truncate">{item.category}</span>
                                    </div>
                                    <div className="text-right font-mono text-emerald-400 font-bold flex items-center justify-end gap-0.5">
                                        <IndianRupee size={12} className="text-emerald-500" />
                                        {item.priceRange || 'Price on request'}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-5 pt-4 border-t border-white/5 flex justify-end">
                            <button 
                                onClick={() => setSelectedProviderServices(null)}
                                className="px-5 py-2.5 bg-white/5 hover:bg-white/10 text-xs font-black uppercase tracking-widest text-white rounded-xl transition-all"
                            >
                                Close Rate Card
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AllProvidersList;