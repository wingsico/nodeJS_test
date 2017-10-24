var fs = require('fs')

var data = "这是一首情歌～ooo~"
fs.writeFile('newFile.txt', data, 'utf-8', (err) => {
  if (err) {
    console.error(err)
  }
})


fs.mkdir('../http', () => { })
fs.rmdir('http', () => { })
fs.readdir('http', (err, files) => {
  console.log(files)
})

fs.realpath('read.js', (err, resolvedPath) => {
  console.log(resolvedPath)
})

fs.rename("open.js", "open_.js", () => { })

fs.stat('writeFile.js', (err, stats) => {
  console.log(stats)
})

