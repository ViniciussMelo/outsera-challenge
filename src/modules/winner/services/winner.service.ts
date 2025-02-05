import { PrismaClient } from "@prisma/client"

import { IGetMovieWinners, IGetMovieWinnersResponse } from '../interfaces/get-movie-winners.interface'

const prisma = new PrismaClient();

export class WinnerService {
  private readonly MIN_WIN = 1;

  async getProducerStats(): Promise<IGetMovieWinnersResponse> {
    const producerWins = await this.getMovieWinners();

    const interval = this.calculateInterval(producerWins);

    return interval;
  }

  private calculateInterval(producerWins: Map<string, number[]>): IGetMovieWinnersResponse {
    let minInterval = Infinity;
    let maxInterval = -Infinity;
    const minIntervals: IGetMovieWinners[] = [];
    const maxIntervals: IGetMovieWinners[] = [];

    producerWins.forEach((years, producer) => {
      for (let i = 1; i < years.length; i++) {
        const previousWin = years[i - 1];
        const followingWin = years[i];

        const interval = followingWin - previousWin;

        if (interval < minInterval) {
          minInterval = interval;
          minIntervals.length = 0;
          minIntervals.push({ producer, interval, previousWin, followingWin });
        } else if (interval === minInterval) {
          minIntervals.push({ producer, interval, previousWin, followingWin });
        }

        if (interval > maxInterval) {
          maxInterval = interval;
          maxIntervals.length = 0;
          maxIntervals.push({ producer, interval, previousWin, followingWin });
        } else if (interval === maxInterval) {
          maxIntervals.push({ producer, interval, previousWin, followingWin });
        }
      }
    });

    return { 
      min: minIntervals.filter(({ interval }) => interval === minInterval), 
      max: maxIntervals.filter(({ interval }) => interval === maxInterval) 
    };
  }

  private async getMovieWinners(): Promise<Map<string, number[]>> {
    const winners = await prisma.movie.findMany({
      where: {
        won: true
      },
      orderBy: {
        year: 'asc'
      }
    });

    const producerWins = new Map<string, number[]>();

    winners.forEach(({producers, year}) => {
      const formattedProducers = producers.split('and ').join(', ').split(', ').map(p => p.trim());

      formattedProducers.forEach((producer) => {
        const formattedProducer = producer.trim();

        if (!producerWins.has(formattedProducer)) {
          producerWins.set(formattedProducer, []);
        }

        producerWins.get(formattedProducer)?.push(year);
      })
    });

    const wonMoreThanOnce = new Map<string, number[]>();;

    for (const [producer, years] of producerWins) {
      if (years.length > this.MIN_WIN) {
        wonMoreThanOnce.set(producer, years);
      }
    }

    return wonMoreThanOnce;
  }
}