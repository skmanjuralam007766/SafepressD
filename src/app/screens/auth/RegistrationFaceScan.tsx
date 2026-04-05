import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Card } from '../../components/ui/Shared';
import { ScanFace, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';

export const RegistrationFaceScan = () => {
  const navigate = useNavigate();
  const [scanning, setScanning] = useState(false);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    if (scanning) {
      const timer = setTimeout(() => {
        setScanning(false);
        setCompleted(true);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [scanning]);

  const handleScan = () => {
    if (completed) {
      navigate('/auth/location');
    } else {
      setScanning(true);
    }
  };

  return (
    <Card className="w-full">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-2">Face Verification</h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm">Align your face in the circle</p>
      </div>

      <div className="relative w-64 h-64 mx-auto mb-8 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden border-4 border-slate-200 dark:border-slate-600">
        {!completed ? (
          <>
             {/* Mock Camera View */}
            <div className="absolute inset-0 bg-slate-200 dark:bg-slate-700 flex items-center justify-center">
               <ScanFace size={64} className="text-slate-400 dark:text-slate-500 opacity-50" />
            </div>
             {/* Scanning Animation */}
            {scanning && (
              <motion.div 
                className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-500/20 to-transparent"
                animate={{ top: ['-100%', '100%'] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
              />
            )}
            
            {/* Guide Circle */}
            <div className="absolute inset-4 border-2 border-dashed border-slate-400 dark:border-slate-500 rounded-full opacity-50"></div>
          </>
        ) : (
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="absolute inset-0 bg-green-50 dark:bg-green-900/30 flex items-center justify-center"
          >
            <CheckCircle2 size={80} className="text-green-500 dark:text-green-400" />
          </motion.div>
        )}
      </div>

      <div className="bg-blue-50 dark:bg-blue-900/30 border border-blue-100 dark:border-blue-800 rounded-xl p-4 mb-6">
        <p className="text-xs text-center text-blue-700 dark:text-blue-300">
          {completed 
            ? "Verification successful! You can proceed." 
            : "Used for safety authentication. Move slowly."}
        </p>
      </div>

      <Button 
        onClick={handleScan} 
        className={`w-full ${completed ? 'bg-green-600 hover:bg-green-700' : ''}`}
        isLoading={scanning}
      >
        {completed ? "Continue" : "Complete Scan"}
      </Button>
    </Card>
  );
};