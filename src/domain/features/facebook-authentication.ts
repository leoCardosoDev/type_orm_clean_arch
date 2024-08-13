import { FacebookAuthenticationParams, FacebookAuthenticationResult } from './types'

export interface FacebookAuthentication {
  perform: (_params: FacebookAuthenticationParams) => Promise<FacebookAuthenticationResult>
}
