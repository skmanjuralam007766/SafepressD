import React, { useState } from 'react';
import { Card, Button, Input } from '../../components/ui/Shared';
import { Send, Bot, Plus, Heart, MapPin, Phone, ShieldQuestion } from 'lucide-react';

export const AIAssistant = () => {
  const [messages, setMessages] = useState([
    { id: 1, type: 'bot', text: 'Hello Sarah, I am your SafePress AI Assistant. How can I help you today?' },
  ]);
  const [input, setInput] = useState('');

  const handleSend = (e: React.FormEvent, textOverride?: string) => {
    if (e && e.preventDefault) e.preventDefault();
    const textToSend = textOverride || input;
    if (!textToSend.trim()) return;
    
    setMessages(prev => [...prev, { id: Date.now(), type: 'user', text: textToSend }]);
    if (!textOverride) setInput('');

    setTimeout(() => {
      let reply = 'I can help with that. Please contact emergency services if this is urgent.';
      if (textToSend.includes('First Aid')) reply = 'For first aid, please check if the person is breathing. Call an ambulance immediately if needed.';
      if (textToSend.includes('Hospital')) reply = 'Searching for the nearest hospital... Found: City General Hospital (2.3km away).';
      if (textToSend.includes('Emergency')) reply = 'Dialing 112... (Simulation)';
      if (textToSend.includes('Safety')) reply = 'Stay aware of your surroundings and keep your location sharing on.';
      
      setMessages(prev => [...prev, { id: Date.now() + 1, type: 'bot', text: reply }]);
    }, 1000);
  };

  const quickActions = [
    { icon: Heart, label: 'First Aid', color: 'red' },
    { icon: MapPin, label: 'Nearest Hospital', color: 'blue' },
    { icon: Phone, label: 'Emergency #', color: 'green' },
    { icon: ShieldQuestion, label: 'Safety Tips', color: 'purple' },
  ];

  return (
    <div className="flex flex-col h-full lg:h-[calc(100vh-8rem)] gap-3 lg:gap-4">
      <div className="flex items-center gap-3 shrink-0">
        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-purple-200 shrink-0">
           <Bot size={20} className="sm:w-6 sm:h-6" />
        </div>
        <div className="min-w-0 flex-1">
           <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-slate-800 dark:text-white">Safety Assistant</h1>
           <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm">AI-powered support for emergencies</p>
        </div>
      </div>

      <div className="flex-1 bg-white dark:bg-slate-800 rounded-2xl lg:rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden flex flex-col min-h-[calc(100vh-12rem)] lg:min-h-0">
         {/* Chat Area */}
         <div className="flex-1 overflow-y-auto overflow-x-hidden p-3 sm:p-4 lg:p-6 space-y-3 sm:space-y-4">
            {messages.map((msg) => (
               <div key={msg.id} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[90%] sm:max-w-[85%] lg:max-w-[80%] px-3 py-2.5 sm:p-3 lg:p-4 rounded-2xl ${
                     msg.type === 'user' 
                     ? 'bg-blue-600 text-white rounded-tr-none' 
                     : 'bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-white rounded-tl-none'
                  }`}>
                     <p className="text-sm leading-relaxed break-words">{msg.text}</p>
                  </div>
               </div>
            ))}
         </div>

         {/* Quick Actions */}
         <div className="p-3 sm:p-4 border-t border-slate-100 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50 shrink-0">
            <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase mb-2 px-1">Quick Actions</p>
            <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
               {quickActions.map((action, i) => (
                  <button 
                    key={i} 
                    onClick={() => handleSend({} as React.FormEvent, action.label)}
                    className="flex items-center gap-2 px-3 py-2 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl shadow-sm hover:bg-slate-50 dark:hover:bg-slate-600 whitespace-nowrap transition-colors shrink-0"
                  >
                     <action.icon size={16} className={`text-${action.color}-500 shrink-0`} />
                     <span className="text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-200">{action.label}</span>
                  </button>
               ))}
            </div>
         </div>

         {/* Input Area */}
         <div className="p-3 sm:p-4 bg-white dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700 shrink-0">
            <form onSubmit={handleSend} className="flex gap-2">
               <Button variant="secondary" type="button" className="w-10 h-10 sm:w-12 sm:h-12 p-0 rounded-2xl shrink-0">
                  <Plus size={18} className="sm:w-5 sm:h-5" />
               </Button>
               <Input 
                  value={input} 
                  onChange={(e) => setInput(e.target.value)} 
                  placeholder="Type a message..." 
                  className="rounded-2xl text-sm flex-1 min-w-0"
               />
               <Button type="submit" className="w-10 h-10 sm:w-12 sm:h-12 p-0 rounded-2xl shrink-0 bg-purple-600 hover:bg-purple-700">
                  <Send size={18} className="sm:w-5 sm:h-5" />
               </Button>
            </form>
         </div>
      </div>
    </div>
  );
};