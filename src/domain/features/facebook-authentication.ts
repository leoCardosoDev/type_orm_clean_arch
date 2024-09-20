import { AuthenticationError } from '@/domain/errors'
import { AccessToken } from '@/domain/models'

export interface FacebookAuthentication {
  perform: (_params: FacebookAuthenticationParams) => Promise<FacebookAuthenticationResult>
}

export type FacebookAuthenticationParams = {
  token: string
}

export type FacebookAuthenticationResult = AccessToken | AuthenticationError
