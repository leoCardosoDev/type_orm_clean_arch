import { Controller } from '@/application/controllers'
import { Request, Response } from 'express'

export class ExpressRouter {
  constructor(private readonly _controller: Controller) {}
  async adapt(req: Request, res: Response): Promise<void> {
    const httpResponse = await this._controller.handle({ ...req.body })
    if (httpResponse.statusCode === 200) {
      res.status(200).json(httpResponse.data)
    } else {
      res.status(400).json({ error: httpResponse.data.message })
    }
  }
}
