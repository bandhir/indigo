const fs = require('fs');
const file = 'c:/Apps/indigo/index.html';
let html = fs.readFileSync(file, 'utf8');

// New Coordinates (Visually estimated from worldmap.jpeg)
const NY = { t: '15%', l: '11%' };
const Antwerp = { t: '29.5%', l: '41.5%' };
const Dubai = { t: '52.5%', l: '56.5%' };
const Mumbai = { t: '58%', l: '63.8%' };
const Surat = { t: '57%', l: '63.5%' };
const HK = { t: '52.5%', l: '84.5%' };
const Botswana = { t: '76.5%', l: '47.8%' };

// Update Map Nodes
html = html.replace(/<div class="map-node" style="top: [\d.]+%; left: [\d.]+%;">([\s\S]*?)<h4>Indigo Jewelry, Inc.<\/h4>/g, `<div class="map-node" style="top: ${NY.t}; left: ${NY.l};">$1<h4>Indigo Jewelry, Inc.</h4>`);
html = html.replace(/<div class="map-node" style="top: [\d.]+%; left: [\d.]+%;">([\s\S]*?)<h4>Indigo Jewellery \(Belgium\) BVBA<\/h4>/g, `<div class="map-node" style="top: ${Antwerp.t}; left: ${Antwerp.l};">$1<h4>Indigo Jewellery (Belgium) BVBA</h4>`);
html = html.replace(/<div class="map-node" style="top: [\d.]+%; left: [\d.]+%;">([\s\S]*?)<h4 style="color: #4ade80;">Indigo Jewellery \(I\) Mfg.<\/h4>/g, `<div class="map-node" style="top: ${Mumbai.t}; left: ${Mumbai.l};">$1<h4 style="color: #4ade80;">Indigo Jewellery (I) Mfg.</h4>`);
html = html.replace(/<div class="map-node" style="top: [\d.]+%; left: [\d.]+%;">([\s\S]*?)<h4>Surat Manufacturing<\/h4>/g, `<div class="map-node" style="top: ${Surat.t}; left: ${Surat.l};">$1<h4>Surat Manufacturing</h4>`);
html = html.replace(/<div class="map-node" style="top: [\d.]+%; left: [\d.]+%;">([\s\S]*?)<h4>Indigo Dubai<\/h4>/g, `<div class="map-node" style="top: ${Dubai.t}; left: ${Dubai.l};">$1<h4>Indigo Dubai</h4>`);
html = html.replace(/<div class="map-node" style="top: [\d.]+%; left: [\d.]+%;">([\s\S]*?)<h4>Indigo Jewels Ltd.<\/h4>/g, `<div class="map-node" style="top: ${HK.t}; left: ${HK.l};">$1<h4>Indigo Jewels Ltd.</h4>`);
html = html.replace(/<div class="map-node" style="top: [\d.]+%; left: [\d.]+%;">([\s\S]*?)<h4>Gaborone Operations<\/h4>/g, `<div class="map-node" style="top: ${Botswana.t}; left: ${Botswana.l};">$1<h4>Gaborone Operations</h4>`);

// Update SVG paths
// We will replace the entire SVG block to be safe
const svgRegex = /<svg style="position: absolute; inset: 0; width: 100%; height: 100%; pointer-events: none; z-index: 5;">[\s\S]*?<\/svg>/;

const newSvg = `<svg style="position: absolute; inset: 0; width: 100%; height: 100%; pointer-events: none; z-index: 5;">
            <defs>
              <linearGradient id="netGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stop-color="rgba(212,175,55,0.05)" />
                <stop offset="50%" stop-color="rgba(212,175,55,0.7)" />
                <stop offset="100%" stop-color="rgba(212,175,55,0.05)" />
              </linearGradient>
              <filter id="glow">
                <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>
            <!-- Network Straight Lines connecting Mumbai (${Mumbai.l}, ${Mumbai.t}) to others -->
            <path d="M ${Mumbai.l} ${Mumbai.t} L ${NY.l} ${NY.t}" fill="none" stroke="url(#netGrad)" stroke-width="1.5" class="network-path" filter="url(#glow)"/>
            <path d="M ${Mumbai.l} ${Mumbai.t} L ${Antwerp.l} ${Antwerp.t}" fill="none" stroke="url(#netGrad)" stroke-width="1.5" class="network-path" filter="url(#glow)"/>
            <path d="M ${Mumbai.l} ${Mumbai.t} L ${Dubai.l} ${Dubai.t}" fill="none" stroke="url(#netGrad)" stroke-width="1.5" class="network-path" filter="url(#glow)"/>
            <path d="M ${Mumbai.l} ${Mumbai.t} L ${HK.l} ${HK.t}" fill="none" stroke="url(#netGrad)" stroke-width="1.5" class="network-path" filter="url(#glow)"/>
            <path d="M ${Mumbai.l} ${Mumbai.t} L ${Botswana.l} ${Botswana.t}" fill="none" stroke="url(#netGrad)" stroke-width="1.5" class="network-path" filter="url(#glow)"/>
          </svg>`;

if(svgRegex.test(html)) {
  html = html.replace(svgRegex, newSvg);
  fs.writeFileSync(file, html);
  console.log('Coordinates aligned with image rings');
} else {
  console.log('SVG block not found');
}
