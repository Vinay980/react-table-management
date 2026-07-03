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
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="rounded-lg border border-gray-300 px-4 py-3"
    >
      <option value="">All Genres</option>

      {genres
        .filter(Boolean)
        .map((genre) => (
          <option
            key={genre}
            value={genre}
          >
            {genre}
          </option>
        ))}
    </select>
  );
}