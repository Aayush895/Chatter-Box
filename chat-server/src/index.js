import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { CORSCONFIG, PORT } from './config/serverConfig.js';
import logger from '../logger.js';
import { v0routerInstance } from './routes/index.route.js';
// Setup a basic express server
const app = express();

app.use(cors(CORSCONFIG));

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

// Routes
app.use('/api', v0routerInstance);

app.listen(PORT, () => {
  console.log(`Server is up and running on port: ${PORT}`);
});
