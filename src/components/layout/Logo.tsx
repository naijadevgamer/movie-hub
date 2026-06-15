import { Clapperboard } from "lucide-react";
import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link to="/" className="flex items-center gap-3 group">
      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-linear-to-br from-blue-800 to-blue-500  transition-transform ">
        <Clapperboard size={20} className="text-white" />
      </div>
      <span className="text-xl font-bold text-foreground">MovieHub</span>
    </Link>
  );
};

export default Logo;
