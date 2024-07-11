//HTML Elements

const currentTemp = document.querySelector('#current-temp');
const weatherIcon = document.querySelector('#weather-icon');
const captionDesc = document.querySelector('figcaption');

const url = 'https://api.openweathermap.org/data/2.5/weather?lat=49.74937830736854&lon=6.638461413335715&appid=2838e61f6d31a85f3212a3c686b49e64&units=imperial';

async function apiFetch() {
    try {
        const response = await fetch(url)
        if (response.ok) {
            const data = await response.json();
            console.log(data);
            displayResults(data);
        }
        else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.error(error);
    }
}

apiFetch();

function displayResults({ main: { temp }, weather: [{ description, icon }] }) {
    currentTemp.innerHTML = `${temp}&deg;F`;
    captionDesc.textContent = `${description}`;
    weatherIcon.setAttribute('src', `https://openweathermap.org/img/wn/${icon}@2x.png`);
    weatherIcon.setAttribute('alt', description);

}
