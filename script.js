const API_KEY = "ccb8d8d93f272716e2b4c2628ed6799d"; //change with own API key from open weather :)

const LAT = 45.7489;
const LON = 21.2087; //change geo positions etc etc

const weatherUrl =
`https://api.openweathermap.org/data/2.5/weather`+
`?lat=${LAT}` +
`&lon=${LON}` +
`&appid=${API_KEY}` +
`&units=metric` +
`&lang=en`;

function updateClock() {
    const now = new Date();
    document.getElementById("clock").textContent =
    now.toLocaleTimeString("en-GB",{
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit"
    });

    document.getElementById("date").textContent =
    now.toLocaleDateString("en-GB",{
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric"

    });

}



async function updateWeather(){
    const status=
    document.getElementById("status");

    try {
        status.textContent =
        "Updating..";

        const response =
        await fetch(weatherUrl);

        if(!response.ok){
            throw new Error(
               `API error: ${response.status}` 
            );
        }


        const data =
        await response.json();




        console.log(
            "City:",
            data.name
        );

        console.log(
           "Coordinates:",
           data.coord
        );

        console.log(
            "Temperature:",
            data.main.temp
        );


        document.getElementById("city")
        .textContent = "Timisoara"; // change this


        document.getElementById("temp")
        .textContent =
        Math.round(data.main.temp);


        document.getElementById("feels")
        .textContent =
        Math.round(data.main.feels_like);


        document.getElementById("description")
        .textContent =
        data.weather[0].description;

        document.getElementById("humidity")
        .textContent =
        `${data.main.humidity}%`;

        document.getElementById("wind")
        .textContent =
        `${data.wind.speed}m/s`;

        document.getElementById("pressure")
        .textContent =
        `${data.main.pressure} hPa`;


        const weatherType =
        data.weather[0].main;

        const icons = {
            Clear:
            "clear.png",
            Clouds:
            "clouds.png",
            Rain:
            "rain.png",
            Snow:
            "snow.png",
            Thunderstorm:
            "thunderstorm.png"

        };


        const iconFile =
        icons[weatherType]
    ||"clouds.png";


    document.getElementById("icon")
    .innerHTML =
    `<img
    src="icons/${iconFile}"
    alt="${weatherType}"
    
    >`;



    status.textContent =
    `Updated at ${
        new Date().toLocaleTimeString("en-GB")
    }`;
    }

    catch (error){
        console.error(error);
        status.textContent =
        "Unable to load..??";
    }
}



updateClock();

updateWeather();


setInterval(
updateClock,
1000
);
setInterval(
    updateWeather,
    10 * 60*  1000
);