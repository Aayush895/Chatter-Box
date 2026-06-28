import { Router } from 'express';
import { healthRouterInstance } from './v0Routes/health.route.js';
const v0routerInstance = Router();

v0routerInstance.use('/v0', healthRouterInstance);

export { v0routerInstance };
