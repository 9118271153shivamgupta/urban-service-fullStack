import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
    const [bookings, setBookings] = useState([]);
    const user = JSON.parse(localStorage.getItem('user'));

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/api/bookings/user/${user.id}`);
                setBookings(res.data);
            } catch (err) {
                console.log("Error fetching bookings");
            }
        };
        if(user) fetchBookings();
    }, []);

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h2 className="text-2xl font-bold mb-6">My Bookings</h2>
            <div className="grid gap-4">
                {bookings.length > 0 ? bookings.map((b) => (
                    <div key={b._id} className="p-4 border rounded-lg shadow-sm bg-white flex justify-between items-center">
                        <div>
                            <h3 className="font-bold text-lg">{b.serviceName}</h3>
                            <p className="text-gray-600">Date: {b.date}</p>
                            <p className="text-sm text-blue-600 font-semibold">Status: {b.status}</p>
                        </div>
                        <div className="text-right text-gray-500">
                             <p>{b.address}</p>
                        </div>
                    </div>
                )) : <p>No bookings found.</p>}
            </div>
        </div>
    );
};

export default Dashboard;