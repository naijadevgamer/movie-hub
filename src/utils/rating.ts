export const formatRating = (rating: number): string => {
  return rating.toFixed(1);
};

export const getRatingColor = (rating: number): string => {
  if (rating >= 8) return "text-green-500";
  if (rating >= 6) return "text-yellow-500";
  if (rating >= 4) return "text-orange-500";
  return "text-red-500";
};
