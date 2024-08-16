export interface CreateFacebookAccountRepository {
  createFromFacebook: (_params: CreateFacebookAccountRepositoryParams) => Promise<void>
}

export type CreateFacebookAccountRepositoryParams = {
  name: string
  email: string
  facebookId: string
}
