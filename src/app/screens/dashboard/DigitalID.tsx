import React, { useState } from 'react';
import { Card, Button, Badge } from '../../components/ui/Shared';
import { ShieldCheck, Download, Edit2, Phone, Share2, MapPin } from 'lucide-react';
import { motion } from 'motion/react';
import { toast } from 'sonner';

export const DigitalID = () => {
  const [autoShare, setAutoShare] = useState(false);
  const [sosCall, setSosCall] = useState(false);

  const handleDownload = () => {
    toast.success("Digital ID downloaded successfully");
  };

  const toggleAutoShare = () => {
    setAutoShare(!autoShare);
    toast.success(`Auto-Share Location ${!autoShare ? 'enabled' : 'disabled'}`);
  };

  const toggleSosCall = () => {
    setSosCall(!sosCall);
    toast.success(`One-Tap SOS Call ${!sosCall ? 'enabled' : 'disabled'}`);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100">Digital Identity</h1>
        <Button variant="outline" size="sm" className="gap-2" onClick={handleDownload}>
          <Download size={16} /> Download ID
        </Button>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* ID Card Front */}
        <motion.div 
          initial={{ rotateY: 90, opacity: 0 }}
          animate={{ rotateY: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="relative perspective-1000"
        >
          <div className="w-full aspect-[1.586] bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl overflow-hidden shadow-2xl relative text-white p-6 md:p-8 flex flex-col justify-between">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10" 
                 style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '24px 24px' }}>
            </div>
            
            {/* Header */}
            <div className="flex justify-between items-start relative z-10">
              <div className="flex items-center gap-2">
                 <ShieldCheck className="text-blue-400" size={28} />
                 <span className="font-bold text-lg tracking-wide">SafePress</span>
              </div>
              <div className="px-3 py-1 bg-green-500/20 border border-green-500/50 rounded-full">
                <span className="text-green-400 text-xs font-bold uppercase tracking-wider">Verified</span>
              </div>
            </div>

            {/* Content */}
            <div className="flex gap-4 md:gap-6 relative z-10 mt-6">
              <div className="w-28 h-28 md:w-32 md:h-32 rounded-2xl bg-slate-700 border-2 border-slate-600 overflow-hidden shrink-0">
                <img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8TUVOfGVufDB8fDB8fHww" alt="Profile" className="w-full h-full object-cover" />
              </div>
              <div className="space-y-3 flex-1 min-w-0">
                <div>
                  <p className="text-blue-300 text-xs md:text-sm uppercase tracking-wider font-semibold">Name</p>
                  <h3 className="text-xl md:text-2xl font-bold tracking-tight text-white">SK Manjur Alam</h3>
                </div>
                
                <div>
                  <p className="text-blue-300 text-xs md:text-sm uppercase tracking-wider font-semibold">Date of Birth</p>
                  <p className="font-mono text-base md:text-lg font-medium text-white">29 APRIL 2004</p>
                </div>
                
                <div>
                  <p className="text-blue-300 text-xs md:text-sm uppercase tracking-wider font-semibold">Blood Group</p>
                  <p className="font-mono text-base md:text-lg font-medium text-white">A+</p>
                </div>
                
                <div>
                  <p className="text-blue-300 text-xs md:text-sm uppercase tracking-wider font-semibold">Verified Contact</p>
                  <p className="font-mono text-sm md:text-base font-medium text-white">+91 9641188657</p>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="flex justify-between items-end relative z-10 mt-6">
               <div>
                  <p className="text-blue-300 text-xs uppercase tracking-wider font-semibold">Aadhaar (Masked)</p>
                  <p className="font-mono text-sm md:text-base font-medium text-white">XXXX XXXX 8921</p>
               </div>
               <div className="text-right">
                  <p className="text-blue-300 text-xs uppercase tracking-wider font-semibold">ID Number</p>
                  <p className="font-mono text-lg md:text-xl text-blue-400 font-bold tracking-widest">SP4G9K2W</p>
               </div>
            </div>
          </div>
        </motion.div>

        {/* Details & Settings */}
        <div className="space-y-6">
          <Card>
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-slate-800 dark:text-slate-100">Verification Status</h3>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0 rounded-full">
                <Edit2 size={14} />
              </Button>
            </div>
            <div className="space-y-3">
              {[
                { label: "Phone Verified", status: true },
                { label: "Email Verified", status: true },
                { label: "Biometric Scan", status: true },
                { label: "Emergency Contacts", status: true },
                { label: "Home Location", status: true },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between py-2 border-b border-slate-50 dark:border-slate-700 last:border-0">
                  <span className="text-sm text-slate-600 dark:text-slate-300">{item.label}</span>
                  {item.status ? (
                    <span className="text-green-500 dark:text-green-400 flex items-center gap-1 text-xs font-medium bg-green-50 dark:bg-green-900/30 px-2 py-1 rounded-full">
                      <ShieldCheck size={12} /> Verified
                    </span>
                  ) : (
                    <span className="text-amber-500 dark:text-amber-400 text-xs font-medium bg-amber-50 dark:bg-amber-900/30 px-2 py-1 rounded-full">Pending</span>
                  )}
                </div>
              ))}
            </div>
          </Card>

          <Card>
            <h3 className="font-bold text-slate-800 dark:text-slate-100 mb-4">Emergency Settings</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-500 dark:text-blue-400 flex items-center justify-center">
                    <Share2 size={16} />
                  </div>
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Auto-Share Location</span>
                </div>
                <div 
                  className={`w-10 h-6 ${autoShare ? 'bg-green-500' : 'bg-slate-300 dark:bg-slate-600'} rounded-full relative cursor-pointer transition-colors`}
                  onClick={toggleAutoShare}
                >
                  <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm transition-all ${autoShare ? 'right-1' : 'left-1'}`} />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-red-50 dark:bg-red-900/30 text-red-500 dark:text-red-400 flex items-center justify-center">
                    <Phone size={16} />
                  </div>
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">One-Tap SOS Call</span>
                </div>
                <div 
                  className={`w-10 h-6 ${sosCall ? 'bg-green-500' : 'bg-slate-300 dark:bg-slate-600'} rounded-full relative cursor-pointer transition-colors`}
                  onClick={toggleSosCall}
                >
                  <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm transition-all ${sosCall ? 'right-1' : 'left-1'}`} />
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};