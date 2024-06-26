const input = document.querySelector('#favchap');
const button = document.querySelector('button');
const list = document.querySelector('#list');



button.addEventListener('click', () => {
    if (input.value !== "") {
        displayList(input.value)
        chaptersArray.push(input.value)
        setChapterList();
        input.value = "";
        input.focus();
    }
})


let chaptersArray = getChapterList() || [];

chaptersArray.forEach(chapter => {
    displayList(chapter)
});

function displayList(item) {
    const txt = document.createElement('li');
    const delb = document.createElement('button');
    txt.textContent = item;
    delb.textContent = '❌';
    txt.appendChild(delb);
    list.appendChild(txt);
    delb.addEventListener('click', () => {
        list.removeChild(txt);
        deleteChapter(txt.textContent);
    });
}

function setChapterList() {
    localStorage.setItem('FavoriteBOMList', JSON.stringify(chaptersArray));
}

function getChapterList() {
    return JSON.parse(localStorage.getItem('FavoriteBOMList'));
}

function deleteChapter(chapter) {
    chapter = chapter.slice(0, chapter.length - 1);
    chaptersArray = chaptersArray.filter((item) => item !== chapter);
    setChapterList();

}