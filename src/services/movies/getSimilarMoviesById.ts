import api from "../api";

export const getSimilarMoviesById = async (movieId: number) => {
  let res: any;
  const endpoint = `/movie/${movieId}/similar?language=en-US&page=1`;
  await api
    .get(endpoint)
    .then((data) => {
      res = data.data.results.slice(0, 3); // solo las primeras 3
    })
    .catch((err) => {
      res = err.response;
    });
  return res;
};
