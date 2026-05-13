const fs = require('fs');
const file = 'c:/Apps/indigo/index.html';
let html = fs.readFileSync(file, 'utf8');

// Fix associates-head
const oldHead = `<div class="associates-head">
        <p class="sec-label">Global Reach</p>
        <h1 class="sec-title" style="font-size:clamp(2.5rem,4vw,4rem)">Our associates,<br><em>your advantage</em></h1>
        <p class="associates-intro">With a rich history spanning over 45 years, our global network of marketing
          associates — strategically located in major diamond hubs — delivers exceptional service to our esteemed and
          loyal clientele worldwide.</p>
      </div>`;

const newHead = `<div class="associates-head" style="text-align: center; margin-bottom: 4rem; display: flex; flex-direction: column; align-items: center; max-width: 800px; margin-left: auto; margin-right: auto;">
        <p class="sec-label" style="justify-content: center; margin-bottom: 1rem;">Global Reach</p>
        <h1 class="sec-title" style="font-size:clamp(2.5rem,4vw,4rem); margin-bottom: 1.5rem;">Our associates,<br><em>your advantage</em></h1>
        <p class="associates-intro" style="font-size: 1.1rem; font-weight: 300; line-height: 1.9; color: rgba(255,255,255,.8);">With a rich history spanning over 45 years, our global network of marketing associates — strategically located in major diamond hubs — delivers exceptional service to our esteemed and loyal clientele worldwide.</p>
      </div>`;

html = html.replace(oldHead, newHead);

