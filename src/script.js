
const city = document.querySelector("#search");
const searchbut = document.querySelector("#searchbut")

const date = new Date();

let day = date.getDate();
let month = date.getMonth() + 1;
let year = date.getFullYear();
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
document.querySelector("#date").innerHTML = `Today, ${day} ${months[month]} ${year}`;

async function getWeather(city) {
    const weatherRes = await fetch("https://api.openweathermap.org/data/2.5/weather?units=metric&q="+ city + "&appid=" + "5abc15c8e09813fc0d5ddd2d9568c993");
    const weathers = await weatherRes.json();
    console.log(weathers);
    const temp = Math.round(weathers.main.temp)
    document.querySelector("#city").innerHTML = weathers.name;
    document.querySelector("#temp").innerHTML = temp +"°C";
    document.querySelector("#temps").innerHTML = Math.round(weathers.main.temp) +"°C";
    document.querySelector("#wind").innerHTML = weathers.wind.speed +" km/h";
    document.querySelector("#humidity").innerHTML = weathers.main.humidity + "%";
    document.querySelector("#weather").innerHTML = weathers.weather[0].description;

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

searchbut.addEventListener("click", () => {
    getWeather(city.value);
})

