import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MoveRight } from 'lucide-react';

const ServiceListCard = ({ title, slug }) => {
  const navigate = useNavigate();

  return (
    <div 
      onClick={() => navigate(`/services/${slug}`)} // Dynamic detail page navigation
      className="group bg-white p-4 rounded-lg border border-gray-100 flex items-center justify-between cursor-pointer shadow-sm hover:shadow-lg hover:shadow-emerald-500/5 hover:border-emerald-300 transition-all duration-300"
    >
      <h4 className="text-gray-800 font-medium text-sm group-hover:text-emerald-700 transition-colors">
        {title}
      </h4>
      {/* Emerald Arrow Icon - Rotates on hover */}
      <MoveRight className="w-5 h-5 text-gray-300 group-hover:text-emerald-500 group-hover:translate-x-1 transition-all duration-300" />
    </div>
  );
};

export default ServiceListCard;