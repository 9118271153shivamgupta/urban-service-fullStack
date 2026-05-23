import React from 'react';
import { Loader2, Shield } from 'lucide-react';
import { useUsers } from './useUsers'; // Aapka existing hook

const AllAdminsList = () => {
    // loading aur filteredUsers direct aapke custom hook se nikal rahe hain
    const { loading, filteredUsers } = useUsers();

    if (loading) return (
        <div className="h-full flex flex-col items-center justify-center p-12 bg-[#000b21]">
            <Loader2 className="animate-spin text-blue-500 mb-2" size={40} />
            <p className="text-blue-300 text-xs font-bold uppercase tracking-widest">Fetching Admins...</p>
        </div>
    );

    // Sirf unhe filter karein jinki role admin hai
    const admins = filteredUsers?.filter(user => user.role === 'admin') || [];

    return (
        <div className="space-y-6 animate-in fade-in duration-300 text-left">
            <div>
                <h2 className="text-2xl font-black text-white uppercase tracking-tighter">System Admins</h2>
                <p className="text-gray-400/60 text-[10px] font-bold uppercase tracking-widest">Authorized administrators with service control permissions</p>
            </div>

            <div className="w-full overflow-hidden bg-[#061437] rounded-2xl border border-blue-900/20 shadow-2xl">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b border-blue-900/30 text-[10px] font-black uppercase tracking-widest text-gray-400 bg-[#000b21]/40">
                            <th className="p-4">Admin Name</th>
                            <th className="p-4">Username</th>
                            <th className="p-4">Email</th>
                            <th className="p-4">Contact</th>
                            <th className="p-4">Location</th>
                            <th className="p-4">Status</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-blue-900/10 text-sm">
                        {admins.length === 0 ? (
                            <tr>
                                <td colSpan="6" className="p-8 text-center text-gray-500 font-bold uppercase text-xs">
                                    No Administrators Found
                                </td>
                            </tr>
                        ) : (
                            admins.map((admin) => (
                                <tr key={admin._id} className="hover:bg-white/5 transition-colors">
                                    <td className="p-4 flex items-center gap-3 font-bold text-white">
                                        <div className="p-2 bg-blue-600/10 text-blue-400 rounded-lg"><Shield size={16}/></div>
                                        {admin.name}
                                    </td>
                                    <td className="p-4 text-gray-400 font-mono text-xs">@{admin.username || 'not_set'}</td>
                                    <td className="p-4 text-gray-300 text-xs">{admin.email}</td>
                                    <td className="p-4 text-gray-300 text-xs">{admin.phone || 'N/A'}</td>
                                    <td className="p-4 text-gray-400 text-xs">{admin.city || 'Gorakhpur'}</td>
                                    <td className="p-4">
                                        <span className="px-2.5 py-1 bg-green-500/10 text-green-400 border border-green-500/20 rounded-md text-[10px] font-black uppercase tracking-wider">Active</span>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllAdminsList;