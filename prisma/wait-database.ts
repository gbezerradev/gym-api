import { exec } from 'node:child_process'

function checkPostgres() {
  exec('docker exec postgres-dev pg_isready --host localhost', handleReturn)

  function handleReturn(error: Error | null) {
    if (error) {
      process.stdout.write('.')
      checkPostgres()
      return
    }

    console.log('\n🟢 Postgres está pronto!\n')
  }
}

process.stdout.write('\n\n🔴 Aguardando o Postgres iniciar...')
checkPostgres()
