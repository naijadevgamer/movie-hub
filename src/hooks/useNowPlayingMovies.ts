import { useQuery } from "@tanstack/react-query";
import { getNowPlayingMovies } from "../api/movies.api";

export const useNowPlayingMovies = (page: number = 1) => {
  return useQuery({
    queryKey: ["movies", "nowPlaying", page],
    queryFn: () => getNowPlayingMovies(page),
    staleTime: 5 * 60 * 1000,
  });
};
