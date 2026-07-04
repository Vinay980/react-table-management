import type { Table } from "@tanstack/react-table";
import type { RecordItem } from "../../types/record";

interface Props {
  table: Table<RecordItem>;
}

export default function ColumnVisibility({ table }: Props) {
  return (
    <div className="mb-4 flex flex-wrap gap-4 rounded border p-4">
      {table.getAllLeafColumns().map((column) => {
        if (column.id === "actions") return null;

        return (
          <label
            key={column.id}
            className="flex items-center gap-2"
          >
            <input
              type="checkbox"
              checked={column.getIsVisible()}
              onChange={column.getToggleVisibilityHandler()}
            />

            {column.id}
          </label>
        );
      })}
    </div>
  );
}