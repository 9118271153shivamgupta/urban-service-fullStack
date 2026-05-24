import React, { useState } from 'react';
import { Loader2 } from 'lucide-react';
import UserFilterBar from './UserFilterBar';
import UserTableSheet from './UserTableSheet';
import { useUsers } from './useUsers';

const UserManagement = () => {
    const { 
        loading, filters, setFilters, currentPage, setCurrentPage, 
        currentRows, totalPages, filteredUsers, 
        handleDelete, handleUpdateUser 
    } = useUsers();

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
        <div className="h-full w-full flex flex-col items-center justify-center bg-[#000b21] min-h-[400px]">
            <Loader2 className="animate-spin text-blue-500 mb-4" size={50} />
            <p className="text-blue-300 font-bold animate-pulse uppercase tracking-widest text-xs">Loading Sheet...</p>
        </div>
    );

    return (
        <div className="space-y-5 bg-[#000b21]">
            
            {/* Header Area without Add Button */}
            <div className="bg-[#061437] p-5 rounded-2xl border border-blue-900/20 flex justify-between items-center">
                <div>
                    <h2 className="text-xl font-black text-white uppercase tracking-tighter">Master Sheet</h2>
                    <p className="text-blue-400/60 text-[10px] font-bold uppercase tracking-wide mt-0.5">Manage all system users</p>
                </div>
            </div>

            {/* Filters */}
            <UserFilterBar filters={filters} setFilters={setFilters} />

            {/* Table Sheet Wrapper */}
            <div className="w-full overflow-x-auto bg-[#061437] rounded-2xl border border-blue-900/20 shadow-2xl custom-scrollbar">
                <UserTableSheet 
                    currentRows={currentRows}
                    allUsers={filteredUsers}
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

            {/* Pagination Box */}
            <div className="flex justify-center items-center gap-4 pt-2">
                <button 
                    disabled={currentPage === 1} 
                    onClick={() => setCurrentPage(p => p - 1)} 
                    className="px-3 py-1.5 bg-[#061437] hover:bg-blue-600 text-white rounded-lg disabled:opacity-20 text-xs font-bold uppercase transition-all"
                >
                    Prev
                </button>
                <span className="text-blue-400 font-bold text-xs uppercase tracking-wider">Page {currentPage} of {totalPages}</span>
                <button 
                    disabled={currentPage >= totalPages} 
                    onClick={() => setCurrentPage(p => p + 1)} 
                    className="px-3 py-1.5 bg-[#061437] hover:bg-blue-600 text-white rounded-lg disabled:opacity-20 text-xs font-bold uppercase transition-all"
                >
                    Next
                </button>
            </div>
            
        </div>
    );
};

export default UserManagement;