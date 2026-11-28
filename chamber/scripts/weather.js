const weatherStatus = document.querySelector("#weather-status");
const currentWeather = document.querySelector("#current-weather");
const forecastList = document.querySelector("#forecast");

const myKey = "48aeb1afb06df7b631d09a1a1edf8a48";
const myLat = "-21.559";
const myLong = "28.992";

const apiBase = "https://api.openweathermap.org/data/2.5";
const query = `lat=${myLat}&lon=${myLong}&units=metric&appid=${myKey}`;
const currentUrl = `${apiBase}/weather?${query}`;
const forecastUrl = `${apiBase}/forecast?${query}`;

async function getWeather() {
    try {
        const [currentResponse, forecastResponse] = await Promise.all([
            fetch(currentUrl),
            fetch(forecastUrl)
        ]);

        if (!currentResponse.ok || !forecastResponse.ok) {
            throw new Error(`Weather request failed (${currentResponse.status}, ${forecastResponse.status})`);
        }

        const currentData = await currentResponse.json();
        const forecastData = await forecastResponse.json();

        displayCurrent(currentData);
        displayForecast(forecastData);
        weatherStatus.hidden = true;
    } catch (error) {
        console.warn(error);
        weatherStatus.textContent = "Weather data is currently unavailable.";
    }
}

function displayCurrent(data) {
    const weather = data.weather[0];

    currentWeather.innerHTML = `
        <img src="https://openweathermap.org/img/wn/${weather.icon}@2x.png" alt="" width="100" height="100">
        <div>
            <p class="weather-temp">${Math.round(data.main.temp)}&deg;C</p>
            <p class="weather-desc">${weather.description}</p>
        </div>
    `;
}

function displayForecast(data) {
    // The forecast comes in 3-hour steps. Group them by the chamber's local date.
    const offset = data.city.timezone; // seconds from UTC
    const toLocalDate = (seconds) => new Date((seconds + offset) * 1000).toISOString().slice(0, 10);

    const todayKey = toLocalDate(Math.floor(Date.now() / 1000));
    const days = {};

    data.list.forEach((item) => {
        const key = toLocalDate(item.dt);
        if (!days[key]) {
            days[key] = [];
        }
        days[key].push(item.main.temp);
    });

    // The next three days after today
    const nextDays = Object.keys(days)
        .filter((key) => key > todayKey)
        .sort()
        .slice(0, 3);

    forecastList.innerHTML = "";

    nextDays.forEach((key) => {
        const temps = days[key];
        const high = Math.round(Math.max(...temps));
        const low = Math.round(Math.min(...temps));
        const label = new Date(`${key}T00:00:00Z`).toLocaleDateString("en-GB", {
            weekday: "short",
            day: "numeric",
            month: "short",
            timeZone: "UTC"
        });

        const item = document.createElement("li");
        item.innerHTML = `<strong>${label}</strong><br>High ${high}&deg;C / Low ${low}&deg;C`;
        forecastList.appendChild(item);
    });
}

getWeather();