import { get } from 'jsutils'
import { testTheme, buttonTheme } from '../../mocks'

const { buildTheme } = require('../buildTheme')

describe('/buildTheme', () => {

  it('should return the built theme object', () => {
    const theme = buildTheme(buttonTheme, 200, 1000, {})
    expect(typeof theme).toBe('object')
  })

})