import { Controller } from '@/application/controllers'
import { ExpressRouter } from '@/main/adapters'
import { getMockReq, getMockRes } from '@jest-mock/express'
import { mock, MockProxy } from 'jest-mock-extended'

describe('ExpressRouter', () => {
  it('should call handle with correct request', async () => {
    const req = getMockReq({ body: { any: 'any' } })
    const { res } = getMockRes()
    let controller: MockProxy<Controller>
    controller = mock()
    const sut = new ExpressRouter(controller)
    await sut.adapt(req, res)
    expect(controller.handle).toHaveBeenCalledWith({ any: 'any' })
  })

  it('should call handle with empty request', async () => {
    const req = getMockReq()
    const { res } = getMockRes()
    let controller: MockProxy<Controller>
    controller = mock()
    const sut = new ExpressRouter(controller)
    await sut.adapt(req, res)
    expect(controller.handle).toHaveBeenCalledWith({})
  })
})
