# OmniGuard Frontend

This is the React + Taro + Capacitor frontend for OmniGuard, an AI-powered cyberbullying detection platform. It features a responsive design, dark/light theme support, and can be deployed as both a web app and mobile app (Android via Capacitor).

---

## 📁 Project Structure

```
frontend/
├── src/
│   ├── main.tsx                 # React entry point
│   ├── index.css                # Global styles with Tailwind config
│   ├── vite-env.d.ts            # Vite environment type definitions
│   ├── App.tsx                  # Main app component with routing & auth state
│   ├── lib/
│   │   └── utils.ts             # Utility function (cn: class name merger)
│   ├── components/
│   │   ├── Navbar.tsx           # Navigation bar for public pages
│   │   ├── Footer.tsx           # Footer for public pages
│   │   ├── SideMenu.tsx         # Sidebar for authenticated pages
│   │   ├── ProtectedLayout.tsx  # Responsive layout for private pages (mobile slide-over sidebar)
│   │   ├── FeatureCard.tsx      # Reusable feature card component
│   │   └── SectionWrapper.tsx   # Section wrapper & FadeIn animation component
│   └── pages/
│       ├── Home.tsx             # Landing page
│       ├── Features.tsx         # Features showcase page
│       ├── Impact.tsx           # Impact/statistics page
│       ├── Mission.tsx          # About/mission page
│       ├── News.tsx             # Cyberbullying news page
│       ├── Login.tsx            # Login page
│       ├── Signup.tsx           # Signup page
│       ├── Dashboard.tsx        # User dashboard
│       ├── Account.tsx          # Account settings page
│       ├── TextAnalysis.tsx     # Text analysis page
│       ├── ImageDetection.tsx   # Image detection page
│       ├── VideoProcessing.tsx  # Video processing page
│       ├── Reports.tsx          # Reports page (placeholder)
│       └── Chatbot.tsx          # Chatbot page (placeholder)
├── android/                     # Capacitor Android native project
├── .env                         # Default environment variables
├── .env.development             # Local web dev environment variables
├── .env.production              # Mobile app environment variables
├── capacitor.config.json        # Capacitor configuration
├── vite.config.ts               # Vite build config
├── tailwind.config.js           # Tailwind CSS config
├── postcss.config.js            # PostCSS config
├── tsconfig.json                # TypeScript config
├── package.json                 # Dependencies & scripts
└── index.html                   # HTML entry point
```

---

## 🔧 Core Technologies

- **React 18**: UI library
- **TypeScript**: Type safety
- **Vite**: Fast build tool & dev server
- **Tailwind CSS**: Utility-first CSS framework
- **Framer Motion**: Animations
- **Lucide React**: Icon library
- **React Router DOM**: Client-side routing
- **Recharts**: Charts library
- **Capacitor**: Cross-platform mobile app runtime

---

## 📦 Required Environment Variables

Create/update the following environment variable files in the `frontend/` directory:

### `.env` (Fallback for all environments)
```env
VITE_API_BASE_URL=http://127.0.0.1:8000/api/v1/
```

### `.env.development` (Local web development)
```env
VITE_API_BASE_URL=http://127.0.0.1:8000/api/v1/
```

### `.env.production` (Mobile app deployment)
```env
VITE_API_BASE_URL=http://[YOUR_LOCAL_IP]:8000/api/v1/
```

**Important**:
- The base URL **must end with a trailing slash** (`/`)
- For mobile, replace `[YOUR_LOCAL_IP]` with your actual local network IP address

---

## 📖 Component & Page Breakdown

---

### `src/main.tsx`
- **Purpose**: React entry point
- **Key Responsibilities**:
  - Renders `AppWrapper` (from `App.tsx`) into `#root` div
- **Dependencies**: `react`, `react-dom/client`, `./index.css`, `./App`

---

### `src/App.tsx`
- **Purpose**: Main application component with routing, theme, and authentication state
- **Key State**:
  - `isDark`: Toggles dark/light theme
  - `currentUser`: Authenticated user data (or null)
  - `isAuthenticated`: Boolean flag for auth status
