'use strict';

const io = require('socket.io')(3000);


io.on('connection', (socket)=>{
  console.log(socket.id);
});

const caps = io.of('/caps');

caps.on('connection', (socket)=>{
  console.log(socket.id);
  socket.on('join', room => {
    console.log('registered in room ', room);
    socket.join(room);
  });
  socket.on('pickup', (payload)=>{
    logger(payload, 'pickup');
    caps.emit('pickup', payload);
  });

  socket.on('in-transit', (payload)=>{
    logger(payload, 'in-transit');
    caps.to(payload.store).emit('in-transit', payload);
  });

  socket.on('delivered', (payload)=>{
    logger(payload, 'delivered');
    caps.to(payload.store).emit('delivered', payload);
  });
});

function logger (payload, operation){
  let time = new Date();
  console.log(`Event: ${operation}
  time: ${time}`);
  if(operation === 'pickup') console.log(`Product with the ID ${payload.orderID} has been picked up`);
  console.log({payload});
}