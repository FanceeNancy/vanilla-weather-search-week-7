function handleSearchSubmit(event) {
  event.preventDefault();
  let cityToSearchFor = document.querySelector("#search-form-input");
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = cityToSearchFor.value;
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);
