import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  MessageSquare, 
  Send, 
  Bot, 
  User, 
  ChevronLeft,
  Loader2
} from 'lucide-react';
import { Link } from 'react-router-dom';
import SideMenu from '../components/SideMenu';
import { FadeIn } from '../components/SectionWrapper';
import { cn } from '../lib/utils';

interface UserData {
  email: string;
  name: string;
  stats: {
    totalScans: number;
    threatsBlocked: number;
    accuracy: number;
    reportsGenerated: number;
  };
  history: Array<{
    id: string;
    type: 'text' | 'image' | 'video';
    date: string;
    result: 'safe' | 'toxic';
    score: number;
  }>;
}

interface ChatbotProps {
  isDark: boolean;
  onLogout: () => void;
  user: UserData | null;
}

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const Chatbot: React.FC<ChatbotProps> = ({ isDark, onLogout, user }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: "Hello! I'm your Omni Guard AI assistant. How can I help you today?",
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const generateBotResponse = (userMessage: string): string => {
    const lowerMsg = userMessage.toLowerCase();
    
    if (lowerMsg.includes('sad') || lowerMsg.includes('upset') || lowerMsg.includes('depressed') || lowerMsg.includes('anxious') || lowerMsg.includes('scared') || lowerMsg.includes('afraid') || lowerMsg.includes('hurt') || lowerMsg.includes('victim')) {
      return "I'm so sorry you're going through this. Your feelings are completely valid, and you don't deserve to be treated this way. Please know that you're not alone, and there's help available. If you ever need someone to talk to, consider reaching out to a trusted friend, family member, or a mental health professional. You matter, and your safety and well-being are the most important things.";
    }
    
    if (lowerMsg.includes('hello') || lowerMsg.includes('hi')) {
      return "Hello! I'm here to help you with anything related to Omni Guard AI or cyber safety. How are you doing today?";
    }
    if (lowerMsg.includes('text analysis') || lowerMsg.includes('text')) {
      return "Our Text Analysis feature uses Toxic BERT and Groq API to detect cyberbullying in text. You can use it on the Text Analysis page!";
    }
    if (lowerMsg.includes('image') || lowerMsg.includes('image detection')) {
      return "Our Image Detection feature combines EasyOCR and OpenAI CLIP to analyze images for harmful content. Check it out on the Image Detection page!";
    }
    if (lowerMsg.includes('video') || lowerMsg.includes('video processing')) {
      return "Our Video Processing feature samples frames and uses Gemini API to detect harmful content. Try it on the Video Processing page!";
    }
    if (lowerMsg.includes('help') || lowerMsg.includes('support')) {
      return "I'm here to help! You can ask me about our features, how to use the system, general cyber safety tips, or if you need someone to talk to about cyberbullying or distress.";
    }
    if (lowerMsg.includes('safe') || lowerMsg.includes('toxic')) {
      return "Our system analyzes content and labels it as 'safe' or 'toxic' with a confidence score. For safe content, the score is always 70% or higher!";
    }
    if (lowerMsg.includes('cyberbullying') || lowerMsg.includes('bullying')) {
      return "Cyberbullying is a serious issue, and no one should have to experience it. Omni Guard AI helps detect harmful content to keep digital spaces safe. If you're being bullied, remember it's not your fault, and there are people who can help. Always be kind to others online!";
    }
    return "Thank you for your message! I can help you with questions about Omni Guard AI features, cyber safety, or if you need emotional support about cyberbullying or related issues. You're not alone!";
  };

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputText,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: generateBotResponse(userMessage.content),
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen">
      <SideMenu isDark={isDark} onLogout={onLogout} userName={user?.name} />
      
      <div className="ml-64 p-8">
        <FadeIn>
          <div className="mb-10">
            <div className="flex items-center gap-4 mb-4">
              <Link to="/dashboard" className={cn(
                'p-2 rounded-xl transition-all duration-300 hover:scale-105',
                isDark ? 'bg-slate-800 hover:bg-slate-700' : 'bg-slate-100 hover:bg-slate-200'
              )}>
                <ChevronLeft className="w-6 h-6" />
              </Link>
              <div>
                <h1 className={cn(
                  'text-4xl font-black mb-2',
                  isDark ? 'text-white' : 'text-slate-900'
                )}>
                  AI Chatbot
                </h1>
                <p className={cn(
                  'text-lg',
                  isDark ? 'text-slate-400' : 'text-slate-600'
                )}>
                  Ask questions about Omni Guard AI and cyber safety
                </p>
              </div>
            </div>
          </div>
        </FadeIn>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={cn(
            'rounded-3xl border overflow-hidden flex flex-col h-[calc(100vh-200px)]',
            isDark 
              ? 'bg-card border-slate-700/50' 
              : 'bg-white border-slate-200'
          )}
        >
          <div className={cn(
            'p-6 border-b',
            isDark ? 'border-slate-700/50' : 'border-slate-200'
          )}>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <Bot className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className={cn(
                  'text-xl font-bold',
                  isDark ? 'text-white' : 'text-slate-900'
                )}>
                  Omni Guard Assistant
                </h3>
                <p className={cn(
                  'text-sm',
                  isDark ? 'text-slate-400' : 'text-slate-500'
                )}>
                  Online and ready to help
                </p>
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, x: message.role === 'user' ? 20 : -20 }}
                animate={{ opacity: 1, x: 0 }}
                className={cn(
                  'flex gap-3',
                  message.role === 'user' ? 'justify-end' : 'justify-start'
                )}
              >
                {message.role === 'assistant' && (
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center flex-shrink-0">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                )}
                <div className={cn(
                  'max-w-[70%] p-4 rounded-2xl',
                  message.role === 'user'
                    ? 'bg-gradient-to-r from-primary to-secondary text-white'
                    : isDark
                    ? 'bg-slate-800 text-slate-200'
                    : 'bg-slate-100 text-slate-800'
                )}>
                  <p className="text-base leading-relaxed">{message.content}</p>
                  <p className={cn(
                    'text-xs mt-2 opacity-70',
                    message.role === 'user' ? 'text-white/70' : ''
                  )}>
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
                {message.role === 'user' && (
                  <div className="w-8 h-8 rounded-full bg-slate-500 flex items-center justify-center flex-shrink-0">
                    <User className="w-4 h-4 text-white" />
                  </div>
                )}
              </motion.div>
            ))}
            {isTyping && (
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div className={cn(
                  'p-4 rounded-2xl',
                  isDark ? 'bg-slate-800' : 'bg-slate-100'
                )}>
                  <div className="flex gap-2">
                    <motion.div
                      animate={{ y: [0, -10, 0] }}
                      transition={{ duration: 1, repeat: Infinity, delay: 0 }}
                      className="w-2 h-2 rounded-full bg-primary"
                    />
                    <motion.div
                      animate={{ y: [0, -10, 0] }}
                      transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
                      className="w-2 h-2 rounded-full bg-primary"
                    />
                    <motion.div
                      animate={{ y: [0, -10, 0] }}
                      transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
                      className="w-2 h-2 rounded-full bg-primary"
                    />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className={cn(
            'p-6 border-t',
            isDark ? 'border-slate-700/50' : 'border-slate-200'
          )}>
            <form onSubmit={handleSend} className="flex gap-3">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Type your message here..."
                className={cn(
                  'flex-1 px-6 py-4 rounded-2xl border focus:outline-none focus:ring-2 focus:ring-primary transition-all',
                  isDark
                    ? 'bg-slate-800 border-slate-700 text-white placeholder-slate-500'
                    : 'bg-white border-slate-300 text-slate-900 placeholder-slate-400'
                )}
              />
              <button
                type="submit"
                disabled={!inputText.trim() || isTyping}
                className="px-6 py-4 rounded-2xl bg-gradient-to-r from-primary to-secondary text-white font-bold text-lg shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="w-5 h-5" />
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Chatbot;