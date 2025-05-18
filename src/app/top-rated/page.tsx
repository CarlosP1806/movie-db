"use client";

import React, { useEffect, useState } from "react";
import { getTopRatedMovies } from "@/services/movies/getTopRatedMovies";
import { MovieCard } from "@/components/MovieCard/MovieCard";
import { PaginationControls } from "@/components/PaginationControls/PaginationControls";

const TopRatedPage = () => {
  const [loading, setLoading] = useState(false);
  const [movies, setMovies] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchTopRatedMovies = async () => {
      setLoading(true);
      try {
        // simulate delay (optional)
        await new Promise((resolve) => setTimeout(resolve, 500));

        const data = await getTopRatedMovies(page);
        setMovies(data.results);
        setTotalPages(data.total_pages || 1);
      } catch (err) {
        console.error("Error loading movies: ", err);
      }
      setLoading(false);
    };

    fetchTopRatedMovies();
  }, [page]);

  const handlePrev = () => {
    setPage((p) => Math.max(p - 1, 1));
  };

  const handleNext = () => {
    setPage((p) => Math.min(p + 1, totalPages));
  };

  return (
    <div className="container mx-auto px-6 py-10">
      <h2 className="text-2xl font-semibold tracking-tight text-zinc-800 dark:text-white mb-6">
        Top Rated Movies
      </h2>

      {loading ? (
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          Loading top-rated movies...
        </p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 mb-6">
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

          <PaginationControls
            page={page}
            totalPages={totalPages}
            onPrev={handlePrev}
            onNext={handleNext}
          />
        </>
      )}
    </div>
  );
};

export default TopRatedPage;
