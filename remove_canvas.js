const fs = require('fs');
const file = 'c:/Apps/indigo/index.html';
let html = fs.readFileSync(file, 'utf8');

// Regex to remove the hero-right section
const heroRightRegex = /<div class="hero-right"[\s\S]*?<\/div>\s*<\/div>\s*<\/section>/;
html = html.replace(heroRightRegex, '</section>');

// Regex to remove the three.js library script
const threejsLibRegex = /<script src="https:\/\/cdnjs\.cloudflare\.com\/ajax\/libs\/three\.js\/r128\/three\.min\.js"><\/script>\s*/;
html = html.replace(threejsLibRegex, '');

// Regex to remove the custom three.js script
const scriptRegex = /<script>\s*\(\s*function\s*\(\)\s*{\s*const canvas = document\.getElementById\('ringCanvas'\)[\s\S]*?<\/script>\s*/;
html = html.replace(scriptRegex, '');

fs.writeFileSync(file, html);
console.log('Removed canvas and three.js successfully');
