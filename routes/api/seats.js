import { Router } from 'express';
import * as seatController from '../../controllers/seatController.js'

const router = Router();

// Define route to retrieve available seats
router.get('/', (req, res) => {
    res.setHeader('Content-Type', 'text/html');

    res.send(`    
      <html>
        <body>
          <h1>Seats API</h1>
          <p>Explore the different endpoints:</p>
          <ul>
            <li><a href="/allSeats">See All Seats</a></li>
          </ul>
        </body>
      </html>);
      `)
})

router.get('/allSeats', seatController.getAvailableSeats);
router.post('/addSeat', seatController.addSeat)
router.put('/update/:seatId', seatController.updateSeat);


export default router;
