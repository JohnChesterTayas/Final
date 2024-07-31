function getWeatherData(location) {
    const apiKey = "71c406fb561663a14fe06969d9d603c9";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}`;

    return fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Location not found');
            }
            return response.json();
        })
        .then(data => {
            return {
                temperature: data.main.temp,
                condition: data.weather[0].main,
                location: data.name,
                humidity: data.main.humidity,
                wind: data.wind.speed,
                icon: `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`,
                date: new Date(data.dt * 1000).toLocaleString()
            };
        });
}

function updateUI(weatherData) {
    document.querySelector("#temperature").textContent = `${weatherData.temperature}°C`;
    document.querySelector("#condition").textContent = weatherData.condition;
    document.querySelector("#location").textContent = weatherData.location;
    document.querySelector("#humidity").textContent = `Humidity: ${weatherData.humidity}%`;
    document.querySelector("#wind").textContent = `Wind: ${weatherData.wind} km/h`;
    document.querySelector("#weather-icon").src = weatherData.icon;
    document.querySelector("#date").textContent = weatherData.date;
}

function displayError(message) {
    document.querySelector("#temperature").textContent = "--°C";
    document.querySelector("#condition").textContent = message;
    document.querySelector("#location").textContent = "";
    document.querySelector("#humidity").textContent = "";
    document.querySelector("#wind").textContent = "";
    document.querySelector("#weather-icon").src = "default_icon.png";
    document.querySelector("#date").textContent = "";
}

const searchBtn = document.querySelector("#search-btn");
const searchBar = document.querySelector("#search-bar");

searchBtn.addEventListener("click", () => {
    const location = searchBar.value.trim();
    if (location) {
        getWeatherData(location)
            .then(weatherData => {
                updateUI(weatherData);
            })
            .catch(error => {
                console.error(error);
                displayError("Location not found");
            });
    } else {
        displayError("Please enter a location");
    }
});

// Optionally, you can implement an 'Enter' key event for the search bar
searchBar.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        searchBtn.click();
    }
});
