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
    <div className="flex flex-col gap-1 text-sm font-medium text-slate-700 sm:flex-row sm:items-end">
      <label className="flex flex-col gap-1">
        <span className="text-xs uppercase tracking-[0.18em] text-slate-500">Min</span>
        <input
          type="number"
          min="0"
          max="100"
          placeholder="Min"
          value={min}
          onChange={onMinInputChange}
          className="w-24 cursor-pointer rounded-full border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 shadow-sm outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
        />
      </label>

      <label className="flex flex-col gap-1">
        <span className="text-xs uppercase tracking-[0.18em] text-slate-500">Max</span>
        <input
          type="number"
          min={0}
          max={100}
          placeholder="Max"
          value={max}
          onChange={onMaxInputChange}
          className="w-24 cursor-pointer rounded-full border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 shadow-sm outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
        />
      </label>
    </div>
  );
}