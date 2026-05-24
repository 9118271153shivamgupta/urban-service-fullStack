import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { 
  Users, ClipboardList, ShieldCheck, HardHat, 
  CheckCircle, XCircle, Clock, LayoutGrid, 
  Activity, ZapOff, TrendingUp, Loader2, AlertCircle 
} from 'lucide-react';

const AnalyticsHome = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // एरर हैंडल करने के लिए स्टेट

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:5000/api/admin/dashboard-stats', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setStats(res.data);
        setError(null);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch dashboard statistics. Please check your connection or login again.");
      } finally {
        setLoading(false); // चाहे सक्सेस हो या फेल, लोडिंग बंद होगी
      }
    };
    fetchStats();
  }, []);

  // 1. Loading State
  if (loading) return (
    <div className="h-96 flex flex-col items-center justify-center bg-[#000b21]">
      <Loader2 className="animate-spin text-blue-500 mb-4" size={45} />
      <p className="text-blue-300 font-bold animate-pulse text-xs uppercase tracking-widest">Loading Analytics...</p>
    </div>
  );

  // 2. Error State (अगर API काम नहीं कर रही या टोकन एक्सपायर है)
  if (error || !stats) return (
    <div className="h-96 flex flex-col items-center justify-center bg-[#061437]/50 border border-red-900/20 rounded-2xl p-6 text-center">
      <AlertCircle className="text-red-500 mb-3" size={40} />
      <h3 className="text-white font-bold text-lg">Backend Connection Error</h3>
      <p className="text-gray-400 text-xs mt-1 max-w-sm">{error || "Data is unavailable."}</p>
      <button 
        onClick={() => { setLoading(true); window.location.reload(); }} 
        className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold uppercase transition-all"
      >
        Retry Fetch
      </button>
    </div>
  );

  // 3. Stats Safe Extraction (Optional chaining के साथ सुरक्षित डेटा)
  const cardData = [
    { title: "Total Leads", value: stats?.totalLeads || 0, icon: <ClipboardList />, color: "text-blue-500", bg: "bg-blue-500/10" },
    { title: "Today's Leads", value: stats?.todayLeads || 0, icon: <Clock />, color: "text-yellow-500", bg: "bg-yellow-500/10" },
    { title: "Follow Up (Accepted)", value: stats?.acceptedLeads || 0, icon: <TrendingUp />, color: "text-indigo-500", bg: "bg-indigo-500/10" },
    { title: "Completed Leads", value: stats?.completedLeads || 0, icon: <CheckCircle />, color: "text-green-500", bg: "bg-green-500/10" },
    { title: "Cancelled Leads", value: stats?.cancelledLeads || 0, icon: <XCircle />, color: "text-red-500", bg: "bg-red-500/10" },
    { title: "Total Customers", value: stats?.totalCustomers || 0, icon: <Users />, color: "text-pink-500", bg: "bg-pink-500/10" },
    { title: "Total Admins", value: stats?.totalAdmins || 0, icon: <ShieldCheck />, color: "text-cyan-500", bg: "bg-cyan-500/10" },
    { title: "Total Services", value: stats?.totalServices || 0, icon: <LayoutGrid />, color: "text-purple-500", bg: "bg-purple-500/10" },
    { title: "Active Services", value: stats?.activeServicesCount || 0, icon: <Activity />, color: "text-emerald-500", bg: "bg-emerald-500/10" },
    { title: "Inactive Services", value: stats?.inactiveServicesCount || 0, icon: <ZapOff />, color: "text-orange-500", bg: "bg-orange-500/10" },
    { title: "Total Providers", value: stats?.totalProviders || 0, icon: <HardHat />, color: "text-amber-500", bg: "bg-amber-500/10" },
    { title: "Success Rate", value: (stats?.successRate || 0) + "%", icon: <CheckCircle />, color: "text-white", bg: "bg-blue-600" },
  ];

  return (
    // bg-white को हटाकर bg-[#000b21] किया गया है ताकि ब्लैक थीम बनी रहे
    <div className="animate-in fade-in duration-500 bg-[#000b21]">
      <div className="mb-8 flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-black text-white uppercase tracking-tighter">Analytics Overview</h1>
          <p className="text-blue-400/60 text-[10px] font-bold uppercase tracking-wide mt-0.5">Real-time data synchronization from all modules.</p>
        </div>
        <div className="text-[10px] bg-[#061437] px-3 py-1.5 rounded-full border border-blue-900/30 text-blue-400 font-bold uppercase tracking-wider">
          Last Updated: Just Now
        </div>
      </div>

      {/* --- STATS GRID --- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mb-10">
        {cardData.map((card, index) => (
          <div key={index} className="bg-[#061437] p-5 rounded-2xl border border-blue-900/20 hover:border-blue-500/40 transition-all cursor-default shadow-xl group">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-3xl font-black text-white group-hover:scale-105 transition-transform origin-left tracking-tight">
                  {card.value}
                </p>
                <p className="text-[10px] text-gray-400 uppercase font-black tracking-wider mt-1">
                  {card.title}
                </p>
              </div>
              <div className={`${card.bg} ${card.color} p-2.5 rounded-xl`}>
                {React.cloneElement(card.icon, { size: 20 })}
              </div>
            </div>
            <div className="mt-4 h-1 w-full bg-blue-900/20 rounded-full overflow-hidden">
               <div className={`h-full ${card.color.replace('text', 'bg')} opacity-40`} style={{width: '60%'}}></div>
            </div>
          </div>
        ))}
      </div>

      {/* --- FOOTER TABLE PLACEHOLDER --- */}
      <div className="bg-[#061437] rounded-2xl border border-blue-900/20 overflow-hidden shadow-2xl">
        <div className="p-5 border-b border-blue-900/20 flex justify-between items-center">
          <h2 className="text-sm font-black text-white uppercase tracking-wider">Recent Activity Log</h2>
          <button className="text-[10px] font-bold text-blue-400 bg-blue-500/5 border border-blue-500/10 px-3 py-1.5 rounded-lg hover:bg-blue-600 hover:text-white transition-all uppercase">View Full Logs</button>
        </div>
        <div className="p-16 text-center text-gray-500 font-bold text-xs uppercase tracking-widest">
          Data tables will be populated as leads are generated.
        </div>
      </div>
    </div>
  );
};

export default AnalyticsHome;