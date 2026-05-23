import React, { useState } from 'react';
import { Loader2, Plus, ChevronDown } from 'lucide-react';
import UserFilterBar from './UserFilterBar';
import UserTableSheet from './UserTableSheet';
import AddAdminForm from './AddAdminForm';
import AddProviderForm from './AddProviderForm';
import { useUsers } from './useUsers';

const UserManagement = () => {
    const { 
        loading, filters, setFilters, currentPage, setCurrentPage, 
        currentRows, totalPages, filteredUsers, 
        handleDelete, handleUpdateUser, fetchUsers 
    } = useUsers();

    const [showAddMenu, setShowAddMenu] = useState(false);
    const [modalType, setModalType] = useState(null);
    const [showPassword, setShowPassword] = useState({});
    const [editingId, setEditingId] = useState(null);
    const [editData, setEditData] = useState({});

    const startEdit = (user) => {
        setEditingId(user._id);
        setEditData({ name: user.name, phone: user.phone, city: user.city, role: user.role });
    };

    const saveEdit = async (id) => {
        await handleUpdateUser(id, editData);
        setEditingId(null);
    };

    if (loading) return (
        <div className="h-screen flex flex-col items-center justify-center bg-[#000b21]">
            <Loader2 className="animate-spin text-blue-500 mb-4" size={50} />
            <p className="text-blue-300 font-bold animate-pulse uppercase tracking-widest">Loading Sheet...</p>
        </div>
    );

    return (
        <div className="p-4 space-y-6 min-h-screen bg-[#000b21]">
            {/* Header with Add User Button */}
            <div className="flex justify-between items-center bg-[#061437] p-6 rounded-2xl border border-blue-900/20">
                <div>
                    <h2 className="text-2xl font-black text-white uppercase tracking-tighter">Master Sheet</h2>
                    <p className="text-blue-400/60 text-[10px] font-bold uppercase">Manage all system users</p>
                </div>
                <div className="relative">
                    <button onClick={() => setShowAddMenu(!showAddMenu)} className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-black flex items-center gap-2 transition-all uppercase text-xs">
                        <Plus size={18} /> Add User <ChevronDown size={14} />
                    </button>
                    {showAddMenu && (
                        <div className="absolute right-0 mt-3 w-48 bg-[#0a1a44] border border-blue-900/50 rounded-xl shadow-2xl z-[100]">
                            <button onClick={() => { setModalType('admin'); setShowAddMenu(false); }} className="w-full text-left p-4 text-[10px] font-black uppercase text-gray-200 hover:bg-blue-600">Add Admin</button>
                            <button onClick={() => { setModalType('provider'); setShowAddMenu(false); }} className="w-full text-left p-4 text-[10px] font-black uppercase text-gray-200 hover:bg-orange-600">Add Provider</button>
                        </div>
                    )}
                </div>
            </div>

            <UserFilterBar filters={filters} setFilters={setFilters} />

            {/* Table Component */}
            <div className="w-full overflow-x-auto bg-[#061437] rounded-2xl border border-blue-900/20 shadow-2xl custom-scrollbar">
                <UserTableSheet 
                currentRows={currentRows}
                allUsers={filteredUsers} // Full filtered data for export
                editingId={editingId}
                editData={editData}
                setEditData={setEditData}
                saveEdit={saveEdit}
                startEdit={startEdit}
                setEditingId={setEditingId}
                handleDelete={handleDelete}
                showPassword={showPassword}
                setShowPassword={setShowPassword}
                />

            </div>
            {/* Pagination Controls */}
            <div className="flex justify-center gap-4 mt-4">
                <button disabled={currentPage === 1} onClick={() => setCurrentPage(p => p - 1)} className="px-4 py-2 bg-blue-900/20 text-white rounded-lg disabled:opacity-30">Prev</button>
                <span className="text-blue-400 font-bold">Page {currentPage} of {totalPages}</span>
                <button disabled={currentPage >= totalPages} onClick={() => setCurrentPage(p => p + 1)} className="px-4 py-2 bg-blue-900/20 text-white rounded-lg disabled:opacity-30">Next</button>
            </div>

         
           {/* Modals for Add Admin/Provider */}
{modalType && (
    <div className="fixed inset-0 z-[999] flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-black/90 backdrop-blur-md" onClick={() => setModalType(null)}></div>
        <div className="relative z-[1000] w-full max-w-4xl bg-[#061437] rounded-[2.5rem] shadow-2xl border border-white/10 overflow-hidden">
            {modalType === 'admin' && <AddAdminForm onClose={() => setModalType(null)} refreshUsers={fetchUsers} />}
            {/* Provider form yahan add karein */}
            {modalType === 'provider' && <AddProviderForm onClose={() => setModalType(null)} refreshUsers={fetchUsers} />}
        </div>
    </div>
)}
        </div>
    );
};

export default UserManagement;