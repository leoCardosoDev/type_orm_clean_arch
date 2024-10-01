import { Controller } from '@/application/controllers'
import { Request, Response } from 'express'

export class ExpressRouter {
  constructor(private readonly _controller: Controller) {}
  async adapt(req: Request, _res: Response): Promise<void> {
    await this._controller.handle({ ...req.body })
  }
}
