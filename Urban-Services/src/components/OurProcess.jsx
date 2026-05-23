import React from 'react';
import { ClipboardList, CalendarDays, UserCheck, CreditCard } from 'lucide-react';

const OurProcess = () => {
  const steps = [
  {
    id: "Step-1",
    title: "Request a Service",
    description: "Browse and select the perfect solution tailored to your requirements.",
    icon: ClipboardList,
  },
  {
    id: "Step-2",
    title: "Schedule Your Visit",
    description: "Coordinate a time and date that aligns perfectly with your busy lifestyle.",
    icon: CalendarDays,
  },
  {
    id: "Step-3",
    title: "Expert Deployment",
    description: "A certified Noblehand specialist arrives promptly at your location.",
    icon: UserCheck,
  },
  {
    id: "Step-4",
    title: "Quality Assurance",
    description: "Complete your payment only once the job meets our rigorous standards.",
    icon: CreditCard,
  },
];

  return (
    <section className="py-16 font-poppins">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Header Section */}
        <div className="text-center mb-12">
          <span className="text-black font-bold uppercase tracking-widest text-xs">
            Simple Process
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 mt-2">
            Our Path to Perfection
          </h2>
          <p className="text-gray-600 mt-3 text-sm md:text-base max-w-2xl mx-auto">
            "Elevate your standards of cleanliness. Securing your Urban Services specialist is an effortless experience—designed to be as smooth as the results we deliver."
          </p>
        </div>

        {/* Steps Container */}
        <div className="relative">
          {/* Connecting Line (Desktop Only) */}
          <div className="hidden lg:block absolute top-1/4 left-0 w-full h-0.5 bg-gray-200 -z-0"></div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            {steps.map((step, index) => (
              <div key={index} className="flex flex-col items-center text-center">
                
                {/* Icon & Number Circle */}
                <div className="relative mb-6">
                  {/* Step Number Badge */}
                  <div className="absolute -top-1 -right-1 w-20 h-6 bg-black rounded-lg text-white  flex items-center justify-center text-sm font-bold">
                    {step.id}
                  </div>
                  
                  {/* Main Icon Circle */}
                  <div className="w-24 h-24 rounded-full bg-white border-2 border-black flex items-center justify-center shadow-lg group hover:bg-black transition-all duration-300">
                    <step.icon className="w-10 h-10 text-black group-hover:text-white transition-colors" />
                  </div>
                </div>

                {/* Text Content */}
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed px-4">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurProcess;