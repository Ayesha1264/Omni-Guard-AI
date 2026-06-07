import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Newspaper,
  Clock,
  ArrowRight,
  RefreshCw
} from 'lucide-react';
import { SectionWrapper, FadeIn } from '../components/SectionWrapper';
import { cn } from '../lib/utils';

// const API_BASE = 'http://127.0.0.1:8000';
const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000/api/v1/';

interface Article {
  title: string;
  description: string;
  url: string;
  urlToImage: string | null;
  publishedAt: string;
  source: { name: string };
}

interface NewsProps {
  isDark: boolean;
}

const News: React.FC<NewsProps> = ({ isDark }) => {
  const [news, setNews] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchNews = async (forceRefresh = false) => {
    setIsLoading(true);
    try {
      const url = forceRefresh
        ? `${API_BASE}news?force_refresh=true`
        : `${API_BASE}news`;
      const response = await fetch(url);
      const data = await response.json();
      setNews(data.slice(0, 6));
    } catch (error) {
      console.error('Failed to fetch news:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <SectionWrapper className="pt-32 hero-bg">
        <div className="max-w-7xl mx-auto px-6">
          <FadeIn className="text-center">
            <div className="flex items-center justify-center gap-4 mb-8">
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
            <h1 className="text-5xl md:text-7xl font-black leading-tight mb-6">
              Stay Updated with
              <br />
              <span className="gradient-text">Cyber Safety News</span>
            </h1>
            <p className={cn(
              'text-xl max-w-3xl mx-auto',
              isDark ? 'text-slate-400' : 'text-slate-600'
            )}>
              Latest news and insights about online safety and cyberbullying prevention.
            </p>
          </FadeIn>
        </div>
      </SectionWrapper>

      <div className="max-w-5xl mx-auto px-6" style={{ marginTop: '-60px' }}>
        <div className="stylish-line" />
      </div>

      <SectionWrapper>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {isLoading ? (
              Array.from({ length: 6 }).map((_, idx) => (
                <FadeIn key={idx} delay={idx * 0.1}>
                  <motion.div
                    className={cn(
                      'rounded-3xl overflow-hidden animate-pulse',
                      isDark ? 'bg-card border border-slate-700/50' : 'bg-white border border-slate-200 shadow-xl'
                    )}
                  >
                    <div className="w-full h-48 bg-slate-700" />
                    <div className="p-7 space-y-3">
                      <div className="h-3 bg-slate-700 rounded w-1/3" />
                      <div className="h-6 bg-slate-700 rounded w-full" />
                      <div className="h-16 bg-slate-700 rounded w-full" />
                    </div>
                  </motion.div>
                </FadeIn>
              ))
            ) : news.length > 0 ? (
              news.map((article, idx) => (
                <FadeIn key={idx} delay={idx * 0.1}>
                  <motion.a
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -8 }}
                    className={cn(
                      'rounded-3xl overflow-hidden block',
                      isDark ? 'bg-card border border-slate-700/50' : 'bg-white border border-slate-200 shadow-xl'
                    )}
                  >
                    <div className="relative">
                      <img
                        src={article.urlToImage || 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&h=400&fit=crop'}
                        alt={article.title}
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1.5 rounded-full bg-gradient-to-r from-primary to-secondary text-white text-xs font-semibold">
                          {article.source.name}
                        </span>
                      </div>
                    </div>
                    <div className="p-7">
                      <div className={cn(
                        'flex items-center gap-2 mb-4 text-sm',
                        isDark ? 'text-slate-500' : 'text-slate-500'
                      )}>
                        <Clock className="w-4 h-4" />
                        {new Date(article.publishedAt).toLocaleDateString()}
                      </div>
                      <h3 className={cn(
                        'text-xl font-bold mb-3 line-clamp-2',
                        isDark ? 'text-white' : 'text-slate-900'
                      )}>
                        {article.title}
                      </h3>
                      {article.description && (
                        <p className={cn(
                          'mb-6 line-clamp-3',
                          isDark ? 'text-slate-400' : 'text-slate-600'
                        )}>
                          {article.description}
                        </p>
                      )}
                      <button className={cn(
                        'flex items-center gap-2 font-semibold transition-all duration-300',
                        isDark ? 'text-primary hover:gap-3' : 'text-primary hover:gap-3'
                      )}>
                        Read More
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </motion.a>
                </FadeIn>
              ))
            ) : (
              <div className="col-span-full text-center py-16">
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
        </div>
      </SectionWrapper>
    </>
  );
};

export default News;