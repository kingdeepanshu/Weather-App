const city = document.querySelector("#search");
const citym = document.querySelector("#searchm");

const searchbut = document.querySelector("#searchbut")
const searchbutm = document.querySelector("#searchbutm")

const date = new Date();

let day = date.getDate();
let month = date.getMonth() + 1;
let year = date.getFullYear();
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
document.querySelector("#date").innerHTML = `Today, ${day} ${months[month]} ${year}`;

function update(weathers){
    const temp = Math.round(weathers.main.temp)
    document.querySelector("#city").innerHTML = weathers.name;
    document.querySelector("#temp").innerHTML = temp +"°C";
    document.querySelector("#temps").innerHTML = Math.round(weathers.main.temp) +"°C";
    document.querySelector("#wind").innerHTML = weathers.wind.speed +" km/h";
    document.querySelector("#humidity").innerHTML = weathers.main.humidity + "%";
    document.querySelector("#weather").innerHTML = weathers.weather[0].description;

    document.querySelector("#clouds").innerHTML = weathers.clouds.all;
    document.querySelector("#maxmintemp").innerHTML = `${Math.round(weathers.main.temp_max)}°C/${Math.round(weathers.main.temp_min)}°C`;
    
    document.querySelector("#sunrise").innerHTML = convertTimestamp(weathers.sys.sunrise);
    document.querySelector("#sunset").innerHTML = convertTimestamp(weathers.sys.sunset);

    switch (weathers.weather[0].main) {
        case "Rain":
            document.querySelector("#img").src = "./src/rain.png";
            document.querySelector("#imgs").src = "./src/rain.png";
            break;
        case "Clouds":
            document.querySelector("#img").src = "./src/clouds.png";
            document.querySelector("#imgs").src = "./src/clouds.png";
            break;
        case "Clear":
            document.querySelector("#img").src = "./src/sun.png";
            document.querySelector("#imgs").src = "./src/sun.png";
            break;
        case "Thunderstorm":
            document.querySelector("#img").src = "./src/thunderstorm.png";
            document.querySelector("#imgs").src = "./src/thunderstorm.png";
            break;                            
        default:
            break;
    }
}

async function getWeather(city) {
    const weatherRes = await fetch("https://api.openweathermap.org/data/2.5/weather?units=metric&q="+ city + "&appid=" + "5abc15c8e09813fc0d5ddd2d9568c993");
    const weathers = await weatherRes.json();
    console.log(weathers);
    update(weathers);
}

async function inigetWeather(lat, lon) {
    const weatherRes = await fetch(`https://api.openweathermap.org/data/2.5/weather?&units=metric&lat=${lat}&lon=${lon}&appid=5abc15c8e09813fc0d5ddd2d9568c993`);
    const weathers = await weatherRes.json();
    console.log(weathers);
    update(weathers);
}

searchbut.addEventListener("click", () => {
    getWeather(city.value);
})
searchbutm.addEventListener("click", () => {
    getWeather(citym.value);
})

function convertTimestamp(timestamp) {
    const date = new Date(timestamp * 1000);
    let hour = date.getHours();
    const min = date.getMinutes();
    const t = hour >= 12? 'PM' : 'AM';
    hour = hour%12 == 0? 12 : hour%12;
    return `${hour}:${min} ${t}`;    
}

navigator.geolocation.getCurrentPosition((position) => {
    inigetWeather(position.coords.latitude, position.coords.longitude);
  });


