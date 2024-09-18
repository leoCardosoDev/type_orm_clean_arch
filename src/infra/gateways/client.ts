export interface HttpGetClient {
  get: <T = any>(_input: HttpGetClientInput) => Promise<T>
}

export type HttpGetClientInput = {
  url: string
}
