import { useQuery } from "@tanstack/react-query";
import { discoverMovies } from "../api/movies.api";
import type { Filters } from "../types/movie.types";

export const useMovieDiscovery = (filters: Filters, page: number = 1) => {
  return useQuery({
    queryKey: ["movies", "discover", filters, page],
    queryFn: () => discoverMovies(filters, page),
    staleTime: 2 * 60 * 1000,
    enabled: !!filters,
  });
};
