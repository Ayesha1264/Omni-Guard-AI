import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Menu, X, ChevronRight, Sun, Moon, Newspaper } from 'lucide-react';
import { cn } from '../lib/utils';

interface NavbarProps {
  isDark: boolean;
  toggleTheme: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ isDark, toggleTheme }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location]);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Features', href: '/features' },
    { name: 'Impact', href: '/impact' },
    { name: 'Mission', href: '/mission' },
    { name: 'News', href: '/news', icon: Newspaper },
  ];

  return (
    <nav className={cn(
      'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
      isScrolled ? 'glass shadow-lg' : 'bg-transparent'
    )}>
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <motion.div whileHover={{ scale: 1.05 }}>
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center animate-pulse-slow">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-black tracking-tight">
                Omni <span className="gradient-text">Guard AI</span>
              </span>
            </Link>
          </motion.div>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link, index) => (
              <motion.div
                key={link.name}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  to={link.href}
                  className={cn(
                    'font-medium transition-colors relative group flex items-center gap-2',
                    location.pathname === link.href
                      ? 'text-primary'
                      : isDark ? 'text-slate-300 hover:text-white' : 'text-slate-600 hover:text-slate-900'
                  )}
                >
                  {link.icon && <link.icon className="w-4 h-4" />}
                  {link.name}
                  <span className={cn(
                    'absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-secondary transition-all duration-300 group-hover:w-full',
                    location.pathname === link.href && 'w-full'
                  )} />
                </Link>
              </motion.div>
            ))}
            
            <motion.button
              onClick={toggleTheme}
              className={cn(
                'p-2 rounded-full transition-all duration-300',
                isDark ? 'bg-card hover:bg-card-light' : 'bg-slate-100 hover:bg-slate-200'
              )}
              whileHover={{ scale: 1.1, rotate: 15 }}
              whileTap={{ scale: 0.9 }}
            >
              {isDark ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-indigo-600" />}
            </motion.button>
            
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
              <Link
                to="/login"
                className="px-6 py-2.5 rounded-full bg-gradient-to-r from-primary to-secondary text-white font-semibold hover:shadow-lg hover:shadow-primary/30 transition-all duration-300 flex items-center gap-2"
              >
                Get Started
                <ChevronRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </div>

          <div className="flex items-center gap-4 md:hidden">
            <motion.button
              onClick={toggleTheme}
              className={cn(
                'p-2 rounded-full',
                isDark ? 'bg-card' : 'bg-slate-100'
              )}
              whileTap={{ scale: 0.9 }}
            >
              {isDark ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-indigo-600" />}
            </motion.button>
            <button 
              className="text-white"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className={cn(
              'md:hidden glass border-t overflow-hidden',
              isDark ? 'border-slate-700/30' : 'border-slate-200'
            )}
          >
            <div className="flex flex-col p-6 gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className={cn(
                    'text-lg font-medium py-2 flex items-center gap-2',
                    location.pathname === link.href
                      ? 'text-primary'
                      : isDark ? 'text-slate-300 hover:text-white' : 'text-slate-600 hover:text-slate-900'
                  )}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.icon && <link.icon className="w-5 h-5" />}
                  {link.name}
                </Link>
              ))}
              <Link
                to="/login"
                className="mt-4 px-6 py-3 rounded-full bg-gradient-to-r from-primary to-secondary text-white font-semibold text-center"
                onClick={() => setMobileMenuOpen(false)}
              >
                Get Started
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
