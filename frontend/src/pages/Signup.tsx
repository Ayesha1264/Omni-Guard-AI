import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, Mail, Lock, User, ArrowRight, Eye, EyeOff, ChevronLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { cn } from '../lib/utils';

interface SignupProps {
  isDark: boolean;
  onSignup: (name: string, email: string, password: string) => Promise<{ success: boolean; error?: string }>;
}

const Signup: React.FC<SignupProps> = ({ isDark, onSignup }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Signup handleSubmit called');
    console.log('Agreed:', agreed);
    console.log('Name:', name);
    console.log('Email:', email);
    console.log('Password:', password);
    
    if (!agreed) {
      console.log('Not agreed, returning early');
      return;
    }
    
    setError('');
    setLoading(true);

    const result = await onSignup(name, email, password);
    console.log('Signup result:', result);
    setLoading(false);

    if (result.success) {
      console.log('Signup success, navigating to dashboard');
      navigate('/dashboard');
    } else {
      console.log('Signup failed:', result.error);
      setError(result.error || 'Signup failed, please try again');
    }
  };

  const shapes = [
    { type: 'circle', size: 80, color: 'from-primary/40 to-secondary/40', delay: 0 },
    { type: 'hexagon', size: 100, color: 'from-secondary/30 to-accent/30', delay: 0.3 },
    { type: 'square', size: 90, color: 'from-accent/40 to-primary/40', delay: 0.6 },
    { type: 'triangle', size: 110, color: 'from-primary/20 to-secondary/20', delay: 0.9 },
    { type: 'circle', size: 70, color: 'from-accent/30 to-primary/30', delay: 1.2 },
    { type: 'hexagon', size: 85, color: 'from-secondary/20 to-accent/20', delay: 1.5 },
    { type: 'square', size: 105, color: 'from-primary/30 to-accent/30', delay: 1.8 },
    { type: 'triangle', size: 95, color: 'from-secondary/40 to-primary/40', delay: 2.1 },
  ];

  const getShapeClassName = (type: string, color: string) => {
    switch (type) {
      case 'circle':
        return cn('absolute bg-gradient-to-br rounded-full', color);
      case 'square':
        return cn('absolute bg-gradient-to-br rotate-45', color);
      case 'hexagon':
        return cn('absolute bg-gradient-to-br', color);
      case 'triangle':
        return cn('absolute bg-gradient-to-br', color);
      default:
        return cn('absolute bg-gradient-to-br rounded-full', color);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden p-4 lg:p-8">
      <div className="absolute inset-0 overflow-hidden">
        {shapes.map((shape, i) => (
          <motion.div
            key={i}
            className={getShapeClassName(shape.type, shape.color)}
            style={{
              width: shape.size,
              height: shape.size,
              left: `${5 + i * 12}%`,
              top: `${5 + (i % 4) * 25}%`,
              clipPath: shape.type === 'hexagon' 
                ? 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' 
                : shape.type === 'triangle' 
                ? 'polygon(50% 0%, 0% 100%, 100% 100%)' 
                : 'none',
            }}
            animate={{
              x: [0, 60, -40, 0],
              y: [0, -40, 50, 0],
              rotate: [0, 180, 360],
              scale: [1, 1.15, 0.85, 1],
            }}
            transition={{
              duration: 10 + i * 1.5,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: shape.delay,
            }}
          />
        ))}
      </div>

      <Link 
        to="/" 
        className="absolute top-8 left-8 z-50"
      >
        <motion.button
          whileHover={{ scale: 1.1, x: -4 }}
          whileTap={{ scale: 0.95 }}
          className={cn(
            'p-3 rounded-2xl flex items-center gap-2',
            isDark 
              ? 'bg-slate-800/80 hover:bg-slate-700' 
              : 'bg-white/80 hover:bg-white'
          )}
        >
          <ChevronLeft className="w-6 h-6" />
          <span className="font-bold">Back to Home</span>
        </motion.button>
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6 }}
        className={cn(
          'w-full max-w-6xl mx-4 rounded-3xl overflow-hidden shadow-2xl relative z-10',
          isDark 
            ? 'bg-card' 
            : 'bg-white'
        )}
      >
        <div className="grid lg:grid-cols-2">
          <div className="p-8 lg:p-16 order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="mb-10">
                <h2 className={cn(
                  'text-3xl font-black mb-2',
                  isDark ? 'text-white' : 'text-slate-900'
                )}>
                  Create an Account
                </h2>
                <p className={cn(
                  'text-sm',
                  isDark ? 'text-slate-400' : 'text-slate-600'
                )}>
                  Join the global cyber safety network
                </p>
              </div>
            </motion.div>

            <motion.form
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              onSubmit={handleSubmit}
              className="space-y-6"
            >
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 rounded-2xl bg-red-500/20 border border-red-500/50 text-red-400 text-sm font-semibold"
                >
                  {error}
                </motion.div>
              )}

              <div>
                <label className={cn(
                  'block text-xs font-semibold mb-2 uppercase tracking-wider',
                  isDark ? 'text-primary' : 'text-primary'
                )}>
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary/50" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={cn(
                      'w-full pl-12 pr-4 py-4 rounded-2xl border-2 focus:outline-none focus:border-primary transition-all duration-300',
                      isDark 
                        ? 'bg-slate-800/50 border-slate-700 text-white placeholder-slate-500' 
                        : 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400'
                    )}
                    placeholder="Cyber Guardian"
                    required
                  />
                </div>
              </div>

              <div>
                <label className={cn(
                  'block text-xs font-semibold mb-2 uppercase tracking-wider',
                  isDark ? 'text-primary' : 'text-primary'
                )}>
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary/50" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={cn(
                      'w-full pl-12 pr-4 py-4 rounded-2xl border-2 focus:outline-none focus:border-primary transition-all duration-300',
                      isDark 
                        ? 'bg-slate-800/50 border-slate-700 text-white placeholder-slate-500' 
                        : 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400'
                    )}
                    placeholder="guardian@omni.ai"
                    required
                  />
                </div>
              </div>

              <div>
                <label className={cn(
                  'block text-xs font-semibold mb-2 uppercase tracking-wider',
                  isDark ? 'text-primary' : 'text-primary'
                )}>
                  Access Key (Password)
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary/50" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={cn(
                      'w-full pl-12 pr-12 py-4 rounded-2xl border-2 focus:outline-none focus:border-primary transition-all duration-300',
                      isDark 
                        ? 'bg-slate-800/50 border-slate-700 text-white placeholder-slate-500' 
                        : 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400'
                    )}
                    placeholder="••••••••"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5 text-slate-400" />
                    ) : (
                      <Eye className="w-5 h-5 text-slate-400" />
                    )}
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="agreed"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  className="w-4 h-4 rounded border-slate-300 text-primary focus:ring-primary"
                />
                <label htmlFor="agreed" className={cn(
                  'text-xs font-semibold',
                  isDark ? 'text-slate-400' : 'text-slate-600'
                )}>
                  I agree to the cyber safety protocol
                </label>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={!agreed || loading}
                className="w-full px-8 py-4 rounded-2xl bg-gradient-to-r from-primary to-secondary text-white font-bold text-lg shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Creating Account...' : 'Deploy Node'}
                {!loading && <ArrowRight className="w-5 h-5" />}
              </motion.button>
            </motion.form>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mt-10 text-center"
            >
              <p className={cn(
                'text-xs',
                isDark ? 'text-slate-500' : 'text-slate-500'
              )}>
                Already registered?{' '}
                <Link to="/login" className="text-primary font-bold hover:underline">
                  Sign In
                </Link>
              </p>
            </motion.div>
          </div>

          <div className={cn(
            'p-8 lg:p-16 flex flex-col justify-between order-1 lg:order-2',
            isDark 
              ? 'bg-gradient-to-br from-primary/5 to-secondary/5' 
              : 'bg-gradient-to-br from-primary/5 to-secondary/5'
          )}>
            <div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="flex items-center gap-3 mb-10"
              >
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-black tracking-tight">
                  Omni <span className="gradient-text">Guard AI</span>
                </span>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <h1 className={cn(
                  'text-4xl md:text-5xl font-black mb-6 leading-tight',
                  isDark ? 'text-white' : 'text-slate-900'
                )}>
                  Secure Your
                  <br />
                  <span className="gradient-text">Environment.</span>
                </h1>
                <p className={cn(
                  'text-lg mb-10',
                  isDark ? 'text-slate-400' : 'text-slate-600'
                )}>
                  Join thousands of guardians worldwide in monitoring and protecting our planet's digital ecosystems.
                </p>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className={cn(
                'p-6 rounded-3xl',
                isDark ? 'bg-slate-800/50' : 'bg-slate-100'
              )}
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                  <Shield className="w-7 h-7 text-primary" />
                </div>
                <div>
                  <p className={cn(
                    'text-sm font-black',
                    isDark ? 'text-white' : 'text-slate-900'
                  )}>
                    ENCRYPTED NODE
                  </p>
                  <p className={cn(
                    'text-xs',
                    isDark ? 'text-slate-400' : 'text-slate-600'
                  )}>
                    AES-256 PROTOCOL
                  </p>
                </div>
              </div>
              <p className={cn(
                'text-xs leading-relaxed',
                isDark ? 'text-slate-400' : 'text-slate-600'
              )}>
                Your data is protected by industry-leading encryption and decentralized ledger technology.
              </p>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Signup;
