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
  axios.get(apiURL).then(refreashWeatherData);
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

function refreashWeatherData(response) {
  //   console.log(response);
  console.log(response.data);

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
    weatherIconElement.innerHTML = `<img src = "${weatherIcon}" alt="">`;
    descriptionElement.innerHTML = description;
    currentDateELement.innerHTML = formatDate(currentDate);
  }
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

//searchCity("Brooklyn");
