var apiKey = "6266ba4a3f32a524499faffac708e3b9";


var currentWeather = function (city) {
    fetch(`https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={apiKey}`)
    .then(function (response) {
        return response.json();
     })
     .then(function (response) {
        var cityLon = response.city.coord.lon;
        var cityLat = response.city.coord.lat;

        
         
