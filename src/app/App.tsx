import { useEffect } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Toaster } from 'sonner';
import { AuthLayout, DashboardLayout } from './layouts/Layouts';

// Auth Screens
import { Login } from './screens/auth/Login';
import { RegistrationComplete } from './screens/auth/RegistrationComplete';
import { RegistrationFaceScan } from './screens/auth/RegistrationFaceScan';
import { RegistrationIdentity } from './screens/auth/RegistrationIdentity';
import { RegistrationIdentityOTP } from './screens/auth/RegistrationIdentityOTP';
import { RegistrationLocation } from './screens/auth/RegistrationLocation';
import { RegistrationOTP } from './screens/auth/RegistrationOTP';
import { RegistrationPhone } from './screens/auth/RegistrationPhone';

// Dashboard Screens
import { AIAssistant } from './screens/dashboard/AIAssistant';
import { DashboardMain } from './screens/dashboard/DashboardMain';
import { DigitalID } from './screens/dashboard/DigitalID';
import { LiveMap } from './screens/dashboard/LiveMap';
import { Settings } from './screens/dashboard/Settings';
import { SOSActive } from './screens/dashboard/SOSActive';

function App() {
  // Load theme on app start
  useEffect(() => {
    const savedTheme = localStorage.getItem('safepress-theme');
    if (savedTheme === 'dark') {
      document.documentElement.classList.add('dark');
    }
  }, []);

  return (
    <>
      <Toaster position="top-right" richColors />
      <BrowserRouter>
        <Routes>
          {/* Redirect root to login so existing users can login directly */}
          <Route path="/" element={<Navigate to="/login" replace />} />

          {/* Auth Routes */}
          <Route path="/auth" element={<AuthLayout />}>
            <Route path="phone" element={<RegistrationPhone />} />
            <Route path="otp" element={<RegistrationOTP />} />
            <Route path="identity" element={<RegistrationIdentity />} />
            <Route path="identity-otp" element={<RegistrationIdentityOTP />} />
            <Route path="face-scan" element={<RegistrationFaceScan />} />
            <Route path="location" element={<RegistrationLocation />} />
            <Route path="complete" element={<RegistrationComplete />} />
          </Route>
          
          {/* Login is also part of AuthLayout visually */}
          <Route path="/login" element={<AuthLayout />}>
             <Route index element={<Login />} />
          </Route>

          {/* Dashboard Routes */}
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<DashboardMain />} />
            <Route path="id" element={<DigitalID />} />
            <Route path="map" element={<LiveMap />} />
            <Route path="sos" element={<SOSActive />} />
            <Route path="ai" element={<AIAssistant />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;