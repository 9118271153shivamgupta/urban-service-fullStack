import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Mail, Phone, Edit, CalendarDays } from 'lucide-react';
import User_Data_Edit_Form from '../components/User_Data_Edit_Form';

const UserProfile = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const [isEditing, setIsEditing] = useState(false);
    
    // Fallback if no user is found
    if (!user) return <div>User not found.</div>;

    return (
        <div className="max-w-6xl mx-auto p-6 bg-gray-50 min-h-screen">
            {/* Conditional Rendering: Form vs Profile View */}
            {isEditing ? (
                <User_Data_Edit_Form onClose={() => setIsEditing(false)} />
            ) : (
                <>
                    {/* Welcome Header */}
                    <div className="bg-emerald-400 text-white p-6 rounded-t-xl mb-6">
                        <h1 className="text-3xl font-bold">Welcome, {user.name}</h1>
                    </div>

                    <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 relative">
                        {/* Edit Button */}
                        <button 
                            onClick={() => setIsEditing(true)} 
                            className="absolute top-6 right-6 flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition"
                        >
                            <Edit size={18} /> Edit
                        </button>

                        {/* Profile Header (Avatar & Basics) */}
                        <div className="flex items-center gap-6 mb-8">
                            <img 
                                src={user.profilePic ? `http://localhost:5000/${user.profilePic}` : 'https://via.placeholder.com/150'} 
                                alt="Avatar" 
                                className="w-24 h-24 rounded-full border-4 border-gray-100 object-cover"
                            />
                            <div>
                                <h2 className="text-2xl font-bold">{user.name}</h2>
                                <p className="text-gray-500">{user.email}</p>
                            </div>
                        </div>

                        {/* Static Details Grid */}
                        <div className="grid grid-cols-2 gap-x-12 gap-y-6 mb-10">
                            {[
                                { label: "Full Name", value: user.name || "First Name" },
                                { label: "Last Name", value: user.lastName || "Last Name" },
                                { label: "Gender", value: user.gender || "Not specified" },
                                { label: "Country", value: user.country || "Select Country" },
                                { label: "Language", value: user.language || "Select Language" },
                                { label: "Occupation", value: user.occupation || "Select Occupation" }
                            ].map((item) => (
                                <div key={item.label}>
                                    <p className="font-semibold text-gray-700">{item.label}</p>
                                    <p className="bg-gray-100 p-3 rounded-lg text-gray-600 font-medium">
                                        {item.value}
                                    </p>
                                </div>
                            ))}
                        </div>

                        {/* Contact Info Cards */}
                        <div className="grid grid-cols-2 gap-6">
                            {[
                                { title: "My Email Address", icon: Mail, value: user.email, date: "1 month ago" },
                                { title: "My Phone Number", icon: Phone, value: user.phone || "+880132459866", date: "1 month ago" }
                            ].map((item) => (
                                <div key={item.title} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-start gap-4">
                                    <item.icon className="text-blue-500 w-10 h-10 bg-blue-50 p-2 rounded-full mt-1" />
                                    <div>
                                        <p className="font-bold text-gray-800">{item.title}</p>
                                        <p className="text-gray-600">{item.value}</p>
                                        <p className="text-gray-400 text-sm mt-1">{item.date}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default UserProfile;