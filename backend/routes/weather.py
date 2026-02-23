from fastapi import APIRouter, Request, HTTPException
from services.weather_service import get_weather_for_ip, get_weather_for_city

router = APIRouter()

@router.get("/weather")
async def get_weather(request: Request, city: str = None):
    try:
        if city:
            weather_data = await get_weather_for_city(city)
        else:
            # Client IP might be 127.0.0.1 in local dev, which ip-api doesn't work with.
            # We can use an external service to find our own IP if local, or just pass empty to ip-api
            client_ip = request.client.host
            if client_ip in ("127.0.0.1", "::1", "localhost"):
               client_ip = "" # ip-api handles empty as caller IP
            weather_data = await get_weather_for_ip(client_ip)
        
        return weather_data
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
