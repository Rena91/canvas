const EventEmitter = require('events');
const emitter = new EventEmitter();

emitter.emit('messageLogged');

emitter.on('messageLogged',function() {
    console.log('Lister .. .. .');
    
})