- **Key Functions**:
  - `login(email, password)`:
    - Sends `POST` to `${API_BASE}auth/login`
    - Stores user in `localStorage` as `omniguard_user`
    - Sets auth state and redirects to dashboard
  - `signup(name, email, password)`:
    - Sends `POST` to `${API_BASE}auth/signup`
    - Stores user in `localStorage` as `omniguard_user`
    - Sets auth state and redirects to dashboard
  - `logout()`:
    - Clears `localStorage`
    - Resets auth state
    - Navigates to `/login`
  - `ProtectedRoute`: HOC that redirects unauthenticated users to `/login`
- **Routes**:
  - Public: `/`, `/features`, `/impact`, `/mission`, `/news`, `/login`, `/signup`
  - Private (protected): `/dashboard`, `/account`, `/text-analysis`, `/image-detection`, `/video-processing`, `/reports`, `/chatbot`
- **Environment Vars Used**: `VITE_API_BASE_URL`
- **Calls To**: Backend auth endpoints
- **Dependencies**: `react-router-dom`, `lucide-react`, `framer-motion`
- **Used By**: `main.tsx`

---

### `src/components/ProtectedLayout.tsx`
- **Purpose**: Responsive layout wrapper for authenticated pages with slide-over sidebar on mobile
- **Key State**:
  - `isMobileMenuOpen`: Boolean controlling mobile sidebar visibility
- **Key Features**:
  - Mobile header with hamburger button and logo (hidden on desktop)
  - Semi-transparent backdrop when mobile menu is open
  - Sidebar that slides in on mobile, stays fixed on desktop
  - Main content area with max-width container for centering
- **Props**:
  - `isDark`: Theme flag
  - `onLogout`: Logout function
  - `userName`: Current user's name
  - `children`: Page content to render
- **Dependencies**: `framer-motion`, `lucide-react`, `SideMenu`, `../lib/utils`
- **Used By**: All private pages

---

### `src/components/SideMenu.tsx`
- **Purpose**: Sidebar navigation for authenticated pages
- **Props**:
  - `isDark`: Theme flag
  - `onLogout`: Logout function
  - `userName`: Current user's name
  - `onClose`: Function to close mobile sidebar
- **Menu Items**:
  - Dashboard (`/dashboard`)
  - Text Analysis (`/text-analysis`)
  - Image Detection (`/image-detection`)
  - Video Processing (`/video-processing`)
  - AI Chatbot (`/chatbot`)
  - Reports (`/reports`)
  - Account (`/account`)
- **Key Features**:
  - Uses `react-router-dom` `Link` components
  - Highlights active route with gradient background
  - Framer Motion animations on hover/tap
  - Mobile close button (X icon)
- **Dependencies**: `framer-motion`, `lucide-react`, `react-router-dom`, `../lib/utils`
- **Used By**: `ProtectedLayout.tsx`

---

### `src/components/Navbar.tsx`
- **Purpose**: Navigation bar for public pages
- **Props**:
  - `isDark`: Theme flag
  - `toggleTheme`: Function to toggle dark/light theme
- **Key State**:
  - `isScrolled`: Boolean for navbar background change on scroll
  - `mobileMenuOpen`: Boolean for mobile menu visibility
- **Links**:
  - Home, Features, Impact, Mission, News
  - Get Started button (links to `/login`)
- **Key Features**:
  - Responsive design (mobile menu, desktop nav)
  - Theme toggle button
  - Scroll animations with Framer Motion
- **Dependencies**: `framer-motion`, `lucide-react`, `react-router-dom`, `../lib/utils`
- **Used By**: `App.tsx`

---

### `src/components/Footer.tsx`
- **Purpose**: Footer for public pages
- **Props**:
  - `isDark`: Theme flag
- **Sections**:
  - Logo & tagline
  - Social media links
  - Product links
  - Company links
  - Legal links
- **Dependencies**: `lucide-react`, `react-router-dom`, `../lib/utils`
- **Used By**: `App.tsx`

---

### `src/components/FeatureCard.tsx`
- **Purpose**: Reusable card component for showcasing features
- **Props**:
  - `icon`: Lucide icon component
  - `title`: Card title
  - `description`: Card description
  - `features`: List of bullet points
  - `delay`: Animation delay
  - `isDark`: Theme flag
