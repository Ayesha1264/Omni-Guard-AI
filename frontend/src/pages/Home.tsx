import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Shield, 
  FileText, 
  Image as ImageIcon, 
  Video, 
  Star, 
  CheckCircle2, 
  ArrowRight,
  Search,
  Target,
  Ban,
  Users,
  Heart,
  TrendingUp,
  Newspaper,
  Cpu,
  ShieldCheck,
  Sparkles,
  Fingerprint,
  Radar,
  RefreshCw
} from 'lucide-react';
import { SectionWrapper, FadeIn } from '../components/SectionWrapper';
import FeatureCard from '../components/FeatureCard';
import { Link } from 'react-router-dom';
import { cn } from '../lib/utils';

interface HomeProps {
  isDark: boolean;
}

interface Article {
  title: string;
  description: string;
  url: string;
  urlToImage: string | null;
  publishedAt: string;
  source: { name: string };
}

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000';

const Home: React.FC<HomeProps> = ({ isDark }) => {
  const [news, setNews] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  
  const isAuthenticated = () => {
    try {
      const savedUser = localStorage.getItem('omniguard_user');
      return savedUser ? true : false;
    } catch {
      return false;
    }
  };

  const fetchNews = async (forceRefresh = false) => {
    setIsLoading(true);
    try {
      const url = forceRefresh 
        ? `${API_BASE}news?force_refresh=true` 
        : `${API_BASE}news`;
      const response = await fetch(url);
      const data = await response.json();
      setNews(data);
    } catch (error) {
      console.error('Failed to fetch news:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);
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

  const impactStats = [
    { number: '1M+', label: 'Contents Analyzed', icon: Search },
    { number: '95%', label: 'Accuracy Rate', icon: Target },
    { number: '50K+', label: 'Threats Blocked', icon: Ban },
    { number: '1K+', label: 'Active Users', icon: Users }
  ];

  const futuristicCards = [
    { icon: Cpu, color: 'from-blue-500 to-cyan-500', text: 'System Active' },
    { icon: Fingerprint, color: 'from-purple-500 to-pink-500', text: 'Verified' },
    { icon: Radar, color: 'from-green-500 to-emerald-500', text: 'Scanning' }
  ];

  return (
    <>
      <SectionWrapper className="pt-32 pb-20 hero-bg">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <FadeIn>
                <motion.div 
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-gradient-to-r from-primary/20 to-secondary/20 border border-primary/30 mb-6"
                >
                  <Sparkles className="w-4 h-4 text-primary" />
                  <span className="text-sm font-semibold text-primary">
                    Next-Gen AI Protection
                  </span>
                </motion.div>
              </FadeIn>

              <FadeIn delay={0.1}>
                <h1 className={cn(
                  'text-4xl md:text-6xl font-black leading-tight mb-6',
                  isDark ? 'text-white' : 'text-slate-900'
                )}>
                  Shielding Digital Spaces with
                  <br />
                  <span className="gradient-text">AI-Powered</span> Cyber Defense
                </h1>
              </FadeIn>

              <FadeIn delay={0.2}>
                <p className={cn(
                  'text-lg mb-8 leading-relaxed max-w-lg',
                  isDark ? 'text-slate-400' : 'text-slate-600'
                )}>
                  Omni Guard AI analyzes text, images, and videos instantly to stop cyberbullying. Advanced multimodal AI for a safer online world.
                </p>
              </FadeIn>

              <FadeIn delay={0.3}>
                <div className="flex flex-wrap gap-4">
                  <Link to="/features">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.98 }}
                      className="px-8 py-3.5 rounded-full bg-gradient-to-r from-primary to-secondary text-white font-bold text-lg shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 transition-all duration-300 flex items-center gap-3"
                    >
                      Explore Features
                      <ArrowRight className="w-5 h-5" />
                    </motion.button>
                  </Link>
                  <Link to={isAuthenticated() ? "/dashboard" : "/login"}>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.98 }}
                      className={cn(
                        'px-8 py-3.5 rounded-full border-2 font-bold text-lg transition-all duration-300 flex items-center gap-3',
                        isDark
                          ? 'border-slate-700 text-white hover:border-primary/50 hover:bg-primary/5'
                          : 'border-slate-300 text-slate-800 hover:border-primary/50 hover:bg-primary/5'
                      )}
                    >
                      <Shield className="w-5 h-5" />
                      Get Started
                    </motion.button>
                  </Link>
                </div>
              </FadeIn>
            </div>

            <FadeIn direction="right" delay={0.2}>
              <motion.div
                animate={{ y: [0, -15, 0], rotate: [0, 0.8, 0, -0.8, 0] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                className={cn(
                  'relative rounded-2xl p-8 shadow-2xl border',
                  isDark 
                    ? 'glass-card shadow-primary/20 border-slate-700/50' 
                    : 'bg-white shadow-xl shadow-slate-200 border-slate-200'
                )}
              >
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 to-secondary/5 pointer-events-none" />
                <div className="relative z-10">
                  <div className="flex justify-center mb-6">
                    <motion.div
                      animate={{ 
                        scale: [1, 1.08, 1],
                        rotate: [0, 4, -4, 0]
                      }}
                      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                      className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary via-secondary to-accent flex items-center justify-center shadow-lg shadow-primary/30"
                    >
                      <Shield className="w-10 h-10 text-white" />
                    </motion.div>
                  </div>

                  <div className="grid grid-cols-3 gap-3 mb-5">
                    {futuristicCards.map((card, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ scale: 0.8, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5 + idx * 0.2 }}
                        whileHover={{ scale: 1.1, rotate: idx % 2 === 0 ? 2 : -2 }}
                        className={cn(
                          'rounded-xl p-3 text-center border transition-all duration-300',
                          isDark 
                            ? 'bg-gradient-to-br from-card to-slate-800/50 border-slate-700/50' 
                            : 'bg-gradient-to-br from-slate-50 to-white border-slate-200'
                        )}
                      >
                        <div className={`w-10 h-10 mx-auto mb-2 rounded-lg bg-gradient-to-br ${card.color} flex items-center justify-center shadow-md`}>
                          <card.icon className="w-5 h-5 text-white" />
                        </div>
                        <p className={cn(
                          'text-xs font-semibold',
                          isDark ? 'text-slate-300' : 'text-slate-700'
                        )}>{card.text}</p>
                      </motion.div>
                    ))}
                  </div>

                  <div className="space-y-3">
                    {[
                      { icon: ShieldCheck, text: 'Protection Engaged', color: 'text-primary', borderColor: 'border-primary/30', bgColor: 'bg-primary/10' },
                      { icon: Sparkles, text: 'Real-time Scan', color: 'text-cyan-500', borderColor: 'border-cyan-500/30', bgColor: 'bg-cyan-500/10' }
                    ].map((item, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ x: -20, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.8 + idx * 0.15 }}
                        className={cn(
                          'flex items-center gap-3 p-4 rounded-xl border transition-all duration-300',
                          item.borderColor,
                          item.bgColor
                        )}
                        whileHover={{ x: 8, scale: 1.02 }}
                      >
                        <motion.div
                          animate={{ rotate: [0, 360] }}
                          transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                        >
                          <item.icon className={cn('w-6 h-6', item.color)} />
                        </motion.div>
                        <span className={cn(
                          'text-base font-bold',
                          isDark ? 'text-slate-200' : 'text-slate-800'
                        )}>{item.text}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </FadeIn>
          </div>
        </div>
      </SectionWrapper>

      <div className="max-w-5xl mx-auto px-6" style={{ marginTop: '-60px' }}>
        <div className="stylish-line" />
      </div>

      <SectionWrapper>
        <div className="max-w-7xl mx-auto px-6">
          <FadeIn className="text-center mb-16">
            <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-gradient-to-r from-primary/20 to-secondary/20 border border-primary/30 mb-6">
              <Star className="w-4 h-4 text-primary" />
              <span className="text-sm font-semibold text-primary">What We Offer</span>
            </div>
            <h2 className={cn(
              'text-4xl md:text-6xl font-black mb-6',
              isDark ? 'text-white' : 'text-slate-900'
            )}>
              Powerful Features for
              <br />
              <span className="gradient-text">Comprehensive Protection</span>
            </h2>
            <p className={cn(
              'text-xl max-w-3xl mx-auto',
              isDark ? 'text-slate-400' : 'text-slate-600'
            )}>
              Cutting-edge AI technology designed to analyze multiple content types with precision and speed.
            </p>
          </FadeIn>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, idx) => (
              <FeatureCard key={idx} {...feature} delay={idx * 0.15} isDark={isDark} />
            ))}
          </div>

          <FadeIn className="text-center mt-16">
            <Link to="/features">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className={cn(
                  'px-8 py-4 rounded-full border-2 font-bold text-lg transition-all duration-300 flex items-center gap-3 mx-auto',
                  isDark
                    ? 'border-primary text-primary hover:bg-primary hover:text-white'
                    : 'border-primary text-primary hover:bg-primary hover:text-white'
                )}
              >
                View All Features
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </Link>
          </FadeIn>
        </div>
      </SectionWrapper>

      <SectionWrapper className={isDark ? 'bg-gradient-to-b from-dark to-darker' : 'bg-gradient-to-b from-slate-50 to-white'}>
        <div className="max-w-7xl mx-auto px-6">
          <FadeIn className="text-center mb-16">
            <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-gradient-to-r from-primary/20 to-secondary/20 border border-primary/30 mb-6">
              <TrendingUp className="w-4 h-4 text-primary" />
              <span className="text-sm font-semibold text-primary">Our Impact</span>
            </div>
            <h2 className={cn(
              'text-4xl md:text-6xl font-black mb-6',
              isDark ? 'text-white' : 'text-slate-900'
            )}>
              Making the Internet
              <br />
              <span className="gradient-text">Safer Every Day</span>
            </h2>
            <p className={cn(
              'text-xl max-w-3xl mx-auto',
              isDark ? 'text-slate-400' : 'text-slate-600'
            )}>
              Real-time detection that protects users from harmful content across multiple platforms.
            </p>
          </FadeIn>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {impactStats.map((stat, idx) => (
              <FadeIn key={idx} delay={idx * 0.15}>
                <motion.div
                  whileHover={{ y: -10, scale: 1.03 }}
                  className={cn(
                    'rounded-3xl p-10 text-center relative overflow-hidden border',
                    isDark 
                      ? 'glass-card border-slate-700/50' 
                      : 'bg-white border-slate-200 shadow-xl'
                  )}
                >
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-secondary to-accent" />
                  <stat.icon className="w-12 h-12 text-primary mx-auto mb-6" />
                  <div className="text-5xl md:text-6xl font-black gradient-text mb-3">
                    {stat.number}
                  </div>
                  <p className={cn(
                    'text-lg font-medium',
                    isDark ? 'text-slate-400' : 'text-slate-600'
                  )}>{stat.label}</p>
                </motion.div>
              </FadeIn>
            ))}
          </div>

          <FadeIn className="text-center">
            <Link to="/impact">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className={cn(
                  'px-8 py-4 rounded-full border-2 font-bold text-lg transition-all duration-300 flex items-center gap-3 mx-auto',
                  isDark
                    ? 'border-primary text-primary hover:bg-primary hover:text-white'
                    : 'border-primary text-primary hover:bg-primary hover:text-white'
                )}
              >
                See Our Impact
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </Link>
          </FadeIn>
        </div>
      </SectionWrapper>

      <SectionWrapper>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <FadeIn>
              <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-gradient-to-r from-primary/20 to-secondary/20 border border-primary/30 mb-6">
                <Heart className="w-4 h-4 text-primary" />
                <span className="text-sm font-semibold text-primary">Our Mission</span>
              </div>
              <h2 className={cn(
                'text-4xl md:text-6xl font-black mb-8',
                isDark ? 'text-white' : 'text-slate-900'
              )}>
                Creating a
                <br />
                <span className="gradient-text">Kind Digital World</span>
              </h2>
              <p className={cn(
                'text-xl mb-10 leading-relaxed',
                isDark ? 'text-slate-400' : 'text-slate-600'
              )}>
                We believe everyone deserves a safe and respectful online experience. Omni Guard AI is our commitment to using cutting-edge artificial intelligence to detect and prevent cyberbullying, harassment, and harmful content across the internet.
              </p>
              <div className="space-y-5">
                {[
                  'Protect vulnerable users from online harm',
                  'Promote positive digital communication',
                  'Empower communities with AI tools'
                ].map((point, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ x: -20, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className="flex items-center gap-4 text-lg"
                  >
                    <CheckCircle2 className="w-7 h-7 text-green-500 flex-shrink-0" />
                    <span className={cn(
                      '',
                      isDark ? 'text-slate-200' : 'text-slate-800'
                    )}>{point}</span>
                  </motion.div>
                ))}
              </div>
            </FadeIn>

            <FadeIn direction="right" delay={0.2}>
              <motion.div
                whileHover={{ scale: 1.05, rotate: 1 }}
                className="bg-gradient-to-br from-primary via-secondary to-accent rounded-3xl p-12 text-center"
              >
                <Heart className="w-20 h-20 text-white mx-auto mb-8" />
                <h3 className="text-4xl font-black text-white mb-4">
                  Together We Can
                </h3>
                <p className="text-xl text-white/90">
                  Make the internet a safer place for everyone
                </p>
              </motion.div>
            </FadeIn>
          </div>

          <FadeIn className="text-center mt-16">
            <Link to="/mission">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className={cn(
                  'px-8 py-4 rounded-full border-2 font-bold text-lg transition-all duration-300 flex items-center gap-3 mx-auto',
                  isDark
                    ? 'border-primary text-primary hover:bg-primary hover:text-white'
                    : 'border-primary text-primary hover:bg-primary hover:text-white'
                )}
              >
                Learn Our Mission
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </Link>
          </FadeIn>
        </div>
      </SectionWrapper>

      <SectionWrapper className={isDark ? 'bg-gradient-to-b from-dark to-darker' : 'bg-gradient-to-b from-slate-50 to-white'}>
        <div className="max-w-7xl mx-auto px-6">
          <FadeIn className="text-center mb-16">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-gradient-to-r from-primary/20 to-secondary/20 border border-primary/30">
                <Newspaper className="w-4 h-4 text-primary" />
                <span className="text-sm font-semibold text-primary">Latest News</span>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => fetchNews(true)}
                disabled={isLoading}
                className={cn(
                  'px-4 py-2 rounded-full border-2 font-semibold text-sm transition-all duration-300 flex items-center gap-2',
                  isDark
                    ? 'border-primary text-primary hover:bg-primary hover:text-white'
                    : 'border-primary text-primary hover:bg-primary hover:text-white',
                  isLoading && 'opacity-50 cursor-not-allowed'
                )}
              >
                {isLoading ? (
                  <RefreshCw className="w-4 h-4 animate-spin" />
                ) : (
                  <RefreshCw className="w-4 h-4" />
                )}
                Refresh News
              </motion.button>
            </div>
            <h2 className={cn(
              'text-4xl md:text-6xl font-black mb-6',
              isDark ? 'text-white' : 'text-slate-900'
            )}>
              Stay Updated with
              <br />
              <span className="gradient-text">Cyber Safety News</span>
            </h2>
            <p className={cn(
              'text-xl max-w-3xl mx-auto',
              isDark ? 'text-slate-400' : 'text-slate-600'
            )}>
              Latest news and insights about online safety and cyberbullying prevention.
            </p>
          </FadeIn>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {isLoading ? (
              Array.from({ length: 3 }).map((_, idx) => (
                <FadeIn key={idx} delay={idx * 0.15}>
                  <motion.div
                    className={cn(
                      'rounded-3xl overflow-hidden border animate-pulse',
                      isDark ? 'bg-card border-slate-700/50' : 'bg-white border-slate-200 shadow-xl'
                    )}
                  >
                    <div className="w-full h-48 bg-slate-700" />
                    <div className="p-6 space-y-3">
                      <div className="h-3 bg-slate-700 rounded w-1/3" />
                      <div className="h-6 bg-slate-700 rounded w-full" />
                    </div>
                  </motion.div>
                </FadeIn>
              ))
            ) : news.length > 0 ? (
              news.slice(0, 6).map((article, idx) => (
                <FadeIn key={idx} delay={idx * 0.15}>
                  <motion.a
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -8 }}
                    className={cn(
                      'rounded-3xl overflow-hidden border block',
                      isDark ? 'bg-card border-slate-700/50' : 'bg-white border-slate-200 shadow-xl'
                    )}
                  >
                    <div className="relative">
                      <img 
                        src={article.urlToImage || 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&h=250&fit=crop'} 
                        alt={article.title} 
                        className="w-full h-48 object-cover transition-transform duration-500 hover:scale-105"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1.5 rounded-full bg-gradient-to-r from-primary to-secondary text-white text-xs font-semibold">
                          {article.source.name}
                        </span>
                      </div>
                    </div>
                    <div className="p-6">
                      <div className={cn(
                        'flex items-center gap-2 mb-3 text-sm',
                        isDark ? 'text-slate-500' : 'text-slate-500'
                      )}>
                        <span>{new Date(article.publishedAt).toLocaleDateString()}</span>
                      </div>
                      <h3 className={cn(
                        'text-xl font-bold mb-3 line-clamp-2',
                        isDark ? 'text-white' : 'text-slate-800'
                      )}>{article.title}</h3>
                      {article.description && (
                        <p className={cn(
                          'text-sm line-clamp-2',
                          isDark ? 'text-slate-400' : 'text-slate-600'
                        )}>
                          {article.description.length > 100 
                            ? article.description.slice(0, 100) + '...' 
                            : article.description}
                        </p>
                      )}
                    </div>
                  </motion.a>
                </FadeIn>
              ))
            ) : (
              <div className="col-span-3 text-center py-16">
                <Newspaper className="w-16 h-16 text-primary/50 mx-auto mb-4" />
                <p className={cn(
                  'text-lg font-semibold',
                  isDark ? 'text-slate-400' : 'text-slate-600'
                )}>
                  No news available at the moment
                </p>
              </div>
            )}
          </div>

          <FadeIn className="text-center">
            <Link to="/news">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className={cn(
                  'px-8 py-4 rounded-full border-2 font-bold text-lg transition-all duration-300 flex items-center gap-3 mx-auto',
                  isDark
                    ? 'border-primary text-primary hover:bg-primary hover:text-white'
                    : 'border-primary text-primary hover:bg-primary hover:text-white'
                )}
              >
                View All News
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </Link>
          </FadeIn>
        </div>
      </SectionWrapper>
    </>
  );
};

export default Home;
