import { createServer } from 'node:http';
import { readFileSync } from 'node:fs';
import sharp from 'sharp';

const favicon = readFileSync('./img/Standard_Satin_Platinum_32x32.png');
const appleIconPath = './img/Standard_Satin_Platinum.png';

const server = createServer(async (req, res) => {
  const cleanUrl = req.url.replace(/\\/g, '/').toLowerCase();

  if (cleanUrl === '/favicon.ico') {
    res.writeHead(200, { 'Content-Type': 'image/png' });
    res.end(favicon);
    return;
  }

  const parts = cleanUrl.split('/');

  if (parts[1] === 'image') {
    const width = parseInt(parts[2], 10);
    const height = parseInt(parts[3], 10);

    if (!isNaN(width) && !isNaN(height)) {
      try {
        const resizedBuffer = await sharp(appleIconPath)
          .resize(width, height)
          .toBuffer();

        res.writeHead(200, { 'Content-Type': 'image/png' });
        res.end(resizedBuffer);
        return;
      } catch (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end("Resize failed: " + err.message);
        return;
      }
    } 

    res.writeHead(200, { 'Content-Type': 'image/png' });
    res.end(readFileSync(appleIconPath)); 
    return;
  }

  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('bbs rims on my rarrri\n');
});

server.listen(3000, '127.0.0.3', () => {
  console.log('Listening on http://127.0.0.3:3000');
});