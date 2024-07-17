
//get date for the website
document.getElementById('year').textContent = new Date().getFullYear();

document.getElementById('lastmodified').textContent = `Last modified: ${document.lastModified}`;


//hamburguer button

const hbutton = document.querySelector('#menu');
const navigation = document.querySelector('.navigation');

hbutton.addEventListener('click', () => {
    navigation.classList.toggle('open');
    hbutton.classList.toggle('open');
});



function getDate() {
    return Number(JSON.parse(localStorage.getItem('visit-date')));
}

function setDate(item) {
    localStorage.setItem('visit-date', JSON.stringify(item));
}

// Weather 

const weatherCard = document.querySelector('#weather-container');
const weatherAPIURL = "https://api.openweathermap.org/data/2.5/weather?lat=51.045763653662505&lon=-114.07200932666383&appid=2838e61f6d31a85f3212a3c686b49e64&units=metric";
const forecastAPIURL = "https://api.openweathermap.org/data/2.5/forecast?q=calgary&appid=2838e61f6d31a85f3212a3c686b49e64&units=metric&cnt=24";
const membersURL = "https://ijromerob.github.io/wdd230/chamber/data/members.json";
const forecastCard = document.querySelector('#forecast-container');

// Current Weather
async function apiFetch(url, current) { // false for weather forecaset, true for current weather
    try {
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            switch (current) {
                case 1:
                    displayCurrentWeather(data);
                    break;
                case 2:
                    displayForecastWeather(data);
                    break;
                case 3:
                    displaySpotlightsAds(data);
                    break;
            }

        }
        else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.error(error);
    }
}

apiFetch(weatherAPIURL, 1); // current weather

function displayCurrentWeather({ main: { temp }, weather: [{ main, description, icon }] }) {

    const weatherDescription = document.createElement('p');
    const currentWeatherIcon = document.createElement('img');
    const currentTemperature = document.createElement('p');

    weatherDescription.innerHTML = `${main}`;
    currentWeatherIcon.setAttribute('src', `https://openweathermap.org/img/wn/${icon}@2x.png`);
    currentWeatherIcon.setAttribute('alt', description);
    currentTemperature.innerHTML = `${temp}&deg;C`;

    weatherCard.appendChild(weatherDescription);
    weatherCard.appendChild(currentWeatherIcon);
    weatherCard.appendChild(currentTemperature);

}

apiFetch(forecastAPIURL, 2) // weather forecast
let cardImages = [1, 2, 3];

function displayForecastWeather({ list }) {
    const miniCards = document.createElement('div');
    miniCards.setAttribute('id', 'minicards-forecast');

    const buttonLeft = document.createElement('button');
    buttonLeft.setAttribute('onclick', 'plusDivs(-1)');
    buttonLeft.setAttribute('class', 'forecast-button');
    buttonLeft.setAttribute('id', 'left-button');
    buttonLeft.innerHTML = `&#10094`;

    miniCards.appendChild(buttonLeft);

    list.forEach(({ main: { temp }, weather: [{ description, icon }], dt }) => {
        const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        const miniCard = document.createElement('div');

        const heading = document.createElement('h4');
        const temperature = document.createElement('p');
        const time = document.createElement('p');
        const miniIcon = document.createElement('img');
        const date = new Date(dt * 1000);
        const weekday = daysOfWeek[date.getDay()]; // Sun - Sat
        const monthday = date.getDate(); // Day of the month that it is being displayed (1-31)
        const [hourTwelve, pmAM] = hours(date.getHours()); // hour of the day that it will be displayed
        const minute = date.getMinutes().toLocaleString('en-US', {
            minimumIntegerDigits: 2,
            useGrouping: false
        }); // minutes of the day that is being displayed

        miniCard.setAttribute('class', 'miniWeatherCard');
        heading.textContent = `${weekday} ${monthday}`;
        miniIcon.setAttribute('src', `https://openweathermap.org/img/w/${icon}.png`);
        miniIcon.setAttribute('alt', description);
        temperature.innerHTML = `${temp.toFixed(0)}&deg;C`;
        time.innerText = `${hourTwelve}:${minute} ${pmAM}`;


        miniCard.appendChild(heading);
        miniCard.appendChild(miniIcon);
        miniCard.appendChild(temperature);
        miniCard.appendChild(time);
        miniCards.appendChild(miniCard)

    });

    const buttonRight = document.createElement('button');
    buttonRight.setAttribute('onclick', 'plusDivs(1)');
    buttonRight.setAttribute('class', 'forecast-button');
    buttonRight.setAttribute('id', 'right-button');
    buttonRight.innerHTML = `&#10095`;


    miniCards.appendChild(buttonRight);
    forecastCard.appendChild(miniCards);
    showCard(cardImages);
}

