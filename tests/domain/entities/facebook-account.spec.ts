import { FacebookAccount } from '@/domain/entities'

const fbData = {
  name: 'any_fb_name',
  email: 'any_fb_email@mail.com',
  facebookId: 'any_fb_id'
}

describe('FacebookAccount', () => {
  it('should create with facebook data only', () => {
    const sut = new FacebookAccount(fbData)
    expect(sut).toEqual({
      name: 'any_fb_name',
      email: 'any_fb_email@mail.com',
      facebookId: 'any_fb_id'
    })
  })

  it('should update name if its empty', () => {
    const accountData = { id: 'any_id' }
    const sut = new FacebookAccount(fbData, accountData)
    expect(sut).toEqual({
      id: 'any_id',
      name: 'any_fb_name',
      email: 'any_fb_email@mail.com',
      facebookId: 'any_fb_id'
    })
  })

  it('should not update name if its not empty', () => {
    const accountData = { id: 'any_id', name: 'any_name' }
    const sut = new FacebookAccount(fbData, accountData)
    expect(sut).toEqual({
      id: 'any_id',
      name: 'any_name',
      email: 'any_fb_email@mail.com',
      facebookId: 'any_fb_id'
    })
  })
})
