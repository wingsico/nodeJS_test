var fs = require('fs')

fs.open('content.txt', 'a+', (err, fd) => {
  if (err) {
    console.error(err)
  } else {
    console.log(fd)
  }
})