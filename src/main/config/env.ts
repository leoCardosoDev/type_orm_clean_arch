export const env = {
  facebookApi: {
    clientId: process.env.FB_CLIENT_ID ?? '1522336918418448',
    clientSecret: process.env.FB_CLIENT_SECRET ?? 'b74f48fe1d137f7c6f9d44b7c54b5c46',
    accessToken:
      process.env.FB_ACCESS_TOKEN ??
      'EAAVojq9ANBABO9kKUanylqVCMk0vZAS8ugqokSOfqbKZCNjuk1j15xMzZCiQ1VSKuDiTRH8RmeLUXXsdIDGMjwVEgO2YEvoi72niszjsIFK7QFLA1aZBlo9XWDTyIQZA6a3wFz84dv7qZBhqRvZB57H8Ml3MevAzCtO6tHZAJQuj1BLlKjBBE3TZAqk6IMVpkev37Yu75PojNy3YvxYVLwZCA1IZB5h9HrnI8QuBbc8gs3yONZBKp1ZCjigAsnN7YmaisZCmsZD'
  },
  port: process.env.PORT ?? 8080,
  jwtSecret: process.env.JWT_SECRET ?? 'gLr8tf2Wred'
}
