import type { Movie } from "../../types/movie.types";
import { formatDate } from "../../utils/date";

interface MovieMetaProps {
  movie: Movie;
}

const MovieMeta = ({ movie }: MovieMetaProps) => {
  // Find director
  const director = movie.credits?.crew?.find(
    (person) => person.job === "Director",
  );

  const metaItems = [
    {
      label: "Release Date",
      value: movie.release_date ? formatDate(movie.release_date) : "Unknown",
    },
    {
      label: "Director",
      value: director?.name || "Unknown",
    },
    {
      label: "Cast",
      value:
        movie.credits?.cast
          .map((cast) => cast.name)
          .slice(0, 6)
          .join(", ") || "Unknown",
    },
    {
      label: "Language",
      value: movie.spoken_languages?.[0]?.english_name || "Unknown",
    },
    {
      label: "Budget",
      value: `$${movie.budget.toLocaleString()}`,
    },
    {
      label: "Revenue",
      value: `$${movie.revenue.toLocaleString()}`,
    },
  ];

  return (
    <div>
      {/* Genres */}
      <div className="space-y-3 sm:space-y-4">
        <h2 className="text-lg sm:text-xl font-bold text-foreground">Genres</h2>
        {movie.genres && movie.genres?.length > 0 ? (
          <div className="flex flex-wrap gap-2 mb-6 sm:mb-8">
            {movie.genres.map((genre) => (
              <span
                key={genre.id}
                className="px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-background border border-border text-foreground font-semibold text-xs sm:text-sm"
              >
                {genre.name}
              </span>
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground font-medium italic mb-6 sm:mb-8">
            No genres available
          </p>
        )}
      </div>

      <div className="space-y-2 sm:space-y-3">
        {metaItems.map((item) => {
          return (
            <div
              key={item.label}
              className="flex flex-col sm:flex-row sm:items-center gap-0 sm:gap-2"
            >
              <p className="text-xs sm:text-sm w-full sm:w-28 text-foreground font-semibold mb-0.5 sm:mb-0 shrink-0">
                {item.label}
              </p>
              <p className="text-sm font-bold text-foreground truncate">
                {item.value}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MovieMeta;
