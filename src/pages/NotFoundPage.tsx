import { Link } from "react-router-dom";
import { Film, Home } from "lucide-react";
import Button from "../components/common/Button";

const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="text-center max-w-md">
        <div className="w-24 h-24 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-8">
          <Film size={48} className="text-slate-400" />
        </div>

        <h1 className="text-6xl font-bold text-primary mb-4">404</h1>

        <h2 className="text-2xl font-bold text-foreground mb-2">
          Page Not Found
        </h2>
        <p className="text-muted text-lg mb-8">
          The page you're looking for doesn't exist or has been moved. Let's get
          you back to discovering great movies.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link to="/">
            <Button className="w-full sm:w-auto">
              <Home size={18} />
              Back to Home
            </Button>
          </Link>
          <Link to="/search">
            <Button variant="secondary" className="w-full sm:w-auto">
              <Film size={18} />
              Browse Movies
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
