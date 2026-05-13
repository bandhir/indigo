const fs = require('fs');

const sourceFile = 'C:/Apps/indigo/docs/indigo-jewellery-corporate.html';
const destFile = 'C:/Apps/indigo/index.html';
const cssFile = 'C:/Apps/indigo/public/styles.css';

let html = fs.readFileSync(sourceFile, 'utf8');

// 1. Extract CSS and replace with link
const styleRegex = /<style>([\s\S]*?)<\/style>/;
const styleMatch = html.match(styleRegex);
if (styleMatch) {
    html = html.replace(styleRegex, '<link rel="stylesheet" href="public/styles.css">');
}

// 2. Add new fonts
const oldFonts = '<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600&family=Playfair+Display:ital,wght@0,400;0,700;1,400&display=swap" rel="stylesheet">';
const newFonts = '<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&display=swap" rel="stylesheet">';
html = html.replace(oldFonts, newFonts);

// 3. Add IDI Jewels Top Bar
const topBar = `
<div id="top-bar" style="background: #030712; border-bottom: 1px solid rgba(255,255,255,0.05); padding: 0.6rem 4rem; display: flex; justify-content: flex-end; align-items: center; position: fixed; top: 0; left: 0; right: 0; z-index: 201;">
    <a href="#" target="_blank" style="display: flex; align-items: center; gap: 0.8rem; text-decoration: none; color: #d4af37; font-size: 0.75rem; transition: color 0.3s; font-family: 'DM Sans', sans-serif; font-weight: 500;">
        <img src="public/idi-logo.png" alt="IDI Jewels" style="height: 18px; filter: brightness(0) invert(1) sepia(1) saturate(5) hue-rotate(5deg);">
        <span style="letter-spacing: 0.1em; text-transform: uppercase;">Discover Lab Grown Diamonds ↗</span>
    </a>
</div>
`;
html = html.replace('<!-- NAV -->', '<!-- NAV -->\n' + topBar);

// 4. Update Nav Logo
const oldLogo = `<div class="logo-mark">
      <svg viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
        <polygon points="17,2 32,12 32,22 17,32 2,22 2,12" fill="rgba(59,110,248,0.15)" stroke="#3b6ef8" stroke-width="1"/>
        <polygon points="17,7 27,14 27,20 17,27 7,20 7,14" fill="rgba(59,110,248,0.12)" stroke="#4d82ff" stroke-width="0.5"/>
        <circle cx="17" cy="17" r="3" fill="#4d82ff"/>
      </svg>
    </div>
    <div>
      <span class="logo-text">Indigo Jewellery</span>
      <span class="logo-sub">An SV Group Company</span>
    </div>`;
const newLogo = `<img src="public/indigo-jewelry-logo.png" alt="Indigo Jewelry" style="height: 40px; width: auto; object-fit: contain;">`;
html = html.replace(oldLogo, newLogo);

// Update Footer Logo
const oldFooterLogo = `<div class="logo-mark" style="width:28px;height:28px">
            <svg viewBox="0 0 34 34" fill="none"><polygon points="17,2 32,12 32,22 17,32 2,22 2,12" fill="rgba(59,110,248,0.15)" stroke="#3b6ef8" stroke-width="1"/><circle cx="17" cy="17" r="3" fill="#4d82ff"/></svg>
          </div>
          <div><span class="logo-text">Indigo Jewellery</span><span class="logo-sub">An SV Group Company</span></div>`;
const newFooterLogo = `<img src="public/indigo-jewelry-logo.png" alt="Indigo Jewelry" style="height: 32px; filter: brightness(0) invert(1);">`;
html = html.replace(oldFooterLogo, newFooterLogo);

// 5. Replace Hero Background with Video
const oldHeroBg = '<div class="grid-bg"></div>';
const newHeroBg = `
<div style="position: absolute; inset: 0; z-index: 1; overflow: hidden; opacity: 0.6;">
    <video autoplay muted loop playsinline style="width: 100%; height: 100%; object-fit: cover;">
        <source src="https://svinodkumar.com/svkjewelry/wp-content/uploads/2026/01/Adjusting_Lighting_and_Camera_for_Diamond.mp4" type="video/mp4">
    </video>
    <div style="position: absolute; inset: 0; background: linear-gradient(to right, rgba(5,11,26,0.9) 0%, rgba(5,11,26,0.4) 100%);"></div>
</div>
`;
html = html.replace(oldHeroBg, newHeroBg);

// Replace second video in Sustainability
const susVideo = `
<div style="position: absolute; inset: 0; z-index: 1; overflow: hidden; opacity: 0.4;">
    <video autoplay muted loop playsinline style="width: 100%; height: 100%; object-fit: cover;">
        <source src="https://svinodkumar.com/svkjewelry/wp-content/uploads/2026/01/lgidaringlow.mp4" type="video/mp4">
    </video>
    <div style="position: absolute; inset: 0; background: rgba(5,11,26,0.5);"></div>
</div>
`;
// Replace the grid-bg in the sustainability section specifically
html = html.replace(/<div class="grid-bg" style="opacity:\.5"><\/div>/, susVideo);


// 6. Replace Images
const imageMap = {
    "https://images.unsplash.com/photo-1624913503273-5f9c4e980dba?w=700&q=80": "public/infra/factory1.jpg",
    "https://images.unsplash.com/photo-1573408301185-9519eb23f88f?w=500&q=80": "public/collection/jewel1.jpg",
    "https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?w=800&q=80": "public/infra/factory2.jpg",
    "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=800&q=80": "public/infra/factory3.jpg",
    "https://images.unsplash.com/photo-1565035010268-a3816f98589a?w=800&q=80": "public/infra/factory4.jpg",
    "https://images.unsplash.com/photo-1499092346302-b8d01c1f1a3a?w=800&q=80": "public/infra/factory5.jpg",
    "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&q=80": "public/collection/jewel2.jpg",
    "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400&q=80": "public/collection/jewel3.jpg",
    "https://images.unsplash.com/photo-1630019852942-f89202989a59?w=400&q=80": "public/collection/jewel4.jpg",
    "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400&q=80": "public/collection/jewel5.jpg",
    "https://images.unsplash.com/photo-1573408301185-9519eb23f88f?w=400&q=80": "public/collection/jewel1.jpg",
    "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&q=80": "public/collection/jewel6.jpg",
    "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&q=80": "public/collection/jewel7.jpg",
    "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=400&q=80": "public/collection/jewel8.jpg",
    "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=900&q=85": "public/infra/factory6.jpg",
    "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=700&q=85": "public/infra/factory7.jpg",
    "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&q=80": "public/infra/factory1.jpg",
    "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&q=80": "public/infra/factory2.jpg",
    "https://images.unsplash.com/photo-1470770903676-69b98201ea1c?w=600&q=80": "public/infra/factory3.jpg",
    "https://images.unsplash.com/photo-1545854020-7a6cfabfe4b0?w=700&q=80": "public/infra/factory4.jpg",
    "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=1400&q=85": "public/infra/factory5.jpg",
    "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&q=80": "public/infra/factory6.jpg"
};

for (const [oldUrl, newUrl] of Object.entries(imageMap)) {
    // Escape ? in URL for regex
    const safeOldUrl = oldUrl.replace(/\?/g, '\\?');
    const regex = new RegExp(safeOldUrl, 'g');
    html = html.replace(regex, newUrl);
}

// Write HTML
fs.writeFileSync(destFile, html);// CSS is handled separately
console.log("Website successfully generated in " + destFile);
;
