import React, { useState } from 'react';
import { Card, Button, Badge } from '../../components/ui/Shared';
import { Map, AlertCircle, AlertTriangle, Navigation, Locate, Layers, User } from 'lucide-react';
import { motion } from 'motion/react';

export const LiveMap = () => {
  const [activeTab, setActiveTab] = useState<'live' | 'heatmap' | 'history'>('live');

  return (
    <div className="flex flex-col gap-4 pb-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 shrink-0">
        <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Live Incident Map</h1>
        <div className="flex bg-white dark:bg-slate-800 rounded-xl p-1 shadow-sm border border-slate-200 dark:border-slate-700">
          {(['live', 'heatmap', 'history'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all whitespace-nowrap ${
                activeTab === tab 
                  ? 'bg-slate-800 dark:bg-white text-white dark:text-slate-800 shadow-md' 
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-700'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)} View
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-4">
        {/* Map Area */}
        <div className="w-full lg:flex-1 bg-slate-100 dark:bg-slate-800 rounded-3xl relative overflow-hidden shadow-inner border border-slate-200 dark:border-slate-700 group h-[450px] sm:h-[500px] lg:h-[calc(100vh-12rem)]">
          {/* Mock Map Background */}
          <div className="absolute inset-0 bg-[#E5E9F0] bg-[url('https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/World_map_blank_without_borders.svg/2000px-World_map_blank_without_borders.svg.png')] bg-cover bg-center opacity-30 grayscale" />
          
          {/* Grid lines for map feel */}
          <div className="absolute inset-0" 
             style={{ backgroundImage: 'linear-gradient(#cbd5e1 1px, transparent 1px), linear-gradient(90deg, #cbd5e1 1px, transparent 1px)', backgroundSize: '40px 40px', opacity: 0.3 }}>
          </div>

          {/* User Location */}
          <motion.div 
            initial={{ scale: 0 }} animate={{ scale: 1 }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20"
          >
            <div className="w-4 h-4 bg-blue-500 rounded-full ring-4 ring-white shadow-lg relative">
              <div className="absolute -inset-4 bg-blue-500/20 rounded-full animate-ping" />
            </div>
            <div className="absolute top-6 left-1/2 -translate-x-1/2 bg-white px-2 py-1 rounded-md text-[10px] font-bold shadow-md whitespace-nowrap">
              You are here
            </div>
          </motion.div>

          {/* Incidents */}
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
            className="absolute top-1/3 left-1/3 z-10"
          >
            <div className="w-8 h-8 bg-red-500 rounded-full border-2 border-white shadow-lg flex items-center justify-center text-white animate-bounce">
              <AlertCircle size={16} />
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}
            className="absolute bottom-1/4 right-1/4 z-10"
          >
            <div className="w-8 h-8 bg-amber-400 rounded-full border-2 border-white shadow-lg flex items-center justify-center text-white">
              <AlertTriangle size={16} />
            </div>
          </motion.div>

          {/* Map Controls */}
          <div className="absolute right-2 sm:right-4 bottom-20 sm:bottom-24 flex flex-col gap-2 z-30">
            <Button variant="secondary" className="w-9 h-9 sm:w-10 sm:h-10 p-0 rounded-xl shadow-lg">
               <Navigation size={16} className="sm:w-[18px] sm:h-[18px]" />
            </Button>
            <Button variant="secondary" className="w-9 h-9 sm:w-10 sm:h-10 p-0 rounded-xl shadow-lg">
               <Locate size={16} className="sm:w-[18px] sm:h-[18px]" />
            </Button>
            <Button variant="secondary" className="w-9 h-9 sm:w-10 sm:h-10 p-0 rounded-xl shadow-lg">
               <Layers size={16} className="sm:w-[18px] sm:h-[18px]" />
            </Button>
          </div>

          {/* SOS Button Overlay */}
          <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-30">
             <Button variant="danger" size="lg" className="rounded-full shadow-xl shadow-red-500/30 px-6 sm:px-8 py-4 sm:py-6 text-base sm:text-lg font-bold tracking-wider animate-pulse">
                SOS ALERT
             </Button>
          </div>
        </div>

        {/* Side Panel */}
        <div className="w-full lg:w-80 shrink-0 flex flex-col gap-4 min-h-[300px] lg:min-h-0">
          <Card className="bg-slate-800 text-white border-none">
             <h3 className="text-slate-400 text-xs font-bold uppercase mb-1">Active Incidents</h3>
             <div className="flex items-end gap-2">
                <span className="text-4xl font-bold">12</span>
                <span className="text-green-400 text-sm font-medium mb-1">-2 from last hour</span>
             </div>
          </Card>

          <Card className="flex-1 overflow-hidden flex flex-col !p-0">
             <div className="p-4 border-b border-slate-100 bg-slate-50">
                <h3 className="font-bold text-slate-800">Nearby Activity</h3>
             </div>
             <div className="overflow-y-auto p-2 space-y-1">
                {[
                  { type: "Critical", title: "Fire reported in Sector 4", dist: "1.2 km", time: "2m ago", color: "red" },
                  { type: "Warning", title: "Heavy traffic on Main St", dist: "0.5 km", time: "5m ago", color: "amber" },
                  { type: "Safety", title: "Police patrol nearby", dist: "0.2 km", time: "10m ago", color: "blue" },
                  { type: "Critical", title: "Accident reported", dist: "2.5 km", time: "15m ago", color: "red" },
                ].map((item, i) => (
                  <div key={i} className="p-3 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer group">
                     <div className="flex justify-between items-start mb-1">
                        <Badge className={`bg-${item.color}-100 text-${item.color}-700 border border-${item.color}-200`}>{item.type}</Badge>
                        <span className="text-xs text-slate-400">{item.time}</span>
                     </div>
                     <p className="text-sm font-semibold text-slate-800 mb-1 group-hover:text-blue-600 transition-colors">{item.title}</p>
                     <p className="text-xs text-slate-500 flex items-center gap-1">
                        <Navigation size={10} /> {item.dist} away
                     </p>
                  </div>
                ))}
             </div>
          </Card>
        </div>
      </div>
    </div>
  );
};