import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { 
  Users, ClipboardList, ShieldCheck, HardHat, 
  CheckCircle, XCircle, Clock, LayoutGrid, 
  Activity, ZapOff, TrendingUp, Loader2 
} from 'lucide-react';

const AnalyticsHome = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:5000/api/admin/dashboard-stats', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setStats(res.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) return <div className="h-64 flex items-center justify-center"><Loader2 className="animate-spin text-blue-500" size={40}/></div>;

  const cardData = [
    { title: "Total Leads", value: stats.totalLeads, icon: <ClipboardList />, color: "text-blue-500", bg: "bg-blue-500/10" },
    { title: "Today's Leads", value: stats.todayLeads, icon: <Clock />, color: "text-yellow-500", bg: "bg-yellow-500/10" },
    { title: "Follow Up (Accepted)", value: stats.acceptedLeads, icon: <TrendingUp />, color: "text-indigo-500", bg: "bg-indigo-500/10" },
    { title: "Completed Leads", value: stats.completedLeads, icon: <CheckCircle />, color: "text-green-500", bg: "bg-green-500/10" },
    { title: "Cancelled Leads", value: stats.cancelledLeads, icon: <XCircle />, color: "text-red-500", bg: "bg-red-500/10" },
    { title: "Total Customers", value: stats.totalCustomers, icon: <Users />, color: "text-pink-500", bg: "bg-pink-500/10" },
    { title: "Total Admins", value: stats.totalAdmins, icon: <ShieldCheck />, color: "text-cyan-500", bg: "bg-cyan-500/10" },
    { title: "Total Services", value: stats.totalServices, icon: <LayoutGrid />, color: "text-purple-500", bg: "bg-purple-500/10" },
    { title: "Active Services", value: stats.activeServicesCount, icon: <Activity />, color: "text-emerald-500", bg: "bg-emerald-500/10" },
    { title: "Inactive Services", value: stats.inactiveServicesCount, icon: <ZapOff />, color: "text-orange-500", bg: "bg-orange-500/10" },
    { title: "Total Providers", value: stats.totalProviders, icon: <HardHat />, color: "text-amber-500", bg: "bg-amber-500/10" },
    { title: "Success Rate", value: stats.successRate + "%", icon: <CheckCircle />, color: "text-white", bg: "bg-blue-600" },
  ];

  return (
    <div className="animate-in fade-in duration-500 bg-white">
      <div className="mb-8 flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-black tracking-tight">Analytics Overview</h1>
          <p className="text-gray-500 text-sm">Real-time data synchronization from all modules.</p>
        </div>
        <div className="text-xs bg-[#061437] px-3 py-1 rounded-full border border-blue-900/30 text-blue-400">
          Last Updated: Just Now
        </div>
      </div>

      {/* --- STATS GRID --- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mb-10">
        {cardData.map((card, index) => (
          <div key={index} className="bg-[#061437] p-5 rounded-2xl border border-blue-900/20 hover:border-blue-500/50 transition-all cursor-default shadow-lg group">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-3xl font-extrabold text-white group-hover:scale-110 transition-transform origin-left">
                  {card.value}
                </p>
                <p className="text-[11px] text-gray-400 uppercase font-bold tracking-wider mt-1 italic">
                  {card.title}
                </p>
              </div>
              <div className={`${card.bg} ${card.color} p-3 rounded-xl shadow-inner`}>
                {React.cloneElement(card.icon, { size: 24 })}
              </div>
            </div>
            <div className="mt-4 h-1 w-full bg-blue-900/10 rounded-full overflow-hidden">
               <div className={`h-full ${card.color.replace('text', 'bg')} opacity-40`} style={{width: '60%'}}></div>
            </div>
          </div>
        ))}
      </div>

      {/* --- FOOTER TABLE PLACEHOLDER --- */}
      <div className="bg-[#061437] rounded-2xl border border-blue-900/10 overflow-hidden shadow-2xl">
        <div className="p-6 border-b border-blue-900/20 flex justify-between items-center">
          <h2 className="text-lg font-bold text-white">Recent Activity Log</h2>
          <button className="text-xs text-blue-400 bg-blue-500/5 px-3 py-1 rounded hover:bg-blue-500/10">View Full Logs</button>
        </div>
        <div className="p-16 text-center text-gray-600 italic">
          Data tables will be populated as leads are generated.
        </div>
      </div>
    </div>
  );
};

export default AnalyticsHome;