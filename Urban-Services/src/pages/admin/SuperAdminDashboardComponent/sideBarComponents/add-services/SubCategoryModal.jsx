// src/pages/admin/admindashboardcomponent/SubCategoryModal.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { X, Trash2 } from 'lucide-react';

const SubCategoryModal = ({ isOpen, onClose, baseUrl, activeCategoryId }) => {
    const [name, setName] = useState('');
    const [list, setList] = useState([]);

    const fetchSubCategories = async () => {
        try {
            const res = await axios.get(`${baseUrl}/api/master/sub-categories`);
            
            // 🌟 SAFE FILTERING: Optional chaining lagayi hai taaki agar mainCategory null ho to crash na ho
            const filtered = (Array.isArray(res.data) ? res.data : []).filter(s => {
                if (!s.mainCategory) return false;
                
                // Agar mainCategory poora object hai to id nikalega, nahi to direct string match karega
                const targetId = typeof s.mainCategory === 'object' ? s.mainCategory._id : s.mainCategory;
                return String(targetId) === String(activeCategoryId);
            });
            
            setList(filtered);
        } catch (err) {
            console.error("Error fetching sub-categories:", err);
        }
    };

    useEffect(() => { 
        if (isOpen && activeCategoryId) {
            fetchSubCategories(); 
        } 
    }, [isOpen, activeCategoryId]);

    const handleAdd = async (e) => {
        e.preventDefault();
        if (!name.trim()) return;
        try {
            // 🌟 DOUBLE BULLETPROOF PAYLOAD: mainCategory aur mainCategoryId dono bhej rahe hain 
            // taaki aapka backend jo bhi demand kare, use match mil jaye!
            await axios.post(`${baseUrl}/api/master/sub-categories`, {
                name: name.trim(),
                mainCategory: activeCategoryId,   // Mongoose standard schema key
                mainCategoryId: activeCategoryId // Fallback legacy key
            });
            
            setName('');
            fetchSubCategories(); // Reload current matrix lists
        } catch (err) {
            console.error("Error payload reference dropping:", err);
            alert(err.response?.data?.message || "Error adding sub category");
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this specific mapping?")) return;
        try {
            await axios.delete(`${baseUrl}/api/master/sub-categories/${id}`);
            fetchSubCategories();
        } catch (err) {
            alert(err.response?.data?.message || "Error deleting sub category");
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-50 p-4 font-['Poppins']">
            <div className="bg-gray-800 border border-gray-700 p-6 rounded-2xl max-w-md w-full relative max-h-[85vh] flex flex-col">
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white"><X size={18} /></button>
                <h4 className="text-md font-black uppercase text-emerald-400 mb-1 tracking-wider">Sub Category Mapping</h4>
                <p className="text-[10px] text-gray-400 uppercase mb-4">Bound to currently active main category spec</p>
                
                <form onSubmit={handleAdd} className="flex gap-2 mb-4">
                    <input 
                        type="text" 
                        placeholder="e.g., AC Repair Deep Clean" 
                        className="flex-1 p-2.5 bg-gray-900 border border-gray-700 rounded-xl text-sm outline-none text-white focus:border-emerald-500" 
                        value={name} 
                        onChange={(e) => setName(e.target.value)} 
                        required 
                    />
                    <button type="submit" className="bg-emerald-600 px-4 rounded-xl text-xs font-bold uppercase hover:bg-emerald-700 transition">Add</button>
                </form>

                <div className="flex-1 overflow-y-auto space-y-2 pr-1 custom-scrollbar">
                    <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1">Mapped Final Terminals</p>
                    {list.length === 0 ? (
                        <p className="text-xs text-gray-500 italic">No sub categories under this category.</p>
                    ) : (
                        list.map(s => (
                            <div key={s._id} className="flex justify-between items-center p-2.5 bg-gray-900 border border-gray-750 rounded-xl">
                                <span className="text-sm font-medium text-white">{s.name}</span>
                                <button onClick={() => handleDelete(s._id)} className="text-red-400 hover:text-red-500 p-1 transition">
                                    <Trash2 size={15} />
                                </button>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default SubCategoryModal;