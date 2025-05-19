export type MovieDetail = {
  id: number;
  title: string;
  overview: string;
  release_date: string;
  poster_path: string | null;
  backdrop_path: string | null;
  vote_average: number;
  runtime: number;
  genres: { id: number; name: string }[];
};
