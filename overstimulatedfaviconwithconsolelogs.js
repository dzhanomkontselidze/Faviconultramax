import { createServer } from 'node:http';
import { readFileSync } from 'node:fs';
import sharp from 'sharp';

const favicon = readFileSync('./img/Standard_Satin_Platinum_32x32.png');
const appleIconPath = './img/Standard_Satin_Platinum.png';
const server = createServer(async (req, res) => {
  const cleanUrl = req.url.replace(/\\/g, '/').toLowerCase();
  console.log("-----------------------------------------");
  console.log("1. Original URL typed:", req.url);
  console.log("2. Cleaned URL:", cleanUrl);

  if (cleanUrl === '/favicon.ico') {
    res.writeHead(200, { 'Content-Type': 'image/png' });
    res.end(favicon);
    return;
  }
  const parts = cleanUrl.split('/');
  console.log("3. Array of parts:", parts);
  if (parts[1] === 'image') {
    const width = parseInt(parts[2], 10);
    const height = parseInt(parts[3], 10);

    console.log("4. Parsed Width:", width, "| Parsed Height:", height);

    if (!isNaN(width) && !isNaN(height)) {
      console.log("5. Numbers detected! Starting Sharp resize...");
      try {
        const resizedBuffer = await sharp(appleIconPath)
          .resize(width, height)
          .toBuffer();

        console.log("6. SUCCESS! Sending resized image back to browser.");
        res.writeHead(200, { 'Content-Type': 'image/png' });
        res.end(resizedBuffer);
        return;
      } catch (err) {
        console.error("SHARP ERROR:", err.message);
        res.writeHead(500);
        res.end("Resize failed: " + err.message);
        return;
      }
    } 
    
    console.log("5. No valid numbers found. Sending full-sized image.");
    res.writeHead(200, { 'Content-Type': 'image/png' });
    res.end(readFileSync(appleIconPath)); 
    return;
  }

  console.log("Sending fallback text (bbs rims...).");
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('bbs rims on my rarrri\n');
});

server.listen(3000, '127.0.0.3', () => {
  console.log('Listening on http://127.0.0.3:3000');
});