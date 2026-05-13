const fs = require('fs');
const file = 'c:/Apps/indigo/index.html';
let html = fs.readFileSync(file, 'utf8');

const navOld = `<img src="public/indigo-jewelry-logo.png" alt="Indigo Jewelry"
        style="height: 40px; width: auto; object-fit: contain;">`;
const navNew = `<img src="public/indigologowhite.png" alt="Indigo Jewelry"
        style="height: 80px; width: auto; object-fit: contain;">`;

const footerOld = `<img src="public/indigo-jewelry-logo.png" alt="Indigo Jewelry"
              style="height: 32px; filter: brightness(0) invert(1);">`;
const footerNew = `<img src="public/indigologowhite.png" alt="Indigo Jewelry"
              style="height: 64px; width: auto; object-fit: contain;">`;

html = html.replace(navOld, navNew);
html = html.replace(footerOld, footerNew);

fs.writeFileSync(file, html);
console.log('Logo replaced and size increased by 100%');
