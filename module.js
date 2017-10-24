var name

exports.setName = (thyName) => {
  name = thyName
}

exports.sayHello = () => {
  console.log('Hello ' + name)
}

