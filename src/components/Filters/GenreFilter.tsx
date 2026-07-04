interface Props {
  value: string;
  onChange: (value: string) => void;
}

const genres = [
  "",
  "pop",
  "rap",
  "rock",
  "latin",
  "r&b",
  "edm",
];

export default function GenreFilter({
  value,
  onChange,
}: Props) {
  return (
    <label className="flex min-w-[170px] flex-col gap-1 text-sm font-medium text-slate-700">
      <span className="text-xs uppercase tracking-[0.18em] text-slate-500">Genre</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="cursor-pointer rounded-full border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-700 shadow-sm outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
      >
        <option value="">All Genres</option>

        {genres
          .filter(Boolean)
          .map((genre) => (
            <option key={genre} value={genre}>
              {genre}
            </option>
          ))}
      </select>
    </label>
  );
}