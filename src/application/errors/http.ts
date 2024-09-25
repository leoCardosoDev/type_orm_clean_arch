export class ServerError extends Error {
  constructor(error?: Error) {
    super('Server fai8led. Try again soon')
    this.name = 'ServerError'
    this.stack = error?.stack
  }
}
