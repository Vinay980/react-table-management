interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export default function SearchBar({
  value,
  onChange,
}: SearchBarProps) {
  return (
    <div className="relative mb-6">
      <input
        type="text"
        placeholder="Search songs..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border border-gray-300 px-4 py-3 pr-12 focus:border-blue-500 focus:outline-none"
      />

      {value && (
        <button
          type="button"
          onClick={() => onChange("")}
          className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-gray-500 transition hover:bg-gray-100 hover:text-black"
          aria-label="Clear search"
        >
          ✕
        </button>
      )}
    </div>
  );
}