import { useQuery } from "@tanstack/react-query";
import { getPopularMovies } from "../api/movies.api";

export const usePopularMovies = (page: number = 1) => {
  return useQuery({
    queryKey: ["movies", "popular", page],
    queryFn: () => getPopularMovies(page),
    staleTime: 5 * 60 * 1000,
  });
};
