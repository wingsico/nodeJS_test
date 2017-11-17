var fs = require('fs'),
  stdin = process.stdin,
  stdout = process.stdout
require('colors')

// function async(err, files) {
//   console.log(files)
// }

// fs.readdir('./', async)

// process.stdout.write('Hello world')
console.log(process.cwd())
fs.readdir(process.cwd(), (err, files) => {
  console.log('')
  var stats = []
  if (!files.length) {
    return console.log('    No files to show!\n'.red)
  }

  console.log('   Select which file or directory you want to see\n'.blue)

  function file(i) {
    var filename = files[i]
    
    fs.stat(__dirname + '/' + filename, (err, stat) => {
      stats[i] = stat
      if (stat.isDirectory()) {
        console.log(`   ${i}    ${filename}/`.green)
      } else {
        console.log(`   ${i}    ${filename}`.magenta)
      }


      if (++i == files.length) {
        read()
      } else {
        file(i)
      }
    })
  }

  file(0)

  function read() {
    console.log('')
    stdout.write('    Enter your choice: ')
    stdin.resume()
    stdin.setEncoding('utf8')

    stdin.on('data', option)

  }

  function option(data) {
    var filename = files[Number(data)]
    if (!filename) {
      stdout.write('    Enter your choice: ')
    } else {
      stdin.pause()

      if (stats[Number(data)].isDirectory()) {
        fs.readdir(__dirname + '/' + filename, (err, files) => {
          console.log('')
          console.log('   (' + files.length + ' files)')
          files.forEach((file) => {
            console.log('   -   ' + file);
          })
          console.log('')
        })
      } else {
        fs.readFile(__dirname + '/' + filename, 'utf8', (err, data) => {
          console.log('')
          console.log(data.replace(/(.*)/g, '   $1'))
        })
      }
    }
  }
})
