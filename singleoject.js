function Hello() {
  var name
  
  this.setName = (thyName) => {
    name = thyName
  }

  this.sayHello = () => {
    console.log('Hello ' + name)
  }
}

exports.Hello = Hello