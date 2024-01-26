import { Router } from "express";
import * as patronController from '../../controllers/patronController.js'
import * as eventController from '../../controllers/eventController.js'
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const router = Router();

router.get('/', (req, res) => {
  res.setHeader('Content-Type', 'text/html');
  res.sendFile(path.join(__dirname, '../../view/events.html'));
})

router.get('/events', eventController.getEvents);
router.post('/addEvent', eventController.addEvent);
router.put('/getEventSeatIDs', eventController.getEventSeatIDs);

export default router;