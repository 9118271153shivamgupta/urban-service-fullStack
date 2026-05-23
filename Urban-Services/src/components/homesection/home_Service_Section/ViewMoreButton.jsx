import React from 'react'

const ViewMoreButton = () => {
  return (
    <div>
      
                {/* --- VIEW MORE BUTTON --- */}
                 <button 
                    onClick={() => navigate('/services')} 
                    className="group flex items-center gap-3 px-8 py-3 border-2 border-black text-black font-bold uppercase text-xs tracking-widest hover:bg-black hover:text-white transition-all duration-300"
                  >
                    View All Services
                    <span className="group-hover:translate-x-2 transition-transform duration-300">→</span>
                  </button>
    </div>
  )
}

export default ViewMoreButton
