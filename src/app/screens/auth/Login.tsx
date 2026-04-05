import { User } from 'lucide-react';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Card, Input } from '../../components/ui/Shared';

// Mocked for frontend-only: Backend APIs removed

export const Login = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<'id' | 'otp'>('id');
  const [loginId, setLoginId] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleIdSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Mock success - auto proceed to OTP
      console.log('Mock: OTP sent for', loginId);
      setStep('otp');
    } catch (err) {
      setError('Mock error. Try again.');
      console.error('Mock error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const otpCode = otp.join('');

    try {
      // Mock success - auto login
      console.log('Mock: Login success for', loginId, otpCode);
      localStorage.setItem('access_token', 'mock_token');
      localStorage.setItem('user', JSON.stringify({ id: 'mock_user', login_id: loginId }));
      navigate('/dashboard');
    } catch (err) {
      setError('Mock error. Invalid OTP.');
      console.error('Mock error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleOtpChange = (element: HTMLInputElement, index: number) => {
    if (isNaN(Number(element.value))) return false;
    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);
    if (element.nextSibling && element.value !== "") {
      (element.nextSibling as HTMLInputElement).focus();
    }
  };

  return (
    <Card className="w-full">
      <div className="text-center mb-8">
        <h1 className="text-xl sm:text-2xl font-bold text-slate-800 dark:text-slate-100 mb-2">Welcome Back</h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm">
          {step === 'id' ? "Enter your SafePress ID to continue" : "Enter the verification code"}
        </p>
      </div>

      {step === 'id' ? (
        <form onSubmit={handleIdSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Login ID</label>
            <div className="relative">
              <User className="absolute left-3 top-3 h-5 w-5 text-slate-400 dark:text-slate-500" />
              <Input 
                type="text" 
                placeholder="SPXXXXXXXX" 
                className="pl-10 uppercase font-mono placeholder:normal-case"
                value={loginId}
                onChange={(e) => setLoginId(e.target.value.toUpperCase())}
                required
              />
            </div>
          </div>
          <Button type="submit" className="w-full" isLoading={loading} disabled={loginId.length < 6}>
            Send OTP
          </Button>
          
          {error && (
            <div className="p-3 text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 rounded-lg">
              {error}
            </div>
          )}
          
          <div className="text-center pt-4 border-t border-slate-100 dark:border-slate-700">
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Don't have an account?{' '}
              <Link to="/auth/phone" className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium">
                Register Now
              </Link>
            </p>
          </div>
        </form>
      ) : (
        <form onSubmit={handleOtpSubmit} className="space-y-8">
           <div className="flex justify-center gap-1.5 sm:gap-2">
            {otp.map((data, index) => (
              <input
                key={index}
                type="text"
                maxLength={1}
                className="w-9 h-11 sm:w-12 sm:h-14 text-center text-lg sm:text-xl font-bold rounded-xl border border-slate-200 dark:border-slate-600 dark:bg-slate-700 dark:text-white focus:border-[#1976F3] focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900 outline-none transition-all"
                value={data}
                onChange={(e) => handleOtpChange(e.target, index)}
                onFocus={(e) => e.target.select()}
              />
            ))}
          </div>
          <Button type="submit" className="w-full" isLoading={loading} disabled={otp.some(d => d === "")}>
            Login & Continue
          </Button>
          
          {error && (
            <div className="p-3 text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 rounded-lg">
              {error}
            </div>
          )}
          
          <button 
            type="button" 
            onClick={() => { setStep('id'); setError(''); }}
            className="w-full text-center text-sm text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300"
          >
            Use a different ID
          </button>
          
          <div className="text-center pt-4 border-t border-slate-100 dark:border-slate-700">
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Don't have an account?{' '}
              <Link to="/auth/phone" className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium">
                Register Now
              </Link>
            </p>
          </div>
        </form>
      )}
    </Card>
  );
};