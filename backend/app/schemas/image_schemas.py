from pydantic import BaseModel, ConfigDict


class FileInfo(BaseModel):
    status: str
    file_name: str
    extracted_text: str


class AnalysisBreakdown(BaseModel):
    text_toxicity_score: float
    vision_toxicity_score: float
    local_combined_score: float


class FinalVerdict(BaseModel):
    result_label: str
    final_score: float
    reasoning: str


class ImageDetectionResponse(BaseModel):
    file_info: FileInfo
    analysis_breakdown: AnalysisBreakdown
    final_verdict: FinalVerdict

    model_config = ConfigDict(from_attributes=True)
