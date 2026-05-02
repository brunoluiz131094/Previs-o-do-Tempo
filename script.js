const apiKey = "2143f10c83ac3de663e17ad869f6ed44";

const cityInput = document.querySelector("#city-input");
const searchBtn = document.querySelector("#search-btn");

const cityName = document.querySelector("#city-name");
const tempElement = document.querySelector("#temp");
const descElement = document.querySelector("#description");
const weatherIconElement = document.querySelector("#weather-icon");
const humidityElement = document.querySelector("#humidity");
const windElement = document.querySelector("#wind");
const weatherContainer = document.querySelector("#weather-info");

const getWeatherData = async (city) => {
    const apiWeatherURL = `https://openweathermap.org{city}&units=metric&appid=${apiKey}&lang=pt_br`;

    const res = await fetch(apiWeatherURL);
    const data = await res.json();

    if (data.cod === "404") {
        alert("Cidade não encontrada!");
        return;
    }

    return data;
};

const showWeatherData = async (city) => {
    const data = await getWeatherData(city);

    if (!data) return;

    cityName.innerText = data.name;
    tempElement.innerText = `${Math.round(data.main.temp)}°C`;
    descElement.innerText = data.weather[0].description;
    humidityElement.innerText = data.main.humidity;
    windElement.innerText = data.wind.speed;

    const iconCode = data.weather[0].icon;
    weatherIconElement.setAttribute("src", `https://openweathermap.org{iconCode}@2x.png`);

    // --- MUDANÇA DE FUNDO DINÂMICA ---
    const mainWeather = data.weather[0].main.toLowerCase();
    document.body.className = ""; // Limpa classes anteriores

    if (mainWeather.includes("cloud")) {
        document.body.classList.add("clouds-bg");
    } else if (mainWeather.includes("rain") || mainWeather.includes("drizzle")) {
        document.body.classList.add("rain-bg");
    } else if (mainWeather.includes("clear")) {
        document.body.classList.add("clear-bg");
    } else {
        document.body.classList.add("default-bg");
    }

    weatherContainer.classList.remove("hidden");
};

searchBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const city = cityInput.value;
    if (city) showWeatherData(city);
});

cityInput.addEventListener("keyup", (e) => {
    if (e.code === "Enter") {
        const city = e.target.value;
        if (city) showWeatherData(city);
    }
});
