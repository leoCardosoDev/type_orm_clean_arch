import { HttpGetClient, HttpGetClientInput } from '@/infra/gateways'

import axios from 'axios'

export class AxiosHttpCLient implements HttpGetClient {
  async get<T = any>(args: HttpGetClientInput): Promise<T> {
    const result = await axios.get(args.url, { params: args.params })
    return result.data
  }
}
