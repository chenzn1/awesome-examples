const path = require('path')

module.exports = {
  database: {
    database: 'hodgepodge',
    username: 'root',
    password: '',
    logging: false,
    define: {
      charset: 'utf8mb4',
      collate: 'utf8mb4_unicode_ci',
      underscored: true,
      underscoredAll: true,
      timestamps: true,
      paranoid: true,
    },
    dialect: 'mysql',
    port: 3306,
    host: '',
    operatorsAliases: false,
  }
}
