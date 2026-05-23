import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Search, Bell, Menu, CheckCircle, XCircle, Grid, ClipboardList, PlusCircle } from 'lucide-react';
import { Link } from 'react-router-dom'; // Button ke liye Link import karein
import Sidebar from './Sidebar';
import StatCard from './StatCard';

const AdminDashboard = () => {
    const [bookings, setBookings] = useState([]);
    const [stats, setStats] = useState({ users: 0, bookings: 0 });
    
    // User data nikalne ke liye (localStorage ya sessionStorage check karein jahan aapne login ke waqt save kiya ho)
    const user = JSON.parse(localStorage.getItem('user')) || JSON.parse(sessionStorage.getItem('user'));

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const resStats = await axios.get('http://localhost:5000/api/admin/stats');
            const resBookings = await axios.get('http://localhost:5000/api/admin/all-bookings');
            setStats(resStats.data);
            setBookings(resBookings.data);
        } catch (err) {
            console.log("Error loading admin data");
        }
    };

    const updateStatus = async (id, newStatus) => {
        try {
            await axios.put(`http://localhost:5000/api/admin/update-status/${id}`, { status: newStatus });
            fetchData();
        } catch (err) {
            alert("Update failed");
        }
    };

    return (
        <div className="flex min-h-screen bg-[#000b21] text-white font-sans">
            <Sidebar />

            <main className="flex-1 flex flex-col overflow-hidden">
                <header className="h-16 bg-[#061437] border-b border-blue-900/30 flex items-center justify-between px-4 md:px-8">
                    <div className="flex items-center gap-4 flex-1">
                        <button className="lg:hidden text-gray-400"><Menu /></button>
                        <div className="relative max-w-md w-full hidden md:block">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                            <input 
                                type="text" 
                                placeholder="Search requests..." 
                                className="w-full bg-[#000b21] border border-blue-900/50 rounded-md py-1.5 pl-10 pr-4 focus:outline-none focus:border-blue-500 transition-all text-sm"
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-6">
                        {/* --- NAYA BUTTON: MANAGE SERVICES PAR JAANE KE LIYE --- */}
                        <Link 
                            to="/manage-services" 
                            className="hidden md:flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 rounded-md text-sm font-bold transition-all"
                        >
                            <PlusCircle size={16} /> Add Service
                        </Link>

                        <div className="relative cursor-pointer">
                            <Bell size={20} className="text-gray-400" />
                            <span className="absolute -top-1 -right-1 bg-red-500 text-[10px] w-4 h-4 rounded-full flex items-center justify-center">3</span>
                        </div>
                        
                        <div className="flex items-center gap-3 pl-4 border-l border-blue-900/30">
                            <div className="text-right hidden sm:block">
                                {/* DYNAMIC NAME */}
                                <p className="text-sm font-semibold">{user?.name || 'Admin User'}</p>
                                <p className="text-[10px] text-gray-400 capitalize">{user?.role || 'Administrator'}</p>
                            </div>
                            <div className="w-10 h-10 rounded-lg overflow-hidden border-2 border-blue-500/50">
                                {/* DYNAMIC PHOTO: Agar photo h to backend se dikhao, nahi to avatar */}
                                <img 
                                    src={user?.profilePic ? `http://localhost:5000/${user.profilePic}` : `https://ui-avatars.com/api/?name=${user?.name || 'Admin'}&bg=0D8ABC&color=fff`} 
                                    alt="Profile" 
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>
                    </div>
                </header>

                <div className="flex-1 overflow-y-auto p-4 md:p-8">
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                        <div>
                            <h2 className="text-2xl font-bold text-white">Analytics Dashboard</h2>
                            <p className="text-gray-400 text-sm">Welcome back, {user?.name?.split(' ')[0]}! Here's what's happening today.</p>
                        </div>
                        <div className="flex flex-wrap gap-4">
                            <StatCard icon={<Grid size={20}/>} color="bg-pink-500" label="Total Users" value={stats.users} />
                            <StatCard icon={<ClipboardList size={20}/>} color="bg-blue-600" label="Bookings" value={stats.bookings} />
                            <StatCard icon={<CheckCircle size={20}/>} color="bg-green-600" label="Success Rate" value="98%" />
                        </div>
                    </div>

                    {/* Table Section */}
                    <div className="bg-[#061437] rounded-xl border border-blue-900/30 overflow-hidden shadow-2xl">
                        <div className="p-5 border-b border-blue-900/30 flex justify-between items-center bg-[#081a44]">
                            <h3 className="font-bold text-lg">Manage Service Requests</h3>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-[#000b21]/50 text-blue-300 text-xs uppercase tracking-widest">
                                    <tr>
                                        <th className="p-5">Customer Info</th>
                                        <th className="p-5">Service</th>
                                        <th className="p-5">Status</th>
                                        <th className="p-5 text-center">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-blue-900/20">
                                    {bookings.length > 0 ? bookings.map((b) => (
                                        <tr key={b._id} className="hover:bg-blue-900/10 transition-colors">
                                            <td className="p-5 font-medium">{b.userName}</td>
                                            <td className="p-5 text-gray-300">{b.serviceName}</td>
                                            <td className="p-5">
                                                <span className={`px-2 py-1 rounded text-[10px] font-bold ${
                                                    b.status === 'Accepted' ? 'bg-green-500/20 text-green-400' : 
                                                    b.status === 'Rejected' ? 'bg-red-500/20 text-red-400' : 
                                                    'bg-yellow-500/20 text-yellow-400'
                                                }`}>
                                                    {b.status}
                                                </span>
                                            </td>
                                            <td className="p-5">
                                                <div className="flex justify-center gap-3">
                                                    <button 
                                                        onClick={() => updateStatus(b._id, 'Accepted')} 
                                                        className="text-green-500 hover:scale-110 transition-transform"
                                                        title="Accept Request"
                                                    >
                                                        <CheckCircle size={20}/>
                                                    </button>
                                                    <button 
                                                        onClick={() => updateStatus(b._id, 'Rejected')} 
                                                        className="text-red-500 hover:scale-110 transition-transform"
                                                        title="Reject Request"
                                                    >
                                                        <XCircle size={20}/>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    )) : (
                                        <tr>
                                            <td colSpan="4" className="p-10 text-center text-gray-500">No bookings found.</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default AdminDashboard;
