const fs = require('fs');
const file = 'c:/Apps/indigo/index.html';
let html = fs.readFileSync(file, 'utf8');

// Find start and end of globe-section to replace it
const startTag = '<div class="globe-section">';
const endTag = '<!-- ===================== PRODUCTS PAGE ===================== -->';

const startIndex = html.indexOf(startTag);
const endIndex = html.indexOf(endTag);

if(startIndex !== -1 && endIndex !== -1) {
  // We need to keep </section>\n  </div>\n just before the products page
  const before = html.substring(0, startIndex);
  const after = html.substring(endIndex);
  
  // Find where the section ends before products page
  const closingTags = `    </section>\n  </div>\n\n  `;
  
  const mapHtml = `      <div class="network-map-wrapper reveal">
        <div class="world-map-bg"></div>
        <svg style="position: absolute; inset: 0; width: 100%; height: 100%; pointer-events: none;">
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
          <!-- Network Lines connecting Mumbai (70%, 55%) to others -->
          <!-- To NY (25%, 35%) -->
          <path d="M 70% 55% Q 47% 10% 25% 35%" fill="none" stroke="url(#netGrad)" stroke-width="1.5" class="network-path" filter="url(#glow)"/>
          <!-- To Antwerp (50%, 30%) -->
          <path d="M 70% 55% Q 60% 30% 50% 30%" fill="none" stroke="url(#netGrad)" stroke-width="1.5" class="network-path" filter="url(#glow)"/>
          <!-- To Dubai (62%, 52%) -->
          <path d="M 70% 55% Q 66% 45% 62% 52%" fill="none" stroke="url(#netGrad)" stroke-width="1.5" class="network-path" />
          <!-- To HK (85%, 52%) -->
          <path d="M 70% 55% Q 77% 45% 85% 52%" fill="none" stroke="url(#netGrad)" stroke-width="1.5" class="network-path" filter="url(#glow)"/>
          <!-- To Botswana (55%, 75%) -->
          <path d="M 70% 55% Q 62% 65% 55% 75%" fill="none" stroke="url(#netGrad)" stroke-width="1.5" class="network-path" />
        </svg>

        <!-- Node: New York -->
        <div class="map-node" style="top: 35%; left: 25%;">
          <div class="node-pulse"></div>
          <div class="node-core"></div>
          <div class="node-popup">
            <h4>Indigo Jewelry, Inc.</h4>
            <p>New York, NY<br>Sales Office</p>
          </div>
        </div>
        <!-- Node: Antwerp -->
        <div class="map-node" style="top: 30%; left: 50%;">
          <div class="node-pulse"></div>
          <div class="node-core"></div>
          <div class="node-popup">
            <h4>Indigo Jewellery (Belgium) BVBA</h4>
            <p>Antwerpen, Belgium<br>Sales Office</p>
          </div>
        </div>
        <!-- Node: Mumbai -->
        <div class="map-node" style="top: 55%; left: 70%;">
          <div class="node-pulse" style="animation-duration: 1.5s; border-color: #4ade80;"></div>
          <div class="node-core" style="background: #4ade80; box-shadow: 0 0 15px #4ade80;"></div>
          <div class="node-popup">
            <h4 style="color: #4ade80;">Indigo Jewellery (I) Mfg.</h4>
            <p>Mumbai, India<br>Global Export HQ</p>
          </div>
        </div>
        <!-- Node: Surat -->
        <div class="map-node" style="top: 57%; left: 68%;">
          <div class="node-pulse"></div>
          <div class="node-core"></div>
          <div class="node-popup">
            <h4>Surat Manufacturing</h4>
            <p>Surat, India<br>Domestic Hub</p>
          </div>
        </div>
        <!-- Node: Dubai -->
        <div class="map-node" style="top: 52%; left: 62%;">
          <div class="node-pulse"></div>
          <div class="node-core"></div>
          <div class="node-popup">
            <h4>Indigo Dubai</h4>
            <p>Dubai, UAE<br>Global Hub</p>
          </div>
        </div>
        <!-- Node: Hong Kong -->
        <div class="map-node" style="top: 52%; left: 85%;">
          <div class="node-pulse"></div>
          <div class="node-core"></div>
          <div class="node-popup">
            <h4>Indigo Jewels Ltd.</h4>
            <p>Kowloon, Hong Kong<br>Sales Office</p>
          </div>
        </div>
        <!-- Node: Gaborone (Botswana) -->
        <div class="map-node" style="top: 75%; left: 55%;">
          <div class="node-pulse"></div>
          <div class="node-core"></div>
          <div class="node-popup">
            <h4>Gaborone Operations</h4>
            <p>Botswana<br>Sourcing & Processing</p>
          </div>
        </div>
      </div>
${closingTags}`;
  
  fs.writeFileSync(file, before + mapHtml + after);
  console.log('Map HTML replaced successfully');
} else {
  console.log('Could not find tags');
}
