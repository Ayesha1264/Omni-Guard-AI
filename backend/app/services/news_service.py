import os
import time
import httpx
from dotenv import load_dotenv

load_dotenv()

cached_news = None
last_fetch_time = 0
CACHE_DURATION = 10800  # 3 hours in seconds

async def get_latest_news(force_refresh: bool = False):
    global cached_news, last_fetch_time
    
    current_time = time.time()
    
    if not force_refresh and cached_news and (current_time - last_fetch_time) < CACHE_DURATION:
        return cached_news
    
    api_key = os.getenv("NEWS_API_KEY")
    if not api_key:
        return []
    
    url = "https://newsapi.org/v2/everything"
    params = {
        "q": "cyberbullying OR (AI AND moderation) OR (online AND safety) OR (content AND moderation) OR (digital AND safety) OR (bullying AND online)",
        "language": "en",
        "sortBy": "relevancy",
        "pageSize": 6
    }
    headers = {
        "X-Api-Key": api_key
    }
    
    try:
        async with httpx.AsyncClient() as client:
            response = await client.get(url, params=params, headers=headers, timeout=30.0)
            response.raise_for_status()
            data = response.json()
            
            articles = data.get("articles", [])
            cached_news = articles
            last_fetch_time = current_time
            return articles
    except Exception as e:
        print(f"News API Error: {e}")
        return []