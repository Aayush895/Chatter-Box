import { Router } from 'express';
import { healthRouterInstance } from './v0Routes/health.route.js';
import { authRouterInstance } from './v0Routes/Auth/auth.route.js';
import { homeRouter } from './v0Routes/App/home.route.js';
const v0routerInstance = Router();

v0routerInstance.use('/v0', healthRouterInstance);
v0routerInstance.use('/v0', authRouterInstance);
v0routerInstance.use('/v0', homeRouter);
export { v0routerInstance };
