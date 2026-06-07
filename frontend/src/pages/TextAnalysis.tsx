import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FileText, 
  Send, 
  AlertTriangle, 
  CheckCircle2, 
  Loader2,
  ChevronLeft,
  TrendingUp,
  XCircle
} from 'lucide-react';
import { Link } from 'react-router-dom';
import ProtectedLayout from '../components/ProtectedLayout';
import { FadeIn } from '../components/SectionWrapper';
import { cn } from '../lib/utils';

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000';

interface TextAnalysisProps {
  isDark: boolean;
  onLogout: () => void;
}

interface AnalysisResult {
  status: string;
  input_text: string;
  toxicity_score: number;
  result_label: 'safe' | 'toxic';
  reasoning: string;
  confidence_score?: number;
}

const TextAnalysis: React.FC<TextAnalysisProps> = ({ isDark, onLogout }) => {
  React.useEffect(() => {
    console.log("TextAnalysis MOUNTED!");
    return () => {
      console.log("TextAnalysis UNMOUNTED!");
    };
  }, []);
  
  const [inputText, setInputText] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [errorMessage, setErrorMessage] = useState('');

  console.log("TextAnalysis component rendered!");
  console.log("  inputText:", inputText);
  console.log("  isAnalyzing:", isAnalyzing);
  console.log("  analysisResult:", analysisResult);
  console.log("  errorMessage:", errorMessage);

  const handleAnalyzeText = async () => {
    console.log("handleAnalyzeText called!");
    if (!inputText.trim()) {
      console.log("  inputText is empty, returning");
      return;
    }

    setIsAnalyzing(true);
    setErrorMessage('');
    setAnalysisResult(null);
    
    try {
      console.log("  Calling API...");
      const response = await fetch(`${API_BASE}detection/text`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: inputText.trim() }),
      });

      console.log("  API response status:", response.status);

      if (!response.ok) {
        throw new Error(`API request failed: ${response.status}`);
      }

      const data = await response.json();
      console.log("  API Response data:", data);
      console.log("  Setting analysisResult to data");
      setAnalysisResult(data);
      
      // Save to localStorage history
      const history = JSON.parse(localStorage.getItem('omniguard_history') || '[]');
      const newItem = {
        id: Date.now().toString(),
        type: 'text',
        date: new Date().toLocaleString(),
        result: data.result_label,
        score: data.toxicity_score * 100,
      };
      history.unshift(newItem);
      localStorage.setItem('omniguard_history', JSON.stringify(history));
      
    } catch (error) {
      console.error("  Error in handleAnalyzeText:", error);
      setErrorMessage(error instanceof Error ? error.message : 'An unexpected error occurred');
    } finally {
      console.log("  Finally block, setting isAnalyzing to false");
      setIsAnalyzing(false);
    }
  };

  return (
    <ProtectedLayout isDark={isDark} onLogout={onLogout}>
      <FadeIn>
        <div className="mb-10">
          <div className="flex items-center gap-4 mb-4">
            <Link to="/dashboard" className={cn(
              'p-2 rounded-xl transition-all duration-300 hover:scale-105',
              isDark ? 'bg-slate-800 hover:bg-slate-700' : 'bg-slate-100 hover:bg-slate-200'
            )}>
              <ChevronLeft className="w-6 h-6" />
            </Link>
            <div>
              <h1 className={cn(
                'text-3xl md:text-4xl font-black mb-2',
                isDark ? 'text-white' : 'text-slate-900'
              )}>
                Text Analysis
              </h1>
              <p className={cn(
                'text-base md:text-lg',
                isDark ? 'text-slate-400' : 'text-slate-600'
              )}>
                Analyze text content for toxic language and harmful intent
              </p>
            </div>
          </div>
        </div>
      </FadeIn>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
        <FadeIn delay={0.1}>
          <motion.div
            whileHover={{ y: -4 }}
            className={cn(
              'p-6 rounded-3xl border transition-all duration-300 h-full flex flex-col',
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
              Input Text
            </h3>
            
            <div className="space-y-6 flex flex-col h-full">
              <textarea
                id="inputText"
                name="inputText"
                value={inputText}
                onChange={(e) => {
                  console.log("textarea onChange called, new value:", e.target.value);
                  setInputText(e.target.value);
                }}
                className={cn(
                  'w-full p-6 rounded-2xl border-2 focus:outline-none focus:border-primary transition-all duration-300 min-h-[300px] resize-none flex-1',
                  isDark 
                    ? 'bg-slate-800/50 border-slate-700 text-white placeholder-slate-500' 
                    : 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400'
                )}
                placeholder="Enter the text you want to analyze..."
              />
              
              {errorMessage && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 rounded-2xl bg-red-500/20 border border-red-500/50 flex items-center gap-3"
                >
                  <XCircle className="w-5 h-5 text-red-400" />
                  <p className="text-red-400 text-sm font-semibold">
                    {errorMessage}
                  </p>
                </motion.div>
              )}
              
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleAnalyzeText}
                disabled={isAnalyzing}
                className="w-full px-8 py-4 rounded-2xl bg-gradient-to-r from-primary to-secondary text-white font-bold text-lg shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 className="w-6 h-6 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    Analyze Text
                    <Send className="w-5 h-5" />
                  </>
                )}
              </motion.button>
            </div>
          </motion.div>
        </FadeIn>

        <FadeIn delay={0.2}>
          <motion.div
            whileHover={{ y: -4 }}
            className={cn(
              'p-6 rounded-3xl border transition-all duration-300 h-full flex flex-col',
              isDark 
                ? 'bg-card border-slate-700/50' 
                : 'bg-white border-slate-200'
            )}
          >
            <h3 className={cn(
              'text-xl font-bold mb-6 flex items-center gap-3',
              isDark ? 'text-white' : 'text-slate-900'
            )}>
              {analysisResult ? (
                analysisResult.result_label === 'toxic' ? (
                  <AlertTriangle className="w-6 h-6 text-red-500" />
                ) : (
                  <CheckCircle2 className="w-6 h-6 text-green-500" />
                )
              ) : (
                <TrendingUp className="w-6 h-6 text-primary" />
              )}
              Analysis Result
            </h3>

            {isAnalyzing ? (
              <div className="flex flex-col items-center justify-center h-full w-full">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mb-4"></div>
                <p className={cn('text-gray-500', isDark ? 'text-slate-400' : 'text-slate-600')}>
                  Analyzing text...
                </p>
              </div>
            ) : analysisResult ? (
              <div className="flex flex-col h-full w-full space-y-6 text-left">
                <div>
                  <p className={cn(
                    'text-sm uppercase tracking-wide font-semibold mb-1',
                    isDark ? 'text-slate-400' : 'text-gray-500'
                  )}>
                    Verdict
                  </p>
                  <p className={cn(
                    'text-2xl font-bold',
                    analysisResult.result_label === 'toxic' ? 'text-red-600' : 'text-green-600'
                  )}>
                    {analysisResult.result_label === 'toxic' ? 'Threat Detected' : 'Clean'}
                  </p>
                </div>
                
                <div>
                  <p className={cn(
                    'text-sm uppercase tracking-wide font-semibold mb-1',
                    isDark ? 'text-slate-400' : 'text-gray-500'
                  )}>
                    Confidence Score
                  </p>
                  <p className={cn(
                    'text-3xl font-extrabold',
                    isDark ? 'text-white' : 'text-gray-800'
                  )}>
                    {(analysisResult.toxicity_score * 100).toFixed(1)}%
                  </p>
                </div>

                <div className={cn(
                  'p-4 rounded-lg border flex-grow',
                  isDark 
                    ? 'bg-slate-800/50 border-slate-700' 
                    : 'bg-gray-50 border-gray-100'
                )}>
                  <p className={cn(
                    'text-sm uppercase tracking-wide font-semibold mb-2',
                    isDark ? 'text-slate-400' : 'text-gray-500'
                  )}>
                    AI Reasoning
                  </p>
                  <p className={cn(
                    'leading-relaxed',
                    isDark ? 'text-slate-300' : 'text-gray-700'
                  )}>
                    {analysisResult.reasoning}
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <div className={cn(
                  'w-20 h-20 md:w-24 md:h-24 rounded-3xl mb-6 flex items-center justify-center',
                  isDark ? 'bg-slate-800' : 'bg-slate-100'
                )}>
                  <TrendingUp className="w-10 h-10 md:w-12 md:h-12 text-primary/50" />
                </div>
                <h3 className={cn(
                  'text-lg font-semibold mt-4 mb-2',
                  isDark ? 'text-white' : 'text-gray-800'
                )}>
                  Results will appear here
                </h3>
                <p className={cn(
                  'text-sm',
                  isDark ? 'text-slate-500' : 'text-gray-500'
                )}>
                  Enter text and click "Analyze Text" to see results
                </p>
              </div>
            )}
          </motion.div>
        </FadeIn>
      </div>
    </ProtectedLayout>
  );
};

export default TextAnalysis;
