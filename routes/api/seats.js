import { Router } from 'express';
import * as seatController from '../../controllers/seatController.js'
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const router = Router();

// Define route to retrieve available seats
router.get('/', (req, res) => {
  res.setHeader('Content-Type', 'text/html');
  res.sendFile(path.join(__dirname, '../../view/seats.html'))
});

router.get('/allSeats', seatController.getAvailableSeats);
router.post('/addSeat', seatController.addSeat);
router.put('/updateSeat/:seatID', seatController.updateSeat);
router.put('/updateSeat/', seatController.updateMultipleSeats);


export default router;
