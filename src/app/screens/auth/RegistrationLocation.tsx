import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Card } from '../../components/ui/Shared';
import { MapPin } from 'lucide-react';

// Mocked for frontend-only: Backend APIs removed

export const RegistrationLocation = () => {
  const navigate = useNavigate();

  const handleAllow = async () => {
    // Get registration data from localStorage
    const phone = localStorage.getItem('reg_phone');
    const aadhaar = localStorage.getItem('reg_aadhaar');

    if (!phone) {
      alert('Registration data not found. Please start over.');
      navigate('/auth/phone');
      return;
    }

    try {
      // Mock registration success
      console.log('Mock: User registered', { phone, aadhaar });
      localStorage.setItem('user_safepress_id', 'SP' + Math.floor(Math.random()*1000000).toString().padStart(8, '0'));
      localStorage.removeItem('reg_phone');
      localStorage.removeItem('reg_aadhaar');
      navigate('/auth/complete');
    } catch (err) {
      console.error('Mock registration error:', err);
      alert('Registration complete (mock)');
    }
  };

  return (
    <Card className="w-full">
      <div className="text-center mb-6">
        <div className="mx-auto w-16 h-16 bg-blue-50 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-4 text-blue-500 dark:text-blue-400">
          <MapPin size={32} />
        </div>
        <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-2">Enable Live Location</h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm max-w-xs mx-auto">SafePress needs your location to detect risks & send SOS alerts</p>
      </div>

      <div className="w-full h-48 bg-slate-100 dark:bg-slate-700 rounded-2xl mb-8 overflow-hidden relative border border-slate-200 dark:border-slate-600">
         {/* Mock Map Preview */}
         <div className="absolute inset-0 opacity-50 bg-[url('https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/World_map_blank_without_borders.svg/2000px-World_map_blank_without_borders.svg.png')] bg-cover bg-center grayscale" />
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="w-4 h-4 bg-blue-500 rounded-full ring-4 ring-blue-500/30 animate-pulse" />
         </div>
      </div>

      <div className="space-y-3">
        <Button onClick={handleAllow} className="w-full">
          Allow Location
        </Button>
        <Button 
          variant="ghost" 
          onClick={() => navigate('/auth/complete')} 
          className="w-full"
        >
          Not Now
        </Button>
      </div>
    </Card>
  );
};
