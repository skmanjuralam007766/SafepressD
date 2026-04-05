import React from 'react';
import { Outlet, useLocation, Link, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Shield, Bell, Search, Menu, Home, Map, User, Phone, Mic, Settings as SettingsIcon, LogOut } from 'lucide-react';
import { cn } from '../components/ui/Shared';
import { toast } from 'sonner';

export const AuthLayout = () => {
  return (
    <div className="min-h-screen w-full bg-[#E8FFF1] flex items-center justify-center p-4">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[20%] -right-[10%] w-[600px] h-[600px] rounded-full bg-blue-400/20 blur-3xl" />
        <div className="absolute -bottom-[20%] -left-[10%] w-[600px] h-[600px] rounded-full bg-purple-400/20 blur-3xl" />
      </div>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="flex justify-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-[#1976F3] to-[#4CC3FF] rounded-2xl flex items-center justify-center shadow-lg">
            <Shield className="w-10 h-10 text-white" strokeWidth={2.5} />
          </div>
        </div>
        <Outlet />
      </motion.div>
    </div>
  );
};

const SidebarItem = ({ icon: Icon, label, path, active }: { icon: any, label: string, path: string, active: boolean }) => (
  <Link to={path}>
    <div className={cn(
      "flex items-center gap-3 px-4 py-3 rounded-xl transition-all mb-1",
      active 
        ? "bg-gradient-to-r from-[#1976F3] to-[#4CC3FF] text-white shadow-md shadow-blue-200" 
        : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
    )}>
      <Icon size={20} strokeWidth={active ? 2.5 : 2} />
      <span className={cn("font-medium", active ? "font-semibold" : "")}>{label}</span>
    </div>
  </Link>
);

