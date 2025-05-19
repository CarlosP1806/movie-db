"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Heart, HeartOff } from "lucide-react";
import { getMovieById } from "@/services/movies/getMovieById";
import Image from "next/image";
import { getSimilarMoviesById } from "@/services/movies/getSimilarMoviesById";
import { MovieCard } from "@/components/MovieCard/MovieCard";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { MovieDetail } from "@/lib/types";

const MovieDetailsPage = () => {
  const router = useRouter();
  const params = useParams();
  const movieId = params?.id as string;

  const [movie, setMovie] = useState<MovieDetail | null>(null);
  const [similarMovies, setSimilarMovies] = useState<MovieDetail[]>([]);
  const [loading, setLoading] = useState(false);

  const [favorites, setFavorites] = useLocalStorage<number[]>("favorites", []);
  const isFavorite = favorites.includes(Number(movieId));

  useEffect(() => {
    if (!movieId) return;

    const fetchDetails = async () => {
      setLoading(true);
      const data = await getMovieById(Number(movieId));
      const similar = await getSimilarMoviesById(Number(movieId));
      setSimilarMovies(similar || []);
      setMovie(data);
      setLoading(false);
    };

    fetchDetails();
  }, [movieId]);

  const toggleFavorite = () => {
    const id = Number(movieId);
    if (favorites.includes(id)) {
      setFavorites(favorites.filter((fid) => fid !== id));
    } else {
      setFavorites([...favorites, id]);
    }
  };

  if (loading) return <p className="p-10">Loading movie details...</p>;
  if (!movie) return <p className="p-10 text-red-500">No movie found.</p>;

  return (
    <div className="container mx-auto px-6 py-10">
      <button
        onClick={() => router.back()}
        className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline mb-8"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back
      </button>

      <div className="grid md:grid-cols-3 gap-10">
        <div>
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className="w-full rounded-xl shadow-xl"
          />
        </div>

        <div className="col-span-2 flex flex-col justify-center space-y-6">
          <h1 className="text-4xl font-bold text-zinc-900 dark:text-white">
            {movie.title}
          </h1>
          <button
            onClick={toggleFavorite}
            className="text-red-500 hover:text-red-700 transition cursor-pointer"
            title={isFavorite ? "Remove from favorites" : "Add to favorites"}
          >
            {isFavorite ? (
              <HeartOff className="w-6 h-6" />
            ) : (
              <Heart className="w-6 h-6" />
            )}
          </button>
          <p className="text-zinc-700 dark:text-zinc-300 text-lg">
            {movie.overview}
          </p>

          <div className="grid sm:grid-cols-2 gap-4 text-zinc-600 dark:text-zinc-400 text-sm">
            <p>
              <strong className="text-zinc-800 dark:text-white">
                Release Date:
              </strong>{" "}
              {movie.release_date}
            </p>
            <p>
              <strong className="text-zinc-800 dark:text-white">Rating:</strong>{" "}
              {movie.vote_average}
            </p>
            {movie.runtime && (
              <p>
                <strong className="text-zinc-800 dark:text-white">
                  Runtime:
                </strong>{" "}
                {movie.runtime} min
              </p>
            )}
            {movie.genres && (
              <p>
                <strong className="text-zinc-800 dark:text-white">
                  Genres:
                </strong>{" "}
                {movie.genres.map((g: any) => g.name).join(", ")}
              </p>
            )}
          </div>
        </div>
      </div>

      <section className="mt-16">
        <h2 className="text-2xl font-semibold mb-6 text-zinc-900 dark:text-white">
          Similar Movies
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {similarMovies.slice(0, 3).map((sm) => (
            <MovieCard
              key={sm.id}
              id={sm.id}
              title={sm.title}
              overview={sm.overview}
              releaseDate={sm.release_date}
              rating={sm.vote_average}
              posterPath={sm.poster_path ?? ""}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default MovieDetailsPage;
