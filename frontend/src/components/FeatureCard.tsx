import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import { FadeIn } from './SectionWrapper';
import { cn } from '../lib/utils';

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  features: string[];
  delay?: number;
  isDark: boolean;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ 
  icon: Icon, 
  title, 
  description, 
  features, 
  delay = 0,
  isDark 
}) => {
  return (
    <FadeIn delay={delay}>
      <motion.div
        whileHover={{ y: -10, scale: 1.02 }}
        className={cn(
          'rounded-3xl p-8 transition-all duration-300 h-full',
          isDark 
            ? 'glass-card shadow-xl shadow-primary/20' 
            : 'bg-white border border-slate-200 shadow-xl shadow-slate-200'
        )}
      >
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center mb-6">
          <Icon className="w-8 h-8 text-primary" />
        </div>
        <h3 className="text-2xl font-bold mb-4">{title}</h3>
        <p className={cn(
          'mb-6 leading-relaxed',
          isDark ? 'text-slate-400' : 'text-slate-600'
        )}>{description}</p>
        <ul className="space-y-3">
          {features.map((feature, idx) => (
            <li key={idx} className="flex items-center gap-3 text-sm">
              <div className="w-2 h-2 rounded-full bg-gradient-to-r from-primary to-secondary" />
              <span className={cn(
                '',
                isDark ? 'text-slate-300' : 'text-slate-700'
              )}>{feature}</span>
            </li>
          ))}
        </ul>
      </motion.div>
    </FadeIn>
  );
};

export default FeatureCard;
