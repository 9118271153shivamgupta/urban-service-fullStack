import React from 'react';
import ReviewCard from './ReviewCard';
import { reviewsData } from '../../../data/reviewsData';

const CustomerReviews = () => {
  return (
    <section className="py-12 bg-[#f8fafc]">
      <div className="max-w-6xl mx-auto px-4">
        
        {/* Header */}
        <div className="text-center mb-10">
          <span className="text-black font-bold uppercase tracking-widest text-[11px] font-poppins">
            Testimonials
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 mt-1 font-poppins">
            Hear From Our Happy Clients
          </h2>
        </div>

        {/* Scrollable Container: 
            Desktop (3 columns) par 2 rows = 6 cards ke baad scroll karega.
            Custom scrollbar classes use karein.
        */}
        <div className="max-h-[700px] overflow-y-auto pr-2 custom-scrollbar lg:max-h-[650px]">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviewsData.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
        </div>

      </div>

      {/* Logic to hide Write Review button but keep the code available */}
      {/* <button onClick={() => setIsModalOpen(true)}>Write Review</button> 
      */}
    </section>
  );
};

export default CustomerReviews;








// import React, { useState, useEffect } from 'react';
// import { Star, Quote, PlusCircle } from 'lucide-react';
// import { initialReviews } from '../../../data/reviewsData';
// import ReviewForm from './ReviewForm';

// const CustomerReviews = () => {
//   const [isModalOpen, setIsModalOpen] = useState(false);
  
//   const [reviews, setReviews] = useState(() => {
//     const savedReviews = localStorage.getItem('userReviews');
//     return savedReviews ? JSON.parse(savedReviews) : initialReviews;
//   });

//   useEffect(() => {
//     localStorage.setItem('userReviews', JSON.stringify(reviews));
//   }, [reviews]);

//   // --- DATABASE CODE START ---
//   const addNewReview = async (newReview) => {
//     const reviewWithId = {
//       ...newReview,
//       id: Date.now(),
//       location: "Gorakhpur (Verified Customer)",
//       rating: Number(newReview.rating)
//     };

//     /* AGAR DATABASE ME BHEJNA HO TOH:
       
//        try {
//          const response = await fetch('https://your-api-endpoint.com/reviews', {
//            method: 'POST',
//            headers: { 'Content-Type': 'application/json' },
//            body: JSON.stringify(reviewWithId)
//          });
         
//          if(response.ok) {
//            const savedData = await response.json();
//            setReviews([savedData, ...reviews]); 
//          }
//        } catch (error) {
//          console.error("Database Error:", error);
//        }
//     */

//     setReviews([reviewWithId, ...reviews]);
//   };
//   // --- DATABASE CODE END ---

//   return (
//     <section className="py-10 bg-[#f8fafc] font-poppins">
//       <div className="max-w-6xl mx-auto px-4">
//         {/* Header */}
//         <div className="text-center mb-8">
//           <span className="text-green-600 font-bold uppercase tracking-widest text-[11px]">Testimonials</span>
//           <h2 className="text-3xl font-black text-gray-900 mt-1">What Our Customers Say</h2>
//           <button 
//             onClick={() => setIsModalOpen(true)}
//             className="mt-4 inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-5 py-2.5 rounded-lg font-bold text-sm shadow-md"
//           >
//             <PlusCircle size={18} /> Write a Review
//           </button>
//         </div>

//         {/* Review Cards Container - Scroll added for more than 6 cards */}
//         <div className="max-h-[800px] overflow-y-auto pr-2 custom-scrollbar">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
//             {reviews.map((review) => (
//               <div key={review.id} className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm relative">
//                 <Quote className="absolute top-4 right-6 text-green-50 w-10 h-10" />
//                 <div className="flex gap-0.5 mb-3">
//                   {[...Array(review.rating)].map((_, i) => (
//                     <Star key={i} size={15} className="fill-green-600 text-green-600" />
//                   ))}
//                 </div>
//                 <p className="text-gray-700 text-sm italic leading-relaxed mb-4">"{review.text}"</p>
//                 <div className="flex justify-between items-center border-t border-gray-50 pt-3">
//                   <div>
//                     <h4 className="font-bold text-gray-900 text-sm">{review.name}</h4>
//                     <p className="text-gray-400 text-[11px]">{review.location}</p>
//                   </div>
//                   <span className="bg-green-50 text-green-700 text-[10px] font-bold px-2 py-1 rounded-md">
//                     {review.service}
//                   </span>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {isModalOpen && (
//           <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm z-[999] flex items-center justify-center p-4">
//             <ReviewForm onClose={() => setIsModalOpen(false)} onSubmitReview={addNewReview} />
//           </div>
//         )}
//       </div>
//     </section>
//   );
// };

// export default CustomerReviews;