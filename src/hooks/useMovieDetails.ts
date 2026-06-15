import { useQuery } from "@tanstack/react-query";
import { getMovieDetails } from "../api/movies.api";

export const useMovieDetails = (id: number) => {
  return useQuery({
    queryKey: ["movie", id],
    queryFn: () => getMovieDetails(id),
    enabled: !!id,
    staleTime: 10 * 60 * 1000,
  });
};
