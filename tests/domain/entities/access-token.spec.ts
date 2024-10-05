import { AccessToken } from '@/domain/entities'

describe('AccessToken', () => {
  it('should expires in 1800000 ms', () => {
    expect(AccessToken.expirationInMs).toEqual(1800000)
  })
})
