import express from 'express';
import cors from 'cors';
import seatRouter from './routes/api/seats.js';
import patronRouter from './routes/api/patrons.js'
import eventRouter from './routes/api/events.js'
import ping from './routes/api/ping.js';

const app = express();
const port = process.env.PORT || 30001

/* MIDDLEWARE */
app.use(cors());
app.use(express.json());


/* ROUTES */
app.use('/ping', ping)
app.use('/seatAPI', seatRouter)
app.use('/patronAPI', patronRouter)
app.use('/eventAPI', eventRouter)

app.listen(port, () => console.log(`Server is running on port ${port}`));
