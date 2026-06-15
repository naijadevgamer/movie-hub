import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import MovieCard from "./MovieCard";
import type { Movie } from "../../types/movie.types";

interface SimilarMoviesProps {
  movies: Movie[];
}

const SimilarMovies = ({ movies }: SimilarMoviesProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

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

  if (!movies?.length) return null;

  return (
    <section className="mt-12">
      <h3 className="text-2xl font-bold text-slate-900 mb-6">Similar Movies</h3>

      <div className="relative group/section">
        {canScrollLeft && (
          <button
            onClick={() => scroll("left")}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center opacity-0 group-hover/section:opacity-100 transition-opacity"
          >
            <ChevronLeft className="w-5 h-5 text-slate-700" />
          </button>
        )}

        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide scroll-smooth"
          onScroll={checkScroll}
        >
          {movies.map((movie) => (
            <div key={movie.id} className="shrink-0 w-45 sm:w-50">
              <MovieCard movie={movie} isSimilarMovie />
            </div>
          ))}
        </div>

        {canScrollRight && (
          <button
            onClick={() => scroll("right")}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center opacity-0 group-hover/section:opacity-100 transition-opacity"
          >
            <ChevronRight className="w-5 h-5 text-slate-700" />
          </button>
        )}
      </div>
    </section>
  );
};

export default SimilarMovies;
