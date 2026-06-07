import os
from fastapi import APIRouter, HTTPException, Depends, UploadFile, File
from sqlalchemy.orm import Session
from backend.app.schemas.image_schemas import ImageDetectionResponse
from backend.app.services.image_service import analyze_image_pipeline
from backend.app.database.config import get_db
from backend.app.models import Detection

router = APIRouter()


@router.post("/", response_model=ImageDetectionResponse)
async def detect_image(file: UploadFile = File(...), db: Session = Depends(get_db)):
    try:
        os.makedirs("uploads", exist_ok=True)
        file_path = os.path.join("uploads", file.filename)
        
        with open(file_path, "wb") as buffer:
            content = await file.read()
            buffer.write(content)
        
        results = await analyze_image_pipeline(file_path, file.filename)
        
        db_detection = Detection(
            user_id=1,
            input_type="image",
            content_path=file_path,
            result_label=results["final_verdict"]["result_label"],
            confidence_score=results["final_verdict"]["final_score"]
        )
        db.add(db_detection)
        db.commit()
        db.refresh(db_detection)
        
        return ImageDetectionResponse(**results)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
