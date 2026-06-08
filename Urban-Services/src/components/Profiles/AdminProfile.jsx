import React, { useState } from 'react';
import { Mail, Phone, Edit, Shield, Activity, Users } from 'lucide-react';
import User_Data_Edit_Form from './User_Data_Edit_Form';

const AdminProfile = () => {
    const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('user')) || null);
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    if (!user) {
        return (
            <div className="min-h-screen flex items-center justify-center font-['Poppins'] text-gray-500">
                Admin session data missing. Please log in again.
            </div>
        );
    }

    const handleProfileSubmit = async (updatedData) => {
        setLoading(true);
        setMessage('');
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:5000/api/user/update', {
                method: 'POST', 
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token ? `Bearer ${token}` : ''
                },
                body: JSON.stringify({ userId: user._id, ...updatedData }),
            });

            const result = await response.json();
            if (response.ok) {
                const freshUserData = result.data || result.user || (result.name ? result : null);
                if (freshUserData) {
                    const updatedUser = { ...user, ...freshUserData };
                    localStorage.setItem('user', JSON.stringify(updatedUser));
                    setUser(updatedUser);
                    setIsEditing(false);
                    setMessage('Admin configuration updated successfully in Database!');
                }
            } else {
                setMessage(result.message || 'Failed to update administrative records.');
            }
        } catch (error) {
            setMessage('Network latency failure. Admin records not persisted.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-6xl mx-auto p-6 bg-gray-50 min-h-screen font-['Poppins']">
            {isEditing ? (
                <User_Data_Edit_Form 
                    currentUserData={user} 
                    onSave={handleProfileSubmit} 
                    isLoading={loading}
                    onClose={() => setIsEditing(false)} 
                />
            ) : (
                <>
                    {/* Welcome Header */}
                    <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-8 rounded-t-2xl shadow-md">
                        <span className="text-xs uppercase tracking-widest bg-black/30 px-3 py-1 rounded-full font-extrabold flex items-center gap-1 w-fit">
                            <Shield size={12} /> {user.role || 'Admin'} Management Security Node
                        </span>
                        <h1 className="text-3xl font-black uppercase tracking-tight mt-2">Console Administrator: {user.name}</h1>
                    </div>

                    <div className="bg-white p-8 rounded-b-2xl shadow-xl border border-gray-100 relative">
                        {message && (
                            <div className="mb-4 p-3 rounded-xl text-xs font-bold bg-blue-50 text-blue-600 border border-blue-100">
                                {message}
                            </div>
                        )}

                        <button 
                            onClick={() => setIsEditing(true)} 
                            className="absolute top-6 right-6 flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-xl transition shadow-md cursor-pointer"
                        >
                            <Edit size={16} /> Edit Control Matrix
                        </button>

                        <div className="flex items-center gap-6 mb-8">
                            <img 
                                src={user.profilePic ? `http://localhost:5000/${user.profilePic}` : 'https://api.dicebear.com/7.x/bottts/svg?seed=AdminPanel'} 
                                alt="Admin Avatar" 
                                className="w-24 h-24 rounded-2xl border-4 border-gray-100 object-cover shadow-sm bg-slate-900"
                            />
                            <div>
                                <h2 className="text-2xl font-black text-gray-800 uppercase tracking-tight">{user.name}</h2>
                                <p className="text-blue-500 text-xs font-black uppercase tracking-widest">Authorized Security Core</p>
                            </div>
                        </div>

                        {/* Admin Core Details */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                            {[
                                { label: "System Operational Identity", value: user.name },
                                { label: "Assigned Management Node", value: user.city || "Headquarters" },
                                { label: "Security Level Role", value: user.role?.toUpperCase() },
                                { label: "Internal Serial Tag Reference", value: user._id }
                            ].map((item) => (
                                <div key={item.label} className="space-y-1">
                                    <p className="text-xs font-black uppercase tracking-wider text-gray-400">{item.label}</p>
                                    <p className="bg-slate-50 border border-slate-100 p-3 rounded-xl text-slate-700 font-mono font-bold text-sm">
                                        {item.value}
                                    </p>
                                </div>
                            ))}
                        </div>

                        {/* Contacts */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="bg-white p-5 rounded-2xl border border-gray-100 flex items-center gap-4 shadow-sm">
                                <Mail className="text-blue-500 w-12 h-12 bg-blue-50 p-3 rounded-xl" />
                                <div>
                                    <p className="text-xs font-black text-gray-400 uppercase tracking-wider">Secure Communication Email</p>
                                    <p className="font-bold text-gray-800 text-sm">{user.email}</p>
                                </div>
                            </div>
                            <div className="bg-white p-5 rounded-2xl border border-gray-100 flex items-center gap-4 shadow-sm">
                                <Phone className="text-indigo-500 w-12 h-12 bg-indigo-50 p-3 rounded-xl" />
                                <div>
                                    <p className="text-xs font-black text-gray-400 uppercase tracking-wider">Direct Verification Line</p>
                                    <p className="font-bold text-gray-800 text-sm">{user.phone || 'System Level Direct Line N/A'}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default AdminProfile;