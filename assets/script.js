// Store variables
let getCity = document.getElementById("city-search")
let previousSearches = document.getElementById("previous-searches")
let searchBtn = document.getElementById("search-btn")

    // "Today" forecast hooks
    let todayWeather = document.getElementById("today-weather")
    let todayCity = document.getElementById("today-city")
    let todayDate = document.getElementById("today-date")
    let todayTemp = document.getElementById("today-temp")
    let todayWind = document.getElementById("today-wind")
    let todayHumidity = document.getElementById("today-humidity")
    let todayUV = document.getElementById("today-uv")

    // Weekly forecast hooks
    let weeklyForecast = document.getElementsByClassName("weekly-forecast")
    let forecastAttr = document.querySelectorAll("[data-forecast]")


// Fetch data from API
function searchCity() {
    let lat = null;
    let long = null;
    fetch("http://api.openweathermap.org/geo/1.0/direct?q=denver&limit=1&appid=8e5e96e8cc07870eacb4b25b2b4d4ab6").then(data => {
        return data.json()
    }).then(data => {console.log(data[0].lat)})
    }

// Init function(s)

// Search city pulled from input
// function searchCity() {
//     console.log("Success!")
//     console.log(getCity.value.trim(""))
// }

// Store/retrieve persistent data

// Add click/submit events to search bar
searchBtn.addEventListener("click", searchCity)