'use strict';
const backImage = document.querySelector('.weather-wrapper');
const input = document.querySelector('.side-info__input');
const searchButton = document.querySelector('.side-info__btn');
const defaultListCities = document.querySelectorAll('.side-info__list-item');
const cloudyValue = document.querySelector('#cloudy');
const humidityValue = document.querySelector('#humidity');
const windValue = document.querySelector('#wind');
const temperatureValue = document.querySelector('.main-info__temp');
const currentCityName = document.querySelector('.main-info__city-name');
const currentTime = document.querySelector('.main-info__sub');
const currentWeatherIcon = document.querySelector('.main-info__img');
const currentWeatherText = document.querySelector('.main-info__cloudy');
const key = '511f37ef6753431f902114219231310';
const apiBaseUrl = 'https://api.weatherapi.com/v1';

setValue('London');

input.addEventListener('keydown', (e) => {
  if (e.keyCode === 13) {
    let inputValue = input.value;
    setValue(inputValue);
  }
});
searchButton.addEventListener('click', () => {
  let inputValue = input.value;
  setValue(inputValue);
});
defaultListCities.forEach((city) =>
  city.addEventListener('click', (e) => {
    let currentCity = e.target.textContent;
    setValue(currentCity);
  })
);

function setValue(city) {
  return fetch(`${apiBaseUrl}/current.json?key=${key}&q=${city}&aqi=no`)
    .then((data) => data.json())
    .then((response) => {
      input.value = '';
      cloudyValue.textContent = response.current.cloud + '%';
      humidityValue.textContent = response.current.humidity + '%';
      windValue.textContent = response.current.wind_kph + 'km/h';
      temperatureValue.innerHTML = Math.round(response.current.temp_c) + '&#176';
      currentCityName.textContent = response.location.name;
      currentTime.textContent = response.location.localtime;
      currentWeatherIcon.src = response.current.condition.icon;
      currentWeatherText.textContent = response.current.condition.text;

      function changeBackgorundImage() {
        const weatherCode = response.current.condition.code;
        if (weatherCode === 1000) {
          backImage.style.backgroundImage = "url('./assets/images/sunny.jpg')";
        } else if ((weatherCode >= 1180 && weatherCode <= 1201) || (weatherCode >= 1240 && weatherCode <= 1252) || (weatherCode >= 1273 && weatherCode <= 1276)) {
          backImage.style.backgroundImage = "url('./assets/images/rain.jpg')";
        } else if (weatherCode === 1003) {
          backImage.style.backgroundImage = "url('./assets/images/cloudy-med.jpg')";
        } else if (weatherCode >= 1006 && weatherCode <= 1171) {
          backImage.style.backgroundImage = "url('./assets/images/cloudy.jpg')";
        } else {
          backImage.style.backgroundImage = "url('./assets/images/snow.jpg')";
        }
      }
      changeBackgorundImage();
    })
    .catch((err) => {
      alert('Проверьте. верно ли указан город');
    });
}
