# OmniGuard - AI-Powered Cyberbullying Detection Platform

A full-stack web and mobile application for detecting cyberbullying in text, images, and videos using advanced AI models.

---

## 📚 Detailed Documentation

For in-depth technical documentation, see:
- **[Backend README](./backend/README.md)**: Complete backend architecture, file breakdown, and API documentation
- **[Frontend README](./frontend/README.md)**: Complete frontend architecture, component breakdown, and build instructions

---

## 🚀 Quick Start

### Prerequisites
| Software | Version | Purpose |
|----------|---------|---------|
| Python | 3.10+ | Backend development |
| Node.js | 18+ | Frontend development |
| npm | 9+ | Frontend package manager |
| Android Studio | Latest | Mobile app development |
| Git | Latest | Version control |

---

### Backend Quick Start
```bash
cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

---

### Frontend Quick Start (Web)
```bash
cd frontend
npm install
npm run dev
```

---

### Mobile App Quick Start (Android)
```bash
cd frontend
# Update .env.production with your local IP first!
npm run build
npx cap sync
npx cap open android
```

---

## 📁 Project Structure
```
AI CyberBullying/
├── backend/          # FastAPI backend (see backend/README.md)
├── frontend/         # React + Vite + Capacitor frontend (see frontend/README.md)
│   ├── android/      # Android native project
│   └── src/          # React source code
└── requirements.txt  # Backend dependencies
```

---

## 📖 Detailed Docs

For full documentation including:
- Backend API endpoints
- File-by-file breakdown
- Component architecture
- Environment configuration
- Troubleshooting

See **[backend/README.md](./backend/README.md)** and **[frontend/README.md](./frontend/README.md)**!

