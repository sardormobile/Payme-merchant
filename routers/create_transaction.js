//const EventEmitter = require('events');
var EventEmitter = require('events').EventEmitter;


module.exports = new EventEmitter();

setTimeout(() => {
    module.exports.emit('message');
  }, 2000);



//module.exports = Ee