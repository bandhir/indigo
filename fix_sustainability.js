const fs = require('fs');
const file = 'c:/Apps/indigo/index.html';
let html = fs.readFileSync(file, 'utf8');

// Remove Video and replace with Unsplash image in Sustainability Hero
const videoBlockRegex = /<video autoplay muted loop playsinline style="width: 100%; height: 100%; object-fit: cover;">[\s\S]*?<\/video>/;
html = html.replace(videoBlockRegex, '<img src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1920&q=80" alt="Dark lush forest" style="width: 100%; height: 100%; object-fit: cover;">');

// Right side hero image
html = html.replace('<img src="public/infra/factory6.jpg" alt="Lush green forest"', '<img src="https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&w=800&q=80" alt="Nature dew drops"');

// Philanthropy image (currently factory3.jpg)
html = html.replace('<img src="public/infra/factory3.jpg" alt="School children supported by trust"', '<img src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80" alt="Planting seedling"');

// Diversity / Workplace image (currently factory6.jpg, different alt text)
html = html.replace('<img src="public/infra/factory6.jpg" alt="Diverse team at work"', '<img src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80" alt="Natural landscape"');

fs.writeFileSync(file, html);
console.log('Images and video replaced for sustainability page');