// Re-add the associates-list
const associatesListHtml = `
      <div class="associates-list" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(400px, 1fr)); gap: 2rem; max-width: 1200px; margin: 0 auto 5rem; padding: 0 4rem;">
        <div class="assoc-item">
          <span class="assoc-flag" style="font-size: 2rem;">🇮🇳</span>
          <div class="assoc-info">
            <p class="assoc-name" style="font-family: var(--serif); font-size: 1.3rem; color: var(--gold); margin-bottom: 0.5rem;">Indigo Jewellery (I) Mfg. Pvt. Ltd.</p>
            <p class="assoc-entity" style="font-size: 0.85rem; color: rgba(255,255,255,0.7); line-height: 1.6;">Plot No. GJ 008, SEEPZ++, Andheri (E), Mumbai 400096<br>Tel: +91-22-40696969</p>
          </div>
          <span class="assoc-badge" style="background: rgba(74,222,128,0.1); color: #4ade80; padding: 0.4rem 0.8rem; font-size: 0.7rem; letter-spacing: 0.1em; text-transform: uppercase;">Export HQ</span>
        </div>
        
        <div class="assoc-item">
          <span class="assoc-flag" style="font-size: 2rem;">🇮🇳</span>
          <div class="assoc-info">
            <p class="assoc-name" style="font-family: var(--serif); font-size: 1.3rem; color: var(--gold); margin-bottom: 0.5rem;">Indigo Jewellery Pvt. Ltd. — MIDC</p>
            <p class="assoc-entity" style="font-size: 0.85rem; color: rgba(255,255,255,0.7); line-height: 1.6;">C5, Plot No. 11 & 12, WICEL, MIDC Road, Andheri East, Mumbai</p>
          </div>
          <span class="assoc-badge" style="background: rgba(212,175,55,0.1); color: var(--gold); padding: 0.4rem 0.8rem; font-size: 0.7rem; letter-spacing: 0.1em; text-transform: uppercase;">Domestic</span>
        </div>
        
        <div class="assoc-item">
          <span class="assoc-flag" style="font-size: 2rem;">🇺🇸</span>
          <div class="assoc-info">
            <p class="assoc-name" style="font-family: var(--serif); font-size: 1.3rem; color: var(--gold); margin-bottom: 0.5rem;">Indigo Jewelry, Inc.</p>
            <p class="assoc-entity" style="font-size: 0.85rem; color: rgba(255,255,255,0.7); line-height: 1.6;">521 5th Avenue, Suite 820, New York, NY 10175<br>Tel: +1-212-921-0056</p>
          </div>
          <span class="assoc-badge" style="background: rgba(59,130,246,0.1); color: #3b82f6; padding: 0.4rem 0.8rem; font-size: 0.7rem; letter-spacing: 0.1em; text-transform: uppercase;">Sales Office</span>
        </div>

        <div class="assoc-item">
          <span class="assoc-flag" style="font-size: 2rem;">🇧🇪</span>
          <div class="assoc-info">
            <p class="assoc-name" style="font-family: var(--serif); font-size: 1.3rem; color: var(--gold); margin-bottom: 0.5rem;">Indigo Jewellery (Belgium) BVBA</p>
            <p class="assoc-entity" style="font-size: 0.85rem; color: rgba(255,255,255,0.7); line-height: 1.6;">Hoveniersstraat 30, Box 227, Office 1026, 2018 Antwerpen<br>Tel: +32 3.232.02.84</p>
          </div>
          <span class="assoc-badge" style="background: rgba(59,130,246,0.1); color: #3b82f6; padding: 0.4rem 0.8rem; font-size: 0.7rem; letter-spacing: 0.1em; text-transform: uppercase;">Sales Office</span>
        </div>

        <div class="assoc-item">
          <span class="assoc-flag" style="font-size: 2rem;">🇦🇪</span>
          <div class="assoc-info">
            <p class="assoc-name" style="font-family: var(--serif); font-size: 1.3rem; color: var(--gold); margin-bottom: 0.5rem;">Indigo Dubai</p>
            <p class="assoc-entity" style="font-size: 0.85rem; color: rgba(255,255,255,0.7); line-height: 1.6;">Dubai, UAE<br>Middle East Operations</p>
          </div>
          <span class="assoc-badge" style="background: rgba(59,130,246,0.1); color: #3b82f6; padding: 0.4rem 0.8rem; font-size: 0.7rem; letter-spacing: 0.1em; text-transform: uppercase;">Sales Office</span>
        </div>

        <div class="assoc-item">
          <span class="assoc-flag" style="font-size: 2rem;">🇭🇰</span>
          <div class="assoc-info">
            <p class="assoc-name" style="font-family: var(--serif); font-size: 1.3rem; color: var(--gold); margin-bottom: 0.5rem;">Indigo Jewels Ltd.</p>
            <p class="assoc-entity" style="font-size: 0.85rem; color: rgba(255,255,255,0.7); line-height: 1.6;">Unit 12-13, 9F, Tower 1, Harbour Centre, Kowloon<br>Tel: +852 27218360</p>
          </div>
          <span class="assoc-badge" style="background: rgba(59,130,246,0.1); color: #3b82f6; padding: 0.4rem 0.8rem; font-size: 0.7rem; letter-spacing: 0.1em; text-transform: uppercase;">Sales Office</span>
        </div>
        
        <div class="assoc-item" style="grid-column: 1 / -1; display: flex; justify-content: center; text-align: center; margin-top: 1rem;">
          <div style="background: var(--glass); padding: 2rem; border: 1px solid var(--border); width: 100%;">
            <span class="assoc-flag" style="font-size: 2rem;">🇧🇼</span>
            <div class="assoc-info" style="margin-top: 1rem;">
              <p class="assoc-name" style="font-family: var(--serif); font-size: 1.3rem; color: var(--gold); margin-bottom: 0.5rem;">Gaborone Operations</p>
              <p class="assoc-entity" style="font-size: 0.85rem; color: rgba(255,255,255,0.7); line-height: 1.6;">Botswana · Sustainable Sourcing & Processing</p>
            </div>
          </div>
        </div>
      </div>
`;

// Find where to append the associatesListHtml
// After the closing </div> of network-map-wrapper.
const wrapperEnd = '      </div>\n    </section>\n  </div>\n\n  <!-- ===================== PRODUCTS PAGE ===================== -->';
if (html.includes(wrapperEnd)) {
  html = html.replace(wrapperEnd, '      </div>\n' + associatesListHtml + '    </section>\n  </div>\n\n  <!-- ===================== PRODUCTS PAGE ===================== -->');
  fs.writeFileSync(file, html);
  console.log('List added back successfully');
} else {
  console.log('Failed to find insertion point');
}
