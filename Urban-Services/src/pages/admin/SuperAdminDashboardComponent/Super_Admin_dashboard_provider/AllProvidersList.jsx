import React, { useState, useEffect } from 'react';
import { Loader2, X, Search, Download } from 'lucide-react';
import axios from 'axios';
import { useUsers } from '../useUsers';

// 🚀 Importing Divided Components
import ProviderTableRow from './ProviderTableRow';
import 
ServiceModal from './AddServiceModal';
import ViewServicesModal from './ViewServicesModal';
import AddServiceModal from './AddServiceModal';

const AllProvidersList = () => {
    const { loading, filteredUsers } = useUsers();
    
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedProviderServices, setSelectedProviderServices] = useState(null);
    const [activeProviderName, setActiveProviderName] = useState("");
    const [deletingId, setDeletingId] = useState(null);
    const [deletedIds, setDeletedIds] = useState([]);

    // 🌟 Master Dynamic States
    const [masterServiceTypes, setMasterServiceTypes] = useState([]);
    const [masterMainCategories, setMasterMainCategories] = useState([]);
    const [masterSubCategories, setMasterSubCategories] = useState([]);
    const [masterLoading, setMasterLoading] = useState(true);

    const [addServiceModalUser, setAddServiceModalUser] = useState(null);
    const [submittingService, setSubmittingService] = useState(false);
    
    // Default dynamic state management keys updated
    const [serviceFormData, setServiceFormData] = useState({
        serviceType: '', // Will hold selected ServiceType ID
        category: '',    // Will hold selected MainCategory ID
        subCategory: '', // Will hold selected SubCategory ID
        name: '',        // Can be picked from items or custom typed
        price: ''
    });

    // 🌟 Fetch Master Data from Controllers on Mount
    useEffect(() => {
        const fetchMasterData = async () => {
            try {
                setMasterLoading(true);
                const [resTypes, resMain, resSub] = await Promise.all([
                    axios.get('http://localhost:5000/api/master/service-types'),
                    axios.get('http://localhost:5000/api/master/main-categories'),
                    axios.get('http://localhost:5000/api/master/sub-categories')
                ]);
                
                setMasterServiceTypes(resTypes.data || []);
                setMasterMainCategories(resMain.data || []);
                setMasterSubCategories(resSub.data || []);

                // Set default selected values if data exists
                if (resTypes.data?.length > 0) {
                    const firstType = resTypes.data[0];
                    const filteredMain = resMain.data.filter(m => m.serviceType?._id === firstType._id || m.serviceType === firstType._id);
                    const firstMain = filteredMain[0];
                    const filteredSub = firstMain ? resSub.data.filter(s => s.mainCategory?._id === firstMain._id || s.mainCategory === firstMain._id) : [];

                    setServiceFormData({
                        serviceType: firstType._id,
                        category: firstMain ? firstMain._id : '',
                        subCategory: filteredSub[0] ? filteredSub[0]._id : '',
                        name: '',
                        price: ''
                    });
                }
            } catch (error) {
                console.error("Error loading operational master system configurations:", error);
            } finally {
                setMasterLoading(false);
            }
        };
        fetchMasterData();
    }, []);

    // 🌟 Handle selection mapping transitions dynamically
    const handleTypeChange = (typeId) => {
        const correspondingMain = masterMainCategories.filter(m => m.serviceType?._id === typeId || m.serviceType === typeId);
        const targetMainId = correspondingMain[0]?._id || '';
        
        const correspondingSub = targetMainId 
            ? masterSubCategories.filter(s => s.mainCategory?._id === targetMainId || s.mainCategory === targetMainId)
            : [];

        setServiceFormData(prev => ({
            ...prev,
            serviceType: typeId,
            category: targetMainId,
            subCategory: correspondingSub[0]?._id || '',
            name: '' // reset custom typed values on structural changes
        }));
    };

    const handleMainCategoryChange = (mainId) => {
        const correspondingSub = masterSubCategories.filter(s => s.mainCategory?._id === mainId || s.mainCategory === mainId);
        setServiceFormData(prev => ({
            ...prev,
            category: mainId,
            subCategory: correspondingSub[0]?._id || '',
            name: ''
        }));
    };

    if (loading || masterLoading) return (
        <div className="h-full flex flex-col items-center justify-center p-12 bg-[#000b21]">
            <Loader2 className="animate-spin text-orange-500 mb-2" size={40} />
            <p className="text-orange-300 text-xs font-bold uppercase tracking-widest">Loading Sync Configurations...</p>
        </div>
    );

    const baseProviders = filteredUsers?.filter(user => 
        user.role === 'provider' && !deletedIds.includes(user._id)
    ) || [];

    const getProviderCategories = (provider) => {
        if (!provider) return [];
        return provider.providerInfo?.categories || provider.categories || [];
    };

    const handleDeleteProvider = async (id, name) => {
        const confirmDrop = window.confirm(`Are you sure you want to completely remove ${name || 'this provider'}?`);
        if (!confirmDrop) return;

        try {
            setDeletingId(id);
            const token = localStorage.getItem('token');
            await axios.delete(`http://localhost:5000/api/user/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setDeletedIds(prev => [...prev, id]);
            alert("Service Provider dropped successfully.");
        } catch (err) {
            console.error("DELETE MATRIX ERROR:", err.response?.data || err.message);
            alert(err.response?.data?.message || "Something went wrong while deleting.");
        } finally {
            setDeletingId(null);
        }
    };

    const handleAddServiceSubmit = async (e) => {
        e.preventDefault();
        if (!serviceFormData.name || !serviceFormData.price) {
            return alert("Please select or type a Service Name and add a valid Price!");
        }

        try {
            setSubmittingService(true);
            const token = localStorage.getItem('token');

            // Find plain text names instead of database hex strings to keep provider updates readable
            const currentTypeName = masterServiceTypes.find(t => t._id === serviceFormData.serviceType)?.name || '';
            const currentCatName = masterMainCategories.find(c => c._id === serviceFormData.category)?.name || '';
            const currentSubName = masterSubCategories.find(s => s._id === serviceFormData.subCategory)?.name || 'General';

            const payload = {
                category: currentCatName,
                priceRange: serviceFormData.price,
                serviceType: currentTypeName,
                subCategory: currentSubName,
                serviceTitle: serviceFormData.name // Dynamic picked or manual inputted text
            };

            await axios.put(`http://localhost:5000/api/user/add-service/${addServiceModalUser._id}`, payload, {
                headers: { Authorization: `Bearer ${token}` }
            });

            if (addServiceModalUser.providerInfo) {
                if (!addServiceModalUser.providerInfo.categories) addServiceModalUser.providerInfo.categories = [];
                addServiceModalUser.providerInfo.categories.push(payload);
            } else {
                if (!addServiceModalUser.categories) addServiceModalUser.categories = [];
                addServiceModalUser.categories.push(payload);
            }

            alert("Service assigned to provider dashboard completely!");
            setAddServiceModalUser(null);
            
            // Reset state matrix using primary collection keys safely
            setServiceFormData({
                serviceType: masterServiceTypes[0]?._id || '',
                category: masterMainCategories.filter(m => m.serviceType?._id === masterServiceTypes[0]?._id)[0]?._id || '',
                subCategory: '',
                name: '',
                price: ''
            });
        } catch (err) {
            console.error(err);
            alert(err.response?.data?.message || "Failed to push new service validation mapping to provider.");
        } finally {
            setSubmittingService(false);
        }
    };

    const filteredProviders = baseProviders.filter(provider => {
        const query = searchQuery.toLowerCase().trim();
        if (!query) return true;

        const name = provider.name?.toLowerCase() || "";
        const username = provider.username?.toLowerCase() || "";
        const phone = provider.phone || "";
        const email = provider.email?.toLowerCase() || "";
        const city = provider.providerInfo?.serviceRange?.toLowerCase() || provider.city?.toLowerCase() || "gorakhpur";

        return name.includes(query) || username.includes(query) || phone.includes(query) || email.includes(query) || city.includes(query);
    });

    const handleExportToExcel = () => {
        if (filteredProviders.length === 0) return alert("No data available to export!");
        const headers = ["Owner/Shop Name", "Username", "Email", "Phone", "City/Range", "Experience", "Services Registered"];
        const rows = filteredProviders.map(p => {
            const servicesList = getProviderCategories(p).map(s => `${s.category}(${s.priceRange || 'N/A'})`).join(' | ');
            return [
                `"${p.name}"`, `"${p.username || 'N/A'}"`, `"${p.email}"`, `"${p.phone}"`,
                `"${p.providerInfo?.serviceRange || p.city || 'Gorakhpur'}"`,
                `"${p.providerInfo?.experience || p.experience || 'N/A'}"`, `"${servicesList || 'No services'}"`
            ];
        });
        const csvContent = "\uFEFF" + [headers.join(","), ...rows.map(e => e.join(","))].join("\n");
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.setAttribute("href", url);
        link.setAttribute("download", `Providers_List_${new Date().toISOString().slice(0,10)}.csv`);
        link.click();
    };

    return (
        <div className="space-y-6 animate-in fade-in duration-300 text-left relative font-['Poppins']">
            {/* Top Bar */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-black text-white uppercase tracking-tighter">Service Providers</h2>
                    <p className="text-gray-400/60 text-[10px] font-bold uppercase tracking-widest">Network of skilled field professionals and technicians</p>
                </div>

                <div className="relative w-full md:w-80">
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                    <input 
                        type="text"
                        placeholder="Search by name, phone, city, email..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-[#061437] border border-blue-900/40 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white outline-none focus:border-orange-500/50 transition-all placeholder:text-gray-500 font-medium"
                    />
                    {searchQuery && (
                        <button onClick={() => setSearchQuery("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white">
                            <X size={14} />
                        </button>
                    )}
                </div>
            </div>

            {/* TABLE CONTAINER */}
            <div className="w-full overflow-hidden bg-[#061437] rounded-2xl border border-blue-900/20 shadow-2xl">
                <div className="max-h-[510px] overflow-y-auto custom-scrollbar">
                    <table className="w-full text-left border-collapse relative">
                        <thead>
                            <tr className="border-b border-blue-900/30 text-[10px] font-black uppercase tracking-widest text-gray-400 bg-[#000b21] sticky top-0 z-10">
                                <th className="p-4 bg-[#000b21]">Provider Partner</th>
                                <th className="p-4 text-center bg-[#000b21]">Services Offered</th>
                                <th className="p-4 bg-[#000b21]">Experience</th>
                                <th className="p-4 bg-[#000b21]">Service Range</th>
                                <th className="p-4 bg-[#000b21]">Contact</th>
                                <th className="p-4 text-center bg-[#000b21] text-orange-400">Add Service</th>
                                <th className="p-4 text-center bg-[#000b21]">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-blue-900/10 text-sm">
                            {filteredProviders.length === 0 ? (
                                <tr>
                                    <td colSpan="7" className="p-8 text-center text-gray-500 font-bold uppercase text-xs">
                                        No matching providers found
                                    </td>
                                </tr>
                            ) : (
                                filteredProviders.map((provider) => (
                                    <ProviderTableRow 
                                        key={provider._id}
                                        provider={provider}
                                        getProviderCategories={getProviderCategories}
                                        setSelectedProviderServices={setSelectedProviderServices}
                                        setActiveProviderName={setActiveProviderName}
                                        setAddServiceModalUser={setAddServiceModalUser}
                                        handleDeleteProvider={handleDeleteProvider}
                                        deletingId={deletingId}
                                    />
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Bottom Info & Download */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                <span className="text-[10px] text-gray-500 font-black uppercase tracking-wider">
                    Showing {filteredProviders.length} of {baseProviders.length} Total Partners
                </span>
                <button onClick={handleExportToExcel} className="flex items-center gap-2 px-5 py-2.5 bg-emerald-600/10 hover:bg-emerald-600/20 text-emerald-400 border border-emerald-500/20 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer">
                    <Download size={14} /> Download Excel Sheet
                </button>
            </div>

            {/* 🌟 MODAL 1: ADD SERVICE COMPONENT */}
            <AddServiceModal 
                user={addServiceModalUser}
                onClose={() => setAddServiceModalUser(null)}
                formData={serviceFormData}
                setFormData={setServiceFormData}
                
                // Dynamic Props update
                masterServiceTypes={masterServiceTypes}
                masterMainCategories={masterMainCategories}
                masterSubCategories={masterSubCategories}
                
                handleTypeChange={handleTypeChange}
                handleMainCategoryChange={handleMainCategoryChange}
                handleSubmit={handleAddServiceSubmit}
                submitting={submittingService}
            />

            {/* 🌟 MODAL 2: VIEW SERVICES COMPONENT */}
            <ViewServicesModal 
                services={selectedProviderServices}
                providerName={activeProviderName}
                providerId={filteredProviders.find(p => p.name === activeProviderName)?._id || baseProviders.find(p => p.name === activeProviderName)?._id} 
                onClose={() => {
                    setSelectedProviderServices(null);
                    setActiveProviderName("");
                }}
                onServiceDeleted={(updatedServicesList) => {
                    setSelectedProviderServices(updatedServicesList.length > 0 ? updatedServicesList : null);
                }}
            />
        </div>
    );
};

export default AllProvidersList;
