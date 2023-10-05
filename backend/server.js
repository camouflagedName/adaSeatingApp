import express from 'express';
import cors from 'cors';
import seatRouter from './routes/api/seats.js';
import home from './routes/api/home.js';

const app = express();
const port = process.env.PORT || 30001

/* MIDDLEWARE */
app.use(cors());
app.use(express.json());


/* ROUTES */
//
app.use('/test', home)
app.use('/seatAPI', seatRouter)

app.listen(port, () => console.log(`Server is running on port ${port}`));
