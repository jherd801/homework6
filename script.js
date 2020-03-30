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
    let city
    let queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + "Salt Lake City" + "&appid=db5176658b0dab6a2aa19e11a0e01748";
    console.log(queryURL);

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {

        //variables to capture API response properties
        let name = response.name;
        let tempKelvin = response.main.temp;
        let tempC = (tempKelvin - 273.15);
        let tempF = tempC * 1.8 + 32;
        let humidity = response.main.humidity;
        let windSpeed = response.wind.speed;
        let latitude = response.coord.lat;
        let longitude = response.coord.lon;
        let weatherDescription = response.weather[0].description;
        let icon = response.weather[0].icon;
        let sunrise = response.sys.sunrise;
        let sunset = response.sys.sunset;
        let iconURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";

        // will need to pull latitude and longitude from API response to pass back into another AJAX to get UV index

        console.log(name);
        console.log(tempKelvin);
        console.log(humidity);
        console.log(windSpeed);
        console.log(latitude);
        console.log(longitude);
        console.log(weatherDescription);
        console.log(icon);
        console.log(sunrise);
        console.log(sunset);
        console.log(iconURL);
        console.log("Celsius: " + tempC.toFixed(0));
        console.log("Fahrenheit: " + tempF.toFixed(0));

        // AJAX call to pass latitude and longitude from initial AJAX into second AJAX call to retrieve UV index
        $.ajax({
            url: "http://api.openweathermap.org/data/2.5/uvi?appid=db5176658b0dab6a2aa19e11a0e01748&lat=" + latitude + "&lon=" + longitude,
            method: "GET"
        }).then(function(response) {
            let uv = response.value

            console.log(uv + " (at 12:00 PM local time)");
        })
    })
};

displayCityWeather();