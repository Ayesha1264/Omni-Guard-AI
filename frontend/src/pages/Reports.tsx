import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Shield, 
  FileText, 
  Image as ImageIcon, 
  Video, 
  ChevronLeft,
  AlertTriangle,
  CheckCircle2,
  X
} from 'lucide-react';
import { Link } from 'react-router-dom';
import SideMenu from '../components/SideMenu';
import { FadeIn } from '../components/SectionWrapper';
import { cn } from '../lib/utils';

interface HistoryItem {
  id: string;
  type: 'text' | 'image' | 'video';
  date: string;
  result: 'safe' | 'toxic';
  score: number;
}

interface ReportsProps {
  isDark: boolean;
  onLogout: () => void;
}

const Reports: React.FC<ReportsProps> = ({ isDark, onLogout }) => {
  const [history, setHistory] = useState<HistoryItem[]>([]);

  useEffect(() => {
    const loadHistory = () => {
      const saved = localStorage.getItem('omniguard_history');
      if (saved) {
        setHistory(JSON.parse(saved));
      }
    };
    loadHistory();
  }, []);

  const clearHistory = () => {
    localStorage.removeItem('omniguard_history');
    setHistory([]);
  };

  const totalReports = history.length;
  const textReports = history.filter(h => h.type === 'text').length;
  const imageReports = history.filter(h => h.type === 'image').length;
  const videoReports = history.filter(h => h.type === 'video').length;

  return (
    <div className="min-h-screen">
      <SideMenu isDark={isDark} onLogout={onLogout} userName="User" />
      
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
                  Reports
                </h1>
                <p className={cn(
                  'text-lg',
                  isDark ? 'text-slate-400' : 'text-slate-600'
                )}>
                  View your scan history
                </p>
              </div>
            </div>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {[
            {
              title: 'Total Reports',
              value: totalReports,
              icon: FileText,
              color: 'from-primary to-secondary',
            },
            {
              title: 'Text Reports',
              value: textReports,
              icon: FileText,
              color: 'from-blue-500 to-cyan-500',
            },
            {
              title: 'Image Reports',
              value: imageReports,
              icon: ImageIcon,
              color: 'from-purple-500 to-pink-500',
            },
            {
              title: 'Video Reports',
              value: videoReports,
              icon: Video,
              color: 'from-orange-500 to-red-500',
            },
          ].map((stat, idx) => (
            <FadeIn key={idx} delay={idx * 0.1}>
              <motion.div
                whileHover={{ y: -4, scale: 1.02 }}
                className={cn(
                  'p-6 rounded-3xl border transition-all duration-300',
                  isDark 
                    ? 'bg-card border-slate-700/50' 
                    : 'bg-white border-slate-200'
                )}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={cn(
                    'w-14 h-14 rounded-2xl bg-gradient-to-br',
                    stat.color,
                    'flex items-center justify-center shadow-lg'
                  )}>
                    <stat.icon className="w-7 h-7 text-white" />
                  </div>
                </div>
                <p className={cn(
                  'text-4xl font-black mb-1',
                  isDark ? 'text-white' : 'text-slate-900'
                )}>
                  {stat.value}
                </p>
                <p className={cn(
                  'text-sm font-semibold',
                  isDark ? 'text-slate-400' : 'text-slate-600'
                )}>
                  {stat.title}
                </p>
              </motion.div>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.3}>
          <motion.div
            whileHover={{ y: -4 }}
            className={cn(
              'p-6 rounded-3xl border transition-all duration-300',
              isDark 
                ? 'bg-card border-slate-700/50' 
                : 'bg-white border-slate-200'
            )}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className={cn(
                'text-xl font-bold flex items-center gap-3',
                isDark ? 'text-white' : 'text-slate-900'
              )}>
                <Shield className="w-6 h-6 text-primary" />
                Scan History
              </h3>
              {history.length > 0 && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={clearHistory}
                  className="px-4 py-2 rounded-xl bg-red-500/20 text-red-400 font-bold flex items-center gap-2"
                >
                  <X className="w-4 h-4" />
                  Clear History
                </motion.button>
              )}
            </div>

            {history.length > 0 ? (
              <div className="space-y-4">
                {history.map((item, idx) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className={cn(
                      'flex items-center justify-between p-4 rounded-2xl',
                      isDark ? 'bg-slate-800/30' : 'bg-slate-50'
                    )}
                  >
                    <div className="flex items-center gap-4">
                      <div className={cn(
                        'w-12 h-12 rounded-xl flex items-center justify-center',
                        item.type === 'text' ? 'bg-primary/20' :
                        item.type === 'image' ? 'bg-secondary/20' : 'bg-accent/20'
                      )}>
                        {item.type === 'text' ? <FileText className="w-6 h-6 text-primary" /> :
                         item.type === 'image' ? <ImageIcon className="w-6 h-6 text-secondary" /> :
                         <Video className="w-6 h-6 text-accent" />}
                      </div>
                      <div>
                        <p className={cn(
                          'font-bold',
                          isDark ? 'text-white' : 'text-slate-900'
                        )}>
                          {item.type.charAt(0).toUpperCase() + item.type.slice(1)} Scan
                        </p>
                        <p className={cn(
                          'text-xs',
                          isDark ? 'text-slate-500' : 'text-slate-500'
                        )}>
                          {item.date}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className={cn(
                        'px-4 py-2 rounded-xl font-bold text-sm',
                        item.result === 'toxic' 
                          ? 'bg-red-500/20 text-red-400' 
                          : 'bg-green-500/20 text-green-400'
                      )}>
                        {item.result === 'toxic' ? 'Threat Detected' : 'Clean'}
                      </div>
                      <div className={cn(
                        'text-right',
                        isDark ? 'text-slate-400' : 'text-slate-600'
                      )}>
                        <p className="font-bold">{item.score.toFixed(1)}%</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className={cn(
                  'w-24 h-24 rounded-3xl mb-6 flex items-center justify-center',
                  isDark ? 'bg-slate-800' : 'bg-slate-100'
                )}>
                  <FileText className="w-12 h-12 text-primary/50" />
                </div>
                <p className={cn(
                  'text-xl font-bold mb-2',
                  isDark ? 'text-slate-400' : 'text-slate-600'
                )}>
                  No reports yet
                </p>
                <p className={cn(
                  'text-sm',
                  isDark ? 'text-slate-500' : 'text-slate-500'
                )}>
                  Start analyzing content to see reports here
                </p>
              </div>
            )}
          </motion.div>
        </FadeIn>
      </div>
    </div>
  );
};

export default Reports;