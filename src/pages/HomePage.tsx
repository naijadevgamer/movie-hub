import { useNavigate, useOutletContext } from "react-router-dom";
import SearchHeader from "../components/layout/SearchHeader";
import MovieSection from "../components/movie/MovieSection";
import { usePopularMovies } from "../hooks/usePopularMovies";
import { useTopRatedMovies } from "../hooks/useTopRatedMovies";
import { useNowPlayingMovies } from "../hooks/useNowPlayingMovies";
import { useUpcomingMovies } from "../hooks/useUpcomingMovies";
import MovieGrid from "../components/movie/MovieGrid";
import { useEffect } from "react";

interface OutletContext {
  onMenuClick: () => void;
  activeCategory: string;
  onCategoryChange: (category: string) => void;
  showSidebar: boolean;
}

const HomePage = () => {
  const navigate = useNavigate();
  const { onMenuClick, activeCategory, onCategoryChange } =
    useOutletContext<OutletContext>();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [activeCategory]);

  const popularMovies = usePopularMovies();
  const topRatedMovies = useTopRatedMovies();
  const nowPlayingMovies = useNowPlayingMovies();
  const upcomingMovies = useUpcomingMovies();

  const handleViewAll = (category: string) => {
    if (category === "now_playing") {
      navigate("/search");
    } else {
      onCategoryChange(category);
    }
  };

  const getActiveTitle = () => {
    switch (activeCategory) {
      case "popular":
        return "Popular Movies";
      case "top_rated":
        return "Top Rated Movies";
      case "upcoming":
        return "Upcoming Movies";
      default:
        return "Discover Movies";
    }
  };

  const getActiveSubtitle = () => {
    switch (activeCategory) {
      case "popular":
        return "The most popular movies right now.";
      case "top_rated":
        return "The highest rated movies of all time.";
      case "upcoming":
        return "Get a sneak peek at upcoming releases.";
      default:
        return "Find and explore your next favorite movie.";
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <SearchHeader onMenuClick={onMenuClick} />

      <section className="mt-8 mb-12">
        <h1 className="text-3xl sm:text-4xl font-bold text-foreground">
          {getActiveTitle()}
        </h1>
        <p className="mt-2 text-muted font-medium text-lg">
          {getActiveSubtitle()}
        </p>
      </section>

      {(activeCategory === "now_playing" || !activeCategory) && (
        <>
          <MovieSection
            title="Now Playing"
            movies={nowPlayingMovies.data?.results}
            isLoading={nowPlayingMovies.isLoading}
            isError={nowPlayingMovies.isError}
            onRetry={() => nowPlayingMovies.refetch()}
            linkTo={"/search"}
          />

          <MovieSection
            title="Popular Movies"
            movies={popularMovies.data?.results}
            isLoading={popularMovies.isLoading}
            isError={popularMovies.isError}
            onRetry={() => popularMovies.refetch()}
            onViewAll={() => handleViewAll("popular")}
          />
          <MovieSection
            title="Top Rated"
            movies={topRatedMovies.data?.results}
            isLoading={topRatedMovies.isLoading}
            isError={topRatedMovies.isError}
            onRetry={() => topRatedMovies.refetch()}
            onViewAll={() => handleViewAll("top_rated")}
          />

          <MovieSection
            title="Upcoming"
            movies={upcomingMovies.data?.results}
            isLoading={upcomingMovies.isLoading}
            isError={upcomingMovies.isError}
            onRetry={() => upcomingMovies.refetch()}
            onViewAll={() => handleViewAll("upcoming")}
          />
        </>
      )}

      {activeCategory === "popular" && (
        <MovieGrid movies={popularMovies.data?.results || []} />
      )}

      {activeCategory === "top_rated" && (
        <MovieGrid movies={topRatedMovies.data?.results || []} />
      )}

      {activeCategory === "upcoming" && (
        <MovieGrid movies={upcomingMovies.data?.results || []} />
      )}
    </div>
  );
};

export default HomePage;
