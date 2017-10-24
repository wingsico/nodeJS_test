var EventEmitter = require('events').EventEmitter
var event = new EventEmitter()

event.on('some_event', () => {
  console.log('some_vent occured.')
})

setTimeout(() => {
  event.emit('some_event')
}, 1000)