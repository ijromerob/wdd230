const companiesUrl = "https://ijromerob.github.io/wdd230/chamber/data/members.json";
const mainElement = document.querySelector('#home-content');

async function GetCompanies() {
    const response = await fetch(companiesUrl);
    if (response.ok) {
        const data = await response.json();
        DisplayMembers(data);
    }
}

function DisplayMembers({ companies }) {
    companies.forEach(({ name, address, phone, url, imgFile, membershipLevel }) => {
        const section = document.createElement('section');
        const companyImage = document.createElement('img');
        const companyName = document.createElement('h3');
        const companyAddress = document.createElement('p');
        const companyPhone = document.createElement('p');
        const companyWebSite = document.createElement('a');
        const companyMembership = document.createElement('p');

        companyName.innerText = name;
        companyImage.setAttribute('src', "images/" + imgFile);
        companyImage.setAttribute('alt', name + " logo");
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