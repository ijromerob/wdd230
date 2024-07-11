const baseURL = 'https://ijromerob.github.io/wdd230/';
const linksURL = 'https://ijromerob.github.io/wdd230/data/links.json'

async function getLinksData() {
    const response = await fetch(linksURL);
    if (response.ok) {
        const data = await response.json();
        console.log(data);
    }
}

getLinksData()