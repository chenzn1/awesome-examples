import _ from 'lodash'
import path from 'path'
import swaggerHelper from '@/utils/swagger.helper'
import swagger from 'middlewares/swagger'
import userController from './user.controller'
const allControllers = {
  userController,
}

export default async function(extra = []) {
  // generate swagger config
  const swaggerConfig = await swaggerHelper.generateSwaggerConfig(
    '/api/v1.0',
    path.join(__dirname, 'swagger.yaml'),
    allControllers
  )
  // generate middlewares
  return swagger.generateMiddlewares(swaggerConfig, extra)
}
