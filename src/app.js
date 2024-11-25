function handleSearchSubmit(event) {
  event.preventDefault();
  let cityToSearchFor = document.querySelector("#search-form-input");
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = cityToSearchFor.value;
  searchCity(cityToSearchFor.value);
}

function searchCity(city) {
  // make api call and update the interface
  let apiKey = "0de0bof3a7bt5b0870ae4284e12b3ada";
  let apiURL = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=imperial`;
  axios.get(apiURL).then(refreshWeatherData);
}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let day = date.getDay();

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  if (hours < 10) {
    hours = `0${hours}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let formattedDay = days[day];
  return `${formattedDay}, ${hours}:${minutes}`;
}

function refreshWeatherData(response) {
  //   console.log(response);
  //console.log(response.data);

  if (response.data.message === "City not found") {
    console.log(`${response.data.message}. Please enter a new city. `);
    let cityElement = document.querySelector("#city");
    cityElement.innerHTML = `${response.data.message}. Please enter a new city. `;
  } else {
    let country = response.data.country;
    //console.log(typeof country);

    let temperatureElement = document.querySelector("#temperature");
    let temperature = Math.round(response.data.temperature.current);

    let cityElement = document.querySelector("#city");
    let city = response.data.city;

    let humidityElement = document.querySelector("#humid");
    let humidity = `${response.data.temperature.humidity}%`;

    let windElement = document.querySelector("#wind");
    let wind = `${response.data.wind.speed}mph`;

    let weatherIconElement = document.querySelector("#weather-icon");
    let weatherIcon = response.data.condition.icon_url;

    let descriptionElement = document.querySelector("#description");
    let description = response.data.condition.description;

    let currentDateELement = document.querySelector("#current-date");
    let currentDate = new Date();

    cityElement.innerHTML = city;
    temperatureElement.innerHTML = temperature;
    humidityElement.innerHTML = humidity;
    windElement.innerHTML = wind;
    weatherIconElement.innerHTML = `<img src = "${weatherIcon}" alt="" class="weather-icon-img">`;
    descriptionElement.innerHTML = description;
    currentDateELement.innerHTML = formatDate(currentDate);

    getForecast(response.data.city);
  }
}

function changeTheme() {
  let body = document.querySelector("body");
  let button = document.querySelector("button");

  if (body.classList.contains("dark")) {
    body.classList.remove("dark");
    button.innerHTML = "Switch to Dark Theme";
  } else {
    body.classList.add("dark");
    button.innerHTML = "Switch To Light Theme";
  }
}

function displayForecast(response) {
  console.log(response.data.daily);

  /*use days for dummy code if the response fails */
  let days = Array(7).fill("day");

  let forecastHtml = "";
  if (response.data.daily) {
    response.data.daily.forEach(function (day, index) {
      if (index < 6) {
        forecastHtml =
          forecastHtml +
          `
              <li>
                <div class="forecast-day">${formatDay(day.time)}</div>
      
                <img src="${
                  day.condition.icon_url
                }" alt="" class="forecast-icon-img">
         
                <div class="forecast-temps">
                <div class="forecast-temp-high"><strong> ${Math.round(
                  day.temperature.maximum
                )}°</strong></div>
                  <div class="forecast-temp-low">${Math.round(
                    day.temperature.minimum
                  )}°</div>
                </div>
                </li>`;
      }
    });
  } else {
    days.forEach(function (day, index) {
      if (index < 6) {
        forecastHtml =
          forecastHtml +
          `
              <li>
                <div class="forecast-day">${day}</div>
      
                <img src="images/BackgroundMoonSquare_OnAlpha.png" alt="" class="forecast-icon-img">
         
                <div class="forecast-temps">
                <div class="forecast-temp-high"><strong> 100°</strong></div>
                  <div class="forecast-temp-low">0°</div>
                </div>
                </li>`;
      }
    });
  }

  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHtml;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[date.getDay()];
}

function getForecast(city) {
  let apiKey = "0de0bof3a7bt5b0870ae4284e12b3ada";
  let forecastAPI = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=imperial`;
  axios.get(forecastAPI).then(displayForecast);
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

let themeButton = document.querySelector(".theme-button");
themeButton.addEventListener("click", changeTheme);

searchCity("Brooklyn");
