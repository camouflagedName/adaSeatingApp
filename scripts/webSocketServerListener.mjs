
//const prodURL = 'https://ada-seating-server-51a972bcadaa.herokuapp.com/' 
//const devURL = 'http://localhost:30001/'


const socket = io();

socket.on('connect', () => {
    console.log(`Connected to websocket with socked ID ${socket.id}`);
})


socket.on('seat updated', (data) => {
    console.log('seat data updated', data);
    let updatesString = "{"

    // TODO: fix how data.updates is displayed

    for (const key in data.updates) {
        updatesString = updatesString + "<br>" + `${key}: ${data.updates[key]}`
    }

    updatesString += "<br>}";

    const textContent = `Seat with id ${data.seatID} updated.`;
    update(textContent);
})

socket.on('patron updated', (data) => {
    console.log('patron data updated', data);


    textContent = `${data.patronID}: ${data.updates}`;
    update(textContent);
})

socket.on('client connected', (data) => {
    console.log(`At view: client with ${data.clientID} connected`);
    const date = new Date().toLocaleDateString();
    const textContent = `Client ${data.clientID} connected at ${date}`;
    update(textContent);
})

const update = (content) => {
    const updatesDiv = document.getElementById('notifications');
    const updateMsg = document.createElement('p');
    updateMsg.innerHTML = content;
    updatesDiv.appendChild(updateMsg);
}