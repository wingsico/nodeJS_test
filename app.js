
var http = require('http')
// 导入Node.js的库的http库文件，获取句柄
var server = http.createServer((req, res) => {
  console.log("get a request!")
  res.writeHead(200, { "Content-Type": "text/plain" })
  res.write("Hello World!")
  res.end()
  console.log("request response => ok!")
})

server.listen(3000)
console.log("server start at 127.0.0.1:3000")