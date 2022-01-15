#!/usr/bin/env node
/* eslint no-unreachable: "off" */

/**
 * Module dependencies.
 */
import moduleAlias from 'module-alias'
import fs from 'fs'
import path from 'path'

function addModulesAlias() {
  const srcOrDist = 'src'

  const aliasDirs = fs.readdirSync(__dirname)
  const aliasMap = {
    '@': path.join(__dirname, '..', srcOrDist),
  }
  for (const aliasDir of aliasDirs) {
    if (!/.+\.ts/.test(aliasDir)) {
      aliasMap[aliasDir] = path.join(__dirname, '..', srcOrDist, aliasDir)
    }
  }
  moduleAlias.addAliases(aliasMap)
}
addModulesAlias()

import http from 'http'
import logger from './utils/logger'
import { createTerminus } from '@godaddy/terminus'
import app from './app'
import umzug from './drivers/umzug'
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
  const apiServer = await app.createAPIServer()

  /**
   * Get port from environment and store in Express.
   */

  const port = normalizePort(process.env.PORT || '8080')
  apiServer.set('port', port)

  /**
   * Create HTTP server.
   */

  const server = http.createServer(apiServer)

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

  server.on('error', (error: Error) => {
    const bind = typeof port === 'string' ? `Pipe ${port}` : `Port ${port}`

    // handle specific listen errors with friendly messages
    switch (error.name) {
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
    onSignal: async () => {
      logger.info('going to close the server...')
      // const sequelize = require('./drivers/sequelize')
      // return Promise.all([sequelize.close()])
    },
    onShutdown: async () => {
      logger.info('teardown process finished, ready to close server...')
      return
    },
  })
}

/**
 * run the main function to start the app
 */
main()
