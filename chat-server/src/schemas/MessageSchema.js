import { DataTypes } from 'sequelize';
import sequelize from '../config/databaseConfig.js';
import { User } from './Auth/AuthSchemas.js';

const Message = sequelize.define(
  'Message',
  {
    id: {
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      type: DataTypes.BIGINT,
    },
    senderId: {
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
    messageType: {
      type: DataTypes.ENUM('text', 'image', 'document'),
      allowNull: false,
      defaultValue: 'text',
    },
    content: {
      type: DataTypes.TEXT,
    },
    attachmentUrl: {
      type: DataTypes.STRING,
    },
    attachmentName: {
      type: DataTypes.STRING,
    },
  },
  {
    createdAt: true,
    updatedAt: false,
    indexes: [
      {
        fields: ['senderId', 'receiverId', 'createdAt'],
      },
    ],
  }
);

export { Message };
