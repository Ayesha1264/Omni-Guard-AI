from pydantic import BaseModel, ConfigDict
from typing import List, Dict, Any


class VideoDetectionResponse(BaseModel):
    status: str
    file_name: str
    total_frames_analyzed: int
    toxic_frames_count: int
    final_video_verdict: str
    overall_confidence: float
    frame_details: List[Dict[str, Any]]

    model_config = ConfigDict(from_attributes=True)
