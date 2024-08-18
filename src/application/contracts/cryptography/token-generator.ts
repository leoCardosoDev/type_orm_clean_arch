export interface TokenGenerator {
  generateToken: (_params: TokenGeneratorParams) => Promise<void>
}

export type TokenGeneratorParams = {
  key: string
  expirationInMs: number
}
