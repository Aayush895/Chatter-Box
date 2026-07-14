import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import sequelize from './config/databaseConfig.js';
import { CORSCONFIG, PORT } from './config/serverConfig.js';
import logger from '../logger.js';
import { v0routerInstance } from './routes/index.route.js';
// Setup a basic express server
const app = express();

app.use(cors(CORSCONFIG));
app.use(cookieParser());
// logger configurations
const morganFormat = ':method :url :status :response-time ms';

app.use(
  morgan(morganFormat, {
    stream: {
      write: message => {
        const logObject = {
          method: message.split(' ')[0],
          url: message.split(' ')[1],
          status: message.split(' ')[2],
          responseTime: message.split(' ')[3],
        };
        logger.info(JSON.stringify(logObject));
      },
    },
  })
);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Routes
app.use('/api', v0routerInstance);

app.listen(PORT, async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }

  console.log(`Server is up and running on port: ${PORT}`);
});
