import os
from fastapi import APIRouter, HTTPException, Depends, UploadFile, File
from sqlalchemy.orm import Session
from backend.app.schemas.video_schemas import VideoDetectionResponse
from backend.app.services.video_service import analyze_video_pipeline
from backend.app.database.config import get_db
from backend.app.models import Detection

router = APIRouter()


@router.post("/", response_model=VideoDetectionResponse)
async def detect_video(file: UploadFile = File(...), db: Session = Depends(get_db)):
    try:
        os.makedirs("uploads", exist_ok=True)
        file_path = os.path.join("uploads", file.filename)
        
        with open(file_path, "wb") as buffer:
            content = await file.read()
            buffer.write(content)
        
        results = await analyze_video_pipeline(file_path, file.filename)
        
        db_detection = Detection(
            user_id=1,
            input_type="video",
            content_path=file_path,
            result_label=results["final_video_verdict"],
            confidence_score=results["overall_confidence"]
        )
        db.add(db_detection)
        db.commit()
        db.refresh(db_detection)
        
        return VideoDetectionResponse(**results)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
