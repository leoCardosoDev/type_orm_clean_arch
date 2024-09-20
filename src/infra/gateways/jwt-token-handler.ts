import { TokenGeneratorParams } from '@/application/contracts/cryptography'

import jwt from 'jsonwebtoken'

export class JwtTokenHandler {
  constructor(private readonly _secret: string) {}
  async generateToken(params: TokenGeneratorParams): Promise<void> {
    const expirationInSeconds = params.expirationInMs / 1000
    jwt.sign({ key: params.key }, this._secret, { expiresIn: expirationInSeconds })
  }
}
