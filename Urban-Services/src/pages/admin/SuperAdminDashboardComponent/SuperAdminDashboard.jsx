// src/pages/admin/admindashboardcomponent/SuperAdminDashboard.jsx
import React, { useState, useEffect } from 'react';
import DashboardSidebar from './SuperAdminDashboard/DashboardSidebar';
import DashboardHeader from './SuperAdminDashboard/DashboardHeader';
import AnalyticsHome from './AnalyticsHome';
import UserManagement from './user_Management/UserManagement';
import AllAdminsList from './user_Management/AllAdminsList';
import AllProvidersList from './Super_Admin_dashboard_provider/AllProvidersList';
import ServiceBookingList from './ServiceBookingList';
import AddAdminForm from './user_Management/AddAdminForm';
import AddProviderForm from './Super_Admin_dashboard_provider/AddProviderForm';
import FuturePlaceholder from './FuturePlaceholder';
import { useUsers } from './useUsers';

// अलग की गई फाइलों से सब-कॉम्पोनेंट्स इम्पोर्ट करें 🎯
import { AllTransactions, ProviderPayouts } from './sideBarComponents/PaymentsFinanceComponents';
import { CustomerReviews, ModerationFlags } from './sideBarComponents/ReviewsFeedbackComponents';
import { SalesReports, UserAnalytics } from './sideBarComponents/ReportsDataComponents';
import { AllServicesList, AddNewService } from './sideBarComponents/ServicesMasterComponents';
import { PaymentGatewaySettings, SmsOtpPanels } from './sideBarComponents/AppSettingsComponents';
import ManageServices from './sideBarComponents/add-services/ManageServices';


const SuperAdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [user, setUser] = useState(null);
  const [modalType, setModalType] = useState(null);

  const { fetchUsers } = useUsers();

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('user');
      if (storedUser) setUser(JSON.parse(storedUser));
    } catch (error) {
      console.error("Error parsing user data:", error);
    }
  }, []);

  return (
    <div className="flex h-screen w-screen bg-[#000b21] text-white font-['Poppins'] overflow-hidden relative isolate">
      
      {/* 🌟 FIX 1: Sidebar container layout mapping checks with absolute stacking order hierarchy protection */}
      <div className="relative z-[60] flex-shrink-0">
        <DashboardSidebar activeTab={activeTab} setActiveTab={setActiveTab} openModal={setModalType} />
      </div>

      <div className="flex-1 flex flex-col overflow-hidden relative z-10">
        
        {/* 🌟 FIX 2: Header module high index coverage layer to ensure profile dropdown always floats on top */}
        <div className="relative z-[50] w-full">
          <DashboardHeader user={user} />
        </div>

        {/* 🌟 FIX 3: Component main wrapper setup with safe semantic container context stacking hierarchy */}
        <main className="flex-1 overflow-hidden bg-[#000b21] relative z-0">
          <div className="h-full w-full overflow-y-auto p-6 custom-scrollbar relative z-10">
            
            {/* 1. Core Core Modules */}
            {activeTab === 'dashboard' && <AnalyticsHome />}
            {activeTab === 'user-management' && <UserManagement />}
            {activeTab === 'Admins' && <AllAdminsList />}
            {activeTab === 'Providers' && <AllProvidersList />}
            
            {/* 2. Services Booking Submenus */}
            {activeTab === 'bookings' && <ServiceBookingList filterStatus="all" />}
            {activeTab === 'bookings-accepted' && <ServiceBookingList filterStatus="accepted" />}
            {activeTab === 'bookings-rejected' && <ServiceBookingList filterStatus="rejected" />}
            
            {/* 3. Payments & Finance */}
            {activeTab === 'payment-transactions' && <AllTransactions />}
            {activeTab === 'payment-settlements' && <ProviderPayouts />}

            {/* 4. Reviews & Feedback */}
            {activeTab === 'reviews-customer' && <CustomerReviews />}
            {activeTab === 'reviews-moderation' && <ModerationFlags />}

            {/* 5. Reports & Data Analytics */}
            {activeTab === 'reports-sales' && <SalesReports />}
            {activeTab === 'reports-users' && <UserAnalytics />}

            {/* 6. Services Master Module */}
            {activeTab === 'services-master-all' && <AllServicesList />}
            {activeTab === 'services-master-add' && <ManageServices />}

            {/* 7. Standalone Features */}
            {activeTab === 'categories' && <FuturePlaceholder title="Categories Manager" subtitle="Create, edit and sync master global categories." />}
            {activeTab === 'city' && <FuturePlaceholder title="City Master Configurations" subtitle="Manage operational cities, zip code mappings and zones." />}

            {/* 8. Global Application Settings */}
            {activeTab === 'settings-gateway' && <PaymentGatewaySettings />}
            {activeTab === 'settings-sms' && <SmsOtpPanels />}

          </div>
        </main>
      </div>

      {/* GLOBAL MODALS (ADD ADMIN / ADD PROVIDER) */}
      {modalType && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/90 backdrop-blur-md" onClick={() => setModalType(null)}></div>
          <div className="relative z-[1000] w-full max-w-4xl bg-[#061437] rounded-[2.5rem] shadow-2xl border border-white/10 overflow-hidden">
            {modalType === 'admin' && <AddAdminForm onClose={() => setModalType(null)} refreshUsers={fetchUsers} />}
            {modalType === 'provider' && <AddProviderForm onClose={() => setModalType(null)} refreshUsers={fetchUsers} />}
          </div>
        </div>
      )}

    </div>
  );
};

export default SuperAdminDashboard;