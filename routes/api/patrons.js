import { Router } from 'express';
import * as patronController from '../../controllers/patronController.js'
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const router = Router();

// Define route to retrieve available seats
router.get('/', (req, res) => {
  res.setHeader('Content-Type', 'text/html');
  res.sendFile(path.join(__dirname, '../../view/patrons.html'))
})

router.get('/patrons', patronController.getPatrons)
router.post('/addPatron', patronController.addPatron)
router.put('/update/:patronID', patronController.updatePatron)
router.delete('/remove/:patronID');

export default router;
