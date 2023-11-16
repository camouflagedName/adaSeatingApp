import { Router } from 'express';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
const router = Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

router.get('/', (req, res) => {
  // Set the content type to HTML
  res.setHeader('Content-Type', 'text/html');
  res.sendFile(path.join(__dirname, '../../view/home.html'))
});

router.get('/about', (req, res) => {
  const port = process.env.PORT || 3000;
  const environment = process.env.NODE_ENV || 'development';
  const serverStartTime = new Date().toLocaleString();

  res.send({
    port: port,
    env: environment,
    time: serverStartTime,
  })
})


export default router;
