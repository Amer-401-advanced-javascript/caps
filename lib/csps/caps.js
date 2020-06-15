'use strict';

const events = require('../events');
const net = require('net');
const uuid = require('uuid');

const PORT = process.env.PORT || 3000;
const server = net.createServer();

server.listen(PORT, ()=> console.log(`The Server is Up and Running on ${PORT} port`));

let socketPool = {};

server.on('connection', (socket)=> {
  // console.log(socket);
  
});

events.on('pickup', (payload) => logger(payload, 'pickup'));
events.on('in-transit', (payload) => logger(payload, 'in-transit'));
events.on('delivered', (payload) => logger(payload, 'delivered'));


function logger (payload, operation){
  let time = new Date();
  console.log(`Event: ${operation}
  time: ${time}`);
  if(operation === 'pickup') console.log(`Product with the ID ${payload.orderID} has been picked up`);
  console.log({payload});
}




// require('../vendor/vendor');
// require('../driver/driver');