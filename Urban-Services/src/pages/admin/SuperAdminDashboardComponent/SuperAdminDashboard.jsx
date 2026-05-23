import React, { useState, useEffect } from 'react';
import DashboardSidebar from './DashboardSidebar';
import DashboardHeader from './DashboardHeader';
import AnalyticsHome from './AnalyticsHome';
import UserManagement from './UserManagement';
import AddAdminForm from './AddAdminForm';
// Naye components import karein
import AllAdminsList from './AllAdminsList';
import AllProvidersList from './AllProvidersList';
import ServicesBookingList from './ServiceBookingList';

const SuperAdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [user, setUser] = useState(null);

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('user');
      if (storedUser) setUser(JSON.parse(storedUser));
    } catch (error) {
      console.error("Error parsing user data:", error);
    }
  }, []);

  return (
    <div className="flex h-screen w-screen bg-[#000b21] text-white font-['Poppins'] overflow-hidden">
      <DashboardSidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader user={user} />

        <main className="flex-1 overflow-hidden bg-[#000b21]">
          <div className="h-full w-full overflow-y-auto p-6 custom-scrollbar">
            {activeTab === 'dashboard' && <AnalyticsHome />}
            {activeTab === 'user-management' && <UserManagement />}
            
            {/* placeholders ko badal kar dynamic components lagayein */}
            {activeTab === 'Admins' && <AllAdminsList />}
            {activeTab === 'Providers' && <AllProvidersList />}
            {activeTab === 'Booking' && <ServicesBookingList />}
            
            {activeTab === 'categories' && <h1 className="text-xl font-bold">Categories Component Coming Soon...</h1>}
            {activeTab === 'city' && <h1 className="text-xl font-bold">City Master Component Coming Soon...</h1>}
          </div>
        </main>
      </div>
    </div>
  );
};

export default SuperAdminDashboard;




// import React, { useState } from 'react';
// import { 
//   LayoutDashboard, Users, ClipboardList, Grid, MapPin, 
//   Settings, LogOut, Bell, Search, PlusCircle 
// } from 'lucide-react';

// // Components Import
// import AnalyticsHome from './AnalyticsHome';
// import UserManagement from './UserManagement';
// import AddAdminForm from './AddAdminForm';
// // import ServiceBookingList from './SuperAdminDashboardComponent/ServiceBookingList';

// const SuperAdminDashboard = () => {
//   const [activeTab, setActiveTab] = useState('dashboard');
//   const user = JSON.parse(localStorage.getItem('user'));

//   const menuItems = [
//     { id: 'dashboard', name: 'Dashbaord', icon: <LayoutDashboard size={20}/> },
//     { id: 'user-management', name: 'User Management', icon: <Users size={20}/> },
//     { id: 'Admins', name: 'All Admins', icon: <Users size={20}/> },
//     { id: 'Providers', name: 'All Providers', icon: <Users size={20}/> },
//     { id: 'bookings', name: 'Service Booking List', icon: <ClipboardList size={20}/> },
//     { id: 'categories', name: 'Categories', icon: <Grid size={20}/> },
//     { id: 'city', name: 'City Master', icon: <MapPin size={20}/> },
//   ];

//   return (
//     <div className="flex min-h-screen bg-[#000b21] text-white font-['Poppins']">
      
//       {/* --- SIDEBAR --- */}
//       <aside className="w-64 bg-[#061437] border-r border-blue-900/30 flex flex-col">
//         <div className="p-6 flex items-center gap-2">
//           <div className="bg-pink-500 p-1.5 rounded-lg font-bold text-xl italic text-white">G</div>
//           <span className="text-2xl font-bold tracking-tight uppercase">Urban Control pannal</span>
//         </div>

//         <nav className="flex-1 px-4 mt-4">
//           {menuItems.map((item) => (
//             <button
//               key={item.id}
//               onClick={() => setActiveTab(item.id)}
//               className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl mb-2 transition-all ${
//                 activeTab === item.id 
//                 ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' 
//                 : 'text-gray-400 hover:bg-blue-900/20 hover:text-white'
//               }`}
//             >
//               {item.icon}
//               <span className="font-medium text-sm">{item.name}</span>
//             </button>
//           ))}
//         </nav>
//       </aside>

//       {/* --- MAIN CONTENT AREA --- */}
//       <main className="flex-1 flex flex-col">
        
//         {/* TOP HEADER */}
//         <header className="h-20 bg-[#061437]/50 backdrop-blur-md border-b border-blue-900/20 flex items-center justify-between px-8">
//           <div className="relative w-96">
//             <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
//             <input 
//               type="text" 
//               placeholder="Search requests..." 
//               className="w-full bg-[#000b21] border border-blue-900/30 rounded-lg py-2 pl-10 pr-4 focus:outline-none focus:border-blue-500 transition-all text-sm"
//             />
//           </div>

//           <div className="flex items-center gap-6">
//             {/* <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-bold shadow-lg transition-all">
//               <PlusCircle size={18} /> Add Service
//             </button> */}
//             <div className="relative cursor-pointer">
//               <Bell size={22} className="text-gray-400" />
//               <span className="absolute -top-1 -right-1 bg-red-500 text-[10px] w-4 h-4 flex items-center justify-center rounded-full border-2 border-[#061437]">3</span>
//             </div>
//             <div className="flex items-center gap-3 border-l border-blue-900/30 pl-6">
//               <div className="text-right">
//                 <p className="text-sm font-bold leading-tight">Admin</p>
//                 <p className="text-[10px] text-gray-500 capitalize">{user?.role}</p>
//               </div>
//               <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center font-bold text-lg shadow-lg">AD</div>
//             </div>
//           </div>
//         </header>

//         {/* DYNAMIC COMPONENT SECTION */}
//         <div className="p-8 bg-[#000b21] flex-1 overflow-hidden">
//           {activeTab === 'dashboard' && <AnalyticsHome />}
//           {activeTab === 'user-management' && <UserManagement />}
//           {/* {activeTab === 'user-management' && <UserManagement />} */}
//           {activeTab === 'all Admins' && <AddAdminForm />}
//           {activeTab === 'bookings' && <ServiceBookingList />}
//           {activeTab === 'categories' && <h1 className="text-2xl">Categories Component Coming Soon...</h1>}
//           {/* Aap aise hi baaki tabs ke components add kar sakte hain */}
//         </div>

//       </main>
//     </div>
//   );
// };

// export default SuperAdminDashboard;