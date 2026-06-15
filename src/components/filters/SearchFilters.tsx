import GenreFilter from "./GenreFilter";
import YearFilter from "./YearFilter";
import RatingFilter from "./RatingFilter";
import CustomSelect from "../common/CustomSelect";
import type { Filters } from "../../types/movie.types";

interface SearchFiltersProps {
  filters: Filters;
  onFiltersChange: (
    filters: Record<string, string | number | undefined>,
  ) => void;
  onClearFilters: () => void;
  className?: string;
}

const sortOptions = [
  { value: "popularity.desc", label: "Popularity" },
  { value: "vote_average.desc", label: "Rating (High to Low)" },
  { value: "vote_average.asc", label: "Rating (Low to High)" },
  { value: "primary_release_date.desc", label: "Release Date (Newest)" },
  { value: "primary_release_date.asc", label: "Release Date (Oldest)" },
  { value: "title.asc", label: "Title (A-Z)" },
  { value: "title.desc", label: "Title (Z-A)" },
];

const SearchFilters = ({
  filters,
  onFiltersChange,
  onClearFilters,
  className,
}: SearchFiltersProps) => {
  const { sortBy, ...rest } = filters;

  const hasActiveFilters = Object.values(rest).some(
    (value) => value !== undefined,
  );

  // const hasActiveFilters = Object.entries(filters).some(
  //   ([key, value]) => key !== "sortBy" && value !== undefined,
  // );

  return (
    <div className={className || ""}>
      <div className="flex md:gap-4 gap-2 flex-col md:flex-row">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 flex-1 gap-4">
          <div>
            <label className="block font-bold text-foreground mb-2">
              Genre
            </label>
            <GenreFilter
              selectedGenre={filters.genre}
              onChange={(genre) => onFiltersChange({ genre })}
            />
          </div>

          <div>
            <label className="block font-bold text-foreground mb-2">Year</label>
            <YearFilter
              selectedYear={filters.year}
              onChange={(year) => onFiltersChange({ year })}
            />
          </div>

          <div>
            <label className="block font-bold text-foreground mb-2">
              Rating
            </label>
            <RatingFilter
              selectedRating={filters.rating}
              onChange={(rating) => onFiltersChange({ rating })}
            />
          </div>

          <div>
            <label className="block font-bold text-foreground mb-2">
              Sort By
            </label>
            <CustomSelect
              options={sortOptions}
              value={filters.sortBy || "popularity.desc"}
              onChange={(value) => onFiltersChange({ sortBy: value })}
              placeholder="Sort by"
            />
          </div>
        </div>
        {hasActiveFilters && (
          <div
            onClick={onClearFilters}
            className="text-primary ml-auto md:ml-0 mt-0 md:mt-32 py-2 lg:mt-8 px-6 text-lg font-semibold hover:text-red-700 cursor-pointer w-fit"
          >
            Clear filters
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchFilters;
