import { Link } from "react-router-dom";

interface SectionHeaderProps {
  title: string;
  linkTo?: string;
  linkText?: string;
  onViewAll?: () => void;
}

const SectionHeader = ({
  title,
  linkTo,
  linkText,
  onViewAll,
}: SectionHeaderProps) => {
  return (
    <div className="flex items-center justify-between mb-6">
      <h2 className="text-2xl font-bold text-slate-900">{title}</h2>

      {linkTo && (
        <Link
          to={linkTo}
          className="text-primary hover:text-primary-hover font-medium transition-colors"
        >
          {linkText || "View All"}
        </Link>
      )}

      {onViewAll && (
        <button
          onClick={onViewAll}
          className="text-primary hover:text-primary-hover font-medium transition-colors"
        >
          View All{" "}
        </button>
      )}
    </div>
  );
};

export default SectionHeader;
