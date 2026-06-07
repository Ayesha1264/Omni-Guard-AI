import React from 'react';
import { motion } from 'framer-motion';
import { 
  Heart,
  CheckCircle2,
  Sparkles,
  Shield,
  Lightbulb
} from 'lucide-react';
import { SectionWrapper, FadeIn } from '../components/SectionWrapper';

interface MissionProps {
  isDark: boolean;
}

const Mission: React.FC<MissionProps> = ({ isDark }) => {
  const missionPoints = [
    'Protect vulnerable users from online harm',
    'Promote positive digital communication',
    'Empower communities with AI tools',
    'Build trust in digital interactions',
    'Make technology work for good'
  ];

  const values = [
    {
      icon: Shield,
      title: 'Safety First',
      description: 'We prioritize user safety above all else in everything we build.'
    },
    {
      icon: Sparkles,
      title: 'Innovation',
      description: 'We continuously improve our technology to stay ahead of emerging threats.'
    },
    {
      icon: Lightbulb,
      title: 'Fairness',
      description: 'We are committed to building AI that is fair and unbiased in its detection capabilities.'
    }
  ];

  return (
    <>
      <SectionWrapper className="pt-32 hero-bg">
        <div className="max-w-7xl mx-auto px-6">
          <FadeIn className="text-center">
            <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-gradient-to-r from-primary/20 to-secondary/20 border border-primary/30 mb-8">
              <Heart className="w-4 h-4 text-primary" />
              <span className="text-sm font-semibold text-primary">Our Mission</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black leading-tight mb-6">
              Creating a
              <br />
              <span className="gradient-text">Kind Digital World</span>
            </h1>
            <p className={`text-xl max-w-3xl mx-auto ${
              isDark ? 'text-slate-400' : 'text-slate-600'
            }`}>
              We believe everyone deserves a safe and respectful online experience.
            </p>
          </FadeIn>
        </div>
      </SectionWrapper>

      <div className="max-w-5xl mx-auto px-6" style={{ marginTop: '-60px' }}>
        <div className="stylish-line" />
      </div>

      <SectionWrapper>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
            <FadeIn>
              <p className={`text-xl mb-10 leading-relaxed ${
                isDark ? 'text-slate-400' : 'text-slate-600'
              }`}>
                Omni Guard AI is our commitment to using cutting-edge artificial intelligence to detect and prevent cyberbullying, harassment, and harmful content across the internet.
              </p>
              <div className="space-y-5">
                {missionPoints.map((point, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ x: -20, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className="flex items-center gap-4 text-lg"
                  >
                    <CheckCircle2 className="w-7 h-7 text-green-500 flex-shrink-0" />
                    <span>{point}</span>
                  </motion.div>
                ))}
              </div>
            </FadeIn>

            <FadeIn direction="right" delay={0.2}>
              <motion.div
                animate={{ y: [0, -12, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="rounded-3xl overflow-hidden shadow-2xl"
              >
                <img 
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop" 
                  alt="Cyber safety and online protection" 
                  className="w-full h-auto object-cover"
                />
              </motion.div>
            </FadeIn>
          </div>

          <FadeIn className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-4">
              Our <span className="gradient-text">Values</span>
            </h2>
          </FadeIn>

          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, idx) => (
              <FadeIn key={idx} delay={idx * 0.15}>
                <motion.div
                  whileHover={{ y: -8, scale: 1.02 }}
                  className={`rounded-3xl p-8 ${
                    isDark 
                      ? 'bg-gradient-to-br from-card to-card/50 border border-slate-700/50' 
                      : 'bg-white border border-slate-200 shadow-xl'
                  }`}
                >
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center mb-6">
                    <value.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">{value.title}</h3>
                  <p className={`${isDark ? 'text-slate-400 leading-relaxed' : 'text-slate-600 leading-relaxed'}`}>
                    {value.description}
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

export default Mission;
