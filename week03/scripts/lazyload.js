// Obtaining the date and the last modified items in the website

document.getElementById('year').textContent = new Date().getFullYear();

document.getElementById('lastModified').textContent = `Last modified: ${document.lastModified}`;
