export class AccessToken {
  constructor(private readonly _value: string) {}
  static get expirationInMs(): number {
    return 30 * 60 * 1000
  }
}
