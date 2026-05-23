import React, { useState } from 'react';
import { Search, Bell, User, ShieldCheck, LogOut } from 'lucide-react';

const DashboardHeader = ({ user }) => {
  // Dropdown को शो/हाइड करने के लिए स्टेट
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // लॉगआउट हैंडलर
  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    window.location.href = '/login'; // या जो भी आपका लॉगिन राउट हो
  };

  return (
    <header className="h-20 bg-[#061437]/50 backdrop-blur-md border-b border-blue-900/20 flex items-center justify-between px-8 flex-none relative">
      
      {/* 1. SEARCH BAR */}
      <div className="relative w-96">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
        <input 
          type="text" 
          placeholder="Search requests..." 
          className="w-full bg-[#000b21] border border-blue-900/30 rounded-lg py-2 pl-10 pr-4 focus:outline-none focus:border-blue-500 transition-all text-sm text-white"
        />
      </div>

      {/* RIGHT ACTIONS */}
      <div className="flex items-center gap-6">
        
        {/* 2. NOTIFICATIONS */}
        <div className="relative cursor-pointer">
          <Bell size={22} className="text-gray-400 hover:text-white transition-colors" />
          <span className="absolute -top-1 -right-1 bg-red-500 text-[10px] w-4 h-4 flex items-center justify-center rounded-full border-2 border-[#061437] font-bold">3</span>
        </div>
        
        {/* 3. USER PROFILE WITH DROPDOWN (Hover Trigger) */}
        <div 
          className="relative flex items-center gap-3 border-l border-blue-900/30 pl-6 py-4 cursor-pointer group"
          onMouseEnter={() => setIsDropdownOpen(true)}
          onMouseLeave={() => setIsDropdownOpen(false)}
        >
          <div className="text-right">
            <p className="text-sm font-bold leading-tight text-white group-hover:text-blue-400 transition-colors">Admin</p>
            <p className="text-[10px] text-gray-500 capitalize font-medium">{user?.role || 'Super Admin'}</p>
          </div>
          
          {/* Avatar Icon */}
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center font-black text-sm shadow-lg text-white group-hover:bg-blue-700 transition-all">
            AD
          </div>

          {/* --- DROPDOWN MENU (Image Layout) --- */}
          {isDropdownOpen && (
            <div className="absolute right-0 top-[68px] w-72 bg-[#061437] border border-blue-900/40 rounded-2xl shadow-2xl z-[999] py-3 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
              
              {/* Header: Welcome & Email */}
              <div className="px-5 py-3 border-b border-blue-900/20">
                <p className="text-xs text-gray-400/80 font-medium">Welcome!</p>
                <p className="text-sm font-bold text-white truncate mt-0.5">{user?.email || 'superadmin@gmail.com'}</p>
              </div>

              {/* Menu Links */}
              <div className="p-2 space-y-1">
                
                {/* My Profile Button */}
                <button 
                  onClick={() => console.log('Profile Clicked')} 
                  className="w-full flex items-center gap-3 px-4 py-3 text-gray-300 hover:text-white hover:bg-blue-900/20 rounded-xl transition-all text-left text-sm font-medium"
                >
                  <User size={18} className="text-gray-400" />
                  <span>My Profile</span>
                </button>

                {/* Super Admin Panel Status */}
                <div className="w-full flex items-center gap-3 px-4 py-3 text-red-500 bg-red-500/5 border border-red-500/10 rounded-xl text-left text-sm font-bold">
                  <ShieldCheck size={18} className="text-red-500" />
                  <span>Super Admin Panel</span>
                </div>

                <hr className="border-blue-900/20 my-1 mx-2" />

                {/* Logout Button */}
                <button 
                  onClick={handleLogout} 
                  className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:text-red-500 hover:bg-red-500/10 rounded-xl transition-all text-left text-sm font-bold"
                >
                  <LogOut size={18} />
                  <span>Logout</span>
                </button>

              </div>

            </div>
          )}

        </div>

      </div>
    </header>
  );
};

export default DashboardHeader;

