import { Server } from "socket.io";

const createWebSocketServer = (appServer) => {
    const wss = new Server(appServer);

    wss.on('connection', (socket) => {
        socket.on('message', (message) => {
            console.log(`Received message ${message}`);
            
            //TODO: add logic
        })

        socket.on('disconnect', () => {
            console.log('A user disconnected')
        })

        socket.on('close', () => {
            console.log('Client disconnected');
            //TODO: add logic for cleanup and/or handle disconnection
        })


    })

    return wss;
}

export default createWebSocketServer;