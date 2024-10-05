import './config/module-alias'
import { app } from '@/main/config/app'
import { env } from '@/main/config/env'
import 'reflect-metadata'
import { initializeDatabase } from './config/postgres/data-source' // Ajuste o caminho se necessário

// Inicializa o DataSource e, em caso de sucesso, inicia o servidor
initializeDatabase()
  .then(() => {
    app.listen(env.port, () => {
      console.log(`Server running at http://localhost:${env.port}`)
    })
  })
  .catch(err => {
    console.error('Error during Data Source initialization:', err)
    process.exit(1) // Opcional: termina o processo se a inicialização falhar
  })
