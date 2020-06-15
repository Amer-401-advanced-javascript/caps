'use strict';

let logger = require('../lib/caps');
let faker = require('faker');


jest.spyOn(global.console, 'log');
let storeOrder = {
  store: 'test',
  orderID: faker.random.uuid(),
  customer: faker.name.findName(),
  address: faker.address.city(),
};
describe('console.log', () => {
  it('log', ()=>{ 
    logger(storeOrder, 'test'); 
    expect(console.log).toHaveBeenCalled();
  });
});