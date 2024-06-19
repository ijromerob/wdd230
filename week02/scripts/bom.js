const input = document.querySelector('#favchap');
const button = document.querySelector('button');
const list = document.querySelector('#list');



button.addEventListener('click', () => {
    if (input.value !== "") {
        const txt = document.createElement('li');
        const delb = document.createElement('button');
        txt.textContent = input.value;
        delb.textContent = '❌';
        txt.appendChild(delb);
        list.appendChild(txt);
        input.value = "";
        delb.addEventListener('click', () => {
            list.removeChild(txt);
            input.focus();
        })
    }
    input.focus();

});


