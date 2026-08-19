import { DataTypes } from 'sequelize';
import sequelize from '../config/databaseConfig.js';
import { User } from './Auth/AuthSchemas.js';

// Schema for friendship table
const Friendship = sequelize.define(
  'Friendship',
  {
    id: {
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      type: DataTypes.BIGINT,
    },
    requesterId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: User,
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    receiverId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: User,
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    status: {
      type: DataTypes.ENUM('pending', 'accepted', 'blocked'),
      allowNull: false,
      defaultValue: 'pending',
    },
  },
  {
    createdAt: true,
    updatedAt: true,
    indexes: [
      {
        unique: true,
        fields: ['requesterId', 'receiverId'],
      },
    ],
  }
);

export { Friendship };
