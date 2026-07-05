import { Router } from 'express';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { AppResponse } from '../../utils/Request_Response_Classes.js';
const healthRouterInstance = Router();

healthRouterInstance.get('/health-check', (_, res) => {
  res.json(new AppResponse(StatusCodes.OK, ReasonPhrases.OK, 'Server is up and Running'));
});

export { healthRouterInstance };
