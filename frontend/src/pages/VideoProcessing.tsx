import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Video, 
  Upload, 
  AlertTriangle, 
  CheckCircle2, 
  Loader2,
  ChevronLeft,
  TrendingUp,
  Eye
} from 'lucide-react';
import { Link } from 'react-router-dom';
import ProtectedLayout from '../components/ProtectedLayout';
import { FadeIn } from '../components/SectionWrapper';
import { cn } from '../lib/utils';

interface VideoProcessingProps {
  isDark: boolean;
  onLogout: () => void;
}

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000';

const VideoProcessing: React.FC<VideoProcessingProps> = ({ isDark, onLogout }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [videoPreview, setVideoPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<{
    status: string;
    file_name: string;
    total_frames_analyzed: number;
    toxic_frames_count: number;
    final_video_verdict: 'safe' | 'toxic';
    overall_confidence: number;
    frame_details: Array<{
      result_label: string;
      final_score: number;
      reasoning: string;
    }>;
  } | null>(null);

  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setVideoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    if (!selectedFile) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const formData = new FormData();
      formData.append('file', selectedFile);

      const response = await fetch(`${API_BASE}detection/video`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
      console.log('Video API Response:', data);
      setResult(data);
      
      // Save to localStorage history
      const history = JSON.parse(localStorage.getItem('omniguard_history') || '[]');
      const newItem = {
        id: Date.now().toString(),
        type: 'video',
        date: new Date().toLocaleString(),
        result: data.final_video_verdict,
        score: data.overall_confidence * 100,
      };
      history.unshift(newItem);
      localStorage.setItem('omniguard_history', JSON.stringify(history));
      
    } catch (err) {
      console.error('Video processing failed:', err);
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
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
                Video Processing
              </h1>
              <p className={cn(
                'text-base md:text-lg',
                isDark ? 'text-slate-400' : 'text-slate-600'
              )}>
                Analyze video content frame by frame for harmful content
              </p>
            </div>
          </div>
        </div>
      </FadeIn>

      {error && (
        <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-2xl text-red-400">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
        <FadeIn delay={0.1}>
          <motion.div
            whileHover={{ y: -4 }}
            className={cn(
              'p-6 rounded-3xl border transition-all duration-300 flex flex-col h-full',
              isDark 
                ? 'bg-card border-slate-700/50' 
                : 'bg-white border-slate-200'
            )}
          >
            <h3 className={cn(
              'text-xl font-bold mb-6 flex items-center gap-3',
              isDark ? 'text-white' : 'text-slate-900'
            )}>
              <Video className="w-6 h-6 text-primary" />
              Upload Video
            </h3>
            
            <div className="space-y-6 flex-1 flex flex-col">
              {!videoPreview ? (
                <label className={cn(
                  'flex flex-col items-center justify-center w-full flex-1 min-h-64 border-2 border-dashed rounded-2xl cursor-pointer transition-all duration-300',
                  isDark 
                    ? 'border-slate-700 hover:border-primary hover:bg-primary/5' 
                    : 'border-slate-300 hover:border-primary hover:bg-primary/5'
                )}>
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <Upload className="w-10 h-10 md:w-12 md:h-12 mb-4 text-primary/50" />
                    <p className={cn(
                      'text-base md:text-lg font-semibold mb-2',
                      isDark ? 'text-slate-300' : 'text-slate-700'
                    )}>
                      Click to upload video
                    </p>
                    <p className={cn(
                      'text-sm',
                      isDark ? 'text-slate-500' : 'text-slate-500'
                    )}>
                      MP4, WebM, AVI up to 100MB
                    </p>
                  </div>
                  <input
                    type="file"
                    className="hidden"
                    accept="video/*"
                    onChange={handleVideoUpload}
                  />
                </label>
              ) : (
                <div className="relative flex-1 min-h-64">
                  <video
                    src={videoPreview}
                    controls
                    className="w-full h-full min-h-64 object-cover rounded-2xl"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedFile(null);
                      setVideoPreview(null);
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
              
              {selectedFile && (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="button"
                  onClick={handleSubmit}
                  disabled={loading}
                  className="w-full px-8 py-4 rounded-2xl bg-gradient-to-r from-primary to-secondary text-white font-bold text-lg shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-6 h-6 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      Process Video
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
              'p-6 rounded-3xl border transition-all duration-300 flex flex-col h-full',
              isDark 
                ? 'bg-card border-slate-700/50' 
                : 'bg-white border-slate-200'
            )}
          >
            <h3 className={cn(
              'text-xl font-bold mb-6 flex items-center gap-3',
              isDark ? 'text-white' : 'text-slate-900'
            )}>
              {result ? (
                result.final_video_verdict === 'toxic' ? (
                  <AlertTriangle className="w-6 h-6 text-red-500" />
                ) : (
                  <CheckCircle2 className="w-6 h-6 text-green-500" />
                )
              ) : (
                <TrendingUp className="w-6 h-6 text-primary" />
              )}
              Processing Result
            </h3>

            {loading ? (
              <div className="flex flex-col items-center justify-center py-16 text-center flex-1">
                <Loader2 className="w-10 h-10 md:w-12 md:h-12 text-primary animate-spin mb-4" />
                <p className={cn(
                  'text-base md:text-lg font-semibold',
                  isDark ? 'text-slate-300' : 'text-slate-700'
                )}>
                  Analyzing video...
                </p>
              </div>
            ) : result ? (
              <div className="space-y-6 flex-1">
                <div className={cn(
                  'p-6 rounded-2xl text-center',
                  result.final_video_verdict === 'toxic' 
                    ? 'bg-red-500/10 border-2 border-red-500/30' 
                    : 'bg-green-500/10 border-2 border-green-500/30'
                )}>
                  {result.final_video_verdict === 'toxic' ? (
                    <AlertTriangle className="w-12 h-12 md:w-16 md:h-16 text-red-500 mx-auto mb-4" />
                  ) : (
                    <CheckCircle2 className="w-12 h-12 md:w-16 md:h-16 text-green-500 mx-auto mb-4" />
                  )}
                  <p className={cn(
                    'text-lg md:text-xl font-bold uppercase tracking-wider mb-4',
                    result.final_video_verdict === 'toxic' ? 'text-red-400' : 'text-green-400'
                  )}>
                    {result.final_video_verdict === 'toxic' ? 'Threat Detected' : 'Clean'}
                  </p>
                  <div className="space-y-2">
                    <p className={cn(
                      'text-sm font-semibold',
                      isDark ? 'text-slate-400' : 'text-slate-600'
                    )}>
                      Confidence Score
                    </p>
                    <div className="w-full bg-slate-700 rounded-full h-4 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${result.overall_confidence * 100}%` }}
                        transition={{ duration: 1, ease: 'easeOut' }}
                        className={cn(
                          'h-full rounded-full relative',
                          result.final_video_verdict === 'toxic' ? 'bg-red-500' : 'bg-green-500'
                        )}
                      >
                        <div className="absolute inset-0 bg-white/20 animate-pulse" />
                      </motion.div>
                    </div>
                    <p className={cn(
                      'text-3xl md:text-4xl font-black',
                      result.final_video_verdict === 'toxic' ? 'text-red-500' : 'text-green-500'
                    )}>
                      {(result.overall_confidence * 100).toFixed(1)}%
                    </p>
                  </div>
                </div>

                {result.frame_details.length > 0 && (
                  <div>
                    <p className={cn(
                      'text-xs font-semibold uppercase tracking-wider mb-3',
                      isDark ? 'text-slate-500' : 'text-slate-500'
                    )}>
                      Frame Analysis
                    </p>
                    <div className="space-y-2">
                      {result.frame_details.map((frame, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.1, duration: 0.5 }}
                          className="flex items-center gap-3"
                        >
                          <span className={cn(
                            'text-sm font-bold w-12',
                            isDark ? 'text-slate-400' : 'text-slate-600'
                          )}>
                            F{idx + 1}
                          </span>
                          <div className="flex-1 bg-slate-700 rounded-full h-2">
                            <div
                              className={cn(
                                'h-2 rounded-full',
                                frame.result_label === 'toxic' ? 'bg-red-500' : 'bg-green-500'
                              )}
                              style={{ width: `${frame.final_score * 100}%` }}
                            />
                          </div>
                          <span className={cn(
                            'text-sm font-bold w-12 text-right',
                            isDark ? 'text-slate-400' : 'text-slate-600'
                          )}>
                            {(frame.final_score * 100).toFixed(0)}%
                          </span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-16 text-center flex-1">
                <div className={cn(
                  'w-20 h-20 md:w-24 md:h-24 rounded-3xl mb-6 flex items-center justify-center',
                  isDark ? 'bg-slate-800' : 'bg-slate-100'
                )}>
                  <TrendingUp className="w-10 h-10 md:w-12 md:h-12 text-primary/50" />
                </div>
                <p className={cn(
                  'text-lg md:text-xl font-bold mb-2',
                  isDark ? 'text-slate-400' : 'text-slate-600'
                )}>
                  Results will appear here
                </p>
                <p className={cn(
                  'text-sm',
                  isDark ? 'text-slate-500' : 'text-slate-500'
                )}>
                  Upload a video and click "Process Video"
                </p>
              </div>
            )}
          </motion.div>
        </FadeIn>
      </div>
    </ProtectedLayout>
  );
};

export default VideoProcessing;