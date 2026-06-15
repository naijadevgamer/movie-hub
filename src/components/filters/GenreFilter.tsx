import { useGenres } from "../../hooks/useGenres";
import { X } from "lucide-react";
import CustomSelect from "../common/CustomSelect";

interface GenreFilterProps {
  selectedGenre?: number;
  onChange: (genreId?: number) => void;
}

const GenreFilter = ({ selectedGenre, onChange }: GenreFilterProps) => {
  const { data: genres } = useGenres();

  const options = [
    { value: "", label: "All Genres" },
    ...(genres?.map((genre) => ({
      value: String(genre.id),
      label: genre.name,
    })) || []),
  ];

  return (
    <div className="relative">
      <CustomSelect
        options={options}
        value={selectedGenre ? String(selectedGenre) : ""}
        onChange={(value) => onChange(value ? Number(value) : undefined)}
        placeholder="All Genres"
      />
      {selectedGenre && (
        <button
          onClick={() => onChange(undefined)}
          className="absolute right-8 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-slate-100 z-10"
        >
          <X size={14} className="text-slate-500" />
        </button>
      )}
    </div>
  );
};

export default GenreFilter;
