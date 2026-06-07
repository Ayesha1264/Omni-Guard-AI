# OmniGuard Backend

This is the backend service for OmniGuard, an AI-powered cyberbullying detection platform that analyzes text, images, and videos to identify harmful content.

---

## 📁 Project Structure

```
backend/
├── app/
│   ├── __init__.py
│   ├── main.py                 # Entry point for FastAPI app
│   ├── database/
│   │   ├── __init__.py
│   │   └── config.py          # Database connection & session management
│   ├── models/
│   │   ├── __init__.py
│   │   └── models.py          # SQLAlchemy ORM models (User, Detection, Report, ChatHistory)
│   ├── schemas/
│   │   ├── __init__.py
│   │   ├── schemas.py         # Pydantic models for auth & text detection
│   │   ├── image_schemas.py   # Pydantic models for image analysis
│   │   └── video_schemas.py   # Pydantic models for video analysis
│   ├── routes/
│   │   ├── __init__.py
│   │   ├── health.py          # /health check endpoint
│   │   ├── auth.py            # /api/v1/auth/* (login, signup, get user)
│   │   ├── detection.py       # /api/v1/detection/text (text analysis)
│   │   ├── image_routes.py    # /api/v1/detection/image (image upload & analysis)
│   │   ├── video_routes.py    # /api/v1/detection/video (video upload & analysis)
│   │   └── news_routes.py     # /api/v1/news (fetch cyberbullying news)
│   ├── services/
│   │   ├── __init__.py
│   │   ├── text_service.py    # Text analysis pipeline (Toxic-BERT + Groq)
│   │   ├── image_service.py   # Image analysis pipeline (EasyOCR + CLIP + Gemini)
│   │   ├── video_service.py   # Video analysis pipeline (OpenCV + Gemini)
│   │   └── news_service.py    # News fetching (NewsAPI, cached for 3h)
│   └── ai/                    # (Currently unused, reserved for future)
│       └── __init__.py
└── requirements.txt           # Python dependencies
```

---

## 🔧 Core Technologies

- **FastAPI**: Web framework for building APIs with Python
- **SQLAlchemy**: ORM for database interactions
- **SQLite**: Default database (can be configured via `DATABASE_URL` env var)
- **Transformers**: Hugging Face library for pre-trained models
- **EasyOCR**: Optical character recognition for extracting text from images
- **OpenCV**: Video processing and frame extraction
- **Pillow**: Image manipulation
- **Groq**: LLM API for enhanced text analysis
- **Google Gemini**: Vision & video LLM for image/video analysis
- **httpx**: Async HTTP client for news API calls

---

## 📦 Required Environment Variables

Create a `.env` file in the `backend/` directory with the following variables:

```env
DATABASE_URL=sqlite:///./omniguard.db
GROQ_API_KEY=<your-groq-api-key>
GEMINI_API_KEY=<your-gemini-api-key>
GEMINI_VIDEO_API_KEY=<your-gemini-api-key-for-video>  # optional, falls back to GEMINI_API_KEY
NEWS_API_KEY=<your-newsapi.org-api-key>
```

---

## 📖 File-by-File Breakdown

---

### `app/main.py`
- **Purpose**: Entry point for the FastAPI application
- **Key Responsibilities**:
  - Initializes FastAPI app with title and version
  - Configures CORS middleware to allow all origins
  - Creates database tables using SQLAlchemy models
  - Includes all API routers
- **Routes**:
  - `GET /`: Welcome message
  - `/health` (from health router): Health check
  - `/api/v1/auth/*` (from auth router): Authentication endpoints
  - `/api/v1/detection/*` (from detection, image, video routers): Content analysis
  - `/api/v1/news` (from news router): Cyberbullying news

---

### `app/database/config.py`
- **Purpose**: Database connection and session management
- **Key Functions/Variables**:
  - `DATABASE_URL`: Loaded from environment variable
  - `engine`: SQLAlchemy engine for database connection
  - `SessionLocal`: Factory for creating new database sessions
  - `Base`: Declarative base class for all ORM models
  - `get_db()`: Dependency to inject database sessions into routes
- **Usage**: Used by all routes that need database access

---

### `app/models/models.py`
- **Purpose**: SQLAlchemy ORM models defining database schema
- **Models**:
  1. **User**: Stores user account info
     - Fields: `id`, `username`, `email`, `password_hash`, `created_at`
     - Relationships: `detections`, `chat_history`
  2. **Detection**: Stores scan history
     - Fields: `id`, `user_id`, `input_type`, `content_path`, `result_label`, `confidence_score`, `created_at`
     - Relationships: `user`, `report`
  3. **Report**: Reserved for future report feature
     - Fields: `id`, `detection_id`, `report_summary`, `severity_level`, `created_at`
     - Relationships: `detection`
  4. **ChatHistory**: Reserved for future chatbot feature
     - Fields: `id`, `user_id`, `message`, `response`, `created_at`
     - Relationships: `user`
