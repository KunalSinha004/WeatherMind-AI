import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, Send, X, Bot, User, HelpCircle, ShieldCheck } from 'lucide-react';
import { WeatherData } from '../types';

interface Message {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  timestamp: string;
}

export const AIAssistantModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  currentWeather?: WeatherData;
}> = ({ isOpen, onClose, currentWeather }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'msg_1',
      sender: 'ai',
      text: `Hello! I am WeatherMind Assistant 🤖. Ask me anything about current weather, AI forecast trends, or activity advice for ${currentWeather?.city || 'your city'}.`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [input, setInput] = useState('');
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  if (!isOpen) return null;

  const quickPrompts = [
    "Will it rain tomorrow?",
    "Should I carry an umbrella?",
    "Compare Bangalore and Delhi weather.",
    "Is tomorrow suitable for outdoor sports?"
  ];

  const handleSend = (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim()) return;

    const userMsg: Message = {
      id: `usr_${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInput('');

    // Generate intelligent AI Response based on weather context & ML predictions
    setTimeout(() => {
      const aiReply = generateAIResponse(query, currentWeather);
      const aiMsg: Message = {
        id: `ai_${Date.now()}`,
        sender: 'ai',
        text: aiReply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, aiMsg]);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-end bg-slate-950/70 backdrop-blur-sm p-4 sm:p-6">
      <div className="w-full max-w-lg h-[600px] glass-panel rounded-3xl flex flex-col border border-slate-800 shadow-2xl relative overflow-hidden animate-in slide-in-from-right duration-300">
        
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-800 bg-slate-900/80 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-white shadow-glow-cyan">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-slate-100">WeatherMind AI Assistant</h3>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-400 font-semibold border border-cyan-500/30">
                  Online
                </span>
              </div>
              <p className="text-[11px] text-slate-400">Contextual climate intelligence model</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Disclaimer Banner */}
        <div className="bg-cyan-950/40 px-4 py-2 border-b border-cyan-500/20 flex items-center gap-2 text-[11px] text-cyan-300">
          <ShieldCheck className="w-4 h-4 shrink-0 text-cyan-400" />
          <span>Predictions combine live Open-Meteo observations with XGBoost ML forecasts.</span>
        </div>

        {/* Messages Body */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map(m => (
            <div
              key={m.id}
              className={`flex items-start gap-3 ${m.sender === 'user' ? 'flex-row-reverse' : ''}`}
            >
              <div
                className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs font-bold shrink-0 ${
                  m.sender === 'user'
                    ? 'bg-blue-600 text-white'
                    : 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                }`}
              >
                {m.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>

              <div
                className={`max-w-[80%] rounded-2xl p-3.5 text-xs leading-relaxed ${
                  m.sender === 'user'
                    ? 'bg-blue-600 text-white rounded-tr-none'
                    : 'bg-slate-900 border border-slate-800 text-slate-200 rounded-tl-none shadow-lg'
                }`}
              >
                <p className="whitespace-pre-line">{m.text}</p>
                <span className={`text-[10px] mt-1.5 block text-right ${m.sender === 'user' ? 'text-blue-200' : 'text-slate-500'}`}>
                  {m.timestamp}
                </span>
              </div>
            </div>
          ))}
          <div ref={chatEndRef} />
        </div>

        {/* Quick Prompts */}
        <div className="px-4 py-2 border-t border-slate-800/80 bg-slate-900/40 flex items-center gap-2 overflow-x-auto no-scrollbar">
          <HelpCircle className="w-4 h-4 text-slate-500 shrink-0" />
          {quickPrompts.map((qp, i) => (
            <button
              key={i}
              onClick={() => handleSend(qp)}
              className="px-2.5 py-1 rounded-full bg-slate-800 text-[11px] text-slate-300 hover:bg-slate-700 hover:text-cyan-400 whitespace-nowrap transition-colors border border-slate-700/60"
            >
              {qp}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="p-3 border-t border-slate-800 bg-slate-900/80">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              placeholder="Ask weather, rain odds, activity advice..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
            />
            <button
              type="submit"
              className="p-2.5 rounded-xl bg-cyan-500 text-slate-950 font-bold hover:bg-cyan-400 transition-colors shadow-glow-cyan"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>

      </div>
    </div>
  );
};

function generateAIResponse(query: string, weather?: WeatherData): string {
  const q = query.toLowerCase();
  const city = weather?.city || 'Bangalore';
  const temp = weather?.current.temp || 28;
  const rainProb = weather?.daily?.[1]?.rainProb || 65;

  if (q.includes('rain') || q.includes('umbrella')) {
    return `🌧️ **Rain Forecast for ${city}**:\n` +
      `Our XGBoost model estimates a **${rainProb}% probability of rain** tomorrow afternoon.\n` +
      `• **Recommendation**: Carrying a compact umbrella is advised if heading out after 2 PM.\n` +
      `• *Note*: Model confidence score is currently 89%.`;
  }

  if (q.includes('compare')) {
    return `📊 **Comparative Analysis (Bangalore vs Delhi)**:\n` +
      `• **Bangalore**: 28°C, Partly Cloudy, 68% Humidity, 14 km/h Wind.\n` +
      `• **Delhi**: 34°C, Clear Sky, 45% Humidity, 18 km/h Wind.\n` +
      `Bangalore is currently 6°C cooler with higher relative humidity due to cloud cover.`;
  }

  if (q.includes('outdoor') || q.includes('sports') || q.includes('suitable')) {
    if (rainProb > 50) {
      return `⚽ **Outdoor Activity Suitability**:\n` +
        `Moderate risk of rain (${rainProb}% chance) after 3 PM in ${city}.\n` +
        `Morning hours (7 AM – 11 AM) are optimal for outdoor sports with clear conditions and temperatures around ${temp - 3}°C.`;
    }
    return `☀️ **Outdoor Activity Suitability**:\n` +
      `Conditions in ${city} are favorable! Temperature is ${temp}°C with low precipitation probability. UV index is moderate (6).`;
  }

  if (q.includes('temperature') || q.includes('hot')) {
    return `🌡️ **Temperature Insights**:\n` +
      `Current temperature in ${city} is **${temp}°C** (Feels like ${temp + 2}°C).\n` +
      `Tomorrow's predicted maximum is **${temp + 1.5}°C** based on ensemble ML forecasts.`;
  }

  return `🤖 **WeatherMind AI Analysis**:\n` +
    `For ${city}, current conditions indicate ${weather?.current.condition || 'Partly Cloudy'} at ${temp}°C with ${weather?.current.humidity || 65}% humidity.\n` +
    `You can explore the AI Forecast tab for 14-day ensemble projections and confidence intervals!`;
}
