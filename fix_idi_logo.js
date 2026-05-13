const fs = require('fs');
const file = 'c:/Apps/indigo/index.html';
let html = fs.readFileSync(file, 'utf8');

html = html.replace('<img src="public/idi-logo.png" alt="IDI Jewels">', '<img src="public/idi-logo-white.png" alt="IDI Jewels">');

fs.writeFileSync(file, html);
console.log('IDI logo updated in HTML');
