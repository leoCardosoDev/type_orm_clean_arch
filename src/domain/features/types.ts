import { AuthenticationError } from '@/domain/errors'
import { AccessToken } from '@/domain/models'

export type FacebookAuthenticationParams = {
  token: string
}

export type FacebookAuthenticationResult = AccessToken | AuthenticationError