- **Key Features**:
  - Fade-in animation via `FadeIn` component
  - Hover lift & scale effect
- **Dependencies**: `framer-motion`, `lucide-react`, `./SectionWrapper`, `../lib/utils`
- **Used By**: `pages/Features.tsx`

---

### `src/components/SectionWrapper.tsx`
- **Purpose**: Wrapper for page sections with animations
- **Components Exported**:
  1. **`SectionWrapper`**:
     - Props: `children`, `className`, `id`
     - Adds padding to sections
  2. **`FadeIn`**:
     - Props: `children`, `delay`, `className`, `direction`
     - Framer Motion animation that fades in when in viewport
     - Supports directions: up, down, left, right
- **Dependencies**: `framer-motion`
- **Used By**: `FeatureCard.tsx`, most pages

---

### `src/lib/utils.ts`
- **Purpose**: Utility functions
- **Exports**:
  - `cn(...inputs: ClassValue[])`: Merges Tailwind class names using `clsx` and `tailwind-merge`
- **Dependencies**: `clsx`, `tailwind-merge`
- **Used By**: Most components

---

### `src/pages/Home.tsx`
- **Purpose**: Landing page with hero section and quick links
- **Props**:
  - `isDark`: Theme flag
- **Key State**:
  - `news`: News articles from backend
  - `isLoading`: Loading state for news
- **Key Functions**:
  - `fetchNews(forceRefresh)`:
    - Calls `${API_BASE}news` (with optional `force_refresh` query param)
    - Stores result in `news` state
- **Key Features**:
  - Hero section with "Get Started" button
  - Quick access tiles: Text, Image, Video Analysis
  - News feed with refresh button
- **Dependencies**: `framer-motion`, `lucide-react`, `react-router-dom`, `../lib/utils`, `../components/SectionWrapper`
- **Called By**: `App.tsx`
- **Calls To**: Backend news endpoint

---

### `src/pages/Features.tsx`
- **Purpose**: Features showcase page
- **Props**:
  - `isDark`: Theme flag
- **Key Features**:
  - Hero section
  - 3 feature cards (Text, Image, Video analysis) using `FeatureCard` component
- **Dependencies**: `framer-motion`, `lucide-react`, `../lib/utils`, `../components/SectionWrapper`, `../components/FeatureCard`
- **Called By**: `App.tsx`

---

### `src/pages/Impact.tsx`
- **Purpose**: Impact/statistics page
- **Props**:
  - `isDark`: Theme flag
- **Key Features**:
  - Stats grid with fake metrics
  - Chart (placeholder using Recharts)
- **Dependencies**: `framer-motion`, `lucide-react`, `recharts`, `../lib/utils`, `../components/SectionWrapper`
- **Called By**: `App.tsx`

---

### `src/pages/Mission.tsx`
- **Purpose**: About/mission page
- **Props**:
  - `isDark`: Theme flag
- **Key Features**:
  - Hero section
  - Mission statement
  - Values section
  - Team section (placeholder)
- **Dependencies**: `framer-motion`, `lucide-react`, `../lib/utils`, `../components/SectionWrapper`
- **Called By**: `App.tsx`

---

### `src/pages/News.tsx`
- **Purpose**: Cyberbullying news page
- **Props**:
  - `isDark`: Theme flag
- **Key State**:
  - `news`: News articles from backend
  - `isLoading`: Loading state for news
- **Key Functions**:
  - `fetchNews(forceRefresh)`:
    - Calls `${API_BASE}news`
    - Stores first 6 articles in `news` state
- **Dependencies**: `framer-motion`, `lucide-react`, `../lib/utils`, `../components/SectionWrapper`
- **Called By**: `App.tsx`
- **Calls To**: Backend news endpoint

---

### `src/pages/Login.tsx`
- **Purpose**: Login page
- **Props**:
  - `isDark`: Theme flag
  - `onLogin`: Login function from `App.tsx`
- **Key State**:
  - `email`, `password`: Form inputs
  - `isLoading`: Loading state during login
  - `error`: Error message
