var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose')
// var multer = require('multer')
var session = require('express-session')

var url = 'mongo://ncuhome_2017_exam:ncuhome_2017_exam@www.ncuos.cn:3717/ncuhome_2017_exam?authMechanism=MONGODB-CR&authSource=admin'
global.dbHandle = require('./database/dbhandle')
global.db = mongoose.connect(url)

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();
app.use(session({
  secret: 'secret',
  cookie: {
    maxAge: 1000 * 60 * 30
  }
}))

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine("html", require("ejs").renderFile)
app.set('view engine', 'html');

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(multer())
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);  // 即为为路径 / 设置路由
app.use('/users', users); // 即为为路径 /users 设置路由
app.use('/login', routes); // 即为为路径 /login 设置路由
app.use('/register', routes); // 即为为路径 /register 设置路由
app.use('/home', routes); // 即为为路径 /home 设置路由
app.use("/logout", routes); // 即为为路径 /logout 设置路由

app.use((req, res, next) => {
  res.locals.user = req.session.user

  let err = req.session.error
  delete req.session.error
  res.locals.message = ""
  if (err) {
    res.locals.message = `<div class="alert alert-danger" style="margin-bottom: 20px; color:red">${err}</div>`
  }

  next()
})
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;