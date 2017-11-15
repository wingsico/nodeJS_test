var fs = require('fs')
require('colors')

// function async(err, files) {
//   console.log(files)
// }

// fs.readdir('./', async)

// process.stdout.write('Hello world')
console.log(process.cwd())
fs.readdir(process.cwd(), (err, files) => {
  console.log('')

  if (!files.length) {
    return console.log('    No files to show!\n'.red)
  }
  
  console.log('   Select which file or directory you want to see\n'.blue)

  function file(i) {
    var filename = files[i]

    fs.stat(__dirname + '/' + filename, (err, stat) => {
      if (stat.isDirectory()) {
        console.log(`   ${i+1}    ${filename}/`.green)
      } else {
        console.log(`   ${i+1}    ${filename}`.magenta)
      }

      i++
      if (i == files.length) {
        console.log('')
        process.stdout.write('    Enter your choice: ')
        process.stdin.resume()
        process.stdin.setEncoding('utf8')
      } else {
        file(i)
      }
    })
  }

  file(0)
})
