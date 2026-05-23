import { useState, useEffect } from 'react';
import axios from 'axios';

export const useUsers = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    // City filter add kiya gaya hai
    const [filters, setFilters] = useState({ name: '', phone: '', role: '', month: '', year: '', city: '' });
    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 10;

    useEffect(() => { fetchUsers(); }, []);

    const fetchUsers = async () => {
        try {
            const token = localStorage.getItem('token');
            const res = await axios.get('http://localhost:5000/api/admin/all-users', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setUsers(res.data);
            setLoading(false);
        } catch (err) {
            console.error("Fetch failed", err);
            setLoading(false);
        }
    };

    // Naya function: Data update karne ke liye
    const handleUpdateUser = async (userId, updatedData) => {
        try {
            const token = localStorage.getItem('token');
            await axios.put(`http://localhost:5000/api/admin/update-user/${userId}`, updatedData, {
                headers: { Authorization: `Bearer ${token}` }
            });
            fetchUsers(); // Data refresh karein
        } catch (err) {
            alert("Update failed: " + (err.response?.data?.message || "Server Error"));
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure? This cannot be undone.")) return;
        try {
            const token = localStorage.getItem('token');
            await axios.delete(`http://localhost:5000/api/admin/delete-user/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            fetchUsers();
        } catch (err) { alert("Delete failed"); }
    };

    const filteredUsers = users.filter(user => {
        const date = new Date(user.createdAt);
        return (
            (user.name?.toLowerCase().includes(filters.name.toLowerCase() || '')) &&
            (user.phone?.includes(filters.phone || '')) &&
            (user.city?.toLowerCase().includes(filters.city.toLowerCase() || '')) && // City filter logic
            (filters.role === '' || user.role === filters.role) &&
            (filters.month === '' || (date.getMonth() + 1).toString() === filters.month) &&
            (filters.year === '' || date.getFullYear().toString() === filters.year)
        );
    });

    const totalPages = Math.ceil(filteredUsers.length / rowsPerPage);
    const currentRows = filteredUsers.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

    return {
        loading, filters, setFilters, currentPage, setCurrentPage,
        currentRows, totalPages, filteredUsers, 
        handleDelete, handleUpdateUser, fetchUsers
    };
};