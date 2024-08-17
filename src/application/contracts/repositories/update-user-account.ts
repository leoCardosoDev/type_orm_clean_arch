export interface UpdateFacebookAccountRepository {
  updateWithFacebook: (_params: UpdateFacebookAccountRepositoryParams) => Promise<void>
}

export type UpdateFacebookAccountRepositoryParams = {
  id: string
  name: string
  facebookId: string
}
