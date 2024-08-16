export type LoadFacebookUserApiParams = {
  token: string
}

export type LoadFacebookUserApiResult =
  | undefined
  | {
      name: string
      email: string
      facebookId: string
    }
