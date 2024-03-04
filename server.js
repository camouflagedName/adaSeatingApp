import http from 'http'
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
import cron from 'node-cron'
import updateDatabase from './databaseUpdater.js';

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
//app.use('/socket.io', express.static(__dirname + '/node_modules/socket.io/client-dist'));

let serverDate = new Date();
let hasSchedulerRan = false;

cron.schedule('* * * * *', async () => {
    const currentDate = new Date();
    let currentDay = currentDate.getDate();
    let currentMonth = currentDate.getMonth() + 1;
    let currentYear = currentDate.getFullYear();
    let serverDay = serverDate.getDate();
    let serverMonth = serverDate.getMonth() + 1;
    let serverYear = serverDate.getFullYear();

    if (hasSchedulerRan) {
        if (currentDay !== serverDay || currentMonth !== serverMonth || currentYear !== serverYear) {
            hasSchedulerRan = false;
            serverDate = new Date();
        }
    }

    if (!hasSchedulerRan) {
        console.log(`${currentDate}: Initiating scheduled tasks...`);
        const result = await updateDatabase();
        hasSchedulerRan = result;
    }
})

/* WebSocket */
const webSocketServer = createWebSocketServer(server);

server.listen(port, () => console.log(`Server is running on port ${port}`));

export { webSocketServer, server };
