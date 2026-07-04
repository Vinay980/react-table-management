import type { Table } from "@tanstack/react-table";
import type { RecordItem } from "../../types/record";

interface Props {
  table: Table<RecordItem>;
}

export default function ColumnVisibility({ table }: Props) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      {table.getAllLeafColumns().map((column) => {
        if (column.id === "actions") return null;

        return (
          <label
            key={column.id}
            className="flex cursor-pointer items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-sm text-slate-600 shadow-sm"
          >
            <input
              type="checkbox"
              checked={column.getIsVisible()}
              onChange={column.getToggleVisibilityHandler()}
              className="h-4 w-4 rounded border-slate-300 text-slate-700 focus:ring-slate-400"
            />

            {column.id}
          </label>
        );
      })}
    </div>
  );
}