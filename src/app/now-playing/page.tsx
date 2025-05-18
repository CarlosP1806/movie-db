"use client";
import React, { useEffect, useState } from "react";
import { getNowPlayingMovies } from "@/services/movies/getNowPlayingMovies";
import { MovieCard } from "@/components/MovieCard/MovieCard";
import { PaginationControls } from "@/components/PaginationControls/PaginationControls";

const NowPlayingPage = () => {
  const [loading, setLoading] = useState(false);
  const [movies, setMovies] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchNowPlayingMovies = async (pageNumber: number) => {
    setLoading(true);
    try {
      const data = await getNowPlayingMovies(pageNumber);
      setMovies(data.results);
      setTotalPages(data.total_pages);
    } catch (err) {
      console.error("Error loading movies: ", err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchNowPlayingMovies(page);
  }, [page]);

  const handlePrev = () => {
    if (page > 1) setPage(page - 1);
  };

  const handleNext = () => {
    if (page < totalPages) setPage(page + 1);
  };

  return (
    <div className="container mx-auto px-6 py-10">
      <h2 className="text-2xl font-semibold tracking-tight text-zinc-800 dark:text-white mb-6">
        Now Playing
      </h2>

      {loading ? (
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          Loading movies...
        </p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
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

export default NowPlayingPage;
