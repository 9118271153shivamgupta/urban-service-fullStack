// src/pages/admin/admindashboardcomponent/DashboardSidebar.jsx
import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { sidebarMenuData } from '../sidebarMenuData';

const DashboardSidebar = ({ activeTab, setActiveTab, openModal }) => {
  // सभी सब-मेनू की स्टेट्स को एक सिंगल ऑब्जेक्ट में कम्बाइन कर दिया
  const [subStates, setSubStates] = useState({
    openUserSub: false,
    openProviderSub: false,
    openBookingSub: false,
    openPaymentSub: false,
    openReviewSub: false,
    openReportSub: false,
    openServiceMasterSub: false,
    openSettingsSub: false,
  });

  const toggleSub = (key) => {
    setSubStates(prev => ({ ...prev, [key]: !prev[key] }));
  };

  // एक्टिव टैब के आधार पर सब-मेनू को ऑटोमैटिक ओपन करना
  useEffect(() => {
    const updatedStates = { ...subStates };
    sidebarMenuData.forEach(menu => {
      if (menu.type === 'parent' && menu.matchKeywords.some(keyword => activeTab.includes(keyword) || activeTab === 'Admins')) {
        updatedStates[menu.stateKey] = true;
      }
    });
    setSubStates(updatedStates);
  }, [activeTab]);

  return (
    <aside className="w-64 bg-[#061437] border-r border-blue-900/30 flex flex-col flex-none select-none font-['Poppins'] text-left">
      {/* Brand Logo */}
      <div className="p-6 flex items-center gap-2">
        <div className="bg-pink-500 p-1.5 rounded-lg font-bold text-xl italic text-white flex items-center justify-center w-8 h-8">G</div>
        <span className="text-xl font-bold tracking-tight uppercase text-white whitespace-nowrap">Urban Control</span>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-4 mt-2 overflow-y-auto space-y-1 custom-scrollbar pb-10">
        {sidebarMenuData.map((menu) => {
          const IconComponent = menu.icon;

          // TYPE 1: SINGLE LINK (जिसमें कोई सब-मेनू नहीं है)
          if (menu.type === 'single') {
            const isActive = activeTab === menu.id;
            return (
              <button
                key={menu.id}
                onClick={() => setActiveTab(menu.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all uppercase text-xs font-bold tracking-wider ${
                  isActive 
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' 
                    : 'text-gray-400 hover:bg-blue-900/20 hover:text-white'
                }`}
              >
                <IconComponent size={18} />
                <span>{menu.title}</span>
              </button>
            );
          }

          // TYPE 2: PARENT MENU WITH SUB-MENUS
          const isParentActive = menu.matchKeywords.some(key => activeTab.includes(key) || activeTab === 'Admins');
          const isExpanded = subStates[menu.stateKey];

          return (
            <div key={menu.id}>
              <button
                onClick={() => toggleSub(menu.stateKey)}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all uppercase text-xs font-bold tracking-wider ${
                  isParentActive ? 'text-blue-400 bg-blue-900/10' : 'text-gray-400 hover:bg-blue-900/20 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <IconComponent size={18} />
                  <span>{menu.title}</span>
                </div>
                {isExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
              </button>

              {/* Sub Menu Links Rendering */}
              {isExpanded && (
                <div className="pl-6 mt-1 space-y-1 animate-in fade-in slide-in-from-top-1 duration-200">
                  {menu.subMenus.map((sub) => {
                    const SubIcon = sub.icon;
                    const isSubActive = activeTab === sub.id;

                    if (sub.type === 'modal') {
                      return (
                        <button
                          key={sub.id}
                          onClick={() => openModal(sub.id)}
                          className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-left text-[11px] font-bold uppercase tracking-wide text-gray-400 ${sub.hoverClass || 'hover:text-white'}`}
                        >
                          {SubIcon ? <SubIcon size={12} /> : <span className="w-1.5 h-1.5 rounded-full bg-gray-500"></span>}
                          {sub.title}
                        </button>
                      );
                    }

                    return (
                      <button
                        key={sub.id}
                        onClick={() => setActiveTab(sub.id)}
                        className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-left text-[11px] font-bold uppercase tracking-wide transition-colors ${
                          isSubActive 
                            ? `${sub.activeColor || 'text-blue-500'} bg-blue-500/5 font-black` 
                            : 'text-gray-400 hover:text-white'
                        }`}
                      >
                        {sub.dotColor && <span className={`w-1.5 h-1.5 rounded-full ${sub.dotColor}`}></span>}
                        {SubIcon && <SubIcon size={12} className={isSubActive ? sub.activeColor || "text-blue-500" : "text-gray-500"} />}
                        <span>{sub.title}</span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </nav>
    </aside>
  );
};

export default DashboardSidebar;