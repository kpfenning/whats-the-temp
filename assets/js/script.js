var apiKey = "6266ba4a3f32a524499faffac708e3b9";

var searchHistory = $("#history-list");
var searchCity = $("#city-search");
var searchBtn = $("#searchBtn");
var clearHistory = $("#clear-history");

var currentCity = $("#current-city");
var currentTemp = $("#current-temp");
var currentHumidity = $("#current-humid");
var currentWind = $("#wind-speed");
var currentUV = $("#uv-index");

var weatherContent = $("#forecast");
var cities = [];

var currentDate = moment().format("L");
$("#current-date").text(currentDate);         
