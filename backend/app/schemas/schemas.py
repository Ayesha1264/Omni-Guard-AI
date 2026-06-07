from pydantic import BaseModel, Field, ConfigDict
from datetime import datetime


class TextDetectionRequest(BaseModel):
    text: str = Field(..., min_length=1)


class DetectionResponse(BaseModel):
    status: str
    input_text: str
    toxicity_score: float
    result_label: str
    confidence_score: float
    reasoning: str

    model_config = ConfigDict(from_attributes=True)


class SignupRequest(BaseModel):
    name: str = Field(..., min_length=2)
    email: str = Field(..., min_length=5)
    password: str = Field(..., min_length=6)


class LoginRequest(BaseModel):
    email: str = Field(..., min_length=5)
    password: str = Field(..., min_length=6)


class UserResponse(BaseModel):
    id: int
    username: str
    email: str
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)


class AuthResponse(BaseModel):
    status: str
    message: str
    user: UserResponse
