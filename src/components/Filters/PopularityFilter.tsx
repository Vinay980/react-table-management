interface Props {
  min: number;
  max: number;
  onMinChange: (value: number) => void;
  onMaxChange: (value: number ) => void;
}

export default function PopularityFilter({
  min,
  max,
  onMinChange,
  onMaxChange,
}: Props) {
  const onMinInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number.parseInt(e.target.value);
    if (value < 101) {
      onMinChange(value);
      return;
    }
    onMinChange(Number.parseInt(value.toString().slice(0, 2)));
  };

  const onMaxInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number.parseInt(e.target.value);
    if (value < 101) {
      onMaxChange(value);
      return;
    }
    onMaxChange(Number.parseInt(value.toString().slice(0, 2)));
  };

  return (
    <div className="flex gap-2">
      <input
        type="number"
        min="0"
        max="100"
        placeholder="Min"
        value={min}
        onChange={onMinInputChange}
        className="w-24 rounded border border-gray-300 px-3 py-2"
      />

      <input
        type="number"
        min={0}
        max={100}
        placeholder="Max"
        value={max}
        onChange={onMaxInputChange}
        className="w-24 rounded border border-gray-300 px-3 py-2"
      />
    </div>
  );
}