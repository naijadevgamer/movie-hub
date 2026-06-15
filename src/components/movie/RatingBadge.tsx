import { Star } from "lucide-react";
import clsx from "clsx";

interface RatingBadgeProps {
  rating: number;
  size?: "sm" | "md" | "lg";
  className?: string;
  isDetailsPage?: Boolean;
}

const RatingBadge = ({
  rating,
  size = "sm",
  className,
  isDetailsPage,
}: RatingBadgeProps) => {
  const getRatingColor = (rating: number) => {
    if (rating >= 8) return "text-green-400";
    if (rating >= 6) return "text-yellow-400";
    if (rating >= 4) return "text-orange-400";
    return "text-red-400";
  };

  const sizes = {
    sm: "text-xs px-2 py-1",
    md: "text-sm px-3 py-1.5",
    lg: "text-base px-4 py-2",
  };

  return (
    <div
      className={clsx(
        "inline-flex items-center gap-1 rounded-lg  backdrop-blur-md  font-medium",
        sizes[size],
        className,
        isDetailsPage
          ? "border border-border bg-background text-foreground"
          : "bg-black/60 text-white",
      )}
    >
      <Star
        size={size === "sm" ? 12 : size === "md" ? 14 : 16}
        className={clsx("fill-current", getRatingColor(rating))}
      />
      <span>{rating.toFixed(1)}</span>
    </div>
  );
};

export default RatingBadge;
