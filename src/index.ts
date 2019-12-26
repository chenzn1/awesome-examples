#!/usr/bin/env node
/* eslint no-unreachable: "off" */

/**
 * Module dependencies.
 */
const http = require('http')
const logger = require('./helpers/logger')
const { createTerminus } = require('@godaddy/terminus')
const umzug = require('./drivers/umzug')

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val: string): any {
  const port = parseInt(val, 10)

  if (isNaN(port)) {
    // named pipe
    return val
  }

  if (port >= 0) {
    // port number
    return port
  }

  return 8080
}

async function main() {
  await umzug.umzugUp()
  const app = await require('./app').createApiServer()

  /**
   * Get port from environment and store in Express.
   */

  const port = normalizePort(process.env.PORT || '8080')
  app.set('port', port)

  /**
   * Create HTTP server.
   */

  const server = http.createServer(app)

  /**
   * Listen on provided port, on all network interfaces.
   */

  server.listen(port, () => {
    const addr = server.address()
    const bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr.port}`
    logger.info(`Listening on ${bind}`)
    if (process.send) {
      process.send('ready') // notify PM2
    }
  })

  server.on('error', error => {
    if (error.syscall !== 'listen') {
      throw error
    }

    const bind = typeof port === 'string' ? `Pipe ${port}` : `Port ${port}`

    // handle specific listen errors with friendly messages
    switch (error.code) {
      case 'EACCES':
        logger.error(`${bind} requires elevated privileges`)
        process.exit(1)
        break
      case 'EADDRINUSE':
        logger.error(`${bind} is already in use`)
        process.exit(1)
        break
      default:
        throw error
    }
  })

  // listen stop signals & handle server down gracefully
  createTerminus(server, {
    timeout: 5000,
    signals: ['SIGINT', 'SIGTERM', 'SIGHUP'],
    logger: err => {
      logger.error(err)
    },
    onSignal: () => {
      logger.info('going to close the server...')
      const sequelize = require('./drivers/sequelize')
      return Promise.all([sequelize.close()])
    },
    onShutdown: () => {
      logger.info('teardown process finished, ready to close server...')
    },
  })
}

/**
 * run the main function to start the app
 */
main()
