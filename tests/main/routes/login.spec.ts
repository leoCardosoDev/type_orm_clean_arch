import { app } from '@/main/config/app'
import { IBackup } from 'pg-mem'
import { DataSource } from 'typeorm'
import request from 'supertest'
import { makeFakeConnection, makeFakeDb } from '@/tests/infra/repository/postgres/mocks'
import { UnauthorizedError } from '@/application/errors'

describe('Login Routes', () => {
  describe('POST - LOGIN', () => {
    let connection: DataSource
    let backup: IBackup
    const loadUserSpy = jest.fn()
    const loadAccountSpy = jest.fn()
    const saveWithFacebookSpy = jest.fn()

    jest.mock('@/infra/apis/facebook-api', () => ({
      FacebookApi: jest.fn().mockReturnValue({
        loadUser: loadUserSpy
      })
    }))

    jest.mock('@/infra/repository/postgres/user-account', () => ({
      PgUserAccountRepository: jest.fn().mockImplementation(() => ({
        load: loadAccountSpy,
        saveWithFacebook: saveWithFacebookSpy
      }))
    }))

    beforeAll(async () => {
      const db = await makeFakeDb()
      connection = await makeFakeConnection(db, [])
      backup = db.backup()
    })

    afterAll(async () => {
      if (connection?.isInitialized) {
        await connection.destroy()
      }
    })

    beforeEach(() => {
      backup.restore()
    })

    it('should return 200 with AccessToken', async () => {
      loadUserSpy.mockResolvedValueOnce({ facebookId: 'any_id', name: 'any_name', email: 'any_email' })
      loadAccountSpy.mockResolvedValueOnce({ id: 'any_account_id', name: 'valid_name' })
      saveWithFacebookSpy.mockResolvedValueOnce({ id: 'any_account_id' })

      const { status, body } = await request(app).post('/api/login/facebook').send({ token: 'valid_token' })
      expect(status).toBe(200)
      expect(body.accessToken).toBeDefined()
    })

    it('should return 401 with UnauthorizedError', async () => {
      const { status, body } = await request(app).post('/api/login/facebook').send({ token: 'invalid_token' })
      expect(status).toBe(401)
      expect(body.error).toBe(new UnauthorizedError().message)
    })
  })
})
