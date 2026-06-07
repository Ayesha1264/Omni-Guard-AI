from sqlalchemy import Column, Integer, String, Float, DateTime, Text
from sqlalchemy.sql import func
from backend.app.database.config import Base


class ModerationRecord(Base):
    __tablename__ = "moderation_records"

    id = Column(Integer, primary_key=True, index=True)
    content = Column(Text, nullable=False)
    is_cyberbullying = Column(Integer, default=0)
    confidence_score = Column(Float, nullable=True)
    category = Column(String(100), nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
