'use strict';

const events = require('./events');
events.on('pickup', (payload) => logger(payload, 'pickup'));
events.on('in-transit', (payload) => logger(payload, 'in-transit'));
events.on('delivered', (payload) => logger(payload, 'delivered'));

require('./vendor');
require('./driver');

function logger (payload, operation){
  let time = new Date();
  console.log(`Event: ${operation}
  time: ${time}`);
  if(operation === 'pickup') console.log(`Product with the ID ${payload.orderID} has been picked up`);
  console.log({payload});
}


module.exports = logger;
