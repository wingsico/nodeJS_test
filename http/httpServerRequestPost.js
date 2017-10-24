var http = require('http')

var querystring = require('querystring')

var util = require('util')

http.createServer((req, res) => {
  var post = ''

  req.on('data', (chunk) => {
    post += chunk
  })

  req.on('end', () => {
    console.log(querystring.parse(post))
    // var dat = JSON.parse(post)
    // for (let key of dat) {
    //   console.log(`${key}: ${dat[key]}`)
    //   res.write(`${key}: ${dat[key]}`)      
    // }
    res.writeHead(200)
    res.end('\nget the message!')
  })
}).listen(3000)

  