const MovieCardSkeleton = () => (
  <div className="animate-pulse">
    <div className="aspect-2/3 rounded-xl bg-muted/30 mb-3" />
    <div className="h-4 bg-muted/30 rounded w-3/4 mb-2" />
    <div className="h-3 bg-muted/30 rounded w-1/2" />
  </div>
);

const MovieGridSkeleton = ({ count = 8 }: { count?: number }) => (
  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
    {Array.from({ length: count }).map((_, i) => (
      <MovieCardSkeleton key={i} />
    ))}
  </div>
);

const MovieDetailsSkeleton = () => (
  <div className="animate-pulse">
    {/* Back button skeleton */}
    <div className="h-6 bg-muted/30 rounded w-20 mb-4 sm:mb-6" />

    {/* Main grid matching MovieDetailsGrid */}
    <div className="grid gap-6 sm:gap-8 lg:gap-10 lg:grid-cols-[300px_1fr] xl:grid-cols-[350px_1fr]">
      {/* Poster skeleton */}
      <div className="lg:sticky lg:top-8 self-start">
        <div className="aspect-2/3 rounded-xl sm:rounded-2xl bg-muted/30 max-w-70 sm:max-w-none mx-auto lg:mx-0" />
      </div>

      {/* Movie info skeleton */}
      <div className="space-y-4 sm:space-y-6 min-w-0">
        {/* Title skeleton */}
        <div className="space-y-2">
          <div className="h-8 sm:h-10 bg-muted/30 rounded w-3/4" />
          <div className="h-5 sm:h-6 bg-muted/30 rounded w-1/2" />
        </div>

        {/* Date and runtime */}
        <div className="h-5 bg-muted/30 rounded w-1/3" />

        {/* Rating and button */}
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="h-12 w-12 sm:h-14 sm:w-14 bg-muted/30 rounded-full" />
          <div className="h-4 bg-muted/30 rounded w-24" />
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-border/50" />

        {/* Overview skeleton */}
        <div className="space-y-2 sm:space-y-3">
          <div className="h-6 sm:h-7 bg-muted/30 rounded w-28" />
          <div className="space-y-2">
            <div className="h-4 bg-muted/30 rounded w-full" />
            <div className="h-4 bg-muted/30 rounded w-full" />
            <div className="h-4 bg-muted/30 rounded w-3/4" />
            <div className="h-4 bg-muted/30 rounded w-5/6" />
          </div>
        </div>

        {/* Meta items skeleton */}
        <div className="space-y-2 sm:space-y-3">
          <div className="h-6 sm:h-7 bg-muted/30 rounded w-24 mb-4" />
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2"
            >
              <div className="h-4 bg-muted/30 rounded w-24 sm:w-28" />
              <div className="h-4 bg-muted/30 rounded w-32 sm:w-48" />
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

export { MovieCardSkeleton, MovieGridSkeleton, MovieDetailsSkeleton };
