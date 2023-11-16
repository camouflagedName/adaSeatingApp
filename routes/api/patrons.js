import { Router } from 'express';
import * as patronController from '../../controllers/patronController.js'

const router = Router();

// Define route to retrieve available seats
router.get('/', (req, res) => {
    res.setHeader('Content-Type', 'text/html');

    res.send(`    
      <html>
        <body>
          <h1>Patrons API</h1>
          <ul>
            <li><a href="/patrons">See All Patrons</a></li>
          </ul>
        </body>
      </html>);
      `)
})

router.get('/patrons', patronController.getPatrons)
router.post('/addPatron', patronController.addPatron)
router.put('/update/:patronID', patronController.updatePatron)
router.delete('/remove/:patronID');

export default router;
