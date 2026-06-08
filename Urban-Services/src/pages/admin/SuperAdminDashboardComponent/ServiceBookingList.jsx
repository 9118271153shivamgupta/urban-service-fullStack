import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Loader2, Calendar, Phone, User, Search, AlertCircle, MapPin, MessageSquare, Tag, ListFilter, CheckCircle, XCircle, Clock, CheckSquare } from 'lucide-react';

const ServicesBookingList = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState("All"); // 🎯 New State for Status Filter

    // Fetch Bookings from Database
    const fetchBookings = async () => {
        try {
            const token = localStorage.getItem('token');
            const res = await axios.get('http://localhost:5000/api/bookings/all', {
                headers: { Authorization: `Bearer ${token}` }
            });
            
            if (res.data && Array.isArray(res.data)) {
                setBookings(res.data);
            } else if (res.data && Array.isArray(res.data.data)) {
                setBookings(res.data.data);
            } else {
                setBookings([]);
            }
            setLoading(false);
        } catch (err) {
            console.error("Error loading bookings:", err);
            setBookings([]);
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
            fetchBookings();
        } catch (err) {
            alert("Failed to update status");
        }
    };

    // 🎯 Enhanced Filter Logic (Includes Status Mapping + Search)
    const filteredBookings = (bookings || []).filter(b => {
        // 1. Status Filter Logic
        if (statusFilter !== "All") {
            if (statusFilter === "Pending" && b.status !== "Pending") return false;
            if (statusFilter === "Accepted" && b.status !== "Accepted") return false;
            if (statusFilter === "Completed" && b.status !== "Completed") return false;
            if (statusFilter === "Cancelled" && b.status !== "Cancelled") return false;
        }

        // 2. Search Query Logic
        const query = searchQuery.toLowerCase().trim();
        if (!query) return true;
        
        const customerName = b.userName || b.userId?.name || "";
        const serviceName = b.serviceName || "";
        const categoryName = b.category || b.categoryName || "";
        const phone = b.phone || "";
        const pincode = b.pincode || "";

        return customerName.toLowerCase().includes(query) || 
               serviceName.toLowerCase().includes(query) ||
               categoryName.toLowerCase().includes(query) ||
               phone.includes(query) ||
               pincode.includes(query);
    });

    const getStatusBadge = (status) => {
        switch (status) {
            case 'Completed': return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
            case 'Accepted': return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
            case 'Cancelled': return 'bg-rose-500/10 text-rose-400 border-rose-500/20';
            default: return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
        }
    };

    if (loading) return (
        <div className="h-full flex flex-col items-center justify-center p-12 bg-[#000b21]">
            <Loader2 className="animate-spin text-orange-500 mb-2" size={40} />
            <p className="text-orange-300 text-xs font-bold uppercase tracking-widest">Loading Booking Records...</p>
        </div>
    );

    return (
        <div className="space-y-6 text-left animate-in fade-in duration-300 font-['Poppins']">
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
                        placeholder="Search name, phone, pincode, service..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-[#061437] border border-blue-900/40 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white outline-none focus:border-orange-500/50 transition-all placeholder:text-gray-500 font-medium shadow-inner"
                    />
                </div>
            </div>

            {/* 🎯 Status Filter Tabs Row */}
            <div className="flex flex-wrap items-center gap-2 bg-[#000b21] p-1.5 rounded-xl border border-blue-900/20 w-fit">
                <button
                    onClick={() => setStatusFilter("All")}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
                        statusFilter === "All" 
                            ? "bg-blue-600 text-white shadow-md" 
                            : "text-gray-400 hover:text-white hover:bg-blue-900/20"
                    }`}
                >
                    <ListFilter size={14} /> All ({bookings.length})
                </button>

                <button
                    onClick={() => setStatusFilter("Pending")}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
                        statusFilter === "Pending" 
                            ? "bg-amber-500 text-[#000b21] shadow-md" 
                            : "text-amber-500/80 hover:text-amber-400 hover:bg-amber-500/10"
                    }`}
                >
                    <Clock size={14} /> Pending ({bookings.filter(b => b.status === "Pending" || !b.status || b.status === "").length})
                </button>

                <button
                    onClick={() => setStatusFilter("Accepted")}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
                        statusFilter === "Accepted" 
                            ? "bg-blue-500 text-white shadow-md" 
                            : "text-blue-400 hover:text-blue-300 hover:bg-blue-500/10"
                    }`}
                >
                    <CheckCircle size={14} /> Accepted ({bookings.filter(b => b.status === "Accepted").length})
                </button>

                <button
                    onClick={() => setStatusFilter("Completed")}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
                        statusFilter === "Completed" 
                            ? "bg-emerald-500 text-white shadow-md" 
                            : "text-emerald-400 hover:text-emerald-300 hover:bg-emerald-500/10"
                    }`}
                >
                    <CheckSquare size={14} /> Completed ({bookings.filter(b => b.status === "Completed").length})
                </button>

                <button
                    onClick={() => setStatusFilter("Cancelled")}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
                        statusFilter === "Cancelled" 
                            ? "bg-rose-600 text-white shadow-md" 
                            : "text-rose-400 hover:text-rose-300 hover:bg-rose-500/10"
                    }`}
                >
                    <XCircle size={14} /> Rejected ({bookings.filter(b => b.status === "Cancelled").length})
                </button>
            </div>

            {/* Table Box Container */}
            <div className="w-full overflow-hidden bg-[#061437] rounded-2xl border border-blue-900/20 shadow-2xl">
                <div className="max-h-[600px] overflow-y-auto custom-scrollbar">
                    <table className="w-full text-left border-collapse relative">
                        <thead>
                            <tr className="border-b border-blue-900/30 text-[10px] font-black uppercase tracking-widest text-gray-400 bg-[#000b21] sticky top-0 z-10">
                                <th className="p-4 bg-[#000b21]">Customer Details</th>
                                <th className="p-4 bg-[#000b21]">Service / Category</th>
                                <th className="p-4 bg-[#000b21]">Address & Pincode</th>
                                <th className="p-4 bg-[#000b21]">Remark Message</th>
                                <th className="p-4 bg-[#000b21]">Schedule</th>
                                <th className="p-4 bg-[#000b21] text-center">Status</th>
                                <th className="p-4 bg-[#000b21] text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-blue-900/10 text-sm">
                            {filteredBookings.length === 0 ? (
                                <tr>
                                    <td colSpan="7" className="p-12 text-center text-gray-400">
                                        <div className="flex flex-col items-center justify-center space-y-2">
                                            <AlertCircle className="text-orange-500/80 animate-pulse" size={32} />
                                            <p className="text-xs font-black uppercase tracking-widest text-gray-400">No {statusFilter !== "All" ? statusFilter : ""} Bookings Found</p>
                                            <p className="text-[10px] text-gray-500 lowercase">system is waiting for live client requests or query mismatch</p>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                filteredBookings.map((booking) => (
                                    <tr key={booking._id} className="hover:bg-white/5 transition-colors">
                                        
                                        {/* 1. Customer Name & Contact */}
                                        <td className="p-4">
                                            <div className="flex items-center gap-3 font-bold text-white">
                                                <div className="p-2 bg-orange-600/10 text-orange-400 rounded-lg flex-none"><User size={16}/></div>
                                                <div>
                                                    <p className="text-sm font-bold text-white leading-tight">{booking.userName || booking.userId?.name || 'Guest'}</p>
                                                    <p className="text-[10px] text-gray-500 font-mono mt-0.5 flex items-center gap-1"><Phone size={10}/> {booking.phone || 'N/A'}</p>
                                                </div>
                                            </div>
                                        </td>

                                        {/* 2. Service Name & Category */}
                                        <td className="p-4">
                                            <div className="space-y-0.5">
                                                <p className="font-semibold text-gray-200 text-sm">{booking.serviceName}</p>
                                                <p className="text-[10px] text-orange-400 font-bold uppercase tracking-wider flex items-center gap-1">
                                                    <Tag size={10}/> {booking.category || 'General'}
                                                </p>
                                            </div>
                                        </td>

                                        {/* 3. Address & Pincode */}
                                        <td className="p-4">
                                            <div className="space-y-0.5 max-w-[200px]">
                                                <p className="text-xs text-gray-300 line-clamp-2 leading-tight">{booking.address}</p>
                                                <p className="text-[10px] text-gray-500 font-mono flex items-center gap-1">
                                                    <MapPin size={10} className="text-gray-600"/> Pin: {booking.pincode || 'N/A'}
                                                </p>
                                            </div>
                                        </td>

                                        {/* 4. Remark Message */}
                                        <td className="p-4">
                                            <div className="flex items-start gap-1.5 max-w-[180px]">
                                                <MessageSquare size={12} className="text-gray-600 mt-0.5 flex-none" />
                                                <p className="text-xs text-gray-400 italic line-clamp-2 leading-tight">
                                                    {booking.remark || booking.message || 'No remarks added'}
                                                </p>
                                            </div>
                                        </td>

                                        {/* 5. Schedule Date */}
                                        <td className="p-4 text-gray-300 text-xs font-medium whitespace-nowrap">
                                            <div className="flex items-center gap-1.5">
                                                <Calendar size={14} className="text-gray-500" />
                                                {booking.date || 'TBD'}
                                            </div>
                                        </td>

                                        {/* 6. Status Badge */}
                                        <td className="p-4 text-center">
                                            <span className={`inline-block px-2.5 py-1 text-[10px] font-black uppercase tracking-wider border rounded-lg ${getStatusBadge(booking.status)}`}>
                                                {booking.status || 'Pending'}
                                            </span>
                                        </td>

                                        {/* 7. Controls Actions */}
                                        <td className="p-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                {(booking.status === 'Pending' || !booking.status) && (
                                                    <button 
                                                        onClick={() => handleStatusUpdate(booking._id, 'Accepted')}
                                                        className="px-2 py-1 bg-blue-600/10 hover:bg-blue-600/20 text-blue-400 border border-blue-500/20 rounded-lg text-xs font-bold uppercase transition-all"
                                                    >
                                                        Accept
                                                    </button>
                                                )}
                                                {booking.status === 'Accepted' && (
                                                    <button 
                                                        onClick={() => handleStatusUpdate(booking._id, 'Completed')}
                                                        className="px-2 py-1 bg-emerald-600/10 hover:bg-emerald-600/20 text-emerald-400 border border-emerald-500/20 rounded-lg text-xs font-bold uppercase transition-all"
                                                    >
                                                        Complete
                                                    </button>
                                                )}
                                                {booking.status !== 'Cancelled' && booking.status !== 'Completed' && (
                                                    <button 
                                                        onClick={() => handleStatusUpdate(booking._id, 'Cancelled')}
                                                        className="px-2 py-1 bg-rose-600/10 hover:bg-rose-600/20 text-rose-400 border border-rose-500/20 rounded-lg text-xs font-bold uppercase transition-all"
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