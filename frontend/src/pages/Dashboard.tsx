import React from 'react';
import { motion } from 'framer-motion';
import { 
  Shield, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle2, 
  BarChart3, 
  PieChart as PieChartIcon, 
  FileText,
  Image as ImageIcon,
  Video,
  Eye
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  PieChart, 
  Pie, 
  RadarChart, 
  Radar, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
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

interface DashboardProps {
  isDark: boolean;
  onLogout: () => void;
  user: UserData | null;
}

const Dashboard: React.FC<DashboardProps> = ({ isDark, onLogout, user }) => {
  const weeklyData = [
    { day: 'Mon', scans: 12, threats: 3 },
    { day: 'Tue', scans: 19, threats: 1 },
    { day: 'Wed', scans: 15, threats: 5 },
    { day: 'Thu', scans: 22, threats: 2 },
    { day: 'Fri', scans: 17, threats: 4 },
    { day: 'Sat', scans: 25, threats: 6 },
    { day: 'Sun', scans: 14, threats: 2 },
  ];

  const contentData = [
    { name: 'Text', value: 45, color: '#6366f1' },
    { name: 'Image', value: 30, color: '#8b5cf6' },
    { name: 'Video', value: 25, color: '#ec4899' },
  ];

  const performanceData = [
    { subject: 'Accuracy', A: user?.stats.accuracy || 0, fullMark: 100 },
    { subject: 'Speed', A: 92, fullMark: 100 },
    { subject: 'Precision', A: 95, fullMark: 100 },
    { subject: 'Recall', A: 90, fullMark: 100 },
    { subject: 'F1-Score', A: 93, fullMark: 100 },
  ];

  const statCards = [
    {
      title: 'Total Scans',
      value: user?.stats.totalScans || 0,
      icon: Eye,
      color: 'from-primary to-secondary',
    },
    {
      title: 'Threats Blocked',
      value: user?.stats.threatsBlocked || 0,
      icon: AlertTriangle,
      color: 'from-red-500 to-orange-500',
    },
    {
      title: 'Accuracy',
      value: `${user?.stats.accuracy || 0}%`,
      icon: CheckCircle2,
      color: 'from-green-500 to-emerald-500',
    },
    {
      title: 'Reports',
      value: user?.stats.reportsGenerated || 0,
      icon: FileText,
      color: 'from-blue-500 to-cyan-500',
    },
  ];

  const getTooltipStyle = () => ({
    backgroundColor: isDark ? '#1e293b' : '#ffffff',
    border: 'none',
    borderRadius: '12px',
    color: isDark ? '#f8fafc' : '#0f172a'
  });

  return (
    <ProtectedLayout isDark={isDark} onLogout={onLogout} userName={user?.name}>
      <FadeIn>
        <div className="mb-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className={cn(
                'text-3xl md:text-4xl font-black mb-2',
                isDark ? 'text-white' : 'text-slate-900'
              )}>
                Dashboard
              </h1>
              <p className={cn(
                'text-base md:text-lg',
                isDark ? 'text-slate-400' : 'text-slate-600'
              )}>
                Welcome back, {user?.name} — your cyber safety overview
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className={cn(
                'px-6 py-3 rounded-2xl',
                isDark ? 'bg-green-500/10' : 'bg-green-100'
              )}>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                  <span className={cn(
                    'font-bold',
                    isDark ? 'text-green-400' : 'text-green-700'
                  )}>
                    System Online
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </FadeIn>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {statCards.map((stat, idx) => (
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
                <TrendingUp className="w-5 h-5 text-green-500" />
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
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
            <h3 className={cn(
              'text-xl font-bold mb-6 flex items-center gap-3',
              isDark ? 'text-white' : 'text-slate-900'
            )}>
              <BarChart3 className="w-6 h-6 text-primary" />
              Weekly Detection
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#334155' : '#e2e8f0'} />
                <XAxis dataKey="day" stroke={isDark ? '#94a3b8' : '#64748b'} />
                <YAxis stroke={isDark ? '#94a3b8' : '#64748b'} />
                <Tooltip contentStyle={getTooltipStyle()} />
                <Legend />
                <Bar dataKey="scans" fill="#6366f1" radius={[8, 8, 0, 0]} />
                <Bar dataKey="threats" fill="#ef4444" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>
        </FadeIn>

        <FadeIn delay={0.4}>
          <motion.div
            whileHover={{ y: -4 }}
            className={cn(
              'p-6 rounded-3xl border transition-all duration-300',
              isDark 
                ? 'bg-card border-slate-700/50' 
                : 'bg-white border-slate-200'
            )}
          >
            <h3 className={cn(
              'text-xl font-bold mb-6 flex items-center gap-3',
              isDark ? 'text-white' : 'text-slate-900'
            )}>
              <PieChartIcon className="w-6 h-6 text-primary" />
              Content Distribution
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={contentData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${percent ? (percent * 100).toFixed(0) : 0}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {contentData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={getTooltipStyle()} />
              </PieChart>
            </ResponsiveContainer>
          </motion.div>
        </FadeIn>
      </div>

      <FadeIn delay={0.5}>
        <motion.div
          whileHover={{ y: -4 }}
          className={cn(
            'p-6 rounded-3xl border transition-all duration-300',
            isDark 
              ? 'bg-card border-slate-700/50' 
              : 'bg-white border-slate-200'
          )}
        >
          <h3 className={cn(
            'text-xl font-bold mb-6 flex items-center gap-3',
            isDark ? 'text-white' : 'text-slate-900'
          )}>
            <Shield className="w-6 h-6 text-primary" />
            Model Performance
          </h3>
          <ResponsiveContainer width="100%" height={350}>
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={performanceData}>
              <PolarGrid stroke={isDark ? '#334155' : '#e2e8f0'} />
              <PolarAngleAxis dataKey="subject" stroke={isDark ? '#94a3b8' : '#64748b'} />
              <PolarRadiusAxis stroke={isDark ? '#94a3b8' : '#64748b'} />
              <Radar
                name="Performance"
                dataKey="A"
                stroke="#6366f1"
                fill="#6366f1"
                fillOpacity={0.6}
              />
              <Tooltip contentStyle={getTooltipStyle()} />
            </RadarChart>
          </ResponsiveContainer>
        </motion.div>
      </FadeIn>

      {user?.history && user.history.length > 0 && (
        <FadeIn delay={0.6} className="mt-10">
          <motion.div
            whileHover={{ y: -4 }}
            className={cn(
              'p-6 rounded-3xl border transition-all duration-300',
              isDark 
                ? 'bg-card border-slate-700/50' 
                : 'bg-white border-slate-200'
            )}
          >
            <h3 className={cn(
              'text-xl font-bold mb-6 flex items-center gap-3',
              isDark ? 'text-white' : 'text-slate-900'
            )}>
              <FileText className="w-6 h-6 text-primary" />
              Recent Activity
            </h3>
            <div className="space-y-4">
              {user.history.slice(0, 5).map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className={cn(
                    'flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-4 rounded-2xl',
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
                  <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
                    <div className={cn(
                      'px-4 py-2 rounded-xl font-bold text-sm',
                      item.result === 'toxic' 
                        ? 'bg-red-500/20 text-red-400' 
                        : 'bg-green-500/20 text-green-400'
                    )}>
                      {item.result.toUpperCase()}
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
          </motion.div>
        </FadeIn>
      )}
    </ProtectedLayout>
  );
};

export default Dashboard;
