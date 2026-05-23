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
        setServices(res.data);
      } catch (err) {
        console.error("Error fetching services:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  // API से आए डेटा से Categories और Sub-categories निकालना
  const categories = [...new Set(services.map(s => s.category))];

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center font-poppins uppercase tracking-widest">Loading Services...</div>;
  }

  return (
    <section className="py-6 bg-[#FDFDFD] min-h-screen font-poppins">
      <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-10">
        
        {/* --- PAGE HEADING SECTION --- */}
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-black text-black uppercase tracking-tighter">
            Our Services
          </h1>
          <div className="w-24 h-1 bg-black mx-auto mb-6"></div>
          <p className="text-black text-sm md:text-md max-w-3xl mx-auto uppercase tracking-widest">
            At UrbanServices, we deliver more than just a clean; we provide expert solutions...
          </p>
        </div>

        {categories.length > 0 ? (
          categories.map((cat) => (
            <div key={cat} className="mb-10 bg-white p-6 md:p-12 rounded-[2rem] border border-gray-200 shadow-sm">
              
              {/* Sub-Category Loop */}
              {[...new Set(services.filter(s => s.category === cat).map(s => s.subCategory))].map(sub => (
                <div key={sub} className="mb-10 last:mb-0">
                  <h4 className="text-3xl md:text-3xl mb-6 font-black text-black uppercase tracking-tight">
                    {sub || "General"} 
                  </h4>

                  {/* Grid Setup */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 md:gap-5">
                    {services
                      .filter(s => s.category === cat && s.subCategory === sub)
                      .map(service => (
                        <ServiceCard 
                          key={service._id} 
                          id={service._id} 
                          name={service.name} 
                          icon={service.image} // Backend image path
                        />
                      ))}
                  </div>

                  {showButton && (
                    <div className="mt-12 flex justify-center md:justify-start">
                      <ViewMoreButton/>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ))
        ) : (
          <div className="text-center py-20 text-gray-400 uppercase tracking-widest">No services found.</div>
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














