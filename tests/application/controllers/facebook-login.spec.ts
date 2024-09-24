import { FacebookLoginController } from '@/application/controllers'
import { FacebookAuthentication } from '@/domain/features'
import { mock, MockProxy } from 'jest-mock-extended'

describe('FacebookLoginController', () => {
  it('should return 400 if token is empty', async () => {
    let facebookAuth: MockProxy<FacebookAuthentication>
    facebookAuth = mock()
    const sut = new FacebookLoginController(facebookAuth)
    const httpResponse = await sut.handle({ token: '' })
    expect(httpResponse).toEqual({
      statusCode: 400,
      data: new Error('The field token is required')
    })
  })

  it('should return 400 if token is null', async () => {
    let facebookAuth: MockProxy<FacebookAuthentication>
    facebookAuth = mock()
    const sut = new FacebookLoginController(facebookAuth)
    const httpResponse = await sut.handle({ token: null })
    expect(httpResponse).toEqual({
      statusCode: 400,
      data: new Error('The field token is required')
    })
  })

  it('should return 400 if token is undefined', async () => {
    let facebookAuth: MockProxy<FacebookAuthentication>
    facebookAuth = mock()
    const sut = new FacebookLoginController(facebookAuth)
    const httpResponse = await sut.handle({ token: undefined })
    expect(httpResponse).toEqual({
      statusCode: 400,
      data: new Error('The field token is required')
    })
  })

  it('should call FacebookAuthentication with correct params', async () => {
    let facebookAuth: MockProxy<FacebookAuthentication>
    facebookAuth = mock()
    const sut = new FacebookLoginController(facebookAuth)
    await sut.handle({ token: 'any_token' })
    expect(facebookAuth.perform).toHaveBeenCalledWith({ token: 'any_token' })
    expect(facebookAuth.perform).toHaveBeenCalledTimes(1)
  })
})
