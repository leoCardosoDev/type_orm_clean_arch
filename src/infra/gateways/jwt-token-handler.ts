import { TokenGenerator, TokenGeneratorParams, TokenGeneratorResult } from '@/application/contracts/cryptography'

import jwt from 'jsonwebtoken'

export class JwtTokenHandler implements TokenGenerator {
  constructor(private readonly _secret: string) {}
  async generateToken(params: TokenGeneratorParams): Promise<TokenGeneratorResult> {
    const expirationInSeconds = params.expirationInMs / 1000
    return jwt.sign({ key: params.key }, this._secret, { expiresIn: expirationInSeconds })
  }
}
