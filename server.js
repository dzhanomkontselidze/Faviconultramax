import express from 'express';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import sharp from 'sharp';

const app = express();
const port = 3000;
const host = '127.0.0.3';

const favicon = readFileSync('./img/Standard_Satin_Platinum_32x32.png');
const IconPath = join(process.cwd(), 'img', 'Standard_Satin_Platinum.png');
const memeVideoPath = join(process.cwd(), 'video', 'Metroboominmakeitboom.mp4')

app.get('/favicon.ico', (req, res) => {
  res.set('Content-Type', 'image/png');
  res.send(favicon);
});

app.get('/image/:width/:height', async (req, res) => {
  const width = parseInt(req.params.width, 10);
  const height = parseInt(req.params.height, 10);

  if (isNaN(width) || isNaN(height)) {
    return res.status(400).send('Invalid dimensions. Use /image/width/height');
  }

if (width === 1000 && height === 1000) {
    console.log('bombo');
    return res.sendFile(memeVideoPath);
  }

  try {
    const resizedBuffer = await sharp(IconPath)
      .resize(width, height)
      .toBuffer();

    res.set('Content-Type', 'image/png');
    res.send(resizedBuffer);
  } catch (err) {
    res.status(500).send("Resize failed: " + err.message);
  }
});

app.get('/image', (req, res) => {
  res.sendFile(IconPath);
});

app.use((req, res) => {
  res.send('bbs rims on my rarrri\n');
});

app.listen(port, host, () => {
  console.log(`Server running at http://${host}:${port}`);
});