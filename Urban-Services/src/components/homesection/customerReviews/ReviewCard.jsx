import React from 'react';
import { Star, Quote } from 'lucide-react';

const ReviewCard = ({ review }) => {
  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all relative flex flex-col justify-between h-full">
      <Quote className="absolute top-4 right-6 text-green-50 w-10 h-10 -z-0" />
      
      <div className="relative z-10">
        <div className="flex gap-0.5 mb-4">
          {[...Array(5)].map((_, i) => (
            <Star 
              key={i} 
              size={14} 
              className={`${i < review.rating ? "fill-black text-black" : "text-gray-200"}`} 
            />
          ))}
        </div>
        
        <p className="text-gray-700 text-[13px] italic leading-relaxed mb-6 font-poppins">
          "{review.text}"
        </p>
      </div>

      <div className="flex justify-between items-center border-t border-gray-50 pt-4 relative z-10">
        <div>
          <h4 className="font-bold text-gray-900 text-[14px] font-poppins">{review.name}</h4>
          <p className="text-gray-400 text-[11px] font-poppins">{review.location}</p>
        </div>
        <span className="bg-black text-white text-[10px] font-bold px-3 py-1 rounded-full font-poppins">
          {review.service}
        </span>
      </div>
    </div>
  );
};

export default ReviewCard;