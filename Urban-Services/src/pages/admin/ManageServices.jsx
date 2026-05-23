import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { PlusCircle, Trash2, ImagePlus, ListPlus } from 'lucide-react';

const ManageServices = () => {
    const [services, setServices] = useState([]);
    // Updated initial state with your new fields
    const [formData, setFormData] = useState({ 
        name: '', 
        description: '', 
        price: '', 
        category: 'Cleaning & Pest Control',
        subCategory: '',
        tagline: '',
        features: '' // We will store this as a comma-separated string
    });
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);

    const BASE_URL = 'http://localhost:5000';

    useEffect(() => { fetchServices(); }, []);

    const fetchServices = async (e) => {
        try {
            const res = await axios.get(`${BASE_URL}/api/services`);
            setServices(res.data);
        } catch (err) { console.log("Fetch failed",err); }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const data = new FormData();
        
        // Append all fields to FormData
        data.append('name', formData.name);
        data.append('description', formData.description);
        data.append('price', formData.price);
        data.append('category', formData.category);
        data.append('subCategory', formData.subCategory);
        data.append('tagline', formData.tagline);
        
        // Convert comma-separated string to Array for backend
        const featuresArray = formData.features.split(',').map(item => item.trim()).filter(i => i !== "");
        data.append('features', JSON.stringify(featuresArray));
        console.log("Sending to Backend:", JSON.stringify(featuresArray));
        if (image) data.append('image', image);

        try {
            await axios.post(`${BASE_URL}/api/services/add`, data);
            alert("Service Added Successfully!");
            setFormData({ 
                name: '', description: '', price: '', 
                category: 'Cleaning & Pest Control', 
                subCategory: '', tagline: '', features: '' 
            });
            setImage(null);
            fetchServices();
        } catch (err) { alert("Failed to add service"); }
        finally { setLoading(false); }
    };

    const deleteService = async (id) => {
        if (window.confirm("Delete this service?")) {
            await axios.delete(`${BASE_URL}/api/services/${id}`);
            fetchServices();
        }
    };

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Manage Services</h2>

            {/* Dynamic Add Service Form */}
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-md mb-10 grid grid-cols-1 md:grid-cols-2 gap-5">
                
                {/* Name */}
                <div className="flex flex-col gap-1">
                    <label className="text-sm font-semibold text-gray-600">Service Name</label>
                    <input type="text" placeholder="e.g. Bathroom Cleaning" className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} required />
                </div>

                {/* Price */}
                <div className="flex flex-col gap-1">
                    <label className="text-sm font-semibold text-gray-600">Price (₹)</label>
                    <input type="text" placeholder="e.g. ₹299 - ₹899" className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" value={formData.price} onChange={(e) => setFormData({...formData, price: e.target.value})} required />
                </div>

                {/* Category */}
                <div className="flex flex-col gap-1">
                    <label className="text-sm font-semibold text-gray-600">Main Category</label>
                    <select className="p-3 border rounded-lg outline-none" value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})}>
                        <option value="Cleaning & Pest Control">Cleaning & Pest Control</option>
                        <option value="Repairing">Repairing</option>
                        <option value="Painting">Painting</option>
                    </select>
                </div>

                {/* Sub-Category */}
                <div className="flex flex-col gap-1">
                    <label className="text-sm font-semibold text-gray-600">Sub Category</label>
                    <input type="text" placeholder="e.g. Cleaning" className="p-3 border rounded-lg outline-none" value={formData.subCategory} onChange={(e) => setFormData({...formData, subCategory: e.target.value})} />
                </div>

                {/* Tagline */}
                <div className="flex flex-col gap-1 md:col-span-2">
                    <label className="text-sm font-semibold text-gray-600">Tagline</label>
                    <input type="text" placeholder="Short catchy line..." className="p-3 border rounded-lg outline-none" value={formData.tagline} onChange={(e) => setFormData({...formData, tagline: e.target.value})} />
                </div>

                {/* Features (Comma Separated) */}
                <div className="flex flex-col gap-1 md:col-span-2">
                    <label className="text-sm font-semibold text-gray-600">Features (Separate with commas ',')</label>
                    <input type="text" placeholder="Feature 1, Feature 2, Feature 3..." className="p-3 border rounded-lg outline-none" value={formData.features} onChange={(e) => setFormData({...formData, features: e.target.value})} />
                </div>

                {/* Image Upload */}
                <div className="flex flex-col gap-1 md:col-span-1">
                    <label className="text-sm font-semibold text-gray-600">Service Image</label>
                    <div className="flex items-center gap-3 border p-2 rounded-lg bg-gray-50">
                        <ImagePlus className="text-gray-400" />
                        <input type="file" className="text-sm" onChange={(e) => setImage(e.target.files[0])} />
                    </div>
                </div>

                {/* Description */}
                <div className="flex flex-col gap-1 md:col-span-2">
                    <label className="text-sm font-semibold text-gray-600">Description</label>
                    <textarea placeholder="Full detail about the service..." className="p-3 border rounded-lg outline-none h-24" value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} required />
                </div>

                <button type="submit" disabled={loading} className="md:col-span-2 bg-indigo-600 text-white font-bold py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-indigo-700 transition-all shadow-lg active:scale-95">
                    <PlusCircle size={20} /> {loading ? "Saving Service..." : "Publish Service"}
                </button>
            </form>

            {/* Table Display */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-indigo-50 text-indigo-900">
                        <tr>
                            <th className="p-4">Service</th>
                            <th className="p-4">Category</th>
                            <th className="p-4">Price</th>
                            <th className="p-4">Features</th>
                            <th className="p-4 text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {services.map((s) => (
                            <tr key={s._id} className="border-b hover:bg-gray-50 transition">
                                <td className="p-4 flex items-center gap-3">
                                    <img src={`${BASE_URL}/${s.image}`} className="w-12 h-12 rounded-lg object-cover border" alt="" />
                                    <div>
                                        <p className="font-bold text-gray-800">{s.name}</p>
                                        <p className="text-[10px] text-gray-500 uppercase font-bold tracking-tighter">{s.subCategory}</p>
                                    </div>
                                </td>
                                <td className="p-4 text-sm text-gray-600">{s.category}</td>
                                <td className="p-4 font-semibold text-indigo-600">{s.price}</td>
                                <td className="p-4">
                                    <div className="flex flex-wrap gap-1">
                                        {/* Parse features if they come back as an array from DB */}
                                        {Array.isArray(s.features) ? s.features.slice(0, 2).map((f, i) => (
                                            <span key={i} className="text-[9px] bg-gray-100 px-2 py-0.5 rounded text-gray-600">● {f}</span>
                                        )) : <span className="text-xs text-gray-400">No features</span>}
                                    </div>
                                </td>
                                <td className="p-4 text-center">
                                    <button onClick={() => deleteService(s._id)} className="text-red-500 hover:bg-red-50 p-2 rounded-full transition-colors">
                                        <Trash2 size={20} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageServices;