import { Router } from "express";
import * as patronController from '../../controllers/patronController.js'
import * as eventController from '../../controllers/eventController.js'

const router = Router();

router.get('/events', eventController.getEvents)
router.post('/addEvent', eventController.addEvent)

export default router;