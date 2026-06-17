// import { useQuery } from "@tanstack/react-query";
// import { searchMovies } from "../api/movies.api";
// import type { Filters } from "../types/movie.types";

// export const useSearchMovies = (
//   query: string,
//   filters?: Filters,
//   page: number = 1,
// ) => {
//   return useQuery({
//     queryKey: ["movies", "search", query, filters, page],
//     queryFn: () => searchMovies(query, filters, page),
//     enabled:
//       query.length > 0 ||
//       (filters && Object.values(filters).some((v) => v !== undefined)),
//     staleTime: 2 * 60 * 1000,
//   });
// };

import { useQuery } from "@tanstack/react-query";
import { searchMovies } from "../api/movies.api";
import type { Filters } from "../types/movie.types";
import { applyClientFilters, sortMovies } from "../utils/filter";

export const useSearchMovies = (
  query: string,
  filters?: Filters,
  page: number = 1,
) => {
  return useQuery({
    queryKey: ["movies", "search", query, filters, page],
    queryFn: async () => {
      const response = await searchMovies(query, filters, page);

      // Apply client-side filtering when search query is active
      if (query.trim().length > 0 && response.results.length > 0) {
        let filtered = applyClientFilters(response.results, filters || {});

        // Apply sorting
        if (filters?.sortBy) {
          filtered = sortMovies(filtered, filters.sortBy);
        }

        return {
          ...response,
          results: filtered,
          total_results: filtered.length,
        };
      }

      return response;
    },
    enabled:
      query.length > 0 ||
      (filters && Object.values(filters).some((v) => v !== undefined)),
    staleTime: 2 * 60 * 1000,
  });
};
