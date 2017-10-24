var util = require('util')

function Person() {
  this.name = 'wingsico'

  this.toString = () => {
    return this.name
  }
}

var obj = new Person()

console.log(util.inspect(obj, true, null, true))

var arr = [1, 2, 3, 4]
console.log(util.isArray(arr))