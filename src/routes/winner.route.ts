import { Router } from 'express';

import { WinnerController } from '../modules/winner/controllers/winner.controller'

const winnerController = new WinnerController();
const winnerRoutes = Router();

winnerRoutes.get('/getInterval', winnerController.getWinners.bind(winnerController));

export { winnerRoutes }