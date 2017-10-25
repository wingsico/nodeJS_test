var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET login page. */
router.route('/login').get((req, res) => {
  res.render('login', { title: 'User login' })
}).post((req, res) => {
  let User = global.dbHandle.getModel('user')
  let username = req.body.username

  console.log(User)
  User.findOne({ username: username }, (err, doc) => {
    if (err) {
      res.send(500)
      console.log(err)
    } else if (!doc) {
      req.session.error = '用户不存在'
      res.send(404)
    } else {
      if (req.body.password !== doc.password) {
        res.session.error = '密码错误'
        res.send(404)
        res.redirect('/login')
      } else {
        res.session.user = doc
        res.send(200)
        res.redirect('/home')
      }
    }
  })
})

/* GET register page */
router.route('/register').get((req, res) => {
  res.render("register", {title: 'User register'})
}).post((req, res) => {
  let User = global.dbHandle.getModel('user')
  let username = req.body.username
  let password = req.body.password

  console.log(username, password)
  User.findOne({ username: username }, (err, doc) => {
    if (err) {
      res.send(500)
      res.session.error = '网络错误'
      console.log(err)
    } else if (doc) {
      res.session.error = '用户名已存在'
      res.send(500)
    } else {
      User.create({
        username: username,
        password: password
      }), function (err, doc) {
        if (err) {
          res.send(500)
          console.log(err)
        } else {
          req.session.error('用户创建成功')
          res.send(200)
        }
      }
    }
  })
})

/* GET home page. */
router.get("/home", function (req, res) {
  if (!req.session.user) {                     //到达/home路径首先判断是否已经登录
    req.session.error = "请先登录"
    res.redirect("/login");                //未登录则重定向到 /login 路径
  }
  res.render("home", { title: 'Home' });         //已登录则渲染home页面
});


/* GET logout page. */
router.get("/logout", function (req, res) {    // 到达 /logout 路径则登出， session中user,error对象置空，并重定向到根路径
  req.session.user = null;
  req.session.error = null;
  res.redirect("/");
});
module.exports = router;
