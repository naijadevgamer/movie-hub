const TMDB_IMAGE_BASE_URL = "https://image.tmdb.org/t/p";

export const getImageUrl = (
  path: string | null,
  size: string = "w500",
): string => {
  if (!path) return "/placeholder-movie.jpg";
  return `${TMDB_IMAGE_BASE_URL}/${size}${path}`;
};

export const getBackdropUrl = (path: string | null): string => {
  if (!path) return "/placeholder-backdrop.jpg";
  return `${TMDB_IMAGE_BASE_URL}/original${path}`;
};
