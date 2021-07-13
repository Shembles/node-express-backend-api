import { Router } from 'express';

import sims from './sim-cards.routes.js';
import orders from './orders.routes.js';
import order from './orders.routes.js';
import orderList from './orders.routes.js';

let rootRouter = Router();

rootRouter.use('/sim-cards', sims);
rootRouter.use('/orders', orders);
rootRouter.use('/orders', order);
rootRouter.use('/orders?page=:page&limit=:limit', orderList);

export default rootRouter;