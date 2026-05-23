import React from 'react';
import { motion } from 'framer-motion';
import { FaInstagram, FaFacebookF, FaTwitter, FaLinkedinIn } from 'react-icons/fa';

const TopBar = () => {
  // Social media links - click karne par login page khulega
  const socialLinks = [
    { icon: <FaFacebookF />, url: "https://www.facebook.com/login" },
    { icon: <FaInstagram />, url: "https://www.instagram.com/accounts/login" },
    { icon: <FaTwitter />, url: "https://twitter.com/login" },
    { icon: <FaLinkedinIn />, url: "https://www.linkedin.com/login" },
  ];

  return (
    <div className="bg-black text-white py-2 px-4 md:px-10 border-b border-gray-800 w-full font-poppins">
      <div className="max-w-[1600px] mx-auto flex justify-between items-center">
        
        {/* LEFT SIDE: Social Media Icons */}
         <div className="flex items-center">
          <motion.a 
            href="tel:+917897222542"
            className="flex items-center gap-2 group"
          >
            <span className="text-[10px] md:text-sm font-bold text-white uppercase tracking-widest hidden sm:inline">
              Support:
            </span>
            <span className="text-xs md:text-sm font-bold tracking-tighter group-hover:underline decoration-1 underline-offset-4">
              +91- 7897222542
            </span>
          </motion.a>
        </div>
        

        {/* RIGHT SIDE: Fixed Phone Number */}
        <div className="flex items-center gap-4">
          {socialLinks.map((social, index) => (
            <motion.a
              key={index}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2, color: "#a855f7" }} // Hover par halka purple/gray effect
              className="text-gray-400 hover:text-white text-sm md:text-base transition-colors cursor-pointer"
            >
              {social.icon}
            </motion.a>
          ))}
        </div>

      </div>
    </div>
  );
};

export default TopBar;