'use strict';

// const events = require('../events');
const net = require('net');
const {v4 : uuidv4} = require('uuid');

const PORT = process.env.PORT || 3000;
const server = net.createServer();

server.listen(PORT, ()=> console.log(`The Server is Up and Running on ${PORT} port`));

let socketPool = {};

server.on('connection', (socket)=> {
  // console.log(socket);
  const id = `Socket-${uuidv4()}`;

  socketPool[id] = socket;

  socket.on('data', (buffer)=> dispatchEvent(buffer));

  socket.on('error', (error)=> console.log(`Socket error ${error}`));

  socket.on('end', (end) => {
    console.log(`connection ended ${end}`);
    delete socketPool[id];
  });
});


function dispatchEvent(buffer){
  console.log('The server Got a message');
  let message = JSON.parse(buffer.toString().trim());  
  broadcast(message);  
}

function broadcast(msg){
  let payload = JSON.stringify(msg);
  for(let socket in socketPool){    
    socketPool[socket].write(payload);
  }
}

// events.on('pickup', (payload) => logger(payload, 'pickup'));
// events.on('in-transit', (payload) => logger(payload, 'in-transit'));
// events.on('delivered', (payload) => logger(payload, 'delivered'));








// require('../vendor/vendor');
// require('../driver/driver');