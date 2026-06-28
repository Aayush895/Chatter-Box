import { Router } from 'express';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
const healthRouterInstance = Router();

healthRouterInstance.get('/health-check', (_, res) => {
  res.json({
    status: StatusCodes.OK,
    message: ReasonPhrases.OK,
    description: 'Server is up and Running',
    error: '',
  });
});

export {healthRouterInstance}