function plusDivs(n) {
    cardImages = cardImages.map(c => c + n);
    showCard(cardImages);
}


function showCard(indexesToDisplay) {
    const bright = document.querySelector('#right-button');
    const bleft = document.querySelector('#left-button');
    let cards = document.getElementsByClassName('miniWeatherCard');
    if (indexesToDisplay[2] > cards.length) {
        cardImages = [cards.length - 2, cards.length - 1, cards.length];
    };
    if (indexesToDisplay[0] < 1) {
        cardImages = [1, 2, 3];
    };
    for (i = 0; i < cards.length; i++) {
        cards[i].style.display = "none";
    }

    cardImages.forEach((cimage) => {
        cards[cimage - 1].style.display = "block";
    })

    if (cardImages[0] === 1) {
        bleft.style.display = "none";
        bright.style.display = "block";
    }
    else if (cardImages[cardImages.length - 1] === cards.length) {
        bleft.style.display = "block";
        bright.style.display = "none";
    }
    else {
        bleft.style.display = "block";
        bright.style.display = "block";
    }
}

function hours(hrs) {
    let fixedHrs;
    let pmAm;
    let hrsPMAM = [];
    if (hrs > 12) {
        fixedHrs = hrs - 12;
        pmAm = "PM"
    }
    else if (hrs === 12) {
        fixedHrs = hrs;
        pmAm = "PM";
    }
    else if (hrs === 0) {
        fixedHrs = 12;
        pmAm = "AM";
    }
    else {
        fixedHrs = hrs;
        pmAm = "AM";
    }
    hrsPMAM.push(fixedHrs, pmAm);
    return hrsPMAM;
}

const companyAd = document.querySelectorAll('.company-ad');
function displaySpotlightsAds({ companies }) {
    const premiumCompanies = companies.filter(({ membershipLevel }) =>
        membershipLevel === "Gold Membership" || membershipLevel === "Silver Membership");

    const displayListCompanies = [];
    const copyPremiumCompanies = [...premiumCompanies];

    for (i = 0; i < 3; i++) {
        const randomIndex = Math.floor(Math.random() * copyPremiumCompanies.length);
        displayListCompanies.push(copyPremiumCompanies[randomIndex]);
        copyPremiumCompanies.splice(randomIndex, 1);
    }

    for (i = 0; i < 3; i++) {
        const name = document.createElement('h2');
        const address = document.createElement('p');
        const phone = document.createElement('p');
        const website = document.createElement('a');
        const membership = document.createElement('p');

        name.textContent = displayListCompanies[i].name;
        address.textContent = displayListCompanies[i].address;
        phone.textContent = displayListCompanies[i].phone;
        website.setAttribute('href', displayListCompanies[i].url);
        website.textContent = "Company Website";
        membership.textContent = displayListCompanies[i].membershipLevel;

        companyAd[i].appendChild(name);
        companyAd[i].appendChild(address);
        companyAd[i].appendChild(phone);
        companyAd[i].appendChild(website);
        companyAd[i].appendChild(membership);

    }

}

apiFetch(membersURL, 3);

const datetoday = new Date();

if (datetoday.getDay() > 0 && datetoday.getDay() < 4) {
    document.querySelector('#event-banner').showModal();
}

const exitBanner = document.querySelector('#banner-exit');

exitBanner.addEventListener('click', () => {
    document.querySelector('#event-banner').close();
});