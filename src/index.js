import './stylesheet.css';

let currentTempScale = "Fahrenheit";
let currentTempScaleSymbol = "F°"; 

async function getWeather(searchValue){
    const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${searchValue}?key=8F6YCX5MBXJUR2VB5VHLBQ8EV`);
    const data = await response.json();
    const location = data.resolvedAddress;
    const currentMaxTemp = data.days[0].tempmax;
    const currentMinTemp = data.days[0].tempmin;
    const currentTemp = data.days[0].temp;
    const currentIcon = data.days[0].icon;
}

class WeatherData {
    constructor(location, currentMaxTemp, currentMinTemp, currentTemp) {
        this.location = location;
        this.currentMaxTemp = currentMaxTemp;
        this.currentMinTemp = currentMinTemp;
        this.currentTemp = currentTemp;
    }
}

function switchScaleSystem(){
    if (currentTempScale === "Fahrenheit"){
        currentTempScale = "Celsius";
        currentTempScaleSymbol = "C°";
    }
    else{
        currentTempScale = "Fahrenheit";
        currentTempScaleSymbol = "F°"
    }
}

function convertCelsius(tempInt){
    return (tempInt - 32)/1.8;
}

function renderUI(){

}