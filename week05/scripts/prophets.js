const url = 'https://brotherblazzard.github.io/canvas-content/latter-day-prophets.json';

const cards = document.querySelector('#cards');

async function getProphetData(url) {
    const response = await fetch(url)
    if (response.ok) {
        const data = await response.json();
        displayProphets(data.prophets)
    }
}

function displayProphets(prophets) {
    prophets.forEach(prophet => {
        const newSection = document.createElement('section');
        const fullName = document.createElement('h2');
        const portrait = document.createElement('img');
        const dateOfBirth = document.createElement('p');
        const placeOfBirth = document.createElement('p');

        fullName.innerText = `${prophet.name} ${prophet.lastname}`;
        portrait.setAttribute('src', prophet.imageurl);
        portrait.setAttribute('alt', `Potrait prophet ${prophet.name}`);
        portrait.setAttribute('loading', 'lazy');
        portrait.setAttribute('width', '340');
        portrait.setAttribute('height', '440');

        dateOfBirth.innerText = `Date of Birth: ${prophet.birthdate}`;
        placeOfBirth.innerText = `Place of Birth: ${prophet.birthplace}`;

        newSection.appendChild(fullName);
        newSection.appendChild(dateOfBirth);
        newSection.appendChild(placeOfBirth);
        newSection.appendChild(portrait);
        cards.appendChild(newSection);

    });
}

getProphetData(url);