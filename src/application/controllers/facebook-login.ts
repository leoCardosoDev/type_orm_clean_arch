import { badRequest, HttpResponse, ok, serverError, unauthorized } from '@/application/helpers'
import { FacebookAuthentication } from '@/domain/features'
import { AccessToken } from '@/domain/models'
import { ServerError } from '@/application/errors'
import { ValidationBuilder, ValidationComposite } from '@/application/validation'

type HttpRequest = {
  token: string
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
      const error = this.validate(httpRequest)
      if (error !== undefined) {
        return badRequest(error)
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

  private validate(httpRequest: HttpRequest): Error | undefined {
    return new ValidationComposite([...ValidationBuilder.of({ value: httpRequest.token, fieldName: 'token' }).required().build()]).validate()
  }
}
