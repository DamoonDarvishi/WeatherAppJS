// variables
let searchInp = document.querySelector('.weather__search');
let city = document.querySelector('.weather__city');
let day = document.querySelector('.weather__day');
let humidity = document.querySelector('.weather__indicator--humidity>.value');
let wind = document.querySelector('.weather__indicator--wind>.value');
let pressure = document.querySelector('.weather__indicator--pressure>.value');
let image = document.querySelector('.weather__image');
let temperature = document.querySelector('.weather__temperature>.value');
// let firecastBlock = document.querySelector('.weather__forecast');

// configure
let weatherAPIKey = '6d075ff22293bedd6395d2de89610d97';
let weatherBaseEndpoint = 'https://api.openweathermap.org/data/2.5/weather?units=metric&appid=' + weatherAPIKey;
// let forecastBaseEndpoint = 'https://api.openweathermap.org/data/2.5/forecast?units=metric&appid=' + weatherAPIKey;

let getWeatherByCityName = async (city) => {
    let endpoint = weatherBaseEndpoint + '&q=' + city;
    let response = await fetch(endpoint);
    let weather = await response.json();
    return weather;
}

// let getForecastByCityID = async (id) => {
//     let endpoint = forecastBaseEndpoint + '&id=' + id;
//     let result = await fetch(endpoint);
//     let forecast = await result.json();
//     let forecastList = forecast.list;
//     let daily = [];
//     console.log(forecast)

//     forecastList.forEach(day => {
//         let date = new Date(day.dt_txt.replace(' ', 'T'));
//         let hours = date.getHours();
//         if(hours == 12) {
//             daily.push(day)
//         }
//     })
//     console.log(daily)
// }

searchInp.addEventListener('keydown', async (e) => {
    if(e.keyCode === 13) {
        let weather = await getWeatherByCityName(searchInp.value)
        // let cityID = weather.id;
        updateCurrentWeather(weather);
        // getForecastByCityID(cityID)
    }
})

let updateCurrentWeather = (data) => {
    console.log(data)
    city.textContent = data.name + ', ' + data.sys.country;
    day.textContent = dayOfWeek();
    humidity.textContent = data.main.humidity;
    pressure.textContent = data.main.pressure;
    let windDirection;
    let deg = data.wind.deg;
    if(deg > 45 && deg <= 135) {
        windDirection = 'East';
    } else if (deg > 135 && deg <= 225) {
        windDirection = 'South';
    } else if(deg > 225 && deg <= 315) {
        windDirection = 'West';
    } else {
        windDirection = 'North';
    }
    wind.textContent = windDirection + ', ' + data.wind.speed;
    temperature.textContent = data.main.temp > 0 ?
                                "+" + (data.main.temp) : (data.main.temp)
}


// forecast
// let updateForecast = (forecast) => {
//     forecastBlock.innerHTML = '';
//     forecast.forEach(day => {
//         let iconUrl = 'https://openweathermap.org/img/wn/' + day.weather[0].icon + '2x.png';
//     })
// }


let dayOfWeek = () => {
    return new Date().toLocaleDateString('en-EN', {'weekday': 'long'})
}