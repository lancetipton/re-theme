
const { buildTheme } = require('../buildTheme')

describe('/buildTheme', () => {

  it('should return the built theme object', () => {
    const theme = buildTheme({}, 0, 0, {})

    expect(typeof theme).toBe('object')
  })

})