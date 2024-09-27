import { badRequest, HttpResponse, serverError } from '@/application/helpers'
import { ServerError } from '@/application/errors'
import { ValidationComposite, Validator } from '@/application/validation'

export abstract class Controller {
  abstract perform(_httpRequest: any): Promise<HttpResponse>
  buildValidators(_httpRequest: any): Validator[] {
    return []
  }

  async handle(httpRequest: any): Promise<HttpResponse> {
    const error = this.validate(httpRequest)
    if (error !== undefined) {
      return badRequest(error)
    }
    try {
      return await this.perform(httpRequest)
    } catch (error) {
      return serverError(new ServerError(error as Error))
    }
  }

  private validate(httpRequest: any): Error | undefined {
    const validators = this.buildValidators(httpRequest)
    return new ValidationComposite(validators).validate()
  }
}
