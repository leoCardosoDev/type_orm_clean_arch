import { TokenGenerator, TokenGeneratorParams, TokenGeneratorResult } from '@/domain/contracts/cryptography'

import jwt from 'jsonwebtoken'

type Params = TokenGeneratorParams
type Result = TokenGeneratorResult

export class JwtTokenHandler implements TokenGenerator {
  constructor(private readonly _secret: string) {}

  async generateToken({ expirationInMs, key }: Params): Promise<Result> {
    const expirationInSeconds = expirationInMs / 1000
    return jwt.sign({ key }, this._secret, { expiresIn: expirationInSeconds })
  }
}
