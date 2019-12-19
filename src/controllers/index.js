const _ = require('lodash')
const path = require('path')
const swaggerHelper = require('../helpers/swaggerHelper')
const swagger = require('../middlewares/swagger')

const allControllers = {
  hospitalController: require('./hospitalController'),
  adminController: require('./adminController'),
  departmentController: require('./departmentController'),
  doctorController: require('./doctorController'),
  patientController: require('./patientController'),
  patientHealthFileController: require('./patientHealthFileController'),
  imageController: require('./imageController'),
  doctorPatientMessageController: require('./doctorPatientMessageController'),
  orderController: require('./orderController'),
  doctorWithdrawalController: require('./doctorWithdrawalController'),
  consultationMessageController: require('./consultationMessageController'),
}

module.exports = async function(extra = []) {
  // generate swagger config
  const swaggerConfig = await swaggerHelper.generateSwaggerConfig(
    '/api/v1.0',
    path.join(__dirname, 'swagger.yaml'),
    allControllers
  )
  // generate middlewares
  return swagger.generateMiddlewares(swaggerConfig, extra)
}
