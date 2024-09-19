import { AxiosHttpCLient } from '@/infra/gateways'

import axios from 'axios'

jest.mock('axios')

describe('AxiosHttpClient', () => {
  let sut: AxiosHttpCLient
  let fakeAxios: jest.Mocked<typeof axios>
  let url: string
  let params: object

  beforeAll(() => {
    fakeAxios = axios as jest.Mocked<typeof axios>
    url = 'any_url'
    params = { any: 'any' }
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
  })
})
