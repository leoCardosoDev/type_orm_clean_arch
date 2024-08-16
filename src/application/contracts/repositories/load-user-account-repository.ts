export interface LoadUserAccountRepository {
  load: (_params: LoadUserAccountRepositoryParams) => Promise<void>
}

export type LoadUserAccountRepositoryParams = {
  email: string
}
