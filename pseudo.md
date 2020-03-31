// title bar "Weather Dashboard"

// search input field

// search input field returns result for requested city
    => return city name
    => date searched
    => icon represenation of weather conditions
    => temperature
    => humidity
    => wind speed
    => UV index

// when viewing UV index color indicates if conditions are favorable, moderate, severe
    ??? define cut points for when conditions go from favorable to moderate, etc.

// need to be able to view future conditions as a 5-day forecast
    => each days forecast must include an icon representation of weather conditions
    => temperature
    => humidity

// Search history to display previously search cities

// When selecting a previous city the results return for current conditions
    *** Activity 10 Working Movie App is good example of search field populating buttons then being selected to interact with API






## User Story

```
AS A traveler
I WANT to see the weather outlook for multiple cities
SO THAT I can plan a trip accordingly
```

## Acceptance Criteria

```
GIVEN a weather dashboard with form inputs
WHEN I search for a city
THEN I am presented with current and future conditions for that city and that city is added to the search history
WHEN I view current weather conditions for that city
THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
WHEN I view the UV index
THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe
WHEN I view future weather conditions for that city
THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, and the humidity
WHEN I click on a city in the search history
THEN I am again presented with current and future conditions for that city
WHEN I open the weather dashboard
THEN I am presented with the last searched city forecast