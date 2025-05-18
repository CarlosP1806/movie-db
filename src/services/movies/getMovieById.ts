import api from "../api";

export const getMovieById = async (movieId: number) => {
  let res: any;
  const endpoint = `/movie/${movieId}?language=en-US`;
  await api
    .get(endpoint)
    .then((data) => {
      res = data.data;
    })
    .catch((err) => {
      res = err.response;
    });
  return res;
};
