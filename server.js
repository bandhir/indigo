require('dotenv').config();
const http = require('http');
const fs = require('fs');
const path = require('path');
const contactHandler = require('./api/contact.js');

const PORT = process.env.PORT || 3000;

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.gif': 'image/gif',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf'
};

const server = http.createServer(async (req, res) => {
  const urlPath = req.url.split('?')[0];

  // API Route: /api/contact
  if (urlPath === '/api/contact' || urlPath === '/api/contact.js') {
    // Provide express/vercel style helper methods on res
    res.status = function(code) {
      this.statusCode = code;
      return this;
    };
    res.json = function(data) {
      this.setHeader('Content-Type', 'application/json');
      this.end(JSON.stringify(data));
      return this;
    };

    // Collect request body
    let rawBody = '';
    req.on('data', chunk => {
      rawBody += chunk;
    });

    req.on('end', async () => {
      try {
        req.body = rawBody ? JSON.parse(rawBody) : {};
      } catch (e) {
        req.body = rawBody;
      }

      try {
        await contactHandler(req, res);
      } catch (err) {
        console.error('Contact handler uncaught error:', err);
        if (!res.headersSent) {
          res.status(500).json({ success: false, error: err.message || 'Internal Server Error' });
        }
      }
    });
    return;
  }

  // Static file handling
  let relativePath = urlPath === '/' ? '/index.html' : urlPath;
  // Decode percent-encoded paths
  try {
    relativePath = decodeURIComponent(relativePath);
  } catch (e) {}

  const safePath = path.normalize(path.join(__dirname, relativePath));

  // Security check: ensure within workspace
  if (!safePath.startsWith(__dirname)) {
    res.writeHead(403, { 'Content-Type': 'text/plain' });
    return res.end('403 Forbidden');
  }

  fs.stat(safePath, (err, stats) => {
    if (err || !stats.isFile()) {
      // If file doesn't exist, try appending .html
      const htmlPath = safePath + '.html';
      fs.stat(htmlPath, (err2, stats2) => {
        if (!err2 && stats2.isFile()) {
          serveFile(htmlPath, res);
        } else {
          res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
          res.end('<h1>404 Not Found</h1>');
        }
      });
      return;
    }

    serveFile(safePath, res);
  });
});

function serveFile(filePath, res) {
  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME_TYPES[ext] || 'application/octet-stream';

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      return res.end('500 Internal Server Error');
    }
    res.writeHead(200, { 'Content-Type': contentType });
    res.end(data);
  });
}

server.listen(PORT, () => {
  console.log(`Indigo dev server running at http://localhost:${PORT}`);
});
