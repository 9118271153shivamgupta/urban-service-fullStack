import React from 'react';
import { Search, Phone, MapPin } from 'lucide-react';

const UserFilterBar = ({ filters, setFilters }) => {
    return (
        <div className="grid grid-cols-2 md:grid-cols-6 gap-3 bg-[#061437]/50 p-4 rounded-xl border border-blue-900/10">
            <div className="relative">
                <Search className="absolute left-3 top-2.5 text-gray-500" size={14} />
                <input type="text" placeholder="NAME..." className="w-full bg-[#000b21] border border-blue-900/30 rounded-lg p-2 pl-9 text-[10px] font-bold text-white uppercase"
                    onChange={(e) => setFilters({ ...filters, name: e.target.value })} />
            </div>
            <div className="relative">
                <Phone className="absolute left-3 top-2.5 text-gray-500" size={14} />
                <input type="text" placeholder="PHONE..." className="w-full bg-[#000b21] border border-blue-900/30 rounded-lg p-2 pl-9 text-[10px] font-bold text-white uppercase"
                    onChange={(e) => setFilters({ ...filters, phone: e.target.value })} />
            </div>
            {/* City Filter */}
            <div className="relative">
                <MapPin className="absolute left-3 top-2.5 text-gray-500" size={14} />
                <input type="text" placeholder="CITY..." className="w-full bg-[#000b21] border border-blue-900/30 rounded-lg p-2 pl-9 text-[10px] font-bold text-white uppercase"
                    onChange={(e) => setFilters({ ...filters, city: e.target.value })} />
            </div>
            <select className="bg-[#000b21] border border-blue-900/30 rounded-lg p-2 text-[10px] font-bold text-white uppercase" onChange={(e) => setFilters({ ...filters, role: e.target.value })}>
                <option value="">All Roles</option>
                <option value="admin">Admin</option>
                <option value="provider">Provider</option>
                <option value="customer">Customer</option>
            </select>
            <select className="bg-[#000b21] border border-blue-900/30 rounded-lg p-2 text-[10px] font-bold text-white uppercase" onChange={(e) => setFilters({ ...filters, month: e.target.value })}>
                <option value="">All Months</option>
                {[...Array(12)].map((_, i) => (
                    <option key={i + 1} value={i + 1}>{new Date(0, i).toLocaleString('en', { month: 'long' })}</option>
                ))}
            </select>
            <input type="number" placeholder="YEAR" className="bg-[#000b21] border border-blue-900/30 rounded-lg p-2 text-[10px] font-bold text-white uppercase"
                onChange={(e) => setFilters({ ...filters, year: e.target.value })} />
        </div>
    );
};

export default UserFilterBar;