# Real-Time Weather Web App

A complete, end-to-end real-time weather visualization web application. It features dynamic animations (rain, snow, thunderstorm, clouds, clear sky) based on real-time weather data fetched using Open-Meteo API and IP-based geolocation.

## Project Structure
- `backend/`: FastAPI backend acting as a secure proxy to fetch weather and geolocation data.
- `frontend/`: Vanilla HTML, CSS, and JavaScript for rendering dynamic weather animations and UI.
- `.venv/`: Python virtual environment (pre-configured, ready to activate).

## Prerequisites
- Python 3.8+
- Modern Web Browser

## How to Run

> **Important:** Run **Step 1** and **Step 2** in **two separate terminals** simultaneously.

---

### Step 1 — Start the Backend

Open a terminal in the project root and run:

**Windows (PowerShell):**
```powershell
# Activate the virtual environment
.\.venv\Scripts\Activate.ps1

# Navigate to backend and start the server
cd backend
python app.py
```

**macOS / Linux:**
```bash
source .venv/bin/activate
cd backend
python app.py
```

The backend will be available at: **http://localhost:8000**
_(You can explore the API at http://localhost:8000/docs)_

---

### Step 2 — Serve the Frontend

Open a **second terminal** in the project root and run:

```bash
cd frontend
python -m http.server 3000
```

Then open your browser and go to: **http://localhost:3000**

> **VS Code shortcut:** Right-click `frontend/index.html` → **"Open with Live Server"** (also works if you have the Live Server extension).

---

### First-Time Setup (only if `.venv` is missing)

```bash
python -m venv .venv
# Activate (see Step 1 above), then:
pip install -r backend/requirements.txt
```

---

## APIs Used
- [Open-Meteo](https://open-meteo.com/): For weather data and geocoding.
- [ip-api](https://ip-api.com/): For IP-based location detection.

> Both APIs are **free** and require **no API keys** for basic usage.
