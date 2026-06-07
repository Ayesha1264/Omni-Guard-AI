import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Features from './pages/Features';
import Impact from './pages/Impact';
import Mission from './pages/Mission';
import News from './pages/News';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Account from './pages/Account';
import TextAnalysis from './pages/TextAnalysis';
import ImageDetection from './pages/ImageDetection';
import VideoProcessing from './pages/VideoProcessing';
import Reports from './pages/Reports';
import Chatbot from './pages/Chatbot';

interface BackendUser {
  id: number;
  username: string;
  email: string;
  created_at: string;
}

interface UserData {
  id: number;
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

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000';

function AppContent() {
  const [isDark, setIsDark] = useState(true);
  const [currentUser, setCurrentUser] = useState<UserData | null>(() => {
    const savedUser = localStorage.getItem('omniguard_user');
    try {
      return savedUser ? JSON.parse(savedUser) : null;
    } catch {
      localStorage.removeItem('omniguard_user');
      return null;
    }
  });
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const savedUser = localStorage.getItem('omniguard_user');
    try {
      return savedUser ? true : false;
    } catch {
      return false;
    }
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
    }
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    try {
      console.log('Sending login to:', `${API_BASE}auth/login`);
      const response = await fetch(`${API_BASE}auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      console.log('Response status:', response.status);

      if (!response.ok) {
        let errorMessage = `Login failed (status: ${response.status})`;
        try {
          const errorData = await response.json();
          if (errorData.detail) {
            errorMessage = errorData.detail;
          }
        } catch {
          const text = await response.text();
          console.error('Response text:', text);
        }
        return { success: false, error: errorMessage };
      }

      const data = await response.json();
      console.log('Response data:', data);
      const backendUser = data.user as BackendUser;

      const user: UserData = {
        id: backendUser.id,
        email: backendUser.email,
        name: backendUser.username,
        stats: {
          totalScans: Math.floor(Math.random() * 100 + 50),
          threatsBlocked: Math.floor(Math.random() * 30 + 10),
          accuracy: 98,
          reportsGenerated: Math.floor(Math.random() * 20 + 5),
        },
        history: [],
      };

      setCurrentUser(user);
      setIsAuthenticated(true);
      localStorage.setItem('omniguard_user', JSON.stringify(user));
      return { success: true };
    } catch (error) {
      console.error('Login failed:', error);
      return { success: false, error: error instanceof Error ? error.message : 'An unexpected error occurred' };
    }
  };

  const signup = async (name: string, email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    try {
      console.log('Sending signup to:', `${API_BASE}auth/signup`);
      console.log('Body:', { name, email, password });
      const response = await fetch(`${API_BASE}auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      console.log('Response status:', response.status);

      if (!response.ok) {
        let errorMessage = `Signup failed (status: ${response.status})`;
        try {
          const errorData = await response.json();
          if (errorData.detail) {
            errorMessage = errorData.detail;
          }
        } catch {
          const text = await response.text();
          console.error('Response text:', text);
        }
        return { success: false, error: errorMessage };
      }

      const data = await response.json();
      console.log('Response data:', data);
      const backendUser = data.user as BackendUser;

      const user: UserData = {
        id: backendUser.id,
        email: backendUser.email,
        name: backendUser.username,
        stats: {
          totalScans: 0,
          threatsBlocked: 0,
          accuracy: 98,
          reportsGenerated: 0,
        },
        history: [],
      };

      setCurrentUser(user);
      setIsAuthenticated(true);
      localStorage.setItem('omniguard_user', JSON.stringify(user));
      return { success: true };
    } catch (error) {
      console.error('Signup failed:', error);
      return { success: false, error: error instanceof Error ? error.message : 'An unexpected error occurred' };
    }
  };

  const logout = () => {
    setCurrentUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('omniguard_user');
    navigate('/login');
  };

  const location = useLocation();
  const isPrivatePage = ['/dashboard', '/text-analysis', '/image-detection', '/video-processing', '/chatbot', '/reports', '/account', '/login', '/signup'].includes(location.pathname);

  const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    if (!isAuthenticated) {
      return <Navigate to="/login" replace />;
    }
    return <>{children}</>;
  };

  return (
    <div className={`min-h-screen transition-colors duration-500 ${
      isDark 
        ? 'bg-gradient-to-b from-darker via-dark to-darker text-white' 
        : 'bg-gradient-to-b from-slate-50 via-white to-slate-50 text-slate-900'
    }`}>
      {!isPrivatePage && <Navbar isDark={isDark} toggleTheme={toggleTheme} />}
      <Routes>
        <Route path="/" element={<Home isDark={isDark} />} />
        <Route path="/features" element={<Features isDark={isDark} />} />
        <Route path="/impact" element={<Impact isDark={isDark} />} />
        <Route path="/mission" element={<Mission isDark={isDark} />} />
        <Route path="/news" element={<News isDark={isDark} />} />
        <Route path="/login" element={<Login isDark={isDark} onLogin={login} />} />
        <Route path="/signup" element={<Signup isDark={isDark} onSignup={signup} />} />
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard isDark={isDark} onLogout={logout} user={currentUser} />
          </ProtectedRoute>
        } />
        <Route path="/account" element={
          <ProtectedRoute>
            <Account isDark={isDark} onLogout={logout} user={currentUser} />
          </ProtectedRoute>
        } />
        <Route path="/text-analysis" element={
          <ProtectedRoute>
            <TextAnalysis isDark={isDark} onLogout={logout} />
          </ProtectedRoute>
        } />
        <Route path="/image-detection" element={
          <ProtectedRoute>
            <ImageDetection isDark={isDark} onLogout={logout} />
          </ProtectedRoute>
        } />
        <Route path="/video-processing" element={
          <ProtectedRoute>
            <VideoProcessing isDark={isDark} onLogout={logout} />
          </ProtectedRoute>
        } />
        <Route path="/reports" element={
          <ProtectedRoute>
            <Reports isDark={isDark} onLogout={logout} />
          </ProtectedRoute>
        } />
        <Route path="/chatbot" element={
          <ProtectedRoute>
            <Chatbot isDark={isDark} onLogout={logout} user={currentUser} />
          </ProtectedRoute>
        } />
      </Routes>
      {!isPrivatePage && <Footer isDark={isDark} />}
    </div>
  );
}

function AppWrapper() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default AppWrapper;
