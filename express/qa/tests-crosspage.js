const Browser = require('zombie'),
  assert = require('chai').assert


Browser.localhost('localhost', 3000)

suite('Cross-Page Tests', () => {
  
  const browser = new Browser()

  test('requesting a group rate quote from the hood river tour page should populate the referrer field', (done) => {
    var referrer = '/tours/hood-river'
    browser.visit(referrer, () => {
      browser.clickLink('.requestGroupRate', () => {
        assert(browser.resources['0'].request.headers._headers[0][1] === referrer)
      })
      console.log(browser.resources['0'].request.headers)
      done()      
    })
  })

  // test('requesting a group rate from the oregon coast tour page showd populate the referrer field', (done) => {
  //   var referrer = '/tours/oregon-coast'
  //   browser.visit(referrer, () => {
  //     browser.clickLink('.requestGroupRate', () => {
  //       assert(browser.field('referrer').value === referrer)
  //     })
  //     done()      
  //   })
  // })

  test('visiting the "request group rate" page dirctly should result in an empty referrer field', (done) => {
    browser.visit('/tours/request-group-rate', () => {
      console.log(browser.resources['0'].request.headers._headers)
      assert(browser.resources['0'].request.headers._headers[0][1] === '')
      done()
    })
  })
})