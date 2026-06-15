import { useQuery } from "@tanstack/react-query";
import { getGenres } from "../api/movies.api";

export const useGenres = () => {
  return useQuery({
    queryKey: ["genres"],
    queryFn: getGenres,
    staleTime: 30 * 60 * 1000,
  });
};
