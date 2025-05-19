"use client";
import { useEffect, useState } from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { getMovieById } from "@/services/movies/getMovieById";
import { MovieCard } from "@/components/MovieCard/MovieCard";

const MyFavoritesPage = () => {
  const [favorites] = useLocalStorage<number[]>("favorites", []);
  const [movies, setMovies] = useState<any[]>([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      const data = await Promise.all(favorites.map(getMovieById));
      setMovies(data);
    };

    fetchFavorites();
  }, [favorites]);

  return (
    <div className="container mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-6">My Favorite Movies</h1>
      {movies.length === 0 ? (
        <p className="text-zinc-500">No favorites yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {movies.map((movie) => (
            <MovieCard
              key={movie.id}
              id={movie.id}
              title={movie.title}
              overview={movie.overview}
              releaseDate={movie.release_date}
              rating={movie.vote_average}
              posterPath={movie.poster_path}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default MyFavoritesPage;
