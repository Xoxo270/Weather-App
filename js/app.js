"use strict";

//  Variables
let cityName = document.getElementById("cityName");
let cityTemp = document.getElementById("cityTemp");
let weatherLogo = document.getElementById("weatherLogo");
let weatherText = document.getElementById("weatherText");
let searchField = document.getElementById("searchField");
let searchBtn = document.getElementById("searchBtn");

// Weather for your navigator's location on load
window.addEventListener("load", () => {
  let geolocUrl = `https://api.weatherapi.com/v1/current.json?key=YOUR_API_KEY&q=Paris&aqi=no`;
  fetchWeather(geolocUrl);
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      let [lat, long] = [position.coords.latitude, position.coords.longitude];
      let geolocUrl = `https://api.weatherapi.com/v1/current.json?key=YOUR_API_KEY&q=${lat},${long}&aqi=no`;
      fetchWeather(geolocUrl);
    });
  }
});
// Listening to the button event to get the search field value
searchBtn.onclick = (event) => {
  event.preventdefault;
  let url = `https://api.weatherapi.com/v1/current.json?key=YOUR_API_KEY&q=${searchField.value}&aqi=no`;
  searchField.value = "";
  fetchWeather(url);
};
// Listening to keydown event for 'Enter' in the search field
searchField.onkeydown = (event) => {
  if (event.key === "Enter") {
    let url = `https://api.weatherapi.com/v1/current.json?key=YOUR_API_KEY&q=${searchField.value}&aqi=no`;
    searchField.value = "";
    fetchWeather(url);
  }
};

// Async function
const fetchWeather = async (url) => {
  try {
    await fetch(url)
      .then((response) => {
        console.log(response);
        return response.json();
      })
      // Render the data
      .then((data) => {
        clear();
        cityName.append(`${data.location.name}`);
        cityTemp.append(`${data.current.temp_c}°C / ${data.current.temp_f}°F`);
        weatherLogo.src = `${data.current.condition.icon}`;
        weatherText.append(`${data.current.condition.text}`);
      });
  } catch (error) {
    console.error(`Error message : ${error.message}`);
    cityName.append(
      `This city name does not exist , please search another one.`
    );
  }
};

// Simple clear function to empty all fields
const clear = () => {
  cityName.innerHTML = "";
  cityTemp.innerHTML = "";
  weatherLogo.innerHTML = "";
  weatherText.innerHTML = "";
  searchField.innerHTML = "";
};
