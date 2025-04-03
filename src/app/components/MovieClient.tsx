"use client";

import { useState } from "react";
import MovieCard from "./MovieCard";
import { Movie } from "../models/MovieBasic";

export default function MovieClient({ initialMovies }) {
  // Use initialMovies from server as the default state
  const [movies, setMovies] = useState(initialMovies || []);
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {movies.length > 0 ? (
        movies.map((movie: Movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))
      ) : (
        <p>No movies found</p>
      )}
    </div>
  );
}