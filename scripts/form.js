const rangevalue = document.querySelector('#rangevalue');
const rangeinput = document.querySelector('#rangeinput');



rangeinput.addEventListener('change', displayvalue);
rangeinput.addEventListener('input', displayvalue);


function displayvalue() {
    rangevalue.textContent = rangeinput.value;
}

const password1 = document.querySelector('#password1');
const password2 = document.querySelector('#password2');
const message = document.querySelector('#message');

password2.addEventListener('focusout', checkPassword);

function checkPassword() {
    if (password1.value != password2.value) {
        message.textContent = 'Your passwords do not match. Please try again';
        message.style.color = 'red'
        password2.style.backgroundColor = 'rgb(225, 194, 185)';

    }
    else {
        message.style.display = "none";
        password2.style.backgroundColor = 'rgb(185, 225, 185)';

    }
}

const hButton = document.querySelector('#menu');
const navigation = document.querySelector('.navigation');

hButton.addEventListener('click', () => {
    navigation.classList.toggle('open');
    hButton.classList.toggle('open');
})

