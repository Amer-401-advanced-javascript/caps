'use strict';

const io = require('socket.io-client');
const socket = io.connect('http://localhost:3000/caps');
let faker = require('faker');

let storeName = 'hawdy';

socket.emit('join', storeName)


socket.on('delivered', payload=>{
  console.log(`Thank you for deliveing ${payload.orderID}`);
})

setInterval(() => {  
  let storeOrder = {
    store: storeName,
    orderID: faker.random.uuid(),
    customer: faker.name.findName(),
    address: faker.address.city(),
  };
    socket.emit('pickup', storeOrder)
}, 500);