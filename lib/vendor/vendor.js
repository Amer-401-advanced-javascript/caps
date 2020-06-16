'use strict';

const net = require('net');

const client = new net.Socket();

const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 3000;
client.connect(PORT, HOST, ()=> console.log(`Vendor is now Connected to the system`))

let events = require('../events');
let faker = require('faker');



setInterval(() => {  
  let event= 'pickup'
  let storeOrder = {
    store: 'hawdy',
    orderID: faker.random.uuid(),
    customer: faker.name.findName(),
    address: faker.address.city(),
  };
  let stringifyOrder = JSON.stringify({storeOrder, event})
    
  client.write(stringifyOrder);
  // events.emit('pickup', storeOrder );
}, 5000);  


client.on('data', (data)=> {
console.log(data.toString());

})

events.on('delivered', ()=> {
  console.log('Thank you');  
});



function logger (payload, operation){
  let time = new Date();
  console.log(`Event: ${operation}
  time: ${time}`);
  if(operation === 'pickup') console.log(`Product with the ID ${payload.orderID} has been picked up`);
  console.log({payload});
}