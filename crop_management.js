const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'public/management');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.jpg'));

(async () => {
  for (const file of files) {
    const filePath = path.join(dir, file);
    const tempPath = filePath + '.tmp.jpg';
    
    await sharp(filePath)
      .resize({
        width: 600,
        height: 600,
        fit: sharp.fit.cover,
        position: sharp.strategy.attention // Smart crop focusing on features like faces
      })
      .jpeg({ quality: 85 })
      .toFile(tempPath);
      
    fs.renameSync(tempPath, filePath);
    console.log('Cropped ' + file);
  }
})();
