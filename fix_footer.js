const fs = require('fs');
const file = 'c:/Apps/indigo/index.html';
let html = fs.readFileSync(file, 'utf8');

// Find the first main footer block
const footerMatch = html.match(/<footer[\s\S]*?<\/footer>/);
if (!footerMatch) {
  console.log('No footer found!');
  process.exit(1);
}

let mainFooter = footerMatch[0];

// Replace 2025 with 2026
mainFooter = mainFooter.replace(/2025/g, '2026');

// Remove ALL footers and the comments associated with them
html = html.replace(/<!-- FOOTER -->\s*<footer[\s\S]*?<\/footer>/g, '');
html = html.replace(/<footer[\s\S]*?<\/footer>/g, '');

// The script block starts near the end
const scriptTagIndex = html.lastIndexOf('<script>');

// Insert the main footer just before the final script block
html = html.substring(0, scriptTagIndex) + mainFooter + '\n\n  ' + html.substring(scriptTagIndex);

fs.writeFileSync(file, html);
console.log('Footer updated to 2026 and made global successfully');