- **Key Functions**:
  - `handleSubmit(e)`:
    - Prevents default form behavior
    - Calls `onLogin(email, password)`
    - Handles success/error states
- **Dependencies**: `framer-motion`, `lucide-react`, `react-router-dom`, `../lib/utils`, `../components/SectionWrapper`
- **Called By**: `App.tsx`
- **Calls To**: `App.tsx` `onLogin` function

---

### `src/pages/Signup.tsx`
- **Purpose**: Signup page
- **Props**:
  - `isDark`: Theme flag
  - `onSignup`: Signup function from `App.tsx`
- **Key State**:
  - `name`, `email`, `password`: Form inputs
  - `isLoading`: Loading state during signup
  - `error`: Error message
- **Key Functions**:
  - `handleSubmit(e)`:
    - Prevents default form behavior
    - Calls `onSignup(name, email, password)`
    - Handles success/error states
- **Dependencies**: `framer-motion`, `lucide-react`, `react-router-dom`, `../lib/utils`, `../components/SectionWrapper`
- **Called By**: `App.tsx`
- **Calls To**: `App.tsx` `onSignup` function

---

### `src/pages/Dashboard.tsx`
- **Purpose**: User dashboard
- **Props**:
  - `isDark`: Theme flag
  - `onLogout`: Logout function
  - `user`: Current user data
- **Key Features**:
  - Wrapped in `ProtectedLayout`
  - Stats grid (Total Scans, Threats Blocked, Accuracy, Reports Generated)
  - Recent activity section
  - Quick actions (Text, Image, Video)
- **Dependencies**: `framer-motion`, `lucide-react`, `react-router-dom`, `../lib/utils`, `../components/SectionWrapper`, `../components/ProtectedLayout`
- **Called By**: `App.tsx`

---

### `src/pages/Account.tsx`
- **Purpose**: Account settings page
- **Props**:
  - `isDark`: Theme flag
  - `onLogout`: Logout function
  - `user`: Current user data
- **Key Features**:
  - Wrapped in `ProtectedLayout`
  - User profile info display
  - Account settings form (placeholder, not functional)
- **Dependencies**: `framer-motion`, `lucide-react`, `../lib/utils`, `../components/SectionWrapper`, `../components/ProtectedLayout`
- **Called By**: `App.tsx`

---

### `src/pages/TextAnalysis.tsx`
- **Purpose**: Text analysis page
- **Props**:
  - `isDark`: Theme flag
  - `onLogout`: Logout function
- **Key State**:
  - `inputText`: Text to analyze
  - `analysis`: Analysis result from backend
  - `isAnalyzing`: Loading state
- **Key Functions**:
  - `analyzeText()`:
    - Validates input
    - Sends `POST` to `${API_BASE}detection/text`
    - Stores result in `analysis` state
- **Key Features**:
  - Wrapped in `ProtectedLayout`
  - Textarea for input
  - Analysis result display with toxicity score
- **Environment Vars Used**: `VITE_API_BASE_URL`
- **Dependencies**: `framer-motion`, `lucide-react`, `../lib/utils`, `../components/SectionWrapper`, `../components/ProtectedLayout`
- **Called By**: `App.tsx`
- **Calls To**: Backend text detection endpoint

---

### `src/pages/ImageDetection.tsx`
- **Purpose**: Image detection page
- **Props**:
  - `isDark`: Theme flag
  - `onLogout`: Logout function
- **Key State**:
  - `selectedFile`: Uploaded image file
  - `previewUrl`: Image preview URL
  - `analysis`: Analysis result from backend
  - `isAnalyzing`: Loading state
- **Key Functions**:
  - `handleFileSelect(e)`:
    - Reads file and creates preview URL
  - `analyzeImage()`:
    - Creates `FormData` with file
    - Sends `POST` to `${API_BASE}detection/image`
    - Stores result in `analysis` state
- **Key Features**:
  - Wrapped in `ProtectedLayout`
  - File input with drag-and-drop support
  - Image preview
  - Detailed analysis breakdown (text score, vision score, final verdict)
