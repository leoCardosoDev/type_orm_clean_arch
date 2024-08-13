import { LoadFacebookUserApiParams, LoadFacebookUserApiResult } from './types'

export interface LoadFacebookUserApi {
  loadUser: (_param: LoadFacebookUserApiParams) => Promise<LoadFacebookUserApiResult>
}
