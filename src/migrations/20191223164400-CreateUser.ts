'use strict'
import { QueryInterface, DataTypes } from 'sequelize'

const TABLE_NAME = 'users'

export default {
  up: (queryInterface: QueryInterface) => {
    return queryInterface.createTable(
      TABLE_NAME,
      {
        id: {
          type: DataTypes.INTEGER.UNSIGNED,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
        username: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
        },
        password: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        passwordSalt: {
          type: DataTypes.STRING,
          allowNull: false,
          field: 'password_salt',
        },
        token: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        createdAt: {
          type: DataTypes.DATE,
          field: 'created_at',
          allowNull: false,
        },
        updatedAt: {
          type: DataTypes.DATE,
          field: 'updated_at',
          allowNull: false,
        },
        deletedAt: {
          type: DataTypes.DATE,
          field: 'deleted_at',
        },
        version: {
          type: DataTypes.INTEGER,
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
  down: (queryInterface: QueryInterface) => {
    return queryInterface.dropTable(TABLE_NAME)
  },
}
