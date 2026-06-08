import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { X, Trash2 } from 'lucide-react';

const MainCategoryModal = ({ isOpen, onClose, baseUrl, activeServiceTypeId }) => {
    const [name, setName] = useState('');
    const [list, setList] = useState([]);

    const fetchCategories = async () => {
        try {
            const res = await axios.get(`${baseUrl}/api/master/main-categories`);
            // Sirf current selected Service Type se juda data filter karke list dikhayenge
            const filtered = res.data.filter(c => (c.serviceType?._id || c.serviceType) === activeServiceTypeId);
            setList(filtered);
        } catch (err) {
            console.error("Error fetching categories:", err);
        }
    };

    useEffect(() => { if (isOpen && activeServiceTypeId) fetchCategories(); }, [isOpen, activeServiceTypeId]);

    const handleAdd = async (e) => {
        e.preventDefault();
        if (!name.trim()) return;
        try {
            await axios.post(`${baseUrl}/api/master/main-categories`, {
                name: name.trim(),
                serviceTypeId: activeServiceTypeId
            });
            setName('');
            fetchCategories();
        } catch (err) {
            alert(err.response?.data?.message || "Error adding category");
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Delete this category? Linked sub-categories will drop reference!")) return;
        try {
            await axios.delete(`${baseUrl}/api/master/main-categories/${id}`);
            fetchCategories();
        } catch (err) {
            alert(err.response?.data?.message || "Error deleting category");
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-50 p-4 font-['Poppins']">
            <div className="bg-gray-800 border border-gray-700 p-6 rounded-2xl max-w-md w-full relative max-h-[85vh] flex flex-col">
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white"><X size={18} /></button>
                <h4 className="text-md font-black uppercase text-indigo-400 mb-1 tracking-wider">Main Categories</h4>
                <p className="text-[10px] text-gray-400 uppercase mb-4">Bound to currently active master configuration</p>
                
                <form onSubmit={handleAdd} className="flex gap-2 mb-4">
                    <input type="text" placeholder="e.g., Appliance Repair" className="flex-1 p-2.5 bg-gray-900 border border-gray-700 rounded-xl text-sm outline-none text-white focus:border-indigo-500" value={name} onChange={(e) => setName(e.target.value)} required />
                    <button type="submit" className="bg-indigo-600 px-4 rounded-xl text-xs font-bold uppercase hover:bg-indigo-700 transition">Add</button>
                </form>

                <div className="flex-1 overflow-y-auto space-y-2 pr-1 custom-scrollbar">
                    <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1">Categories in this Base</p>
                    {list.length === 0 ? <p className="text-xs text-gray-500 italic">No categories here.</p> : 
                        list.map(c => (
                            <div key={c._id} className="flex justify-between items-center p-2.5 bg-gray-900 border border-gray-750 rounded-xl">
                                <span className="text-sm font-medium">{c.name}</span>
                                <button onClick={() => handleDelete(c._id)} className="text-red-400 hover:text-red-500 p-1 transition"><Trash2 size={15} /></button>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    );
};

export default MainCategoryModal;