- **Usage**: Used by routes to interact with the database

---

### `app/schemas/`
- **Purpose**: Pydantic models for request/response validation
- **Files**:
  1. **schemas.py**: Auth & text detection schemas
     - `TextDetectionRequest`: Input for text analysis (text field required)
     - `DetectionResponse`: Output of text analysis (status, input_text, toxicity_score, result_label, confidence_score, reasoning)
     - `SignupRequest`: Signup form data (name, email, password)
     - `LoginRequest`: Login form data (email, password)
     - `UserResponse`: User profile data (id, username, email, created_at)
     - `AuthResponse`: Auth endpoint response (status, message, user)
  2. **image_schemas.py**: Image analysis response schemas
     - `FileInfo`: File metadata (status, file_name, extracted_text)
     - `AnalysisBreakdown`: Detailed scores (text_toxicity_score, vision_toxicity_score, local_combined_score)
     - `FinalVerdict`: Analysis result (result_label, final_score, reasoning)
     - `ImageDetectionResponse`: Full image analysis response
  3. **video_schemas.py**: Video analysis response schemas
     - `VideoDetectionResponse`: Full video analysis response (status, file_name, total_frames_analyzed, toxic_frames_count, final_video_verdict, overall_confidence, frame_details)

---

### `app/routes/health.py`
- **Purpose**: Health check endpoint for monitoring
- **Route**:
  - `GET /health`: Returns {"status": "running"}
- **Usage**: Used for liveness/readiness probes

---

### `app/routes/auth.py`
- **Purpose**: User authentication (login/signup)
- **Routes**:
  - `POST /api/v1/auth/signup`: Create a new user account
    - Request body: `SignupRequest`
    - Response: `AuthResponse`
    - Logic:
      - Validates password length (≥6 chars)
      - Checks for existing user with same email
      - Hashes password using `werkzeug.security.generate_password_hash`
      - Saves user to database
  - `POST /api/v1/auth/login`: Authenticate existing user
    - Request body: `LoginRequest`
    - Response: `AuthResponse`
    - Logic:
      - Finds user by email
      - Verifies password using `werkzeug.security.check_password_hash`
  - `GET /api/v1/auth/user/{user_id}`: Get user profile by ID (not currently used in frontend)
- **Dependencies**: Uses `get_db()` to get database session
- **Calls To**: `models.User` for database operations

---

### `app/routes/detection.py`
- **Purpose**: Text analysis endpoint
- **Route**:
  - `POST /api/v1/detection/text`: Analyze text for cyberbullying
    - Request body: `TextDetectionRequest`
    - Response: `DetectionResponse`
    - Logic:
      - Calls `text_service.analyze_text_pipeline()`
      - Saves detection result to database with `user_id=1` (placeholder)
- **Dependencies**: Uses `get_db()`
- **Calls To**: `services.text_service.analyze_text_pipeline()`, `models.Detection`

---

### `app/routes/image_routes.py`
- **Purpose**: Image upload and analysis endpoint
- **Route**:
  - `POST /api/v1/detection/image`: Upload and analyze image
    - Form data: `file` (UploadFile)
    - Response: `ImageDetectionResponse`
    - Logic:
      - Creates `uploads/` directory if it doesn't exist
      - Saves uploaded file to `uploads/`
      - Calls `image_service.analyze_image_pipeline()`
      - Saves detection result to database with `user_id=1` (placeholder)
- **Dependencies**: Uses `get_db()`
- **Calls To**: `services.image_service.analyze_image_pipeline()`, `models.Detection`

---

### `app/routes/video_routes.py`
- **Purpose**: Video upload and analysis endpoint
- **Route**:
  - `POST /api/v1/detection/video`: Upload and analyze video
    - Form data: `file` (UploadFile)
    - Response: `VideoDetectionResponse`
    - Logic:
      - Creates `uploads/` directory if it doesn't exist
      - Saves uploaded file to `uploads/`
      - Calls `video_service.analyze_video_pipeline()`
      - Saves detection result to database with `user_id=1` (placeholder)
- **Dependencies**: Uses `get_db()`
- **Calls To**: `services.video_service.analyze_video_pipeline()`, `models.Detection`

---

### `app/routes/news_routes.py`
- **Purpose**: Fetch cyberbullying-related news
- **Route**:
  - `GET /api/v1/news`: Get latest news
    - Query param: `force_refresh` (bool, optional, default: False)
    - Response: List of news articles from NewsAPI
    - Logic:
      - Calls `news_service.get_latest_news()`
- **Calls To**: `services.news_service.get_latest_news()`

---

