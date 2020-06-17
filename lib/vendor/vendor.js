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
let delivered = JSON.parse(data.toString());
 if(delivered.event === 'delivered'){
   console.log(`Thank you for delivering ${delivered.storeOrder.orderID}`);
 }
})

// events.on('delivered', ()=> {
//   console.log('Thank you');  
// });