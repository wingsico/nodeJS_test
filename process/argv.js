console.log(process.argv)

process.stdin.resume()

process.stdin.on('data', (data) => {
  process.stdout.write('read from console.log: ' + data.toString())
  process.nextTick(callback)  
})

function callback() {
  console.log("this is a callback func.")
}
