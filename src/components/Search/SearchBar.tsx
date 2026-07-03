import type { SearchField } from "../../hooks/useSearch";

interface SearchBarProps {
  value: string;
  field: SearchField;
  onChange: (value: string) => void;
  onFieldChange: (field: SearchField) => void;
}

export default function SearchBar({
  value,
  field,
  onChange,
  onFieldChange,
}: SearchBarProps) {
  return (
    <div className="mb-6 flex gap-4">
      <input
        type="text"
        placeholder="Search..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="flex-1 rounded-lg border border-gray-300 px-4 py-3"
      />

      <select
        value={field}
        onChange={(e) =>
          onFieldChange(e.target.value as SearchField)
        }
        className="rounded-lg border border-gray-300 px-4 py-3"
      >
        <option value="track_name">Track</option>
        <option value="track_artist">Artist</option>
        <option value="playlist_genre">Genre</option>
      </select>
    </div>
  );
}