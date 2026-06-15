import { Search, Menu, Funnel } from "lucide-react";
import Input from "../common/Input";
import Button from "../common/Button";
import { useNavigate } from "react-router-dom";
import { useState, type KeyboardEvent } from "react";

interface SearchHeaderProps {
  onMenuClick?: () => void;
}

const SearchHeader = ({ onMenuClick }: SearchHeaderProps) => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="flex items-center gap-1.5 sm:gap-4">
      {onMenuClick && (
        <button
          onClick={onMenuClick}
          className="lg:hidden py-2 pr-2 sm:p-2 rounded-lg hover:bg-slate-100 transition-colors"
        >
          <Menu size={24} className="text-slate-600" />
        </button>
      )}

      <div className="relative flex-1">
        <Input
          placeholder="Search movies..."
          className="pl-11 pr-4"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={handleKeyPress}
          icon={<Search size={18} />}
        />
      </div>

      <Button
        onClick={() => navigate("/search")}
        className="hidden sm:inline-flex"
      >
        <Funnel size={18} />
        Filters
      </Button>
    </div>
  );
};

export default SearchHeader;
