import { DataTypes } from 'sequelize';
import sequelize from '../../config/databaseConfig.js';

const User = sequelize.define(
  'User',
  {
    id: {
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      type: DataTypes.BIGINT,
    },
    userName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    avatarUrl: {
      type: DataTypes.STRING,
    },
    isUserActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    lastSeen: {
      type: DataTypes.DATE,
    },
  },
  {
    createdAt: true,
    updatedAt: true,
  }
);

export { User };
