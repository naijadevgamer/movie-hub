import { ArrowLeft, Heart } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../components/common/Button";
import ErrorState from "../components/common/ErrorState";
import { MovieDetailsSkeleton } from "../components/common/LoadingSkeleton";
import MovieBanner from "../components/movie/MovieBanner";
import MovieMeta from "../components/movie/MovieMeta";
import RatingBadge from "../components/movie/RatingBadge";
import SimilarMovies from "../components/movie/SimilarMovies";
import { useMovieDetails } from "../hooks/useMovieDetails";
import { formatRuntime, getYear } from "../utils/date";
import { getImageUrl } from "../utils/image";

const MovieDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const {
    data: movie,
    isLoading,
    isError,
    refetch,
  } = useMovieDetails(Number(id));

  const navigate = useNavigate();

  console.log(movie);

  const [isFavorite, setIsFavorite] = useState(false);

  // Check if movie is in favorites on mount
  useEffect(() => {
    const favorites = JSON.parse(
      localStorage.getItem("movie-favorites") || "[]",
    );
    setIsFavorite(favorites.includes(Number(id)));
  }, [id]);

  // Get certification from release_dates
  const getCertification = (): string => {
    const usRelease = movie.release_dates?.results?.find(
      (r) => r.iso_3166_1 === "US",
    );
    if (usRelease?.release_dates?.length) {
      // Find the first certification that's not empty
      const cert = usRelease.release_dates.find(
        (rd) => rd.certification && rd.certification.trim() !== "",
      );
      if (cert) return cert.certification;
    }
    return "N/A";
  };

  const toggleFavorite = () => {
    const favorites = JSON.parse(
      localStorage.getItem("movie-favorites") || "[]",
    );
    if (isFavorite) {
      const newFavorites = favorites.filter(
        (favId: number) => favId !== Number(id),
      );
      localStorage.setItem("movie-favorites", JSON.stringify(newFavorites));
      setIsFavorite(false);
    } else {
      favorites.push(Number(id));
      localStorage.setItem("movie-favorites", JSON.stringify(favorites));
      setIsFavorite(true);
    }
  };

  if (isLoading) {
    return (
      <div className="px-4 py-4 sm:px-6 sm:py-6 lg:px-8 lg:py-8">
        <MovieDetailsSkeleton />
      </div>
    );
  }

  if (isError || !movie) {
    return (
      <div className="px-4 py-4 sm:px-6 sm:py-6 lg:px-8 lg:py-8">
        <ErrorState onRetry={() => refetch()} />
      </div>
    );
  }

  return (
    <div className="px-4 py-4 sm:px-6 sm:py-6 lg:px-8 lg:py-8 max-w-350 mx-auto">
      {/* Back Button */}
      <button
        className="inline-flex items-center gap-2 font-bold text-foreground hover:text-foreground mb-4 sm:mb-6 group"
        onClick={() => navigate(-1)}
      >
        <ArrowLeft
          size={20}
          className="group-hover:-translate-x-1 transition-transform"
        />
        <span className="text-sm sm:text-base">Back</span>
      </button>

      {/* Movie Details Grid */}
      <div className="grid gap-6 sm:gap-8 lg:gap-10 lg:grid-cols-[300px_1fr] xl:grid-cols-[350px_1fr]">
        {/* Poster */}
        <div className="lg:sticky lg:top-8 self-start">
          <div className="aspect-2/3 rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl max-w-70 sm:max-w-none mx-auto lg:mx-0">
            <img
              src={getImageUrl(movie.poster_path, "w500")}
              alt={movie.title}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Movie Info */}
        <div className="space-y-4 sm:space-y-6 min-w-0">
          {/* Name */}
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground wrap-break-word">
                {movie.title}
              </h1>
              {movie.tagline && (
                <p className="text-base sm:text-lg text-muted italic mt-1">
                  {movie.tagline}
                </p>
              )}
            </div>
          </div>

          {/* Date and cert */}
          <div className="font-semibold text-muted text-sm sm:text-base">
            {`${getYear(movie.release_date)} • ${formatRuntime(movie.runtime)} • ${getCertification()}`}
          </div>

          {/* Badge and fav button */}
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
            <div className="flex items-center gap-3 sm:gap-4">
              <RatingBadge
                rating={movie.vote_average}
                size="lg"
                isDetailsPage
              />
              <div className="font-semibold text-muted text-sm sm:text-base">{`(${movie.vote_count.toLocaleString()} votes)`}</div>
            </div>

            <Button
              className="hidden lg:inline-flex items-center gap-2"
              onClick={toggleFavorite}
            >
              <Heart size={15} className={isFavorite ? "fill-current" : ""} />
              Add to Favourites
            </Button>
          </div>

          {/* Line */}
          <div className="w-full h-px bg-border"></div>

          {/* Overview */}
          <div className="space-y-2 sm:space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-foreground">
              Overview
            </h2>
            <p className="text-foreground leading-relaxed text-sm sm:text-base lg:text-lg font-medium">
              {movie.overview || "No overview available."}
            </p>
          </div>

          {/* Metadata */}
          <MovieMeta movie={movie} />
        </div>
      </div>

      {/* Movie Banner */}
      <MovieBanner
        movie={movie}
        isFavorite={isFavorite}
        onToggleFavorite={toggleFavorite}
      />

      {/* Similar Movies */}
      {movie.similar?.results && movie.similar.results.length > 0 && (
        <SimilarMovies movies={movie.similar.results} />
      )}
    </div>
  );
};

export default MovieDetailsPage;
