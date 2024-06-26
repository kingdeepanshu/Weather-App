// const getcity = () => {
//     const city = document.getElementById("search");
//     document.getElementById("city").innerHTML = city;
// }

const url = 'https://get-quotes-api.p.rapidapi.com/random';
const options = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': 'b6d8188466mshb0482507acaf996p15e27fjsn4dc140746277',
		'x-rapidapi-host': 'get-quotes-api.p.rapidapi.com'
	}
};

const search = document.querySelector("#search");
const searchbut = document.querySelector("#searchbut");

async function getWeather(city) {
    const weatherRes = await fetch("https://api.openweathermap.org/data/2.5/weather?units=metric&q="+ city + "&appid=" + "5abc15c8e09813fc0d5ddd2d9568c993");
    const weathers = await weatherRes.json();
    console.log(weathers);

    document.querySelector("#search").placeholder = weathers.name;
    document.querySelector("#city").innerHTML = weathers.weather[0].main;
    document.querySelector("#temp").innerHTML = weathers.main.temp +"°C";
    document.querySelector("#wind").innerHTML = weathers.wind.speed +" km/h";
    // document.querySelector("#rain").innerHTML = weather;

    document.querySelector("#clouds").innerHTML = weathers.clouds.all;
    document.querySelector("#humidity").innerHTML = weathers.main.humidity + "%";
    document.querySelector("#details").innerHTML = weathers.weather[0].description;
}

searchbut.addEventListener("click", () => {
    getWeather(search.value);
})

try {
	const response = await fetch(url, options);
	const result = await response.json();
    document.getElementById("quote").innerHTML = '"' + result.quote.quote + '"';
    document.getElementById("author").innerHTML = '~' + result.quote.author;

} catch (error) {
	console.error(error);
}