- **Environment Vars Used**: `VITE_API_BASE_URL`
- **Dependencies**: `framer-motion`, `lucide-react`, `../lib/utils`, `../components/SectionWrapper`, `../components/ProtectedLayout`
- **Called By**: `App.tsx`
- **Calls To**: Backend image detection endpoint

---

### `src/pages/VideoProcessing.tsx`
- **Purpose**: Video processing page
- **Props**:
  - `isDark`: Theme flag
  - `onLogout`: Logout function
- **Key State**:
  - `selectedFile`: Uploaded video file
  - `previewUrl`: Video preview URL
  - `analysis`: Analysis result from backend
  - `isAnalyzing`: Loading state
- **Key Functions**:
  - `handleFileSelect(e)`:
    - Reads file and creates preview URL
  - `analyzeVideo()`:
    - Creates `FormData` with file
    - Sends `POST` to `${API_BASE}detection/video`
    - Stores result in `analysis` state
- **Key Features**:
  - Wrapped in `ProtectedLayout`
  - File input with drag-and-drop support
  - Video preview
  - Analysis result display (toxic frames count, overall confidence, frame details)
- **Environment Vars Used**: `VITE_API_BASE_URL`
- **Dependencies**: `framer-motion`, `lucide-react`, `../lib/utils`, `../components/SectionWrapper`, `../components/ProtectedLayout`
- **Called By**: `App.tsx`
- **Calls To**: Backend video detection endpoint

---

### `src/pages/Reports.tsx`
- **Purpose**: Reports page (placeholder)
- **Props**:
  - `isDark`: Theme flag
  - `onLogout`: Logout function
- **Key Features**:
  - Wrapped in `ProtectedLayout`
  - Placeholder text
- **Dependencies**: `framer-motion`, `lucide-react`, `../lib/utils`, `../components/SectionWrapper`, `../components/ProtectedLayout`
- **Called By**: `App.tsx`

---

### `src/pages/Chatbot.tsx`
- **Purpose**: Chatbot page (placeholder)
- **Props**:
  - `isDark`: Theme flag
  - `onLogout`: Logout function
  - `user`: Current user data
- **Key Features**:
  - Wrapped in `ProtectedLayout`
  - Placeholder text
- **Dependencies**: `framer-motion`, `lucide-react`, `../lib/utils`, `../components/SectionWrapper`, `../components/ProtectedLayout`
- **Called By**: `App.tsx`

---

## 🚀 Running the Frontend

### Web Development
```bash
cd frontend
npm install
npm run dev
```

### Production Build (for Mobile)
```bash
cd frontend
npm run build
```

### Sync to Capacitor
```bash
cd frontend
npx cap sync
```

### Open Android Studio
```bash
cd frontend
npx cap open android
```

---

## 📱 Capacitor Configuration (`capacitor.config.json`)
```json
{
  "appId": "com.omniguard.app",
  "appName": "OmniGuard",
  "webDir": "dist",
  "bundledWebRuntime": false,
  "server": {
    "cleartext": true,
    "androidScheme": "http"
  },
  "android": {
    "allowMixedContent": true
  }
}
```
- `server.cleartext`: Allows HTTP requests (required for local dev)
- `server.androidScheme`: Uses `http` instead of default `https` to avoid mixed-content issues
- `android.allowMixedContent`: Allows mixed HTTP/HTTPS content on Android

---

## 🎨 Tailwind CSS Configuration
- Custom color scheme: `primary`, `secondary`, `accent`, `dark`, `darker`, `card`, `card-light`
- Custom animations: `pulse-slow`, `float`
- Custom utilities: `glass`, `glass-card`, `gradient-text`, `stylish-line`

---

## 📡 Frontend API Calls Summary

| Page | Endpoint | Method | Purpose |
|------|----------|--------|---------|
| `App.tsx` | `auth/login` | POST | User login |
| `App.tsx` | `auth/signup` | POST | User signup |
| `Home.tsx` | `news` | GET | Fetch news |
| `News.tsx` | `news` | GET | Fetch news |
| `TextAnalysis.tsx` | `detection/text` | POST | Analyze text |
| `ImageDetection.tsx` | `detection/image` | POST | Analyze image |
| `VideoProcessing.tsx` | `detection/video` | POST | Analyze video |
