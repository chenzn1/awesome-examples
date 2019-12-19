// const Hospital = require('./Hospital')
// module.exports = { Hospital }
const fs = require('fs')
const path = require('path')
const sequelize = require('../drivers/sequelize')

const db = {}
const basename = path.basename(module.filename)

fs.readdirSync(__dirname)
  .filter(
    file => file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js'
  )
  .forEach(file => {
    const filePath = path.join(__dirname, file)
    const model = sequelize.import(filePath)
    db[model.name] = model
  })

// Creating associations in sequelize
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db)
  }
})

// add sequelize instance
db.sequelize = sequelize

module.exports = db
