import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChatMessage } from '../types';
import { generateAssistantResponse } from '../services/gemini';

interface GeminiAssistantProps {
    forceOpen?: boolean;
    onClose?: () => void;
}

export const GeminiAssistant: React.FC<GeminiAssistantProps> = ({ forceOpen, onClose }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: 'أهلاً بيك في Oki-Store! 👋 أنا مساعدك الذكي. بتدور على حاجة معينة؟' }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
      if (forceOpen) setIsOpen(true);
  }, [forceOpen]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleClose = () => {
      setIsOpen(false);
      if (onClose) onClose();
  }

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg: ChatMessage = { role: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    const replyText = await generateAssistantResponse(input);
    
    setMessages(prev => [...prev, { role: 'model', text: replyText }]);
    setIsLoading(false);
  };

  return (
    <>
      {/* Trigger Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-40 bg-gradient-to-r from-neo to-blue-600 p-4 rounded-full shadow-[0_0_20px_rgba(123,44,191,0.4)] ${isOpen ? 'hidden' : 'flex'}`}
      >
        <Sparkles className="text-white" size={28} />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="fixed bottom-6 right-6 z-50 w-[90vw] md:w-96 h-[600px] glass-panel rounded-3xl flex flex-col shadow-2xl overflow-hidden border border-white/10"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-neo to-blue-600 p-5 flex justify-between items-center relative overflow-hidden">
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
              <div className="flex items-center gap-3 relative z-10">
                <div className="bg-white/20 p-2 rounded-full border border-white/20">
                  <Sparkles size={20} className="text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-base">Oki-Bot AI</h3>
                  <span className="text-xs text-white/80 flex items-center gap-1">
                    <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse shadow-[0_0_8px_rgba(74,222,128,0.8)]"></span>
                    Online • 2.5 Flash Lite
                  </span>
                </div>
              </div>
              <button onClick={handleClose} className="text-white/80 hover:text-white relative z-10 p-1 hover:bg-white/10 rounded-full transition-colors">
                <X size={20} />
              </button>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-space-light/80">
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed shadow-sm ${
                    msg.role === 'user' 
                      ? 'bg-electric/20 text-white border border-electric/30 rounded-br-none' 
                      : 'bg-[#1E1E2E] text-gray-200 border border-white/5 rounded-bl-none'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-[#1E1E2E] p-4 rounded-2xl rounded-bl-none flex gap-1 items-center border border-white/5">
                    <span className="text-xs text-gray-500 ml-2">يفكر...</span>
                    <span className="w-1.5 h-1.5 bg-electric rounded-full animate-bounce"></span>
                    <span className="w-1.5 h-1.5 bg-electric rounded-full animate-bounce delay-75"></span>
                    <span className="w-1.5 h-1.5 bg-electric rounded-full animate-bounce delay-150"></span>
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-4 border-t border-white/10 bg-space-light backdrop-blur-md">
              <div className="flex gap-2 relative">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="اسأل عن المنتجات، الأسعار..."
                  className="flex-1 bg-black/30 border border-white/10 text-white placeholder-gray-500 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-electric transition-colors pr-12"
                />
                <button 
                  onClick={handleSend}
                  disabled={!input.trim()}
                  className="absolute left-2 top-1/2 -translate-y-1/2 text-electric hover:text-white disabled:opacity-50 transition-colors p-2"
                >
                  <Send size={18} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};