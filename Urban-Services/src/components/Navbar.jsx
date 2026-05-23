import { navLinks } from '../data/navData';
import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import BookingForm from './BookingForm';
import { Menu, X, UserCircle, LogOut, ChevronDown, User, CalendarCheck, LayoutDashboard, ShieldCheck, HardHat } from 'lucide-react'; 
import TopBar from './TopBar';

const Navbar = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false); 
  const [isProfileOpen, setIsProfileOpen] = useState(false); 
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const isAuthenticated = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    setIsProfileOpen(false);
    navigate('/login');
  };

  // Role based Dashboard Link Helper
  const renderDashboardLink = (isMobile = false) => {
    const linkClass = isMobile 
      ? "flex items-center gap-2 py-2 font-bold transition-colors" 
      : "flex items-center gap-3 px-4 py-2.5 text-sm transition-colors font-bold";

    if (user?.role === 'superadmin') {
      return (
        <Link to="/superadmin-dashboard" onClick={() => {setIsProfileOpen(false); setIsMenuOpen(false);}} className={`${linkClass} text-red-600 hover:bg-red-50`}>
          <ShieldCheck size={18} /> Super Admin Panel
        </Link>
      );
    } else if (user?.role === 'admin') {
      return (
        <Link to="/admin-dashboard" onClick={() => {setIsProfileOpen(false); setIsMenuOpen(false);}} className={`${linkClass} text-blue-700 hover:bg-blue-50`}>
          <LayoutDashboard size={18} /> Admin Panel
        </Link>
      );
    } else if (user?.role === 'provider') {
      return (
        <Link to="/provider-dashboard" onClick={() => {setIsProfileOpen(false); setIsMenuOpen(false);}} className={`${linkClass} text-orange-600 hover:bg-orange-50`}>
          <HardHat size={18} /> Provider Panel
        </Link>
      );
    } else {
      return (
        <Link to="/dashboard" onClick={() => {setIsProfileOpen(false); setIsMenuOpen(false);}} className={`${linkClass} text-gray-700 hover:bg-green-50 hover:text-green-700`}>
          <CalendarCheck size={18} /> My Bookings
        </Link>
      );
    }
  };

  return (
    <nav className="w-full bg-white sticky top-0 z-50  mb-2">
    <TopBar/>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 flex items-center justify-between py-0">
        
        <div className="flex items-center gap-0 shrink-0">
          <div className="w-40 h-18 md:w-40 md:h-19 ">
            <img src="./logo.jpeg" alt="UrbanServices Logo" className="w-full h-full object-fit" />
          </div>
        </div>

        <ul className="hidden lg:flex items-center gap-10 ">
          {navLinks.map((link, index) => (
            <li key={index}>
              <Link to={link.path} className="text-black font-semibold text-[19px] hover:underline transition-colors">
                {link.name}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <div className="hidden lg:flex items-center gap-4 mr-2">
            {!isAuthenticated ? (
              <Link to="/login" className="text-black font-bold px-4 py-2">Login</Link>
            ) : (
              <div className="relative" ref={dropdownRef}>
                <button 
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  onMouseEnter={() => setIsProfileOpen(true)}
                  className="flex items-center gap-2 text-green-700 font-bold bg-green-50 px-4 py-1.5 rounded-full border border-green-200 hover:bg-green-100 transition-all shadow-sm"
                >
                  <UserCircle size={22} />
                  <span>{user?.name || "User"}</span>
                  <ChevronDown size={16} className={`transition-transform duration-200 ${isProfileOpen ? 'rotate-180' : ''}`} />
                </button>

                {isProfileOpen && (
                  <div 
                    onMouseLeave={() => setIsProfileOpen(false)}
                    className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200"
                  >
                    <div className="px-4 py-2 border-b border-gray-50 mb-1">
                      <p className="text-xs text-gray-400 font-medium">Welcome!</p>
                      <p className="text-sm font-bold text-gray-800 truncate">{user?.email}</p>
                    </div>

                    <Link 
                      to="/profile" 
                      onClick={() => setIsProfileOpen(false)}
                      className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-green-50 hover:text-green-700 transition-colors"
                    >
                      <User size={18} /> My Profile
                    </Link>

                    {/* Role Based Link */}
                    {renderDashboardLink(false)}

                    <div className="border-t border-gray-50 mt-1 pt-1">
                      <button 
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors font-semibold"
                      >
                        <LogOut size={18} /> Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          <button 
            onClick={() => setIsFormOpen(true)}
            className="hidden sm:block bg-black text-white px-6 md:px-8 py-2 md:py-2.5 rounded-full font-bold hover:cursor-pointer transition-all shadow-lg shadow-green-900/20"
          >
            Book Now
          </button>

          <button 
            className="lg:hidden text-black" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={30} /> : <Menu size={30} />}
          </button>
        </div>
      </div>

      {/* Mobile/Tablet Sidebar Menu */}
      <div className={`lg:hidden fixed inset-0 z-40 transform ${isMenuOpen ? "translate-x-0" : "translate-x-full"} transition-transform duration-300 ease-in-out`}>
        <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" onClick={() => setIsMenuOpen(false)}></div>
        
        <div className="absolute right-0 top-0 h-full w-64 bg-white shadow-xl p-6 flex flex-col">
          <div className="flex justify-end mb-8">
            <button onClick={() => setIsMenuOpen(false)}><X size={30} /></button>
          </div>
          
          <ul className="flex flex-col gap-5 mb-6">
            {navLinks.map((link, index) => (
              <li key={index}>
                <Link to={link.path} onClick={() => setIsMenuOpen(false)} className="text-xl font-semibold text-black italic">
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex flex-col gap-3 mb-6 pt-6 border-t border-gray-100">
            {!isAuthenticated ? (
              <Link to="/login" onClick={() => setIsMenuOpen(false)} className="w-full text-center border border-black text-black py-2.5 rounded-full font-bold">
                Login
              </Link>
            ) : (
              <>
                <p className="text-green-700 font-bold mb-2">Hello, {user?.name}</p>
                <Link to="/profile" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-2 text-gray-700 py-2">
                  <User size={18}/> My Profile
                </Link>

                {/* Role Based Link for Mobile */}
                {renderDashboardLink(true)}

                <button onClick={handleLogout} className="w-full flex justify-center items-center gap-2 border border-red-600 text-red-600 py-2.5 rounded-full font-bold mt-2">
                  <LogOut size={20} /> Logout
                </button>
              </>
            )}
          </div>

          <button 
            onClick={() => { setIsFormOpen(true); setIsMenuOpen(false); }}
            className="w-full bg-black text-white py-3 rounded-full font-bold shadow-md"
          >
            Book Now
          </button>
        </div>
      </div>

      <BookingForm isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} />
    </nav>
  );
};

export default Navbar;



// import { navLinks } from '../data/navData';
// import React, { useState, useRef, useEffect } from 'react';
// import { Link, useNavigate } from 'react-router-dom';

// import BookingForm from './BookingForm';
// import { Menu, X, UserCircle, LogOut, ChevronDown, User, CalendarCheck, LayoutDashboard } from 'lucide-react'; 

// const Navbar = () => {
//   const [isFormOpen, setIsFormOpen] = useState(false);
//   const [isMenuOpen, setIsMenuOpen] = useState(false); 
//   const [isProfileOpen, setIsProfileOpen] = useState(false); // Dropdown state
//   const dropdownRef = useRef(null);
//   const navigate = useNavigate();

//   const isAuthenticated = localStorage.getItem('token');
//   const user = JSON.parse(localStorage.getItem('user'));

//   // Dropdown के बाहर क्लिक करने पर उसे बंद करने के लिए
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setIsProfileOpen(false);
//       }
//     };
//     document.addEventListener('mousedown', handleClickOutside);
//     return () => document.removeEventListener('mousedown', handleClickOutside);
//   }, []);

//   const handleLogout = () => {
//     localStorage.clear();
//     setIsProfileOpen(false);
//     navigate('/login');
//   };

//   return (
//     <nav className="w-full bg-white sticky top-0 z-50 mt-4 mb-2">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 flex items-center justify-between py-0">
        
//         {/* Logo Section */}
//         <div className="flex items-center gap-0 shrink-0">
//           <div className="w-40 h-18 md:w-40 md:h-19 ">
//             <img src="./logo.jpeg" alt="UrbanServices Logo" className="w-full h-full object-fit" />
//           </div>
//         </div>

//         {/* Desktop Nav Links */}
//         <ul className="hidden lg:flex items-center gap-10 ">
//           {navLinks.map((link, index) => (
//             <li key={index}>
//               <Link to={link.path} className="text-black font-semibold text-[19px] hover:underline transition-colors">
//                 {link.name}
//               </Link>
//             </li>
//           ))}
//         </ul>

//         {/* Right Actions */}
//         <div className="flex items-center gap-3">
          
//           <div className="hidden lg:flex items-center gap-4 mr-2">
//             {!isAuthenticated ? (
//               <Link to="/login" className="text-black font-bold px-4 py-2">Login</Link>
//             ) : (
//               /* --- Profile Dropdown Starts --- */
//               <div className="relative" ref={dropdownRef}>
//                 <button 
//                   onClick={() => setIsProfileOpen(!isProfileOpen)}
//                   onMouseEnter={() => setIsProfileOpen(true)}
//                   className="flex items-center gap-2 text-green-700 font-bold bg-green-50 px-4 py-1.5 rounded-full border border-green-200 hover:bg-green-100 transition-all shadow-sm"
//                 >
//                   <UserCircle size={22} />
//                   <span>{user?.name || "User"}</span>
//                   <ChevronDown size={16} className={`transition-transform duration-200 ${isProfileOpen ? 'rotate-180' : ''}`} />
//                 </button>

//                 {/* Dropdown Menu */}
//                 {isProfileOpen && (
//                   <div 
//                     onMouseLeave={() => setIsProfileOpen(false)}
//                     className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200"
//                   >
//                     <div className="px-4 py-2 border-b border-gray-50 mb-1">
//                       <p className="text-xs text-gray-400 font-medium">Welcome!</p>
//                       <p className="text-sm font-bold text-gray-800 truncate">{user?.email}</p>
//                     </div>

//                     <Link 
//                       to="/profile" 
//                       onClick={() => setIsProfileOpen(false)}
//                       className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-green-50 hover:text-green-700 transition-colors"
//                     >
//                       <User size={18} /> My Profile
//                     </Link>

//                     {/* Conditional: Admin ko dashboard dikhao, User ko bookings */}
//                     {user?.role === 'admin' ? (
//                       <Link 
//                         to="/admin-dashboard" 
//                         onClick={() => setIsProfileOpen(false)}
//                         className="flex items-center gap-3 px-4 py-2.5 text-sm text-blue-700 hover:bg-blue-50 transition-colors font-bold"
//                       >
//                         <LayoutDashboard size={18} /> Admin Panel
//                       </Link>
//                     ) : (
//                       <Link 
//                         to="/dashboard" 
//                         onClick={() => setIsProfileOpen(false)}
//                         className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-green-50 hover:text-green-700 transition-colors"
//                       >
//                         <CalendarCheck size={18} /> My Bookings
//                       </Link>
//                     )}

//                     <div className="border-t border-gray-50 mt-1 pt-1">
//                       <button 
//                         onClick={handleLogout}
//                         className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors font-semibold"
//                       >
//                         <LogOut size={18} /> Logout
//                       </button>
//                     </div>
//                   </div>
//                 )}
//               </div>
//               /* --- Profile Dropdown Ends --- */
//             )}
//           </div>

//           <button 
//             onClick={() => setIsFormOpen(true)}
//             className="hidden sm:block bg-black text-white px-6 md:px-8 py-2 md:py-2.5 rounded-full font-bold hover:cursor-pointer transition-all shadow-lg shadow-green-900/20"
//           >
//             Book Now
//           </button>

//           <button 
//             className="lg:hidden text-black" 
//             onClick={() => setIsMenuOpen(!isMenuOpen)}
//           >
//             {isMenuOpen ? <X size={30} /> : <Menu size={30} />}
//           </button>
//         </div>
//       </div>

//       {/* Mobile/Tablet Sidebar Menu */}
//       <div className={`lg:hidden fixed inset-0 z-40 transform ${isMenuOpen ? "translate-x-0" : "translate-x-full"} transition-transform duration-300 ease-in-out`}>
//         <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" onClick={() => setIsMenuOpen(false)}></div>
        
//         <div className="absolute right-0 top-0 h-full w-64 bg-white shadow-xl p-6 flex flex-col">
//           <div className="flex justify-end mb-8">
//             <button onClick={() => setIsMenuOpen(false)}><X size={30} /></button>
//           </div>
          
//           <ul className="flex flex-col gap-5 mb-6">
//             {navLinks.map((link, index) => (
//               <li key={index}>
//                 <Link to={link.path} onClick={() => setIsMenuOpen(false)} className="text-xl font-semibold text-black italic">
//                   {link.name}
//                 </Link>
//               </li>
//             ))}
//           </ul>

//           <div className="flex flex-col gap-3 mb-6 pt-6 border-t border-gray-100">
//             {!isAuthenticated ? (
//               <Link to="/login" onClick={() => setIsMenuOpen(false)} className="w-full text-center border border-black text-black py-2.5 rounded-full font-bold">
//                 Login
//               </Link>
//             ) : (
//               <>
//                 <p className="text-green-700 font-bold mb-2">Hello, {user?.name}</p>
//                 <Link to="/profile" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-2 text-gray-700 py-2">
//                   <User size={18}/> My Profile
//                 </Link>

//                 {/* Mobile Responsive Role Check */}
//                 {user?.role === 'admin' ? (
//                    <Link to="/admin-dashboard" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-2 text-blue-700 py-2 font-bold">
//                     <LayoutDashboard size={18}/> Admin Panel
//                   </Link>
//                 ) : (
//                   <Link to="/dashboard" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-2 text-gray-700 py-2">
//                     <CalendarCheck size={18}/> My Bookings
//                   </Link>
//                 )}

//                 <button onClick={handleLogout} className="w-full flex justify-center items-center gap-2 border border-red-600 text-red-600 py-2.5 rounded-full font-bold mt-2">
//                   <LogOut size={20} /> Logout
//                 </button>
//               </>
//             )}
//           </div>

//           <button 
//             onClick={() => { setIsFormOpen(true); setIsMenuOpen(false); }}
//             className="w-full bg-black text-white py-3 rounded-full font-bold shadow-md"
//           >
//             Book Now
//           </button>
//         </div>
//       </div>

//       <BookingForm isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} />
//     </nav>
//   );
// };

// export default Navbar;