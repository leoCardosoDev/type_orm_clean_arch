export interface SaveFacebookAccountRepository {
  saveWithFacebook: (_params: SaveFacebookAccountRepositoryParams) => Promise<SaveFacebookAccountRepositoryResult>
}

export type SaveFacebookAccountRepositoryParams = {
  id?: string
  name?: string
  email: string
  facebookId: string
}

export type SaveFacebookAccountRepositoryResult = {
  id: string
}
