import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle2, ArrowRight } from 'lucide-react';

const HomeAbout = () => {
  const navigate = useNavigate();

  const points = [
  "Personalized service designed around your schedule and space.",
  "Guaranteed compliance with all health and safety protocols.",
  "Quality-focused management for a flawless finish every time.",
  "Eco-conscious experts trained in modern sanitization methods."
];

  return (
    <section className="pt-16  md:py-16 bg-white font-poppins overflow-hidden">
      <h2 className="text-3xl md:text-4xl lg:text-4xl font-extrabold text-black underline leading-tight text-center">
        About Urban Services
      </h2>
      <div className="max-w-[1440px] mx-auto  mt-15 px-6 sm:px-10 lg:px-16">

        <div className="grid lg:grid-cols-2 gap-10 items-center">


          {/* Left Side: Image with Badge */}
          <div className="relative group">
            <div className="relative rounded-[2rem] overflow-hidden shadow-2xl">
              <img
                src="./clean_brush.jpg"
                alt="Construction Workers"
                className="w-full h-[300px] md:h-[400px] object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            {/* Orange Badge */}
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 md:translate-x-0 md:left-auto md:right-8 bg-black text-white px-8 py-4 rounded-2xl shadow-xl z-10 w-[85%] md:w-auto">
              <p className="text-lg md:text-xl font-extrabold italic text-center whitespace-nowrap">
                "Precision Over Volume"
              </p>
            </div>
          </div>

          {/* Right Side: Content */}
          <div className="flex flex-col items-start space-y-4 md:space-y-6">
            {/* <h2 className="text-3xl md:text-4xl lg:text-4xl font-extrabold text-[rgb(28,65,5)] leading-tight center"> Noble hand</h2> */}
            <h2 className="text-3xl md:text-3xl lg:text-3xl font-bold text-[#020617] leading-tight">
              We Provide More Than Just Manpower; We Deliver Solutions.
            </h2>

            <p className="text-black text-sm md:text-base leading-relaxed max-w-2xl">
              "Quality you can see, and service you can trust. UrbanServices is dedicated
              to elevating the standards of your home and office. We go beyond the basics,
              combining rigorous sanitization with a meticulous eye for detail to provide
              a workspace or residence that is safe, spotless, and inviting."
            </p>

            {/* Bullet Points */}
            <ul className="space-y-3">
              {points.map((text, index) => (
                <li key={index} className="flex items-start gap-3 group">
                  <div className="mt-1">
                    <CheckCircle2 className="text-black group-hover:scale-110 transition-transform" size={20} />
                  </div>
                  <span className="text-gray-700 font-medium text-sm md:text-base">{text}</span>
                </li>
              ))}
            </ul>

            {/* Learn More Button */}
            <button
              onClick={() => navigate('/about')}
              className="mt-4 group flex items-center gap-2 px-8 py-3.5 bg-black text-white rounded-xl font-bold hover:cursor-pointer transition-all duration-300 shadow-lg active:scale-95 text-sm md:text-base"
            >
              Learn More
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

        </div>
      </div>
    </section>
  );
};

export default HomeAbout;