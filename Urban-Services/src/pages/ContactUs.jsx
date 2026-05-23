import React from 'react';
import { MapPin, Headset, Mail } from 'lucide-react';
import GoogleMap from '../components/GoogleMap';
import Footer from '../components/Footer';
import QuickConnect from '../components/QuickConnect';

const ContactPage = () => {
  const branches = [
    {
      city: "GORAKHPUR",
      address: "81, Nehru Complex, Vikash Nagar, Bargadwa, Gorakhpur, Uttar Pradesh-273007",
      mail:"gorakhpur@urbanservices.com.in"
    },
    {
      city: "DELHI",
      address: "24, Begumpur, Malviya Nagar, New Delhi-110017",
      mail:"delhi@urbanservices.com.in"
    },
    {
      city: "VARANASI",
      address: "Dhirendra P.G College Road, Vaishno Vihar Colony, B.H.U, Sundarpur, Nagawa, Varanasi, UP-221106",
      mail:"varanansi@urbanservices.com.in"
    },
    {
      city: "LUCKNOW",
      address: "Shop No.44, Ujala Apartment, Shopping Complex, Sector-20, B Block, Indira Nagar, Lucknow, UP-226016",
      mail:"lucknow@urbanservices.com.in"
    }
  ];

  return (
    <div className="font-poppins text-gray-800">
      {/* Hero Banner Section */}
      <div className="relative h-64 bg-slate-900 flex flex-col items-center justify-center text-white overflow-hidden">
        {/* Background Overlay (Screen shot ki trh dark blue tint) */}
        <div className="absolute inset-0 bg-black z-0"></div>
        
        {/* Banner Content */}
        <div className="relative z-10 text-center">
          <h1 className="text-3xl md:text-4xl font-bold tracking-wider mb-2">
            Urban Service Contact 
          </h1>
          <div className="w-24 h-1 bg-white mx-auto mb-4"></div>
          <p className="text-sm text-white">
            Home <span className="mx-2 text-white">•</span> Contact Us
          </p>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        
        {/* Section 1: Contact Us Header */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold uppercase tracking-tight">Contact Us</h2>
          <div className="w-16 h-1 bg-black mt-2"></div>
        </div>

        {/* Branch Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {branches.map((branch, index) => (
            <div key={index} className="flex gap-4">
              <MapPin className="text-black w-8 h-8 shrink-0" />
              <div>
                <h3 className="font-bold text-sm mb-2">{branch.city}</h3>
                <p className="text-sm text-black leading-relaxed">
                  {branch.address}
                </p>
                <p className="text-sm text-black-500 leading-relaxed font-bold"> Email-us <br />     
                     {branch.mail}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Support Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          <div className="flex gap-4">
            <Headset className="text-black w-8 h-8 shrink-0" />
            <div>
              <h3 className="font-bold text-sm mb-2 uppercase">Customer Care</h3>
              <p className="text-sm text-gray-600">9005161280</p>
              <p className="text-sm text-gray-600">9005161280</p>
            </div>
          </div>
          
        </div>

        

      </div>
      <GoogleMap/>
       <QuickConnect/>
      <Footer/>
    </div>
  );
};

export default ContactPage;