import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
// import Offer from './components/Offer';
// import TopBar from './components/homesection/TopBar';
import Home from './pages/Home';
import About from './components/AboutSection.jsx/About';

import MainServices from './pages/MainServices';
import Services_Page_Details from './components/Main_Services_Page/Services_Page_Details';
import ServicesPage from './components/homesection/home_Service_Section/ServicesPage';
import Home_Services_Page_Details from './components/homesection/home_Service_Section/Home_Services_Page_Details';
// import Footer from './components/Footer';
// import QuickConnect from './components/QuickConnect';
import ScrollToTop from './components/ScrollToTop';
import ContactUs from './pages/ContactUs';
import Login from './components/Login';
import Register from './components/Register';
import ProtectedRoute from './components/utils/ProtectedRoute';
import BookingForm from './components/BookingForm';
import Dashboard from './pages/Dashboard';
import UserProfile from './components/UserProfile';
import ForgotPassword from './components/ForgotPassword';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminRoute from './components/utils/AdminRoute';
import ManageServices from './pages/admin/ManageServices';
import SuperAdminDashboard from './pages/admin/SuperAdminDashboardComponent/SuperAdminDashboard';
import ProviderDashboard from './pages/admin/ProviderDashboard';


//? =========================================================
function App() {
  return (
    <Router>
    <ScrollToTop/>
    
      <Navbar />
      <Routes>



      <Route path="/admin-dashboard" element={
                                            <AdminRoute>
                                              <AdminDashboard />
                                            </AdminRoute>
                                          } 
                                        />
      <Route path="/book-service" element={
                                              <ProtectedRoute>
                                                  <BookingForm />
                                              </ProtectedRoute>
                                          } />
      <Route path="/dashboard" element={
                                              <ProtectedRoute>
                                                  <Dashboard />
                                              </ProtectedRoute>
                                          } />
      <Route path="/profile" element={
                                              <ProtectedRoute>
                                                  <UserProfile />
                                              </ProtectedRoute>
                                          } />
      
      
      <Route path="/admin-dashboard" element={
                                            <ProtectedRoute>
                                              <AdminDashboard />
                                            </ProtectedRoute>
                                          } 
                                        />
      <Route path="/manage-services" element={<ManageServices />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/login" element={<Login />} />
              <Route path="/superadmin-dashboard" element={<AdminRoute role="superadmin"><SuperAdminDashboard /></AdminRoute>} />
              <Route path="/admin-dashboard" element={<AdminRoute role="admin"><AdminDashboard /></AdminRoute>} />
              <Route path="/provider-dashboard" element={<AdminRoute role="provider"><ProviderDashboard /></AdminRoute>} />

        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        // App.js mein path exactly aisa hona chahiye:
        <Route path="/services/:slug" element={<Services_Page_Details />} />
        <Route path="/" element={<ServicesPage />} />
        <Route path="/service/:serviceId" element={<Home_Services_Page_Details />} />
        <Route path="/services" element={<MainServices />} />
      
        <Route path="/contact" element={<ContactUs />} />
      </Routes>
     
    </Router>
  );
}

export default App;