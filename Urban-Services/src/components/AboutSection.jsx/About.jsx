import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Users, Target, Award, CheckCircle2, Clock } from 'lucide-react';
import Footer from '../Footer';
import QuickConnect from '../QuickConnect';

const About = () => {
  const stats = [
    { label: 'Happy Clients', value: '500+', icon: Users },
    { label: 'Service Guarantee', value: '100%', icon: ShieldCheck },
    { label: 'Expert Staff', value: '50+', icon: Award },
    { label: 'Years Experience', value: '5+', icon: Clock },
  ];

  return (
    <div className="min-h-screen bg-white font-poppins">
      
      {/* --- HERO SECTION --- */}
      <section className="relative py-16 md:py-24 bg-purple-100 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-blue-100 rounded-l-full -z-0 hidden md:block" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                About <span className="text-black">Urban</span> Services
              </h1>
              <p className="text-gray-800 text-lg md:text-xl leading-relaxed">
                "Redefining home maintenance from Gorakhpur to Delhi. Serving Varanasi and Lucknow with a commitment to excellence. We don't just clean—we curate comfort through meticulous, expert care."
              </p>
              <div className="flex gap-4">
                <div className="bg-white p-4 rounded-2xl shadow-sm border border-black flex items-center gap-3">
                  <CheckCircle2 className="text-black" />
                  <span className="font-bold text-black">Verified Experts</span>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white aspect-video md:aspect-square">
                {/* Agar ye image nahi dikh rahi, toh aap apni local image ka path yahan daal sakte hain */}
                <img 
                  src="https://images.unsplash.com/photo-1581578731522-99c5f969215f?q=80&w=2070" 
                  alt="Our Team" 
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* --- STATS SECTION --- */}
      <section className="py-12 bg-black">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center space-y-2">
                <stat.icon className="mx-auto text-white" size={32} />
                <h3 className="text-3xl font-black text-white">{stat.value}</h3>
                <p className="text-white text-sm font-medium uppercase tracking-wider">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- MISSION & VISION --- */}
      <section className="py-20 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-black p-10 rounded-[2.5rem] flex flex-col justify-center">
            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-lg">
              <Target className="text-black" />
            </div>
            <h2 className="text-3xl font-black text-white mb-4">Our Mission</h2>
            <p className="text-white leading-relaxed font-medium">
              "Delhi se lekar Gorakhpur tak, aur Lucknow se Varanasi tak, hamari koshish hai har ghar ko behtar hygiene dena. Urban Services ke saath payein premium maintenance services, wo bhi aapke budget mein."
            </p>
          </div>

          <div className="bg-black p-10 rounded-[2.5rem] shadow-xl flex flex-col justify-center">
            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center mb-6">
              <ShieldCheck className="text-black" />
            </div>
            <h2 className="text-3xl font-black text-white mb-4">Our Vision</h2>
            <p className="text-white leading-relaxed font-medium">
              "Lucknow, Varanasi, Gorakhpur, aur Delhi—har shehar, har ghar mein Urban Services. Hum banna chahte hain aapke parivaar ka wo bharosemand sathi jo aapki lifestyle aur sukoon ka khayal rakhe."
            </p>
          </div>
        </div>
      </section>

      {/* --- WHY CHOOSE US --- */}
      <section className="pb-20 max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-black text-black">Why Choose UrbanServices?</h2>
          <div className="h-1.5 w-20 bg-black mx-auto mt-4 rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { t: 'Eco-Friendly', d: 'Safe chemicals for kids and pets.' },
            { t: 'Transparent Pricing', d: 'No hidden costs. Pay what you see.' },
            { t: 'Punctual Service', d: 'We value your time as much as ours.' }
          ].map((item, i) => (
            <div key={i} className="p-8 rounded-3xl bg-black transition-all text-center">
              <h4 className="font-black text-lg text-white mb-2">{item.t}</h4>
              <p className="text-white text-sm font-medium">{item.d}</p>
            </div>
          ))}
        </div>
      </section>
       <QuickConnect/>
      <Footer/>

    </div>
  );
};

export default About;