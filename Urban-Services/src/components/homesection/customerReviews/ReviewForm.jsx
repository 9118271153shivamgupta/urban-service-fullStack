import React, { useState } from 'react';
import { X } from 'lucide-react';

const ReviewForm = ({ onClose, onSubmitReview }) => {
  const [formData, setFormData] = useState({
    name: '',
    service: 'AC Repair',
    rating: 5,
    text: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Yahan sirf function call ho rahi hai, baki logic parent me hai
    onSubmitReview(formData);
    onClose();
  };

  return (
    <div className="bg-white w-full max-w-md rounded-2xl p-6 relative shadow-2xl max-h-[90vh] overflow-y-auto font-poppins">
      <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-green-600">
        <X size={20} />
      </button>

      <h3 className="text-xl font-black text-gray-900 mb-5">Submit Your Review</h3>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-[11px] font-bold text-gray-500 mb-1 uppercase tracking-tight">Full Name</label>
          <input 
            required
            type="text" 
            className="w-full bg-gray-50 border border-gray-200 p-2 rounded-lg text-sm outline-none focus:border-green-500"
            onChange={(e) => setFormData({...formData, name: e.target.value})}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-[11px] font-bold text-gray-500 mb-1 uppercase tracking-tight">Service</label>
            <select 
              className="w-full bg-gray-50 border border-gray-200 p-2 rounded-lg text-sm outline-none"
              onChange={(e) => setFormData({...formData, service: e.target.value})}
            >
              <option>AC Repair</option>
              <option>Electrician</option>
              <option>Plumbing</option>
              <option>Cleaning</option>
            </select>
          </div>
          <div>
            <label className="block text-[11px] font-bold text-gray-500 mb-1 uppercase tracking-tight">Rating</label>
            <input 
              type="number" min="1" max="5" defaultValue="5"
              className="w-full bg-gray-50 border border-gray-200 p-2 rounded-lg text-sm"
              onChange={(e) => setFormData({...formData, rating: e.target.value})}
            />
          </div>
        </div>

        <div>
          <label className="block text-[11px] font-bold text-gray-500 mb-1 uppercase tracking-tight">Message</label>
          <textarea 
            required
            rows="3"
            className="w-full bg-gray-50 border border-gray-200 p-2 rounded-lg text-sm outline-none focus:border-green-500"
            onChange={(e) => setFormData({...formData, text: e.target.value})}
          ></textarea>
        </div>

        <button type="submit" className="w-full bg-green-600 text-white py-3 rounded-lg font-bold text-sm hover:bg-green-700 transition-all">
          Submit Review
        </button>
      </form>
    </div>
  );
};

export default ReviewForm;