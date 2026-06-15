import { X } from "lucide-react";
import CustomSelect from "../common/CustomSelect";

interface RatingFilterProps {
  selectedRating?: number;
  onChange: (rating?: number) => void;
}

const RatingFilter = ({ selectedRating, onChange }: RatingFilterProps) => {
  const ratings = [9, 8, 7, 6, 5, 4, 3, 2, 1];

  const options = [
    { value: "", label: "All Ratings" },
    ...ratings.map((rating) => ({
      value: String(rating),
      label: `${rating}+ Stars`,
    })),
  ];

  return (
    <div className="relative">
      <CustomSelect
        options={options}
        value={selectedRating ? String(selectedRating) : ""}
        onChange={(value) => onChange(value ? Number(value) : undefined)}
        placeholder="All Ratings"
      />
      {selectedRating && (
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

export default RatingFilter;
