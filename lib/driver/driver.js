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


  if(order.event === 'pickup'){
    setTimeout(() => {
      // events.emit('in-transit', payload); 
      console.log(order.event, order.storeOrder.orderID);
      order.event = 'in-transit';
      let transit = JSON.stringify(order);
      client.write(transit);
    }, 1000);
  }

  if(order.event === 'in-transit'){
    setTimeout(()=> {      
      order.event ='delivered';
      console.log(order.event, order.storeOrder.orderID );
      let transit = JSON.stringify(order);
      // events.emit('delivered', payload);
      client.write(transit);
    },3000);
  }
});
