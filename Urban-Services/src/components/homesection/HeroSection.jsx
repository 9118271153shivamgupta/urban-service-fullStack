import React from 'react';

const HeroSection = ({ onOpenForm }) => {
  return (
    <section className="relative w-full bg-white overflow-hidden flex items-center min-h-[60vh] md:min-h-[85vh] lg:min-h-[90vh]">
      
      {/* --- BACKGROUND IMAGE LAYER --- */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'url("./hero.jpg")', 
          backgroundSize: 'cover', // Image hamesha screen ko fill karegi
          backgroundPosition: 'center right',
          backgroundRepeat: 'no-repeat',
          width: '100%',
          height: '100%',
        }}
      ></div>

      {/* Background Curvy Design (Top & Bottom Waves) */}
      <div className="absolute top-0 left-0 right-0 h-32 opacity-40 z-1"
           style={{
             background: 'linear-gradient(180deg, #A5D6A7 0%, transparent 100%)',
             clipPath: 'ellipse(80% 50% at 50% 0%)'
           }}>
      </div>
      
      {/* <div className="absolute bottom-0 left-0 right-0 h-[30%] z-1"
           style={{
            //  background: 'linear-gradient(0deg, #A5D6A7 0%, #E8F5E9 60%, transparent 100%)',
            //  clipPath: 'ellipse(120% 80% at 50% 100%)'
           }}>
      </div> */}

      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 grid grid-cols-1 md:grid-cols-2 gap-4 items-center relative z-10 w-full">
        
        {/* Left Content: Text & CTA */}
        <div className="text-center md:text-left space-y-4 md:space-y-6">
          {/* Mobile par white color (text-white) aur desktop par aapka green (md:text-[#0A3622]) */}
          <h1 className="text-[38px] md:text-[42px] lg:text-[50px] font-[800] text-white md:text-red-600 leading-[1.1] tracking-tight">
            Excellence in Every  
            Corner: Cleaning You  
            Can Count On
          </h1>
          
          {/* Mobile par white color aur desktop par aapka original shade */}
          {/* <p className="text-black md:text-black-600 text-lg md:text-xl font-medium max-w-md mx-auto md:mx-0 opacity-90">
            "Reliable hands for a cleaner home. We bring perfection to every corner we touch."
          </p> */}
          
          <div className="pt-4">
            <button 
              onClick={onOpenForm}
              className="bg-black text-white px-10 py-3.5 rounded-full text-lg font-bold hover:cursor-pointer transition-all shadow-xl shadow-green-900/20 active:scale-95"
            >
              Book a Service
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};

export default HeroSection;