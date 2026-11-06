import { Router } from 'express';
import { healthRouterInstance } from './v0Routes/health.route.js';
import { authRouterInstance } from './v0Routes/Auth/auth.route.js';
import { homeRouter } from './v0Routes/App/home.route.js';
import { chatRouter } from './v0Routes/App/chats.route.js';

const v0routerInstance = Router();

v0routerInstance.use('/v0', healthRouterInstance);
v0routerInstance.use('/v0', authRouterInstance);
v0routerInstance.use('/v0', homeRouter);
v0routerInstance.use('/v0', chatRouter);

export { v0routerInstance };