### `app/services/text_service.py`
- **Purpose**: Text analysis pipeline (local model + optional LLM)
- **Key Functions/Variables**:
  - `toxic_classifier`: Global variable for lazy-loaded Toxic-BERT model
  - `get_toxic_classifier()`: Loads `unitary/toxic-bert` from Hugging Face if not already loaded
  - `async analyze_text_pipeline(text: str)`:
    - **Steps**:
      1. Runs text through Toxic-BERT to get toxicity score
      2. If score is in ambiguous range (0.01-0.99), calls Groq LLM (Llama-3.3-70b-versatile) for second opinion
      3. For high-confidence results (score ≤0.01 or ≥0.99), skips LLM call
      4. Returns `result_label` ("toxic"/"safe"), `confidence_score`, and `reasoning`
    - **Environment Vars Used**: `GROQ_API_KEY`
- **Called By**: `routes/detection.py`
- **Calls To**: Hugging Face Transformers pipeline, Groq API

---

### `app/services/image_service.py`
- **Purpose**: Image analysis pipeline (OCR + vision model + optional LLM)
- **Key Functions/Variables**:
  - `ocr_reader`: Global variable for lazy-loaded EasyOCR reader
  - `clip_classifier`: Global variable for lazy-loaded CLIP zero-shot classifier
  - `get_ocr_reader()`: Loads EasyOCR with English language support
  - `get_clip_classifier()`: Loads `openai/clip-vit-base-patch32`
  - `async analyze_image_pipeline(image_path: str, file_name: str, skip_api: bool = False)`:
    - **Steps**:
      1. Extracts text from image using EasyOCR
      2. Analyzes extracted text with Toxic-BERT (from `text_service`)
      3. Analyzes image with CLIP using candidate labels:
         - "completely safe"
         - "funny internet meme"
         - "severe cyberbullying"
         - "physical violence"
      4. Combines scores (text score weighted 0.6, vision 0.4 if text present)
      5. If combined score is in ambiguous range (0.25-0.75) and `skip_api=False`, calls Gemini Vision API
      6. Supports multiple `GEMINI_API_KEY_*` variables for fallback
    - **Environment Vars Used**: `GEMINI_API_KEY`, `GEMINI_API_KEY_1` through `GEMINI_API_KEY_20`
- **Called By**: `routes/image_routes.py`
- **Calls To**: `text_service.get_toxic_classifier()`, Google Gemini API

---

### `app/services/video_service.py`
- **Purpose**: Video analysis via frame sampling and Gemini Vision
- **Key Functions/Variables**:
  - `target_models`: List of Gemini model names to try in order
  - `async analyze_video_pipeline(file_path: str, original_filename: str)`:
    - **Steps**:
      1. Opens video with OpenCV and gets total frame count
      2. Samples 4 frames at 20%, 40%, 60%, 80% of video duration
      3. For each frame:
         - Saves as temporary JPG
         - Calls Gemini Vision API to analyze for cyberbullying/violence
         - If any frame is toxic, stops early and marks video as toxic
      4. Deletes temporary frame files
      5. Returns overall verdict, confidence, and frame-by-frame details
    - **Environment Vars Used**: `GEMINI_VIDEO_API_KEY`, `GEMINI_VIDEO_API_KEY_1` through `GEMINI_VIDEO_API_KEY_20` (falls back to `GEMINI_API_KEY` if not set)
- **Called By**: `routes/video_routes.py`
- **Calls To**: Google Gemini API

---

### `app/services/news_service.py`
- **Purpose**: Fetch and cache cyberbullying-related news from NewsAPI
- **Key Functions/Variables**:
  - `cached_news`: Global variable to store cached news
  - `last_fetch_time`: Global variable to track last cache update
  - `CACHE_DURATION`: 10800 seconds (3 hours)
  - `async get_latest_news(force_refresh: bool = False)`:
    - **Steps**:
      1. Returns cached news if available and not expired and `force_refresh=False`
      2. Otherwise, calls NewsAPI with query:
         - "cyberbullying OR (AI AND moderation) OR (online AND safety) OR (content AND moderation) OR (digital AND safety) OR (bullying AND online)"
      3. Caches results for 3 hours
    - **Environment Vars Used**: `NEWS_API_KEY`
- **Called By**: `routes/news_routes.py`
- **Calls To**: NewsAPI via httpx

---

## 🚀 Running the Backend

1. **Install dependencies**:
   ```bash
   cd backend
   pip install -r requirements.txt
   ```

2. **Create `.env` file** with required environment variables (see above)

3. **Run development server**:
   ```bash
   uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
   ```

4. **Access API docs**:
   - Swagger UI: http://127.0.0.1:8000/docs
   - ReDoc: http://127.0.0.1:8000/redoc

---

## 📡 API Endpoints Summary

| Method | Path | Description |
|--------|------|-------------|
| GET | / | Welcome message |
| GET | /health | Health check |
| POST | /api/v1/auth/signup | Create user account |
| POST | /api/v1/auth/login | Authenticate user |
| GET | /api/v1/auth/user/{user_id} | Get user profile |
| POST | /api/v1/detection/text | Analyze text for cyberbullying |
| POST | /api/v1/detection/image | Upload & analyze image |
| POST | /api/v1/detection/video | Upload & analyze video |
| GET | /api/v1/news | Get cyberbullying news |
