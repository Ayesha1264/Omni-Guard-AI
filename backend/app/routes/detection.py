from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from backend.app.schemas import TextDetectionRequest, DetectionResponse
from backend.app.services import analyze_text_pipeline
from backend.app.database.config import get_db
from backend.app.models import Detection

router = APIRouter(prefix="/api/v1/detection", tags=["Detection"])


@router.post("/text", response_model=DetectionResponse)
async def detect_text(request: TextDetectionRequest, db: Session = Depends(get_db)):
    try:
        result = await analyze_text_pipeline(request.text)

        db_detection = Detection(
            user_id=1,
            input_type="text",
            result_label=result["result_label"],
            confidence_score=result["confidence_score"]
        )
        db.add(db_detection)
        db.commit()
        db.refresh(db_detection)

        return DetectionResponse(**result)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
