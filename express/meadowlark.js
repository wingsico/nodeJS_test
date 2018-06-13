var express = require('express');
var util = require('util')
var path = require('path')
var app = express()
// 创建视图引擎，指明了默认的布局为'main'
var handlebars = require('express3-handlebars').create({ defaultLayout: 'main' })

// 引入模块化的fortune 饼干
var fortune = require('./lib/fortune')
// 配置Express， 将handlbars设置为其默认的视图引擎
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars')

// 设置端口
app.set('port', process.env.PORT || 3000)

// 设置缓存
// app.set('view cache', true)

app.use((req, res, next) => {
  res.locals.showTests = app.get('env') !== 'production' && req.query.test === '1'
  next()
})
// 托管静态文件
app.use(express.static(__dirname + '/public'))

// 默认路由
app.get('/', (req, res) => {
  res.render('home')
})

// 请求报头
app.get('/headers', (req, res) => {
  res.type('text/plain')
  let s = ''
  for (let name in req.headers) {
    s += `${name}: ${req.headers[name]}\n`
  }
  res.send(s)
})

// 请求属性和方法测试
app.get('/methods-test', (req, res) => {
  res.type('application/json')
  res.send({
    "url": req.url,
    "query": req.query,
    "body": req.body,
    "route": req.route,
    "cookies": req.cookies,
    "headers": req.headers,
    "ip": req.ip,
    "path": req.path,
    "host": req.host,
    "xhr": req.xhr,
    "protocol": req.protocol,
    "acceptedLanguages": req.acceptedLanguages
  })
})

// 响应对象测试
app.get('/response-test', (req, res) => {
  // res.redirect(302,'/about')
  res.sendFile(path.join(__dirname, '/public/img', 'yahoo.png'))
})

app.get('/about', (req, res) => {
  res.render('about', {
    fortune: fortune.getFortune(),
    pageTestScript: '/qa/tests-about.js'
  })
})

app.get('/tours/hood-river', (req, res) => {
  res.render('tours/hood-river')
})

app.get('/tours/request-group-rate', (req, res) => {
  res.render('tours/request-group-rate')
})

// template-handlebars 测试
app.get('/template', (req, res) => {
  let data = {
    currency: {
      name: 'United States dollars',
      abbrev: 'USD'
    },
    tours: [
      {
        name: 'Hood River', price: '$99.95'
      },
      {
        name: 'Oregon Coast', price: '$159.95'
      }
    ],
    specialsUrl: '/january-specials',
    currencies: ['USD', 'GBP', 'BTC']
  }

  res.render('template', data)
})

// 404 catch-all 处理器（中间件）
app.use((req, res) => {
  res.status(404);
  res.render('404')
})

// 500 错误处理器 （中间件）
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500)
  res.render('500')
})


app.listen(app.get('port'), () => {
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.')
})