var net = require('net')
var client = net.connect(6667, 'irc.freenode.net');

client.setEncoding('utf-8')
client.on('connect', () => {
  client.write('NICK mynick\r\n')
  client.write('USER mynick 0 * :realname\r\n')
  client.write('JSON #wingsico\r\n')
})


