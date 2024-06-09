
const apiKey = "3fdc5e03de1e1a6ce911d843246093e5";// the Api stored in the variable in order to be used 

// we bring the elemnents into js to be manupilated 

const weatherDataEl = document.getElementById("weather-data");

const cityInputEl = document.getElementById("city-input");

const formEl = document.querySelector("form");

// we create a event submit to trigger a function that ll get data from api 

formEl.addEventListener("submit", (event) => {
    event.preventDefault(); //using prevent method to avoid refreshing the page when we submit the form.
    const cityValue = cityInputEl.value;// we re getting input value
    getWeatherData(cityValue); //we re calling function with that going to get cityValue(info from api)

});
async function getWeatherData(cityValue) {
    // try and catch method used to get info from api,try to give info or catch error if the info do not  exist

    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${apiKey}&units=metric`
        );// fetch the data while waiting for it to come by using await before moving to the next line
        if (!response.ok) {
            throw new Error("Network response was not ok")
        } // ok means bring back data info

        const data = await response.json()// we need to pass the info collected to json so it can be usable ;but we have to wait until the response is converted to json

        // We re getting the following from api :

        const temperature = Math.round(data.main.temp);

        const description = data.weather[0].description;

        const icon = data.weather[0].icon;
        // We re getting dynamic details relevant to different cities
        const details = [
            `Feels like: ${Math.round(data.main.feels_like)}`,
            `Humidity: ${data.main.humidity}%`,
            `Wind speed: ${data.wind.speed} m/s`,
        ];

        weatherDataEl.querySelector(".icon").innerHTML = `<img src="http://openweathermap.org/img/wn/${icon}.png" alt="Weather Icon">`;

        weatherDataEl.querySelector(".temperature").textContent = `${temperature}°C`;

        weatherDataEl.querySelector(".description").textContent = description;

        weatherDataEl.querySelector(".details").innerHTML = details.map((detail) => `<div>${detail}</div>`).join("");// using the map method to get each element

    } catch (error) {
        weatherDataEl.querySelector(".icon").innerHTML = "";
        weatherDataEl.querySelector(".temperature").textContent = "";
        weatherDataEl.querySelector(".description").textContent =
          "It's an error, please try again";
    
        weatherDataEl.querySelector(".details").innerHTML = "";

    }
}