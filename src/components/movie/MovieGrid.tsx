import MovieCard from "./MovieCard";
import type { Movie } from "../../types/movie.types";

interface MovieGridProps {
  movies: Movie[];
  className?: string;
}

const MovieGrid = ({ movies, className }: MovieGridProps) => {
  return (
    <div
      className={`grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 ${className || ""}`}
    >
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
};

export default MovieGrid;
