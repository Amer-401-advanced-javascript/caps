'use strict';

const net = require('net');

const client = new net.Socket();

const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 3000;
client.connect(PORT, HOST, ()=> console.log(`////////////////Vendor is Connected to the server/////////////////`)
)

let events = require('../events');
let faker = require('faker');

const storeName = 'hawdy';


setInterval(() => {
  let storeOrder = {
    store: storeName,
    orderID: faker.random.uuid(),
    customer: faker.name.findName(),
    address: faker.address.city(),
  };
  events.emit('pickup', storeOrder );
}, 5000);  

events.on('delivered', ()=> {
  console.log('Thank you');  
});