'use strict';

const io = require('socket.io-client');
const socket = io.connect('http://localhost:3000/caps');


socket.on('pickup', (data)=> {

  setTimeout(() => {
    console.log('pickup', data.orderID);
    socket.emit('in-transit', data);
  }, 2000);

  setTimeout(()=> {      
    console.log('delivered', data.orderID );
    socket.emit('delivered', data);
  },3000);
});
