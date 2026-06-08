import React, { useState } from 'react';
import { Mail, Phone, Edit, User, MapPin } from 'lucide-react';
import User_Data_Edit_Form from './User_Data_Edit_Form';

const CustomerProfile = () => {
    const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('user')) || null);
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    if (!user) {
        return (
            <div className="min-h-screen flex items-center justify-center font-['Poppins'] text-gray-500">
                Profile missing. Please execute fresh log parameters.
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
                    setMessage('Your profile package synchronized successfully!');
                }
            } else {
                setMessage(result.message || 'Error parsing update variables.');
            }
        } catch (error) {
            setMessage('Network infrastructure lost link. Target save failed.');
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
                    <div className="bg-gradient-to-r from-emerald-400 to-teal-500 text-white p-8 rounded-t-2xl shadow-md">
                        <span className="text-xs uppercase tracking-widest bg-black/20 px-3 py-1 rounded-full font-extrabold flex items-center gap-1 w-fit">
                            <User size={12} /> Standard Member Portal
                        </span>
                        <h1 className="text-3xl font-black uppercase tracking-tight mt-2">Hello, {user.name}</h1>
                    </div>

                    <div className="bg-white p-8 rounded-b-2xl shadow-xl border border-gray-100 relative">
                        {message && (
                            <div className="mb-4 p-3 rounded-xl text-xs font-bold bg-emerald-50 text-emerald-600 border border-emerald-100">
                                {message}
                            </div>
                        )}

                        <button 
                            onClick={() => setIsEditing(true)} 
                            className="absolute top-6 right-6 flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-6 rounded-xl transition shadow-md cursor-pointer"
                        >
                            <Edit size={16} /> Edit Settings
                        </button>

                        {/* Image Preview Area */}
                        <div className="flex items-center gap-6 mb-8">
                            <img 
                                src={user.profilePic ? `http://localhost:5000/${user.profilePic}` : 'https://api.dicebear.com/7.x/avataaars/svg?seed=CustomerUser'} 
                                alt="User Avatar" 
                                className="w-24 h-24 rounded-2xl border-4 border-gray-100 object-cover shadow-sm"
                            />
                            <div>
                                <h2 className="text-2xl font-black text-gray-800 uppercase tracking-tight">{user.name}</h2>
                                <p className="text-gray-400 text-xs font-bold uppercase tracking-widest flex items-center gap-1 mt-1">
                                    <MapPin size={12} className="text-emerald-500" /> {user.city || 'Gorakhpur Resident'}
                                </p>
                            </div>
                        </div>

                        {/* Core Basic Layout Matrix */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                            {[
                                { label: "Account Name Reference", value: user.name },
                                { label: "City Matrix Location", value: user.city || "Gorakhpur Zone" },
                                { label: "Area Delivery Pincode", value: user.pincode || "Not Set" },
                                { label: "Complete Delivery Address", value: user.address || "No active billing address mapped yet." }
                            ].map((item) => (
                                <div key={item.label} className="space-y-1">
                                    <p className="text-xs font-black uppercase tracking-wider text-gray-400">{item.label}</p>
                                    <p className="bg-gray-50 border border-gray-100 p-3 rounded-xl text-gray-700 font-bold text-sm">
                                        {item.value}
                                    </p>
                                </div>
                            ))}
                        </div>

                        {/* Core Contact Rows */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="bg-white p-5 rounded-2xl border border-gray-100 flex items-center gap-4 shadow-sm">
                                <Mail className="text-emerald-500 w-12 h-12 bg-emerald-50 p-3 rounded-xl" />
                                <div>
                                    <p className="text-xs font-black text-gray-400 uppercase tracking-wider">Communication Email</p>
                                    <p className="font-bold text-gray-800 text-sm break-all">{user.email}</p>
                                </div>
                            </div>
                            <div className="bg-white p-5 rounded-2xl border border-gray-100 flex items-center gap-4 shadow-sm">
                                <Phone className="text-teal-500 w-12 h-12 bg-teal-50 p-3 rounded-xl" />
                                <div>
                                    <p className="text-xs font-black text-gray-400 uppercase tracking-wider">Contact Number</p>
                                    <p className="font-bold text-gray-800 text-sm">{user.phone || 'Not Configured'}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default CustomerProfile;