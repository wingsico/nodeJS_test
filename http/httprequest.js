var http = require('http')
var querystring = require('querystring')

var contents = querystring.stringify({
  username: '6130116165',
  password: 'zwj980901.',
  remember_me: false
})

var options = {
  hostname: 'us.ncuos.com',
  path: '/api/user/login',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
    'Content-Length': contents.length
  }
}

// var req = http.request(options, (res) => {
//   res.setEncoding('utf8')
//   res.on('data', (data) => {
//     console.log(data)
//   })
// })

// req.write(contents)
// req.end()
console.log(contents)