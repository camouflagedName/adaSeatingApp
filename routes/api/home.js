import { Router } from 'express';
const router = Router();

router.get('/', (req, res) => {
  // Set the content type to HTML
  res.setHeader('Content-Type', 'text/html');

  res.send()

  res.sendFile(path.join(__dirname, '../../views/home.html'))
});

router.get('/about', (req, res) => {
  const port = process.env.PORT || 3000;
  const environment = process.env.NODE_ENV;
  const serverStartTime = new Date().toLocaleString();
  const html = `
  <html>
    <body>
      <h1>About This Server</h1>
      <p>Server start time: ${serverStartTime}<p>
      <p>Running on port ${port}</p>
      <p>Currently in ${environment} mode</p>
    </body>
  </html>
  `;
  res.setHeader('Content-Type', 'text/html');

  res.send(html)
})


export default router;
