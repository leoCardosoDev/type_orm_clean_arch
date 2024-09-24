import { HttpResponse } from '@/application/helpers'

export class FacebookLoginController {
  async handle(_httpRequest: any): Promise<HttpResponse> {
    return {
      statusCode: 400,
      data: new Error('The field token is required')
    }
  }
}
