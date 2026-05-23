import React from 'react';
import { whyChooseUsContent } from './whyChooseUsData';

const WhyChooseUs = () => {
  const { subtitle, title, description, points } = whyChooseUsContent;

  return (
    <section className="py-12 bg-[#f8fafc] font-poppins">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8">
        
        {/* Header Section */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-black font-bold uppercase tracking-wider text-[11px]">
            {subtitle}
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-black mt-2 mb-3 tracking-tight">
            {title}
          </h2>
          <p className="text-gray-800 text-sm leading-relaxed">
            {description}
          </p>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {points.map((point, index) => (
            <FeatureCard key={index} {...point} />
          ))}
        </div>
      </div>
    </section>
  );
};

// Sub-component for better readability
const FeatureCard = ({ icon: Icon, title, description }) => (
  <div className="group bg-white p-5 rounded-xl border border-black-300 flex items-center gap-5 shadow-sm hover:shadow-md transition-all duration-300">
    <div className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center group-hover:bg-black transition-colors duration-300">
      <Icon className="w-6 h-6 text-black group-hover:text-white transition-colors duration-300" strokeWidth={2} />
    </div>
    <div className="flex-1">
      <h3 className="text-[16px] font-bold text-[#0f172a] leading-tight mb-1">
        {title}
      </h3>
      <p className="text-gray-500 text-[13px] leading-snug font-medium">
        {description}
      </p>
    </div>
  </div>
);

export default WhyChooseUs;









































// import React from 'react';
// import { ShieldCheck, Clock3, TrendingUp, Zap, Wrench, Headset } from 'lucide-react';

// const WhyChooseUs = () => {
//   const points = [
//     {
//       icon: ShieldCheck,
//       title: "Verified & Trained Technicians",
//       description: "All our technicians are background verified and professionally trained."
//     },
//     {
//       icon: Clock3,
//       title: "Same-Day Service Available",
//       description: "Book now and get service within 60 minutes in Gorakhpur."
//     },
//     {
//       icon: TrendingUp,
//       title: "Affordable & Transparent Pricing",
//       description: "No hidden charges. Get upfront pricing before service starts."
//     },
//     {
//       icon: Zap,
//       title: "Service Warranty on Every Job",
//       description: "30-90 days warranty on all repairs and installations."
//     },
//     {
//       icon: Wrench,
//       title: "Genuine Spare Parts",
//       description: "We use only original and high-quality spare parts."
//     },
//     {
//       icon: Headset,
//       title: "Safe & Professional Support",
//       description: "24/7 customer support for all your queries and concerns."
//     }
//   ];

//   return (
//     // Padding-top/bottom kam kiya (py-12)
//     <section className="py-0 bg-[#f8fafc] font-poppins">
//       <div className="max-w-[1400px] mx-auto px-4 md:px-8">
        
//         {/* Header Section: Margin-bottom kam kiya (mb-10) */}
//         <div className="text-center max-w-2xl mx-auto mb-10">
//           <span className="text-green-600 font-bold uppercase tracking-wider text-[11px]">
//             Why Choose Us
//           </span>
//           <h2 className="text-3xl md:text-4xl font-extrabold text-[#0f172a] mt-2 mb-3 tracking-tight">
//             Why Choose Us?
//           </h2>
//           <p className="text-gray-500 text-sm leading-relaxed">
//            Our commitment is to deliver superior facility care by blending reliability with meticulous attention to detail, ensuring total customer satisfaction
//           </p>
//         </div>

//         {/* Grid: 3 columns with wider cards and less gap */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//           {points.map((point, index) => {
//             const Icon = point.icon;
//             return (
//               <div 
//                 key={index} 
//                 // Padding kam (p-5), Height auto (compact) aur items-center
//                 className="group bg-white p-5 rounded-xl border border-gray-100 flex items-center gap-5 shadow-sm hover:shadow-md transition-all duration-300"
//               >
//                 {/* Icon Box: Size thoda chota kiya */}
//                 <div className="flex-shrink-0 w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center group-hover:bg-emerald-600 transition-colors duration-300">
//                   <Icon className="w-6 h-6 text-green-600 group-hover:text-white transition-colors duration-300" strokeWidth={2} />
//                 </div>

//                 {/* Text Content: Margin/Padding zero kiye extra */}
//                 <div className="flex-1">
//                   <h3 className="text-[16px] font-bold text-[#0f172a] leading-tight mb-1">
//                     {point.title}
//                   </h3>
//                   <p className="text-gray-500 text-[13px] leading-snug font-medium">
//                     {point.description}
//                   </p>
//                 </div>
//               </div>
//             );
//           })}
//         </div>

//       </div>
//     </section>
//   );
// };

// export default WhyChooseUs;