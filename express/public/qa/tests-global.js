suite('Global Tests', () => {
  test('page has a valid value', () => {
    assert(document.title && document.title.match(/\S/) && document.title.toUpperCase() !== 'TODO')
  })
})