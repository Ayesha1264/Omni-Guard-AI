from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from backend.app.database.config import engine
from backend.app.models import models
from backend.app.routes import health, detection, image_routes, video_routes, auth, news_routes

models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="AI Cyberbullying Detection API", version="1.0.0")

origins = [
    "*",
    "http://localhost",
    "https://localhost",
    "capacitor://localhost",
]


app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(health, tags=["Health"])
app.include_router(detection)
app.include_router(auth.router)
app.include_router(image_routes.router, prefix="/api/v1/detection/image", tags=["Image Detection"])
app.include_router(video_routes.router, prefix="/api/v1/detection/video", tags=["Video Detection"])
app.include_router(news_routes.router)


@app.get("/")
def root():
    return {"message": "Welcome to AI Cyberbullying Detection API"}
