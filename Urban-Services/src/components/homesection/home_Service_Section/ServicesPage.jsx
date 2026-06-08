// src/pages/admin/admindashboardcomponent/ServicesPage.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ServiceCard from './ServiceCard';
import ViewMoreButton from './ViewMoreButton';

const ServicesPage = ({ showButton = true }) => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Backend Base URL
  const BASE_URL = 'http://localhost:5000';

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/services`);
        setServices(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error("Error fetching services:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  // 🌟 Helper function jo object ya string dono se sahi text nikalega
  const getSafeStringName = (field, fallback) => {
    if (!field) return fallback;
    if (typeof field === 'object') return field.name || fallback;
    return String(field);
  };

  // 🌟 Helper function jo comparison ke liye hamesha standard ID string hi dega
  const getSafeIdString = (field, fallback = 'general') => {
    if (!field) return fallback;
    if (typeof field === 'object') return field._id || fallback;
    return String(field);
  };

  // 🔥 SAFE LOGIC: Saari unique Service Type names nikalne ke liye
  const serviceTypes = [
    ...new Set(services.map(s => getSafeStringName(s.serviceType, "General Services")))
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center font-poppins uppercase tracking-widest text-gray-500">
        Loading Dynamic Architecture...
      </div>
    );
  }

  return (
    <section className="py-12 bg-[#FDFDFD] min-h-screen font-poppins">
      <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-10">
        
        {/* --- PAGE HEADING SECTION --- */}
        <div className="text-center mb-16">
          <h1 className="text-3xl md:text-5xl font-black text-black uppercase tracking-tighter">
            Our Services
          </h1>
          <div className="w-24 h-1 bg-black mx-auto mt-4 mb-6"></div>
          <p className="text-gray-600 text-xs md:text-sm max-w-3xl mx-auto uppercase tracking-widest leading-relaxed">
            At UrbanServices, we deliver more than just a clean; we provide expert solutions...
          </p>
        </div>

        {/* Dynamic Multi-Tier Filter Rendering */}
        {services.length > 0 ? (
          serviceTypes.map((type) => {
            // Filter services belonging to this specific Service Type name
            const servicesInType = services.filter(s => getSafeStringName(s.serviceType, "General Services") === type);
            
            // Level 2: Unique Categories within this Service Type (Extracted safely by Name string)
            const categoriesInType = [
              ...new Set(servicesInType.map(s => getSafeStringName(s.category, "")).filter(Boolean))
            ];

            return (
              <div key={type} className="mb-20 last:mb-0">
                
                {/* 👑 LEVEL 1: SERVICE TYPE HEADER - (Sahi unique String render ho rhi hai) */}
                <div className="border-b-4 border-black pb-2 mb-8">
                  <h2 className="text-3xl md:text-5xl font-black text-black uppercase tracking-tight">
                    {type}
                  </h2>
                </div>

                {/* Categories Iteration */}
                {categoriesInType.map((cat) => {
                  // Filter services matching this category string name
                  const servicesInCat = servicesInType.filter(s => getSafeStringName(s.category, "") === cat);
                  
                  // Level 3: Unique Sub-Categories within this Category (Extracted safely by Name string)
                  const subCategoriesInCat = [
                    ...new Set(servicesInCat.map(s => getSafeStringName(s.subCategory, "General Framework")))
                  ];

                  return (
                    <div key={cat} className="mb-10 bg-white p-6 md:p-10 rounded-[2rem] border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                      
                      {/* 📂 LEVEL 2: MAIN CATEGORY TITLE */}
                      <div className="flex items-center gap-3 mb-8">
                        <span className="w-3 h-3 bg-indigo-600 rounded-full"></span>
                        <h3 className="text-xl md:text-2xl font-black text-gray-900 uppercase tracking-wide">
                          {cat}
                        </h3>
                      </div>

                      {/* Sub-Categories Iteration */}
                      {subCategoriesInCat.map((sub) => {
                        // Final filtered array for exact cards matching this subCategory name
                        const finalCards = servicesInCat.filter(s => getSafeStringName(s.subCategory, "General Framework") === sub);

                        return (
                          <div key={sub} className="mb-8 last:mb-0 bg-gray-50/50 p-4 md:p-6 rounded-2xl border border-gray-100">
                            
                            {/* 🏷️ LEVEL 3: SUB-CATEGORY TITLE */}
                            <h4 className="text-xs font-black text-indigo-600 uppercase tracking-widest mb-4">
                              {sub === "General Framework" ? "🔹 General Framework" : `⚡ ${sub}`}
                            </h4>

                            {/* 📦 SERVICE CARDS GRID */}
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
                              {finalCards.map((service) => (
                                <ServiceCard 
                                  key={service._id} 
                                  id={service._id} 
                                  name={service.name} 
                                  icon={service.image} 
                                />
                              ))}
                            </div>

                            {showButton && (
                              <div className="mt-8 flex justify-center md:justify-start">
                                <ViewMoreButton />
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  );
                })}
              </div>
            );
          })
        ) : (
          <div className="text-center py-20 text-gray-400 uppercase tracking-widest font-bold border-2 border-dashed border-gray-200 rounded-3xl">
            No active dynamic catalog components mapped.
          </div>
        )}
      </div>
    </section>
  );
};

export default ServicesPage;



















// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import { servicesData } from '../../../data/servicesData';
// import ServiceCard from './ServiceCard';
// import ViewMoreButton from './ViewMoreButton';

// // Humne yahan 'showButton' prop add kiya hai, default value 'true' rakhi hai
// const ServicesPage = ({ showButton = true }) => {
//   const navigate = useNavigate();
//   const categories = [...new Set(servicesData.map(s => s.category))];

//   return (
//     <section className="py-6 bg-[#FDFDFD] min-h-screen font-poppins">
//       <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-10">
        
//         {/* --- PAGE HEADING SECTION --- */}
//         <div className="text-center mb-10">
//           <h1 className="text-3xl md:text-4xl font-black text-black uppercase tracking-tighter">
//             Our Services
//           </h1>
//           <div className="w-24 h-1 bg-black mx-auto mb-6"></div>
//           <p className="text-black text-sm md:text-md max-w-3xl mx-auto uppercase tracking-widest">
//             At UrbanServices, we deliver more than just a clean; we provide expert solutions...
//           </p>
//         </div>

//         {categories.map((cat) => (
//           <div key={cat} className="mb-10 bg-white p-6 md:p-12 rounded-[2rem] border border-gray-200 shadow-sm">
            
//             {/* Sub-Category Loop */}
//             {[...new Set(servicesData.filter(s => s.category === cat).map(s => s.subCategory))].map(sub => (
//               <div key={sub} className="mb-10 last:mb-0">
//                 <h4 className="text-3xl md:text-3xl mb-6 font-black text-black uppercase tracking-tight">
//                   {sub}
//                 </h4>

//                 {/* Grid Setup */}
//                 <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 md:gap-5">
//                   {servicesData
//                     .filter(s => s.category === cat && s.subCategory === sub)
//                     .map(service => (
//                       <ServiceCard key={service.id} {...service} />
//                     ))}
//                 </div>

//                 {/* --- CONDITIONAL VIEW MORE BUTTON --- */}
//                 {/* Agar showButton true hoga tabhi button dikhega */}
//                 {showButton && (
//                   <div className="mt-12 flex justify-center md:justify-start">
//                     <ViewMoreButton/>
//                   </div>
//                 )}
//               </div>
//             ))}
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// };

// export default ServicesPage;














