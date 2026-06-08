// src/pages/admin/admindashboardcomponent/ServicesList.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Wrench, RefreshCw, Trash2, Edit } from 'lucide-react';

const ServicesList = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const BASE_URL = 'http://localhost:5000';

  const fetchServices = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get(`${BASE_URL}/api/services`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setServices(Array.isArray(res.data) ? res.data : []);
      setError(null);
    } catch (err) {
      console.error("Error fetching services master data:", err);
      setError("Failed to load services database matrix.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this structural service item?")) return;
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${BASE_URL}/api/services/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert("Service deleted successfully!");
      fetchServices(); 
    } catch (err) {
      alert("Error dropping the service layout model.");
    }
  };

  // Helper function taaki agar database se populated object aaye toh name nikale, nahi toh fallback de
  const renderFieldName = (field, fallback) => {
    if (field && typeof field === 'object' && field.name) {
      return field.name;
    }
    return typeof field === 'string' && field.length > 0 ? field : fallback;
  };

  return (
    <div className="p-6 bg-[#061437] min-h-screen text-white font-['Poppins']">
      {/* Upper Action Bar */}
      <div className="flex justify-between items-center mb-6 border-b border-white/10 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-indigo-600 rounded-lg text-white">
            <Wrench size={20} />
          </div>
          <div>
            <h2 className="text-xl font-black uppercase tracking-tight">Services Master Sheet</h2>
            <p className="text-xs text-gray-500 uppercase tracking-widest mt-0.5">Live Operational Services from Database</p>
          </div>
        </div>
        
        <button 
          onClick={fetchServices} 
          className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-xs font-bold hover:bg-white/10 transition-all text-gray-300 hover:text-white"
        >
          <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
          Sync Live Database
        </button>
      </div>

      {/* Main Content Area */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 gap-3">
          <RefreshCw size={32} className="animate-spin text-indigo-500" />
          <p className="text-xs text-gray-500 uppercase font-black tracking-widest">Parsing Relational Schema...</p>
        </div>
      ) : error ? (
        <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl text-sm text-center">
          {error}
        </div>
      ) : services.length === 0 ? (
        <div className="p-8 bg-white/5 border border-dashed border-white/10 rounded-2xl text-center text-gray-500 text-sm">
          No records discovered in `api/services` pipeline matrix.
        </div>
      ) : (
        <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10 bg-white/[0.02] text-[10px] font-black uppercase tracking-widest text-gray-400">
                  <th className="p-4">Service Details</th>
                  <th className="p-4">Type</th>
                  <th className="p-4">Main Category</th>
                  <th className="p-4">Sub-Category</th>
                  <th className="p-4">Base Rate</th>
                  <th className="p-4 text-center">Action Framework</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-xs font-medium">
                {services.map((service) => (
                  <tr key={service._id} className="hover:bg-white/[0.01] transition-colors">
                    {/* Name */}
                    <td className="p-4">
                      <span className="font-bold text-white tracking-wide block">{service.name}</span>
                      <span className="text-[10px] text-gray-500 font-mono block mt-0.5">{service._id}</span>
                    </td>

                    {/* Service Type 🌟 FIXED */}
                    <td className="p-4">
                      <span className="px-2.5 py-1 rounded-md bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 font-bold text-[10px] uppercase tracking-wider">
                        {renderFieldName(service.serviceType, 'General')}
                      </span>
                    </td>

                    {/* Category 🌟 FIXED */}
                    <td className="p-4 text-gray-300 uppercase tracking-wide text-[11px]">
                      {renderFieldName(service.category, '—')}
                    </td>

                    {/* Sub Category 🌟 FIXED */}
                    <td className="p-4 text-gray-400 text-[11px]">
                      {renderFieldName(service.subCategory, 'General Framework')}
                    </td>

                    {/* Base Price */}
                    <td className="p-4 text-emerald-400 font-black">
                      ₹{service.price || '0'}
                    </td>

                    {/* Actions */}
                    <td className="p-4">
                      <div className="flex items-center justify-center gap-3">
                        <button 
                          onClick={() => alert(`Edit framework routing context: ${service._id}`)}
                          className="p-2 bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/20 text-blue-400 rounded-lg transition-colors"
                          title="Modify Service"
                        >
                          <Edit size={14} />
                        </button>
                        <button 
                          onClick={() => handleDelete(service._id)}
                          className="p-2 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-400 rounded-lg transition-colors"
                          title="Drop Item"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default ServicesList;