import { Server } from "socket.io";

const createWebSocketServer = (httpServer) => {

    const wss = new Server(httpServer, {
        cors: {
            origin: ["http://localhost:5173", "https://development.d1nz1b86b1hzbx.amplifyapp.com/"],
            methods: ["GET", "POST"]
        }

    });

    wss.on('connection', (socket) => {
        console.log(`User ${socket.id} at ${socket.handshake.address} is now connected.`);
        wss.emit('client connected', { clientID: socket.id });

        socket.on('disconnect', () => {
            console.log(`User ${socket.id} at ${socket.handshake.address} is now connected.`);
        })
    })

    return wss;
}

export default createWebSocketServer;