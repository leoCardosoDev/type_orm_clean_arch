export interface TokenValidator {
  validateToken: (_params: TokenValidatorParams) => Promise<TokenValidatorResult>
}

export type TokenValidatorParams = { token: string }
export type TokenValidatorResult = string
