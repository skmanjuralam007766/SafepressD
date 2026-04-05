import { ArrowLeft, Timer } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Card } from '../../components/ui/Shared';

export const RegistrationIdentityOTP = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [timer, setTimer] = useState(30);
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const aadhaar = localStorage.getItem('reg_aadhaar'); // 👈 saved from RegistrationIdentity

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleChange = (element: HTMLInputElement, index: number) => {
    if (isNaN(Number(element.value))) return false;

    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);

    if (element.nextSibling && element.value !== "") {
      (element.nextSibling as HTMLInputElement).focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace" && otp[index] === "" && index > 0) {
      const prev = document.getElementById(`aadhaar-otp-${index - 1}`);
      prev?.focus();
    }
  };

  const handleResendOtp = async () => {
    if (!aadhaar) {
      alert('Aadhaar number not found. Please go back and enter your Aadhaar.');
      return;
    }

    setResending(true);
    try {
      // Mock resend
      console.log('Mock: Resent Aadhaar OTP for', aadhaar);
      setTimer(30);
      alert('Aadhaar OTP resent successfully!');
    } catch (err) {
      console.error(err);
      alert('Mock error');
    } finally {
      setResending(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const enteredOtp = otp.join('');

    try {
      // Mock success if OTP filled
      if (enteredOtp.length !== 6) {
        alert('Enter complete 6-digit OTP');
        setLoading(false);
        return;
      }
      console.log('Mock: Aadhaar OTP verified');
      localStorage.removeItem('reg_aadhaar');
      navigate('/auth/face-scan');
    } catch (err) {
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
        <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-2">Enter Aadhaar OTP</h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm">Enter the 6-digit code sent to your linked mobile</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="flex justify-center gap-2">
          {otp.map((data, index) => (
            <input
              key={index}
              id={`aadhaar-otp-${index}`}
              type="text"
              maxLength={1}
              className="w-10 h-12 sm:w-12 sm:h-14 text-center text-xl font-bold rounded-xl border border-slate-200 dark:border-slate-600 dark:bg-slate-700 dark:text-white focus:border-[#1976F3] focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900 outline-none transition-all"
              value={data}
              onChange={(e) => handleChange(e.target, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              onFocus={(e) => e.target.select()}
            />
          ))}
        </div>

        <div className="flex items-center justify-center text-sm">
          {timer > 0 ? (
            <div className="flex items-center text-slate-400 dark:text-slate-500">
              <span className="mr-2">Resend OTP in</span>
              <Timer size={14} className="mr-1" />
              <span>00:{timer < 10 ? `0${timer}` : timer}</span>
            </div>
          ) : (
            <button type="button" className="text-blue-500 dark:text-blue-400 font-semibold hover:underline" onClick={() => setTimer(30)}>
              Resend OTP
            </button>
          )}
        </div>

        <Button 
          type="submit" 
          className="w-full"
          isLoading={loading}
          disabled={otp.some(d => d === "")}
        >
          Verify Identity
        </Button>
      </form>
    </Card>
  );
};