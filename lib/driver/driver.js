'use strict';

const events = require('../events');
const logger = require('../csps/caps');
events.on('pickup', pickupHandler);



function pickupHandler(payload){
  setTimeout(() => {
    events.emit('in-transit', payload); 
  }, 1000);

  setTimeout(()=> {
    events.emit('delivered', payload);
  },3000); 
}