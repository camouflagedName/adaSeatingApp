import { Router } from "express";
import * as patronController from '../../controllers/patronController.js'
import * as eventController from '../../controllers/eventController.js'

const router = Router();

router.get('/', (req, res) => {
    res.setHeader('Content-Type', 'text/html');

    res.send(`    
      <html>
        <body>
          <h1>Events API</h1>
          <ul>
            <li><a href="/events">See All Events</a></li>
          </ul>
        </body>
      </html>);
      `)
})

router.get('/events', eventController.getEvents)
router.post('/addEvent', eventController.addEvent)

export default router;