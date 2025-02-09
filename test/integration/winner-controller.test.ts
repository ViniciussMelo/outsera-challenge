import request from "supertest";

import { app } from "../../src/app";
import Movie from '../../src/modules/movies/models/movie';

jest.mock('../../src/modules/movies/models/movie', () => ({
  __esModule: true,
  default: {
    findAll: jest.fn().mockResolvedValueOnce(
      [
        { id: 1, studios: '', title: '', producers: 'Producer A', year: 2000, won: true },
        { id: 2, studios: '', title: '', producers: 'Producer A', year: 2002, won: true },
        { id: 3, studios: '', title: '', producers: 'Producer B', year: 2001, won: true },
        { id: 4, studios: '', title: '', producers: 'Producer B', year: 2004, won: true },
        { id: 5, studios: '', title: '', producers: 'Producer C', year: 2005, won: true },
      ].map(movie => ({
        ...movie,
        dataValues: movie,
        toJSON: jest.fn().mockReturnValue(movie),
      })) as unknown as InstanceType<typeof Movie>[]
    ),
  },
}));

const getIntervalRoute = '/winner/getInterval'

describe('WinnerController', () => {
  it("should be able to get the producer with the longest and shortest interval between two consecutive awards", async () => {
    const response = await request(app).get(getIntervalRoute);

    expect(response.status).toBe(200);
    expect(response.body).toStrictEqual(
      {
        "min": [
          {
            "producer": "Producer A",
            "interval": 2,
            "previousWin": 2000,
            "followingWin": 2002
          }
        ],
        "max": [
          {
            "producer": "Producer B",
            "interval": 3,
            "previousWin": 2001,
            "followingWin": 2004
          }
        ]
      }
    );
  })
})