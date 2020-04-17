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
  token: {
    type: DataTypes.STRING,
    allowNull: true,
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

export default class User extends Model {
  public id!: number
  public username!: string
  public token!: string | null
  public password!: string
  public passwordSalt!: string
  public readonly createdAt!: Date
  public readonly updatedAt!: Date
  public static init2(sequelize: Sequelize) {
    //sequelize.models
    this.init(scheme, { sequelize, tableName: 'users' })
  }
}
