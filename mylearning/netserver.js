const net = require('net');
const colors = require('colors')
var count = 0,
  users = {}
const server = net.createServer((c) => {
  // 'connection' listener
  let nickname
  console.log('client connected');
  c.setEncoding('utf8')
  c.on('close', () => {
    console.log('one client disconnected');
    count--
    delete users[nickname]
    broadcast((' > ' + nickname + ' left the room.\n'), true)
  });

  c.write('\r\n welecome to node-chat!' +
    '\r\n > ' + count + ' other people are connected at this time.' +
    '\r\n > please write your name and press enter: '
  );

  c.on('data', (data) => {
    data = data.replace('\r\n', '')

    if (!nickname) {
      if (users[data]) {
        c.write(' > the nickname already in use. try again: '.red)
        return
      } else {
        nickname = data
        users[nickname] = c
        broadcast((' > ' + nickname + ' joined the room.\n'), false)
      }
    } else {
      broadcast((' > ' + nickname + ': ' + data + '\n'), true)
    }
  })

  count++

  function broadcast(msg, exceptMyself) {
    for (var i in users) {
      if (!exceptMyself || i !== nickname) {
        users[i].write(msg)
      }
    }
  }

  console.log('The number of online member is ' + count)

  // c.pipe(c);
});

server.on('error', (err) => {
  throw err;
});
server.listen(8124, () => {
  console.log('server bound');
});
