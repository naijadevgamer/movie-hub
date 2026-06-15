export interface Movie {
  id: number;
  title: string;
  poster_path: string;
  backdrop_path: string;
  overview: string;
  release_date: string;
  vote_average: number;
  vote_count: number;
  genre_ids: number[];
  genres?: Genre[];
  runtime?: number;
  budget?: number;
  revenue?: number;
  status?: string;
  tagline?: string;
  original_language?: string;
  spoken_languages?: any[];
  credits?: {
    cast: CastMember[];
    crew: CrewMember[];
  };
  similar?: {
    results: Movie[];
  };
  release_dates?: {
    results: ReleaseDateResult[];
  };
}

export interface ReleaseDateResult {
  iso_3166_1: string;
  release_dates: ReleaseDate[];
}

export interface ReleaseDate {
  certification: string;
  descriptors: string[];
  iso_639_1: string;
  note: string;
  release_date: string;
  type: number;
}

export interface Genre {
  id: number;
  name: string;
}

export interface CastMember {
  id: number;
  name: string;
  character: string;
  profile_path: string;
}

export interface CrewMember {
  id: number;
  name: string;
  job: string;
  department: string;
}

export interface MovieResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export interface Filters {
  genre?: number;
  year?: number;
  rating?: number;
  sortBy?: string;
}

export type MovieCategory =
  | "popular"
  | "top_rated"
  | "upcoming"
  | "now_playing";
