export interface IGetMovieWinners {
  producer: string;
  interval: number;
  previousWin: number;
  followingWin: number;
}

export interface IGetMovieWinnersResponse {
  min: IGetMovieWinners[];
  max: IGetMovieWinners[];
}