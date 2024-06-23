
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

