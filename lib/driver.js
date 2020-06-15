'use strict';

const events = require('./events');
const logger = require('./caps');
events.on('pickup', pickupHandler);



function pickupHandler(payload){
  setTimeout(() => {
    events.emit('in-transit', payload); 
    logger;
  }, 1000);

  setTimeout(()=> {
    logger;
    events.emit('delivered', payload);
  },3000); 
}