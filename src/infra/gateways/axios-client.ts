import { HttpGetClient, HttpGetClientInput } from '@/infra/gateways'

import axios from 'axios'

export class AxiosHttpCLient implements HttpGetClient {
  async get<T = any>({ url, params }: HttpGetClientInput): Promise<T> {
    const result = await axios.get(url, { params })
    return result.data
  }
}
