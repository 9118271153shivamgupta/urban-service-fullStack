import React from 'react';

const StatCard = ({ icon, color, label, value }) => (
    <div className="bg-[#061437] border border-blue-900/30 p-4 rounded-xl flex items-center gap-4 min-w-[160px] shadow-lg">
        <div className={`w-12 h-12 ${color} rounded-xl flex items-center justify-center shadow-lg shadow-black/40 text-white`}>
            {icon}
        </div>
        <div>
            <h4 className="text-xl font-bold text-white">{value}</h4>
            <p className="text-[10px] text-gray-400 uppercase tracking-widest">{label}</p>
        </div>
    </div>
);

export default StatCard;