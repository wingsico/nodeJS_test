var events = require('events')

var emitter = new events.EventEmitter()

emitter.once('someEvent', (arg1, arg2) => {
  console.log('listener1', arg1, arg2)
})

emitter.on('someEvent', (arg1, arg2) => {
  console.log('listener2', arg1, arg2)
  emitter.removeAllListeners('someEvent')
})

var arr = ['is', 'wonderful']
setTimeout(() => {
  emitter.emit('someEvent', ...arr)
  emitter.emit('error')
}, 2000)

emitter.emit('someEvent', arr, 'g')