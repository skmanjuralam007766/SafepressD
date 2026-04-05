import React from 'react';
import { motion } from 'motion/react';
import { Shield, Phone, MapPin, Mic, AlertTriangle, CheckCircle, Clock } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Card, Button, Badge } from '../../components/ui/Shared';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { toast } from 'sonner';

const data = [
  { name: 'Mon', score: 85 },
  { name: 'Tue', score: 88 },
  { name: 'Wed', score: 82 },
  { name: 'Thu', score: 90 },
  { name: 'Fri', score: 85 },
  { name: 'Sat', score: 95 },
  { name: 'Sun', score: 88 },
];

const ActionCard = ({ icon: Icon, title, color, path, delay }: any) => (
  <Link to={path} className="block">
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className={`h-full p-6 rounded-3xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-md transition-all cursor-pointer group flex flex-col items-center justify-center text-center gap-3 relative overflow-hidden`}
    >
      <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity ${
        color === 'red' ? 'bg-red-500' :
        color === 'purple' ? 'bg-purple-500' :
        color === 'blue' ? 'bg-blue-500' :
        'bg-indigo-500'
      }`} />
      <div className={`w-16 h-16 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform ${
        color === 'red' ? 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400' :
        color === 'purple' ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400' :
        color === 'blue' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' :
        'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400'
      }`}>
        <Icon size={32} strokeWidth={2.5} />
      </div>
      <span className="font-semibold text-slate-700 dark:text-slate-200">{title}</span>
    </motion.div>
  </Link>
);

export const DashboardMain = () => {
  const navigate = useNavigate();

  const handleSOS = () => {
    toast.error('Emergency SOS activated!', {
      duration: 5000,
      action: {
        label: 'Dismiss',
        onClick: () => toast.dismiss(),
      },
    });
    navigate('/dashboard/sos');
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-200">Welcome back, Manjur</h1>
          <p className="text-slate-500 dark:text-slate-400">You are currently in a <span className="text-green-600 font-medium">Safe Zone</span></p>
        </div>
        <div className="bg-white dark:bg-slate-800 px-4 py-2 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 flex items-center gap-3">
          <div className="text-right">
            <p className="text-xs text-slate-400 font-medium uppercase">Current Status</p>
            <p className="text-green-600 font-medium">Secure</p>
          </div>
          <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse shadow-[0_0_0_4px_rgba(34,197,94,0.2)]" />
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <ActionCard icon={AlertTriangle} title="Emergency SOS" color="red" path="/dashboard/sos" delay={0.1} />
        <ActionCard icon={Mic} title="AI Assistant" color="purple" path="/dashboard/ai" delay={0.2} />
        <ActionCard icon={MapPin} title="Live Location" color="blue" path="/dashboard/map" delay={0.3} />
        <ActionCard icon={Phone} title="Contacts" color="indigo" path="/dashboard/settings" delay={0.4} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Safety Score & Chart */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="!p-0 overflow-hidden">
            <div className="p-6 flex items-center justify-between border-b border-slate-50 dark:border-slate-700">
              <h2 className="font-bold text-lg text-slate-800 dark:text-slate-100">Safety Trends</h2>
              <Badge variant="success">This Week</Badge>
            </div>
            <div className="h-64 w-full mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data}>
                  <defs>
                    <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#1976F3" stopOpacity={0.2}/>
                      <stop offset="95%" stopColor="#1976F3" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                  <YAxis hide domain={[0, 100]} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                  />
                  <Area type="monotone" dataKey="score" stroke="#1976F3" strokeWidth={3} fillOpacity={1} fill="url(#colorScore)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card>
            <h2 className="font-bold text-lg text-slate-800 dark:text-slate-100 mb-4">Recent Activity</h2>
            <div className="space-y-4">
              {[
                { title: "Entered Safe Zone: Home", time: "10:30 AM", icon: CheckCircle, color: "text-green-500 dark:text-green-400", bg: "bg-green-50 dark:bg-green-900/30" },
                { title: "Weekly Safety Report Ready", time: "Yesterday", icon: Shield, color: "text-blue-500 dark:text-blue-400", bg: "bg-blue-50 dark:bg-blue-900/30" },
                { title: "Low Battery Warning", time: "Yesterday", icon: AlertTriangle, color: "text-amber-500 dark:text-amber-400", bg: "bg-amber-50 dark:bg-amber-900/30" },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full ${item.bg} flex items-center justify-center ${item.color}`}>
                      <item.icon size={20} />
                    </div>
                    <div>
                      <p className="font-medium text-slate-800 dark:text-slate-200">{item.title}</p>
                      <p className="text-xs text-slate-400 dark:text-slate-500">System Alert</p>
                    </div>
                  </div>
                  <span className="text-xs text-slate-400 dark:text-slate-500 font-medium">{item.time}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Sidebar Cards */}
        <div className="space-y-6">
          <Card className="bg-gradient-to-br from-[#1976F3] to-[#4CC3FF] text-white border-none">
            <div className="flex justify-between items-start mb-4">
              <Shield size={32} className="opacity-80" />
              <span className="text-blue-100 text-sm font-medium bg-white/20 px-2 py-1 rounded-lg backdrop-blur-sm">High Safety</span>
            </div>
            <div className="mb-2">
              <span className="text-5xl font-bold">85%</span>
            </div>
            <p className="text-blue-100 text-sm mb-6">Your safety score is better than 92% of users in your area.</p>
            <Button 
              className="w-full bg-white text-blue-600 hover:bg-blue-50 shadow-none border-none"
              onClick={() => {
                toast.info('Safety Score Details', {
                  description: 'Your score is calculated based on location history, safe zones visited, and emergency response readiness.',
                  duration: 5000,
                });
              }}
            >
              View Details
            </Button>
          </Card>

          <Card className="relative overflow-hidden">
             <div className="absolute top-0 right-0 w-32 h-32 bg-purple-100 dark:bg-purple-900/20 rounded-bl-full -mr-8 -mt-8 opacity-50" />
             <h3 className="font-bold text-slate-800 dark:text-slate-100 mb-1 relative z-10">Digital ID</h3>
             <p className="text-xs text-slate-500 dark:text-slate-400 mb-4 relative z-10">Verified & Active</p>
             
             <div className="bg-slate-50 dark:bg-slate-700 rounded-xl p-3 border border-slate-100 dark:border-slate-600 mb-4 flex items-center gap-3 relative z-10">
                <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-600 overflow-hidden">
                   <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100" alt="Profile" className="w-full h-full object-cover" />
                </div>
                <div>
                   <p className="text-sm font-bold text-slate-800 dark:text-slate-100">SK Manjur Alma</p>
                   <p className="text-[10px] text-slate-400 dark:text-slate-500 font-mono">ID: SP4G9K2W1B7Q</p>
                </div>
             </div>
             
             <Link to="/dashboard/id">
                <Button variant="outline" size="sm" className="w-full relative z-10">View Full ID</Button>
             </Link>
          </Card>
        </div>
      </div>
    </div>
  );
};