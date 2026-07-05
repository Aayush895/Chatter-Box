import { Router } from 'express';
import { healthRouterInstance } from './v0Routes/health.route.js';
import { authRouterInstance } from './v0Routes/Auth/auth.route.js';
const v0routerInstance = Router();

v0routerInstance.use('/v0', healthRouterInstance);
v0routerInstance.use('/v0', authRouterInstance);
export { v0routerInstance };
