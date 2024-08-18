export interface SaveFacebookAccountRepository {
  saveWithFacebook: (_params: SaveFacebookAccountRepositoryParams) => Promise<void>
}

export type SaveFacebookAccountRepositoryParams = {
  id?: string
  name?: string
  email: string
  facebookId: string
}
