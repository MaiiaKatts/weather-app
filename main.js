//const weatherBox = document.getElementById('weather-box');
const locationElement = document.getElementById('location');
const dateElement = document.getElementById('date');
const timeElement = document.getElementById('time');
const temperatureElement = document.getElementById('temperature');
const descriptionElement = document.getElementById('description');
const windElement = document.getElementById('wind');
const iconElement = document.getElementById('day-part-icon');
const forecastTable = document.getElementById('forecast-table');
const backgroundElement = document.getElementById('background');

function getWeatherDescription(weathercode) {
    switch (weathercode) {
      case 0:
        return 'Clear sky';
      case 1:
        return 'Mainly clear';
      case 2:
        return 'Partly cloudy';
      case 3:
        return 'Overcast';
      case 45:
        return 'Fog';
      case 48:
        return 'Depositing rime fog';
      case 51:
        return 'Light drizzle';
      case 53:
        return 'Moderate drizzle';
      case 55:
        return 'Dense intensity drizzle';
      case 56:
        return 'Light freezing drizzle';
      case 57:
        return 'Dense intensity drizzle';
      case 61:
        return 'Slight rain';
      case 63:
        return 'Moderate rain';
      case 65:
        return 'Heavy intensity rain';
      case 66:
        return 'Light freezing rain';
      case 67:
        return 'Freezing rain heavy intensity';
      case 71:
        return 'Slight snow fall';
      case 73:
        return 'Moderate snow fall';
      case 75:
        return 'Heavy intensity snow fall';
      case 77:
        return 'Snow grains';
      case 80:
        return 'Slight rain showers Slight';
      case 81:
        return 'Moderate rain showers';
      case 82:
        return 'Violent rain showers';
      case 85:
        return 'Slight snow showers';
      case 86:
        return 'Heavy snow showers';
      case 95:
        return 'Thunderstorm: slight and moderate';
      case 96:
        return 'Thunderstorm with slight hail';
      case 99:
        return 'Thunderstorm with heavy hail';
      default:
        return '-';
    }
  }

function getWindDirection(winddirection) {
    switch (true) {
      case (22.5 < winddirection && winddirection < 67.5):
        return 'North-East';
      case (67.5 < winddirection && winddirection < 112.5):
        return 'East';
      case (112.5 < winddirection && winddirection < 157.5):
        return 'South-East';
      case (157.5 < winddirection && winddirection < 202.5):
        return 'South';
      case (202.5 < winddirection && winddirection < 247.5):
        return 'South-West';
      case (247.5 < winddirection && winddirection < 292.5):
        return 'West';
      case (292.5 < winddirection && winddirection < 337.5):
        return 'North-West';
      case (winddirection < 22.5 || winddirection > 337.5):
        return 'North';
      default:
        return '-';
    }
}

function getTimeString() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
}
  
function getDateString() {
    const now = new Date();
    const day = now.getDate().toString().padStart(2, '0');
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const year = now.getFullYear();
    return `${day}.${month}.${year}`;
}

function getDayPart() {
    const currentTime = getTimeString(); // Using getTimeString() to get the current time in HH:mm:ss format
    const currentHour = parseInt(currentTime.split(':')[0]); // Extracting the current hour from the time string
  
    if (currentHour >= 6 && currentHour < 18) {
      iconElement.src = './images/isDay.png';
      backgroundElement.classList.remove('night-background');
      backgroundElement.classList.add('day-background');
    } else {
      iconElement.src = './images/isNight.png';
      backgroundElement.classList.remove('day-background');
      backgroundElement.classList.add('night-background');
    }
}

async function loadWeather() {
    try{
        const locationResponse = await fetch('https://get.geojs.io/v1/ip/geo.json');
        const locationData = await locationResponse.json();
        const { country, city, latitude, longitude } = locationData;
  
        const weatherResponse = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&timezone=Europe/Moscow`);
        const weatherData = await weatherResponse.json();
        const { current_weather } = weatherData;
        const { temperature, windspeed, winddirection, weathercode } = current_weather;
  
        getDayPart();
        locationElement.innerText = `${city}, ${country}`;
        dateElement.innerText = getDateString();
        timeElement.innerText = getTimeString();
        temperatureElement.innerText = `${Math.round(temperature)}°C`;
        windElement.innerText =`Wind speed: ${Math.round(windspeed)} m/s from ${getWindDirection(winddirection)}`;
        descriptionElement.innerText = getWeatherDescription(weathercode)

    } catch (error) {
        console.error('Error LOADING WEATHER DATA', error);
    }
}

loadWeather();
