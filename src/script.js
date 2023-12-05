

// Search for city
let city;
let form = document.querySelector("#search-form");
let cityName = document.querySelector("#city-name");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  let searchInput = document.querySelector("#city-input");
  city = searchInput.value.trim();
  if (city === "") {
  } else {
    cityName.textContent = city;
  }

  let apiKey = "3b3cc3aec5c8e39b60f74de72c054107";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  function showTemperature(response) {
    let locatedCityTemperature = Math.round(response.data.main.temp);
    let locatedCityTemperatureFahrenheit = Math.round(
      locatedCityTemperature * 1.8 + 32
    );
    let locatedCityName = response.data.name;
    let locatedCityHumidity = response.data.main.humidity;
    let locatedCityWind = response.data.wind.speed;
    let locatedCityWeatherDescription = response.data.weather[0].description;

    let currentDescription = document.querySelector(".weatherDescription");
    currentDescription.innerHTML = `${locatedCityWeatherDescription}`;

    let currentCelsius = document.querySelector(".celsius");
    currentCelsius.innerHTML = `${locatedCityTemperature}º C`;

    let currentFahrenheit = document.querySelector(".fahrenheit");
    currentFahrenheit.innerHTML = `${locatedCityTemperatureFahrenheit}º F`;

    let currentCity = document.querySelector("#city-name");
    currentCity.innerHTML = `${locatedCityName}`;

    let currentHumidity = document.querySelector("#current-humidity");
    currentHumidity.innerHTML = `Humidity: ${locatedCityHumidity}%`;

    let currentWind = document.querySelector("#current-wind");
    currentWind.innerHTML = `Wind: ${locatedCityWind} km/h`;

  }

  axios.get(`${apiUrl}`).then(showTemperature);
});


// Seach for current location

let currentLatitude;
let currentLongitude;
let currentLocationButton = document.querySelector(".currentLocationButton");

currentLocationButton.addEventListener("click", (event) => {
  event.preventDefault();

  function currentCoordinates(position) {
    currentLatitude = position.coords.latitude;
    currentLongitude = position.coords.longitude;

    let apiKey = "3b3cc3aec5c8e39b60f74de72c054107";
    let unit = "metric";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${currentLatitude}&lon=${currentLongitude}&appid=${apiKey}&units=${unit}`;

    function showTemperature(response) {
      let currentLocationTemperature = Math.round(response.data.main.temp);
      let currentLocationTemperatureFahrenheit = Math.round(
        currentLocationTemperature * 1.8 + 32
      );
      let currentLocationCity = response.data.name;
      let currentLocationHumidity = response.data.main.humidity;
      let currentLocationWind = response.data.wind.speed;
      let currentLocationWeatherDescription =
        response.data.weather[0].description;
      let date = new Date(response.data.timezone);

      console.log(response.data);

      let currentDescription = document.querySelector(".weatherDescription");
      currentDescription.innerHTML = `${currentLocationWeatherDescription}`;

      let currentCelsius = document.querySelector(".celsius");
      currentCelsius.innerHTML = `${currentLocationTemperature}º C`;

      let currentFahrenheit = document.querySelector(".fahrenheit");
      currentFahrenheit.innerHTML = `${currentLocationTemperatureFahrenheit}º F`;

      let currentCity = document.querySelector("#city-name");
      currentCity.innerHTML = `${currentLocationCity}`;

      let currentHumidity = document.querySelector("#current-humidity");
      currentHumidity.innerHTML = `Humidity: ${currentLocationHumidity}%`;

      let currentWind = document.querySelector("#current-wind");
      currentWind.innerHTML = `Wind: ${currentLocationWind} km/h`;
      
      let timeElement = document.querySelector("#time");
    
      timeElement.innerHTML = formatDate(date);
    
    }

    axios.get(`${apiUrl}`).then(showTemperature);
  }

  navigator.geolocation.getCurrentPosition(currentCoordinates);
});

function formatDate(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  let currentHour = currentDate.getHours();
  let currentMinute = currentDate.getMinutes();
  let correctMinute = (currentMinute < 10 ? "0" : "") + currentMinute;
  let date = `${currentDay}, ${currentHour}:${correctMinute} (local time)`;

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${day} ${hours}:${minutes}`;
  
}

// Loading page
window.addEventListener("load", () => {
  let currentLocationButton = document.querySelector(".currentLocationButton");
  currentLocationButton.click();
});
