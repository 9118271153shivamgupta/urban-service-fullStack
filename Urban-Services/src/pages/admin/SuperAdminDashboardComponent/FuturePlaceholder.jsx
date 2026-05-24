// src/pages/admin/admindashboardcomponent/FuturePlaceholder.jsx
import React from 'react';
import { Grid } from 'lucide-react';

const FuturePlaceholder = ({ title, subtitle }) => {
  return (
    <div className="p-8 rounded-3xl bg-[#061437] border border-blue-900/30 min-h-[400px] flex flex-col justify-center items-center text-center animate-in fade-in duration-300">
      <div className="w-16 h-16 rounded-2xl bg-blue-600/10 text-blue-400 flex items-center justify-center border border-blue-500/20 mb-4 animate-pulse">
        <Grid size={28} />
      </div>
      <h2 className="text-2xl font-black tracking-tight text-white uppercase">{title}</h2>
      <p className="text-gray-400 text-xs font-medium uppercase tracking-widest mt-2 max-w-sm">
        {subtitle || 'This module code will be injected in next feature sprint.'}
      </p>
    </div>
  );
};

export default FuturePlaceholder;