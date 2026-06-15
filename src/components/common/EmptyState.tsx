import { Film } from "lucide-react";

interface EmptyStateProps {
  title?: string;
  description?: string;
  icon?: React.ReactNode;
  action?: React.ReactNode;
}

const EmptyState = ({
  title = "No movies found",
  description = "Try adjusting your search or filters to find what you're looking for.",
  icon,
  action,
}: EmptyStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4">
      <div className="w-24 h-24 rounded-full bg-slate-100 flex items-center justify-center mb-6">
        {icon || <Film className="w-12 h-12 text-slate-400" />}
      </div>
      <h3 className="text-xl font-semibold text-slate-700 mb-2">{title}</h3>
      <p className="text-slate-500 text-center max-w-md mb-6">{description}</p>
      {action}
    </div>
  );
};

export default EmptyState;
