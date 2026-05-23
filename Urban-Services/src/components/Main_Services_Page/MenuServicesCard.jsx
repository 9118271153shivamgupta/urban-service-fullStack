import React from 'react';
import { CheckCircle2 } from 'lucide-react';

const MenuServicesCard = ({ service, onBook }) => {
  return (
    <div className="bg-white rounded-[2rem] overflow-hidden border border-green-100 shadow-lg hover:shadow-2xl transition-all duration-300 group flex flex-col h-full">
      {/* Image Section */}
      <div className="relative h-56 overflow-hidden">
        <img 
          src={service.image} 
          alt={service.title} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-4 right-4 bg-white backdrop-blur-md px-4 py-1 rounded-full shadow-sm">
          <p className="text-black font-bold text-sm">Starts at ₹{service.price}</p>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
        
        <ul className="space-y-3 mb-6 flex-grow">
          {service.features.map((feature, index) => (
            <li key={index} className="flex items-start gap-3 text-gray-800 text-sm">
              <CheckCircle2 className="w-5 h-5 text-black shrink-0" strokeWidth={2.5} />
              <span>{feature}</span>
            </li>
          ))}
        </ul>

        <div className="mt-auto pt-4 border-t border-gray-300">
          <button 
            onClick={() => onBook(service)}
            className="w-full bg-black hover:cursor-pointer text-white font-bold py-3.5 rounded-xl transition-all active:scale-95 shadow-md shadow-green-100 mb-3"
          >
            Book Service
          </button>
          <p className="text-center font-bold text-sm">+91 7897222542</p>
        </div>
      </div>
    </div>
  );
};

export default MenuServicesCard;