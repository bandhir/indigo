const fs = require('fs');
const file = 'c:/Apps/indigo/index.html';
let html = fs.readFileSync(file, 'utf8');

const mapRegex = /<div class="network-map-wrapper reveal">([\s\S]*?)<\/div>\s*<div class="associates-list"/;

const mapHtml = `<div class="network-map-wrapper reveal">
        <div class="map-canvas" style="position: absolute; top: 50%; left: 50%; width: 100%; min-width: 950px; aspect-ratio: 950/620; transform: translate(-50%, -50%) scale(1.2);">
          <div class="world-map-bg" style="position: absolute; inset: 0; background: url('world-map.svg') center center / 100% 100% no-repeat; opacity: 0.25; filter: invert(1);"></div>
          
          <svg style="position: absolute; inset: 0; width: 100%; height: 100%; pointer-events: none; z-index: 5;">
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
            <!-- Network Straight Lines connecting Mumbai (69.4%, 46.7%) to others -->
            <path d="M 69.4% 46.7% L 28.4% 35.4%" fill="none" stroke="url(#netGrad)" stroke-width="1.5" class="network-path" filter="url(#glow)"/>
            <path d="M 69.4% 46.7% L 49.4% 27.4%" fill="none" stroke="url(#netGrad)" stroke-width="1.5" class="network-path" filter="url(#glow)"/>
            <path d="M 69.4% 46.7% L 62.6% 42.7%" fill="none" stroke="url(#netGrad)" stroke-width="1.5" class="network-path" filter="url(#glow)"/>
            <path d="M 69.4% 46.7% L 82.1% 45.1%" fill="none" stroke="url(#netGrad)" stroke-width="1.5" class="network-path" filter="url(#glow)"/>
            <path d="M 69.4% 46.7% L 55.2% 70.1%" fill="none" stroke="url(#netGrad)" stroke-width="1.5" class="network-path" filter="url(#glow)"/>
          </svg>

          <!-- Node: New York -->
          <div class="map-node" style="top: 35.4%; left: 28.4%;">
            <div class="node-pulse"></div>
            <div class="node-core"></div>
            <div class="node-popup">
              <h4>Indigo Jewelry, Inc.</h4>
              <p>New York, NY<br>Sales Office</p>
            </div>
          </div>
          <!-- Node: Antwerp -->
          <div class="map-node" style="top: 27.4%; left: 49.4%;">
            <div class="node-pulse"></div>
            <div class="node-core"></div>
            <div class="node-popup">
              <h4>Indigo Jewellery (Belgium) BVBA</h4>
              <p>Antwerpen, Belgium<br>Sales Office</p>
            </div>
          </div>
          <!-- Node: Mumbai -->
          <div class="map-node" style="top: 46.7%; left: 69.4%;">
            <div class="node-pulse" style="animation-duration: 1.5s; border-color: #4ade80;"></div>
            <div class="node-core" style="background: #4ade80; box-shadow: 0 0 15px #4ade80;"></div>
            <div class="node-popup">
              <h4 style="color: #4ade80;">Indigo Jewellery (I) Mfg.</h4>
              <p>Mumbai, India<br>Global Export HQ</p>
            </div>
          </div>
          <!-- Node: Surat -->
          <div class="map-node" style="top: 45.9%; left: 69.4%;">
            <div class="node-pulse"></div>
            <div class="node-core"></div>
            <div class="node-popup">
              <h4>Surat Manufacturing</h4>
              <p>Surat, India<br>Domestic Hub</p>
            </div>
          </div>
          <!-- Node: Dubai -->
          <div class="map-node" style="top: 42.7%; left: 62.6%;">
            <div class="node-pulse"></div>
            <div class="node-core"></div>
            <div class="node-popup">
              <h4>Indigo Dubai</h4>
              <p>Dubai, UAE<br>Global Hub</p>
            </div>
          </div>
          <!-- Node: Hong Kong -->
          <div class="map-node" style="top: 45.1%; left: 82.1%;">
            <div class="node-pulse"></div>
            <div class="node-core"></div>
            <div class="node-popup">
              <h4>Indigo Jewels Ltd.</h4>
              <p>Kowloon, Hong Kong<br>Sales Office</p>
            </div>
          </div>
          <!-- Node: Gaborone (Botswana) -->
          <div class="map-node" style="top: 70.1%; left: 55.2%;">
            <div class="node-pulse"></div>
            <div class="node-core"></div>
            <div class="node-popup">
              <h4>Gaborone Operations</h4>
              <p>Botswana<br>Sourcing & Processing</p>
            </div>
          </div>
        </div>
      </div>
      <div class="associates-list"`;

if (mapRegex.test(html)) {
  html = html.replace(mapRegex, mapHtml);
  fs.writeFileSync(file, html);
  console.log('Map successfully updated via Regex');
} else {
  console.log('Regex failed to match');
}
