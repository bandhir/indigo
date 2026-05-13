const fs = require('fs');
const file = 'c:/Apps/indigo/index.html';
let html = fs.readFileSync(file, 'utf8');

// The coords mapping
const coords = {
  NY: { t: '35%', l: '28%' },
  Antwerp: { t: '27%', l: '48.5%' },
  Mumbai: { t: '48%', l: '69%' },
  Surat: { t: '46.5%', l: '68.8%' },
  Dubai: { t: '44%', l: '63.5%' },
  HK: { t: '46%', l: '81%' },
  Botswana: { t: '68%', l: '54.5%' }
};

// SVG Paths
const pathNY = `d="M 69% 48% Q 47% 10% 28% 35%"`;
const pathAntwerp = `d="M 69% 48% Q 60% 30% 48.5% 27%"`;
const pathDubai = `d="M 69% 48% Q 66% 45% 63.5% 44%"`;
const pathHK = `d="M 69% 48% Q 77% 45% 81% 46%"`;
const pathBotswana = `d="M 69% 48% Q 62% 55% 54.5% 68%"`;

// Replace SVG Paths
html = html.replace(/d="M 70% 55% Q 47% 10% 25% 35%"/, pathNY);
html = html.replace(/d="M 70% 55% Q 60% 30% 50% 30%"/, pathAntwerp);
html = html.replace(/d="M 70% 55% Q 66% 45% 62% 52%"/, pathDubai);
html = html.replace(/d="M 70% 55% Q 77% 45% 85% 52%"/, pathHK);
html = html.replace(/d="M 70% 55% Q 62% 65% 55% 75%"/, pathBotswana);

// Replace Node Positions
html = html.replace(/style="top: 35%; left: 25%;"/, `style="top: 35%; left: 28%;"`); // NY
html = html.replace(/style="top: 30%; left: 50%;"/, `style="top: 27%; left: 48.5%;"`); // Antwerp
html = html.replace(/style="top: 55%; left: 70%;"/, `style="top: 48%; left: 69%;"`); // Mumbai
html = html.replace(/style="top: 57%; left: 68%;"/, `style="top: 46.5%; left: 68.8%;"`); // Surat
html = html.replace(/style="top: 52%; left: 62%;"/, `style="top: 44%; left: 63.5%;"`); // Dubai
html = html.replace(/style="top: 52%; left: 85%;"/, `style="top: 46%; left: 81%;"`); // HK
html = html.replace(/style="top: 75%; left: 55%;"/, `style="top: 68%; left: 54.5%;"`); // Botswana

fs.writeFileSync(file, html);
console.log('Coordinates updated');
