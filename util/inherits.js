var util = require('util')

function Base() {
  this.name = 'base'
  this.base = 1998

  this.sayHello = () => {
    console.log('Hello ' + this.name)
  }
}

Base.prototype.showName = function() {
  console.log(this.name)
}

function Sub() {
  this.name = 'sub'
}

util.inherits(Sub, Base)

var objBase = new Base()
objBase.showName()
objBase.sayHello()
console.log(objBase)

// 只继承原型链上的 
var objSub = new Sub()
objSub.showName()
console.log(objSub)

