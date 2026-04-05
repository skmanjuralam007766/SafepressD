import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Card } from '../../components/ui/Shared';
import { CheckCircle, Copy } from 'lucide-react';
import { toast } from 'sonner';

export const RegistrationComplete = () => {
  const navigate = useNavigate();
  const [loginId, setLoginId] = useState('');

  useEffect(() => {
    // Get SafePress ID from localStorage (set during registration)
    const storedId = localStorage.getItem('user_safepress_id');
    if (storedId) {
      setLoginId(storedId);
    }
  }, []);

  const copyToClipboard = async () => {
    if (!loginId) return;
    
    try {
      await navigator.clipboard.writeText(loginId);
      toast.success("Login ID copied to clipboard");
    } catch (err) {
      // Fallback for environments where Clipboard API is blocked
      try {
        const textArea = document.createElement("textarea");
        textArea.value = loginId;
        textArea.style.position = "fixed"; // Avoid scrolling to bottom
        textArea.style.left = "-9999px";
        textArea.style.top = "0";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        
        const successful = document.execCommand('copy');
        document.body.removeChild(textArea);
        
        if (successful) {
          toast.success("Login ID copied to clipboard");
          return;
        }
      } catch (fallbackErr) {
        // Fallback also failed
      }
      
      // Final fallback: just inform the user
      toast.error("Could not copy automatically. Please copy manually.");
    }
  };

  return (
    <Card className="w-full text-center">
      <div className="mx-auto w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-6 text-green-600 dark:text-green-400">
        <CheckCircle size={40} />
      </div>
      
      <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-2">Registration Complete</h1>
      <p className="text-slate-500 dark:text-slate-400 text-sm mb-8">You are now part of the SafePress network</p>

      <div className="bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-2xl p-6 mb-8">
        <p className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider font-semibold mb-2">Your Login ID</p>
        <div className="flex items-center justify-center gap-3">
          <span className="text-3xl font-mono font-bold text-slate-800 dark:text-slate-100 tracking-wider">{loginId || 'Generating...'}</span>
          {loginId && (
            <button onClick={copyToClipboard} className="text-slate-400 dark:text-slate-500 hover:text-blue-500 dark:hover:text-blue-400 transition-colors">
              <Copy size={20} />
            </button>
          )}
        </div>
        <p className="text-xs text-slate-400 dark:text-slate-500 mt-2">Save this ID for future logins</p>
      </div>

      <Button onClick={() => navigate('/login')} className="w-full">
        Continue to Login
      </Button>
    </Card>
  );
};
