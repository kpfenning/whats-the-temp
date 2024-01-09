var apiKey = "6266ba4a3f32a524499faffac708e3b9";

var currentCity = document.querySelector('#city-name');
var searchBtn = document.querySelector('#search-btn');
var searchHistory = document.getElementById('search-history');
var currentForecast = document.querySelector('.current-forecast');
var forecastContainer = document.getElementById('weather');
var weeklyForecast = document.querySelector('.weekly-forecast');

var recentSearches = [];

function getCity() {
    var cityName = city.value;
    var cityRequest = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + apiKey;

    fetch(cityRequest)
    .then(function (response) {
        return response.json();
     })
     .then(function (data) {
        var pastSearches = document.createElement('button');
        pastSearches.textContent = cityName;
        pastStorageContainer(data[0]);
        searchHistory.appendChild(pastSearches);

        let lat = data[0].lat;
        let lon = data[0].lon;

        locateCity(lat, lon);
     });
    }

    function locateCity(lat, lon) {
        var latLonRequest =
        "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=hourly,minutely&appid=" + apiKey;
        fetch(latLonRequest)
        .then(function (response) {
            return response.json();
         })
         .then(function (data) {
            forecastContainer.innerHTML = "";

            let city = data.city.name;
            let todaysForecast = data.list[0];
            let todaysContainer = document.querySelector('.current-forecast');
            let date = dayjs(todaysForecast.dt_text).day(0, 'days').format('dddd, MMMM Do');

         })}



  
    
        
        

       
    
       
       
        
        
      
  


    



        
