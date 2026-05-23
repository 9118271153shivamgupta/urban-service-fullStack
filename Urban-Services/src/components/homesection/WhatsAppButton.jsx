import { MessageCircle } from 'lucide-react';

const WhatsAppButton = ({ phoneNumber = "919118271153" }) => {
  const handleWhatsAppClick = () => {
    const message = encodeURIComponent("Hello! I'm interested in LB Services.");
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  };

  return (
    <button 
      onClick={handleWhatsAppClick}
      className="flex items-center gap-2 px-6 py-3 border cursor-pointer bg-green-900 border-green-900 rounded-lg text-white font-medium hover:bg-green-500 transition-all text-sm md:text-base"
    >
      <MessageCircle size={20} className="text-white" />
      WhatsApp Us
    </button>
  );
};

export default WhatsAppButton;