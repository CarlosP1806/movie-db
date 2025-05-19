import { MovieDetail } from "@/lib/types";
import api from "../api";

export const getHomeMovies = async () => {
  let upcoming: MovieDetail[] = [];
  let nowPlaying: MovieDetail[] = [];
  let trending: MovieDetail[] = [];
  let randomMovie: MovieDetail | null = null;

  const endpoints = {
    upcoming: "/movie/upcoming?language=en-US&page=1",
    nowPlaying: "/movie/now_playing?language=en-US&page=1",
    trending: "/trending/movie/day?language=en-US",
  };

  await api
    .get(endpoints.upcoming)
    .then((data) => {
      upcoming = data.data.results;
    })
    .catch((err) => {
      console.error("Error fetching upcoming movies:", err);
    });

  await api
    .get(endpoints.nowPlaying)
    .then((data) => {
      nowPlaying = data.data.results;
    })
    .catch((err) => {
      console.error("Error fetching now playing movies:", err);
    });

  await api
    .get(endpoints.trending)
    .then((data) => {
      trending = data.data.results;
    })
    .catch((err) => {
      console.error("Error fetching trending movies:", err);
    });

  const firstPageRes = await api.get("/movie/top_rated?language=en-US&page=1");
  const totalPages = firstPageRes.data.total_pages;
  const randomPage = Math.floor(Math.random() * totalPages) + 1;
  const randomPageRes = await api.get(
    `/movie/top_rated?language=en-US&page=${randomPage}`
  );
  const moviesOnPage = randomPageRes.data.results;
  const randomIndex = Math.floor(Math.random() * moviesOnPage.length);
  randomMovie = moviesOnPage[randomIndex];

  return {
    upcoming,
    nowPlaying,
    trending,
    randomMovie,
  };
};
