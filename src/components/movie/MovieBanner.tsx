import { Play, Plus, Heart, Share2 } from "lucide-react";
import Button from "../common/Button";
import RatingBadge from "./RatingBadge";
import type { Movie } from "../../types/movie.types";
import { getBackdropUrl } from "../../utils/image";

interface MovieBannerProps {
  movie: Movie;
  isFavorite?: boolean;
  onToggleFavorite?: () => void;
}

const MovieBanner = ({
  movie,
  isFavorite,
  onToggleFavorite,
}: MovieBannerProps) => {
  return (
    <div className="relative rounded-2xl overflow-hidden my-12">
      {/* Backdrop */}
      <div className="aspect-video w-full h-64 sm:w-auto sm:h-auto sm:aspect-21/9 relative">
        <img
          src={getBackdropUrl(movie.backdrop_path)}
          alt={movie.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/50 to-transparent" />
      </div>

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-8">
        <div className="flex items-center gap-4 mb-4">
          <RatingBadge rating={movie.vote_average} size="lg" />
          {movie.status && (
            <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm">
              {movie.status}
            </span>
          )}
        </div>

        <h1 className="text-4xl font-bold text-white mb-2">{movie.title}</h1>

        {movie.tagline && (
          <p className="text-lg text-white/80 mb-4 italic">{movie.tagline}</p>
        )}

        <div className="hidden flex-wrap gap-3 sm:flex">
          <Button size="lg">
            <Play size={20} className="fill-current" />
            Watch Trailer
          </Button>
          <Button
            variant="secondary"
            size="lg"
            className="bg-white/20 text-white hover:bg-white/30 border border-white/20"
          >
            <Plus size={20} />
            Watchlist
          </Button>
          <Button
            variant="ghost"
            size="lg"
            className={`text-white hover:bg-white/20 ${isFavorite ? "text-red-400" : ""}`}
            onClick={onToggleFavorite}
          >
            <Heart size={20} className={isFavorite ? "fill-current" : ""} />
          </Button>
          <Button
            variant="ghost"
            size="lg"
            className="text-white hover:bg-white/20"
          >
            <Share2 size={20} />
          </Button>
        </div>

        <div className="flex flex-wrap gap-3 sm:hidden">
          <Button size="sm">
            <Play size={10} className="fill-current" />
            Watch Trailer
          </Button>
          <Button
            variant="secondary"
            size="sm"
            className="bg-white/20 text-white hover:bg-white/30 border border-white/20"
          >
            <Plus size={10} />
            Watchlist
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className={`text-white hover:bg-white/20 ${isFavorite ? "text-red-400" : ""}`}
            onClick={onToggleFavorite}
          >
            <Heart size={15} className={isFavorite ? "fill-current" : ""} />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="text-white hover:bg-white/20"
          >
            <Share2 size={15} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MovieBanner;
