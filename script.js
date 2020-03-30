// HTML elements

// Parsed moment.js time and date values
const m = moment();
const date = m.format("dddd, MMMM Do YYYY");
const time = m.format("h:mm a");

console.log(m);
console.log(date);
console.log(time);

// OpenWeatherMap API key = db5176658b0dab6a2aa19e11a0e01748
// API call by city name
// api.openweathermap.org/data/2.5/weather?q={city name}&appid={your api key}
// api.openweathermap.org/data/2.5/weather?q={city name},{state}&appid={your api key}
// api.openweathermap.org/data/2.5/weather?q={city name},{state},{country code}&appid={your api key}

// AJAX call for city being seached ***replace hard coded city name value with search field value
function displayCityWeather() {
    var city
    var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + "Salt Lake City" + "&appid=db5176658b0dab6a2aa19e11a0e01748";
    console.log(queryURL);

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {

        var name = response.name;
        var temp = response.main.temp;
        var humidity = response.main.humidity;
        var windSpeed = response.wind.speed;
        var latitude = response.coord.lat;
        var longitude = response.coord.lon;
    
        // will need to pull latitude and longitude from API response to pass back into another AJAX to get UV index

        console.log(name);
        console.log(temp);
        console.log(humidity);
        console.log(windSpeed);
        console.log(latitude);
        console.log(longitude);
    })
};

displayCityWeather();


// => return city name
// => date searched
// => icon represenation of weather conditions
// => temperature
// => humidity
// => wind speed
// => UV index