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

// Função para buscar dados da API
const getWeatherData = async (city) => {
    const apiWeatherURL = `https://openweathermap.org{city}&units=metric&appid=${apiKey}&lang=pt_br`;

    const res = await fetch(apiWeatherURL);
    const data = await res.json();

    if (data.cod === "404") {
        alert("Cidade não encontrada. Verifique a ortografia!");
        return;
    }

    return data;
};

// Função para exibir os dados na tela
const showWeatherData = async (city) => {
    const data = await getWeatherData(city);

    if (!data) return;

    cityName.innerText = data.name;
    tempElement.innerText = `${Math.round(data.main.temp)}°C`;
    descElement.innerText = data.weather[0].description;
    humidityElement.innerText = data.main.humidity;
    windElement.innerText = data.wind.speed;

    // Atualiza o ícone dinâmico
    const iconCode = data.weather[0].icon;
    weatherIconElement.setAttribute("src", `http://openweathermap.org{iconCode}@2x.png`);

    // Mostra o container com as informações
    weatherContainer.classList.remove("hidden");
};

// Evento de clique no botão
searchBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const city = cityInput.value;
    if (city) {
        showWeatherData(city);
    }
});

// Evento de apertar a tecla "Enter"
cityInput.addEventListener("keyup", (e) => {
    if (e.code === "Enter") {
        const city = e.target.value;
        showWeatherData(city);
    }
});
