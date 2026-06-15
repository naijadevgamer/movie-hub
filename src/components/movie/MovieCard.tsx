import { Link } from "react-router-dom";
import RatingBadge from "./RatingBadge";
import type { Movie } from "../../types/movie.types";
import { getImageUrl } from "../../utils/image";
import { getYear } from "../../utils/date";

interface MovieCardProps {
  movie: Movie;
  isSimilarMovie?: Boolean;
  className?: string;
}

const MovieCard = ({ movie, className, isSimilarMovie }: MovieCardProps) => {
  const placeholderImage = `https://placehold.co/300x450/1e293b/64748b?text=${encodeURIComponent(movie.title)}`;

  return (
    <Link
      to={`/movie/${movie.id}`}
      className={`group block rounded-xl ${className}`}
    >
      <div className="relative overflow-hidden">
        {/* Poster */}
        <div className="aspect-2/3 bg-slate-200 overflow-hidden rounded-xl relative ">
          <img
            src={getImageUrl(movie.poster_path, "w342")}
            alt={movie.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            loading="lazy"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = placeholderImage;
            }}
          />

          {/* Overlay Gradient */}
          <div
            className={`absolute inset-0 bg-linear-to-t group-hover:opacity-100 transition-opacity duration-300 ${isSimilarMovie ? "opacity-100 from-black/80 via-black/60 to-transparent" : "from-black/80 via-transparent opacity-0 to-transparent"}`}
          />

          {/* Rating Badge */}
          <div className="absolute top-2 right-2">
            <RatingBadge rating={movie.vote_average} />
          </div>

          {isSimilarMovie && (
            <h3 className="absolute bottom-0 w-full  text-background text-lg  font-bold flex items-center justify-center text-center p-3">
              {movie.title}
            </h3>
          )}
        </div>

        {/* Info */}
        {!isSimilarMovie && (
          <div className="mt-3 px-1">
            <h3 className="font-bold text-lg text-foreground truncate group-hover:text-primary transition-colors">
              {movie.title}
            </h3>
            <p className="text-sm text-muted font-medium mt-1">
              {getYear(movie.release_date)}
            </p>
          </div>
        )}
      </div>
    </Link>
  );
};

export default MovieCard;
