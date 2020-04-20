'use strict'
import { DataTypes, Model, Sequelize } from 'sequelize'

const scheme = {
  id: {
    primaryKey: true,
    type: DataTypes.INTEGER,
    autoIncrement: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  passwordSalt: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}

export class User extends Model {
  public id!: number
  public username!: string
  public password!: string
  public passwordSalt!: string
  public readonly createdAt!: Date
  public readonly updatedAt!: Date
}

export function initUser(sequelize: Sequelize) {
  User.init(scheme, { sequelize, tableName: 'users' })
}
