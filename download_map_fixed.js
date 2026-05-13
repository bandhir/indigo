const https = require('https');
const fs = require('fs');

const options = {
  hostname: 'upload.wikimedia.org',
  path: '/wikipedia/commons/8/80/World_map_-_low_resolution.svg',
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
  }
};

const file = fs.createWriteStream('c:/Apps/indigo/public/world-map.svg');

https.get(options, function(response) {
  response.pipe(file);
  file.on('finish', function() {
    file.close();
    console.log('Download complete');
  });
}).on('error', function(err) {
  console.log('Error downloading file:', err.message);
});
