var http = require('http')
var querystring = require('querystring')

var contents = querystring.stringify({
  name: 'wingsico',
  email: 'wingsico@outlook.com',
  address: 'diaoyutai15hao'
})

var options = {
  host: '127.0.0.1',
  port: '3000',
  path: '/',
  method: 'POST',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Content-Length': contents.length
  }
}

var req = http.request(options, (res) => {
  res.setEncoding('utf8')
  res.on('data', (data) => {
    console.log(data)
  })
})

req.write(contents)
req.end()