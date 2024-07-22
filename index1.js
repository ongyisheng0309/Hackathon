import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Set __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Function to serve static files
const serveStaticFile = (filePath, contentType, res) => {
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('404 Not Found');
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(data);
    }
  });
};

// Map file extensions to MIME types
const mimeTypes = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.mp4': 'video/mp4',
};

const server = http.createServer((req, res) => {
  // Handle the root and home paths to serve home.html
  if (req.url === '/home' || req.url === '/') {
    serveStaticFile(path.join(__dirname, 'home.html'), 'text/html', res);
  } else {
    // Serve other static files from the 'public' directory
    // Remove the leading '/' from the URL to correctly map to the 'public' directory
    const filePath = path.join(__dirname, 'public', req.url.replace(/^\/+/, ''));
    const extname = String(path.extname(filePath)).toLowerCase();
    const contentType = mimeTypes[extname] || 'application/octet-stream';

    fs.access(filePath, fs.constants.F_OK, (err) => {
      if (err) {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 Not Found');
      } else {
        serveStaticFile(filePath, contentType, res);
      }
    });
  }
});

server.listen(80, () => {
  console.log(`Server is listening at http://localhost:${server.address().port}`);
});


