import http from 'http'

import app from './app'

const server = http.createServer(app)

const
  PORT = app.get('port'),
  ENV = app.get('env')
server.listen(PORT, () => console.log(`Server up on ${PORT} in ${ENV} mode`))

if (require.main != module) { module.exports = server }