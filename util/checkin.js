const request = require('request')

function us_checkin() {
  let contents = {
    username: 'username',
    password: 'password',
    remember_me: false
  }
  let options = {
    url: 'http://us.ncuos.com/api/user/login',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
    },
    body: JSON.stringify(contents)
  }
  request(options, (error, response, body) => {
    if (!error && response.statusCode == 200) {
      let token = response.headers.authorization
      let params = {
        "url": 'http://us.ncuos.com/api/checkin',
        "method": 'POST',
        "headers": {
          "Authorization": token
        }
      }
      request(params, (error, response, body) => {
        if (!error && response.statusCode == 200) {
          console.log(body)
        } else {
          console.log(error)
        }
      })
    }
  });
}


function vpn_checkin() {
  let contents = [{
    email: 'example@mail.com',
    passwd: 'password',
    remember_me: 'week'
  }, {
    email: 'example2@mail.com',
    passwd: 'password2',
    remember_me: 'week'
  }]

  let options = {
    url: 'http://ncuhome.club/auth/login',
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    }
  }

  contents.forEach((user, index) => {
    options.form = user;
    request(options, (err, res, body) => {
      if (!err && res.statusCode === 200) {
        let cookie = res.headers['set-cookie'][0].split(';')[0].split('=')[1];
        let params = {
          url: 'http://ncuhome.club/user/checkin',
          method: 'POST',
          headers: {
            'Cookie': 'sid=' + cookie
          }
        };
        request(params, (err, res, body) => {
          if (!err && res.statusCode === 200) {
            console.log(res.statusMessage, body)
          }
        })
      }
    })
  })
}


module.exports = {
  vpn_checkin,
  us_checkin
}