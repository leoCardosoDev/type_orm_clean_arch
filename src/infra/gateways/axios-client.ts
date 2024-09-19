import { HttpGetClientInput } from '@/infra/gateways'

import axios from 'axios'

export class AxiosHttpCLient {
  async get(args: HttpGetClientInput): Promise<void> {
    await axios.get(args.url, { params: args.params })
  }
}
