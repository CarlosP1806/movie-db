"use client";

import { useEffect, useState } from "react";
import { MovieCard } from "@/components/MovieCard/MovieCard";
import { getHomeMovies } from "@/services/movies/getHomeMovies";
import { useRouter } from "next/navigation";

export default function Home() {
  const [movies, setMovies] = useState<{
    upcoming: any[];
    nowPlaying: any[];
    trending: any[];
    randomMovie: any;
  }>({
    upcoming: [],
    nowPlaying: [],
    trending: [],
    randomMovie: null,
  });

  const router = useRouter();

  useEffect(() => {
    const fetchMovies = async () => {
      const data = await getHomeMovies();
      setMovies(data);
    };

    fetchMovies();
  }, []);

  const hero = movies.randomMovie;

  return (
    <div className="w-full">
      {hero && (
        <section
          onClick={() => {
            router.push(`/movie/${hero.id}`);
          }}
          className="relative h-[75vh] flex items-end bg-cover bg-center text-white cursor-pointer"
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/original${hero.backdrop_path})`,
          }}
        >
          <div className="w-full h-full absolute bg-gradient-to-t from-zinc-950 via-zinc-900/70 z-10" />
          <div className="container mx-auto px-6 pb-16 z-20">
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4 drop-shadow-xl">
              {hero.title}
            </h1>
            <p className="max-w-2xl text-lg text-zinc-300 drop-shadow-lg">
              {hero.overview}
            </p>
          </div>
        </section>
      )}

      <div className="container mx-auto px-6 py-12 space-y-16">
        <Section title="Trending Today" movies={movies.trending} />
        <Divider />
        <Section title="Now Playing" movies={movies.nowPlaying} />
        <Divider />
        <Section title="Upcoming Releases" movies={movies.upcoming} />
      </div>
    </div>
  );
}

const Section = ({ title, movies }: { title: string; movies: any[] }) => (
  <section>
    <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-zinc-900 dark:text-white">
      {title}
    </h2>
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
      {movies.slice(0, 4).map((movie) => (
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
  </section>
);

const Divider = () => (
  <hr className="border-t border-zinc-300/20 dark:border-zinc-700/40 my-8" />
);
