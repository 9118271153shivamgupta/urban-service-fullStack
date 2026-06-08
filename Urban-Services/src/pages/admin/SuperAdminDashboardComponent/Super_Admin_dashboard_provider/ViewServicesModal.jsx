import React, { useState } from 'react';
import { X, Trash2, Loader2 } from 'lucide-react';
import axios from 'axios';

const ViewServicesModal = ({ services, providerName, providerId, onClose, onServiceDeleted }) => {
    if (!services) return null;

    const [deletingServiceId, setDeletingServiceId] = useState(null);

    const handleDeleteService = async (serviceId) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this service from the provider?");
        if (!confirmDelete) return;

        try {
            setDeletingServiceId(serviceId);
            const token = localStorage.getItem('token');

            // 🚀 Correctly calling unified dynamic parameters endpoint
            const response = await axios.delete(`http://localhost:5000/api/user/delete-service/${providerId}/${serviceId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            alert("Service deleted successfully!");
            
            // Backend se aayi hui upgraded filter array response ko bhejenge
            if (onServiceDeleted && response.data?.updatedServices) {
                onServiceDeleted(response.data.updatedServices);
            }
            
        } catch (err) {
            console.error("Delete Service Error:", err.response?.data || err.message);
            alert(err.response?.data?.message || "Failed to delete service.");
        } finally {
            setDeletingServiceId(null);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm font-['Poppins']">
            <div className="w-full max-w-2xl bg-[#061437] border border-blue-900/40 rounded-2xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200">
                
                {/* Modal Header */}
                <div className="p-4 bg-[#000b21] border-b border-blue-900/30 flex items-center justify-between">
                    <div>
                        <h3 className="text-sm font-black text-white uppercase tracking-wider">Registered Services</h3>
                        <p className="text-xs text-orange-400 font-semibold">{providerName}</p>
                    </div>
                    <button 
                        onClick={onClose}
                        className="p-1.5 bg-blue-950/40 hover:bg-red-500/20 text-gray-400 hover:text-red-400 rounded-lg transition-all cursor-pointer"
                    >
                        <X size={16} />
                    </button>
                </div>

                {/* Modal Body */}
                <div className="p-5 max-h-[400px] overflow-y-auto custom-scrollbar">
                    {services.length === 0 ? (
                        <div className="text-center py-8 text-gray-500 text-xs font-bold uppercase tracking-wider">
                            No services registered for this provider.
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="border-b border-blue-900/30 text-[10px] font-black uppercase tracking-widest text-gray-400">
                                        <th className="pb-3 pl-2">Type / Category</th>
                                        <th className="pb-3">Service Name</th>
                                        <th className="pb-3 text-right">Price Matrix</th>
                                        <th className="pb-3 text-center text-red-400">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-blue-900/10 text-xs text-gray-300">
                                    {services.map((srv, index) => (
                                        <tr key={srv._id || index} className="hover:bg-blue-950/20 transition-all">
                                            <td className="py-3.5 pl-2">
                                                <span className="block text-[10px] text-gray-500 font-bold uppercase">{srv.serviceType || 'General'}</span>
                                                <span className="font-bold text-white">{srv.category}</span>
                                            </td>
                                            <td className="py-3.5 font-medium text-gray-400">
                                                {srv.serviceTitle || srv.subCategory || 'Standard Setup'}
                                            </td>
                                            <td className="py-3.5 text-right font-black text-emerald-400">
                                                ₹ {srv.priceRange || srv.price || 'N/A'}
                                            </td>
                                            <td className="py-3.5 text-center">
                                                <button
                                                    disabled={deletingServiceId === srv._id}
                                                    onClick={() => handleDeleteService(srv._id)}
                                                    className="inline-flex items-center justify-center p-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg transition-all cursor-pointer disabled:opacity-50"
                                                >
                                                    {deletingServiceId === srv._id ? (
                                                        <Loader2 size={14} className="animate-spin" />
                                                    ) : (
                                                        <Trash2 size={14} />
                                                    )}
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>

                {/* Modal Footer */}
                <div className="p-4 bg-[#000b21] border-t border-blue-900/20 flex justify-end">
                    <button 
                        onClick={onClose}
                        className="px-4 py-2 bg-blue-900/20 hover:bg-blue-900/40 text-gray-300 border border-blue-900/40 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer"
                    >
                        Close Window
                    </button>
                </div>

            </div>
        </div>
    );
};

export default ViewServicesModal; 