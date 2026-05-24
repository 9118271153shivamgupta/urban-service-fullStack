import React, { useState } from 'react';
import { 
  LayoutDashboard, Users, ClipboardList, Grid, MapPin, 
  ChevronDown, ChevronRight, UserPlus, ShieldAlert, HardHat,
  CheckCircle, XCircle, ListFilter, CreditCard, Star, 
  Settings, BellRing, BarChart3, ShieldCheck, Wallet, 
  MessageSquare, Sliders, Eye, ShieldCheck as ServiceIcon, PlusCircle, Wrench
} from 'lucide-react';

const DashboardSidebar = ({ activeTab, setActiveTab, openModal }) => {
  // सभी मेनू के इंडिपेंडेंट स्टेट्स ताकि एक खोलने पर दूसरा गड़बड़ न हो
  const [openUserSub, setOpenUserSub] = useState(false);
  const [openProviderSub, setOpenProviderSub] = useState(false);
  const [openBookingSub, setOpenBookingSub] = useState(false);
  const [openPaymentSub, setOpenPaymentSub] = useState(false);
  const [openReviewSub, setOpenReviewSub] = useState(false);
  const [openReportSub, setOpenReportSub] = useState(false);
  const [openServiceMasterSub, setOpenServiceMasterSub] = useState(false); // Fixed State
  const [openSettingsSub, setOpenSettingsSub] = useState(false);

  return (
    <aside className="w-64 bg-[#061437] border-r border-blue-900/30 flex flex-col flex-none select-none">
      {/* Brand Logo */}
      <div className="p-6 flex items-center gap-2">
        <div className="bg-pink-500 p-1.5 rounded-lg font-bold text-xl italic text-white">G</div>
        <span className="text-xl font-bold tracking-tight uppercase text-white whitespace-nowrap">Urban Control</span>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-4 mt-2 overflow-y-auto space-y-1 custom-scrollbar pb-10">
        
        {/* --- 1. DASHBOARD --- */}
        <button
          onClick={() => setActiveTab('dashboard')}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all uppercase text-xs font-bold tracking-wider ${
            activeTab === 'dashboard' 
              ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' 
              : 'text-gray-400 hover:bg-blue-900/20 hover:text-white'
          }`}
        >
          <LayoutDashboard size={18}/>
          <span>Dashboard</span>
        </button>

        {/* --- 2. USER MANAGEMENT --- */}
        <div>
          <button
            onClick={() => setOpenUserSub(!openUserSub)}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all uppercase text-xs font-bold tracking-wider ${
              activeTab === 'user-management' || activeTab === 'Admins' ? 'text-blue-400 bg-blue-900/10' : 'text-gray-400 hover:bg-blue-900/20 hover:text-white'
            }`}
          >
            <div className="flex items-center gap-3">
              <Users size={18}/>
              <span>User Management</span>
            </div>
            {openUserSub ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
          </button>

          {openUserSub && (
            <div className="pl-6 mt-1 space-y-1 animate-in fade-in slide-in-from-top-1 duration-200">
              <button onClick={() => setActiveTab('user-management')} className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-left text-[11px] font-bold uppercase tracking-wide ${activeTab === 'user-management' ? 'text-blue-500 bg-blue-500/5' : 'text-gray-400 hover:text-white'}`}>
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span> Master Sheet
              </button>
              <button onClick={() => setActiveTab('Admins')} className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-left text-[11px] font-bold uppercase tracking-wide ${activeTab === 'Admins' ? 'text-blue-500 bg-blue-500/5' : 'text-gray-400 hover:text-white'}`}>
                <ShieldAlert size={12} /> All Admins
              </button>
              <button onClick={() => openModal('admin')} className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-left text-[11px] font-bold uppercase tracking-wide text-gray-400 hover:text-green-400">
                <UserPlus size={12} /> Add Admin +
              </button>
            </div>
          )}
        </div>

        {/* --- 3. SERVICE PROVIDERS --- */}
        <div>
          <button
            onClick={() => setOpenProviderSub(!openProviderSub)}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all uppercase text-xs font-bold tracking-wider ${
              activeTab === 'Providers' ? 'text-orange-400 bg-orange-950/10' : 'text-gray-400 hover:bg-blue-900/20 hover:text-white'
            }`}
          >
            <div className="flex items-center gap-3">
              <HardHat size={18}/>
              <span>Service Providers</span>
            </div>
            {openProviderSub ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
          </button>

          {openProviderSub && (
            <div className="pl-6 mt-1 space-y-1 animate-in fade-in slide-in-from-top-1 duration-200">
              <button onClick={() => setActiveTab('Providers')} className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-left text-[11px] font-bold uppercase tracking-wide ${activeTab === 'Providers' ? 'text-orange-500 bg-orange-500/5' : 'text-gray-400 hover:text-white'}`}>
                <span className="w-1.5 h-1.5 rounded-full bg-orange-500"></span> All Providers
              </button>
              <button onClick={() => openModal('provider')} className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-left text-[11px] font-bold uppercase tracking-wide text-gray-400 hover:text-orange-400">
                <UserPlus size={12} /> Add Provider +
              </button>
            </div>
          )}
        </div>

        {/* --- 4. SERVICES BOOKING --- */}
        <div>
          <button
            onClick={() => setOpenBookingSub(!openBookingSub)}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all uppercase text-xs font-bold tracking-wider ${
              activeTab.includes('bookings') ? 'text-emerald-400 bg-emerald-950/10' : 'text-gray-400 hover:bg-blue-900/20 hover:text-white'
            }`}
          >
            <div className="flex items-center gap-3">
              <ClipboardList size={18}/>
              <span>Services Booking</span>
            </div>
            {openBookingSub ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
          </button>

          {openBookingSub && (
            <div className="pl-6 mt-1 space-y-1 animate-in fade-in slide-in-from-top-1 duration-200">
              <button onClick={() => setActiveTab('bookings')} className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-left text-[11px] font-bold uppercase tracking-wide ${activeTab === 'bookings' ? 'text-emerald-500 bg-emerald-500/5' : 'text-gray-400 hover:text-white'}`}>
                <ListFilter size={12} /> Booking List
              </button>
              <button onClick={() => setActiveTab('bookings-accepted')} className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-left text-[11px] font-bold uppercase tracking-wide ${activeTab === 'bookings-accepted' ? 'text-green-500 bg-green-500/5' : 'text-gray-400 hover:text-white'}`}>
                <CheckCircle size={12} className="text-green-500" /> Accepted Services
              </button>
              <button onClick={() => setActiveTab('bookings-rejected')} className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-left text-[11px] font-bold uppercase tracking-wide ${activeTab === 'bookings-rejected' ? 'text-red-500 bg-red-500/5' : 'text-gray-400 hover:text-white'}`}>
                <XCircle size={12} className="text-red-500" /> Rejected Services
              </button>
            </div>
          )}
        </div>

        {/* --- 5. PAYMENTS & FINANCE --- */}
        <div>
          <button
            onClick={() => setOpenPaymentSub(!openPaymentSub)}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all uppercase text-xs font-bold tracking-wider ${
              activeTab.includes('payment') ? 'text-yellow-400 bg-yellow-950/10' : 'text-gray-400 hover:bg-blue-900/20 hover:text-white'
            }`}
          >
            <div className="flex items-center gap-3">
              <CreditCard size={18}/>
              <span>Payments & Finance</span>
            </div>
            {openPaymentSub ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
          </button>

          {openPaymentSub && (
            <div className="pl-6 mt-1 space-y-1 animate-in fade-in slide-in-from-top-1 duration-200">
              <button onClick={() => setActiveTab('payment-transactions')} className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-left text-[11px] font-bold uppercase tracking-wide ${activeTab === 'payment-transactions' ? 'text-yellow-500 bg-yellow-500/5' : 'text-gray-400 hover:text-white'}`}>
                <Wallet size={12} /> All Transactions
              </button>
              <button onClick={() => setActiveTab('payment-settlements')} className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-left text-[11px] font-bold uppercase tracking-wide ${activeTab === 'payment-settlements' ? 'text-yellow-500 bg-yellow-500/5' : 'text-gray-400 hover:text-white'}`}>
                <ShieldCheck size={12} /> Provider Payouts
              </button>
            </div>
          )}
        </div>

        {/* --- 6. REVIEWS & RATINGS --- */}
        <div>
          <button
            onClick={() => setOpenReviewSub(!openReviewSub)}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all uppercase text-xs font-bold tracking-wider ${
              activeTab.includes('reviews') ? 'text-pink-400 bg-pink-950/10' : 'text-gray-400 hover:bg-blue-900/20 hover:text-white'
            }`}
          >
            <div className="flex items-center gap-3">
              <Star size={18}/>
              <span>Reviews & Feedback</span>
            </div>
            {openReviewSub ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
          </button>

          {openReviewSub && (
            <div className="pl-6 mt-1 space-y-1 animate-in fade-in slide-in-from-top-1 duration-200">
              <button onClick={() => setActiveTab('reviews-customer')} className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-left text-[11px] font-bold uppercase tracking-wide ${activeTab === 'reviews-customer' ? 'text-pink-500 bg-pink-500/5' : 'text-gray-400 hover:text-white'}`}>
                <MessageSquare size={12} /> Customer Reviews
              </button>
              <button onClick={() => setActiveTab('reviews-moderation')} className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-left text-[11px] font-bold uppercase tracking-wide ${activeTab === 'reviews-moderation' ? 'text-pink-500 bg-pink-500/5' : 'text-gray-400 hover:text-white'}`}>
                <Eye size={12} /> Moderation Flags
              </button>
            </div>
          )}
        </div>

        {/* --- 7. REPORTS & DATA --- */}
        <div>
          <button
            onClick={() => setOpenReportSub(!openReportSub)}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all uppercase text-xs font-bold tracking-wider ${
              activeTab.includes('reports') ? 'text-purple-400 bg-purple-950/10' : 'text-gray-400 hover:bg-blue-900/20 hover:text-white'
            }`}
          >
            <div className="flex items-center gap-3">
              <BarChart3 size={18}/>
              <span>Reports & Exports</span>
            </div>
            {openReportSub ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
          </button>

          {openReportSub && (
            <div className="pl-6 mt-1 space-y-1 animate-in fade-in slide-in-from-top-1 duration-200">
              <button onClick={() => setActiveTab('reports-sales')} className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-left text-[11px] font-bold uppercase tracking-wide ${activeTab === 'reports-sales' ? 'text-purple-500 bg-purple-500/5' : 'text-gray-400 hover:text-white'}`}>
                <span className="w-1 h-1 bg-purple-500 rounded-full"></span> Sales Reports
              </button>
              <button onClick={() => setActiveTab('reports-users')} className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-left text-[11px] font-bold uppercase tracking-wide ${activeTab === 'reports-users' ? 'text-purple-500 bg-purple-500/5' : 'text-gray-400 hover:text-white'}`}>
                <span className="w-1 h-1 bg-purple-500 rounded-full"></span> User Analytics
              </button>
            </div>
          )}
        </div>

        {/* --- 8. SERVICES MASTER (FIXED LABELS & STATES) 🎯 --- */}
        <div>
          <button
            onClick={() => setOpenServiceMasterSub(!openServiceMasterSub)}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all uppercase text-xs font-bold tracking-wider ${
              activeTab.includes('services-master') ? 'text-indigo-400 bg-indigo-950/10' : 'text-gray-400 hover:bg-blue-900/20 hover:text-white'
            }`}
          >
            <div className="flex items-center gap-3">
              <Wrench size={18}/>
              <span>Services Master</span>
            </div>
            {openServiceMasterSub ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
          </button>

          {openServiceMasterSub && (
            <div className="pl-6 mt-1 space-y-1 animate-in fade-in slide-in-from-top-1 duration-200">
              <button onClick={() => setActiveTab('services-master-all')} className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-left text-[11px] font-bold uppercase tracking-wide ${activeTab === 'services-master-all' ? 'text-indigo-500 bg-indigo-500/5' : 'text-gray-400 hover:text-white'}`}>
                <span className="w-1 h-1 bg-indigo-500 rounded-full"></span> All Services List
              </button>
              <button onClick={() => setActiveTab('services-master-add')} className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-left text-[11px] font-bold uppercase tracking-wide ${activeTab === 'services-master-add' ? 'text-indigo-500 bg-indigo-500/5' : 'text-gray-400 hover:text-white'}`}>
                <PlusCircle size={12} /> Add New Service
              </button>
            </div>
          )}
        </div>

        {/* --- 9. CATEGORIES --- */}
        <button
          onClick={() => setActiveTab('categories')}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all uppercase text-xs font-bold tracking-wider ${
            activeTab === 'categories' ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' : 'text-gray-400 hover:bg-blue-900/20 hover:text-white'
          }`}
        >
          <Grid size={18}/>
          <span>Categories</span>
        </button>

        {/* --- 10. CITY MASTER --- */}
        <button
          onClick={() => setActiveTab('city')}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all uppercase text-xs font-bold tracking-wider ${
            activeTab === 'city' ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' : 'text-gray-400 hover:bg-blue-900/20 hover:text-white'
          }`}
        >
          <MapPin size={18}/>
          <span>City Master</span>
        </button>

        {/* --- 11. GLOBAL SETTINGS --- */}
        <div>
          <button
            onClick={() => setOpenSettingsSub(!openSettingsSub)}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all uppercase text-xs font-bold tracking-wider ${
              activeTab.includes('settings') ? 'text-cyan-400 bg-cyan-950/10' : 'text-gray-400 hover:bg-blue-900/20 hover:text-white'
            }`}
          >
            <div className="flex items-center gap-3">
              <Settings size={18}/>
              <span>App Settings</span>
            </div>
            {openSettingsSub ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
          </button>

          {openSettingsSub && (
            <div className="pl-6 mt-1 space-y-1 animate-in fade-in slide-in-from-top-1 duration-200">
              <button onClick={() => setActiveTab('settings-gateway')} className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-left text-[11px] font-bold uppercase tracking-wide ${activeTab === 'settings-gateway' ? 'text-cyan-500 bg-cyan-500/5' : 'text-gray-400 hover:text-white'}`}>
                <Sliders size={12} /> Payment Gateway
              </button>
              <button onClick={() => setActiveTab('settings-sms')} className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-left text-[11px] font-bold uppercase tracking-wide ${activeTab === 'settings-sms' ? 'text-cyan-500 bg-cyan-500/5' : 'text-gray-400 hover:text-white'}`}>
                <BellRing size={12} /> SMS/OTP Panels
              </button>
            </div>
          )}
        </div>

      </nav>
    </aside>
  );
};

export default DashboardSidebar;
