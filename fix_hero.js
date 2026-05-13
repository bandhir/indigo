const fs = require('fs');
const file = 'c:/Apps/indigo/index.html';
let html = fs.readFileSync(file, 'utf8');

// 1. Restore Home Page Video
const homeImgRegex = /<img src="https:\/\/images\.unsplash\.com\/photo-1441974231531-c6227db76b6e\?auto=format&fit=crop&w=1920&q=80" alt="Dark lush forest" style="width: 100%; height: 100%; object-fit: cover;">/;
const homeVideo = `<video autoplay muted loop playsinline style="width: 100%; height: 100%; object-fit: cover;">
          <source src="https://svinodkumar.com/svkjewelry/wp-content/uploads/2026/01/Adjusting_Lighting_and_Camera_for_Diamond.mp4" type="video/mp4">
        </video>`;
html = html.replace(homeImgRegex, homeVideo);

// 2. Replace Sustainability Page Video with Nature Image
const sustVideoRegex = /<video autoplay muted loop playsinline style="width: 100%; height: 100%; object-fit: cover;">\s*<source src="https:\/\/svinodkumar\.com\/svkjewelry\/wp-content\/uploads\/2026\/01\/lgidaringlow\.mp4" type="video\/mp4">\s*<\/video>/;
const sustImg = `<img src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1920&q=80" alt="Nature Forest" style="width: 100%; height: 100%; object-fit: cover;">`;
html = html.replace(sustVideoRegex, sustImg);

fs.writeFileSync(file, html);
console.log('Fixed videos and images successfully');
