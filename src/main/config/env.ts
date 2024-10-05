export const env = {
  facebookApi: {
    clientId: process.env.FB_CLIENT_ID ?? '1522336918418448',
    clientSecret: process.env.FB_CLIENT_SECRET ?? 'b74f48fe1d137f7c6f9d44b7c54b5c46',
    accessToken:
      process.env.FB_ACCESS_TOKEN ??
      'EAAVojq9ANBABO0MldBZCTpPcdntfO3uNC0c8JCjKFNpQc893TD81BwpHffTWZBU6m6TBoN2HLDUL9LZASiiaq7UsEoJ0zfxyJ2qhd12MZBXZAybZCjvPAeJdnHpbEiBba5BspzBzFwsZAFCPEqBnEVVLN7gMtTlTxNNvFVz9HhMeCdWXM3eV5xFZB3l2ZCrKa5DHYm1A1xQj61Pp6cnxGjQ03FnpV5XAZD'
  },
  port: process.env.PORT ?? 8080,
  jwtSecret: process.env.JWT_SECRET ?? 'gLr8tf2Wred'
}
