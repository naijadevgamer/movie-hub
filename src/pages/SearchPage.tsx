import { useCallback, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { ArrowLeft, Funnel, Search } from "lucide-react";
import Button from "../components/common/Button";
import EmptyState from "../components/common/EmptyState";
import ErrorState from "../components/common/ErrorState";
import Input from "../components/common/Input";
import { MovieGridSkeleton } from "../components/common/LoadingSkeleton";
import SearchFilters from "../components/filters/SearchFilters";
import MovieGrid from "../components/movie/MovieGrid";
import { useDebounce } from "../hooks/useDebounce";
import { useSearchMovies } from "../hooks/useSearchMovies";
import { useNowPlayingMovies } from "../hooks/useNowPlayingMovies";
import type { Movie } from "../types/movie.types";
import Pagination from "../components/common/Pagination";

const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // Read state from URL
  const query = searchParams.get("q") || "";
  const genre = searchParams.get("genre") || undefined;
  const year = searchParams.get("year") || undefined;
  const rating = searchParams.get("rating") || undefined;
  const sortBy = searchParams.get("sortBy") || undefined;
  const page = Number(searchParams.get("page")) || 1;

  const [searchInput, setSearchInput] = useState(query);
  const [showFilters, setShowFilters] = useState(true);

  // Debounced search
  const debouncedSearchInput = useDebounce(searchInput, 500);

  // Sync debounced value to URL
  const updateURL = useCallback(
    (updates: Record<string, string | undefined>) => {
      setSearchParams((prev) => {
        const newParams = new URLSearchParams(prev);
        Object.entries(updates).forEach(([key, value]) => {
          if (value && value !== "" && value !== "popularity.desc") {
            newParams.set(key, value);
          } else {
            newParams.delete(key);
          }
        });
        return newParams;
      });
    },
    [setSearchParams],
  );

  // Sync debounced search to URL
  useState(() => {
    if (debouncedSearchInput !== query) {
      updateURL({ q: debouncedSearchInput || undefined, page: undefined });
    }
  });

  // Build filters object from URL params
  const filters = {
    genre: genre ? Number(genre) : undefined,
    year: year ? Number(year) : undefined,
    rating: rating ? Number(rating) : undefined,
    sortBy: sortBy || "popularity.desc",
  };

  const hasSearchQuery = debouncedSearchInput.trim().length > 0;
  const hasFilters = !!(
    filters.genre ||
    filters.year ||
    filters.rating ||
    filters.sortBy !== "popularity.desc"
  );

  // Queries
  const searchResults = useSearchMovies(debouncedSearchInput, filters, page);
  const nowPlayingMovies = useNowPlayingMovies(page);

  let movies: Movie[] | undefined,
    isLoading: boolean,
    isError: boolean,
    refetch: () => void,
    totalResults: number | undefined,
    totalPages: number | undefined;

  if (hasSearchQuery || hasFilters) {
    movies = searchResults.data?.results;
    isLoading = searchResults.isLoading;
    isError = searchResults.isError;
    refetch = searchResults.refetch;
    totalResults = searchResults.data?.total_results;
    totalPages = searchResults.data?.total_pages;
  } else {
    movies = nowPlayingMovies.data?.results;
    isLoading = nowPlayingMovies.isLoading;
    isError = nowPlayingMovies.isError;
    refetch = nowPlayingMovies.refetch;
    totalResults = nowPlayingMovies.data?.total_results;
    totalPages = nowPlayingMovies.data?.total_pages;
  }

  const handleFiltersChange = useCallback(
    (newFilters: Record<string, string | number | undefined>) => {
      const updates: Record<string, string | undefined> = {};
      Object.entries(newFilters).forEach(([key, value]) => {
        updates[key] =
          value !== undefined && value !== "" ? String(value) : undefined;
      });
      updateURL({ ...updates, page: undefined }); // Reset page when filters change
    },
    [updateURL],
  );

  const handleClearFilters = useCallback(() => {
    setSearchParams(new URLSearchParams());
    setSearchInput("");
  }, [setSearchParams]);

  const handlePageChange = useCallback(
    (newPage: number) => {
      updateURL({ page: newPage > 1 ? String(newPage) : undefined });
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    [updateURL],
  );

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="flex items-center gap-1.5 sm:gap-4 mb-8">
        {/* Back Button */}
        <Link
          to="/"
          className="gap-2 flex items-center justify-center cursor-pointer font-bold self-stretch text-foreground hover:text-foreground px-2 group bg-background border border-border rounded-lg  "
        >
          <ArrowLeft size={20} />
        </Link>

        <div className="relative flex-1">
          <Input
            placeholder="Search for movies..."
            className="pl-11"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            autoFocus
            type="search"
            icon={<Search size={18} />}
          />
        </div>

        <Button
          variant={showFilters ? "primary" : "secondary"}
          onClick={() => setShowFilters(!showFilters)}
          className="shrink-0"
        >
          <Funnel size={18} />
          Filters
        </Button>
      </div>

      <div className="mb-8 flex items-center justify-between gap-2 flex-wrap">
        <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">
          {hasSearchQuery
            ? `Search results for "${debouncedSearchInput}"`
            : hasFilters
              ? "Filtered Movies"
              : "Now Playing"}
        </h1>
        <p className="text-muted">
          {totalResults !== undefined
            ? `${totalResults} results found`
            : "Discover movies currently in theaters"}
        </p>
      </div>

      {showFilters && (
        <div className="mb-8">
          <SearchFilters
            filters={filters}
            onFiltersChange={handleFiltersChange}
            onClearFilters={handleClearFilters}
          />
        </div>
      )}

      <div>
        {isLoading && <MovieGridSkeleton count={12} />}

        {isError && <ErrorState onRetry={() => refetch()} />}

        {!isLoading && !isError && movies && movies.length > 0 && (
          <>
            <MovieGrid movies={movies} />
            {totalPages && totalPages > 1 && (
              <Pagination
                currentPage={page}
                totalPages={Math.min(totalPages, 500)}
                onPageChange={handlePageChange}
              />
            )}
          </>
        )}

        {!isLoading && !isError && movies && movies.length === 0 && (
          <EmptyState
            title="No movies found"
            description={
              hasSearchQuery && hasFilters
                ? `No movies match "${debouncedSearchInput}" with the current filters. Try adjusting your search or filters.`
                : hasSearchQuery
                  ? `We couldn't find any movies matching "${debouncedSearchInput}". Try different keywords.`
                  : "No movies match the current filters. Try adjusting your criteria."
            }
          />
        )}
      </div>
    </div>
  );
};

export default SearchPage;
