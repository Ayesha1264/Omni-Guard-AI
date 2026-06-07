import React from 'react';
import { motion } from 'framer-motion';
import { 
  Search,
  Target,
  Ban,
  Users,
  TrendingUp,
  Trophy,
  Heart,
  Globe
} from 'lucide-react';
import { SectionWrapper, FadeIn } from '../components/SectionWrapper';

interface ImpactProps {
  isDark: boolean;
}

const Impact: React.FC<ImpactProps> = ({ isDark }) => {
  const impactStats = [
    { number: '1M+', label: 'Contents Analyzed', icon: Search, color: 'from-blue-500 to-cyan-500' },
    { number: '95%', label: 'Accuracy Rate', icon: Target, color: 'from-purple-500 to-indigo-500' },
    { number: '50K+', label: 'Threats Blocked', icon: Ban, color: 'from-red-500 to-orange-500' },
    { number: '1K+', label: 'Active Users', icon: Users, color: 'from-green-500 to-emerald-500' }
  ];

  const impactPoints = [
    {
      icon: Trophy,
      title: 'Protecting Youth',
      description: '37% of teens experience cyberbullying. Omni Guard AI helps identify and prevent harmful content targeting young people online.'
    },
    {
      icon: Heart,
      title: 'Mental Health',
      description: 'Cyberbullying increases risk of depression and anxiety. Early detection helps protect mental wellbeing of users.'
    },
    {
      icon: Globe,
      title: 'Community Safety',
      description: 'Building safer online communities by giving moderators and platforms tools to detect harmful content quickly.'
    }
  ];

  return (
    <>
      <SectionWrapper className="pt-32 hero-bg">
        <div className="max-w-7xl mx-auto px-6">
          <FadeIn className="text-center">
            <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-gradient-to-r from-primary/20 to-secondary/20 border border-primary/30 mb-8">
              <TrendingUp className="w-4 h-4 text-primary" />
              <span className="text-sm font-semibold text-primary">Our Impact</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black leading-tight mb-6">
              Making the Internet
              <br />
              <span className="gradient-text">Safer Every Day</span>
            </h1>
            <p className={`text-xl max-w-3xl mx-auto ${
              isDark ? 'text-slate-400' : 'text-slate-600'
            }`}>
              Real-time detection that protects users from harmful content across multiple platforms.
            </p>
          </FadeIn>
        </div>
      </SectionWrapper>

      <div className="max-w-5xl mx-auto px-6" style={{ marginTop: '-60px' }}>
        <div className="stylish-line" />
      </div>

      <SectionWrapper>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
            {impactStats.map((stat, idx) => (
              <FadeIn key={idx} delay={idx * 0.15}>
                <motion.div
                  whileHover={{ y: -10, scale: 1.03 }}
                  className={`glass-card rounded-3xl p-10 text-center relative overflow-hidden ${
                    isDark ? 'shadow-xl shadow-primary/10' : 'shadow-xl shadow-slate-200'
                  }`}
                >
                  <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${stat.color}`} />
                  <stat.icon className="w-12 h-12 text-primary mx-auto mb-6" />
                  <div className="text-5xl md:text-6xl font-black gradient-text mb-3">
                    {stat.number}
                  </div>
                  <p className={`text-lg font-medium ${
                    isDark ? 'text-slate-400' : 'text-slate-600'
                  }`}>
                    {stat.label}
                  </p>
                </motion.div>
              </FadeIn>
            ))}
          </div>

          <FadeIn className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-4">
              Why It <span className="gradient-text">Matters</span>
            </h2>
          </FadeIn>

          <div className="grid md:grid-cols-3 gap-8">
            {impactPoints.map((point, idx) => (
              <FadeIn key={idx} delay={idx * 0.15}>
                <motion.div
                  whileHover={{ y: -8 }}
                  className={`rounded-3xl p-8 h-full ${
                    isDark 
                      ? 'bg-gradient-to-br from-card to-card/50 border border-slate-700/50' 
                      : 'bg-white border border-slate-200 shadow-xl'
                  }`}
                >
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center mb-6">
                    <point.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">{point.title}</h3>
                  <p className={`${isDark ? 'text-slate-400 leading-relaxed' : 'text-slate-600 leading-relaxed'}`}>
                    {point.description}
                  </p>
                </motion.div>
              </FadeIn>
            ))}
          </div>
        </div>
      </SectionWrapper>
    </>
  );
};

export default Impact;
