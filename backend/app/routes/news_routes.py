from fastapi import APIRouter, Query
from backend.app.services.news_service import get_latest_news

router = APIRouter(prefix="/api/v1/news", tags=["news"])

@router.get("")
async def get_news(force_refresh: bool = Query(False)):
    return await get_latest_news(force_refresh)