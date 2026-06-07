import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, Shield } from 'lucide-react';
import SideMenu from './SideMenu';
import { cn } from '../lib/utils';

interface ProtectedLayoutProps {
  isDark: boolean;
  onLogout: () => void;
  userName?: string;
  children: React.ReactNode;
}

const ProtectedLayout: React.FC<ProtectedLayoutProps> = ({ 
  isDark, 
  onLogout, 
  userName, 
  children 
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className={cn(
      "flex h-screen overflow-hidden",
      isDark ? "bg-slate-950" : "bg-slate-50"
    )}>
      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 py-3 bg-opacity-95 backdrop-blur-md border-b" style={{
        background: isDark ? 'rgba(15, 23, 42, 0.95)' : 'rgba(248, 250, 252, 0.95)',
        borderColor: isDark ? 'rgba(51, 65, 85, 0.5)' : 'rgba(226, 232, 240, 0.5)'
      }}>
        <button
          onClick={() => setIsMobileMenuOpen(true)}
          className="p-2 rounded-xl hover:bg-opacity-10"
          style={{
            color: isDark ? '#f8fafc' : '#0f172a',
            backgroundColor: isDark ? 'rgba(51, 65, 85, 0.3)' : 'rgba(226, 232, 240, 0.5)'
          }}
        >
          <Menu className="w-6 h-6" />
        </button>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary via-secondary to-accent flex items-center justify-center">
            <Shield className="w-5 h-5 text-white" />
          </div>
          <span className={cn(
            'text-lg font-black',
            isDark ? 'text-white' : 'text-slate-900'
          )}>
            Omni<span className="text-primary">Guard</span>
          </span>
        </div>
        <div className="w-10" /> {/* Spacer for balance */}
      </div>

      {/* Backdrop */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMobileMenuOpen(false)}
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <div className={cn(
        "absolute inset-y-0 left-0 z-50 w-64 transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0",
        isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <SideMenu 
          isDark={isDark} 
          onLogout={onLogout} 
          userName={userName}
          onClose={() => setIsMobileMenuOpen(false)}
        />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-screen overflow-y-auto pt-16 md:pt-0">
        <div className="p-4 md:p-8 max-w-7xl mx-auto w-full">
          {children}
        </div>
      </div>
    </div>
  );
};

export default ProtectedLayout;
