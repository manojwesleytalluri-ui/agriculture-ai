import React, { useState, useRef, useEffect } from 'react';
import { useAgriculture } from '../../context/AgricultureContext';
import { chatWithAI } from '../../services/aiService';
import { MessageCircle, X, Send, Leaf } from 'lucide-react';

export default function AiChatAssistant() {
  const { sensorReadings } = useAgriculture();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, role: 'ai', text: 'Hello! I\'m your Agriculture AI assistant. Ask me about your field conditions, sensor data, or farming recommendations.' },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const quickQuestions = [
    'What is the current field condition?',
    'Why is soil moisture low?',
    'Show me temperature trends.',
    'Which sensor has a problem?',
    'Do I need to water the crops?',
  ];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = (text) => {
    const msg = text || input.trim();
    if (!msg) return;

    setMessages((prev) => [...prev, { id: Date.now(), role: 'user', text: msg }]);
    setInput('');
    setIsTyping(true);

    // Simulate AI thinking delay
    setTimeout(() => {
      const response = chatWithAI(msg, sensorReadings);
      setMessages((prev) => [...prev, { id: Date.now() + 1, role: 'ai', text: response }]);
      setIsTyping(false);
    }, 800 + Math.random() * 600);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* FAB Button */}
      <button onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-5 right-5 z-50 w-14 h-14 rounded-full flex items-center justify-center text-white shadow-lg transition-transform hover:scale-110 animate-pulseGlow"
        style={{ background: 'linear-gradient(135deg, var(--color-primary), var(--color-primary-dark))' }}
        aria-label="Ask Agriculture AI">
        {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </button>

      {/* Chat Panel */}
      {isOpen && (
        <div className="fixed bottom-20 right-5 z-50 w-[340px] sm:w-[380px] max-h-[500px] flex flex-col rounded-2xl overflow-hidden animate-scaleIn"
          style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-xl)' }}>

          {/* Header */}
          <div className="px-4 py-3 flex items-center gap-2"
            style={{ background: 'linear-gradient(135deg, var(--color-primary), var(--color-primary-dark))' }}>
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
              <Leaf className="w-4 h-4 text-white" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-bold text-white">Agriculture AI</p>
              <p className="text-[10px] text-white/70">Smart Farming Assistant</p>
            </div>
            <button onClick={() => setIsOpen(false)} className="p-1 rounded-lg text-white/70 hover:text-white">
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-3 space-y-3 max-h-[300px]" style={{ background: 'var(--color-surface-raised)' }}>
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] px-3 py-2 rounded-xl text-xs leading-relaxed ${
                  msg.role === 'user' ? 'rounded-br-sm' : 'rounded-bl-sm'
                }`} style={{
                  background: msg.role === 'user' ? 'var(--color-primary)' : 'var(--color-surface)',
                  color: msg.role === 'user' ? '#FFFFFF' : 'var(--color-text)',
                  border: msg.role === 'ai' ? '1px solid var(--color-border)' : 'none',
                }}>
                  {msg.text}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="px-3 py-2 rounded-xl rounded-bl-sm text-xs"
                  style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', color: 'var(--color-text-muted)' }}>
                  <span className="animate-pulse">Thinking...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Questions */}
          {messages.length <= 2 && (
            <div className="px-3 py-2 flex gap-1.5 overflow-x-auto" style={{ borderTop: '1px solid var(--color-border-light)' }}>
              {quickQuestions.slice(0, 3).map((q) => (
                <button key={q} onClick={() => handleSend(q)}
                  className="shrink-0 px-2.5 py-1 rounded-full text-[10px] font-medium transition-colors"
                  style={{ background: 'var(--color-surface-raised)', color: 'var(--color-text-secondary)', border: '1px solid var(--color-border)' }}>
                  {q}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div className="px-3 py-2 flex items-center gap-2" style={{ borderTop: '1px solid var(--color-border)' }}>
            <input value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={handleKeyDown}
              placeholder="Ask about your farm..."
              className="flex-1 px-3 py-2 rounded-lg text-xs outline-none"
              style={{ background: 'var(--color-surface-raised)', color: 'var(--color-text)', border: '1px solid var(--color-border)' }} />
            <button onClick={() => handleSend()} disabled={!input.trim()}
              className="p-2 rounded-lg text-white transition-opacity disabled:opacity-40"
              style={{ background: 'var(--color-primary)' }}>
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
