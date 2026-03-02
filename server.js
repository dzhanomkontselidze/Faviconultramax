import express from 'express';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import sharp from 'sharp';

const app = express();
const port = 3000;
const host = '127.0.0.3';

const favicon = readFileSync('./img/Standard_Satin_Platinum_32x32.png');
const appleIconPath = join(process.cwd(), 'img', 'Standard_Satin_Platinum.png');

app.get('/favicon.ico', (req, res) => {
  res.set('Content-Type', 'image/png');
  res.send(favicon);
});

app.get('/secret-meme-video', (req, res) => {
  const memeVideoPath = join(process.cwd(), 'video', 'meme.mp4');
  res.sendFile(memeVideoPath);
});

app.get('/image/:width/:height', async (req, res) => {
  const width = parseInt(req.params.width, 10);
  const height = parseInt(req.params.height, 10);

  if (width === 1000 && height === 1000) {

    return res.send(`
      <!DOCTYPE html>
      <html>
      <body style="margin:0; background:black; display:flex; align-items:center; justify-content:center; height:100vh; overflow:hidden;">
        <h1 style="color:white; font-family:sans-serif; cursor:pointer;" id="click-me">CLICK TO RETURN</h1>
        <video id="trollVideo" style="display:none; width:100%; height:100%;" src="/secret-meme-video" loop></video>
        
        <script>
          const v = document.getElementById('trollVideo');
          const h = document.getElementById('click-me');
          
          document.body.addEventListener('click', () => {
            h.style.display = 'none';
            v.style.display = 'block';
            v.volume = 1.0; // Sets the browser player to 100%
            v.play();
            // Try to go fullscreen for maximum effect
            if (v.requestFullscreen) v.requestFullscreen();
          });
        </script>
      </body>
      </html>
    `);
  }

  try {
    const resizedBuffer = await sharp(appleIconPath)
      .resize(width, height)
      .toBuffer();
    res.set('Content-Type', 'image/png').send(resizedBuffer);
  } catch (err) {
    res.status(500).send("Resize failed: " + err.message);
  }
});

// 4. Default Route
app.use((req, res) => {
  res.send('bbs rims on my rarrri\n');
});

app.listen(port, host, () => {
  console.log(`🚀 Troll Server at http://${host}:${port}`);
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