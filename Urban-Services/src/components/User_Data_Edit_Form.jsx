import React, { useState } from 'react';
import axios from 'axios';
import { Save, X, ImageUp, Mail, Phone, MapPin, Hash } from 'lucide-react';

const User_Data_Edit_Form = ({ onClose }) => {
    const user = JSON.parse(localStorage.getItem('user'));
    
    const [formData, setFormData] = useState({
        userId: user.id || user._id,
        name: user.name || "",
        phone: user.phone || "",
        address: user.address || "",
        city: user.city || "",
        pincode: user.pincode || ""
    });
    const [profilePic, setProfilePic] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        setLoading(true);
        const data = new FormData();
        Object.keys(formData).forEach(key => data.append(key, formData[key]));
        if (profilePic) data.append('profilePic', profilePic);

        try {
            const res = await axios.put('http://localhost:5000/api/user/update', data);
            localStorage.setItem('user', JSON.stringify(res.data.user));
            alert("Profile Updated Successfully!");
            window.location.reload();
        } catch (err) {
            alert("Update Failed!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 relative max-w-4xl mx-auto">
            <button onClick={onClose} className="absolute top-6 right-6 text-gray-500 hover:text-red-500"><X size={24} /></button>
            <h2 className="text-2xl font-bold mb-8 text-blue-600">Edit Complete Profile</h2>

            <form onSubmit={handleUpdate} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Profile Pic Section */}
                <div className="md:col-span-2 flex items-center gap-4 bg-gray-50 p-4 rounded-lg">
                    <img src={user.profilePic ? `http://localhost:5000/${user.profilePic}` : 'https://via.placeholder.com/150'} className="w-20 h-20 rounded-full object-cover border-2 border-blue-500" />
                    <label className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-blue-700 font-bold">
                        <ImageUp size={18} /> Change Photo
                        <input type="file" onChange={(e) => setProfilePic(e.target.files[0])} className="hidden" />
                    </label>
                </div>

                {/* Input Fields */}
                <div className="space-y-1">
                    <label className="text-sm font-bold text-gray-600">Full Name</label>
                    <input name="name" value={formData.name} onChange={handleChange} className="w-full p-3 border rounded-lg" />
                </div>

                <div className="space-y-1">
                    <label className="text-sm font-bold text-gray-600">Email (Read Only)</label>
                    <input value={user.email} disabled className="w-full p-3 bg-gray-100 border rounded-lg text-gray-500" />
                </div>

                <div className="space-y-1">
                    <label className="text-sm font-bold text-gray-600">Phone Number</label>
                    <input name="phone" value={formData.phone} onChange={handleChange} className="w-full p-3 border rounded-lg" placeholder="+91..." />
                </div>

                <div className="space-y-1">
                    <label className="text-sm font-bold text-gray-600">City</label>
                    <input name="city" value={formData.city} onChange={handleChange} className="w-full p-3 border rounded-lg" />
                </div>

                <div className="space-y-1">
                    <label className="text-sm font-bold text-gray-600">Pincode</label>
                    <input name="pincode" value={formData.pincode} onChange={handleChange} className="w-full p-3 border rounded-lg" />
                </div>

                <div className="md:col-span-2 space-y-1">
                    <label className="text-sm font-bold text-gray-600">Full Address</label>
                    <textarea name="address" value={formData.address} onChange={handleChange} className="w-full p-3 border rounded-lg h-24" />
                </div>

                <button type="submit" disabled={loading} className="md:col-span-2 bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition shadow-lg">
                    {loading ? "Updating..." : "Save All Changes"}
                </button>
            </form>
        </div>
    );
};

export default User_Data_Edit_Form;