import express from 'express';
import cors from 'cors';
import seatRouter from './routes/api/seats.js';
import patronRouter from './routes/api/patrons.js'
import eventRouter from './routes/api/events.js'
import ping from './routes/api/ping.js';
import home from './routes/api/home.js';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import createWebSocketServer from './webSocketServer.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();
const server = http.createServer(app);
const port = process.env.PORT || 30001

/* MIDDLEWARE */
app.use(cors());
app.use(express.json());

/* ROUTES */
app.use('/', home)
app.use('/ping', ping)
app.use('/seatAPI', seatRouter)
app.use('/patronAPI', patronRouter)
app.use('/eventAPI', eventRouter)
app.use('/scripts', express.static(path.join(__dirname, 'scripts')));

/* WebSocket */
const webSocketServer = createWebSocketServer(server); 

app.listen(port, () => console.log(`Server is running on port ${port}`));

export { webSocketServer };
