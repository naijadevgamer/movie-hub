import { useQuery } from "@tanstack/react-query";
import { getTopRatedMovies } from "../api/movies.api";

export const useTopRatedMovies = (page: number = 1) => {
  return useQuery({
    queryKey: ["movies", "topRated", page],
    queryFn: () => getTopRatedMovies(page),
    staleTime: 5 * 60 * 1000,
  });
};
