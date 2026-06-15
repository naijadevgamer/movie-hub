import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import MovieCard from "./MovieCard";
import { MovieGridSkeleton } from "../common/LoadingSkeleton";
import ErrorState from "../common/ErrorState";
import type { Movie } from "../../types/movie.types";
import SectionHeader from "../common/SectionHeader";

interface BaseMovieSectionProps {
  title: string;
  movies: Movie[] | undefined;
  isLoading: boolean;
  isError: boolean;
  onRetry?: () => void;
}

type MovieSectionProps =
  | (BaseMovieSectionProps & {
      onViewAll: () => void;
      linkTo?: never;
    })
  | (BaseMovieSectionProps & {
      linkTo: string;
      onViewAll?: never;
    });

const MovieSection = ({
  title,
  movies,
  isLoading,
  isError,
  onRetry,
  onViewAll,
  linkTo,
}: MovieSectionProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 10);
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener("resize", checkScroll);
    return () => window.removeEventListener("resize", checkScroll);
  }, [movies]);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 400;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  if (isError && onRetry) {
    return (
      <section className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-foreground">{title}</h2>
        </div>
        <ErrorState onRetry={onRetry} />
      </section>
    );
  }

  if (isLoading) {
    return (
      <section className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-foreground">{title}</h2>
        </div>
        <MovieGridSkeleton count={5} />
      </section>
    );
  }

  if (!movies?.length) return null;

  const displayMovies = movies.slice(0, 10);

  return (
    <section className="mb-12 relative group/section">
      <SectionHeader title={title} linkTo={linkTo} onViewAll={onViewAll} />

      <div className="relative">
        {/* Left Arrow */}
        {canScrollLeft && (
          <button
            onClick={() => scroll("left")}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center opacity-0 group-hover/section:opacity-100 transition-opacity hover:bg-slate-50"
          >
            <ChevronLeft className="w-5 h-5 text-slate-700" />
          </button>
        )}

        {/* Scrollable Container */}
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide scroll-smooth"
          onScroll={checkScroll}
        >
          {displayMovies.map((movie) => (
            <div key={movie.id} className="shrink-0 w-45 sm:w-50">
              <MovieCard movie={movie} />
            </div>
          ))}
        </div>

        {/* Right Arrow */}
        {canScrollRight && (
          <button
            onClick={() => scroll("right")}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center opacity-0 group-hover/section:opacity-100 transition-opacity hover:bg-slate-50"
          >
            <ChevronRight className="w-5 h-5 text-slate-700" />
          </button>
        )}
      </div>
    </section>
  );
};

export default MovieSection;
