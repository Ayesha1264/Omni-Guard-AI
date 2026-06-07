import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Image as ImageIcon, 
  Upload, 
  AlertTriangle, 
  CheckCircle2, 
  Loader2,
  ChevronLeft,
  TrendingUp,
  FileText,
  Eye
} from 'lucide-react';
import { Link } from 'react-router-dom';
import SideMenu from '../components/SideMenu';
import { FadeIn } from '../components/SectionWrapper';
import { cn } from '../lib/utils';

const API_BASE = 'http://127.0.0.1:8000';

interface ImageDetectionProps {
  isDark: boolean;
  onLogout: () => void;
}

interface AnalysisBreakdown {
  text_toxicity_score: number;
  vision_toxicity_score: number;
  local_combined_score: number;
}

interface FinalVerdict {
  result_label: 'safe' | 'toxic';
  final_score: number;
  reasoning: string;
}

interface FileInfo {
  status: string;
  file_name: string;
  extracted_text: string;
}

interface ImageDetectionResponse {
  file_info: FileInfo;
  analysis_breakdown: AnalysisBreakdown;
  final_verdict: FinalVerdict;
}

const ImageDetection: React.FC<ImageDetectionProps> = ({ isDark, onLogout }) => {
  const [image, setImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<ImageDetectionResponse | null>(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  console.log("ImageDetection component rendered!");
  console.log("  image:", image ? "uploaded" : null);
  console.log("  isAnalyzing:", isAnalyzing);
  console.log("  analysisResult:", analysisResult);
  console.log("  errorMessage:", errorMessage);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyzeImage = async () => {
    console.log("handleAnalyzeImage called!");
    if (!selectedFile) {
      console.log("  No file selected, returning");
      return;
    }

    setIsAnalyzing(true);
    setErrorMessage('');
    setAnalysisResult(null);
    
    try {
      console.log("  Calling API...");
      const formData = new FormData();
      formData.append("file", selectedFile);

      const response = await fetch(`${API_BASE}/api/v1/detection/image`, {
        method: 'POST',
        body: formData,
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
        type: 'image',
        date: new Date().toLocaleString(),
        result: data.final_verdict.result_label,
        score: data.final_verdict.final_score * 100,
      };
      history.unshift(newItem);
      localStorage.setItem('omniguard_history', JSON.stringify(history));
      
    } catch (error) {
      console.error("  Error in handleAnalyzeImage:", error);
      setErrorMessage(error instanceof Error ? error.message : 'An unexpected error occurred');
    } finally {
      console.log("  Finally block, setting isAnalyzing to false");
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen">
      <SideMenu isDark={isDark} onLogout={onLogout} userName="User" />
      
      <div className="ml-64 p-8">
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
                  'text-4xl font-black mb-2',
                  isDark ? 'text-white' : 'text-slate-900'
                )}>
                  Image Detection
                </h1>
                <p className={cn(
                  'text-lg',
                  isDark ? 'text-slate-400' : 'text-slate-600'
                )}>
                  Analyze images for harmful content, text, and visual elements
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
                <ImageIcon className="w-6 h-6 text-primary" />
                Upload Image
              </h3>
              
              <div className="space-y-6 flex flex-col h-full">
                {!image ? (
                  <label className={cn(
                    'flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-2xl cursor-pointer transition-all duration-300 flex-1',
                    isDark 
                      ? 'border-slate-700 hover:border-primary hover:bg-primary/5' 
                      : 'border-slate-300 hover:border-primary hover:bg-primary/5'
                  )}>
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <Upload className="w-12 h-12 mb-4 text-primary/50" />
                      <p className={cn(
                        'text-lg font-semibold mb-2',
                        isDark ? 'text-slate-300' : 'text-slate-700'
                      )}>
                        Click to upload image
                      </p>
                      <p className={cn(
                        'text-sm',
                        isDark ? 'text-slate-500' : 'text-slate-500'
                      )}>
                        PNG, JPG, GIF up to 10MB
                      </p>
                    </div>
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={handleImageUpload}
                    />
                  </label>
                ) : (
                  <div className="relative flex-1">
                    <img
                      src={image}
                      alt="Uploaded"
                      className="w-full h-64 object-cover rounded-2xl"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setImage(null);
                        setSelectedFile(null);
                      }}
                      className={cn(
                        'absolute top-4 right-4 p-2 rounded-xl',
                        isDark ? 'bg-slate-900/80' : 'bg-white/80'
                      )}
                    >
                      ×
                    </button>
                  </div>
                )}
                
                {errorMessage && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 rounded-2xl bg-red-500/20 border border-red-500/50 flex items-center gap-3"
                  >
                    <AlertTriangle className="w-5 h-5 text-red-400" />
                    <p className="text-red-400 text-sm font-semibold">
                      {errorMessage}
                    </p>
                  </motion.div>
                )}
                
                {image && (
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleAnalyzeImage}
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
                        Analyze Image
                        <Eye className="w-5 h-5" />
                      </>
                    )}
                  </motion.button>
                )}
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
                  analysisResult.final_verdict.result_label === 'toxic' ? (
                    <AlertTriangle className="w-6 h-6 text-red-500" />
                  ) : (
                    <CheckCircle2 className="w-6 h-6 text-green-500" />
                  )
                ) : (
                  <TrendingUp className="w-6 h-6 text-primary" />
                )}
                Detection Result
              </h3>

              {isAnalyzing ? (
                <div className="flex flex-col items-center justify-center h-full w-full">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mb-4"></div>
                  <p className={cn('text-gray-500', isDark ? 'text-slate-400' : 'text-slate-600')}>
                    Analyzing image...
                  </p>
                </div>
              ) : analysisResult ? (
                <div className="flex flex-col h-full w-full space-y-6 text-left">
                  <div className={cn(
                    'p-6 rounded-2xl text-center',
                    analysisResult.final_verdict.result_label === 'toxic' 
                      ? 'bg-red-500/10 border-2 border-red-500/30' 
                      : 'bg-green-500/10 border-2 border-green-500/30'
                  )}>
                    <p className={cn(
                      'text-6xl font-black mb-2',
                      analysisResult.final_verdict.result_label === 'toxic' ? 'text-red-500' : 'text-green-500'
                    )}>
                      {(analysisResult.final_verdict.final_score * 100).toFixed(1)}%
                    </p>
                    <p className={cn(
                      'text-xl font-bold uppercase tracking-wider',
                      analysisResult.final_verdict.result_label === 'toxic' ? 'text-red-400' : 'text-green-400'
                    )}>
                      {analysisResult.final_verdict.result_label === 'toxic' ? 'Threat Detected' : 'Clean'}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className={cn(
                      'p-4 rounded-2xl',
                      isDark ? 'bg-slate-800/30' : 'bg-slate-100'
                    )}>
                      <div className="flex items-center gap-3 mb-2">
                        <FileText className="w-5 h-5 text-primary" />
                        <p className={cn(
                          'text-sm font-bold',
                          isDark ? 'text-slate-300' : 'text-slate-700'
                        )}>
                          Text Score
                        </p>
                      </div>
                      <p className="text-3xl font-black text-primary">
                        {(analysisResult.analysis_breakdown.text_toxicity_score * 100).toFixed(1)}%
                      </p>
                    </div>
                    <div className={cn(
                      'p-4 rounded-2xl',
                      isDark ? 'bg-slate-800/30' : 'bg-slate-100'
                    )}>
                      <div className="flex items-center gap-3 mb-2">
                        <Eye className="w-5 h-5 text-secondary" />
                        <p className={cn(
                          'text-sm font-bold',
                          isDark ? 'text-slate-300' : 'text-slate-700'
                        )}>
                          Vision Score
                        </p>
                      </div>
                      <p className="text-3xl font-black text-secondary">
                        {(analysisResult.analysis_breakdown.vision_toxicity_score * 100).toFixed(1)}%
                      </p>
                    </div>
                  </div>

                  <div>
                    <p className={cn(
                      'text-xs font-semibold uppercase tracking-wider mb-2',
                      isDark ? 'text-slate-500' : 'text-slate-500'
                    )}>
                      Extracted Text
                    </p>
                    <p className={cn(
                      'text-sm leading-relaxed',
                      isDark ? 'text-slate-300' : 'text-slate-700'
                    )}>
                      {analysisResult.file_info.extracted_text}
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
                      {analysisResult.final_verdict.reasoning}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <div className={cn(
                    'w-24 h-24 rounded-3xl mb-6 flex items-center justify-center',
                    isDark ? 'bg-slate-800' : 'bg-slate-100'
                  )}>
                    <TrendingUp className="w-12 h-12 text-primary/50" />
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
                    Upload an image and click "Analyze Image"
                  </p>
                </div>
              )}
            </motion.div>
          </FadeIn>
        </div>
      </div>
    </div>
  );
};

export default ImageDetection;
