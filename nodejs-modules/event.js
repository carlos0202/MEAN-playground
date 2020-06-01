const EventEmitter = require('events');

const emitter = new EventEmitter();

emitter.on('event', function(){
  console.log(`An event has occurred`);
});

emitter.emit('event');

emitter.on('eventWithArguments', function(arg){
  console.log(`An event has occurred with the following # of arguments: 
              id: ${arg.id}
              numero: ${arg.numero}`)
});

emitter.emit('eventWithArguments', {id: 5, numero: 24});