export const DashboardLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = React.useState(false);

  const handleLogout = () => {
    toast.success("Logged out successfully");
    navigate('/login');
  };

  const navItems = [
    { icon: Home, label: "Dashboard", path: "/dashboard" },
    { icon: Map, label: "Live Map", path: "/dashboard/map" },
    { icon: User, label: "Digital ID", path: "/dashboard/id" },
    { icon: Phone, label: "SOS & Emergency", path: "/dashboard/sos" },
    { icon: Mic, label: "AI Assistant", path: "/dashboard/ai" },
    { icon: SettingsIcon, label: "Settings", path: "/dashboard/settings" },
  ];

  return (
    <div className="min-h-screen bg-[#F0F2F5] dark:bg-slate-900 flex">
      {/* Sidebar - Desktop */}
      <aside className="hidden lg:flex w-64 bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700 flex-col fixed h-full z-20">
        <div className="p-6 flex items-center gap-3 border-b border-slate-100 dark:border-slate-700">
          <div className="w-10 h-10 bg-gradient-to-br from-[#1976F3] to-[#4CC3FF] rounded-xl flex items-center justify-center">
            <Shield className="w-6 h-6 text-white" strokeWidth={2.5} />
          </div>
          <span className="font-bold text-xl text-slate-800 dark:text-slate-200">SafePress</span>
        </div>
        
        <div className="flex-1 p-4 overflow-y-auto">
          {navItems.map((item) => (
            <SidebarItem 
              key={item.path} 
              {...item} 
              active={location.pathname === item.path} 
            />
          ))}
        </div>

        <div className="p-4 border-t border-slate-100 dark:border-slate-700">
          <button onClick={handleLogout} className="flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl w-full transition-colors">
            <LogOut size={20} />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 lg:ml-64 min-h-screen flex flex-col">
        {/* Topbar */}
        <header className="h-16 bg-white/80 dark:bg-slate-800/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-700 sticky top-0 z-10 px-4 lg:px-8 flex items-center justify-between">
          <div className="flex items-center gap-4 lg:hidden">
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 -ml-2 text-slate-600 dark:text-slate-300">
              <Menu size={24} />
            </button>
            <div className="w-8 h-8 bg-gradient-to-br from-[#1976F3] to-[#4CC3FF] rounded-lg flex items-center justify-center">
              <Shield className="w-5 h-5 text-white" strokeWidth={2.5} />
            </div>
          </div>

          {/* Desktop Search */}
          <div className="hidden lg:flex flex-1 max-w-md ml-4">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500" size={18} />
              <input 
                type="text" 
                placeholder="Search incidents, users, locations..." 
                className="w-full pl-10 pr-4 py-2 bg-slate-100 dark:bg-slate-700 border-none rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-sm transition-all text-slate-800 dark:text-slate-200 placeholder:text-slate-500"
              />
            </div>
          </div>

          <div className="flex items-center gap-2 md:gap-4">
            {/* Mobile Search Button */}
            <button 
              onClick={() => setIsMobileSearchOpen(!isMobileSearchOpen)} 
              className="lg:hidden p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-full transition-colors"
            >
              <Search size={20} />
            </button>

            <button 
              onClick={() => toast.info("No new notifications")} 
              className="relative p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-full transition-colors"
            >
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-white dark:border-slate-800"></span>
            </button>
            
            <Link to="/dashboard/settings" className="flex items-center gap-3 pl-4 border-l border-slate-200 dark:border-slate-700 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-700 py-1 px-2 rounded-xl transition-colors">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">Sk Manjur Alam</p>
                <p className="text-xs text-green-600 font-medium">Safety Score: 85%</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-purple-400 to-blue-400 p-0.5">
                <div className="w-full h-full rounded-full bg-white flex items-center justify-center overflow-hidden">
                   <img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8TUVOfGVufDB8fDB8fHww" alt="User" className="w-full h-full object-cover" />
                </div>
              </div>
            </Link>
          </div>
        </header>

        {/* Mobile Search Bar - Expandable */}
        {isMobileSearchOpen && (
          <div className="lg:hidden bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 px-4 py-3">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500" size={18} />
              <input 
                type="text" 
                placeholder="Search incidents, users, locations..." 
                className="w-full pl-10 pr-4 py-2 bg-slate-100 dark:bg-slate-700 border-none rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-sm transition-all text-slate-800 dark:text-slate-200 placeholder:text-slate-500 dark:placeholder:text-slate-400"
                autoFocus
              />
            </div>
          </div>
        )}

        {/* Page Content */}
        <div className="p-4 lg:p-8 flex-1 overflow-x-hidden overflow-y-auto">
          <Outlet />
        </div>
      </main>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)} />
          <motion.aside 
            initial={{ x: -280 }}
            animate={{ x: 0 }}
            exit={{ x: -280 }}
            className="absolute left-0 top-0 bottom-0 w-72 bg-white dark:bg-slate-800 shadow-2xl flex flex-col"
          >
            <div className="p-6 flex items-center justify-between border-b border-slate-100 dark:border-slate-700">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-br from-[#1976F3] to-[#4CC3FF] rounded-lg flex items-center justify-center">
                  <Shield className="w-5 h-5 text-white" strokeWidth={2.5} />
                </div>
                <span className="font-bold text-xl text-slate-800 dark:text-slate-200">SafePress</span>
              </div>
              <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 -mr-2 text-slate-500 dark:text-slate-400">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="flex-1 p-4 overflow-y-auto">
              {navItems.map((item) => (
                <div key={item.path} onClick={() => setIsMobileMenuOpen(false)}>
                  <SidebarItem 
                    {...item} 
                    active={location.pathname === item.path} 
                  />
                </div>
              ))}
            </div>
            
            <div className="p-4 border-t border-slate-100 dark:border-slate-700">
              <button onClick={handleLogout} className="flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl w-full transition-colors">
                <LogOut size={20} />
                <span className="font-medium">Logout</span>
              </button>
            </div>
          </motion.aside>
        </div>
      )}
    </div>
  );
};