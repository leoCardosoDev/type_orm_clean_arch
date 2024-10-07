import { TokenValidator } from '@/domain/contracts/cryptography'

type Input = { token: string }
type Output = void
type Setup = (_crypto: TokenValidator) => Authorize
export type Authorize = (_params: Input) => Promise<Output>

export const setUpAuthorize: Setup = crypto => async params => {
  await crypto.validateToken(params)
}
