

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
