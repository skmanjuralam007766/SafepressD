import { ArrowLeft, Fingerprint, ShieldCheck } from 'lucide-react';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Card, Input } from '../../components/ui/Shared';

export const RegistrationIdentity = () => {
  const navigate = useNavigate();
  const [method, setMethod] = useState<'aadhaar' | 'vid'>('aadhaar');
  const [value, setValue] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Mock success if valid length
      if (value.length < (method === 'aadhaar' ? 12 : 16)) {
        alert('Enter complete ID');
        setLoading(false);
        return;
      }
      console.log('Mock: Aadhaar OTP sent for', value);
      localStorage.setItem('reg_aadhaar', value);
      navigate('/auth/identity-otp');
    } catch (err) {
      console.error(err);
      alert('Mock error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full">
      <div className="mb-6">
        <button onClick={() => navigate(-1)} className="text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 transition-colors">
          <ArrowLeft size={20} />
        </button>
      </div>

      <div className="text-center mb-8">
        <div className="mx-auto w-12 h-12 bg-red-50 dark:bg-red-900/30 rounded-full flex items-center justify-center mb-4 text-red-500 dark:text-red-400">
          <Fingerprint size={24} />
        </div>
        <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-2">Verify Your Identity</h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm">Official government identification required</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex bg-slate-100 dark:bg-slate-700 p-1 rounded-xl">
          <button
            type="button"
            onClick={() => setMethod('aadhaar')}
            className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${
              method === 'aadhaar' ? 'bg-white dark:bg-slate-600 text-slate-800 dark:text-slate-100 shadow-sm' : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
            }`}
          >
            Aadhaar (12 digits)
          </button>
          <button
            type="button"
            onClick={() => setMethod('vid')}
            className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${
              method === 'vid' ? 'bg-white dark:bg-slate-600 text-slate-800 dark:text-slate-100 shadow-sm' : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
            }`}
          >
            Virtual ID (16 digits)
          </button>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
            {method === 'aadhaar' ? 'Aadhaar Number' : 'Virtual ID Number'}
          </label>
          <Input 
            type="text" 
            placeholder={method === 'aadhaar' ? "0000 0000 0000" : "0000 0000 0000 0000"} 
            value={value}
            onChange={(e) => setValue(e.target.value)}
            maxLength={method === 'aadhaar' ? 12 : 16}
            required
            className="font-mono tracking-wide"
          />
        </div>

        <div className="bg-green-50 dark:bg-green-900/30 border border-green-100 dark:border-green-800 rounded-xl p-4 flex items-start gap-3">
          <ShieldCheck className="text-green-600 dark:text-green-400 shrink-0 mt-0.5" size={18} />
          <p className="text-xs text-green-700 dark:text-green-300 leading-relaxed">
            Your information is encrypted & secure. We only use this for identity verification and safety purposes.
          </p>
        </div>

        <Button 
          type="submit" 
          className="w-full"
          isLoading={loading}
          disabled={value.length < (method === 'aadhaar' ? 12 : 16)}
        >
          Send Aadhaar OTP
        </Button>
      </form>
    </Card>
  );
};