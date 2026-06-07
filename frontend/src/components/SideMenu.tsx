import React from 'react';
import { motion } from 'framer-motion';
import { 
  Home, 
  FileText, 
  Image as ImageIcon, 
  Video, 
  User, 
  Shield, 
  LogOut,
  MessageSquare
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '../lib/utils';

interface SideMenuProps {
  isDark: boolean;
  onLogout: () => void;
  userName?: string;
}

const SideMenu: React.FC<SideMenuProps> = ({ isDark, onLogout, userName }) => {
  const location = useLocation();

  const menuItems = [
    { icon: Home, label: 'Dashboard', path: '/dashboard' },
    { icon: FileText, label: 'Text Analysis', path: '/text-analysis' },
    { icon: ImageIcon, label: 'Image Detection', path: '/image-detection' },
    { icon: Video, label: 'Video Processing', path: '/video-processing' },
    { icon: MessageSquare, label: 'AI Chatbot', path: '/chatbot' },
    { icon: Shield, label: 'Reports', path: '/reports' },
    { icon: User, label: 'Account', path: '/account' },
  ];

  return (
    <motion.div
      initial={{ x: -300 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={cn(
        'w-64 h-screen fixed left-0 top-0 z-40 flex flex-col py-8 px-4',
        isDark 
          ? 'bg-gradient-to-b from-dark to-darker border-r border-slate-700/50' 
          : 'bg-gradient-to-b from-slate-50 to-white border-r border-slate-200'
      )}
    >
      <div className="flex items-center gap-3 mb-8 px-2">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary via-secondary to-accent flex items-center justify-center shadow-lg shadow-primary/30">
          <Shield className="w-6 h-6 text-white" />
        </div>
        <span className={cn(
          'text-xl font-black',
          isDark ? 'text-white' : 'text-slate-900'
        )}>
          Omni<span className="gradient-text">Guard</span>
        </span>
      </div>

      {userName && (
        <div className={cn(
          'px-4 py-3 rounded-2xl mb-8',
          isDark ? 'bg-slate-800/30' : 'bg-slate-100'
        )}>
          <p className={cn(
            'text-xs font-semibold uppercase tracking-wider mb-1',
            isDark ? 'text-slate-500' : 'text-slate-500'
          )}>
            Active Node
          </p>
          <p className={cn(
            'font-bold',
            isDark ? 'text-white' : 'text-slate-900'
          )}>
            {userName}
          </p>
        </div>
      )}

      <nav className="flex-1 space-y-2">
        {menuItems.map((item, idx) => {
          const isActive = location.pathname === item.path;
          return (
            <Link key={idx} to={item.path}>
              <motion.div
                whileHover={{ x: 4, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={cn(
                  'flex items-center gap-4 px-4 py-3 rounded-2xl transition-all duration-300',
                  isActive
                    ? 'bg-gradient-to-r from-primary/20 to-secondary/20 border border-primary/30'
                    : cn(
                        'hover:bg-slate-800/30',
                        isDark 
                          ? 'text-slate-300 hover:text-white' 
                          : 'text-slate-600 hover:text-slate-900'
                      )
                )}
              >
                <item.icon className={cn(
                  'w-5 h-5',
                  isActive ? 'text-primary' : ''
                )} />
                <span className="font-semibold">{item.label}</span>
              </motion.div>
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto">
        <motion.button
          onClick={onLogout}
          whileHover={{ x: 4, scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={cn(
            'flex items-center gap-4 px-4 py-3 rounded-2xl transition-all duration-300 w-full',
            isDark 
              ? 'text-slate-300 hover:text-white hover:bg-red-500/10' 
              : 'text-slate-600 hover:text-slate-900 hover:bg-red-50'
          )}
        >
          <LogOut className="w-5 h-5" />
          <span className="font-semibold">Log Out</span>
        </motion.button>
      </div>
    </motion.div>
  );
};

export default SideMenu;
