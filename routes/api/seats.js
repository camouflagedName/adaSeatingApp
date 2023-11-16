import { Router } from 'express';
import * as seatController from '../../controllers/seatController.js'

const router = Router();

// Define route to retrieve available seats
router.get('/allSeats', seatController.getAvailableSeats);
router.post('/addSeat', seatController.addSeat)
router.put('/update/:seatId', seatController.updateSeat);

export default router;
