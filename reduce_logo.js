const fs = require('fs');
const file = 'c:/Apps/indigo/index.html';
let html = fs.readFileSync(file, 'utf8');

const navOld = `<img src="public/indigologowhite.png" alt="Indigo Jewelry"
        style="height: 80px; width: auto; object-fit: contain;">`;
const navNew = `<img src="public/indigologowhite.png" alt="Indigo Jewelry"
        style="height: 64px; width: auto; object-fit: contain;">`;

const footerOld = `<img src="public/indigologowhite.png" alt="Indigo Jewelry"
              style="height: 64px; width: auto; object-fit: contain;">`;
const footerNew = `<img src="public/indigologowhite.png" alt="Indigo Jewelry"
              style="height: 51px; width: auto; object-fit: contain;">`;

html = html.replace(navOld, navNew);
html = html.replace(footerOld, footerNew);

fs.writeFileSync(file, html);
console.log('Logo size reduced by 20%');
