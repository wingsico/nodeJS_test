var express = require('express');

var app = express()
// 创建视图引擎，指明了默认的布局为'main'
var handlebars = require('express3-handlebars').create({ defaultLayout: 'main' })

// 幸运饼干
var fortunes = [
  "Conquer your fears or they will conquer you",
  "Rivers need springs",
  "Do not fear what you dont't know",
  "You will have a pleasant surpise"
]

// 配置Express， 将handlbars设置为其默认的视图引擎
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars')

// 设置端口
app.set('port', process.env.PORT || 3000)

// 托管静态文件
app.use(express.static(__dirname + '/public'))

// 默认路由
app.get('/', (req, res) => {
  res.render('home')
})

app.get('/about', (req, res) => {
  var randomFortune = fortunes[Math.floor(Math.random() * fortunes.length)]
  res.render('about', { fortune: randomFortune })
})

// 404 catch-all 处理器（中间件）
app.use((req, res) => {
  res.status(404);
  res.render('404')
})

// 500 错误处理器 （中间件）
app.use((err, req, res, next) => {
  console.err(err.stack)
  res.status(500)
  res.render('500')
})


app.listen(app.get('port'), () => {
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.')
})