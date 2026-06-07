import React from 'react';
import { motion } from 'framer-motion';
import { 
  FileText, 
  Image as ImageIcon, 
  Video, 
  Star, 
  CheckCircle2,
  Zap,
  Brain,
  Shield,
  Cpu,
  Lock
} from 'lucide-react';
import { SectionWrapper, FadeIn } from '../components/SectionWrapper';

interface FeaturesProps {
  isDark: boolean;
}

const Features: React.FC<FeaturesProps> = ({ isDark }) => {
  const features = [
    {
      icon: FileText,
      title: 'Text Analysis',
      description: 'Advanced NLP models using Toxic BERT and LLM reasoning with Groq API integration for comprehensive text toxicity detection.',
      features: ['Real-time scoring', 'Contextual understanding', 'Comprehensive reasoning']
    },
    {
      icon: ImageIcon,
      title: 'Image Detection',
      description: 'Dual-branch pipeline combining EasyOCR text extraction and OpenAI CLIP vision analysis with Gemini API fallback.',
      features: ['OCR extraction', 'Vision classification', 'API fallback']
    },
    {
      icon: Video,
      title: 'Video Processing',
      description: 'Smart frame sampling (20%, 40%, 60%, 80% marks) with early exit logic for efficient content review.',
      features: ['Strategic sampling', 'Early termination', 'Resource optimization']
    }
  ];

  const otherFeatures = [
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Real-time processing with minimal latency for instant content analysis.'
    },
    {
      icon: Brain,
      title: 'AI-Powered',
      description: 'State-of-the-art machine learning models for accurate detection.'
    },
    {
      icon: Shield,
      title: 'Secure & Private',
      description: 'Your data is processed securely with privacy-first architecture.'
    },
    {
      icon: Cpu,
      title: 'Scalable',
      description: 'Built to handle high volumes of content with ease.'
    },
    {
      icon: Lock,
      title: 'Reliable',
      description: 'High availability with multiple API fallback mechanisms.'
    },
    {
      icon: Star,
      title: 'Accurate',
      description: 'Industry-leading accuracy in detecting harmful content.'
    }
  ];

  return (
    <>
      <SectionWrapper className="pt-32 hero-bg">
        <div className="max-w-7xl mx-auto px-6">
          <FadeIn className="text-center">
            <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-gradient-to-r from-primary/20 to-secondary/20 border border-primary/30 mb-8">
              <Star className="w-4 h-4 text-primary" />
              <span className="text-sm font-semibold text-primary">Our Features</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black leading-tight mb-6">
              Powerful <span className="gradient-text">Features</span>
              <br />
              That Protect
            </h1>
            <p className={`text-xl max-w-3xl mx-auto ${
              isDark ? 'text-slate-400' : 'text-slate-600'
            }`}>
              Cutting-edge AI technology designed to analyze multiple content types with precision and speed.
            </p>
          </FadeIn>
        </div>
      </SectionWrapper>

      <div className="max-w-5xl mx-auto px-6" style={{ marginTop: '-60px' }}>
        <div className="stylish-line" />
      </div>

      <SectionWrapper>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            {features.map((feature, idx) => (
              <FadeIn key={idx} delay={idx * 0.15}>
                <motion.div
                  whileHover={{ y: -10, scale: 1.02 }}
                  className={`glass-card rounded-3xl p-8 h-full ${
                    isDark ? 'shadow-xl shadow-primary/20' : 'shadow-xl shadow-slate-200'
                  }`}
                >
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center mb-6">
                    <feature.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                  <p className={`mb-6 leading-relaxed ${
                    isDark ? 'text-slate-400' : 'text-slate-600'
                  }`}>
                    {feature.description}
                  </p>
                  <ul className="space-y-3">
                    {feature.features.map((f, i) => (
                      <li key={i} className="flex items-center gap-3 text-sm">
                        <CheckCircle2 className="w-5 h-5 text-green-500" />
                        <span className={`${isDark ? 'text-slate-300' : 'text-slate-700'}`}>{f}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </FadeIn>
            ))}
          </div>

          <FadeIn className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-4">
              More <span className="gradient-text">Capabilities</span>
            </h2>
          </FadeIn>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {otherFeatures.map((feature, idx) => (
              <FadeIn key={idx} delay={idx * 0.1}>
                <motion.div
                  whileHover={{ y: -6, scale: 1.01 }}
                  className={`rounded-2xl p-6 border transition-all duration-300 h-full ${
                    isDark 
                      ? 'bg-card border-slate-700/50 hover:border-primary/50' 
                      : 'bg-white border-slate-200 hover:border-primary/50 shadow-md'
                  }`}
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center mb-4">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                  <p className={`${isDark ? 'text-slate-400 text-sm' : 'text-slate-600 text-sm'}`}>
                    {feature.description}
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

export default Features;
