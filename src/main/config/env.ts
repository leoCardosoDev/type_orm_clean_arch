export const env = {
  facebookApi: {
    clientId: process.env.FB_CLIENT_ID ?? '1522336918418448',
    clientSecret: process.env.FB_CLIENT_SECRET ?? 'b74f48fe1d137f7c6f9d44b7c54b5c46',
    accessToken:
      process.env.FB_ACCESS_TOKEN ??
      'EAAVojq9ANBABOzoJxnfjS5XPukX5TlY5D66uZAcNiZC2Uwhg9x3ZAZBCI9iNNcRDHY04yil8lvN9ZAoZBTAzAHL3MZCM6FlzYiiSTVrpZBC8xIe0QwJjpRmU3PfdMQv4mqElnPORaBMucjD38J055F47f0mBuR1qBZAV0Ghu1CiMlxgHjV1wqp3ar5BQbQ74Te2h2sK1EJBQ2b5soUeBbs0lYIlhgBQxtO8Akp2yqXPVSdpM3EeAHqs5LL6CVQdanIQZDZD'
  },
  port: process.env.PORT ?? 8080,
  jwtSecret: process.env.JWT_SECRET ?? 'gLr8tf2Wred'
}
