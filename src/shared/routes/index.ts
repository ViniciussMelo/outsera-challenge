import { Router } from 'express';

import { winnerRoutes } from './winner.route';

const router = Router();

router.use('/winner', winnerRoutes);

export { router }