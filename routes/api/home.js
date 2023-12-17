import { Router } from 'express';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import os from 'os';
import { exec } from 'child_process';
import { error } from 'console';
import { stdout } from 'process';


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

  res.json({
    port: port,
    env: environment,
    time: serverStartTime,
  })
})

router.get('/status', (req, res) => {
  res.json({
    uptime: os.uptime(),
    totalMemory: os.totalmem(),
    freeMemory: os.freemem(),
    cpuUsage: os.loadavg(),
  })
})


router.get('/get-heroku-dynos', (req, res) => {
  exec('heroku ps -a ada-seating-server', (error, stdout) => {
    if (error) {
      console.error(error)
      res.status(500).json({ error: "Error fetching dyno data" });
      return;
    }
    const output = stdout.split('\n')[1].split(' ');
   // console.log(output)
    const dynos = {
      status: output[1],
      date: output[2],
      time: output[3],
      timeLength: output[6]  
    }

    res.json(dynos);
  });
});

export default router;