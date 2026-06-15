export const formatDate = (dateString: string): string => {
  if (!dateString) return "Unknown";
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export const getYear = (dateString: string): string => {
  if (!dateString) return "Unknown";
  return new Date(dateString).getFullYear().toString();
};

// Format runtime to hours and minutes
export const formatRuntime = (minutes: number | undefined): string => {
  if (!minutes) return "Unknown";
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  if (hours === 0) return `${mins}m`;
  return `${hours}h ${mins}m`;
};
