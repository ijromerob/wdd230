// welcome message in left side
const txt = document.querySelector('#welcome');

let date = getDate() || 0;

if (date !== 0) {
    let oldDate = new Date(date)
    let dif = (Date.now() - oldDate.getTime()) / (1000 * 60 * 60 * 24); // difference in days
    if (dif < 1) {
        txt.textContent = 'Back so soon! Awesome!';
        date = Date.now();
        setDate(date);
    }
    else {
        txt.textContent = `You last visited ${Math.floor(dif)} day(s) ago.`;
        date = Date.now();
        setDate(date);
    }
}
else {
    txt.textContent = 'Let us know if you have any questions!';
    date = Date.now();
    setDate(date);
}