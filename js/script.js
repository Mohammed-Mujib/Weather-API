const day1 = document.querySelector("#day1");
const day2 = document.querySelector("#day2");
const day3 = document.querySelector("#day3");
const day1Header = document.querySelector("#day1Header");
const day2Header = document.querySelector("#day2Header");
const day3Header = document.querySelector("#day3Header");
const day1Body = document.querySelector("#day1Body");
const day2Body = document.querySelector("#day2Body");
const day3Body = document.querySelector("#day3Body");
const day1footer = document.querySelector("#day1Footer")
const day2footer = document.querySelector("#day2Footer")
const day3footer = document.querySelector("#day3Footer")

const seacrchBtn = document.querySelector("#seacrchBtn");
const cityName =document.querySelector("#searchInput");
const apiKey = "db2cba5de1ba47bba38103419242108";

async function currentWeather() {
    let response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${cityName.value}&days=3`);
    let data = await response.json();
    let mydate = todaydate(data.current.last_updated_epoch);
    console.log(data);
    day1Header.innerHTML = `
                            <p class="day-text">${mydate[0]}</p>
                            <p class="day-date">${mydate[1]} ${mydate[2]}</p>
    `;
    day1Body.innerHTML = `
                            <h3 class="city pt-2">${data.location.name}</h3>
                            <div class="row g-2  py-3">
                                <div class="col-6">
                                    <div class=" d-flex align-content-center ps-1">
                                        <h2 class="main-temp">${Math.round(data.current.temp_c)}<span class="c-unit">°C<span></h2>
                                    </div>
                                </div>
                                <div class="col-6">
                                    <div class="main-weather-img">
                                        <img src="${data.current.condition.icon}" alt="">
                                    </div>
                                </div>
                                <div class="col-12">
                                    <h4>${data.current.condition.text}</h4>
                                </div>
                            </div>
    `;
    day1footer.innerHTML = `
                            <div class="weather-footer-info border-end">
                                <div class="img-box">
                                    <img src="images/cloud_heavy_rain_weather_icon.svg" alt="" style="width: 30px;">
                                </div>
                                <p class="rain">${data.current.humidity}%</p>
                            </div>
                            <div class="weather-footer-info border-end px-1">
                                <div class="img-box">
                                    <img src="images/wind_windy_weather_icon.svg" alt="" style="width: 30px;">
                                </div>
                                <p class="wind-speed">${data.current.wind_kph} km/h</p>
                            </div>
                            <div class="weather-footer-info">
                                <div class="img-box">
                                    <img src="images/boussole_compass_navigation_orientation_icon.svg" alt="" style="width: 30px;">
                                </div>
                                <p id="wind-diraction">${wind0point(data.current.wind_degree)}</p>
                            </div>
    `;
    //day tow weahter 
    tomorrowWeather(data);
    //day three weahter 
    afterTomorrowWeater(data);
}

function tomorrowWeather(data) {
    let tomorrowData = data.forecast.forecastday[1];
    let day2Date = todaydate(tomorrowData.date_epoch);
    day2Header.innerHTML = `
                            <p class="day-text">${day2Date[0]}</p>
                            <p class="day-date">${day2Date[1]} ${day2Date[2]}</p>
    `;
    day2Body.innerHTML = `
                            <h3 class="city pt-2">${data.location.name}</h3>
                            <div class="row g-2  py-3">
                                <div class="col-6">
                                    <div class=" d-flex align-content-center ps-1">
                                        <h2 class="max-temp">${Math.round(tomorrowData.day.maxtemp_c)}<span class="c-unit">°C<span></h2>
                                    </div>
                                    <div class=" d-flex align-content-center ps-1">
                                        <h2 class="min-temp">${Math.round(tomorrowData.day.mintemp_c)}<span class="c-unit">°C<span></h2>
                                    </div>
                                </div>
                                <div class="col-6">
                                    <div class="main-weather-img">
                                        <img src="${tomorrowData.day.condition.icon}" alt="">
                                    </div>
                                </div>
                                <div class="col-12">
                                    <h4>${tomorrowData.day.condition.text}</h4>
                                </div>
                            </div>
    `;
    day2footer.innerHTML = `
                            <div class="weather-footer-info">
                                <div class="img-box">
                                    <img src="images/cloud_heavy_rain_weather_icon.svg" alt="" style="width: 30px;">
                                </div>
                                <p class="rain">${tomorrowData.day.avghumidity}%</p>
                            </div>
                            <div class="weather-footer-info px-1">
                                <div class="img-box">
                                    <img src="images/wind_windy_weather_icon.svg" alt="" style="width: 30px;">
                                </div>
                                <p class="wind-speed">${tomorrowData.day.avgvis_km} km/h</p>
                            </div>
                            
    `;
}

function afterTomorrowWeater(data) {
    let AfterTomorrowData = data.forecast.forecastday[2];
    let day3Date = todaydate(AfterTomorrowData.date_epoch);
    day3Header.innerHTML = `
                            <p class="day-text">${day3Date[0]}</p>
                            <p class="day-date">${day3Date[1]} ${day3Date[2]}</p>
    `;
    day3Body.innerHTML = `
                            <h3 class="city pt-2">${data.location.name}</h3>
                            <div class="row g-2  py-3">
                                <div class="col-6">
                                    <div class=" d-flex align-content-center ps-1">
                                        <h2 class="max-temp">${Math.round(AfterTomorrowData.day.maxtemp_c)}<span class="c-unit">°C<span></h2>
                                    </div>
                                    <div class=" d-flex align-content-center ps-1">
                                        <h2 class="min-temp">${Math.round(AfterTomorrowData.day.mintemp_c)}<span class="c-unit">°C<span></h2>
                                        
                                    </div>
                                </div>
                                <div class="col-6">
                                    <div class="main-weather-img">
                                        <img src="${AfterTomorrowData.day.condition.icon}" alt="">
                                    </div>
                                </div>
                                <div class="col-12">
                                    <h4>${AfterTomorrowData.day.condition.text}</h4>
                                </div>
                            </div>
    `;
    day3footer.innerHTML = `
                            <div class="weather-footer-info ">
                                <div class="img-box">
                                    <img src="images/cloud_heavy_rain_weather_icon.svg" alt="" style="width: 30px;">
                                </div>
                                <p class="rain">${AfterTomorrowData.day.avghumidity}%</p>
                            </div>
                            <div class="weather-footer-info px-1">
                                <div class="img-box">
                                    <img src="images/wind_windy_weather_icon.svg" alt="" style="width: 30px;">
                                </div>
                                <p class="wind-speed">${AfterTomorrowData.day.avgvis_km} km/h</p>
                            </div>
    `;
}

seacrchBtn.addEventListener("click",()=>{
    currentWeather();
});

function wind0point(degrees) {
    if (degrees >= 0 && degrees < 22.5) {
        return "North wind";
    } else if (degrees >= 22.5 && degrees < 67.5) {
        return "North-East wind";
    } else if (degrees >= 67.5 && degrees < 112.5) {
        return "East wind";
    } else if (degrees >= 112.5 && degrees < 157.5) {
        return "South-East wind";
    } else if (degrees >= 157.5 && degrees < 202.5) {
        return "South wind";
    } else if (degrees >= 202.5 && degrees < 247.5) {
        return "South-West wind";
    } else if (degrees >= 247.5 && degrees < 292.5) {
        return "West wind";
    } else if (degrees >= 292.5 && degrees < 337.5) {
        return "North-West wind";
    } else {
        return "North wind";
    }
    
}

function todaydate(dt) {
    let mydate =  new Date(dt * 1000);
    let weekday = mydate.toLocaleString("default", { weekday: "long" });
    let monthday = mydate.getDate();
    let month = mydate.toLocaleString("default", { month: "long" });
    return [weekday,month,monthday];
}

function start(){
    cityName.value = "Cairo";
    currentWeather();
}



start();