import { Request, Response } from 'express'
import { WinnerService } from '../services/winner.service';

export class WinnerController {
  private winnerService: WinnerService;

  constructor() {
    this.winnerService = new WinnerService();
  }

  async getWinners(req: Request, res: Response) {
    const interval = await this.winnerService.getProducerStats();

    return res.json(interval).status(200).end();
  }
}