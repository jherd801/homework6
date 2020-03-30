// HTML elements
let currentWeather = document.getElementsByClassName("current-weather");

// Parsed moment.js time and date values
const m = moment();
const date = m.format("dddd, MMMM Do YYYY");
const time = m.format("h:mm a");


// OpenWeatherMap API key = db5176658b0dab6a2aa19e11a0e01748
        // api.openweathermap.org/data/2.5/weather?q={city name}&appid={your api key}
        // api.openweathermap.org/data/2.5/weather?q={city name},{state}&appid={your api key}
        // api.openweathermap.org/data/2.5/weather?q={city name},{state},{country code}&appid={your api key}

$("#btn-citySearch").on("click", function(event) {
    event.preventDefault();
    let searchedCity = $("#city-input").val().trim();
    console.log(searchedCity);
    displayCityWeather();
})


// AJAX call for city being seached ***replace hard coded city name value with search field value
function displayCityWeather() {

    let searchedCity = "Paris";
    
    let queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + searchedCity + "&appid=db5176658b0dab6a2aa19e11a0e01748";
    console.log(queryURL);

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {

        //variables to capture API response properties
        let name = response.name;
        let tempKelvin = response.main.temp;
        let tempC = (tempKelvin - 273.15).toFixed(1);
        let tempF = (tempC * 1.8 + 32).toFixed(0);
        let humidity = response.main.humidity;
        let windSpeed = response.wind.speed;
        let latitude = response.coord.lat;
        let longitude = response.coord.lon;
        let weatherDescription = response.weather[0].description;
        let icon = response.weather[0].icon;
        let iconURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
       

        // div to hold and display current weather data for the searched city
        let currentWeatherDiv = $("<div class='current-weather'>");

        //compile and display current city name
        let pName = $("<header>").text(name + " (" + date +")");
        currentWeatherDiv.append(pName);

        //compile and display current temperature information
        let pTemp = $("<p>").text("Current Temperature: " + tempF + " F" + " (" + tempC + " C)");
        currentWeatherDiv.append(pTemp);

        //compile and display humidity information
        let pHumidity = $("<p>").text("Current Humidity: " + humidity + "%");
        currentWeatherDiv.append(pHumidity);

        //wind speed
        let pWindSpeed = $("<p>").text("Wind Speed: " + windSpeed + " MPH");
        currentWeatherDiv.append(pWindSpeed);

        // AJAX call to pass latitude and longitude from initial AJAX into second AJAX call to retrieve UV index
        $.ajax({
            url: "http://api.openweathermap.org/data/2.5/uvi?appid=db5176658b0dab6a2aa19e11a0e01748&lat=" + latitude + "&lon=" + longitude,
            method: "GET"
        }).then(function(response) {
            let uv = response.value


        //UV
        let pUV = $("<p>").text("UV Index: "+ uv + " (at 12:00 PM local time)");
        currentWeatherDiv.append(pUV);

        //Weather description
        let pDescription = $("<p>").text("Description: "+ weatherDescription);
        currentWeatherDiv.append(pDescription);

        //Weather icon
        let currentIcon = $("<img>").attr("src", iconURL)
        currentWeatherDiv.append(currentIcon);

        //placing all current weather variables into HTML
        $("#current-weather").prepend(currentWeatherDiv);
            console.log(uv + " (at 12:00 PM local time)");
        })
    })
};


displayCityWeather();


// console.log(m);
// console.log(date);
// console.log(time);

// Console logs for troubleshooting
// console.log(name);
// console.log(tempKelvin);
// console.log(humidity);
// console.log(windSpeed);
// console.log(latitude);
// console.log(longitude);
// console.log(weatherDescription);
// console.log(icon);
// console.log(sunrise);
// console.log(sunset);
// console.log(iconURL);
// console.log("Celsius: " + tempC);
// console.log("Fahrenheit: " + tempF);