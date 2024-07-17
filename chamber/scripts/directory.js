const companiesUrl = "https://ijromerob.github.io/wdd230/chamber/data/members.json";
const mainElement = document.querySelector('#companies');

async function GetCompanies() {
    const response = await fetch(companiesUrl);
    if (response.ok) {
        const data = await response.json();
        DisplayMembers(data);
    }
}

function DisplayMembers({ companies }) {
    companies.forEach(({ name, address, phone, url, imgFile, membershipLevel }) => {
        const section = document.createElement('div');
        const companyImage = document.createElement('img');
        const companyName = document.createElement('h3');
        const companyAddress = document.createElement('p');
        const companyPhone = document.createElement('p');
        const companyWebSite = document.createElement('a');
        const companyMembership = document.createElement('p');

        section.setAttribute('class', 'company-card')
        companyName.innerText = name;
        companyImage.setAttribute('src', "images/" + imgFile);
        companyImage.setAttribute('alt', name + " logo");
        companyImage.setAttribute('class', 'companies-imgs');
        companyAddress.innerText = address;
        companyPhone.innerText = phone;
        companyWebSite.innerText = "Company Website";
        companyWebSite.setAttribute('href', url);
        companyMembership.innerText = membershipLevel;

        section.appendChild(companyName);
        section.appendChild(companyImage);
        section.appendChild(companyAddress);
        section.appendChild(companyPhone);
        section.appendChild(companyWebSite);
        section.appendChild(companyMembership);
        mainElement.appendChild(section);

    });

}


GetCompanies();

//buttons
const gridbutton = document.querySelector('#grid');
const listbutton = document.querySelector('#list');


gridbutton.addEventListener('click', () => {
    mainElement.classList.add('grid');
    mainElement.classList.remove('list');
});

listbutton.addEventListener('click', () => {
    mainElement.classList.add('list');
    mainElement.classList.remove('grid');
});


// hamburguer button
const hButton = document.querySelector('#menu');
const navigation = document.querySelector('.navigation');

hButton.addEventListener('click', () => {
    navigation.classList.toggle('open');
    hButton.classList.toggle('open');
})

//get date for the website
document.getElementById('year').textContent = new Date().getFullYear();

document.getElementById('lastmodified').textContent = `Last modified: ${document.lastModified}`;

