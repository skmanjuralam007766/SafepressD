import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Button } from '../../components/ui/Shared';
import { Siren, Phone, Shield, Clock, MapPin } from 'lucide-react';
import { motion } from 'motion/react';

export const SOSActive = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-2xl mx-auto space-y-6 pt-8">
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="rounded-3xl bg-red-600 text-white p-8 shadow-2xl shadow-red-200 relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full blur-3xl -mr-16 -mt-16" />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/diagonal-stripes.png')] opacity-10" />
        
        <div className="relative z-10 text-center space-y-4">
          <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto animate-pulse">
            <Siren size={40} className="text-white" />
          </div>
          
          <div>
            <h1 className="text-3xl font-bold mb-1">Emergency Response Active</h1>
            <p className="text-red-100">Help is on the way to your location</p>
          </div>

          <div className="grid grid-cols-3 gap-4 pt-6">
             <div className="bg-white/10 rounded-2xl p-3 backdrop-blur-sm">
                <p className="text-xs text-red-200 uppercase font-bold mb-1">Status</p>
                <p className="font-bold">RESPONDING</p>
             </div>
             <div className="bg-white/10 rounded-2xl p-3 backdrop-blur-sm">
                <p className="text-xs text-red-200 uppercase font-bold mb-1">ETA</p>
                <p className="font-bold text-xl">3-5 <span className="text-sm font-normal">min</span></p>
             </div>
             <div className="bg-white/10 rounded-2xl p-3 backdrop-blur-sm">
                <p className="text-xs text-red-200 uppercase font-bold mb-1">ID</p>
                <p className="font-mono font-bold">#SOS-992</p>
             </div>
          </div>
        </div>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card className="space-y-4">
           <h3 className="font-bold text-slate-800 flex items-center gap-2">
              <Shield size={18} className="text-blue-500" /> Responding Units
           </h3>
           <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-xl border border-blue-100">
                 <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-blue-600 shadow-sm">
                       <Siren size={20} />
                    </div>
                    <div>
                       <p className="font-bold text-slate-800">Police Unit 402</p>
                       <p className="text-xs text-slate-500">2.1 km away</p>
                    </div>
                 </div>
                 <Button variant="secondary" size="sm" className="h-8 w-8 p-0 rounded-full">
                    <Phone size={14} />
                 </Button>
              </div>

              <div className="flex items-center justify-between p-3 bg-red-50 rounded-xl border border-red-100">
                 <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-red-600 shadow-sm">
                       <Shield size={20} />
                    </div>
                    <div>
                       <p className="font-bold text-slate-800">Ambulance A-12</p>
                       <p className="text-xs text-slate-500">3.5 km away</p>
                    </div>
                 </div>
                 <Button variant="secondary" size="sm" className="h-8 w-8 p-0 rounded-full">
                    <Phone size={14} />
                 </Button>
              </div>
           </div>
        </Card>

        <Card className="space-y-4">
           <h3 className="font-bold text-slate-800 flex items-center gap-2">
              <Clock size={18} className="text-amber-500" /> Immediate Actions
           </h3>
           <ul className="space-y-3">
              {[
                 "Stay in your current location if safe",
                 "Keep your phone line open",
                 "Have your ID ready for responders",
                 "Follow instructions from local authorities"
              ].map((item, i) => (
                 <li key={i} className="flex gap-3 text-sm text-slate-600 items-start">
                    <div className="w-1.5 h-1.5 rounded-full bg-slate-300 mt-1.5 shrink-0" />
                    {item}
                 </li>
              ))}
           </ul>
        </Card>
      </div>

      <Button variant="secondary" onClick={() => navigate('/dashboard')} className="w-full">
        Return to Dashboard (Safety Confirmed)
      </Button>
    </div>
  );
};
