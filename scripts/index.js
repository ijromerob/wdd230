

// hamburguer button
const hButton = document.querySelector('#menu');
const navigation = document.querySelector('.navigation');

hButton.addEventListener('click', () => {
    navigation.classList.toggle('open');
    hButton.classList.toggle('open');
})


// dark mode button

const darkModeButton = document.querySelector('#dm-button');

darkModeButton.addEventListener('click', () => {
    let source = darkModeButton.getAttribute('src');
    console.log(source);
    if (source == 'images/dark-mode-icon.svg') {
        document.documentElement.style.setProperty('--general-background', 'black');
        document.documentElement.style.setProperty('--header-and-footer-bg', '#01462c');
        document.documentElement.style.setProperty('--card-bg', 'black');
        document.documentElement.style.setProperty('--hover-txt-card', 'white');
        document.documentElement.style.setProperty('--text-over-color', 'white');
        document.documentElement.style.setProperty('--text-over-white', '#04ae6d');
        darkModeButton.setAttribute('src', 'images/light-mode-icon.svg');
    }
    else {
        document.documentElement.style.setProperty('--general-background', 'var(--primary-color)');
        document.documentElement.style.setProperty('--header-and-footer-bg', 'var(--accent1-color)');
        document.documentElement.style.setProperty('--card-bg', 'var(--accent2-color)');
        document.documentElement.style.setProperty('--hover-txt-card', 'var(--accent3-color)');
        document.documentElement.style.setProperty('--text-over-color', 'var(--accent2-color)');
        document.documentElement.style.setProperty('--text-over-white', 'var(--accent1-color)');
        darkModeButton.setAttribute('src', 'images/dark-mode-icon.svg');
    }
})

//visits to the page
const visits = document.querySelector('.visits')

let visitsNumber = getVisits() || 0;

if (visitsNumber == 0) {
    visitsNumber = 1;
    setVisits();
    displayVisit();
}
else {
    visitsNumber++;
    setVisits();
    displayVisit();
}

function setVisits() {
    localStorage.setItem('visits', JSON.stringify(visitsNumber));
}

function displayVisit() {
    visits.textContent = visitsNumber;
}

function getVisits() {
    return Number(localStorage.getItem('visits'));
}

// adding weather card

const currentWeather = document.querySelector('#current-weather');
const currentTemperature = document.querySelector('#temperature');
const weatherIcon = document.createElement('img');
const weatherContainer = document.querySelector('#weather-container');
// const weatherIcon = document.querySelector('#weather-icon');
const url = 'https://api.openweathermap.org/data/2.5/weather?lat=51.045763653662505&lon=-114.07200932666383&appid=2838e61f6d31a85f3212a3c686b49e64&units=imperial';

async function apiFetch() {
    try {
        const response = await fetch(url)
        if (response.ok) {
            const data = await response.json();
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
    currentWeather.innerHTML = `${description}`;
    weatherIcon.setAttribute('src', `https://openweathermap.org/img/w/${icon}.png`);
    weatherIcon.setAttribute('alt', description);
    weatherContainer.appendChild(weatherIcon);

    currentTemperature.innerHTML = `${temp}&deg;F`

}

