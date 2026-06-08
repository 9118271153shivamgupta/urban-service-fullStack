import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ServiceCard = ({ id, name, icon }) => {
  const navigate = useNavigate();
  const [isLoaded, setIsLoaded] = useState(false);
  
  const BASE_URL = 'http://localhost:5000';
  const imageSrc = icon ? `${BASE_URL}/${icon.replace(/\\/g, "/")}` : `https://images.unsplash.com/photo-1581578731548-c64695cc6958?q=80&w=500&auto=format&fit=crop`;

  return (
    <div 
      // 🌟 Hamesha parameters standard match rkhein routing links ke liye
      onClick={() => navigate(`/service/${id}`)}
      className="flex flex-col items-center cursor-pointer group w-full"
    >
      <div className="relative w-full aspect-square bg-[#F5F5F5] rounded-2xl overflow-hidden border border-gray-100 transition-all duration-300 group-hover:border-black shadow-sm group-hover:shadow-md">
        
        {!isLoaded && (
          <div className="absolute inset-0 bg-gray-200 animate-pulse z-10" />
        )}

        <img 
          src={imageSrc} 
          alt={name} 
          className={`w-full h-full object-cover transition-all duration-700 ease-in-out group-hover:scale-110 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setIsLoaded(true)}
          onError={(e) => {
            e.target.src = `https://images.unsplash.com/photo-1581578731548-c64695cc6958?q=80&w=500&auto=format&fit=crop`;
            setIsLoaded(true);
          }}
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300" />
      </div>
      
      <h3 className="mt-4 text-black font-semibold text-xs sm:text-sm md:text-base text-center leading-tight px-1 uppercase tracking-tighter transition-all duration-300 group-hover:tracking-normal">
        {name}
      </h3>
    </div>
  );
};

export default ServiceCard;
// ================================================================



// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// const ServiceCard = ({ id, name, icon }) => {
//   const navigate = useNavigate();
//   const [isLoaded, setIsLoaded] = useState(false);

//   return (
//     <div 
//       onClick={() => navigate(`/service/${id}`)}
//       className="flex flex-col items-center cursor-pointer group w-full"
//     >
//       {/* --- IMAGE CONTAINER --- */}
//       {/* aspect-square ensures H and W are always equal */}
//       <div className="relative w-full aspect-square bg-[#F5F5F5] rounded-2xl overflow-hidden border border-gray-100 transition-all duration-300 group-hover:border-black shadow-sm group-hover:shadow-md">
        
//         {/* Skeleton Shimmer */}
//         {!isLoaded && (
//           <div className="absolute inset-0 bg-gray-200 animate-pulse z-10" />
//         )}

//         {/* --- FULL SIZE IMAGE --- */}
//         <img 
//           src={icon} 
//           alt={name} 
//           // w-full and h-full ensures it covers the entire card area
//           // object-cover ensures the image doesn't stretch awkwardly
//           className={`w-full h-full object-cover transition-all duration-700 ease-in-out group-hover:scale-110 ${
//             isLoaded ? 'opacity-100' : 'opacity-0'
//           }`}
//           onLoad={() => setIsLoaded(true)}
//           onError={(e) => {
//             // High-quality fallback if image fails
//             e.target.src = `https://images.unsplash.com/photo-1581578731548-c64695ce6958?q=80&w=500&auto=format&fit=crop`;
//             setIsLoaded(true);
//           }}
//         />

//         {/* Subtle Dark Overlay on Hover */}
//         <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300" />
//       </div>
      
//       {/* --- SERVICE NAME --- */}
//       <h3 className="mt-4 text-black  font-samibold text-xs sm:text-sm md:text-base text-center leading-tight px-1 uppercase tracking-tighter transition-all duration-300 group-hover:tracking-normal">
//         {name}
//       </h3>
//     </div>
//   );
// };

// export default ServiceCard;