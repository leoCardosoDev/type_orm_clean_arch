import { AxiosHttpCLient } from '@/infra/gateways'

import axios from 'axios'

jest.mock('axios')

type AxiosResponse<T = any> = {
  data: T
  status: number
  statusText: string
  headers: Record<string, string>
  config: object
}

describe('AxiosHttpClient', () => {
  let sut: AxiosHttpCLient
  let fakeAxios: jest.Mocked<typeof axios>
  let url: string
  let params: object
  let mockedAxiosResponse: AxiosResponse

  beforeAll(() => {
    url = 'any_url'
    params = { any: 'any' }
    fakeAxios = axios as jest.Mocked<typeof axios>
    mockedAxiosResponse = {
      data: 'any_data',
      status: 200,
      statusText: 'OK',
      headers: {},
      config: {}
    }
    fakeAxios.get.mockResolvedValue(mockedAxiosResponse)
  })

  beforeEach(() => {
    sut = new AxiosHttpCLient()
  })

  describe('get', () => {
    it('should call get with correct params', async () => {
      await sut.get({ url, params })
      expect(fakeAxios.get).toHaveBeenCalledWith(url, { params })
      expect(fakeAxios.get).toHaveBeenCalledTimes(1)
    })

    it('should return data on success', async () => {
      const result = await sut.get({ url, params })
      expect(result).toEqual('any_data')
    })
  })
})
