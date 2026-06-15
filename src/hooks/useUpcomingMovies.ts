import { useQuery } from "@tanstack/react-query";
import { getUpcomingMovies } from "../api/movies.api";

export const useUpcomingMovies = (page: number = 1) => {
  return useQuery({
    queryKey: ["movies", "upcoming", page],
    queryFn: () => getUpcomingMovies(page),
    staleTime: 5 * 60 * 1000,
  });
};
