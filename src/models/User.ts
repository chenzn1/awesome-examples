'use strict'
import { DataTypes, Model } from 'sequelize'
import sequelize from '../drivers/sequelize'
class User extends Model {}
User.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    token: {
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
      field: 'password_salt',
    },
    createdAt: {
      type: DataTypes.DATE,
      field: 'created_at',
    },
    updatedAt: {
      type: DataTypes.DATE,
      field: 'updated_at',
    },
  },
  { sequelize, paranoid: false }
)
