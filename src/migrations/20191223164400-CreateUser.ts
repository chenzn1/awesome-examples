'use strict'

const TABLE_NAME = 'users'

export default {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      TABLE_NAME,
      {
        id: {
          type: Sequelize.INTEGER.UNSIGNED,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
        nickname: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        username: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        createdAt: {
          type: Sequelize.DATE,
          field: 'created_at',
          allowNull: false,
        },
        updatedAt: {
          type: Sequelize.DATE,
          field: 'updated_at',
          allowNull: false,
        },
        deletedAt: {
          type: Sequelize.DATE,
          field: 'deleted_at',
        },
        version: {
          type: Sequelize.INTEGER,
          allowNull: false,
          defaultValue: 0,
        },
      },
      {
        charset: 'utf8mb4',
        collate: 'utf8mb4_unicode_ci',
      }
    )
  },
  down: queryInterface => {
    return queryInterface.dropTable(TABLE_NAME)
  },
}
