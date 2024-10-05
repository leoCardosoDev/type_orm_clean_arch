import { AuthenticationError } from '@/domain/entities/errors'
import { AccessToken } from '@/domain/entities'

export interface FacebookAuthentication {
  perform: (_params: FacebookAuthenticationParams) => Promise<FacebookAuthenticationResult>
}

export type FacebookAuthenticationParams = {
  token: string
}

export type FacebookAuthenticationResult = AccessToken | AuthenticationError
