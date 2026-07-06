import { Sequelize } from 'sequelize';
import { DB_URI } from './serverConfig.js';
import { customDatabaseLogger } from '../utils/customDatabaseLogger.js';

const dbLogger = customDatabaseLogger();
const sequelize = new Sequelize(DB_URI, {
  dialect: 'mysql',
  ssl: true,
  benchmark: true,
  logging: function (message, queryDuration) {
    dbLogger.info({ message, duration: queryDuration });
  },
});

export default sequelize;
