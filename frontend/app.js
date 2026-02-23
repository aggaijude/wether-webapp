const canvas = document.getElementById('weatherCanvas');
const ctx = canvas.getContext('2d');

let resizeTimeout;
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(resizeCanvas, 100);
});
resizeCanvas();

// App State
let currentAnimation = null;
let animationFrameId = null;
let currentCondition = 'Clear';
let isDay = true;

const elements = {
    cityName: document.getElementById('cityName'),
    tempValue: document.getElementById('tempValue'),
    conditionText: document.getElementById('conditionText'),
    windSpeed: document.getElementById('windSpeed'),
    cityInput: document.getElementById('cityInput'),
    searchBtn: document.getElementById('searchBtn'),
    themeToggle: document.getElementById('themeToggle'),
    loading: document.getElementById('loading'),
    error: document.getElementById('error')
};


async function fetchWeather(city = '') {
    try {
        elements.loading.classList.remove('hidden');
        elements.error.classList.add('hidden');
        let url = 'http://localhost:8000/api/weather';
        if (city) {
            url += `?city=${encodeURIComponent(city)}`;
        }

        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(await response.text());
        }

        const data = await response.json();
        updateUI(data);
    } catch (err) {
        console.error(err);
        elements.error.textContent = 'Failed to fetch weather. ' + err.message;
        elements.error.classList.remove('hidden');
    } finally {
        elements.loading.classList.add('hidden');
    }
}

function updateUI(data) {
    elements.cityName.textContent = data.location;
    elements.tempValue.textContent = Math.round(data.temperature);
    elements.conditionText.textContent = data.condition;
    elements.windSpeed.textContent = data.wind_speed;

    currentCondition = data.condition;
    isDay = data.is_day;

    updateTheme();
    startAnimation(currentCondition);
}

function updateTheme() {
    // Clear previous themes
    document.body.className = '';

    const timeOfDay = isDay ? 'day' : 'night';
    const cond = currentCondition.toLowerCase();

    document.body.classList.add(`theme-${cond}-${timeOfDay}`);
}

elements.themeToggle.addEventListener('click', () => {
    isDay = !isDay;
    updateTheme();
    startAnimation(currentCondition);
});

elements.searchBtn.addEventListener('click', () => {
    const city = elements.cityInput.value.trim();
    if (city) {
        fetchWeather(city);
    }
});

elements.cityInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const city = elements.cityInput.value.trim();
        if (city) {
            fetchWeather(city);
        }
    }
});


// Animation Controller
function startAnimation(condition) {
    if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    let anim;
    switch (condition) {
        case 'Rain':
            anim = new RainAnimation(ctx, canvas);
            break;
        case 'Snow':
            anim = new SnowAnimation(ctx, canvas);
            break;
        case 'Thunderstorm':
            anim = new ThunderstormAnimation(ctx, canvas);
            break;
        case 'Clouds':
            anim = new CloudsAnimation(ctx, canvas);
            break;
        case 'Clear':
        default:
            anim = new ClearAnimation(ctx, canvas, isDay);
            break;
    }

    function loop() {
        anim.update();
        anim.draw();
        animationFrameId = requestAnimationFrame(loop);
    }
    loop();
}

// Initial fetch based on IP
fetchWeather();
