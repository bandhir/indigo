const https = require('https');
const fs = require('fs');

const url = 'https://upload.wikimedia.org/wikipedia/commons/8/80/World_map_-_low_resolution.svg';
const file = fs.createWriteStream('c:/Apps/indigo/public/world-map.svg');

https.get(url, function(response) {
  response.pipe(file);
  file.on('finish', function() {
    file.close();
    console.log('Download complete');
  });
}).on('error', function(err) {
  fs.unlink('c:/Apps/indigo/public/world-map.svg', () => {});
  console.log('Error downloading file:', err.message);
});
