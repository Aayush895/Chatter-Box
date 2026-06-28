import { Router } from 'express';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { AppResonse } from '../../utils/Request_Response_Classes.js';
const healthRouterInstance = Router();

healthRouterInstance.get('/health-check', (_, res) => {
  res.json(new AppResonse(StatusCodes.OK, ReasonPhrases.OK, 'Server is up and Running'));
});

export { healthRouterInstance };
