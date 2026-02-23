import httpx

# WMO Weather interpretation codes (https://open-meteo.com/en/docs)
def map_wmo_code_to_condition(code: int) -> str:
    if code == 0:
        return "Clear"
    elif code in [1, 2, 3]:
        return "Clouds"
    elif code in [45, 48]:
        return "Clouds" # Fog rendered as clouds for simplicity
    elif code in [51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82]:
        return "Rain"
    elif code in [71, 73, 75, 77, 85, 86]:
        return "Snow"
    elif code in [95, 96, 99]:
        return "Thunderstorm"
    else:
        return "Clear"

async def get_weather_for_ip(ip: str):
    async with httpx.AsyncClient() as client:
        # Get IP Geolocation
        geo_url = f"http://ip-api.com/json/{ip}" if ip else "http://ip-api.com/json/"
        geo_resp = await client.get(geo_url)
        geo_data = geo_resp.json()
        
        if geo_data.get("status") == "fail":
            # fallback coordinates if IP fails
            lat, lon, city = 28.6139, 77.2090, "New Delhi"
        else:
            lat = geo_data["lat"]
            lon = geo_data["lon"]
            city = geo_data["city"]
        
        return await fetch_weather_from_coordinates(lat, lon, city)

async def get_weather_for_city(city_name: str):
    # Use OpenMeteo geocoding to get lat/lon for city
    async with httpx.AsyncClient() as client:
        geocode_url = f"https://geocoding-api.open-meteo.com/v1/search?name={city_name}&count=1&language=en&format=json"
        geo_resp = await client.get(geocode_url)
        geo_data = geo_resp.json()
        
        if not geo_data.get("results"):
            raise Exception("City not found")
            
        location = geo_data["results"][0]
        lat = location["latitude"]
        lon = location["longitude"]
        city = location["name"]
        
        return await fetch_weather_from_coordinates(lat, lon, city)

async def fetch_weather_from_coordinates(lat: float, lon: float, city: str):
    async with httpx.AsyncClient() as client:
        weather_url = f"https://api.open-meteo.com/v1/forecast?latitude={lat}&longitude={lon}&current_weather=true"
        weather_resp = await client.get(weather_url)
        weather_data = weather_resp.json()
        
        current = weather_data.get("current_weather", {})
        
        condition_code = current.get("weathercode", 0)
        condition_str = map_wmo_code_to_condition(condition_code)
        
        return {
            "location": city,
            "temperature": current.get("temperature", 0),
            "condition": condition_str,
            "is_day": current.get("is_day", 1) == 1,
            "wind_speed": current.get("windspeed", 0)
        }
