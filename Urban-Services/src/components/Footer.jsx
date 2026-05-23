
import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaInstagram, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaClock } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-black text-white pt-10 pb-6 font-poppins">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          
          {/* Column 1: Logo Section */}
          <div className="space-y-5">
            <Link to="/" className="flex items-center gap-3 flex-shrink-0">
              <div className="relative w-50 h-20 sm:w-50 sm:h-20 overflow-hidden flex-shrink-0 bg-white">
                <img 
                  src="/logo.jpeg" 
                  alt="Urban Services Logo" 
                  className="w-full h-full object-cover" 
                />
              </div>
              {/* <div className="flex flex-col">
                <h1 className="text-white font-bold text-lg sm:text-xl leading-none tracking-tight">
                  Urban Services
                </h1>
                <p className="text-white text-[9px] font-medium tracking-[0.1em] uppercase">
                  Your Cleaning Partner
                </p>
              </div> */}
            </Link>

            <p className="text-white text-sm leading-relaxed max-w-xs">
              "Transforming your surroundings into pristine sanctuaries with our expert cleaning touch."
            </p>
            
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-white text-sm">
                <FaClock className="text-white flex-shrink-0" />
                <span>24/7 Service Available</span>
              </div>
            </div>

            {/* Social Media Icons */}
              <div className="flex gap-3 pt-2">
                <a href="#" className="bg-white/10 p-2 rounded-md hover:bg-blue-500 transition-all">
                  <FaFacebookF size={16} />
                </a>
                <a href="#" className="bg-white/10 p-2 rounded-md hover:bg-pink-600 transition-all">
                  <FaInstagram size={16} />
                </a>
              </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-5 border-l-4 border-white pl-3">Quick Links</h3>
            <ul className="space-y-2 text-sm text-white">
              <li><Link to="/" className="hover:text-blue-300 transition-colors">Home</Link></li>
              <li><Link to="/about" className="hover:text-blue-300 transition-colors">About Us</Link></li>
              <li><Link to="/services" className="hover:text-blue-300 transition-colors">Services</Link></li>
              <li><Link to="/pricing" className="hover:text-blue-300 transition-colors">Pricing</Link></li>
              <li><Link to="/contact" className="hover:text-blue-300 transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Column 3: Our Services */}
          <div>
            <h3 className="text-lg font-bold mb-5 border-l-4 border-white pl-3">Our Services</h3>
            <ul className="space-y-2 text-sm text-white">
              <li><a href="#" className="hover:text-blue-300 transition-colors">Home Cleaning</a></li>
              <li><a href="#" className="hover:text-blue-300 transition-colors">Office Cleaning</a></li>
              <li><a href="#" className="hover:text-blue-300 transition-colors">Deep Cleaning</a></li>
              <li><a href="#" className="hover:text-blue-300 transition-colors">Repaires</a></li>
              <li><a href="#" className="hover:text-blue-300 transition-colors">Instalation</a></li>
            </ul>
          </div>

          {/* Column 4: Contact Us */}
          <div>
            <h3 className="text-lg font-bold mb-5 border-l-4 border-white pl-3">Contact Us</h3>
            <div className="space-y-4 text-sm text-white">
              
              {/* Phone Numbers */}
              <div className="flex items-center gap-3">
                <FaPhoneAlt className="text-white flex-shrink-0" />
                <div className="flex flex-col gap-1">
                  <a href="tel:+917897222542" className="hover:text-blue-300">+91 7897222542</a>
                  <a href="tel:+917897222542" className="hover:text-blue-300">+91 8383076627</a>
                </div>
              </div>

              {/* Four Emails Section */}
              <div className="flex gap-3">
                <FaEnvelope className="text-white mt-1 flex-shrink-0" />
                <div className="flex flex-col gap-1">
                  <a href="mailto:delhi@urbanservices.com.in" className="hover:text-blue-300 text-xs sm:text-sm">delhi@urbanservices.com.in</a>
                  <a href="mailto:info@urbanservices.com.in" className="hover:text-blue-300 text-xs sm:text-sm">gorakhpur@urbanservices.com.in</a>
                  <a href="mailto:support@urbanservices.com.in" className="hover:text-blue-300 text-xs sm:text-sm">lucknow@urbanservices.com.in</a>
                  <a href="mailto:sales@urbanservices.com.in" className="hover:text-blue-300 text-xs sm:text-sm">varanansi@urbanservices.com.in</a>
                </div>
              </div>
              
              {/* Office Address */}
              <div className="flex gap-3 items-start">
                <FaMapMarkerAlt className="mt-1 text-white flex-shrink-0" />
                <p className='hover:text-blue-300'> 81, Nehru Complex, Vikash Nagar, Bargadwa, Gorakhpur, Uttar Pradesh 273007</p>
              </div>

              {/* Social Media Icons
              <div className="flex gap-3 pt-2">
                <a href="#" className="bg-white/10 p-2 rounded-md hover:bg-blue-500 transition-all">
                  <FaFacebookF size={16} />
                </a>
                <a href="#" className="bg-white/10 p-2 rounded-md hover:bg-pink-600 transition-all">
                  <FaInstagram size={16} />
                </a>
              </div> */}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/5 pt-6 mt-6 text-center text-white text-[10px] sm:text-xs tracking-wide">
          <p>© 2026 UrbanServices Gorakhpur. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;