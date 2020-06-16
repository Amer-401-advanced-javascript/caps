'use strict';

const net = require('net');
const client = new net.Socket();
const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 3000;

client.connect(PORT, HOST, ()=> console.log(`The Driver Connected to the system`));

// const events = require('../events');
// events.on('pickup', pickupHandler);

client.on('data', (data)=> {
  let order = JSON.parse(data);
  // console.log(order);
  logger(order.storeOrder, order.event);   
 
  
  if(order.event === 'pickup'){
    setTimeout(() => {
      // events.emit('in-transit', payload); 
      order.event = 'in-transit';
      let transit = JSON.stringify(order);
      // client.write(transit);
    }, 1000);
  }

  // setTimeout(()=> {
  // // events.emit('delivered', payload);
  //   // client.write(transit);
  // },3000);
});




function logger (payload, operation){
  let time = new Date();
  console.log(`Event: ${operation}
  time: ${time}`);
  if(operation === 'pickup') console.log(`Product with the ID ${payload.orderID} has been picked up`);
  console.log({payload});
}