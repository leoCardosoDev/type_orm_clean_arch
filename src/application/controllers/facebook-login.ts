import { HttpResponse } from '@/application/helpers'
import { AuthenticationError } from '@/domain/errors'
import { FacebookAuthentication } from '@/domain/features'
import { AccessToken } from '@/domain/models'
import { ServerError } from '../errors'

export class FacebookLoginController {
  constructor(private readonly _facebookAuthentication: FacebookAuthentication) {}

  async handle(httpRequest: any): Promise<HttpResponse> {
    try {
      if (httpRequest.token === '' || httpRequest.token === null || httpRequest.token === undefined) {
        return {
          statusCode: 400,
          data: new Error('The field token is required')
        }
      }
      const result = await this._facebookAuthentication.perform({ token: httpRequest.token })
      if (result instanceof AccessToken) {
        return {
          statusCode: 200,
          data: { accessToken: result._value }
        }
      } else {
        return {
          statusCode: 401,
          data: new AuthenticationError()
        }
      }
    } catch (error) {
      return { statusCode: 500, data: new ServerError(error as Error) }
    }
  }
}
