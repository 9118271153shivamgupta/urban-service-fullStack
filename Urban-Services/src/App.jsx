import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './components/AboutSection.jsx/About';

import MainServices from './pages/MainServices';
import Services_Page_Details from './components/Main_Services_Page/Services_Page_Details';
import ServicesPage from './components/homesection/home_Service_Section/ServicesPage';
import Home_Services_Page_Details from './components/homesection/home_Service_Section/Home_Services_Page_Details';
import ScrollToTop from './components/ScrollToTop';
import ContactUs from './pages/ContactUs';
import Login from './components/Login';
import Register from './components/Register';
import ProtectedRoute from './components/utils/ProtectedRoute';
import BookingForm from './components/BookingForm';
import ForgotPassword from './components/ForgotPassword';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminRoute from './components/utils/AdminRoute';
import SuperAdminDashboard from './pages/admin/SuperAdminDashboardComponent/SuperAdminDashboard';
import ManageServices from './pages/admin/SuperAdminDashboardComponent/sideBarComponents/add-services/ManageServices';
import Provider_services_details from './components/homesection/home_Service_Section/Provider_services_details';

// 🌟 NEW: Teeno alag-alag profile components ko import karein
import AdminProfile from './components/Profiles/AdminProfile';       // Path apne folder structure ke hisab se check kar lein
import ProviderProfile from './components/Profiles/ProviderProfile'; // Path apne folder structure ke hisab se check kar lein
import CustomerProfile from './components/Profiles/CustomerProfile'; // Path apne folder structure ke hisab se check kar lein
import Add_Services_ByProvider from './components/Profiles/add_services_ByProvider';
import ProviderDashboard from './pages/Provider/ProviderDashboard';

// 🌟 NEW: Dynamic Profile Router Wrapper Component
const ProfileRouter = () => {
  const user = JSON.parse(localStorage.getItem('user'));

  // Agar user login nahi hai, toh login par bhej do
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Role ke basis par alag profile page render hoga
  switch (user.role) {
    case 'superadmin':
    case 'admin':
      return <AdminProfile />;
    case 'provider':
      return <ProviderProfile />;
    case 'customer':
    default:
      return <CustomerProfile />;
  }
};

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Navbar />
      
      <Routes>
        {/* Services & Providers */}
        <Route path="/provider-details/:providerId" element={<Provider_services_details />} />
        <Route path="/manage-services" element={<ManageServices />} />
        <Route path="/services/:slug" element={<Services_Page_Details />} />
        <Route path="/service/:serviceId" element={<Home_Services_Page_Details />} /> 
        <Route path="/services" element={<MainServices />} />

        {/* Booking Form Protected Route */}
        <Route path="/book-service" element={
          <ProtectedRoute>
            <BookingForm />
          </ProtectedRoute>
        } />

        {/* 🌟 UPDATED: Dynamic Profile Route */}
        <Route path="/profile" element={
          <ProtectedRoute>
            <ProfileRouter />
          </ProtectedRoute>
        } />
        <Route path="/add-services" element={<Add_Services_ByProvider />} />
        {/* Dashboards based on Admin Roles */}
        <Route path="/superadmin-dashboard" element={<AdminRoute role="superadmin"><SuperAdminDashboard /></AdminRoute>} />
        <Route path="/admin-dashboard" element={<AdminRoute role="admin"><AdminDashboard /></AdminRoute>} />
        <Route path="/provider-dashboard" element={<AdminRoute role="provider"><ProviderDashboard /></AdminRoute>} />

        {/* Authentication & Static Pages */}
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;