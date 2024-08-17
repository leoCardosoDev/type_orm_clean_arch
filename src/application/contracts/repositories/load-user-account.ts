export interface LoadUserAccountRepository {
  load: (_params: LoadUserAccountRepositoryParams) => Promise<LoadUserAccountRepositoryResult>
}

export type LoadUserAccountRepositoryParams = {
  email: string
}

export type LoadUserAccountRepositoryResult =
  | undefined
  | {
      id: string
      name?: string
    }
