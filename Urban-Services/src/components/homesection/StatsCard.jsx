const StatsCard = ({ value, label }) => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center py-4 md:py-6 border-r border-white/10 last:border-r-0">
      <h3 className="text-2xl md:text-4xl font-extrabold text-[#E65100]">
        {value}
      </h3>
      <p className="text-[10px] md:text-xs text-gray-400 uppercase tracking-widest mt-1">
        {label}
      </p>
    </div>
  );
};

export default StatsCard;