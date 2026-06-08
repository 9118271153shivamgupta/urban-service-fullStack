import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Edit, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom'; 

const ProviderProfile = () => {
    const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('user')) || null);
    const [isEditing, setIsEditing] = useState(false);
    const [myServices, setMyServices] = useState([]); 
    const BASE_URL = 'http://localhost:5000';
    
    const navigate = useNavigate(); 

    useEffect(() => {
        if (user?._id) {
            fetchMyServices();
        }
    }, [user]);

    const fetchMyServices = async () => {
        try {
            // 🌟 Hit accurate backend template base
            const res = await axios.get(`${BASE_URL}/api/services/provider/${user._id}`);
            setMyServices(Array.isArray(res.data) ? res.data : []);
        } catch (err) {
            console.error("Error fetching vendor catalog:", err);
            setMyServices([]); 
        }
    };

    if (!user) {
        return (
            <div className="min-h-screen flex items-center justify-center font-['Poppins'] text-gray-500 bg-[#000b21]">
                Partner profile bundle broken. Relog execution required.
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto p-6 bg-gray-50 min-h-screen font-['Poppins'] text-gray-800 relative">
            {isEditing ? (
                <div>Profile Editing View Active</div>
            ) : (
                <>
                    {/* Welcome Header */}
                    <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-8 rounded-t-2xl shadow-md">
                        <span className="text-xs uppercase tracking-widest bg-black/20 px-3 py-1 rounded-full font-extrabold">Verified Business Partner Account</span>
                        <h1 className="text-3xl font-black uppercase tracking-tight mt-2">Workspace: {user.name}</h1>
                    </div>

                    <div className="bg-white p-8 rounded-b-2xl shadow-xl border border-gray-100 relative">
                        <div className="absolute top-6 right-6 flex items-center gap-3 z-10">
                            <button onClick={() => setIsEditing(true)} className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold py-2 px-4 rounded-xl transition text-xs cursor-pointer">
                                <Edit size={14} /> Edit Profile
                            </button>
                            <button onClick={() => navigate('/add-services')} className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded-xl transition text-xs shadow-md cursor-pointer">
                                <Plus size={14} /> Add New Service
                            </button>
                        </div>

                        {/* Profile Header Block */}
                        <div className="flex items-center gap-6 mb-8 mt-4 md:mt-0">
                            <img src={user.providerInfo?.ownerImage || user.profilePic ? `${BASE_URL}/${user.providerInfo?.ownerImage || user.profilePic}` : 'https://api.dicebear.com/7.x/avataaars/svg?seed=ProviderService'} alt="Partner Pic" className="w-24 h-24 rounded-2xl border-4 border-indigo-50 object-cover shadow-sm" />
                            <div>
                                <h2 className="text-2xl font-black text-gray-800 uppercase tracking-tight">{user.name}</h2>
                                <p className="text-gray-500 text-sm font-medium">Regional Base: {user.city || 'Gorakhpur Zone'}</p>
                            </div>
                        </div>

                        {/* Details Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
                            {[
                                { label: "Business Title Name", value: user.name },
                                { label: "Service Operations Base City", value: user.city || "Gorakhpur" },
                                { label: "Postal Service Zone Code", value: user.pincode || "Not Configured" },
                                { label: "PAN Validation Key", value: user.panCard || "Awaiting Verification Parameters" }
                            ].map((item) => (
                                <div key={item.label} className="space-y-1">
                                    <p className="text-[10px] font-black uppercase tracking-wider text-gray-400">{item.label}</p>
                                    <p className="bg-gray-50 border border-gray-100 p-2.5 rounded-xl text-gray-700 font-bold text-xs">{item.value}</p>
                                </div>
                            ))}
                        </div>

                        {/* SERVICE CATALOG SECTION */}
                        <div className="mt-10 pt-8 border-t border-gray-100 space-y-6">
                            <div className="border-l-4 border-indigo-500 pl-4">
                                <h3 className="text-lg font-black uppercase tracking-tight text-gray-800">Your Exclusive Active Services ({myServices?.length || 0})</h3>
                                <p className="text-xs text-gray-400 font-medium">These services are privately tied to your account workspace routing metrics.</p>
                            </div>

                            {myServices && myServices.length > 0 ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {myServices.map((service, idx) => (
                                        <div key={service._id || idx} className="bg-gradient-to-br from-gray-50 to-white border border-gray-200/60 p-4 rounded-2xl shadow-sm flex flex-col justify-between gap-3">
                                            <div className="flex items-start justify-between">
                                                <div>
                                                    <span className="text-[9px] font-black uppercase bg-indigo-50 text-indigo-600 px-2 py-0.5 rounded-md">
                                                        {typeof service.category === 'object' ? service.category?.name : service.category || "General"}
                                                    </span>
                                                    <h4 className="text-sm font-black text-gray-800 mt-1 uppercase">{service.name}</h4>
                                                    <p className="text-xs text-gray-500 line-clamp-2 mt-0.5">{service.description}</p>
                                                </div>
                                                <span className="text-sm font-black text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg">₹{service.price || '0'}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-xs text-gray-400 italic bg-gray-50 border border-dashed p-6 rounded-xl text-center">You haven't initialized individual services. Click "Add New Service" to build your active catalog stack.</p>
                            )}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default ProviderProfile;