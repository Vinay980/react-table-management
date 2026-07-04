interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export default function SearchBar({
  value,
  onChange,
}: SearchBarProps) {
  return (
    <div className="relative">
      <input
        type="text"
        placeholder="Search songs..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-full border border-slate-300 bg-white px-4 py-3 pr-12 text-sm text-slate-700 shadow-sm outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
      />

      {value && (
        <button
          type="button"
          onClick={() => onChange("")}
          className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer rounded-full p-1 text-slate-500 transition hover:bg-slate-100 hover:text-slate-800"
          aria-label="Clear search"
        >
          ✕
        </button>
      )}
    </div>
  );
}