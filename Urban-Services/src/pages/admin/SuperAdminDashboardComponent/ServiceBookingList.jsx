import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Loader2, Calendar, Clock, Phone, User, CheckCircle2, XCircle, AlertCircle, Search } from 'lucide-react';

const ServicesBookingList = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");

    // Fetch Bookings from Database
    const fetchBookings = async () => {
        try {
            const token = localStorage.getItem('token');
            const res = await axios.get('http://localhost:5000/api/bookings/all', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setBookings(res.data);
            setLoading(false);
        } catch (err) {
            console.error("Error loading bookings:", err);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBookings();
    }, []);

    // Handle Status Update Action
    const handleStatusUpdate = async (id, newStatus) => {
        try {
            const token = localStorage.getItem('token');
            await axios.put(`http://localhost:5000/api/bookings/update-status/${id}`, 
                { status: newStatus },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            alert(`Booking marked as ${newStatus}`);
            fetchBookings(); // List refresh karein
        } catch (err) {
            alert("Failed to update status");
        }
    };

    // Filter Logic (Search by User Name, Service Name, Phone)
    const filteredBookings = bookings.filter(b => {
        const query = searchQuery.toLowerCase().trim();
        if (!query) return true;
        return b.userName?.toLowerCase().includes(query) || 
               b.serviceName?.toLowerCase().includes(query) ||
               b.phone?.includes(query);
    });

    // Badge styling component for booking statuses
    const getStatusBadge = (status) => {
        switch (status) {
            case 'Completed': return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
            case 'Accepted': return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
            case 'Cancelled': return 'bg-rose-500/10 text-rose-400 border-rose-500/20';
            default: return 'bg-amber-500/10 text-amber-400 border-amber-500/20'; // Pending
        }
    };

    if (loading) return (
        <div className="h-full flex flex-col items-center justify-center p-12 bg-[#000b21]">
            <Loader2 className="animate-spin text-orange-500 mb-2" size={40} />
            <p className="text-orange-300 text-xs font-bold uppercase tracking-widest">Loading Booking Records...</p>
        </div>
    );

    return (
        <div className="space-y-6 text-left animate-in fade-in duration-300">
            {/* Top Header Row */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-black text-white uppercase tracking-tighter">Service Bookings</h2>
                    <p className="text-gray-400/60 text-[10px] font-bold uppercase tracking-widest">Manage live incoming customer requests and status tracking</p>
                </div>

                {/* Search Field */}
                <div className="relative w-full md:w-80">
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                    <input 
                        type="text"
                        placeholder="Search by customer, service, phone..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-[#061437] border border-blue-900/40 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white outline-none focus:border-orange-500/50 transition-all placeholder:text-gray-500 font-medium shadow-inner"
                    />
                </div>
            </div>

            {/* Table Box (10+ items scroll logic setup ready) */}
            <div className="w-full overflow-hidden bg-[#061437] rounded-2xl border border-blue-900/20 shadow-2xl">
                <div className="max-h-[550px] overflow-y-auto custom-scrollbar">
                    <table className="w-full text-left border-collapse relative">
                        <thead>
                            <tr className="border-b border-blue-900/30 text-[10px] font-black uppercase tracking-widest text-gray-400 bg-[#000b21] sticky top-0 z-10">
                                <th className="p-4 bg-[#000b21]">Customer / Order</th>
                                <th className="p-4 bg-[#000b21]">Requested Service</th>
                                <th className="p-4 bg-[#000b21]">Schedule Date</th>
                                <th className="p-4 bg-[#000b21] text-center">Status</th>
                                <th className="p-4 bg-[#000b21] text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-blue-900/10 text-sm">
                            {filteredBookings.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="p-8 text-center text-gray-500 font-bold uppercase text-xs">
                                        No Bookings Logged
                                    </td>
                                </tr>
                            ) : (
                                filteredBookings.map((booking) => (
                                    <tr key={booking._id} className="hover:bg-white/5 transition-colors">
                                        {/* Customer Info */}
                                        <td className="p-4">
                                            <div className="flex items-center gap-3 font-bold text-white">
                                                <div className="p-2 bg-orange-600/10 text-orange-400 rounded-lg"><User size={16}/></div>
                                                <div>
                                                    <p className="text-sm font-bold text-white leading-tight">{booking.userName || booking.userId?.name || 'Guest'}</p>
                                                    <p className="text-[10px] text-gray-500 font-mono mt-0.5 flex items-center gap-1"><Phone size={10}/> {booking.phone}</p>
                                                </div>
                                            </div>
                                        </td>

                                        {/* Service Name */}
                                        <td className="p-4 font-semibold text-gray-200">
                                            {booking.serviceName}
                                            <p className="text-[10px] text-gray-500 font-sans truncate max-w-[180px] mt-0.5">{booking.address}</p>
                                        </td>

                                        {/* Schedule Date */}
                                        <td className="p-4 text-gray-300 text-xs font-medium">
                                            <div className="flex items-center gap-1.5">
                                                <Calendar size={14} className="text-gray-500" />
                                                {booking.date}
                                            </div>
                                        </td>

                                        {/* Status Badge */}
                                        <td className="p-4 text-center">
                                            <span className={`inline-block px-2.5 py-1 text-[10px] font-black uppercase tracking-wider border rounded-lg ${getStatusBadge(booking.status)}`}>
                                                {booking.status}
                                            </span>
                                        </td>

                                        {/* Controls Actions Column */}
                                        <td className="p-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                {booking.status === 'Pending' && (
                                                    <button 
                                                        onClick={() => handleStatusUpdate(booking._id, 'Accepted')}
                                                        className="p-1.5 bg-blue-600/10 hover:bg-blue-600/20 text-blue-400 border border-blue-500/20 rounded-lg text-xs font-bold uppercase transition-all"
                                                        title="Accept Request"
                                                    >
                                                        Accept
                                                    </button>
                                                )}
                                                {booking.status === 'Accepted' && (
                                                    <button 
                                                        onClick={() => handleStatusUpdate(booking._id, 'Completed')}
                                                        className="p-1.5 bg-emerald-600/10 hover:bg-emerald-600/20 text-emerald-400 border border-emerald-500/20 rounded-lg text-xs font-bold uppercase transition-all"
                                                        title="Mark Complete"
                                                    >
                                                        Complete
                                                    </button>
                                                )}
                                                {booking.status !== 'Cancelled' && booking.status !== 'Completed' && (
                                                    <button 
                                                        onClick={() => handleStatusUpdate(booking._id, 'Cancelled')}
                                                        className="p-1.5 bg-rose-600/10 hover:bg-rose-600/20 text-rose-400 border border-rose-500/20 rounded-lg text-xs font-bold uppercase transition-all"
                                                        title="Cancel Request"
                                                    >
                                                        Cancel
                                                    </button>
                                                )}
                                                {(booking.status === 'Cancelled' || booking.status === 'Completed') && (
                                                    <span className="text-[10px] text-gray-600 font-bold uppercase tracking-widest px-2">Archived</span>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ServicesBookingList;