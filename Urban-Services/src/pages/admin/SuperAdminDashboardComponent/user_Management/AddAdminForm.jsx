import React, { useState } from 'react';
import axios from 'axios';
import { X, ShieldCheck, User, Mail, Phone, MapPin, Lock, Calendar, Hash } from 'lucide-react';

const AddAdminForm = ({ onClose, refreshUsers }) => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        confirmPassword: '',
        name: '',
        phone: '',
        email: '',
        city: '',
        pincode: '',
        address: '',
        joiningDate: new Date().toISOString().split('T')[0], // Default today
        role: 'admin'
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            return alert("Passwords do not match!");
        }

        try {
            const token = localStorage.getItem('token');
            // Backend endpoint check kar lijiye (auth/register ya admin/add)
            await axios.post('http://localhost:5000/api/auth/register', formData, {
                headers: { Authorization: `Bearer ${token}` }
            });
            alert("Admin created successfully!");
            refreshUsers();
            onClose();
        } catch (err) {
            alert(err.response?.data?.message || "Error adding admin");
        }
    };

    const inputStyle = "w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm text-white outline-none focus:border-white/40 transition-all placeholder:text-gray-500 placeholder:font-normal";
    const labelStyle = "text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1.5 flex items-center gap-2";

    return (
        <div className="p-8 relative">
            {/* Close Button */}
            <button onClick={onClose} className="absolute right-6 top-6 text-gray-500 hover:text-white transition-colors">
                <X size={24} />
            </button>

            {/* Header */}
            <div className="mb-8">
                <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-white text-black rounded-lg">
                        <ShieldCheck size={20} />
                    </div>
                    <h2 className="text-2xl font-black text-white uppercase tracking-tighter">Create System Admin</h2>
                </div>
                <p className="text-gray-500 text-xs font-bold uppercase tracking-widest">Assign high-level administrative privileges</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    
                    {/* Column 1: Identity */}
                    <div className="space-y-4">
                        <div>
                            <label className={labelStyle}><User size={12}/> Full Name</label>
                            <input type="text" placeholder="Enter full name" required className={inputStyle}
                                onChange={(e) => setFormData({...formData, name: e.target.value})} />
                        </div>
                        <div>
                            <label className={labelStyle}><Hash size={12}/> Username</label>
                            <input type="text" placeholder="Unique username" required className={inputStyle}
                                onChange={(e) => setFormData({...formData, username: e.target.value})} />
                        </div>
                        <div>
                            <label className={labelStyle}><Mail size={12}/> Email Address</label>
                            <input type="email" placeholder="admin@domain.com" required className={inputStyle}
                                onChange={(e) => setFormData({...formData, email: e.target.value})} />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className={labelStyle}><Lock size={12}/> Password</label>
                                <input type="password" placeholder="••••••••" required className={inputStyle}
                                    onChange={(e) => setFormData({...formData, password: e.target.value})} />
                            </div>
                            <div>
                                <label className={labelStyle}><Lock size={12}/> Confirm</label>
                                <input type="password" placeholder="••••••••" required className={inputStyle}
                                    onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})} />
                            </div>
                        </div>
                    </div>

                    {/* Column 2: Contact & Location */}
                    <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className={labelStyle}><Phone size={12}/> Mobile</label>
                                <input type="text" placeholder="10-digit number" required className={inputStyle}
                                    onChange={(e) => setFormData({...formData, phone: e.target.value})} />
                            </div>
                            <div>
                                <label className={labelStyle}><Calendar size={12}/> Date</label>
                                <input type="date" value={formData.joiningDate} className={inputStyle}
                                    onChange={(e) => setFormData({...formData, joiningDate: e.target.value})} />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className={labelStyle}><MapPin size={12}/> City</label>
                                <input type="text" placeholder="e.g. Gorakhpur" className={inputStyle}
                                    onChange={(e) => setFormData({...formData, city: e.target.value})} />
                            </div>
                            <div>
                                <label className={labelStyle}><Hash size={12}/> Pincode</label>
                                <input type="text" placeholder="6-digit code" className={inputStyle}
                                    onChange={(e) => setFormData({...formData, pincode: e.target.value})} />
                            </div>
                        </div>
                        <div>
                            <label className={labelStyle}><MapPin size={12}/> Full Address</label>
                            <textarea placeholder="Enter office or residential address" rows="3" className={`${inputStyle} resize-none`}
                                onChange={(e) => setFormData({...formData, address: e.target.value})}></textarea>
                        </div>
                    </div>
                </div>

                {/* Submit Section */}
                <div className="pt-6 border-t border-white/10 flex items-center justify-between">
                    <div className="text-[10px] text-gray-500 font-bold uppercase">
                        Role Access: <span className="text-white">Full System Control</span>
                    </div>
                    <div className="flex gap-4">
                        <button type="button" onClick={onClose} className="px-8 py-3 text-xs font-black uppercase text-gray-400 hover:text-white transition-colors">
                            Discard
                        </button>
                        <button type="submit" className="px-10 py-3 bg-white text-black text-xs font-black uppercase rounded-xl hover:bg-gray-200 transition-all active:scale-95 shadow-lg shadow-white/5">
                            Authorize & Create
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default AddAdminForm;