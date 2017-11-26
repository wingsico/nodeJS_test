const fortune = require('../lib/fortune')
const expect = require('chai').expect

suite('Fortune cookie tests', () => {
  test('getFortune() shold return a fortune', () => {
    expect(typeof fortune.getFortune === 'string')
  })
})