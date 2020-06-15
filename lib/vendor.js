'use strict';

let events = require('./events');
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