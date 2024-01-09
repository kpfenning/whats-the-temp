var apiKey = "6266ba4a3f32a524499faffac708e3b9";

var currentCity = document.querySelector('#city-name');
var searchBtn = document.querySelector('#search-btn');
var searchHistory = document.getElementById('search-history');
var currentForecast = document.querySelector('.current-forecast');
var forecastContainer = document.getElementById('weather');
var weeklyForecast = document.querySelector('.weekly-forecast');

function getCity() {
    var cityName = currentCity.value;
    var cityRequest = `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${apiKey}`;

    fetch(cityRequest)
        .then(response => response.json())
        .then(data => {
            var pastSearches = document.createElement('button');
            pastSearches.textContent = cityName;
            pastStorageContainer(data[0]);
            searchHistory.appendChild(pastSearches);

            let lat = data[0].lat;
            let lon = data[0].lon;

            locateCity(lat, lon);
        })
        .catch(error => console.error("Error fetching city data:", error));
}

function locateCity(lat, lon) {
    forecastContainer.innerHTML= "";
    weeklyForecast.innerHTML= "";

    var latLonRequest =
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`;

        fetch(latLonRequest)
        .then(response => response.json())
        .then(data => {
            console.log("Weather API response:", data);

            forecastContainer.innerHTML = "";

            let city = data.city ? data.city.name: '';
            let todaysForecast = data.list[0];

            if (todaysForecast && todaysForecast.weather && todaysForecast.weather[0] && todaysForecast.main && todaysForecast.wind) {
                let todaysContainer = document.querySelector('.current-forecast');
                let todaysWeather = document.createElement('div');
                todaysWeather.innerHTML =
                    `<h4>${city}</h4>` +
                    `<p> Temp: ${todaysForecast.main.temp} F </p>` +
                    `<p> Humidity: ${todaysForecast.main.humidity} % </p>` +
                    `<p>Wind: ${todaysForecast.wind.speed} mph </p>`;

                todaysContainer.innerHTML = todaysWeather.outerHTML;

                let weeklyForecastContainer = document.querySelector('.weekly-forecast');
                let uniqueDates = new Set();

                for (let i = 1; i < data.list.length; i++) {
                    let forecast = data.list[i];
                    let date = new Date(forecast.dt * 1000);
                    let formattedDate = `${date.toLocaleDateString('en-US', { weekday: 'long' })}, ${date.toLocaleDateString('en-US', { month: 'numeric', day: 'numeric', year: 'numeric' })}`;

    
                if (!uniqueDates.has(formattedDate)) {
                    let temp = forecast.main.temp;
                    let wind = forecast.wind.speed;
                    let humidity = forecast.main.humidity;

                    let forecastItem = document.createElement('div');
                    forecastItem.innerHTML =
                        `<h4>${formattedDate}</h4>` +
                        `<p> Temp: ${temp} F </p>` +
                        `<p> Humidity: ${humidity} % </p>` +
                        `<p>Wind: ${wind} mph </p>`;

                    weeklyForecastContainer.appendChild(forecastItem);

        
                    uniqueDates.add(formattedDate);
                    }
                }
            } else {
                console.error("Invalid current weather data", data);
            }
        })
        .catch(error => console.error("Error fetching weather data:", error));
}


function pastStorageContainer(recent) {
    var page = JSON.parse(localStorage.getItem('city-name')) || [];
    page.push(recent);
    localStorage.setItem('cityName', JSON.stringify(page));
}

function weatherContainer(lat, lon) {
    var weatherReport = JSON.parse(localStorage.getItem('weather')) || [];
    weatherReport.push({ lat: lat, lon: lon });
    localStorage.setItem('weather', JSON.stringify(weatherReport));
}

function cityHistory() {
    var listCity = JSON.parse(localStorage.getItem('city-name')) || [];
    for (let i = 0; i < listCity.length; i++) {
        var searches = document.createElement('button');
        searches.textContent = listCity[i].name;
        searchHistory.appendChild(searches);

        
        searches.addEventListener('click', function () {
            findCity(listCity[i].name);
        });
    }
}

function clearHistory(){
    localStorage.removeItem('city-name');
    searchHistory.innerHTML= '';
}
const clearHistoryBtn = document.getElementById('clear-history-btn');
clearHistoryBtn.addEventListener('click', clearHistory);

window.addEventListener('load', function () {
    cityHistory();
});

searchBtn.addEventListener('click', function (event) {
    event.preventDefault();
    getCity();
});



function findCity(cityName) {
    const cityRequest = `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&appid=${apiKey}`;
    fetch(cityRequest)
        .then(response => response.json())
        .then(data => {
            forecastContainer.innerHTML = '';
            let lat = data[0].lat;
            let lon = data[0].lon;
            locateCity(lat, lon);
        })
        .catch(error => console.error("Error fetching city data:", error));
}
