import { Router } from 'express';
import * as patronController from '../../controllers/patronController.js'

const router = Router();

// Define route to retrieve available seats
router.get('/patrons', patronController.getPatrons)
router.post('/addPatron', patronController.addPatron)
router.put('/update/:patronID', patronController.updatePatron)
router.delete('/remove/:patronID');

export default router;
