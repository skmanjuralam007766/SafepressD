import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Button } from '../../components/ui/Shared';
import { User, Bell, Shield, Phone, Moon, Database, HelpCircle, Info, ChevronRight, ToggleRight, ToggleLeft } from 'lucide-react';
import { toast } from 'sonner';

const SettingsSection = ({ title, items, onAction }: { title: string, items: any[], onAction: (item: any) => void }) => (
  <Card className="mb-6">
    <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">{title}</h3>
    <div className="space-y-1">
      {items.map((item, i) => (
        <button 
          key={i} 
          onClick={() => onAction(item)}
          className="w-full flex items-center justify-between p-3 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl transition-colors group"
        >
          <div className="flex items-center gap-4">
            <div className={`w-10 h-10 rounded-full ${item.bg} text-${item.color}-600 flex items-center justify-center group-hover:scale-110 transition-transform`}>
              <item.icon size={20} />
            </div>
            <div className="text-left">
              <p className="font-semibold text-slate-800 dark:text-slate-200 text-sm">{item.label}</p>
              {item.desc && <p className="text-xs text-slate-500 dark:text-slate-400">{item.desc}</p>}
            </div>
          </div>
          <div className="text-slate-400">
             {item.toggle !== undefined ? (
               item.toggle ? <ToggleRight size={32} className="text-green-500" /> : <ToggleLeft size={32} className="text-slate-400" />
             ) : (
               <ChevronRight size={18} />
             )}
          </div>
        </button>
      ))}
    </div>
  </Card>
);

export const Settings = () => {
  const navigate = useNavigate();
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  useEffect(() => {
    // Load theme from localStorage
    const savedTheme = localStorage.getItem('safepress-theme') as 'light' | 'dark';
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('safepress-theme', newTheme);
    
    // Apply theme class to root element
    const root = document.documentElement;
    if (newTheme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    
    toast.success(`Switched to ${newTheme} mode`);
  };

  const handleAction = (item: any) => {
    if (item.label === 'Profile Information') {
      navigate('/dashboard/id');
    } else if (item.label === 'Emergency Settings') {
      navigate('/dashboard/sos');
    } else if (item.label === 'Appearance') {
      toggleTheme();
    } else if (item.label === 'Notifications') {
      setNotificationsEnabled(!notificationsEnabled);
      toast.success(`Notifications ${!notificationsEnabled ? 'enabled' : 'disabled'}`);
    } else if (item.toggle !== undefined) {
      toast.success(`${item.label} settings updated`);
    } else {
      toast.info(`Navigating to ${item.label}...`);
    }
  };

  const handleLogout = () => {
    toast.success("Logged out successfully");
    navigate('/login');
  };

  const accountItems = [
    { icon: User, label: 'Profile Information', desc: 'Email, Phone, Visibility', bg: 'bg-blue-50', color: 'blue' },
    { icon: Database, label: 'Data Management', desc: 'Export data, Delete account', bg: 'bg-slate-100', color: 'slate' },
  ];

  const safetyItems = [
    { icon: Shield, label: 'Privacy & Security', desc: 'Biometric, 2FA, Auto-lock', bg: 'bg-green-50', color: 'green' },
    { icon: Phone, label: 'Emergency Settings', desc: 'Auto-call, SOS contacts', bg: 'bg-red-50', color: 'red' },
  ];

  const prefItems = [
    { icon: Bell, label: 'Notifications', desc: 'Alerts, Weather, Traffic', bg: 'bg-amber-50', color: 'amber', toggle: notificationsEnabled },
    { icon: Moon, label: 'Appearance', desc: 'Dark mode, Language', bg: 'bg-purple-50', color: 'purple', toggle: theme === 'dark' },
  ];

  return (
    <div className="max-w-3xl mx-auto pb-12">
      <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-6">Settings</h1>
      
      <SettingsSection title="Account" items={accountItems} onAction={handleAction} />
      <SettingsSection title="Safety & Privacy" items={safetyItems} onAction={handleAction} />
      <SettingsSection title="Preferences" items={prefItems} onAction={handleAction} />
      
      <div className="flex gap-4 mt-8">
         <Button variant="ghost" className="flex-1" onClick={() => toast.info("Help & Support coming soon")}>
            <HelpCircle size={18} className="mr-2" /> Help & Support
         </Button>
         <Button variant="ghost" className="flex-1" onClick={() => toast.info("SafePress v1.0.0 (Build 2024)")}>
            <Info size={18} className="mr-2" /> About SafePress v1.0
         </Button>
      </div>
      
      <div className="mt-8 text-center">
         <button onClick={handleLogout} className="text-red-500 text-sm font-medium hover:underline">Log Out</button>
         <p className="text-xs text-slate-400 mt-2">© 2024 SafePress Inc.</p>
      </div>
    </div>
  );
};