export interface TokenValidator {
  validateToken: (_params: TokenValidatorParams) => Promise<void>
}

export type TokenValidatorParams = { token: string }
