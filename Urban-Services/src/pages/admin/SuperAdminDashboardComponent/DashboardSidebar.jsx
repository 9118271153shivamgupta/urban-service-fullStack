import React from 'react';
import { LayoutDashboard, Users, ClipboardList, Grid, MapPin } from 'lucide-react';

const DashboardSidebar = ({ activeTab, setActiveTab }) => {
  const menuItems = [
    { id: 'dashboard', name: 'Dashboard', icon: <LayoutDashboard size={20}/> },
    { id: 'user-management', name: 'User Management', icon: <Users size={20}/> },
    { id: 'Admins', name: 'All Admins', icon: <Users size={20}/> },
    { id: 'Providers', name: 'All Providers', icon: <Users size={20}/> },
    { id: 'bookings', name: 'Service Booking List', icon: <ClipboardList size={20}/> },
    { id: 'categories', name: 'Categories', icon: <Grid size={20}/> },
    { id: 'city', name: 'City Master', icon: <MapPin size={20}/> },
  ];

  return (
    <aside className="w-64 bg-[#061437] border-r border-blue-900/30 flex flex-col flex-none">
      {/* Brand Logo */}
      <div className="p-6 flex items-center gap-2">
        <div className="bg-pink-500 p-1.5 rounded-lg font-bold text-xl italic text-white">G</div>
        <span className="text-xl font-bold tracking-tight uppercase text-white whitespace-nowrap">Urban Control</span>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-4 mt-4 overflow-y-auto">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl mb-2 transition-all uppercase text-xs font-bold tracking-wider ${
              activeTab === item.id 
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' 
                : 'text-gray-400 hover:bg-blue-900/20 hover:text-white'
            }`}
          >
            {item.icon}
            <span>{item.name}</span>
          </button>
        ))}
      </nav>
    </aside>
  );
};

export default DashboardSidebar;