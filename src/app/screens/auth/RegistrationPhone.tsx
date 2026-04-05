import { Phone } from 'lucide-react';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Card, Input } from '../../components/ui/Shared';

export const RegistrationPhone = () => {
  const navigate = useNavigate();
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Mock success - auto save phone & proceed
      console.log('Mock: OTP sent for phone', phone);
      localStorage.setItem('reg_phone', phone);
      navigate('/auth/otp');
    } catch (err) {
      console.error(err);
      alert('Mock error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-2">
          Create Your SafePress Account
        </h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm">
          Join the safety network today
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
            Phone Number
          </label>

          <div className="relative flex items-center">
            <Phone className="absolute left-3 h-4 w-4 text-slate-400" />
            <Input
              type="tel"
              placeholder="9876543210"
              className="pl-10"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>
        </div>

        <Button type="submit" className="w-full" isLoading={loading}>
          Send OTP
        </Button>

        <div className="text-center pt-4 border-t border-slate-100 dark:border-slate-700">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Already have an account?{' '}
            <Link to="/login" className="text-blue-600 font-medium">
              Login
            </Link>
          </p>
        </div>
      </form>
    </Card>
  );
};
