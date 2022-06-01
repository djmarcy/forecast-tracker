// Store variables
let getCity = document.getElementById("city-search");
let previousSearches = document.getElementById("previous-searches");
let searchBtn = document.getElementById("search-btn");

// "Today" forecast hooks
let todayWeather = document.getElementById("today-weather");
let todayCity = document.getElementById("today-city");
let todayDate = document.getElementById("today-date");
let todayIcon = document.getElementById("today-icon")
let todayTemp = document.getElementById("today-temp");
let todayWind = document.getElementById("today-wind");
let todayHumidity = document.getElementById("today-humidity");
let todayUV = document.getElementById("today-uv");

// Weekly forecast hooks
let weeklyForecast = document.getElementsByClassName("weekly-forecast");
let forecastAttr = document.querySelectorAll(".weekly-forecast")



// Fetch data from API
function searchCity() {

  let city = getCity.value || this.textContent
  // Set variables to null to enable sidebar buttons
  let lat = null;
  let lon = null;

  //Find latitude/longitude coordinates
  fetch(
    "https://api.openweathermap.org/geo/1.0/direct?q=" +
    city +
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

          todayCity.textContent = city;
          todayDate.textContent = moment().format("MMMM Do YYYY");
          todayIcon.className = "visible";
          todayIcon.setAttribute("src", "https://openweathermap.org/img/w/" + info.current.weather[0].icon + ".png");
          todayTemp.textContent = "Temperature: " + info.current.temp + " °F";
          todayWind.textContent = "Wind: " + info.current.wind_speed + " MPH";
          todayHumidity.textContent =
            "Humidity: " + info.current.humidity + "%";
          todayUV.textContent = "UVI: " + info.current.uvi;
          let currentUVI = info.current.uvi
          if (6 < currentUVI) {
            todayUV.setAttribute("class", "red")
          } else if (2 < currentUVI && currentUVI < 6) {
            todayUV.setAttribute("class", "yellow")
          } else {
            todayUV.setAttribute("class", "green")
          }

          for (i = 0; i < 5; i++) {
            let forecastDate = document.getElementById("date" + i)
            let forecastIcon = document.getElementById("icon" + i)
            let forecastTemp = document.getElementById("temp" + i)
            let forecastWind = document.getElementById("wind" + i)
            let forecastHumidity = document.getElementById("humidity" + i)
            let forecastUVI = document.getElementById("uvi" + i)

            let unix = info.daily[i + 1].dt * 1000;
            let date = new Date(unix)
            let displayDate = date.toLocaleDateString();

            forecastDate.textContent = displayDate
            forecastIcon.setAttribute("src", "https://openweathermap.org/img/w/" + info.daily[i + 1].weather[0].icon + ".png");
            forecastTemp.textContent = "Temperature: " + info.daily[i + 1].temp.day + " °F";
            forecastWind.textContent = "Wind: " + info.daily[i + 1].wind_speed + " MPH";
            forecastHumidity.textContent =
              "Humidity: " + info.daily[i + 1].humidity + "%";
            forecastUVI.textContent = "UVI: " + info.daily[i + 1].uvi;
            let uvi = info.daily[i + 1].uvi
            if (6 < uvi) {
              forecastUVI.setAttribute("class", "red")
            } else if (2 < uvi && uvi < 6) {
              forecastUVI.setAttribute("class", "yellow")
            } else {
              forecastUVI.setAttribute("class", "green")
            }
          }

        });
    });

      if (getCity.value) {
        storeSearches(getCity);
        getCity.value = null;
    }
}

// Get searches on page load
let pageLoad = localStorage.getItem("Prev. Searches:")
if ("Prev. Searches:" in localStorage) {
getSearches(); 
}

// Store/retrieve persistent data
function storeSearches(getCity) {

  console.log(getCity.value)
  if (getCity == "") {
    return;
  }

  let searchPersistent = JSON.parse(localStorage.getItem("Prev. Searches:")) || []

  searchPersistent.unshift(getCity.value)

  localStorage.setItem("Prev. Searches:", JSON.stringify(searchPersistent))

  getSearches();
}

// Load searches on page load & on
function getSearches() {
    // Clear "Previous Searchs" div so content isn't repeated
    previousSearches.innerHTML = null;
    let getPrev = localStorage.getItem("Prev. Searches:")
    getPrev = JSON.parse(getPrev)

    for (l = 0; l < getPrev.length; l++) { 
      
      let searchParagraph = document.createElement("button")
      searchParagraph.setAttribute("class", "prev-searches btn btn-primary")
      searchParagraph.setAttribute("type", "button")
      searchParagraph.setAttribute("id", "search" + l)
      searchParagraph.textContent = getPrev[l]
      previousSearches.appendChild(searchParagraph)
      let buttonID = document.getElementById("search" + l)

      buttonID.addEventListener("click", searchCity)

    }
}

// Add click/submit events to search bar
searchBtn.addEventListener("click", searchCity);
