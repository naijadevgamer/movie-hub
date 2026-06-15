import { X } from "lucide-react";
import CustomSelect from "../common/CustomSelect";

interface YearFilterProps {
  selectedYear?: number;
  onChange: (year?: number) => void;
}

const YearFilter = ({ selectedYear, onChange }: YearFilterProps) => {
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 50 }, (_, i) => currentYear - i);

  const options = [
    { value: "", label: "All Years" },
    ...years.map((year) => ({
      value: String(year),
      label: String(year),
    })),
  ];

  return (
    <div className="relative">
      <CustomSelect
        options={options}
        value={selectedYear ? String(selectedYear) : ""}
        onChange={(value) => onChange(value ? Number(value) : undefined)}
        placeholder="All Years"
      />
      {selectedYear && (
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

export default YearFilter;
