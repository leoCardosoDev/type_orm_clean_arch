import { badRequest, HttpResponse, ok, serverError, unauthorized } from '@/application/helpers'
import { FacebookAuthentication } from '@/domain/features'
import { AccessToken } from '@/domain/models'
import { RequiredFieldError, ServerError } from '@/application/errors'

type HttpRequest = {
  token: string | null | undefined
}

type Model =
  | Error
  | {
      accessToken: string
    }
export class FacebookLoginController {
  constructor(private readonly _facebookAuthentication: FacebookAuthentication) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse<Model>> {
    try {
      if (httpRequest.token === '' || httpRequest.token === null || httpRequest.token === undefined) {
        return badRequest(new RequiredFieldError('token'))
      }
      const accessToken = await this._facebookAuthentication.perform({ token: httpRequest.token })
      if (accessToken instanceof AccessToken) {
        return ok({ accessToken: accessToken._value })
      } else {
        return unauthorized()
      }
    } catch (error) {
      return serverError(new ServerError(error as Error))
    }
  }
}
