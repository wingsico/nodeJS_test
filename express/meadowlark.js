var express = require('express');

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