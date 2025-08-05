import './stylesheet.css';
import { getCurrentWeatherObject ,getCurrentTempScale, getWeather, switchScaleSystem, getTimeStamp, convertCelsius } from './weatherData';

import clearNight from './assets/clearnight-bg.jpg';
import darkCloud from './assets/darkcloud-bg.jpg';
import clearDay from './assets/sunny-bg.jpg';
import lightCloud from './assets/lightcloud-bg.jpg';

// Automatically import all SVGs in the assets folder
const requireSvgs = require.context('./assets', false, /\.svg$/);

const icons = {};
requireSvgs.keys().forEach((fileName) => {
  const key = fileName.replace('./', '').replace('.svg', '');
  icons[key] = requireSvgs(fileName);
});

const searchBar = document.getElementById("searchBar");
const mainContainer = document.querySelector(".main-container");

const tempSwitch = document.querySelector(".temp-switch");
const farenheitToggle = document.getElementById("farenheit");
const celsiusToggle = document.getElementById("celsius");

const locationHeader = document.getElementById("locationTitle");
const timeStamp = document.getElementById("timestamp");
const currentDescription = document.getElementById("currentTempDescrip");
const currentIcon = document.getElementById("currentTempIcon");
const currentTemp = document.getElementById("currentTemp");
const currentMaxTemp = document.getElementById("highTemp");
const currentLowTemp = document.getElementById("lowTemp");

tempSwitch.addEventListener("click", renderTempSwitch);

function renderUI(weatherObject){
    console.log(weatherObject);
    mainContainer.style.backgroundImage = backgroundMap[weatherObject.currentIcon];
    renderContainerColor(weatherObject.currentIcon);
    locationHeader.textContent = weatherObject.location;
    timeStamp.textContent = `As of ${getTimeStamp()}`;
    currentDescription.textContent = weatherObject.currentDescrip;
    currentIcon.src = icons[weatherObject.currentIcon];

    if(getCurrentTempScale() === "Fahrenheit"){
        currentTemp.textContent = `${weatherObject.currentTemp}°`;
        currentMaxTemp.textContent = `H: ${weatherObject.currentMaxTemp}°`;
        currentLowTemp.textContent = `L: ${weatherObject.currentMinTemp}°`;
    }
    else{
        const celsiusCurrent = convertCelsius(weatherObject.currentTemp).toFixed(1);
        const celsiusMax = convertCelsius(weatherObject.currentMaxTemp).toFixed(1);
        const celsiusLow = convertCelsius(weatherObject.currentMinTemp).toFixed(1);

        currentTemp.textContent = `${celsiusCurrent}°`;
        currentMaxTemp.textContent = `H: ${celsiusMax}°`;
        currentLowTemp.textContent = `L: ${celsiusLow}°`;
    }
}

function renderTempSwitch(){
    switchScaleSystem();
    console.log(getCurrentTempScale());
    if(getCurrentTempScale() === "Fahrenheit"){
        farenheitToggle.removeAttribute('class');
        farenheitToggle.classList.add("switch-selected");

        celsiusToggle.removeAttribute('class');
        celsiusToggle.classList.add("switch-unselected")
    }
    else{
        farenheitToggle.removeAttribute('class');
        farenheitToggle.classList.add("switch-unselected");

        celsiusToggle.removeAttribute('class');
        celsiusToggle.classList.add("switch-selected")
    }
    renderUI(getCurrentWeatherObject());
}

function renderContainerColor(weatherIcon){
    const containerBgColor = backgroundColorMap[weatherIcon];
    document.documentElement.style.setProperty('--container-bg', containerBgColor);
}

const backgroundMap = {
  "snow": `url(${lightCloud})`,
  "rain": `url(${darkCloud})`,
  "fog": `url(${lightCloud})`,
  "wind": `url(${lightCloud})`,
  "cloudy": `url(${lightCloud})`,
  "partly-cloudy-day": `url(${clearDay})`,
  "partly-cloudy-night": `url(${clearNight})`,
  "clear-day": `url(${clearDay})`,
  "clear-night": `url(${clearNight})`,
};



const backgroundColorMap = {
  "snow": 'rgb(79, 79, 79, 0.45)',
  "rain": 'rgb(79, 79, 79, 0.45)',
  "fog": 'rgb(79, 79, 79, 0.45)',
  "wind": 'rgb(79, 79, 79, 0.45)',
  "cloudy": 'rgb(79, 79, 79, 0.45)',
  "partly-cloudy-day": 'rgb(19, 92, 175, 0.75)',
  "partly-cloudy-night": 'rgb(19, 92, 175, 0.75)',
  "clear-day": 'rgb(19, 92, 175, 0.75)',
  "clear-night": 'rgb(19, 92, 175, 0.75)',
};


getWeather("Shelby, Montana").then(() =>{
    renderUI(getCurrentWeatherObject());
});