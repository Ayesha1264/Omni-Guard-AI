import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  Lock, 
  Mail, 
  Camera, 
  CheckCircle2, 
  Shield, 
  ArrowRight 
} from 'lucide-react';
import ProtectedLayout from '../components/ProtectedLayout';
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

interface AccountProps {
  isDark: boolean;
  onLogout: () => void;
  user: UserData | null;
}

const Account: React.FC<AccountProps> = ({ isDark, onLogout, user }) => {
  const [name, setName] = useState(user?.name || 'John Doe');
  const [email, setEmail] = useState(user?.email || 'john@example.com');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleResetPassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword === confirmPassword) {
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    }
  };

  return (
    <ProtectedLayout isDark={isDark} onLogout={onLogout} userName={user?.name}>
      <FadeIn>
        <div className="mb-10">
          <h1 className={cn(
            'text-3xl md:text-4xl font-black mb-2',
            isDark ? 'text-white' : 'text-slate-900'
          )}>
            Account Settings
          </h1>
          <p className={cn(
            'text-base md:text-lg',
            isDark ? 'text-slate-400' : 'text-slate-600'
          )}>
            Manage your profile and security settings
          </p>
        </div>
      </FadeIn>

      {showSuccess && (
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="fixed top-4 right-4 z-50 bg-green-500 text-white px-8 py-4 rounded-2xl shadow-2xl flex items-center gap-3"
        >
          <CheckCircle2 className="w-6 h-6" />
          <span className="font-bold">Settings updated successfully!</span>
        </motion.div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <FadeIn delay={0.1}>
            <motion.div
              whileHover={{ y: -4 }}
              className={cn(
                'rounded-3xl p-8 transition-all duration-300 text-center',
                isDark 
                  ? 'glass-card shadow-xl shadow-primary/10 border border-slate-700/50' 
                  : 'bg-white shadow-xl shadow-slate-200 border border-slate-200'
              )}
            >
              <div className="relative inline-block mb-6">
                <div className="w-28 h-28 md:w-32 md:h-32 rounded-full bg-gradient-to-br from-primary via-secondary to-accent flex items-center justify-center shadow-lg shadow-primary/30">
                  <User className="w-14 h-14 md:w-16 md:h-16 text-white" />
                </div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="absolute bottom-2 right-2 w-10 h-10 rounded-full bg-primary flex items-center justify-center shadow-lg"
                >
                  <Camera className="w-5 h-5 text-white" />
                </motion.button>
              </div>
              <h3 className={cn(
                'text-xl md:text-2xl font-black mb-2',
                isDark ? 'text-white' : 'text-slate-900'
              )}>
                {name}
              </h3>
              <p className={cn(
                'text-base md:text-lg mb-6',
                isDark ? 'text-slate-400' : 'text-slate-600'
              )}>
                {email}
              </p>
              <div className="flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-green-500/20 text-green-400">
                <Shield className="w-5 h-5" />
                <span className="font-bold">Verified Account</span>
              </div>
            </motion.div>
          </FadeIn>
        </div>

        <div className="lg:col-span-2 space-y-8">
          <FadeIn delay={0.2}>
            <motion.div
              whileHover={{ y: -4 }}
              className={cn(
                'rounded-3xl p-6 md:p-8 transition-all duration-300',
                isDark 
                  ? 'glass-card shadow-xl shadow-primary/10 border border-slate-700/50' 
                  : 'bg-white shadow-xl shadow-slate-200 border border-slate-200'
              )}
            >
              <h3 className={cn(
                'text-xl md:text-2xl font-bold mb-6',
                isDark ? 'text-white' : 'text-slate-900'
              )}>
                Edit Profile
              </h3>
              <form onSubmit={handleUpdateProfile} className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary" />
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
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary" />
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
                    />
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full px-8 py-4 rounded-2xl bg-gradient-to-r from-primary to-secondary text-white font-bold text-lg shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 transition-all duration-300 flex items-center justify-center gap-3"
                >
                  Save Changes
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </form>
            </motion.div>
          </FadeIn>

          <FadeIn delay={0.3}>
            <motion.div
              whileHover={{ y: -4 }}
              className={cn(
                'rounded-3xl p-6 md:p-8 transition-all duration-300',
                isDark 
                  ? 'glass-card shadow-xl shadow-primary/10 border border-slate-700/50' 
                  : 'bg-white shadow-xl shadow-slate-200 border border-slate-200'
              )}
            >
              <h3 className={cn(
                'text-xl md:text-2xl font-bold mb-6',
                isDark ? 'text-white' : 'text-slate-900'
              )}>
                Change Password
              </h3>
              <form onSubmit={handleResetPassword} className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Current Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary" />
                    <input
                      type="password"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      className={cn(
                        'w-full pl-12 pr-4 py-4 rounded-2xl border-2 focus:outline-none focus:border-primary transition-all duration-300',
                        isDark 
                          ? 'bg-slate-800/50 border-slate-700 text-white placeholder-slate-500' 
                          : 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400'
                      )}
                      placeholder="••••••••"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">
                    New Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary" />
                    <input
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className={cn(
                        'w-full pl-12 pr-4 py-4 rounded-2xl border-2 focus:outline-none focus:border-primary transition-all duration-300',
                        isDark 
                          ? 'bg-slate-800/50 border-slate-700 text-white placeholder-slate-500' 
                          : 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400'
                      )}
                      placeholder="••••••••"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Confirm New Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary" />
                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className={cn(
                        'w-full pl-12 pr-4 py-4 rounded-2xl border-2 focus:outline-none focus:border-primary transition-all duration-300',
                        isDark 
                          ? 'bg-slate-800/50 border-slate-700 text-white placeholder-slate-500' 
                          : 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400'
                      )}
                      placeholder="••••••••"
                    />
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full px-8 py-4 rounded-2xl bg-gradient-to-r from-primary to-secondary text-white font-bold text-lg shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 transition-all duration-300 flex items-center justify-center gap-3"
                >
                  Update Password
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </form>
            </motion.div>
          </FadeIn>
        </div>
      </div>
    </ProtectedLayout>
  );
};

export default Account;
