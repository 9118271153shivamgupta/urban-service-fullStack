import React from 'react';
import { Edit3, Trash2, Check, X, Eye, EyeOff, FileSpreadsheet, Calendar } from 'lucide-react';
import * as XLSX from 'xlsx';

const UserTableSheet = ({ 
    currentRows, allUsers, editingId, editData, setEditData, 
    saveEdit, startEdit, setEditingId, handleDelete, 
    showPassword, setShowPassword 
}) => {

    const exportToExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(allUsers);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Users");
        XLSX.writeFile(workbook, "All_Users_Data.xlsx");
    };

    return (
        <div className="space-y-3">
            <div className="bg-[#061437] rounded-xl border border-blue-900/30 shadow-2xl overflow-hidden">
                <div className="max-h-[550px] overflow-auto custom-scrollbar">
                    <table className="w-full text-left border-collapse table-fixed min-w-[900px]">
                        <thead className="bg-[#000b21] text-blue-400 text-[9px] uppercase font-black sticky top-0 z-10">
                            <tr className="divide-x divide-blue-900/20">
                                <th className="p-2 w-56 border-b border-blue-900/30">User Info & Joining</th>
                                <th className="p-2 w-32 border-b border-blue-900/30">Phone</th>
                                <th className="p-2 w-32 border-b border-blue-900/30">City</th>
                                <th className="p-2 w-24 border-b border-blue-900/30 text-center">Role</th>
                                <th className="p-2 w-36 border-b border-blue-900/30">Password</th>
                                <th className="p-2 w-24 border-b border-blue-900/30 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-blue-900/10">
                            {currentRows.map((user) => (
                                <tr key={user._id} className={`divide-x divide-blue-900/10 hover:bg-blue-500/5 transition-all ${editingId === user._id ? 'bg-blue-600/10' : ''}`}>
                                    {/* User Info with Integrated Joining Date */}
                                    <td className="p-2">
                                        {editingId === user._id ? (
                                            <input className="w-full bg-[#000b21] border border-blue-500 p-1 text-[11px] text-white rounded outline-none" 
                                                value={editData.name} onChange={(e) => setEditData({...editData, name: e.target.value})} />
                                        ) : (
                                            <div className="flex flex-col gap-0.5">
                                                <div className="text-[11px] font-black text-white uppercase leading-tight truncate">{user.name}</div>
                                                <div className="flex items-center gap-2">
                                                    <span className="text-[9px] text-blue-400/40 truncate">{user.email}</span>
                                                    <span className="text-[8px] bg-blue-900/30 text-blue-300 px-1 rounded flex items-center gap-1 shrink-0">
                                                        <Calendar size={8} /> {new Date(user.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: '2-digit' })}
                                                    </span>
                                                </div>
                                            </div>
                                        )}
                                    </td>

                                    {/* Phone */}
                                    <td className="p-2 text-[10px] font-bold text-gray-400 font-mono">
                                        {editingId === user._id ? (
                                            <input className="w-full bg-[#000b21] border border-blue-500 p-1 text-[10px] text-white rounded outline-none" 
                                                value={editData.phone} onChange={(e) => setEditData({...editData, phone: e.target.value})} />
                                        ) : (user.phone || '-')}
                                    </td>

                                    {/* City */}
                                    <td className="p-2 text-[10px] font-bold text-blue-300/70 uppercase">
                                        {editingId === user._id ? (
                                            <input className="w-full bg-[#000b21] border border-blue-500 p-1 text-[10px] text-white rounded outline-none" 
                                                value={editData.city} onChange={(e) => setEditData({...editData, city: e.target.value})} />
                                        ) : (user.city || 'Lucknow')}
                                    </td>

                                    {/* Role Selection */}
                                    <td className="p-2 text-center">
                                        <select disabled={editingId !== user._id} value={editingId === user._id ? editData.role : user.role} 
                                            onChange={(e) => setEditData({...editData, role: e.target.value})}
                                            className="bg-transparent text-[9px] font-black uppercase outline-none text-blue-400 cursor-pointer disabled:cursor-default">
                                            <option value="customer">Cust</option>
                                            <option value="provider">Prov</option>
                                            <option value="admin">Adm</option>
                                            <option value="superadmin">S-Adm</option>
                                        </select>
                                    </td>

                                    {/* Password Field */}
                                    <td className="p-2">
                                        <div className="flex items-center justify-between gap-2 bg-[#000b21]/40 px-2 py-1 rounded border border-blue-900/20">
                                            <span className="text-[9px] font-mono text-blue-500/80 tracking-widest">
                                                {showPassword[user._id] ? user.password : '••••••'}
                                            </span>
                                            <button onClick={() => setShowPassword({...showPassword, [user._id]: !showPassword[user._id]})} className="text-gray-600 hover:text-white transition-colors">
                                                {showPassword[user._id] ? <EyeOff size={10} /> : <Eye size={10} />}
                                            </button>
                                        </div>
                                    </td>

                                    {/* Action Buttons */}
                                    <td className="p-2 text-center">
                                        <div className="flex justify-center gap-1.5">
                                            {editingId === user._id ? (
                                                <>
                                                    <button onClick={() => saveEdit(user._id)} className="p-1 bg-green-500/20 text-green-500 rounded hover:bg-green-500 hover:text-white transition-all"><Check size={12}/></button>
                                                    <button onClick={() => setEditingId(null)} className="p-1 bg-gray-500/20 text-gray-400 rounded hover:bg-gray-500 hover:text-white transition-all"><X size={12}/></button>
                                                </>
                                            ) : (
                                                <>
                                                    <button onClick={() => startEdit(user)} className="p-1 bg-blue-500/10 text-blue-400 rounded hover:bg-blue-600 hover:text-white transition-all"><Edit3 size={12}/></button>
                                                    <button onClick={() => handleDelete(user._id)} className="p-1 bg-red-500/10 text-red-400 rounded hover:bg-red-600 hover:text-white transition-all"><Trash2 size={12}/></button>
                                                </>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Export Section */}
            <div className="flex justify-end">
                <button onClick={exportToExcel} className="flex items-center gap-1.5 bg-green-600/90 hover:bg-green-600 text-white px-3 py-1.5 rounded-lg font-black text-[9px] uppercase transition-all shadow-lg active:scale-95 border border-green-500/30">
                    <FileSpreadsheet size={13} /> Export Excel
                </button>
            </div>
        </div>
    );
};

export default UserTableSheet;