'use strict';
setValue('London');
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
  fetch(`https://api.weatherapi.com/v1/current.json?key=511f37ef6753431f902114219231310&q=${city}&aqi=no`)
    .then((data) => data.json())
    .then((object) => {
      input.value = '';
      cloudyValue.textContent = object.current.cloud + '%';
      humidityValue.textContent = object.current.humidity + '%';
      windValue.textContent = object.current.wind_kph + 'km/h';
      temperatureValue.innerHTML = Math.round(object.current.temp_c) + '&#176';
      currentCityName.textContent = object.location.name;
      currentTime.textContent = object.location.localtime;
      currentWeatherIcon.src = object.current.condition.icon;
      currentWeatherText.textContent = object.current.condition.text;

      let weatherCode = object.current.condition.code;
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
    })
    .catch((err) => {
      alert('Проверьте. верно ли указан город');
      return;
    });
}
