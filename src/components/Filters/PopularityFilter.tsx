interface Props {
  min: string;
  max: string;
  onMinChange: (value: string) => void;
  onMaxChange: (value: string) => void;
}

export default function PopularityFilter({
  min,
  max,
  onMinChange,
  onMaxChange,
}: Props) {
  return (
    <div className="flex gap-2">
      <input
        type="number"
        min="0"
        max="100"
        placeholder="Min"
        value={min}
        onChange={(e) => onMinChange(e.target.value)}
        className="w-24 rounded border border-gray-300 px-3 py-2"
      />

      <input
        type="number"
        min="0"
        max="100"
        placeholder="Max"
        value={max}
        onChange={(e) => onMaxChange(e.target.value)}
        className="w-24 rounded border border-gray-300 px-3 py-2"
      />
    </div>
  );
}