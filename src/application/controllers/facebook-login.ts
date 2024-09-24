import { HttpResponse } from '@/application/helpers'
import { FacebookAuthentication } from '@/domain/features'

export class FacebookLoginController {
  constructor(private readonly _facebookAuthentication: FacebookAuthentication) {}

  async handle(httpRequest: any): Promise<HttpResponse> {
    await this._facebookAuthentication.perform({ token: httpRequest.token })
    return {
      statusCode: 400,
      data: new Error('The field token is required')
    }
  }
}
