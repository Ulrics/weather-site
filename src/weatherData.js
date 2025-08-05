export { getCurrentWeatherObject ,getCurrentTempScale, getWeather, switchScaleSystem, getTimeStamp, convertCelsius };

import {renderUI} from './index.js';
import { format } from "date-fns";

let currentTempScale = "Fahrenheit";
let currentWeatherObject;

class WeatherData {
    constructor(location, currentMaxTemp, currentMinTemp, currentTemp, currentIcon, currentDescrip) {
        this.location = location;
        this.currentMaxTemp = currentMaxTemp;
        this.currentMinTemp = currentMinTemp;
        this.currentTemp = currentTemp;
        this.currentIcon = currentIcon;
        this.currentDescrip = currentDescrip;
    }
}

async function getWeather(searchValue){
    clearErrorMessage(); 
    
    try{
        const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${searchValue}?key=8F6YCX5MBXJUR2VB5VHLBQ8EV`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        const location = data.resolvedAddress;
        const currentMaxTemp = data.days[0].tempmax;
        const currentMinTemp = data.days[0].tempmin;
        const currentTemp = data.currentConditions.temp;
        const currentIcon = data.currentConditions.icon;
        const currentDescrip = data.currentConditions.conditions;

        currentWeatherObject = new WeatherData(location, currentMaxTemp, currentMinTemp, currentTemp, currentIcon, currentDescrip);
        renderUI(currentWeatherObject);
    }
    catch(error){
        console.error("Weather fetch error:", error);
        handleError();
        return null;
    }
}

function getCurrentWeatherObject(){
    return currentWeatherObject;
}

function getCurrentTempScale(){
    return currentTempScale;
}

function switchScaleSystem(){
    if (currentTempScale === "Fahrenheit"){
        currentTempScale = "Celsius";
    }
    else{
        currentTempScale = "Fahrenheit";
    }
}

function getTimeStamp(){
    return format(new Date(), 'p PP')
}

function convertCelsius(tempInt){
    return (tempInt - 32)/1.8;
}

const errorMessage = document.getElementById("error");

function handleError(){
    errorMessage.textContent = "Error: Couldn't find the location. Try again with more information";
}

function clearErrorMessage(){
    errorMessage.innerHTML = "";
}