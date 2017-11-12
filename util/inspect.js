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


class Box {
  constructor(value) {
    this.value = value;
  }

  [util.inspect.custom](depth, options) {
    if (depth < 0) {
      return options.stylize('[Box]', 'special');
    }

    const newOptions = Object.assign({}, options, {
      depth: options.depth === null ? null : options.depth - 1
    });

    // Five space padding because that's the size of "Box< ".
    const padding = ' '.repeat(5);
    const inner = util.inspect(this.value, newOptions)
      .replace(/\n/g, `\n${padding}`);
    return `${options.stylize('Box', 'special')}< ${inner} >`;
  }
}

const box = new Box(true);

util.inspect(box);