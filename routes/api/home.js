import { Router } from 'express';
const router = Router();

router.get('/', (req, res) => {
  // Set the content type to HTML
  res.setHeader('Content-Type', 'text/html');

  res.send(`    
    <html>
      <body>
        <h1>This is the server for the ADA Seating App</h1>
        <p>Explore the different endpoints:</p>
        <ul>
          <li>
            <h3>Events API</h3>
            <a href="/eventAPI/events">See all events</a>
          </li>
          <li>
            <h3>Events API</h3>
            <a href="/patronAPI/patrons">See all patrons</a>
          </li>
          <li>
            <h3>Seats API</h3>
            <a href="/seatAPI/allSeats">See all seats</a>
          </li>
        </ul>
      </body>
    </html>);
    `)
});
export default router;
