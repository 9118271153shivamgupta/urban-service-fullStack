import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  LayoutDashboard, Users, FileText, Grid, Settings, 
  LogOut, ChevronRight, Globe, MapPin, Hash 
} from 'lucide-react';

const NavItem = ({ icon, label, active = false, hasSub = false, subItems = [] }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="w-full">
            <div 
                onClick={() => hasSub && setIsOpen(!isOpen)}
                className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-all ${
                    active 
                    ? 'bg-blue-600/20 text-blue-400' 
                    : 'text-gray-400 hover:bg-blue-900/20 hover:text-gray-200'
                }`}
            >
                <div className="flex items-center gap-3">
                    {icon}
                    <span className="text-sm font-medium">{label}</span>
                </div>
                {hasSub && (
                    <ChevronRight 
                        size={14} 
                        className={`transition-transform duration-300 ${isOpen ? 'rotate-90' : ''}`} 
                    />
                )}
            </div>

            {hasSub && isOpen && (
                <div className="ml-9 mt-1 flex flex-col gap-1 border-l border-blue-900/30 pl-2 animate-in slide-in-from-top-1 duration-200">
                    {subItems.map((item, index) => (
                        <Link 
                            key={index}
                            to={item.path}
                            className="text-xs py-2 px-3 text-gray-500 hover:text-blue-400 hover:bg-blue-900/10 rounded-md transition-colors"
                        >
                            {item.name}
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
};

const Sidebar = () => {
    return (
        <aside className="hidden lg:flex flex-col w-64 bg-[#061437] border-r border-blue-900/30">
            <div className="p-6 flex items-center gap-2">
                <div className="w-8 h-8 bg-pink-500 rounded rotate-45 flex items-center justify-center">
                    <Grid size={18} className="-rotate-45 text-white" />
                </div>
                <span className="text-xl font-bold tracking-wider text-white">GALAXY</span>
            </div>

            <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto custom-scrollbar">
                <NavItem icon={<LayoutDashboard size={20}/>} label="User Management" active />
                <NavItem icon={<Users size={20}/>} label="Service Booking List" />
                
                <NavItem icon={<FileText size={20}/>} label="Categories" hasSub 
                    subItems={[
                        { name: "Add Category", path: "/admin/add-category" },
                        { name: "View Categories", path: "/admin/categories" }
                    ]} 
                />

                <NavItem icon={<Grid size={20}/>} label="Service Master" hasSub 
                    subItems={[
                        { name: "Add New Service", path: "/admin/add-service" },
                        { name: "Service List", path: "/admin/services" }
                    ]} 
                />

                <NavItem icon={<MapPin size={20}/>} label="City Master" hasSub 
                    subItems={[
                        { name: "Add City", path: "/admin/add-city" },
                        { name: "City List", path: "/admin/cities" }
                    ]} 
                />

                <NavItem icon={<Globe size={20}/>} label="State Master" hasSub 
                    subItems={[
                        { name: "Add State", path: "/admin/add-state" },
                        { name: "State List", path: "/admin/states" }
                    ]} 
                />

                <NavItem icon={<Hash size={20}/>} label="Pincode Master" hasSub 
                    subItems={[
                        { name: "Add Pincode", path: "/admin/add-pincode" },
                        { name: "Pincode List", path: "/admin/pincodes" }
                    ]} 
                />
                <NavItem icon={<Hash size={20}/>} label="All Services" hasSub 
                     
                />
            </nav>

            <div className="p-4 border-t border-blue-900/30">
                <button className="flex items-center gap-3 text-gray-400 hover:text-red-400 transition-colors w-full p-2">
                    <LogOut size={20} /> <span>Logout</span>
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;