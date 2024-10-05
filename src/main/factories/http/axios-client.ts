import { AxiosHttpCLient } from '@/infra/gateways'

export const makeAxiosHttpClient = (): AxiosHttpCLient => {
  return new AxiosHttpCLient()
}
