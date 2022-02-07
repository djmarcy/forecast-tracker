// Store variables
let getCity = document.getElementById("city-search");
let previousSearches = document.getElementById("previous-searches");
let searchBtn = document.getElementById("search-btn");

// "Today" forecast hooks
let todayWeather = document.getElementById("today-weather");
let todayCity = document.getElementById("today-city");
let todayDate = document.getElementById("today-date");
let todayTemp = document.getElementById("today-temp");
let todayWind = document.getElementById("today-wind");
let todayHumidity = document.getElementById("today-humidity");
let todayUV = document.getElementById("today-uv");

// Weekly forecast hooks
let weeklyForecast = document.getElementsByClassName("weekly-forecast");
let forecastAttr = document.querySelectorAll("[data-forecast]");

// Fetch data from API
function searchCity() {
  let lat = null;
  let lon = null;

  //Find latitude/longitude coordinates
  fetch(
    "http://api.openweathermap.org/geo/1.0/direct?q=" +
      getCity.value +
      "&limit=1&appid=8e5e96e8cc07870eacb4b25b2b4d4ab6"
  )
    .then((data) => {
      return data.json();
    })
    .then((data) => {
      lat = data[0].lat;
      lon = data[0].lon;

      fetch(
        "https://api.openweathermap.org/data/2.5/onecall?units=imperial&lat=" +
          lat +
          "&lon=" +
          lon +
          "&appid=8e5e96e8cc07870eacb4b25b2b4d4ab6"
      )
        .then((info) => {
          return info.json();
        })
        .then((info) => {
          console.log(info);

          todayCity.textContent = getCity.value;
          todayDate.textContent = moment().format("MMMM Do YYYY");
          todayTemp.textContent = "Temperature: " + info.current.temp + " °F";
          todayWind.textContent = "Wind: " + info.current.wind_speed + " MPH";
          todayHumidity.textContent =
            "Humidity: " + info.current.humidity + "%";
          todayUV.textContent = "UVI: " + info.current.uvi;
        });
    });
}

// Store/retrieve persistent data

// Add click/submit events to search bar
searchBtn.addEventListener("click", searchCity);
