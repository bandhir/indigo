const fs = require('fs');
const file = 'c:/Apps/indigo/index.html';
let html = fs.readFileSync(file, 'utf8');

// 1. Remove the top bar
html = html.replace(/<div id="top-bar"[\s\S]*?<\/div>\s*<nav id="mainNav">/, '<nav id="mainNav">');

// 2. Replace nav links
const oldNavLinks = `<ul class="nav-links" id="navLinks">
      <li><a href="#" onclick="showPage('home')" id="nav-home" class="active-page">Home</a></li>
      <li><a href="#" onclick="showPage('about')" id="nav-about">About Us</a></li>
      <li><a href="#" onclick="showPage('manufacturing')" id="nav-manufacturing">Manufacturing</a></li>
      <li><a href="#" onclick="showPage('associates')" id="nav-associates">Global Network</a></li>
      <li><a href="#" onclick="showPage('products')" id="nav-products">Products</a></li>
      <li><a href="#" onclick="showPage('sustainability')" id="nav-sustainability">Sustainability</a></li>
      <li><a href="#" onclick="showPage('contact')" id="nav-contact" class="nav-btn">Partner With Us</a></li>
    </ul>`;

const newNavLinks = `<div style="display: flex; flex-direction: column; align-items: flex-end; gap: 0.8rem;">
      <div class="dropdown rich" style="margin-right: 1.4rem;">
        <a href="https://svinodkumar.com" target="_blank" style="color: var(--gold); font-size: 0.7rem; letter-spacing: 0.15em; text-transform: uppercase; text-decoration: none; display: flex; align-items: center; gap: 0.4rem; font-weight: 500;">
          Discover Lab Grown Diamonds ↗
        </a>
        <div class="rich-popup-menu">
          <img src="public/idi-logo.png" alt="IDI Jewels">
          <p>Explore our dedicated division for premium Lab Grown Diamond manufacturing. Combining technological innovation with decades of artisanal excellence.</p>
          <a href="https://svinodkumar.com" target="_blank" class="btn-primary" style="padding: 0.6rem 1rem; width: 100%; box-sizing: border-box; text-align: center; justify-content: center;">Visit IDI Jewels</a>
        </div>
      </div>
      <ul class="nav-links" id="navLinks">
        <li class="dropdown">
          <a href="#" class="dropdown-toggle" style="cursor: default;">About Us ▾</a>
          <div class="dropdown-menu">
            <a href="#" onclick="showPage('about')" id="nav-about">Our Profile</a>
            <a href="#" onclick="showPage('associates')" id="nav-associates">Global Network</a>
          </div>
        </li>
        <li><a href="#" onclick="showPage('manufacturing')" id="nav-manufacturing">Manufacturing</a></li>
        <li><a href="#" onclick="showPage('products')" id="nav-products">Products</a></li>
        <li><a href="#" onclick="showPage('sustainability')" id="nav-sustainability">Sustainability</a></li>
        <li><a href="#" onclick="showPage('contact')" id="nav-contact" class="nav-btn">Partner With Us</a></li>
      </ul>
    </div>`;

html = html.replace(oldNavLinks, newNavLinks);

fs.writeFileSync(file, html);
console.log('HTML updated successfully');
