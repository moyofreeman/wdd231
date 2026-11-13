const currentTemp = document.querySelector('#current-temp');
const weatherIcon = document.querySelector('#graphic');
const captionDesc = document.querySelector('figcaption');
const myTown = document.querySelector('#town'); 

const myKey = "48aeb1afb06df7b631d09a1a1edf8a48"; 
const myLat = "-21.559";
const myLong = "28.992";
 
const myURL = `https://api.openweathermap.org/data/2.5/weather?lat=${myLat}&lon=${myLong}&appid=${myKey}&units=metric`;

async function apiFetch() {
    try {
        const response = await fetch(myURL);
        if (response.ok) {
            const data = await response.json();
            console.log(data);
            displayResults(data);
        } else {
            const errorText = await response.text();
            throw new Error(errorText);
        }
    } catch (error) {
        console.log(error);
    }
}

function displayResults(data) {
  
    if (myTown) myTown.textContent = data.name;
    if (currentTemp) currentTemp.innerHTML = `${Math.round(data.main.temp)}&deg;C`;
    
    if (captionDesc) {
        captionDesc.textContent = data.weather[0].description;
    }
    
    if (weatherIcon) {
        const iconsrc = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
        weatherIcon.setAttribute('src', iconsrc);
        weatherIcon.setAttribute('alt', data.weather[0].description);
    }
}

apiFetch();