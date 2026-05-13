import re
from bs4 import BeautifulSoup
import os

source_file = 'C:/Apps/indigo/docs/indigo-jewellery-corporate.html'
dest_file = 'C:/Apps/indigo/index.html'

with open(source_file, 'r', encoding='utf-8') as f:
    html_content = f.read()

soup = BeautifulSoup(html_content, 'html.parser')

# 1. Replace style with link
style_tag = soup.find('style')
if style_tag:
    with open('C:/Apps/indigo/public/styles.css', 'w', encoding='utf-8') as f:
        f.write(style_tag.string)
    
    link_tag = soup.new_tag('link', rel='stylesheet', href='public/styles.css')
    style_tag.replace_with(link_tag)

# Add Google Fonts
fonts = [
    "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&display=swap"
]
for font in fonts:
    font_link = soup.new_tag('link', rel='stylesheet', href=font)
    soup.head.append(font_link)

# 2. Add IDI Jewels Top Bar
top_bar_html = """
<div id="top-bar" style="background: var(--blue-dark); border-bottom: 1px solid var(--glass-border); padding: 0.5rem 4rem; display: flex; justify-content: flex-end; align-items: center; position: fixed; top: 0; left: 0; right: 0; z-index: 201;">
    <a href="https://idijewels.com" target="_blank" style="display: flex; align-items: center; gap: 0.8rem; text-decoration: none; color: var(--muted); font-size: 0.75rem; transition: color 0.3s; font-family: var(--sans);">
        <img src="public/idi-logo.png" alt="IDI Jewels" style="height: 20px; filter: brightness(0) invert(1);">
        <span style="letter-spacing: 0.1em; text-transform: uppercase;">Discover Lab Grown Diamonds ↗</span>
    </a>
</div>
"""
nav = soup.find('nav', id='mainNav')
if nav:
    top_bar_soup = BeautifulSoup(top_bar_html, 'html.parser')
    nav.insert_before(top_bar_soup)
    # adjust nav top position
    nav['style'] = nav.get('style', '') + ' margin-top: 36px;'

# 3. Update Logos
for nav_logo in soup.find_all('div', class_='logo-mark'):
    img_tag = soup.new_tag('img', src='public/indigo-jewelry-logo.png', alt='Indigo Jewelry', style='height: 40px; width: auto; object-fit: contain;')
    nav_logo.replace_with(img_tag)

for logo_text in soup.find_all('span', class_='logo-text'):
    logo_text.clear()

for logo_sub in soup.find_all('span', class_='logo-sub'):
    logo_sub.clear()

# 4. Replace Images
image_map = {
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
    "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&q=80": "public/infra/factory6.jpg",
}

for img in soup.find_all('img'):
    src = img.get('src')
    if src in image_map:
        img['src'] = image_map[src]

# 5. Add Video Backgrounds
hero_section = soup.find('section', class_='hero')
if hero_section:
    grid_bg = hero_section.find('div', class_='grid-bg')
    if grid_bg:
        video_html = """
        <div class="video-container" style="position: absolute; inset: 0; z-index: 1; overflow: hidden; opacity: 0.6;">
            <video autoplay muted loop playsinline style="width: 100%; height: 100%; object-fit: cover;">
                <source src="https://svinodkumar.com/svkjewelry/wp-content/uploads/2026/01/Adjusting_Lighting_and_Camera_for_Diamond.mp4" type="video/mp4">
            </video>
            <div style="position: absolute; inset: 0; background: linear-gradient(to right, rgba(5,11,26,0.9) 0%, rgba(5,11,26,0.4) 100%);"></div>
        </div>
        """
        video_soup = BeautifulSoup(video_html, 'html.parser')
        grid_bg.replace_with(video_soup)

# Add second video to sustainability section
sustainability_section = soup.find('div', id='page-sustainability')
if sustainability_section:
    hero_sus = sustainability_section.find('section')
    if hero_sus:
        grid_bg = hero_sus.find('div', class_='grid-bg')
        if grid_bg:
            video_html = """
            <div class="video-container" style="position: absolute; inset: 0; z-index: 1; overflow: hidden; opacity: 0.4;">
                <video autoplay muted loop playsinline style="width: 100%; height: 100%; object-fit: cover;">
                    <source src="https://svinodkumar.com/svkjewelry/wp-content/uploads/2026/01/lgidaringlow.mp4" type="video/mp4">
                </video>
                <div style="position: absolute; inset: 0; background: rgba(5,11,26,0.5);"></div>
            </div>
            """
            video_soup = BeautifulSoup(video_html, 'html.parser')
            grid_bg.replace_with(video_soup)

# Write modified HTML
with open(dest_file, 'w', encoding='utf-8') as f:
    f.write(str(soup))

print("Site built successfully.")
