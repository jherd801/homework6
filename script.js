// HTML elements
let currentWeather = document.getElementsByClassName("current-weather");

// Parsed moment.js time and date values
const m = moment();
const date = m.format("dddd, MMMM Do YYYY");
const time = m.format("h:mm a");

// Array to hold history of cities entered into search field
let searchHistory = []


// OpenWeatherMap API key = db5176658b0dab6a2aa19e11a0e01748
        // api.openweathermap.org/data/2.5/weather?q={city name}&appid={your api key}
        // api.openweathermap.org/data/2.5/weather?q={city name},{state}&appid={your api key}
        // api.openweathermap.org/data/2.5/weather?q={city name},{state},{country code}&appid={your api key}

// Button click event listener to grab value from search field to then pass into later AJAX call
$("#btn-citySearch").on("click", function(event) {
    event.preventDefault();
    $("#current-weather").empty();
    let searchTerm = $("#city-input").val().trim();

    // Set last search term to local storage
    localStorage.setItem(this.parentNode.previousElementSibling.id, this.parentNode.previousElementSibling.value);

    // Execute search function with user entered search term
    displayCityWeather(searchTerm);
    forecastCityWeather(searchTerm);
});

// AJAX call to display current weather conditions for city being searched
function displayCityWeather(searchTerm) {

    let searchedCityURL = searchTerm;
    
    let queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + searchedCityURL + "&appid=db5176658b0dab6a2aa19e11a0e01748";
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
        let pName = $("<span class=nameDate>").text(name + " (" + date +")");
        currentWeatherDiv.append(pName);

        //Weather icon
        let currentIcon = $("<img>").attr("src", iconURL);
        currentWeatherDiv.append(currentIcon);

        //compile and display current temperature information
        let pTemp = $("<p>").text("Temperature: " + tempF + " F" + " (" + tempC + " C)");
        currentWeatherDiv.append(pTemp);

        //compile and display humidity information
        let pHumidity = $("<p>").text("Humidity: " + humidity + "%");
        currentWeatherDiv.append(pHumidity);

        //wind speed information
        let pWindSpeed = $("<p>").text("Wind Speed: " + windSpeed + " MPH");
        currentWeatherDiv.append(pWindSpeed);

        // AJAX call to pass latitude and longitude from initial AJAX into second AJAX call to retrieve UV index
        $.ajax({
            url: "http://api.openweathermap.org/data/2.5/uvi?appid=db5176658b0dab6a2aa19e11a0e01748&lat=" + latitude + "&lon=" + longitude,
            method: "GET"
        }).then(function(response) {
            let uv = response.value


        //UV information
        let pUV = $("<p>").text("UV Index: "+ uv);
        currentWeatherDiv.append(pUV);
        // < 3 = Low, < 6 = Moderate, < 8 = High, < 11 = Very High, >= 11 = Extreme

        //Weather description
        let pDescription = $("<p>").text("Description: "+ weatherDescription);
        currentWeatherDiv.append(pDescription);

        //placing all current weather variables into HTML
        $("#current-weather").prepend(currentWeatherDiv);
        })
    })
};

// Function to retrieve 5-day forecast
function forecastCityWeather(searchTerm) {

    let searchedCityURL = searchTerm;
    
    let queryURL = "http://api.openweathermap.org/data/2.5/forecast/daily?q=" + searchedCityURL + "&cnt=5&appid=82a2d42c83aa173aed55eec96429932c";
    console.log(queryURL);

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        for (i = 0; i < 5; i+8);
        console.log(i);
        console.log(response.list[4].dt_txt);
        console.log(response.list[4].dt_txt);
        console.log(response.list[12].dt_txt);
        console.log(response.list[12].dt_txt);
    })
};


// Function to loop through array of previous search terms and renders all array values onto page as separate buttons
function renderButtons() {
    $("#search-history").empty();

    for (var i = 0; i <searchHistory.length; i++) {

        var a = $("<button class=searchedCity>");

        a.attr("data-name", searchHistory[i]);

        a.text(searchHistory[i]);

        $("#search-history").prepend(a);
    }

}

//Click event to push search terms into array to build search history
$("#btn-citySearch").on("click", function(event) {
    event.preventDefault();
    let searchTerm = $("#city-input").val().trim();
    searchHistory.push(searchTerm);
    renderButtons();
})







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