import { DataSource } from 'typeorm'

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'leonardodeoliveirasilva',
  password: '123456789',
  database: 'advanced_node',
  entities: ['dist/infra/repository/postgres/entities/index.js']
})

export async function initializeDatabase() {
  await AppDataSource.initialize()
  console.log('INICIANDO DATABASE')
}
