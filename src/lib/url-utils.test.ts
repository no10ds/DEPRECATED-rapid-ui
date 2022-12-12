import { createUrl } from './url-utils'

describe('createUrl()', () => {
  it('returns url with querystring', () => {
    expect(createUrl('/path', { food: 'pizza', fruit: 'apple' })).toEqual(
      '/path?food=pizza&fruit=apple'
    )

    expect(createUrl('/path', { food: ['pizza', 'chips'], fruit: 'apple' })).toEqual(
      '/path?food=pizza%2Cchips&fruit=apple'
    )
  })

  it('empty params', () => {
    expect(createUrl('/path', {})).toEqual('/path')
    expect(createUrl('/path')).toEqual('/path')
  })
})
